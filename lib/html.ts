// Helpers for the HTML-formatted product descriptions coming from the PIM catalog.

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "span",
  "div",
]);

const TAG_PATTERN = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

function escapeText(text: string): string {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Keeps only a small allowlist of formatting tags and drops every attribute
 * (inline styles, event handlers, links). Anything else is removed, and the
 * contents of script/style blocks are discarded entirely.
 */
export function sanitizeHtml(html: string): string {
  const withoutBlocks = html.replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, "");

  let result = "";
  let lastIndex = 0;
  for (const match of withoutBlocks.matchAll(TAG_PATTERN)) {
    result += escapeText(withoutBlocks.slice(lastIndex, match.index));
    lastIndex = match.index! + match[0].length;

    const [, closing, rawTag] = match;
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) continue;
    if (tag === "br") {
      result += "<br />";
    } else {
      result += closing ? `</${tag}>` : `<${tag}>`;
    }
  }
  result += escapeText(withoutBlocks.slice(lastIndex));
  return result;
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  eacute: "é",
};

/** Converts an HTML description into plain text, e.g. for short previews. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<\/?(p|br|h[1-6]|li|ul|ol|div)\b[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (entity, code: string) => {
      if (code[0] === "#") {
        const value = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
        return Number.isNaN(value) ? entity : String.fromCodePoint(value);
      }
      return ENTITIES[code.toLowerCase()] ?? entity;
    })
    .replace(/\s+/g, " ")
    .trim();
}
