export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = { name: 100, email: 200, message: 5000, minMessage: 10 } as const;

/** Shared by the client form and the API route so both enforce identical rules. */
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
