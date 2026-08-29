/**
 * Vault persistence for Lucivy on-disk shard layout (`.advanced-search/luce/`).
 */

import {
  luceDirKey,
  luceDirPrefix,
  luceKey,
  luceShardConfigKey,
} from '@/utils/advancedSearch/paths';
import type { AdvancedSearchBackend } from '@/utils/advancedSearch/store';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';
import { isTauriApp } from '@/utils/tauriPlatform';
import { gzip } from 'fflate';

function resolveVaultAbsPath(
  backend: AdvancedSearchBackend,
  relPath: string,
): string | null {
  const root = (backend as { vaultRoot?: string }).vaultRoot;
  if (!root) return null;
  const base = String(root).replace(/[/\\]+$/, '');
  const rel = String(relPath || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
  if (!rel) return base;
  return `${base}/${rel}`.replace(/\\/g, '/');
}

function gzipBytesAsync(input: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    gzip(input, { level: 6 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

type VaultTreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: VaultTreeNode[];
};

export async function isLuceDirectoryPresent(
  backend: AdvancedSearchBackend,
): Promise<boolean> {
  if (!backend.readText && !backend.readBytes && !backend.head) return false;
  try {
    if (backend.head) {
      const meta = await backend.head(luceShardConfigKey());
      if (meta) return true;
    }
    if (backend.readText) {
      await backend.readText(luceShardConfigKey());
      return true;
    }
  } catch {
    // fall through
  }
  return false;
}

export async function legacyLuceGzipPresent(
  backend: AdvancedSearchBackend,
): Promise<boolean> {
  if (!backend.readBytes && !backend.head) return false;
  try {
    if (backend.head) {
      const meta = await backend.head(luceKey());
      if (meta) return true;
    }
    if (backend.readBytes) {
      const { body } = await backend.readBytes(luceKey());
      return Boolean(body?.byteLength);
    }
  } catch {
    // ignore
  }
  return false;
}

export function resolveLuceDirAbsPath(
  backend: AdvancedSearchBackend,
): string | null {
  return resolveVaultAbsPath(backend, luceDirKey());
}

async function listChildren(
  backend: AdvancedSearchBackend,
  path: string,
): Promise<VaultTreeNode[]> {
  const list = (
    backend as {
      listChildren?: (p?: string) => Promise<VaultTreeNode[]>;
    }
  ).listChildren;
  if (list) {
    return list(path.replace(/\/$/, ''));
  }
  const all = (await backend.listAll?.()) as VaultTreeNode[] | undefined;
  if (!all?.length) return [];
  const prefix = path.endsWith('/') ? path : `${path}/`;
  const matches: VaultTreeNode[] = [];
  const walk = (nodes: VaultTreeNode[]) => {
    for (const node of nodes) {
      const nodePath = String(node.path || '');
      if (nodePath === path.replace(/\/$/, '') || nodePath === prefix.slice(0, -1)) {
        if (node.type === 'folder' && node.children?.length) {
          matches.push(...node.children);
        }
        continue;
      }
      if (nodePath.startsWith(prefix)) {
        matches.push(node);
      }
      if (node.children?.length) walk(node.children);
    }
  };
  walk(all);
  return matches;
}

/** List vault-relative file paths under `prefix` (files only). */
export async function listVaultFilesUnderPrefix(
  backend: AdvancedSearchBackend,
  prefix: string,
): Promise<string[]> {
  const normalized = prefix.endsWith('/') ? prefix : `${prefix}/`;
  const out: string[] = [];

  const walk = async (dirPath: string): Promise<void> => {
    const children = await listChildren(backend, dirPath.replace(/\/$/, ''));
    for (const child of children) {
      const childPath = String(child.path || '').replace(/^\/+/, '');
      if (!childPath.startsWith(normalized.replace(/^\/+/, ''))) continue;
      if (child.type === 'folder') {
        await walk(childPath.replace(/\/$/, ''));
        continue;
      }
      out.push(childPath);
      if (out.length % 32 === 0) {
        await yieldToMain();
      }
    }
  };

  await walk(normalized.replace(/\/$/, ''));
  return out;
}

export async function deleteLegacyLuceGzip(
  backend: AdvancedSearchBackend,
): Promise<void> {
  try {
    await backend.delete?.(luceKey());
  } catch {
    // ignore missing legacy blob
  }
}

async function uploadLuceFiles(
  backend: AdvancedSearchBackend,
  files: Array<{ path: string; data: Uint8Array }>,
): Promise<void> {
  try {
    await backend.mkdir?.(luceDirKey());
  } catch {
    // ignore
  }
  let i = 0;
  for (const file of files) {
    const vaultPath = `${luceDirPrefix()}${file.path.replace(/^\/+/, '')}`;
    const slash = vaultPath.lastIndexOf('/');
    if (slash > 0) {
      try {
        await backend.mkdir?.(vaultPath.slice(0, slash));
      } catch {
        // ignore
      }
    }
    await backend.writeBytes?.(vaultPath, file.data, 'application/octet-stream');
    i += 1;
    if (i % 8 === 0) {
      await yieldToMain();
    }
  }
}

async function tauriMaterializeSnapshotToDirectory(
  snapshot: Uint8Array | null,
  absDir: string,
): Promise<void> {
  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('as_index_materialize_snapshot_to_directory', {
    snapshot: snapshot && snapshot.byteLength > 0 ? snapshot : null,
    dirPath: absDir,
  });
}

async function tauriMigrateGzipToDirectory(
  gzipAbsPath: string,
  dirAbsPath: string,
): Promise<void> {
  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('as_index_migrate_gzip_to_directory', {
    gzipPath: gzipAbsPath,
    dirPath: dirAbsPath,
  });
}

async function tauriUnpackSnapshotFiles(
  snapshot: Uint8Array,
): Promise<Array<{ path: string; data: Uint8Array }>> {
  const { invoke } = await import('@tauri-apps/api/core');
  const raw = await invoke<Array<{ path: string; data: number[] }>>(
    'as_index_unpack_snapshot_files',
    { snapshot: [...snapshot] },
  );
  return (raw || []).map((entry) => ({
    path: entry.path,
    data: new Uint8Array(entry.data),
  }));
}

/**
 * Ensure `.advanced-search/luce/` exists, migrating legacy gzip when needed.
 * Returns absolute luce dir path for Tauri in-place open (when available).
 */
export async function ensureLuceDirectoryInVault(
  backend: AdvancedSearchBackend,
): Promise<{ luceDirAbsPath: string | null; hasDirectory: boolean }> {
  const luceDirAbsPath = resolveLuceDirAbsPath(backend);
  let hasDirectory = await isLuceDirectoryPresent(backend);

  if (!hasDirectory && luceDirAbsPath && isTauriApp()) {
    const gzipAbs = resolveVaultAbsPath(backend, luceKey());
    if (gzipAbs && (await legacyLuceGzipPresent(backend))) {
      await tauriMigrateGzipToDirectory(gzipAbs, luceDirAbsPath);
      hasDirectory = true;
      await deleteLegacyLuceGzip(backend);
    }
  }

  return { luceDirAbsPath, hasDirectory };
}

/** Persist a LUCE snapshot blob as on-disk shard files in the vault. */
export async function saveLuceSnapshotToVaultDirectory(
  backend: AdvancedSearchBackend,
  snapshot: Uint8Array,
): Promise<void> {
  if (!snapshot.byteLength) return;
  if (!backend.writeBytes) {
    throw new Error('Storage backend cannot persist Lucivy directory index');
  }

  const luceDirAbsPath = resolveLuceDirAbsPath(backend);
  if (luceDirAbsPath && isTauriApp()) {
    await tauriMaterializeSnapshotToDirectory(snapshot, luceDirAbsPath);
    await deleteLegacyLuceGzip(backend);
    return;
  }

  if (isTauriApp()) {
    const files = await tauriUnpackSnapshotFiles(snapshot);
    try {
      await backend.deletePrefix?.(luceDirPrefix());
    } catch {
      // ignore
    }
    await uploadLuceFiles(backend, files);
    await deleteLegacyLuceGzip(backend);
    return;
  }

  // Browser/PWA without native unpack: keep legacy gzip until directory sync ships.
  const luceGz = await gzipBytesAsync(snapshot);
  await backend.writeBytes(luceKey(), luceGz, 'application/gzip');
}
