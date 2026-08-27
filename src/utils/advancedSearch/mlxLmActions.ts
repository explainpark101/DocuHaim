/**
 * MLX-LM server actions for Advanced Search (Tauri macOS only).
 */

import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  buildMlxLmDownloadConfirmMessage,
  resolveMlxLmDownloadMode,
} from '@/utils/mlxLmHuggingFace';
import { loadMlxLmSettings } from '@/utils/mlxLmSettingsStore';
import {
  downloadMlxLmModel,
  getLastMlxLmDownloadRepoId,
  probeMlxLmCli,
  startMlxLmServer,
  stopMlxLmServer,
} from '@/utils/mlxLmShell';

export type MlxLmActionId =
  | 'mlx-lm-server-start'
  | 'mlx-lm-server-stop'
  | 'mlx-lm-download-last';

export type MlxLmActionHandler = () => void | Promise<void>;

type Listener = () => void;

const handlers = new Map<MlxLmActionId, MlxLmActionHandler>();
const listeners = new Set<Listener>();
let mlxLmAvailable = false;

function notify(): void {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // ignore
    }
  }
}

export async function refreshMlxLmActionAvailability(): Promise<boolean> {
  if (!isTauriMacOS()) {
    mlxLmAvailable = false;
    notify();
    return false;
  }
  const probe = await probeMlxLmCli();
  mlxLmAvailable = probe.available;
  notify();
  return mlxLmAvailable;
}

export function isMlxLmActionsAvailable(): boolean {
  return isTauriMacOS() && mlxLmAvailable;
}

export function registerMlxLmActions(
  next: Partial<Record<MlxLmActionId, MlxLmActionHandler>>,
): () => void {
  const keys = Object.keys(next) as MlxLmActionId[];
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn === 'function') handlers.set(key, fn);
  }
  void refreshMlxLmActionAvailability();
  notify();
  return () => {
    for (const key of keys) handlers.delete(key);
    notify();
  };
}

export function subscribeMlxLmActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isMlxLmActionId(id: string | undefined | null): id is MlxLmActionId {
  return Boolean(id && handlers.has(id as MlxLmActionId));
}

export function runMlxLmAction(id: string): boolean {
  const fn = handlers.get(id as MlxLmActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] mlx-lm action failed', id, err);
    return false;
  }
}

export type MlxLmActionCommandDef = {
  id: MlxLmActionId;
  title: string;
  description: string;
  keywords: string[];
};

export const MLX_LM_ACTION_COMMANDS: readonly MlxLmActionCommandDef[] = [
  {
    id: 'mlx-lm-server-start',
    title: 'MLX-LM server start',
    description: 'Start local MLX-LM server with the selected model',
    keywords: ['mlx', 'mlx-lm', 'server', 'start', 'apple silicon', 'local llm'],
  },
  {
    id: 'mlx-lm-server-stop',
    title: 'MLX-LM server stop',
    description: 'Stop the MLX-LM server started from this app',
    keywords: ['mlx', 'mlx-lm', 'server', 'stop', 'apple silicon'],
  },
  {
    id: 'mlx-lm-download-last',
    title: 'MLX-LM download last model',
    description: 'Download the last searched or pasted Hugging Face model',
    keywords: ['mlx', 'mlx-lm', 'download', 'huggingface', 'model'],
  },
];

/** Helpers used by settings UI action registration. */
export async function runMlxLmServerStartAction(): Promise<void> {
  await startMlxLmServer(loadMlxLmSettings());
}

export async function runMlxLmServerStopAction(): Promise<void> {
  await stopMlxLmServer();
}

export function buildMlxLmDownloadLastConfirm(repoId: string): {
  title: string;
  message: string;
  mode: ReturnType<typeof resolveMlxLmDownloadMode>;
} {
  const mode = resolveMlxLmDownloadMode(repoId);
  return { ...buildMlxLmDownloadConfirmMessage(repoId, mode), mode };
}

export async function runMlxLmDownloadLastAction(): Promise<void> {
  const repoId = getLastMlxLmDownloadRepoId() || loadMlxLmSettings().selectedModelId;
  if (!repoId) throw new Error('No MLX model selected for download.');
  await downloadMlxLmModel(repoId);
}
