/**
 * Pick a viewer when clearing a stuck `viewer:"loading"` shell (cold restore /
 * open failure). Prefer markdown for note-like paths so split panes do not land
 * on the unsupported placeholder after a failed or superseded fetch.
 */
export function viewerAfterLoadingSettle(params: {
  path: string;
  name?: string;
  keptContent?: string;
}): 'markdown' | 'unsupported' {
  const kept = typeof params.keptContent === 'string' ? params.keptContent : '';
  if (kept.length > 0) return 'markdown';
  const name = String(params.name || '');
  const path = String(params.path || '');
  const leaf = (path.split('/').filter(Boolean).pop() || name).toLowerCase();
  const nameLower = name.toLowerCase();
  if (/\.(md|markdown)$/i.test(leaf) || /\.(md|markdown)$/i.test(nameLower)) {
    return 'markdown';
  }
  // Extension-less vault notes open as markdown in selectFileRaw.
  if (leaf && !leaf.includes('.')) return 'markdown';
  return 'unsupported';
}
