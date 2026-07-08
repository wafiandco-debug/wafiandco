"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function CareerApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeName, setResumeName] = useState("");

  function handleResumeChange(e: ChangeEvent<HTMLInputElement>) {
    setResumeName(e.target.files?.[0]?.name ?? "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/career-application", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setResumeName("");
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
        <h2 className="mt-4 font-serif text-2xl text-navy">Application sent</h2>
        <p className="text-body mt-2 text-sm leading-relaxed text-navy/70">
          Thanks for your interest in WAFI & CO. We&apos;ve received your
          application and will get back to you if there&apos;s a fit.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-block rounded-full border border-navy/20 px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:border-saffron hover:text-saffron"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-8 transition-shadow duration-300 hover:shadow-lg">
      <h2 className="font-serif text-2xl text-navy">Apply now</h2>
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Full name
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
            required
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label htmlFor="position" className="text-sm font-medium text-navy">
            Position applying for
          </label>
          <input
            id="position"
            name="position"
            type="text"
            required
            placeholder="e.g. Article Assistant, Accountant, Front Office"
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-navy">
            Tell us about yourself
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Your background, qualifications, and why you'd like to join us"
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label htmlFor="resume" className="text-sm font-medium text-navy">
            Resume / CV
          </label>
          <label
            htmlFor="resume"
            className="mt-1.5 flex w-full cursor-pointer items-center justify-center rounded-lg border border-navy/20 px-4 py-2.5 text-center text-sm text-navy outline-none transition-shadow hover:border-saffron/60 focus-within:border-saffron focus-within:ring-2 focus-within:ring-saffron/20"
          >
            <span className={resumeName ? "text-navy" : "text-navy/50"}>
              {resumeName || "No file chosen"}
            </span>
            <input
              id="resume"
              name="resume"
              type="file"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="sr-only"
            />
          </label>
          <p className="mt-1.5 text-xs text-navy/50">PDF or Word document, up to 5MB.</p>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-6 py-3 text-sm font-semibold text-navy shadow-sm transition-[background-position,box-shadow] duration-300 hover:bg-right hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send application"}
        </button>
      </div>
    </form>
  );
}
