import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Careers | " + siteConfig.name,
  description:
    "Join WAFI & CO., Chartered Accountants. Explore career opportunities and apply.",
};

const values = [
  {
    title: "Real experience",
    body: "Work directly on audit, tax, and advisory engagements from day one — not just back-office paperwork.",
    accent: "bg-gradient-navy",
  },
  {
    title: "Mentorship",
    body: "Learn directly from qualified Chartered Accountants in a hands-on, practice-focused environment.",
    accent: "bg-gradient-saffron",
  },
  {
    title: "Growth",
    body: "As the firm grows, so do the opportunities to take on more responsibility and build your career.",
    accent: "bg-gradient-gold",
  },
];

export default function CareerPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-banner text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
        <div className="gradient-blob absolute -top-20 -right-16 h-72 w-72 rounded-full bg-saffron/20" />
        <div className="gradient-blob absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gold/15" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <p className="animate-in text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Careers
          </p>
          <h1 className="animate-in animate-in-delay-1 mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Build your career with{" "}
            <span className="text-gradient-brand">WAFI & CO.</span>
          </h1>
          <p className="text-body animate-in animate-in-delay-2 mt-6 max-w-xl text-lg text-white/80">
            We&apos;re always open to hearing from motivated people who want
            to grow in audit, tax, and accounting. Tell us about yourself
            below.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-center font-serif text-2xl text-navy">
              Why work with us
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="card-glass h-full rounded-2xl p-6">
                  <div className={`h-1.5 w-10 rounded-full ${value.accent}`} />
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

      <section className="mx-auto max-w-2xl px-6 py-20">
        <Reveal>
          <h2 className="text-center font-serif text-2xl text-navy">
            Apply for a role
          </h2>
          <p className="text-body mt-3 text-center text-sm text-navy/70">
            Don&apos;t see an open position that fits? Send us your details
            anyway — we keep applications on file for future openings.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <CareerApplicationForm />
        </Reveal>
      </section>
    </>
  );
}
