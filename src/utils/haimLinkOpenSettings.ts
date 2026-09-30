/**
 * Haim WYSIWYG link open UX helpers.
 * Plain click never opens; hover card 「열기」 or Ctrl/Cmd+click does.
 */

/** "Cmd" on Apple, "Ctrl" elsewhere — for concise hover copy. */
export function getHaimLinkOpenModLabel(): string {
  if (typeof navigator === 'undefined') return 'Ctrl';
  const platform = navigator.platform || '';
  const ua = navigator.userAgent || '';
  const apple =
    /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac OS/i.test(ua);
  return apple ? 'Cmd' : 'Ctrl';
}

/** Secondary hint under the hover-card open button. */
export function getHaimLinkOpenHintText(): string {
  return `또는 ${getHaimLinkOpenModLabel()}+클릭`;
}
