import Link from "next/link";
import { industries, services, siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import IndustryIcon from "@/components/IndustryIcon";

const whyUs = [
  {
    title: "Deep compliance expertise",
    body: "From statutory audits to GST filings, we stay ahead of every regulatory change so you don't have to.",
  },
  {
    title: "Personal, responsive service",
    body: "Direct access to the people handling your accounts — no call centres, no runaround.",
  },
  {
    title: "Business-first advice",
    body: "We look beyond compliance to help you plan cash flow, manage growth, and make sound financial decisions.",
  },
];

const cardGradients = [
  "bg-gradient-navy",
  "bg-gradient-saffron",
  "bg-gradient-gold",
];

const industryAccents = ["text-navy", "text-saffron", "text-gold"];

const industryColumns = [0, 1, 2].map((col) =>
  industries.slice(col * 6, col * 6 + 6)
);

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-banner text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
        <div className="gradient-blob absolute -top-24 -right-24 h-80 w-80 rounded-full bg-saffron/25" />
        <div className="gradient-blob absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-gold/20" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="animate-in text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Chartered Accountants · Calicut
          </p>
          <h1 className="animate-in animate-in-delay-1 mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Sound financial guidance for businesses that{" "}
            <span className="text-gradient-brand">mean to grow.</span>
          </h1>
          <p className="text-body animate-in animate-in-delay-2 mt-6 max-w-xl font-garet text-lg tracking-wide text-white/80">
            <span className="font-bold">{siteConfig.name}</span>, Chartered
            Accountants provides Audit, Virtual CFO, GST, ITR, Incorporation,
            Certifications, Advisory, Corporate Restructuring, BPR and
            Accounting Services built around clarity, compliance, and your
            long-term goals.
          </p>
          <div className="animate-in animate-in-delay-3 mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-brand bg-[length:200%_200%] bg-left px-7 py-3 text-sm font-semibold text-navy shadow-md transition-[background-position,transform] duration-300 hover:bg-right hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-saffron py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl text-navy">Our Services</h2>
            <Link href="/services" className="hidden sm:block text-sm font-medium text-saffron hover:underline">
              View all services →
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/services#${service.slug}`}
                  id={service.slug}
                  className="card-glass group block h-full scroll-mt-24 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${cardGradients[i % cardGradients.length]} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <ServiceIcon slug={service.slug} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-navy">{service.title}</h3>
                  <p className="text-body mt-2 text-sm leading-relaxed text-navy/70">
                    {service.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-saffron opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link href="/services" className="mt-8 inline-block sm:hidden text-sm font-medium text-saffron hover:underline">
            View all services →
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-serif text-3xl text-navy">
              Industries we serve<span className="text-saffron">.</span>
            </h2>
            <p className="text-body mt-4 max-w-3xl text-navy/70">
              We work with clients across a wide range of industries, bringing
              the same rigor and attention to detail to every sector —
              whatever your business looks like, we can support its finances.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {industryColumns.map((column, colIndex) => (
                <div key={colIndex} className="grid gap-y-2.5">
                  {column.map((industry, i) => (
                    <div
                      key={industry.slug}
                      className="flex items-center gap-4 py-0.5"
                    >
                      <IndustryIcon
                        slug={industry.slug}
                        className={`h-7 w-7 shrink-0 ${industryAccents[(colIndex * 6 + i) % industryAccents.length]}`}
                      />
                      <span className="font-medium text-navy">{industry.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-serif text-3xl text-navy">Why WAFI & CO.</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="h-1 w-8 rounded-full bg-gradient-brand" />
                <h3 className="mt-4 font-serif text-lg text-navy">{item.title}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed text-navy/70">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-banner px-8 py-14 text-center text-white sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
          <div className="gradient-blob absolute -top-16 left-1/4 h-56 w-56 rounded-full bg-saffron/30" />
          <div className="gradient-blob absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-gold/25" />
          <h2 className="relative font-serif text-3xl">
            Ready to put your finances in order?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">
            Get in touch for a conversation about audit, tax, or
            accounting support tailored to your business.
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
