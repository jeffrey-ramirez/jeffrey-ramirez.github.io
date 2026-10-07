import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * Delivers contact-form messages through Resend (https://resend.com) when
 * RESEND_API_KEY and CONTACT_TO_EMAIL are set. Without them, development logs
 * the message and production returns 503 so the UI can offer a mailto fallback.
 */
export async function POST(request: Request) {
  let body: Partial<ContactInput> & { company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const message = body.message!.trim();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email delivery not configured. Message received:", { name, email, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Messaging is temporarily unavailable." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Your message couldn't be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
