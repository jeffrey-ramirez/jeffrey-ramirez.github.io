export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = { name: 100, email: 200, message: 5000, minMessage: 10 } as const;

/** Validation rules for the contact form. */
export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = `Name must be under ${limits.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  if (!message) errors.message = "Please write a message.";
  else if (message.length < limits.minMessage)
    errors.message = `Message should be at least ${limits.minMessage} characters.`;
  else if (message.length > limits.message) errors.message = `Message must be under ${limits.message} characters.`;

  return errors;
}

/**
 * Optional form backend (e.g. a Formspree endpoint). The site is a static export,
 * so without one the form falls back to opening the visitor's email app.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export type SendResult = "sent" | "mailto";

export async function sendContact(input: ContactInput, honeypot: string, to: string): Promise<SendResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // `_gotcha` is Formspree's honeypot field; `_replyto` sets the reply address.
      body: JSON.stringify({ name, email, message, _replyto: email, _gotcha: honeypot }),
    });
    if (!res.ok) throw new Error("Your message couldn't be sent.");
    return "sent";
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}

— ${name} <${email}>`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  return "mailto";
}
