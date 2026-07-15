import { NextResponse } from "next/server";
import sharp from "sharp";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database isn't configured yet." }, { status: 500 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("photo");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No photo provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Photo must be a JPEG, PNG, or WebP image." },
      { status: 400 }
    );
  }
  if (file.size > MAX_PHOTO_SIZE) {
    return NextResponse.json({ error: "Photo is too large (max 2MB)." }, { status: 400 });
  }

  const path = `${crypto.randomUUID()}.jpg`;
  const rawBuffer = Buffer.from(await file.arrayBuffer());

  // Downscale and re-encode so the same file works as both the small
  // byline thumbnail and a social-share preview image — an unprocessed
  // phone photo (multi-MB, portrait) fails to render in WhatsApp/LinkedIn
  // link previews.
  const buffer = await sharp(rawBuffer)
    .rotate()
    .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from("author-photos")
    .upload(path, buffer, { contentType: "image/jpeg", upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from("author-photos").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
