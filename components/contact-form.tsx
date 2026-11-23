"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { contact, programs } from "@/lib/content";
import Toast, { type ToastState } from "@/components/toast";

const EMPTY = { name: "", email: "", phone: "", program: "", message: "" };

export type Submission = typeof EMPTY & { id: string; submittedAt: string };

export function ContactForm({ defaultProgram }: { defaultProgram?: string }) {
  const [values, setValues] = useState({ ...EMPTY, program: defaultProgram ?? "" });
  const [toast, setToast] = useState<ToastState>(null);
  const [sending, setSending] = useState(false);

  const update =
    (field: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    const entry: Submission = {
      ...values,
      id: Date.now().toString(),
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const raw = localStorage.getItem(contact.storageKey);
      const list: Submission[] = raw ? JSON.parse(raw) : [];
      list.push(entry);
      localStorage.setItem(contact.storageKey, JSON.stringify(list));
    } catch {
      /* private mode / blocked storage — the visitor still gets confirmation */
    }

    setToast({
      title: contact.form.successTitle,
      body: contact.form.successBody,
      tone: "success",
    });
    setValues({ ...EMPTY, program: defaultProgram ?? "" });
    setSending(false);
  };

  const f = contact.form.fields;

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-7">
        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">
              {f.name.label}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="field"
              placeholder={f.name.placeholder}
              value={values.name}
              onChange={update("name")}
            />
          </div>

          <div>
            <label htmlFor="email" className="field-label">
              {f.email.label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field"
              placeholder={f.email.placeholder}
              value={values.email}
              onChange={update("email")}
            />
          </div>

          <div>
            <label htmlFor="phone" className="field-label">
              {f.phone.label}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="field"
              placeholder={f.phone.placeholder}
              value={values.phone}
              onChange={update("phone")}
            />
          </div>

          <div>
            <label htmlFor="program" className="field-label">
              {f.program.label}
            </label>
            <select
              id="program"
              name="program"
              required
              className="field"
              value={values.program}
              onChange={update("program")}
            >
              <option value="">{f.program.placeholder}</option>
              {programs.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.navLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            {f.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="field"
            placeholder={f.message.placeholder}
            value={values.message}
            onChange={update("message")}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-full sm:w-auto" disabled={sending}>
          {contact.form.submit}
          <Send className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <p className="text-[12px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          Enquiries are stored in this browser and reviewed from the admin dashboard. Connect your
          own API route or CRM to deliver them to your inbox.
        </p>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

export default ContactForm;
