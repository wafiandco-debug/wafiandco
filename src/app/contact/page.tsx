import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | " + siteConfig.name,
  description:
    "Get in touch with WAFI & CO., Chartered Accountants, in Calicut, Kerala.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-banner text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
        <div className="gradient-blob absolute -top-20 -right-16 h-72 w-72 rounded-full bg-saffron/20" />
        <div className="gradient-blob absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gold/15" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <p className="animate-in text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Contact
          </p>
          <h1 className="animate-in animate-in-delay-1 mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Let&apos;s talk about{" "}
            <span className="text-gradient-brand">your business.</span>
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-2xl text-navy">Get in touch</h2>
            <dl className="mt-6 space-y-5 text-navy/75">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-saffron">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a href={siteConfig.phoneHref} className="transition-colors hover:text-saffron">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-saffron">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.publicEmail}`}
                    className="transition-colors hover:text-saffron"
                  >
                    {siteConfig.publicEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-saffron">
                  Office
                </dt>
                <dd className="mt-1">{siteConfig.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-saffron">
                  Follow us
                </dt>
                <dd className="mt-2 flex gap-4">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-block transition-all duration-300 hover:scale-110 hover:text-saffron"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                    className="inline-block transition-all duration-300 hover:scale-110 hover:text-saffron"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </a>
                </dd>
              </div>
            </dl>

            <div className="card-glass mt-8 overflow-hidden rounded-2xl">
              <iframe
                title="WAFI & CO. office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  siteConfig.address
                )}&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
        </div>
      </section>
    </>
  );
}
