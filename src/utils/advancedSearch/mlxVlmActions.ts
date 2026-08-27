/**
 * MLX-VLM server actions for Advanced Search (Tauri macOS only).
 */

import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  buildMlxVlmDownloadConfirmMessage,
  resolveMlxVlmDownloadMode,
} from '@/utils/mlxVlmHuggingFace';
import { loadMlxVlmSettings } from '@/utils/mlxVlmSettingsStore';
import {
  downloadMlxVlmModel,
  getLastMlxVlmDownloadRepoId,
  probeMlxVlmCli,
  startMlxVlmServer,
  stopMlxVlmServer,
} from '@/utils/mlxVlmShell';

export type MlxVlmActionId =
  | 'mlx-vlm-server-start'
  | 'mlx-vlm-server-stop'
  | 'mlx-vlm-download-last';

export type MlxVlmActionHandler = () => void | Promise<void>;

type Listener = () => void;

const handlers = new Map<MlxVlmActionId, MlxVlmActionHandler>();
const listeners = new Set<Listener>();
let mlxVlmAvailable = false;

function notify(): void {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // ignore
    }
  }
}

export async function refreshMlxVlmActionAvailability(): Promise<boolean> {
  if (!isTauriMacOS()) {
    mlxVlmAvailable = false;
    notify();
    return false;
  }
  const probe = await probeMlxVlmCli();
  mlxVlmAvailable = probe.available;
  notify();
  return mlxVlmAvailable;
}

export function isMlxVlmActionsAvailable(): boolean {
  return isTauriMacOS() && mlxVlmAvailable;
}

export function registerMlxVlmActions(
  next: Partial<Record<MlxVlmActionId, MlxVlmActionHandler>>,
): () => void {
  const keys = Object.keys(next) as MlxVlmActionId[];
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn === 'function') handlers.set(key, fn);
  }
  void refreshMlxVlmActionAvailability();
  notify();
  return () => {
    for (const key of keys) handlers.delete(key);
    notify();
  };
}

export function subscribeMlxVlmActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isMlxVlmActionId(id: string | undefined | null): id is MlxVlmActionId {
  return Boolean(id && handlers.has(id as MlxVlmActionId));
}

export function runMlxVlmAction(id: string): boolean {
  const fn = handlers.get(id as MlxVlmActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] mlx-vlm action failed', id, err);
    return false;
  }
}

export type MlxVlmActionCommandDef = {
  id: MlxVlmActionId;
  title: string;
  description: string;
  keywords: string[];
};

export const MLX_VLM_ACTION_COMMANDS: readonly MlxVlmActionCommandDef[] = [
  {
    id: 'mlx-vlm-server-start',
    title: 'MLX-VLM load model',
    description: 'Load the selected MLX-VLM model into the local generate worker',
    keywords: ['mlx', 'mlx-vlm', 'load', 'runtime', 'start', 'apple silicon', 'local llm'],
  },
  {
    id: 'mlx-vlm-server-stop',
    title: 'MLX-VLM unload model',
    description: 'Unload the MLX-VLM model from the local generate worker',
    keywords: ['mlx', 'mlx-vlm', 'unload', 'runtime', 'stop', 'apple silicon'],
  },
  {
    id: 'mlx-vlm-download-last',
    title: 'MLX-VLM download last model',
    description: 'Download the last searched or pasted Hugging Face model',
    keywords: ['mlx', 'mlx-vlm', 'download', 'huggingface', 'model'],
  },
];

/** Helpers used by settings UI action registration. */
export async function runMlxVlmServerStartAction(): Promise<void> {
  await startMlxVlmServer(loadMlxVlmSettings());
}

export async function runMlxVlmServerStopAction(): Promise<void> {
  await stopMlxVlmServer();
}

export function buildMlxVlmDownloadLastConfirm(repoId: string): {
  title: string;
  message: string;
  mode: ReturnType<typeof resolveMlxVlmDownloadMode>;
} {
  const mode = resolveMlxVlmDownloadMode(repoId);
  return { ...buildMlxVlmDownloadConfirmMessage(repoId, mode), mode };
}

export async function runMlxVlmDownloadLastAction(): Promise<void> {
  const repoId = getLastMlxVlmDownloadRepoId() || loadMlxVlmSettings().selectedModelId;
  if (!repoId) throw new Error('No MLX model selected for download.');
  await downloadMlxVlmModel(repoId);
}
