"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm font-medium text-navy/60 transition-colors hover:text-saffron"
    >
      Log out
    </button>
  );
}
