import type { ReactNode } from "react";
import Link from "next/link";

class KeyGen {
  private n = 0;
  next() {
    return this.n++;
  }
}

function renderInline(text: string, keys: KeyGen): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*([^*]+)\*|\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={keys.next()}>{renderInline(match[1], keys)}</strong>);
    } else if (match[2] !== undefined) {
      parts.push(<em key={keys.next()}>{renderInline(match[2], keys)}</em>);
    } else if (match[3] !== undefined) {
      parts.push(
        <Link
          key={keys.next()}
          href="/contact"
          className="text-saffron transition-colors hover:text-gold"
        >
          {match[3]}
        </Link>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

// Lightweight markdown renderer for Insights article bodies — supports
// headings (##/###), bold/italic, bullet and numbered lists, horizontal
// rules, bold-only lines as mini-headings (used for FAQ questions), and
// [bracketed] CTA phrases turned into links to the Contact page.
export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  const keys = new KeyGen();
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line === "---") {
      blocks.push(<hr key={keys.next()} className="my-8 border-navy/10" />);
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={keys.next()} className="mt-6 font-serif text-lg text-navy">
          {renderInline(line.slice(4), keys)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={keys.next()} className="mt-8 font-serif text-2xl text-navy">
          {renderInline(line.slice(3), keys)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      // Skip a top-level H1 — the page already renders the title separately.
      i++;
      continue;
    }

    const boldOnlyMatch = /^\*\*(.+)\*\*$/.exec(line);
    if (boldOnlyMatch) {
      blocks.push(
        <p key={keys.next()} className="mt-6 font-semibold text-navy">
          {renderInline(boldOnlyMatch[1], keys)}
        </p>
      );
      i++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={keys.next()} className="mt-3 list-disc space-y-1.5 pl-5 text-navy/70">
          {items.map((item) => (
            <li key={keys.next()}>{renderInline(item, keys)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={keys.next()} className="mt-3 list-decimal space-y-1.5 pl-5 text-navy/70">
          {items.map((item) => (
            <li key={keys.next()}>{renderInline(item, keys)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      lines[i].trim() !== "---" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push(
      <p key={keys.next()} className="mt-4 text-navy/70">
        {renderInline(paraLines.join(" "), keys)}
      </p>
    );
  }

  return <div className="text-body-justify">{blocks}</div>;
}
