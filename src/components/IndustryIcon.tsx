const paths: Record<string, React.ReactNode> = {
  manufacturing: (
    <>
      <circle cx="8" cy="16" r="3" />
      <path d="M8 13V7a2 2 0 0 1 2-2h2M15 8l3 3-3 3" />
      <path d="M11 5h2" />
    </>
  ),
  "real-estate": (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 12h.01M15 12h.01M9 8h.01M15 8h.01" />
    </>
  ),
  healthcare: (
    <>
      <path d="M20.5 8.5c0 5-8.5 10-8.5 10s-8.5-5-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" />
      <path d="M9 11h2l1-2 2 4 1-2h2" />
    </>
  ),
  hospitality: (
    <>
      <path d="M3 19V9a2 2 0 0 1 2-2h1v4" />
      <path d="M3 19h18" />
      <path d="M6 11h5a2 2 0 0 1 2 2v2H6z" />
      <path d="M21 19v-6a2 2 0 0 0-2-2h-1" />
    </>
  ),
  "food-beverages": (
    <>
      <path d="M5 3v7a3 3 0 0 0 6 0V3" />
      <path d="M8 3v18" />
      <path d="M17 3c-1.5 1.5-2 3-2 5s.5 3 2 4v9" />
    </>
  ),
  "it-ecommerce": (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  trading: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  automotive: (
    <>
      <path d="M3 16V13l2-5h14l2 5v3" />
      <path d="M3 16h18" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </>
  ),
  "sports-brands": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </>
  ),
  retail: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
      <path d="M3 8h18l-1 12H4L3 8Z" />
      <path d="M9 11a3 3 0 0 0 6 0" />
    </>
  ),
  agriculture: (
    <>
      <path d="M12 21V9" />
      <path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7Z" />
      <path d="M12 17c0-3-2.5-5.5-5.5-5.5C6.5 14.5 9 17 12 17Z" />
    </>
  ),
  media: (
    <>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l4 4V7L6 11H5a2 2 0 0 0-2 2Z" />
      <path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" />
    </>
  ),
  travel: (
    <>
      <path d="M2 16l20-7-7 20-3-8-8-3Z" />
    </>
  ),
  logistics: (
    <>
      <rect x="1" y="10" width="13" height="7" rx="1" />
      <path d="M14 12h4l3 3v2h-7z" />
      <circle cx="6" cy="19" r="1.6" />
      <circle cx="17.5" cy="19" r="1.6" />
    </>
  ),
  "corporate-restructuring": (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M12 11 6 17M12 11l6 6" />
    </>
  ),
  bpr: (
    <>
      <path d="M4 4v5h5" />
      <path d="M20 20v-5h-5" />
      <path d="M5 15a8 8 0 0 0 14.3 3.5M19 9A8 8 0 0 0 4.7 5.5" />
    </>
  ),
  ngo: (
    <>
      <path d="M11 13 8 10a2 2 0 0 0-3 2.7l4.8 4.8a3 3 0 0 0 4.2 0L21 10.5a2 2 0 0 0-2.8-2.8L15 10.9" />
      <path d="m3 10 3-3 3 3" />
    </>
  ),
  education: (
    <>
      <path d="M2 8l10-4 10 4-10 4-10-4Z" />
      <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path d="M22 8v6" />
    </>
  ),
  "professional-service": (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <circle cx="12" cy="13" r="2" />
    </>
  ),
  startup: (
    <>
      <path d="M12 2c3 2 5 6 4 12l-4 4-4-4c-1-6 1-10 4-12Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9 17c-2 1-3 3-3 5 2 0 4-1 5-3M15 17c2 1 3 3 3 5-2 0-4-1-5-3" />
    </>
  ),
  advertising: (
    <>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l1 4h2l-1-4h3l6 4V7l-6 4H6a2 2 0 0 0-2 2Z" />
    </>
  ),
};

export default function IndustryIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
