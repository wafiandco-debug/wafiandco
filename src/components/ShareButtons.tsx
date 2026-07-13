"use client";

const shareTargets = (url: string, title: string) => [
  {
    label: "WhatsApp",
    href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    color: "#25D366",
    icon: (
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2Zm0 1.8a8.1 8.1 0 0 1 6.9 12.4l-.2.4.6 2.2-2.3-.6-.4.2a8.1 8.1 0 1 1-4.6-14.6ZM9.2 7.4c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3l-1.9-.9c-.3-.1-.5-.1-.6.1l-.6.9c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.3 0-.5l-.9-2.1Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: "#0A66C2",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.02 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.98c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.69V23h-4.5V8.25z" />
    ),
  },
  {
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "#1877F2",
    icon: (
      <path d="M13.5 22v-8.5H16l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36c-.26-.03-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.77v2.5H8.2v3h2.43V22h2.87z" />
    ),
  },
];

export default function ShareButtons({
  url,
  title,
  slug,
}: {
  url: string;
  title: string;
  slug: string;
}) {
  function trackShare() {
    fetch(`/api/insights/${slug}/share`, { method: "POST" }).catch(() => {});
  }

  return (
    <div className="mt-10 flex items-center gap-4 border-t border-navy/10 pt-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-navy/50">
        Share this article
      </span>
      <div className="flex gap-3">
        {shareTargets(url, title).map((target) => (
          <a
            key={target.label}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${target.label}`}
            style={{ color: target.color }}
            className="inline-flex items-center justify-center rounded-full border border-navy/15 p-2 transition-all duration-300 hover:scale-110 hover:border-current"
            onClick={trackShare}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              {target.icon}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
