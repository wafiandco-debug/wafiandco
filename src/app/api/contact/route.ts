import { NextResponse } from "next/server";
import { getTransporter } from "@/lib/mailer";
import { siteConfig } from "@/lib/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = body?.name?.toString().trim();
  const email = body?.email?.toString().trim();
  const phone = body?.phone?.toString().trim() || "-";
  const message = body?.message?.toString().trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json(
      { error: "Email sending isn't set up yet. Please call or WhatsApp us instead." },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from: `"WAFI & CO. Website" <${process.env.GMAIL_USER}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
