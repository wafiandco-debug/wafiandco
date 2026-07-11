"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Insight } from "@/lib/insights";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function InsightForm({ initial }: { initial?: Insight }) {
  const isEdit = Boolean(initial);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [authorName, setAuthorName] = useState(initial?.author_name ?? "");
  const [authorPosition, setAuthorPosition] = useState(initial?.author_position ?? "");
  const [existingPhotoUrl, setExistingPhotoUrl] = useState(initial?.author_photo_url ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : "");
  }

  function handleRemovePhoto() {
    setPhotoFile(null);
    setPhotoPreview("");
    setExistingPhotoUrl("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      let authorPhotoUrl = existingPhotoUrl;

      if (photoFile) {
        const photoData = new FormData();
        photoData.append("photo", photoFile);
        const uploadRes = await fetch("/api/admin/upload-author-photo", {
          method: "POST",
          body: photoData,
        });
        const uploadData = await uploadRes.json().catch(() => ({}));
        if (!uploadRes.ok) throw new Error(uploadData.error || "Failed to upload photo.");
        authorPhotoUrl = uploadData.url;
      }

      const payload = {
        slug,
        title,
        category,
        excerpt,
        content,
        date,
        author_name: authorName || null,
        author_position: authorPosition || null,
        author_photo_url: authorPhotoUrl || null,
      };

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

      window.location.href = "/admin/insights";
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

        <div className="rounded-xl border border-navy/10 bg-navy/[0.03] p-5">
          <p className="text-sm font-semibold text-navy">Author credit (optional)</p>
          <p className="mt-1 text-xs text-navy/50">
            Give credit to the staff member who wrote this article. Leave blank to publish
            without a byline.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-navy">Author name</label>
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Fathima Rasheed"
                className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy">Position</label>
              <input
                value={authorPosition}
                onChange={(e) => setAuthorPosition(e.target.value)}
                placeholder="e.g. Articled Assistant"
                className="mt-1.5 w-full rounded-lg border border-navy/20 px-4 py-2.5 text-navy outline-none placeholder:text-navy/35 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-navy">Author photo</label>
            <div className="mt-1.5 flex items-center gap-4">
              {(photoPreview || existingPhotoUrl) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview || existingPhotoUrl}
                  alt="Author preview"
                  className="h-14 w-14 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-navy outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[linear-gradient(135deg,var(--color-navy),var(--color-navy-light))] file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-white"
                />
                <p className="mt-1 text-xs text-navy/50">JPEG, PNG, or WebP, up to 2MB.</p>
              </div>
              {(photoPreview || existingPhotoUrl) && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-navy/50">
              The photo only appears on the full article page. The Insights listing shows the
              author&apos;s name and position without a photo.
            </p>
          </div>
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
