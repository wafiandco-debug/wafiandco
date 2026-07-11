import type { Metadata } from "next";
import Link from "next/link";
import { services, siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import FaqAccordion from "@/components/FaqAccordion";

const description =
  "Audit, Virtual CFO, GST, ITR, MCA Filings, Incorporation, Certifications, Advisory, Corporate Restructuring, BPR and Accounting Services from WAFI & CO., Chartered Accountants.";

export const metadata: Metadata = {
  title: "Services | " + siteConfig.name,
  description,
  openGraph: {
    title: "Services | " + siteConfig.name,
    description,
    url: `${siteConfig.url}/services`,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | " + siteConfig.name,
    description,
    images: ["/og-image.jpg"],
  },
};

const details: Record<string, string[]> = {
  audit: [
    "Statutory audits of Company, LLP and Society",
    "Tax audits under the Income Tax Act",
    "Internal and management audits",
    "Stock and Other Internal Audits",
  ],
  "virtual-cfo": [
    "Budgeting and financial planning",
    "Cash flow monitoring and forecasting",
    "MIS reporting for informed decision-making",
    "Investor and lender-ready financial statements",
  ],
  gst: [
    "GST registration and amendments",
    "Monthly, quarterly and annual return filing",
    "Input tax credit reconciliation",
    "GST advisory and notice handling",
  ],
  itr: [
    "Income tax return filing for individuals and businesses",
    "Tax planning and advance tax computation",
    "TDS compliance and returns",
    "Assessment and notice representation",
  ],
  accounting: [
    "Day-to-day bookkeeping",
    "Payroll processing",
    "Bank reconciliation",
    "Financial statement preparation",
  ],
  "mca-filings": [
    "Annual return and financial statement filing (AOC-4, MGT-7)",
    "Event-based ROC filings — director changes, share allotments",
    "Statutory register maintenance",
    "MCA compliance calendar management",
  ],
  incorporation: [
    "Company and LLP incorporation",
    "Name approval and MOA/AOA drafting",
    "DIN and DSC assistance",
    "Post-incorporation compliance setup",
  ],
  certifications: [
    "Net worth certificates",
    "Turnover certificates",
    "Certificates for Tenders",
    "Other statutory and regulatory certifications",
  ],
  advisory: [
    "Business structuring and entity selection",
    "Financial planning and forecasting",
    "Investment and expansion decisions",
    "General CA advisory on business matters",
  ],
  "corporate-restructuring": [
    "Merger and demerger planning and execution",
    "Business and share transfer structuring",
    "Succession and ownership restructuring",
    "Regulatory and tax-efficient restructuring advice",
  ],
  bpr: [
    "Process mapping and gap analysis",
    "Workflow redesign for efficiency and control",
    "Financial systems and controls implementation",
    "Change management support during rollout",
  ],
  trademark: [
    "Trademark search and availability check",
    "Trademark application filing",
    "Objection and opposition handling",
    "Renewal and portfolio management",
  ],
};

const badgeGradients = [
  "text-gradient-navy",
  "text-gradient-saffron",
  "text-gradient-gold",
];

const fieldBackgrounds = ["bg-field-navy", "bg-field-saffron", "bg-field-gold"];

const cardGradients = ["bg-gradient-navy", "bg-gradient-saffron", "bg-gradient-gold"];

const faqs = [
  {
    question: "How do I get started with WAFI & CO.?",
    answer:
      "Reach out through the contact form, phone, or email with a brief note on what you need. We'll set up a conversation to understand your business and recommend the right mix of services.",
  },
  {
    question: "What documents do I need for ITR or GST filing?",
    answer:
      "It depends on your income sources and business structure. Once we understand your situation, we'll send a clear checklist so you know exactly what to gather before filing.",
  },
  {
    question: "Do you work with businesses outside Calicut?",
    answer:
      "Yes. Most of our compliance and advisory work — GST, ITR, MCA filings, Virtual CFO support — can be handled remotely, with in-person meetings available for clients in and around Calicut.",
  },
  {
    question: "Can you help with both individual and business filings?",
    answer:
      "Yes — we support individuals, proprietorships, partnerships, LLPs, and companies across our full range of services, from personal ITR filing to statutory audits.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-banner text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/85" />
        <div className="gradient-blob absolute -top-20 -right-20 h-72 w-72 rounded-full bg-saffron/20" />
        <div className="gradient-blob absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-gold/15" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <p className="animate-in text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Services
          </p>
          <h1 className="animate-in animate-in-delay-1 mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Complete financial and{" "}
            <span className="text-gradient-brand">compliance support</span>,
            under one roof.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-col gap-8">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 60}>
              <div
                id={service.slug}
                className={`group scroll-mt-24 rounded-3xl ${fieldBackgrounds[i % fieldBackgrounds.length]} p-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start transition-shadow duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${cardGradients[i % cardGradients.length]} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <ServiceIcon slug={service.slug} className="h-6 w-6" />
                  </div>
                  <span
                    className={`font-serif text-4xl ${badgeGradients[i % badgeGradients.length]}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-navy">
                    {service.title}
                  </h2>
                  <p className="text-body mt-3 text-navy/70">
                    {service.summary}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {details[service.slug]?.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-navy/70"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-mixed py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-serif text-3xl text-navy text-center">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-banner px-8 py-14 text-center text-white sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
          <div className="gradient-blob absolute -top-16 left-1/3 h-56 w-56 rounded-full bg-saffron/30" />
          <h2 className="relative font-serif text-3xl">
            Not sure which service you need?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/75">
            Tell us about your business and we&apos;ll recommend the right
            mix of support.
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
