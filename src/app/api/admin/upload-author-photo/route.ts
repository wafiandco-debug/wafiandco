import { NextResponse } from "next/server";
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

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabaseAdmin.storage
    .from("author-photos")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from("author-photos").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
