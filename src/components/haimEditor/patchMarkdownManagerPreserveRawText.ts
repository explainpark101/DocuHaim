/**
 * TipTap MarkdownManager escapes `\\` `*` `_` `[` `]` `~` and HTML-encodes
 * `& < >` on every text serialize. That pollutes vault source when users
 * toggle raw markdown ↔ WYSIWYG. Patch the manager to emit literal text.
 */

type MarkdownManagerLike = {
  encodeTextForMarkdown?: (text: string, ...rest: unknown[]) => string
  escapeMarkdownSyntax?: (text: string) => string
}

/**
 * Disable TipTap serialize-time markdown/HTML escaping on a MarkdownManager.
 * Safe to call more than once.
 */
export function patchMarkdownManagerPreserveRawText(
  manager: unknown,
): void {
  if (!manager || typeof manager !== 'object') return
  const m = manager as MarkdownManagerLike & { __haimRawTextPatched?: boolean }
  if (m.__haimRawTextPatched) return

  // encodeTextForMarkdown is the sole serialize path for text nodes;
  // returning the raw string skips both escapeMarkdownSyntax and encodeHtmlEntities.
  m.encodeTextForMarkdown = (text: string) => text
  m.escapeMarkdownSyntax = (text: string) => text
  m.__haimRawTextPatched = true
}
