/** Last path segment for display (vault storage paths use `/`). */
export function vaultPathBasename(path: string | null | undefined): string {
  const raw = String(path || '').trim();
  if (!raw) return '';
  const slash = raw.lastIndexOf('/');
  return slash >= 0 ? raw.slice(slash + 1) : raw;
}
