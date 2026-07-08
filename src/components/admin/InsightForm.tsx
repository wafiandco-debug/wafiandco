"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Insight } from "@/lib/insights";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function InsightForm({ initial }: { initial?: Insight }) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = { slug, title, category, excerpt, content, date };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/insights/${initial!.slug}` : "/api/admin/insights",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to save article.");

      router.push("/admin/insights");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save article.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-navy/10 bg-white p-8">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-navy">Title</label>
          <input
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Slug (URL)</label>
          <input
            required
            value={slug}
            disabled={isEdit}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 disabled:bg-navy/5 disabled:text-navy/50"
          />
          <p className="mt-1 text-xs text-navy/50">/insights/{slug || "your-article-slug"}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-navy">Category</label>
            <input
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. GST, ITR, Virtual CFO"
              className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy">Date</label>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Excerpt</label>
          <textarea
            required
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary shown on the Insights listing page"
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy">Article content</label>
          <textarea
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Full article text. Leave a blank line between paragraphs."
            className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-[background-position] duration-300 hover:bg-right disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving…" : isEdit ? "Save changes" : "Publish article"}
        </button>
      </div>
    </form>
  );
}
