import { NextResponse } from "next/server";
import { getTransporter } from "@/lib/mailer";
import { supabaseAdmin } from "@/lib/supabase";
import { getClientIp } from "@/lib/requestIp";

const COOLDOWN_MS = 15 * 60 * 1000;
const RECOVERY_EMAIL = "wafimuhsin.a@gmail.com";

export async function POST(req: Request) {
  const ip = getClientIp(req);

  if (supabaseAdmin) {
    const { data: existing } = await supabaseAdmin
      .from("admin_password_reset_requests")
      .select("last_sent_at")
      .eq("identifier", ip)
      .maybeSingle();

    if (existing?.last_sent_at) {
      const elapsed = Date.now() - new Date(existing.last_sent_at).getTime();
      if (elapsed < COOLDOWN_MS) {
        const minutesLeft = Math.ceil((COOLDOWN_MS - elapsed) / 60000);
        return NextResponse.json(
          { error: `Please wait ${minutesLeft} minute(s) before requesting again.` },
          { status: 429 }
        );
      }
    }
  }

  const password = process.env.ADMIN_PASSWORD;
  const transporter = getTransporter();

  if (!password || !transporter) {
    return NextResponse.json(
      { error: "Password recovery isn't set up yet." },
      { status: 500 }
    );
  }

  try {
    await transporter.sendMail({
      from: `"WAFI & CO. Website" <${process.env.GMAIL_USER}>`,
      to: RECOVERY_EMAIL,
      subject: "WAFI & CO. Admin Password Recovery",
      text: `Your admin login password is: ${password}\n\nThis was requested from IP: ${ip}. If you didn't request this, you can ignore it — no changes were made to your account.`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to send the recovery email. Please try again later." },
      { status: 500 }
    );
  }

  if (supabaseAdmin) {
    await supabaseAdmin
      .from("admin_password_reset_requests")
      .upsert({ identifier: ip, last_sent_at: new Date().toISOString() });
  }

  return NextResponse.json({ ok: true });
}
