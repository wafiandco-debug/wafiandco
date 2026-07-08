"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteInsightButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this article? This can't be undone.")) return;
    setDeleting(true);
    await fetch(`/api/admin/insights/${slug}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm font-medium text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
    >
      {deleting ? "Deleting…" : "Delete"}
    </button>
  );
}
