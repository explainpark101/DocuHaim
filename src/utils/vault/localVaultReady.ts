/**
 * Whether Local Haim has an open vault root.
 * Web uses File System Access handles; Tauri shells use an absolute fs path.
 */
export function isLocalVaultReady(
  rootHandle: FileSystemDirectoryHandle | null | undefined,
  vaultFsPath: string | null | undefined,
): boolean {
  return Boolean(rootHandle || String(vaultFsPath || '').trim());
}

/** Last path segment of an absolute vault path (folder display name). */
export function basenameFromVaultPath(absolutePath: string | null | undefined): string {
  const path = String(absolutePath || '')
    .replace(/[/\\]+$/, '')
    .trim();
  if (!path) return '';
  const parts = path.split(/[/\\]/).filter(Boolean);
  return parts[parts.length - 1] || '';
}
