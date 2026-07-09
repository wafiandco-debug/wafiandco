import Link from "next/link";
import Image from "next/image";
import { navLinks, services, siteConfig } from "@/lib/site";

// Footer-only display order (client-specified), chosen so paired rows in the
// two-column list line up evenly — e.g. the two-line "Incorporation Services"
// sits next to the two-line "BPR", rather than each column drifting out of
// alignment with flat source order.
const footerServiceOrder = [
  "audit",
  "virtual-cfo",
  "gst",
  "itr",
  "accounting",
  "mca-filings",
  "incorporation",
  "bpr",
  "corporate-restructuring",
  "trademark",
  "certifications",
  "advisory",
];
const footerServices = footerServiceOrder
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is (typeof services)[number] => Boolean(s));

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-banner-footer text-mist">
      <div className="h-[3px] bg-gradient-brand" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/82" />
      <div className="gradient-blob absolute -top-32 -right-24 h-72 w-72 rounded-full bg-saffron/10" />
      <div className="gradient-blob absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-gold/10" />
      <div className="relative mx-auto max-w-6xl px-8 py-10 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <Image
            src="/wafi-logo-text.png"
            alt="WAFI & CO. Chartered Accountants"
            width={361}
            height={92}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm leading-relaxed text-mist">
            {siteConfig.description}
          </p>
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3 lg:grid-cols-[0.8fr_1.6fr_1fr]">
          <div className="sm:border-l sm:border-white/15 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
            <h3 className="font-serif text-lg text-white">Navigate</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-saffron-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:border-l sm:border-white/15 sm:pl-8">
            <h3 className="font-serif text-lg text-white">Services</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="block leading-snug transition-colors hover:text-saffron-light"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:border-l sm:border-white/15 sm:pl-8">
            <h3 className="font-serif text-lg text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={siteConfig.phoneHref} className="whitespace-nowrap transition-colors hover:text-saffron-light">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.publicEmail}`} className="whitespace-nowrap transition-colors hover:text-saffron-light">
                  {siteConfig.publicEmail}
                </a>
              </li>
              <li className="leading-snug">{siteConfig.address}</li>
            </ul>
            <div className="mt-5 flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-block transition-all duration-300 hover:scale-110 hover:text-saffron-light"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={siteConfig.social.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Business Profile"
                className="inline-block transition-all duration-300 hover:scale-110 hover:text-saffron-light"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-5 text-center text-xs text-mist/80">
        © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
      </div>
    </footer>
  );
}
