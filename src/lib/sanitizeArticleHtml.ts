import sanitizeHtml from "sanitize-html";

// Shared allowlist for Insights article content — applied both when saving
// from the admin rich-text editor and when rendering on the public page
// (defense in depth). Covers everything TipTap's toolbar can produce:
// headings, marks (bold/italic/underline/color/font), lists, tables, links.
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "strong",
      "em",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
      "br",
      "blockquote",
      "code",
      "pre",
      "span",
    ],
    allowedAttributes: {
      "*": ["style"],
      a: ["href", "target", "rel"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedStyles: {
      "*": {
        color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(/],
        "font-family": [/^[\w\s,'"()-]+$/],
        "font-size": [/^\d+(\.\d+)?(px|em|rem)$/],
        "text-align": [/^(left|center|right|justify)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}
