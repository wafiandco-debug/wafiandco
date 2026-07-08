export const ADMIN_COOKIE = "admin_auth";

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Derives a stable, non-reversible token from the admin password so the
// plaintext password never has to be stored in a cookie. Uses Web Crypto
// (not Node's `crypto` module) so it also works in Edge Middleware.
export async function getExpectedAdminToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256(password);
}

export async function tokenFromPassword(password: string): Promise<string> {
  return sha256(password);
}
