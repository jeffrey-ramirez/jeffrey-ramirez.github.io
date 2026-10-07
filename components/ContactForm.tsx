"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { limits, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { profile } from "@/data/profile";
import { Button } from "./ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const fields: { name: keyof ContactInput; label: string; type?: string; autoComplete: string }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message", autoComplete: "off" },
];

const inputBase =
  "w-full rounded-xl border bg-surface-2/60 px-4 text-[15px] text-foreground placeholder:text-subtle transition-colors outline-none focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent-soft";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  function read(form: HTMLFormElement): ContactInput & { company: string } {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };
  }

  function revalidate(field: keyof ContactInput) {
    if (!formRef.current || !touched[field]) return;
    const next = validateContact(read(formRef.current));
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = read(form);
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; errors?: ContactErrors };
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error ?? "Something went wrong.");
      }
      form.reset();
      setTouched({});
      setStatus("success");
    } catch (err) {
      setServerMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="contact-status" className="space-y-5">
      {/* Honeypot for bots — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.slice(0, 2).map((f) => {
          const error = errors[f.name];
          return (
            <div key={f.name}>
              <label htmlFor={`contact-${f.name}`} className="mb-2 block text-sm font-medium">
                {f.label}
              </label>
              <input
                id={`contact-${f.name}`}
                name={f.name}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                required
                maxLength={limits[f.name as "name" | "email"]}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `contact-${f.name}-error` : undefined}
                onBlur={() => {
                  setTouched((t) => ({ ...t, [f.name]: true }));
                  if (formRef.current) {
                    const next = validateContact(read(formRef.current));
                    setErrors((prev) => ({ ...prev, [f.name]: next[f.name] }));
                  }
                }}
                onChange={() => revalidate(f.name)}
                placeholder={f.name === "email" ? "you@company.com" : "Your name"}
                className={`${inputBase} h-12 ${error ? "border-red-500/70" : "border-border"}`}
              />
              <FieldError id={`contact-${f.name}-error`} message={error} />
            </div>
          );
        })}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          maxLength={limits.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onBlur={() => {
            setTouched((t) => ({ ...t, message: true }));
            if (formRef.current) {
              const next = validateContact(read(formRef.current));
              setErrors((prev) => ({ ...prev, message: next.message }));
            }
          }}
          onChange={() => revalidate("message")}
          placeholder="Tell me about the project, role, or idea…"
          className={`${inputBase} resize-y py-3 ${errors.message ? "border-red-500/70" : "border-border"}`}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div id="contact-status" role="status" aria-live="polite" className="min-h-6 text-sm">
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-emerald-500"
              >
                <CircleCheck size={16} aria-hidden /> Thanks — your message is on its way. I&apos;ll reply soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="err"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 text-red-500"
              >
                <CircleAlert size={16} aria-hidden className="mt-0.5 shrink-0" />
                <span>
                  {serverMessage} You can also email me at{" "}
                  <a className="underline underline-offset-2" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  .
                </span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Button type="submit" size="lg" disabled={status === "submitting"} className="shrink-0">
          {status === "submitting" ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send Message
              <Send
                size={15}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden pt-1.5 text-sm text-red-500"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
