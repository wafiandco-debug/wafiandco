import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Lora, Quicksand } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const defaultDescription =
  "WAFI & CO., Chartered Accountants — Audit, Virtual CFO, GST, ITR, MCA Filings, Incorporation, Certifications, Advisory, Corporate Restructuring, BPR and Accounting Services in Calicut, Kerala.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "WAFI & CO. | Chartered Accountants",
  description: defaultDescription,
  openGraph: {
    title: "WAFI & CO. | Chartered Accountants",
    description: defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAFI & CO. | Chartered Accountants",
    description: defaultDescription,
    images: ["/og-image.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/wafi-logo-text.png`,
  image: `${siteConfig.url}/og-image.jpg`,
  description: defaultDescription,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  email: siteConfig.publicEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: "II Floor, R Square, Kannur Rd, Puthiyangadi",
    addressLocality: "Kozhikode",
    postalCode: "673021",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Calicut" },
    { "@type": "City", name: "Kozhikode" },
    { "@type": "State", name: "Kerala" },
  ],
  priceRange: "$$",
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.googleProfile,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.googleAnalyticsId}');
          `}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
