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
  lastEmittedMd: string | null,
): boolean {
  return lastEmittedMd != null && externalValue === lastEmittedMd;
}

/**
 * Whether parent `value` must be written into the live editor.
 * A fetched note often arrives after TipTap was created from an empty mount.
 * That body is not an echo of a keystroke, so debounce / last-emitted must
 * not skip it until the user has actually edited.
 */
export function shouldApplyExternalVaultMarkdown(options: {
  externalValue: string;
  liveMarkdown: string;
  lastEmittedMd: string | null;
  fileChanged: boolean;
  userEdited: boolean;
  localInputActive: boolean;
}): boolean {
  const external = options.externalValue ?? '';
  const live = options.liveMarkdown ?? '';
  if (live === external) return false;
  if (!options.userEdited) return true;
  if (
    !options.fileChanged
    && isVaultValueEcho(external, options.lastEmittedMd)
  ) {
    return false;
  }
  if (!options.fileChanged && options.localInputActive) return false;
  return true;
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
