/** Ancestor folder paths (with trailing `/`) to expand so a file under `parentPath` is visible. */
export function getParentPathsToExpand(parentPath: string | null | undefined): string[] {
  if (!parentPath || parentPath === '') return [];
  const parts = parentPath.replace(/\/$/, '').split('/').filter(Boolean);
  const result: string[] = [];
  let acc = '';
  for (const p of parts) {
    acc += p + '/';
    result.push(acc);
  }
  return result;
}

export function getExt(fileName: string | null | undefined): string {
  if (!fileName || typeof fileName !== 'string') return '';
  const lastDot = fileName.lastIndexOf('.');
  return lastDot > 0 ? fileName.slice(lastDot) : '';
}
