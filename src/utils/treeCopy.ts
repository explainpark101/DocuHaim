const COPY_SUFFIX = ' (복사본)';

export function isTreeCopyModifierHeld(
  event?: { ctrlKey?: boolean; altKey?: boolean } | null,
): boolean {
  if (!event) return false;
  return Boolean(event.ctrlKey || event.altKey);
}

export function splitCopyBaseName(
  name: string,
  isFolder = false,
): { baseName: string; ext: string } {
  if (isFolder) {
    return { baseName: name || 'folder', ext: '' };
  }
  const lastDot = name.lastIndexOf('.');
  if (lastDot > 0) {
    return { baseName: name.slice(0, lastDot), ext: name.slice(lastDot) };
  }
  return { baseName: name || 'file', ext: '' };
}

/**
 * Keep the original name when the destination is free.
 * Same-folder duplicate or a name clash uses " (복사본)" then " (복사본) (1)".
 */
export function allocateUniqueCopyName(
  originalName: string,
  existingNames: Iterable<string>,
  options?: { forceSuffix?: boolean; isFolder?: boolean },
): string {
  const existing = new Set(
    Array.from(existingNames, (entry) => String(entry || '').toLowerCase()).filter(Boolean),
  );
  const forceSuffix = options?.forceSuffix === true;
  const isFolder = options?.isFolder === true;
  if (!forceSuffix && originalName && !existing.has(originalName.toLowerCase())) {
    return originalName;
  }

  const { baseName, ext } = splitCopyBaseName(originalName, isFolder);
  let candidate = `${baseName}${COPY_SUFFIX}${ext}`;
  let counter = 1;
  while (existing.has(candidate.toLowerCase())) {
    candidate = `${baseName}${COPY_SUFFIX} (${counter})${ext}`;
    counter += 1;
  }
  return candidate;
}

export function getTreeChildNames(
  tree: Array<{ name?: string; children?: unknown[] }> | null | undefined,
  folderPath: string,
  findNode: (
    nodes: unknown,
    path: string,
  ) => { children?: Array<{ name?: string }> } | null,
): string[] {
  if (!Array.isArray(tree)) return [];
  if (!folderPath) {
    return tree.map((node) => node.name).filter((name): name is string => Boolean(name));
  }
  const folder = findNode(tree, folderPath);
  return (folder?.children || [])
    .map((child) => child.name)
    .filter((name): name is string => Boolean(name));
}
