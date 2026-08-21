import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database isn't configured yet." }, { status: 500 });
  }

  const { slug } = await params;
  const body = await req.json().catch(() => null);
  const {
    title,
    category,
    excerpt,
    content,
    date,
    author_name,
    author_position,
    author_photo_url,
  } = body ?? {};

  if (!title || !category || !excerpt || !content || !date) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("insights")
    .update({
      title,
      category,
      excerpt,
      content: sanitizeArticleHtml(content),
      date,
      author_name: author_name || null,
      author_position: author_position || null,
      author_photo_url: author_photo_url || null,
    })
    .eq("slug", slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath(`/insights/${slug}`);
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database isn't configured yet." }, { status: 500 });
  }

  const { slug } = await params;
  const { error } = await supabaseAdmin.from("insights").delete().eq("slug", slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath(`/insights/${slug}`);
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");

  return NextResponse.json({ ok: true });
}
