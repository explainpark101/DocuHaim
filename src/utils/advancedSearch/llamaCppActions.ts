/**
 * llama.cpp server actions for Advanced Search (Tauri desktop).
 */

import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { buildLlamaCppDownloadConfirmMessage } from '@/utils/llamaCppHuggingFace';
import { loadLlamaCppSettings } from '@/utils/llamaCppSettingsStore';
import {
  downloadLlamaCppModel,
  getLastLlamaCppDownloadRepoId,
  probeLlamaCppCli,
  startLlamaCppServer,
  stopLlamaCppServer,
} from '@/utils/llamaCppShell';

export type LlamaCppActionId =
  | 'llama-cpp-server-start'
  | 'llama-cpp-server-stop'
  | 'llama-cpp-download-last';

export type LlamaCppActionHandler = () => void | Promise<void>;

type Listener = () => void;

const handlers = new Map<LlamaCppActionId, LlamaCppActionHandler>();
const listeners = new Set<Listener>();
let llamaCppAvailable = false;

function notify(): void {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // ignore
    }
  }
}

export async function refreshLlamaCppActionAvailability(): Promise<boolean> {
  if (!isTauriDesktopPlatform()) {
    llamaCppAvailable = false;
    notify();
    return false;
  }
  const probe = await probeLlamaCppCli();
  llamaCppAvailable = probe.available;
  notify();
  return llamaCppAvailable;
}

export function isLlamaCppActionsAvailable(): boolean {
  return isTauriDesktopPlatform() && llamaCppAvailable;
}

export function registerLlamaCppActions(
  next: Partial<Record<LlamaCppActionId, LlamaCppActionHandler>>,
): () => void {
  const keys = Object.keys(next) as LlamaCppActionId[];
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn === 'function') handlers.set(key, fn);
  }
  void refreshLlamaCppActionAvailability();
  notify();
  return () => {
    for (const key of keys) handlers.delete(key);
    notify();
  };
}

export function subscribeLlamaCppActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isLlamaCppActionId(id: string | undefined | null): id is LlamaCppActionId {
  return Boolean(id && handlers.has(id as LlamaCppActionId));
}

export function runLlamaCppAction(id: string): boolean {
  const fn = handlers.get(id as LlamaCppActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] llama-cpp action failed', id, err);
    return false;
  }
}

export type LlamaCppActionCommandDef = {
  id: LlamaCppActionId;
  title: string;
  description: string;
  keywords: string[];
};

export const LLAMA_CPP_ACTION_COMMANDS: readonly LlamaCppActionCommandDef[] = [
  {
    id: 'llama-cpp-server-start',
    title: 'llama.cpp start server',
    description: 'Start llama-server with the selected GGUF model',
    keywords: ['llama', 'llama.cpp', 'gguf', 'start', 'server', 'local llm'],
  },
  {
    id: 'llama-cpp-server-stop',
    title: 'llama.cpp stop server',
    description: 'Stop the local llama-server started from this app',
    keywords: ['llama', 'llama.cpp', 'stop', 'server', 'local llm'],
  },
  {
    id: 'llama-cpp-download-last',
    title: 'llama.cpp download last model',
    description: 'Download the last searched or pasted Hugging Face GGUF model',
    keywords: ['llama', 'llama.cpp', 'download', 'huggingface', 'gguf', 'model'],
  },
];

export async function runLlamaCppServerStartAction(): Promise<void> {
  await startLlamaCppServer(loadLlamaCppSettings());
}

export async function runLlamaCppServerStopAction(): Promise<void> {
  await stopLlamaCppServer();
}

export function buildLlamaCppDownloadLastConfirm(repoId: string): {
  title: string;
  message: string;
} {
  return buildLlamaCppDownloadConfirmMessage(repoId);
}

export async function runLlamaCppDownloadLastAction(): Promise<void> {
  const repoId = getLastLlamaCppDownloadRepoId() || loadLlamaCppSettings().selectedModelId;
  if (!repoId) throw new Error('No llama.cpp model selected for download.');
  await downloadLlamaCppModel(repoId);
}
