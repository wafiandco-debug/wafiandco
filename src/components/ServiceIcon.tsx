const paths: Record<string, React.ReactNode> = {
  audit: (
    <>
      <path d="M9 3h6l5 5v13H4V3h5Z" />
      <path d="M14 3v5h5" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  "virtual-cfo": (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-5 3 3 5-7" />
    </>
  ),
  gst: (
    <>
      <path d="M4 7h16M4 12h16M4 17h10" />
      <circle cx="18" cy="17" r="2" />
    </>
  ),
  itr: (
    <>
      <path d="M8 3h8l4 4v14H4V3h4Z" />
      <path d="M14 3v4h4" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  accounting: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  "mca-filings": (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </>
  ),
  incorporation: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  certifications: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14-2 7 5-3 5 3-2-7" />
    </>
  ),
  advisory: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.4 8.4 8.5 8.5 0 0 1-4-1L3 20l1.1-5.6a8.4 8.4 0 1 1 16.9-2.9Z" />
      <path d="M8 10h8M8 13.5h5" />
    </>
  ),
  "corporate-restructuring": (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <circle cx="5" cy="19" r="1.8" />
      <circle cx="19" cy="19" r="1.8" />
      <path d="M12 6.3v3.7M12 10l-6 7M12 10l6 7" />
    </>
  ),
  bpr: (
    <>
      <path d="M4 4v5h5" />
      <path d="M20 20v-5h-5" />
      <path d="M5 15a8 8 0 0 0 14.3 3.5M19 9A8 8 0 0 0 4.7 5.5" />
    </>
  ),
  trademark: (
    <>
      <path d="M12 2l7 3v6c0 5-3 8.5-7 11-4-2.5-7-6-7-11V5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
};

export default function ServiceIcon({
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
