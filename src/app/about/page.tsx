import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { founder, siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";

const description =
  "Learn about WAFI & CO., Chartered Accountants, our founder, and our approach to audit, tax, and financial advisory.";

export const metadata: Metadata = {
  title: "About Us | " + siteConfig.name,
  description,
  openGraph: {
    title: "About Us | " + siteConfig.name,
    description,
    url: `${siteConfig.url}/about`,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | " + siteConfig.name,
    description,
    images: ["/og-image.jpg"],
  },
};

const values = [
  {
    title: "Integrity",
    body: "We give advice we'd act on ourselves — clear, honest, and in your best interest.",
    accent: "bg-gradient-navy",
  },
  {
    title: "Precision",
    body: "Numbers matter. We double-check the details so you never have to worry about them.",
    accent: "bg-gradient-saffron",
  },
  {
    title: "Partnership",
    body: "We see ourselves as an extension of your team, invested in your business's long-term success.",
    accent: "bg-gradient-gold",
  },
];

const vmo = [
  {
    title: "Vision",
    accent: "text-gradient-navy",
    body: "To be the most trusted Chartered Accountancy firm in the region — recognised for integrity, precision, and financial guidance that helps every client grow with confidence.",
  },
  {
    title: "Mission",
    accent: "text-gradient-saffron",
    body: "To deliver accurate, timely, and practical audit, tax, and advisory services that keep our clients fully compliant while giving them the clarity to make sound business decisions.",
  },
  {
    title: "Objectives",
    accent: "text-gradient-gold",
    list: [
      "Deliver accurate, on-time compliance across audit, tax, GST, and regulatory filings",
      "Provide proactive, business-first advisory rather than reactive service",
      "Build long-term client relationships grounded in transparency and trust",
      "Stay current with evolving tax, GST, and regulatory frameworks",
      "Support client growth through sound financial planning and structuring",
    ],
  },
];

export default function AboutPage() {
  const founderPhotoExists = fs.existsSync(
    path.join(process.cwd(), "public", "Founder.jpg")
  );

  return (
    <>
      <section className="relative overflow-hidden bg-banner text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
        <div className="gradient-blob absolute -top-24 -right-16 h-72 w-72 rounded-full bg-saffron/20" />
        <div className="gradient-blob absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-gold/15" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <p className="animate-in text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            About Us
          </p>
          <h1 className="animate-in animate-in-delay-1 mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            A Chartered Accountancy firm built on{" "}
            <span className="text-gradient-brand">trust and clarity.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <h2 className="font-serif text-2xl text-navy">Who we are</h2>
          <p className="text-body mt-4 text-navy/75">
            {siteConfig.fullName} is a professional public accounting and
            financial consultancy firm based in Kozhikode (Calicut), Kerala,
            with our office in the Puthiyangadi area along Kannur Road. We
            work with individuals, independent businesses, and corporate
            clients across a range of compliance, advisory, and assurance
            functions.
          </p>
          <p className="text-body mt-4 text-navy/75">
            Our practice spans taxation and regulatory advisory — including
            direct and indirect tax compliance, corporate and individual tax
            filing, and structured GST compliance covering GSTR data
            management, reconciliations, and zero-rated export filings;
            accounting and financial reporting, including bookkeeping,
            accounting system implementation, and ledger reconciliation;
            audit and assurance services, including financial statement
            audits, internal control reviews, and statutory tax audits
            carried out in line with ICAI standards; business start-up
            and corporate consultancy, covering company formation, MCA
            compliance, and statutory registrations; and corporate
            restructuring and business process reengineering, helping
            businesses reorganise and run more efficiently.
          </p>
          <p className="text-body mt-4 text-navy/75">
            Our approach combines technical rigor with practical, plain-language
            advice — so you always understand exactly where your business
            stands and what to do next.
          </p>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-center font-serif text-2xl text-navy">
              Vision, Mission &amp; Objectives
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {vmo.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card-glass h-full rounded-2xl p-6">
                  <h3 className={`font-serif text-xl ${item.accent}`}>
                    {item.title}
                  </h3>
                  {item.body && (
                    <p className="text-body mt-3 text-sm leading-relaxed text-navy/70">
                      {item.body}
                    </p>
                  )}
                  {item.list && (
                    <ul className="mt-3 space-y-2">
                      {item.list.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm leading-relaxed text-navy/70"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <h2 className="font-serif text-2xl text-navy">Founder</h2>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <div className="card-glass grid gap-8 rounded-3xl p-8 sm:grid-cols-[240px_1fr] sm:items-start">
            <div className="mx-auto h-[320px] w-[240px] shrink-0 overflow-hidden rounded-2xl bg-field-navy sm:mx-0">
              {founderPhotoExists ? (
                <Image
                  src="/Founder.jpg"
                  alt={`${founder.name}, Founder of WAFI & CO.`}
                  width={240}
                  height={320}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-navy/40">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <span className="text-xs font-medium">Photo coming soon</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-serif text-xl text-navy">{founder.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-saffron">
                {founder.credentials}
              </p>
              <p className="text-body mt-4 text-sm leading-relaxed text-navy/70">
                {founder.name} is the founder of {siteConfig.fullName} and a
                Startup Advisor helping early-stage businesses build strong
                financial foundations from day one. He is an active member of
                the Kozhikode branch of the Institute of Chartered Accountants
                of India (ICAI).
              </p>
              <p className="text-body mt-3 text-sm leading-relaxed text-navy/70">
                He is a Costing Subject Expert, specialising in product
                profitability, cost analysis, and cost planning. He also
                creates educational content to make professional financial
                concepts more accessible to students and early-career
                professionals.
              </p>
              <div className="mt-5 flex gap-4">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 p-2 text-navy/60 transition-all duration-300 hover:scale-110 hover:border-saffron hover:text-saffron"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.02 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.98c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.69V23h-4.5V8.25z" />
                  </svg>
                </a>
                <a
                  href={founder.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 p-2 text-navy/60 transition-all duration-300 hover:scale-110 hover:border-saffron hover:text-saffron"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href={founder.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 p-2 text-navy/60 transition-all duration-300 hover:scale-110 hover:border-saffron hover:text-saffron"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 22v-8.5H16l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36c-.26-.03-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.77v2.5H8.2v3h2.43V22h2.87z" />
                  </svg>
                </a>
                <a
                  href={founder.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex items-center justify-center rounded-full border border-navy/15 p-2 text-navy/60 transition-all duration-300 hover:scale-110 hover:border-saffron hover:text-saffron"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-serif text-2xl text-navy">What we value</h2>
          </Reveal>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="group card-glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
                  <div
                    className={`h-1.5 w-10 rounded-full ${value.accent} transition-all duration-300 group-hover:w-16`}
                  />
                  <h3 className="mt-4 font-serif text-lg text-navy">
                    {value.title}
                  </h3>
                  <p className="text-body mt-2 text-sm leading-relaxed text-navy/70">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-banner px-8 py-14 text-center text-white sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
          <div className="gradient-blob absolute -top-16 left-1/3 h-56 w-56 rounded-full bg-saffron/30" />
          <h2 className="relative font-serif text-3xl">
            Ready to work with a firm that knows your business?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">
            Get in touch to start a conversation about your audit, tax, or
            advisory needs.
          </p>
          <Link
            href="/contact"
            className="relative mt-8 inline-block rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-8 py-3 text-sm font-semibold text-navy shadow-md transition-[background-position,transform] duration-300 hover:bg-right hover:-translate-y-0.5"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
