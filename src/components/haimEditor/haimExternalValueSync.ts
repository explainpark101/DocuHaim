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
