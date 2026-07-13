import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
  const { slug } = await params;
  const { error } = await supabaseAdmin.rpc("increment_insight_share", {
    article_slug: slug,
  });
  return NextResponse.json({ ok: !error });
}
