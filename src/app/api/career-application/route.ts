import { NextResponse } from "next/server";
import { getTransporter } from "@/lib/mailer";
import { siteConfig } from "@/lib/site";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const position = formData.get("position")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";
  const resume = formData.get("resume");

  if (!name || !email || !phone || !position || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json(
      {
        error: `Email sending isn't set up yet. Please send your application directly to ${siteConfig.email}.`,
      },
      { status: 500 }
    );
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json({ error: "Resume file is too large (max 5MB)." }, { status: 400 });
    }
    const buffer = Buffer.from(await resume.arrayBuffer());
    attachments.push({ filename: resume.name, content: buffer });
  }

  try {
    await transporter.sendMail({
      from: `"WAFI & CO. Website" <${process.env.GMAIL_USER}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `New career application: ${position} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\n\nMessage:\n${message}`,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your application. Please try again later." },
      { status: 500 }
    );
  }
}
