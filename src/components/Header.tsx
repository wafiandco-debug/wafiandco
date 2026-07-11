"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-navy/10">
      <div className="h-[3px] bg-gradient-brand" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-[1.03]" onClick={() => setOpen(false)}>
          <Image
            src="/wafi-logo.png"
            alt="WAFI & CO. Chartered Accountants"
            width={532}
            height={130}
            priority
            className="h-[60px] w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-1 text-sm font-medium tracking-wide transition-colors hover:text-saffron ${
                  active ? "text-saffron" : "text-navy"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-gradient-brand transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-gradient-navy bg-[length:150%_150%] bg-left px-5 py-2 text-sm font-medium text-white shadow-sm transition-[background-position,box-shadow] duration-300 hover:bg-right hover:shadow-md"
          >
            Get in touch
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-navy"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden grid overflow-hidden border-navy/10 bg-white transition-[grid-template-rows,border-color] duration-300 ease-out ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <nav className="min-h-0 flex flex-col gap-4 px-6 py-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium text-navy transition-all duration-300 hover:text-saffron ${
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-gradient-navy px-5 py-2 text-center text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
