/**
 * Heuristic: does `text` look like CommonMark-ish / wiki markdown?
 * Used to auto-enable the composer Markdown switch — prefer recall over precision,
 * but avoid obvious false positives (lone `#`, snake_case underscores, etc.).
 *
 * Avoid lookbehind so older Safari builds stay supported.
 */

const MD_PATTERNS: RegExp[] = [
  // ATX heading
  /^#{1,6}\s+\S/m,
  // Fenced code
  /^```[\w+-]*\s*$/m,
  // Blockquote
  /^>\s+\S/m,
  // Unordered / ordered list
  /^(\s{0,3})([-*+]|\d{1,3}\.)\s+\S/m,
  // Horizontal rule
  /^(\s{0,3})(-{3,}|\*{3,}|_{3,})\s*$/m,
  // Bold **…** or __…__
  /\*\*[^*\n]+?\*\*/,
  /__[^_\n]+?__/,
  // Italic *…* (not bold); reject space-padded * a * (avoids 2 * 3 * 4)
  /(?:^|[^*\w])\*(?!\s|\*)([^*\n]*?[^*\s\n])\*(?!\*)/,
  // Italic _…_ with word boundaries (skip snake_case)
  /(?:^|[^A-Za-z0-9_])_([^_\n]+?)_(?:[^A-Za-z0-9_]|$)/,
  // Strikethrough
  /~~[^~\n]+?~~/,
  // Inline code
  /`[^`\n]+?`/,
  // Link or image
  /!?\[[^\]]*]\([^)\s]+\)/,
  // Wiki image / wikilink used in this app: ![[path]] / [[path]]
  /!?\[\[[^\]]+\]\]/,
];

/**
 * @returns true when the string likely contains intentional markdown markup
 */
export function looksLikeMarkdown(text: string | null | undefined): boolean {
  const s = String(text ?? '');
  if (!s.trim()) return false;
  return MD_PATTERNS.some((re) => re.test(s));
}
