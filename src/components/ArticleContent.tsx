import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";

export default function ArticleContent({ html }: { html: string }) {
  const safeHtml = sanitizeArticleHtml(html);
  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
