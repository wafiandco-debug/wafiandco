import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import DeleteInsightButton from "@/components/admin/DeleteInsightButton";
import type { Insight } from "@/lib/insights";

export const dynamic = "force-dynamic";

export default async function AdminInsightsPage() {
  if (!supabaseAdmin) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-900">
        <p className="font-semibold">Database not configured</p>
        <p className="mt-2">
          Set <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
          <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> — see{" "}
          <code className="rounded bg-amber-100 px-1">SETUP.md</code> — to manage Insights articles here.
        </p>
      </div>
    );
  }

  const { data } = await supabaseAdmin
    .from("insights")
    .select("*")
    .order("date", { ascending: false });
  const insights = (data as Insight[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-navy">Insights articles</h1>
        <Link
          href="/admin/insights/new"
          className="rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-[background-position] duration-300 hover:bg-right"
        >
          + New article
        </Link>
      </div>

      <div className="mt-6 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
        {insights.length === 0 && (
          <p className="p-6 text-sm text-navy/60">No articles yet. Create your first one.</p>
        )}
        {insights.map((post) => (
          <div key={post.slug} className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-saffron">
                {post.category}
              </p>
              <p className="mt-1 font-medium text-navy">{post.title}</p>
              <p className="mt-1 text-xs text-navy/50">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/admin/insights/${post.slug}/edit`}
                className="text-sm font-medium text-navy/70 transition-colors hover:text-saffron"
              >
                Edit
              </Link>
              <DeleteInsightButton slug={post.slug} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
