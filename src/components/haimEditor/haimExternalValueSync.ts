/**
 * Parent `value` sync helpers for HaimEditor.
 *
 * Dual-pane debounce emits vault markdown via onChange; React state echoes
 * that value back. Applying it again stomps in-flight TipTap/CM edits
 * (common while typing in lists) and resets WYSIWYG scroll.
 */

/**
 * True when `externalValue` is only the echo of markdown we already emitted.
 * In that case the live editor must not be rewritten.
 */
export function isVaultValueEcho(
  externalValue: string,
  lastEmittedMd: string,
): boolean {
  return externalValue === lastEmittedMd;
}

/**
 * Mount, unmount flush, and unfocused split panes can emit "" before the
 * document is ready. That must not replace a loaded note body.
 * A real clear is allowed only after the user has edited this document.
 */
export function shouldEmitVaultMarkdown(options: {
  markdown: string;
  parentMarkdown: string;
  userEdited: boolean;
}): boolean {
  const markdown = options.markdown ?? '';
  const parent = options.parentMarkdown ?? '';
  if (markdown === parent) return false;
  if (markdown === '' && parent !== '' && !options.userEdited) return false;
  return true;
}
