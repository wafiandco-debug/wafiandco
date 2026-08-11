import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getExpectedAdminToken, tokenFromPassword } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 5 * 60 * 60 * 1000;

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const password = body?.password?.toString() ?? "";
  const ip = getClientIp(req);

  const { data: attempt } = supabaseAdmin
    ? await supabaseAdmin
        .from("admin_login_attempts")
        .select("failed_count, locked_until")
        .eq("identifier", ip)
        .maybeSingle()
    : { data: null };

  if (attempt?.locked_until && new Date(attempt.locked_until) > new Date()) {
    const minutesLeft = Math.ceil(
      (new Date(attempt.locked_until).getTime() - Date.now()) / 60000
    );
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${minutesLeft} minute(s).` },
      { status: 429 }
    );
  }

  const expected = await getExpectedAdminToken();
  if (!expected) {
    return NextResponse.json(
      { error: "Admin login isn't configured yet (missing ADMIN_PASSWORD)." },
      { status: 500 }
    );
  }

  const isCorrect = (await tokenFromPassword(password)) === expected;

  if (!isCorrect) {
    if (supabaseAdmin) {
      const nextCount = (attempt?.failed_count ?? 0) + 1;
      const locked = nextCount >= MAX_ATTEMPTS;
      await supabaseAdmin.from("admin_login_attempts").upsert({
        identifier: ip,
        failed_count: locked ? 0 : nextCount,
        locked_until: locked ? new Date(Date.now() + LOCK_DURATION_MS).toISOString() : null,
        last_attempt_at: new Date().toISOString(),
      });

      if (locked) {
        return NextResponse.json(
          { error: "Too many failed attempts. Locked for 5 hours." },
          { status: 429 }
        );
      }
    }
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  if (supabaseAdmin && attempt) {
    await supabaseAdmin.from("admin_login_attempts").delete().eq("identifier", ip);
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
