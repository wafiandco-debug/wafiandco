import type { Metadata } from "next";
import type { ReactNode } from "react";

// admin/login/page.tsx is a client component (needs interactive form
// state), and client components can't export their own metadata — this
// segment layout supplies the title for it instead.
export const metadata: Metadata = {
  title: "Admin Login | WAFI & CO.",
};

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
  return children;
}
