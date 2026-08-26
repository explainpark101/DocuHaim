/**
 * Desktop OS / CLI / Android intent open-file bridge.
 * Routes paths under the Local vault to vault notes; otherwise session workspace.
 */

import { isDesktopApp } from '@/utils/shared/isDesktopApp';
import {
  loadLocalVaultFsPath,
  relativePathUnderVault,
} from '@/utils/vault/localVaultPathStore';
import {
  workspaceFromInputFiles,
  type SessionWorkspace,
} from '@/utils/vault/sessionWorkspace';

export const DESKTOP_OPEN_FILES_EVENT = 'desktop-open-files';

type Listener = (paths: string[]) => void;
type UnlistenFn = () => void;

const queue: string[] = [];
const listeners = new Set<Listener>();
let started = false;
let unlisten: UnlistenFn | null = null;

function enqueue(paths: string[]): void {
  const next = (Array.isArray(paths) ? paths : [])
    .map((p) => String(p || '').trim())
    .filter(Boolean);
  if (!next.length) return;
  for (const p of next) {
    if (!queue.includes(p)) queue.push(p);
  }
  const snapshot = [...queue];
  for (const listener of listeners) {
    try {
      listener(snapshot);
    } catch {
      // ignore
    }
  }
}

export function takeDesktopOpenPathQueue(): string[] {
  return queue.splice(0, queue.length);
}

export function subscribeDesktopOpenFiles(listener: Listener): () => void {
  listeners.add(listener);
  if (queue.length) listener([...queue]);
  return () => {
    listeners.delete(listener);
  };
}

/** Start listening for OS / CLI / Android intent open-file events (Tauri builds). */
export async function startDesktopOpenFilesBridge(): Promise<void> {
  if (!isDesktopApp() || started || typeof window === 'undefined') return;
  started = true;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const pending = await invoke<string[]>('take_pending_open_paths');
    enqueue(pending || []);
  } catch {
    // command may be unavailable in plain vite preview
  }
  try {
    const { listen } = await import('@tauri-apps/api/event');
    unlisten = await listen<string[]>(DESKTOP_OPEN_FILES_EVENT, (event) => {
      enqueue(event.payload || []);
    });
  } catch {
    // ignore
  }
}

export function stopDesktopOpenFilesBridge(): void {
  unlisten?.();
  unlisten = null;
  started = false;
}

export type DesktopOpenRoute =
  | { kind: 'vault'; relativePath: string }
  | { kind: 'session'; workspace: SessionWorkspace };

function basename(path: string): string {
  const n = String(path || '').replace(/\\/g, '/');
  const withoutQuery = n.split('?')[0] || n;
  const parts = withoutQuery.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || 'note.md';
  try {
    return decodeURIComponent(last);
  } catch {
    return last;
  }
}

async function readOpenPathBytes(abs: string): Promise<Uint8Array> {
  try {
    const { readFile } = await import('@tauri-apps/plugin-fs');
    const bytes = await readFile(abs);
    return bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  } catch {
    // Android content:// and some SAF paths need ContentResolver via Rust.
    const { invoke } = await import('@tauri-apps/api/core');
    const bytes = await invoke<number[]>('read_open_uri', { path: abs });
    return new Uint8Array(bytes || []);
  }
}

/**
 * Route absolute OS paths / content URIs: under registered vault → relative local note; else session.
 */
export async function resolveDesktopOpenPaths(
  absolutePaths: string[],
): Promise<DesktopOpenRoute[]> {
  const vaultRoot = loadLocalVaultFsPath();
  const routes: DesktopOpenRoute[] = [];

  for (const abs of absolutePaths) {
    const relative = vaultRoot ? relativePathUnderVault(abs, vaultRoot) : null;
    if (relative) {
      routes.push({ kind: 'vault', relativePath: relative });
      continue;
    }
    try {
      const bytes = await readOpenPathBytes(abs);
      const name = basename(abs);
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      const file = new File([copy], name, {
        type:
          name.toLowerCase().endsWith('.md') || name.toLowerCase().endsWith('.markdown')
            ? 'text/markdown'
            : 'application/octet-stream',
      });
      const workspace = await workspaceFromInputFiles(
        [{ relativePath: name, file }],
        'md',
        name,
      );
      routes.push({ kind: 'session', workspace });
    } catch (e) {
      console.warn('Failed to open desktop path as session:', abs, e);
    }
  }

  return routes;
}
