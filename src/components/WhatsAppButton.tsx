import { siteConfig } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2Zm0 1.8a8.1 8.1 0 0 1 6.9 12.4l-.2.4.6 2.2-2.3-.6-.4.2a8.1 8.1 0 1 1-4.6-14.6Z" />
        <path d="M9.2 7.4c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3l-1.9-.9c-.3-.1-.5-.1-.6.1l-.6.9c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.3 0-.5l-.9-2.1Z" />
      </svg>
    </a>
  );
}
