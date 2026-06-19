/**
 * Minimal Markdown → plain-text helper.
 *
 * Used by FAQAccordion.astro to populate `FAQPage` JSON-LD `acceptedAnswer.text`.
 * Google requires the JSON-LD answer to match what users see in the DOM (within tolerance),
 * so we strip Markdown syntax from the raw answer body and emit clean readable prose.
 *
 * Keeps things deliberately simple — FAQ answers are short, hand-authored markdown.
 * If we ever need full fidelity (tables, nested lists, etc.), swap to remark/rehype.
 */
export function markdownToPlainText(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // Strip fenced code blocks (```...```)
  text = text.replace(/```[\s\S]*?```/g, '');
  // Strip inline code ticks
  text = text.replace(/`([^`]*)`/g, '$1');
  // Images: ![alt](url) → alt
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
  // Links: [text](url) → text
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  // Headings: leading # marks
  text = text.replace(/^#{1,6}\s+/gm, '');
  // Blockquotes
  text = text.replace(/^\s{0,3}>\s?/gm, '');
  // Bold / italic / strikethrough markers
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/~~([^~]+)~~/g, '$1');
  // List bullets / numbered lists
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');
  // Horizontal rules
  text = text.replace(/^\s*[-*_]{3,}\s*$/gm, '');
  // HTML tags (defensive)
  text = text.replace(/<[^>]+>/g, '');

  // Collapse whitespace: turn newlines into spaces, then squeeze
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}
