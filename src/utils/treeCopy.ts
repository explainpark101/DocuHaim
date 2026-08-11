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

/**
 * Prefer the original name when free; otherwise `name (1).ext`, `name (2).ext`, …
 * Used when uploading into a folder that already has a same-named file.
 */
export function allocateUniqueNumberedName(
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
  let counter = 1;
  let candidate = `${baseName} (${counter})${ext}`;
  while (existing.has(candidate.toLowerCase())) {
    counter += 1;
    candidate = `${baseName} (${counter})${ext}`;
  }
  return candidate;
}

/** Child entry names in a File System Access directory handle. */
export async function listFileSystemDirectoryNames(
  dirHandle: FileSystemDirectoryHandle,
): Promise<string[]> {
  const names: string[] = [];
  const dirAny = dirHandle as FileSystemDirectoryHandle & {
    values: () => AsyncIterableIterator<FileSystemHandle>;
  };
  for await (const entry of dirAny.values()) {
    if (entry?.name) names.push(entry.name);
  }
  return names;
}

/**
 * Pick a free file/folder name under `dirHandle` using `name (1)` / `name (2)` …
 * when the original name is already taken.
 */
export async function allocateUniqueFileSystemName(
  dirHandle: FileSystemDirectoryHandle,
  originalName: string,
  options?: { isFolder?: boolean },
): Promise<string> {
  const existing = await listFileSystemDirectoryNames(dirHandle);
  return allocateUniqueNumberedName(originalName, existing, {
    isFolder: options?.isFolder === true,
  });
}

/** Case-insensitive name presence check for sibling entries. */
export function treeChildNameTaken(
  existingNames: Iterable<string>,
  name: string,
): boolean {
  const lower = String(name || '').toLowerCase();
  if (!lower) return false;
  for (const entry of existingNames) {
    if (String(entry || '').toLowerCase() === lower) return true;
  }
  return false;
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
