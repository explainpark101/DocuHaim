import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  normalizeMlxVlmImages,
  toMlxVlmWorkerImagePayload,
  type MlxVlmImageInput,
} from '@/utils/llm/mlxVlmImagePayload';
import { appendMlxVlmServerLog, resetMlxVlmServerLog } from '@/utils/llm/mlxVlmServerLog';
import { loadMlxVlmSettings, type MlxVlmSettings } from '@/utils/llm/mlxVlmSettingsStore';
import { mergeLlmStreamChunk } from '@/utils/llm/llmStreamChunk';
import { resolveMlxVlmWorkerScriptPath } from '@/utils/llm/mlxVlmWorkerScriptPath';

type WorkerChild = {
  kill: () => Promise<void>;
  write: (data: string | Uint8Array) => Promise<void>;
};

type PendingRequest = {
  resolve: (text: string) => void;
  reject: (error: Error) => void;
  onChunk?: (accumulated: string) => void;
  streamText?: string;
};

/** @deprecated Use mergeLlmStreamChunk — kept for existing imports/tests. */
export function mergeMlxVlmStreamChunk(previous: string, segment: string): string {
  return mergeLlmStreamChunk(previous, segment);
}

export type MlxVlmRuntimeStatus = {
  workerRunning: boolean;
  loaded: boolean;
  model: string | null;
};

type WorkerMessage = {
  type?: string;
  id?: string;
  text?: string;
  message?: string;
  model?: string;
  loaded?: boolean;
};

let workerChild: WorkerChild | null = null;
let loadedModelId: string | null = null;
let stdoutBuffer = '';
const pendingRequests = new Map<string, PendingRequest>();

const UV_TOOL_RUN = {
  generateHelp: ['-lc', 'exec "$0" tool run --from mlx-vlm python -m mlx_vlm.generate --help'] as const,
  worker: ['-lc', 'exec "$0" tool run --from mlx-vlm python -u "$1"'] as const,
};

function requireMacSupport(): void {
  if (!isTauriMacOS()) {
    throw new Error('MLX-VLM is only available in the Tauri macOS build.');
  }
}

function rejectAllPending(error: Error): void {
  for (const pending of pendingRequests.values()) {
    pending.reject(error);
  }
  pendingRequests.clear();
}

function handleWorkerMessage(raw: WorkerMessage): void {
  const type = String(raw.type || '');
  const id = String(raw.id || '');

  if (type === 'boot') return;

  if (type === 'loaded') {
    loadedModelId = String(raw.model || '').trim() || null;
    if (id && pendingRequests.has(id)) {
      pendingRequests.get(id)?.resolve('');
      pendingRequests.delete(id);
    }
    return;
  }

  if (type === 'unloaded') {
    loadedModelId = null;
    if (id && pendingRequests.has(id)) {
      pendingRequests.get(id)?.resolve('');
      pendingRequests.delete(id);
    }
    return;
  }

  if (type === 'ready') {
    loadedModelId = raw.loaded && raw.model ? String(raw.model) : loadedModelId;
    if (id && pendingRequests.has(id)) {
      pendingRequests.get(id)?.resolve('');
      pendingRequests.delete(id);
    }
    return;
  }

  if (type === 'error') {
    const message = String(raw.message || 'MLX-VLM worker error');
    appendMlxVlmServerLog(`[error] ${message}\n`);
    if (id && pendingRequests.has(id)) {
      const pending = pendingRequests.get(id);
      pendingRequests.delete(id);
      pending?.reject(new Error(message));
    }
    return;
  }

  if (!id || !pendingRequests.has(id)) return;
  const pending = pendingRequests.get(id);
  if (!pending) return;

  if (type === 'chunk') {
    const segment = String(raw.text || '');
    if (!segment) return;
    const accumulated = mergeLlmStreamChunk(pending.streamText ?? '', segment);
    pending.streamText = accumulated;
    pending.onChunk?.(accumulated);
    return;
  }

  if (type === 'done') {
    pendingRequests.delete(id);
    pending.resolve(String(raw.text || '').trim());
  }
}

function consumeWorkerStdout(chunk: string): void {
  stdoutBuffer += chunk;
  let newline = stdoutBuffer.indexOf('\n');
  while (newline >= 0) {
    const line = stdoutBuffer.slice(0, newline).trim();
    stdoutBuffer = stdoutBuffer.slice(newline + 1);
    if (line) {
      try {
        handleWorkerMessage(JSON.parse(line) as WorkerMessage);
      } catch {
        appendMlxVlmServerLog(`[worker parse error] ${line}\n`);
      }
    }
    newline = stdoutBuffer.indexOf('\n');
  }
}

async function ensureWorkerProcess(uvPath: string): Promise<void> {
  if (workerChild) return;

  const scriptPath = await resolveMlxVlmWorkerScriptPath();
  resetMlxVlmServerLog();
  appendMlxVlmServerLog(`Starting MLX-VLM worker\n  script: ${scriptPath}\n\n`);

  const { Command } = await import('@tauri-apps/plugin-shell');
  const command = Command.create('mlx-vlm-generate-worker', [
    ...UV_TOOL_RUN.worker,
    uvPath,
    scriptPath,
  ]);

  command.stdout.on('data', (line) => {
    const text = String(line ?? '');
    appendMlxVlmServerLog(text);
    consumeWorkerStdout(text);
  });
  command.stderr.on('data', (line) => {
    appendMlxVlmServerLog(String(line ?? ''));
  });
  command.on('close', (payload) => {
    appendMlxVlmServerLog(
      `\n[worker exited code=${payload.code} signal=${payload.signal ?? 'none'}]\n`,
    );
    workerChild = null;
    loadedModelId = null;
    rejectAllPending(new Error('MLX-VLM worker exited unexpectedly.'));
  });
  command.on('error', (error) => {
    appendMlxVlmServerLog(`\n[worker error: ${String(error)}]\n`);
  });

  workerChild = await command.spawn();
}

async function writeWorkerRequest(payload: Record<string, unknown>): Promise<void> {
  if (!workerChild) throw new Error('MLX-VLM worker is not running.');
  await workerChild.write(`${JSON.stringify(payload)}\n`);
}

function logMlxVlmRuntimeError(message: string): void {
  appendMlxVlmServerLog(`[error] ${message}\n`);
}

async function workerRequest(
  payload: Record<string, unknown>,
  options?: { onChunk?: (accumulated: string) => void; timeoutMs?: number },
): Promise<string> {
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `mlx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return new Promise<string>((resolve, reject) => {
    const timer =
      typeof window !== 'undefined'
        ? window.setTimeout(() => {
            pendingRequests.delete(id);
            const message = 'MLX-VLM worker request timed out.';
            logMlxVlmRuntimeError(message);
            reject(new Error(message));
          }, options?.timeoutMs ?? 120_000)
        : null;

    pendingRequests.set(id, {
      resolve: (text) => {
        if (timer !== null) window.clearTimeout(timer);
        resolve(text);
      },
      reject: (error) => {
        if (timer !== null) window.clearTimeout(timer);
        reject(error);
      },
      ...(options?.onChunk ? { onChunk: options.onChunk } : {}),
    });

    void writeWorkerRequest({ ...payload, id }).catch((error) => {
      pendingRequests.delete(id);
      if (timer !== null) window.clearTimeout(timer);
      reject(error instanceof Error ? error : new Error(String(error)));
    });
  });
}

export function isMlxVlmRuntimeManagedByApp(): boolean {
  return workerChild !== null;
}

export function getMlxVlmRuntimeStatusSync(): MlxVlmRuntimeStatus {
  return {
    workerRunning: workerChild !== null,
    loaded: Boolean(loadedModelId),
    model: loadedModelId,
  };
}

export async function getMlxVlmRuntimeStatus(): Promise<MlxVlmRuntimeStatus> {
  if (!workerChild) {
    return { workerRunning: false, loaded: false, model: null };
  }
  try {
    await workerRequest({ type: 'ping' }, { timeoutMs: 5_000 });
  } catch {
    return getMlxVlmRuntimeStatusSync();
  }
  return getMlxVlmRuntimeStatusSync();
}

export async function startMlxVlmRuntime(
  settings: MlxVlmSettings = loadMlxVlmSettings(),
  uvPath: string,
): Promise<{ model: string }> {
  requireMacSupport();
  const model = String(settings.selectedModelId || '').trim();
  if (!model) throw new Error('Select a model before starting MLX-VLM.');

  await ensureWorkerProcess(uvPath);

  if (loadedModelId === model) {
    return { model };
  }

  if (loadedModelId) {
    await workerRequest({ type: 'unload' }, { timeoutMs: 30_000 });
  }

  appendMlxVlmServerLog(`Loading model via mlx_vlm.generate worker\n  model: ${model}\n\n`);
  try {
    await workerRequest(
      {
        type: 'load',
        model,
        ...(settings.adapterPath.trim() ? { adapter_path: settings.adapterPath.trim() } : {}),
      },
      { timeoutMs: 600_000 },
    );
  } catch (err) {
    throw err instanceof Error ? err : new Error(String(err));
  }

  if (loadedModelId !== model) {
    const message = 'MLX-VLM model did not load in time.';
    logMlxVlmRuntimeError(message);
    throw new Error(message);
  }

  return { model };
}

export async function stopMlxVlmRuntime(): Promise<void> {
  if (!workerChild) return;
  appendMlxVlmServerLog('\n[stop requested by app]\n');
  try {
    if (loadedModelId) {
      await workerRequest({ type: 'unload' }, { timeoutMs: 30_000 });
    }
  } catch {
    // continue shutdown
  }
  try {
    await workerChild.kill();
  } finally {
    workerChild = null;
    loadedModelId = null;
    rejectAllPending(new Error('MLX-VLM worker stopped.'));
  }
}

export type { MlxVlmImageInput } from '@/utils/llm/mlxVlmImagePayload';

export type MlxVlmGenerateParams = {
  prompt: string;
  systemPrompt?: string;
  images?: MlxVlmImageInput[];
  /** OpenAI-compatible generation kwargs mapped for mlx_vlm.stream_generate. */
  generateOptions?: Record<string, unknown>;
  resetCache?: boolean;
  onChunk?: (accumulated: string) => void;
  signal?: AbortSignal;
};

export async function generateMlxVlmCompletion(
  params: MlxVlmGenerateParams,
): Promise<string> {
  requireMacSupport();
  if (!loadedModelId || !workerChild) {
    throw new Error('MLX-VLM model is not loaded. Open Settings > MLX-VLM and start the model.');
  }

  const onAbort = () => {
    rejectAllPending(new Error('Generation cancelled.'));
  };
  params.signal?.addEventListener('abort', onAbort, { once: true });

  const workerImages = toMlxVlmWorkerImagePayload(normalizeMlxVlmImages(params.images));

  try {
    return await workerRequest(
      {
        type: 'generate',
        prompt: params.prompt,
        ...(params.systemPrompt?.trim() ? { system_prompt: params.systemPrompt.trim() } : {}),
        ...(workerImages.length ? { images: workerImages } : {}),
        ...(params.generateOptions && Object.keys(params.generateOptions).length
          ? { generate_options: params.generateOptions }
          : {}),
        reset_cache: params.resetCache !== false,
      },
      {
        ...(params.onChunk ? { onChunk: params.onChunk } : {}),
        timeoutMs: 600_000,
      },
    );
  } finally {
    params.signal?.removeEventListener('abort', onAbort);
  }
}

export const MLX_VLM_GENERATE_HELP_ARGS = UV_TOOL_RUN.generateHelp;
