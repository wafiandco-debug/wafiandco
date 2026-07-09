import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database isn't configured yet." }, { status: 500 });
  }
  const { data, error } = await supabaseAdmin
    .from("insights")
    .select("*")
    .order("date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ insights: data });
}

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database isn't configured yet." }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const {
    slug,
    title,
    category,
    excerpt,
    content,
    date,
    author_name,
    author_position,
    author_photo_url,
  } = body ?? {};

  if (!slug || !title || !category || !excerpt || !content || !date) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("insights").insert({
    slug,
    title,
    category,
    excerpt,
    content,
    date,
    author_name: author_name || null,
    author_position: author_position || null,
    author_photo_url: author_photo_url || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
