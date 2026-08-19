import type { Metadata } from "next";
import Script from "next/script";
import {
  Inter,
  Lora,
  Quicksand,
  Roboto,
  Open_Sans,
  Merriweather,
  Playfair_Display,
  Montserrat,
  Roboto_Mono,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImageProtection from "@/components/ImageProtection";
import { siteConfig, navLinks, services } from "@/lib/site";
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

// Extra web fonts made available in the Insights rich-text editor's font
// picker — loaded as real webfonts (not OS-dependent names like "Arial")
// so they render identically for every visitor regardless of what's
// installed on their device.
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const defaultDescription =
  "WAFI & CO., Chartered Accountants — Audit, Virtual CFO, GST, ITR, Incorporation, Certifications, Advisory, and Accounting Services in Calicut, Kerala.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "WAFI & CO. | Chartered Accountants",
  description: defaultDescription,
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.303375150623369,
    longitude: 75.76037662699072,
  },
  areaServed: [
    { "@type": "City", name: "Calicut" },
    { "@type": "City", name: "Kozhikode" },
    { "@type": "State", name: "Kerala" },
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: `${siteConfig.url}/services#${service.slug}`,
      },
    })),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "16:30",
    },
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.googleProfile,
  ],
};

// Hints Google's crawler toward the site's top-level page structure — one
// input (among many, and not a guarantee) into whether it ever generates
// Sitelinks under the search result. That decision is otherwise entirely
// algorithmic and tied to accumulated site authority.
const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [...navLinks, { label: "Contact", href: "/contact" }].map(
    (link, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: link.label,
      url: `${siteConfig.url}${link.href === "/" ? "" : link.href}`,
    })
  ),
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
      className={`${inter.variable} ${lora.variable} ${quicksand.variable} ${roboto.variable} ${openSans.variable} ${merriweather.variable} ${playfairDisplay.variable} ${montserrat.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="site-bg-photo" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
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
        <ImageProtection />
      </body>
    </html>
  );
}
