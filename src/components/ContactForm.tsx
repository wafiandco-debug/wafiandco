"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card-glass rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-navy">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-4 font-serif text-2xl text-navy">Message sent</h2>
        <p className="text-body mt-2 text-sm leading-relaxed text-navy/70">
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-block rounded-full border border-navy/20 px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:border-saffron hover:text-saffron"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-8 transition-shadow duration-300 hover:shadow-lg">
      <h2 className="font-serif text-2xl text-navy">Send a message</h2>
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-navy">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-navy">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>

        {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-6 py-3 text-sm font-semibold text-navy shadow-sm transition-[background-position,box-shadow] duration-300 hover:bg-right hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
