/**
 * Persist absolute local vault root path for the desktop (Tauri) shell.
 * Web builds continue to use File System Access handles only.
 */

const PATH_KEY = 's3haim_local_vault_fs_path';
const NAME_KEY = 's3haim_lastLocalFolderName';

export function loadLocalVaultFsPath(): string {
  if (typeof window === 'undefined') return '';
  try {
    return String(window.localStorage.getItem(PATH_KEY) || '').trim();
  } catch {
    return '';
  }
}

export function saveLocalVaultFsPath(absolutePath: string, folderName?: string): void {
  if (typeof window === 'undefined') return;
  const path = String(absolutePath || '').trim();
  if (!path) return;
  try {
    window.localStorage.setItem(PATH_KEY, path);
    const name =
      String(folderName || '').trim() ||
      path.replace(/[/\\]+$/, '').split(/[/\\]/).filter(Boolean).pop() ||
      '';
    if (name) window.localStorage.setItem(NAME_KEY, name);
  } catch {
    // ignore
  }
}

export function clearLocalVaultFsPath(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(PATH_KEY);
  } catch {
    // ignore
  }
}

/** Normalize for prefix matching (lowercase drive letters on Windows). */
export function normalizeFsPath(path: string): string {
  let p = String(path || '').replace(/\\/g, '/');
  if (/^[A-Za-z]:\//.test(p)) {
    p = p[0]!.toLowerCase() + p.slice(1);
  }
  // Drop trailing slash except drive root like C:/
  if (p.length > 3 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/**
 * If `absolutePath` is under `vaultRoot`, return vault-relative POSIX path; else null.
 */
export function relativePathUnderVault(absolutePath: string, vaultRoot: string): string | null {
  const file = normalizeFsPath(absolutePath);
  const root = normalizeFsPath(vaultRoot);
  if (!file || !root) return null;
  if (file === root) return null;
  if (!file.startsWith(`${root}/`)) return null;
  return file.slice(root.length + 1);
}
