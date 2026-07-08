import { notFound } from "next/navigation";
import InsightForm from "@/components/admin/InsightForm";
import { supabaseAdmin } from "@/lib/supabase";
import type { Insight } from "@/lib/insights";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!supabaseAdmin) notFound();

  const { data } = await supabaseAdmin.from("insights").select("*").eq("slug", slug).single();
  if (!data) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-navy">Edit article</h1>
      <div className="mt-6">
        <InsightForm initial={data as Insight} />
      </div>
    </div>
  );
}
