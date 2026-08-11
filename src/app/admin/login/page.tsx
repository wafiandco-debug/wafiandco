"use client";

import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [forgotState, setForgotState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [forgotMessage, setForgotMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed.");

      window.location.href = "/admin/insights";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    setForgotState("sending");
    setForgotMessage("");
    try {
      const res = await fetch("/api/admin/forgot-password", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send recovery email.");
      setForgotState("sent");
      setForgotMessage("Password sent to the registered email.");
    } catch (err) {
      setForgotState("error");
      setForgotMessage(err instanceof Error ? err.message : "Failed to send recovery email.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist/20 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-navy/10 bg-white p-8 shadow-sm"
      >
        <h1 className="font-serif text-2xl text-navy">Admin login</h1>
        <p className="mt-1 text-sm text-navy/60">WAFI & CO. content backend</p>
        <div className="mt-6">
          <label htmlFor="password" className="text-sm font-medium text-navy">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none transition-shadow focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-3 text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={forgotState === "sending"}
            className="text-xs font-medium text-navy/60 underline-offset-2 hover:text-saffron hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            {forgotState === "sending" ? "Sending…" : "Forgot password?"}
          </button>
        </div>
        {forgotMessage && (
          <p
            className={`mt-2 text-sm ${
              forgotState === "error" ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {forgotMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-[background-position] duration-300 hover:bg-right disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
