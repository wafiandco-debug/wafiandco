import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getExpectedAdminToken, tokenFromPassword } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const password = body?.password?.toString() ?? "";

  const expected = await getExpectedAdminToken();
  if (!expected) {
    return NextResponse.json(
      { error: "Admin login isn't configured yet (missing ADMIN_PASSWORD)." },
      { status: 500 }
    );
  }

  if ((await tokenFromPassword(password)) !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
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
