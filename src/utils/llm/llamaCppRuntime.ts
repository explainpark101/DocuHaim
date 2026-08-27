import { isTauriDesktopPlatform, isTauriMacOS, isTauriWindows } from '@/utils/tauriPlatform';
import {
  appendLlamaCppServerLog,
  resetLlamaCppServerLog,
} from '@/utils/llm/llamaCppServerLog';
import {
  buildLlamaCppBaseUrl,
  loadLlamaCppSettings,
  resolveLlamaCppModelPath,
  type LlamaCppSettings,
} from '@/utils/llm/llamaCppSettingsStore';

type ServerChild = {
  kill: () => Promise<void>;
};

export type LlamaCppRuntimeStatus = {
  serverRunning: boolean;
  loaded: boolean;
  modelPath: string | null;
  baseUrl: string | null;
};

let serverChild: ServerChild | null = null;
let loadedModelPath: string | null = null;
let activeBaseUrl: string | null = null;
let activeStartAbort: AbortController | null = null;

export class LlamaCppServerStartAbortedError extends Error {
  constructor() {
    super('llama.cpp server start cancelled.');
    this.name = 'LlamaCppServerStartAbortedError';
  }
}

export function isLlamaCppServerStartAbortedError(
  err: unknown,
): err is LlamaCppServerStartAbortedError {
  return err instanceof LlamaCppServerStartAbortedError;
}

export function abortLlamaCppServerStart(): void {
  activeStartAbort?.abort();
}

function linkAbortSignal(target: AbortController, source?: AbortSignal | null): () => void {
  if (!source) return () => {};
  if (source.aborted) {
    target.abort(source.reason);
    return () => {};
  }
  const onAbort = () => target.abort(source.reason);
  source.addEventListener('abort', onAbort, { once: true });
  return () => source.removeEventListener('abort', onAbort);
}

function throwIfLlamaCppServerStartAborted(signal: AbortSignal): void {
  if (!signal.aborted) return;
  if (signal.reason instanceof Error) throw signal.reason;
  throw new LlamaCppServerStartAbortedError();
}

const SERVER_READY_TIMEOUT_MS = 600_000;
const SERVER_POLL_INTERVAL_MS = 500;

function requireDesktopSupport(): void {
  if (!isTauriDesktopPlatform()) {
    throw new Error('llama.cpp server is only available in the Tauri desktop build.');
  }
}

export function isLlamaCppRuntimeManagedByApp(): boolean {
  return serverChild !== null;
}

export function getLlamaCppRuntimeStatusSync(): LlamaCppRuntimeStatus {
  return {
    serverRunning: serverChild !== null,
    loaded: Boolean(loadedModelPath),
    modelPath: loadedModelPath,
    baseUrl: activeBaseUrl,
  };
}

function buildHealthUrl(settings: LlamaCppSettings): string {
  const host = settings.serverHost.trim() || '127.0.0.1';
  const port = settings.serverPort;
  return `http://${host}:${port}/health`;
}

/** Poll /health (and /v1/models) until the server accepts requests or timeout. */
export async function waitLlamaCppServerReady(
  settings: LlamaCppSettings,
  timeoutMs: number,
  signal?: AbortSignal,
): Promise<void> {
  const healthUrl = buildHealthUrl(settings);
  const modelsUrl = buildLlamaCppBaseUrl(settings).replace(/\/v1$/, '/v1/models');
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (signal?.aborted) {
      if (signal.reason instanceof Error) throw signal.reason;
      throw new Error('llama.cpp server start cancelled.');
    }
    try {
      const init: RequestInit = signal ? { signal } : {};
      const res = await fetch(healthUrl, init);
      if (res.ok) return;
    } catch (err) {
      if (signal?.aborted) {
        if (signal.reason instanceof Error) throw signal.reason;
        throw err;
      }
    }
    try {
      const init: RequestInit = signal ? { signal } : {};
      const res = await fetch(modelsUrl, init);
      if (res.ok) return;
    } catch (err) {
      if (signal?.aborted) {
        if (signal.reason instanceof Error) throw signal.reason;
        throw err;
      }
    }
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, SERVER_POLL_INTERVAL_MS);
    });
  }
  throw new Error('llama.cpp server did not become ready in time.');
}

function unixSpawnArgs(
  binaryPath: string,
  modelPath: string,
  settings: LlamaCppSettings,
): string[] {
  const host = settings.serverHost.trim() || '127.0.0.1';
  const port = String(settings.serverPort);
  const ctxSize = String(settings.ctxSize || 0);
  const nGpuLayers = String(settings.nGpuLayers ?? -1);
  const apiKey = settings.apiKey.trim();
  const script = apiKey
    ? 'exec "$0" -m "$1" --host "$2" --port "$3" --ctx-size "$4" --n-gpu-layers "$5" --api-key "$6"'
    : 'exec "$0" -m "$1" --host "$2" --port "$3" --ctx-size "$4" --n-gpu-layers "$5"';
  const args: string[] = ['-lc', script, binaryPath, modelPath, host, port, ctxSize, nGpuLayers];
  if (apiKey) args.push(apiKey);
  return args;
}

function windowsSpawnArgs(
  binaryPath: string,
  modelPath: string,
  settings: LlamaCppSettings,
): string[] {
  const host = settings.serverHost.trim() || '127.0.0.1';
  const port = String(settings.serverPort);
  const ctxSize = String(settings.ctxSize || 0);
  const nGpuLayers = String(settings.nGpuLayers ?? -1);
  const apiKey = settings.apiKey.trim();
  const apiKeyArg = apiKey ? ` --api-key "${apiKey.replace(/"/g, '\\"')}"` : '';
  const cmd = `"${binaryPath}" -m "${modelPath}" --host "${host}" --port ${port} --ctx-size ${ctxSize} --n-gpu-layers ${nGpuLayers}${apiKeyArg}`;
  return ['/c', cmd];
}

async function spawnLlamaServerProcess(
  binaryPath: string,
  modelPath: string,
  settings: LlamaCppSettings,
): Promise<ServerChild> {
  const { Command } = await import('@tauri-apps/plugin-shell');

  const isWindows = isTauriWindows();
  const apiKey = settings.apiKey.trim();
  const commandName = isWindows
    ? 'llama-cpp-server-windows'
    : apiKey
      ? 'llama-cpp-server-unix-apikey'
      : 'llama-cpp-server-unix';
  const args = isWindows
    ? windowsSpawnArgs(binaryPath, modelPath, settings)
    : unixSpawnArgs(binaryPath, modelPath, settings);

  resetLlamaCppServerLog();
  appendLlamaCppServerLog(
    `Starting llama-server\n  binary: ${binaryPath}\n  model: ${modelPath}\n  host: ${settings.serverHost}:${settings.serverPort}\n\n`,
  );

  const command = Command.create(commandName, args);
  command.stdout.on('data', (line) => {
    appendLlamaCppServerLog(String(line ?? ''));
  });
  command.stderr.on('data', (line) => {
    appendLlamaCppServerLog(String(line ?? ''));
  });
  command.on('close', (payload) => {
    appendLlamaCppServerLog(
      `\n[server exited code=${payload.code} signal=${payload.signal ?? 'none'}]\n`,
    );
    serverChild = null;
    loadedModelPath = null;
    activeBaseUrl = null;
  });
  command.on('error', (error) => {
    appendLlamaCppServerLog(`\n[server error: ${String(error)}]\n`);
  });

  const child = await command.spawn();
  return child;
}

export async function getLlamaCppRuntimeStatus(): Promise<LlamaCppRuntimeStatus> {
  const sync = getLlamaCppRuntimeStatusSync();
  // Already ready — skip health fetch so Assist Run is not delayed by a hung probe.
  if (!sync.serverRunning || sync.loaded) return sync;

  const settings = loadLlamaCppSettings();
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 1_500);
    try {
      const res = await fetch(buildHealthUrl(settings), { signal: controller.signal });
      if (!res.ok) return getLlamaCppRuntimeStatusSync();
    } finally {
      window.clearTimeout(timer);
    }
  } catch {
    return getLlamaCppRuntimeStatusSync();
  }
  return getLlamaCppRuntimeStatusSync();
}

export async function startLlamaCppRuntime(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
  binaryPath: string,
  options?: { signal?: AbortSignal },
): Promise<{ modelPath: string; baseUrl: string }> {
  requireDesktopSupport();
  const modelPath = resolveLlamaCppModelPath(settings);
  if (!modelPath) {
    throw new Error('Select or install a GGUF model before starting llama.cpp server.');
  }
  if (!binaryPath.trim()) {
    throw new Error('llama-server binary was not found. Set the path in Settings > llama.cpp.');
  }

  const baseUrl = buildLlamaCppBaseUrl(settings);
  const startAbort = new AbortController();
  activeStartAbort = startAbort;
  const unlinkExternalAbort = linkAbortSignal(startAbort, options?.signal);

  try {
    throwIfLlamaCppServerStartAborted(startAbort.signal);

    if (serverChild && loadedModelPath === modelPath && activeBaseUrl === baseUrl) {
      return { modelPath, baseUrl };
    }

    if (serverChild) {
      await stopLlamaCppRuntime();
    }

    serverChild = await spawnLlamaServerProcess(binaryPath, modelPath, settings);
    throwIfLlamaCppServerStartAborted(startAbort.signal);

    try {
      await waitLlamaCppServerReady(settings, SERVER_READY_TIMEOUT_MS, startAbort.signal);
    } catch (err) {
      await stopLlamaCppRuntime();
      if (startAbort.signal.aborted) {
        throw new LlamaCppServerStartAbortedError();
      }
      throw err;
    }

    loadedModelPath = modelPath;
    activeBaseUrl = baseUrl;
    appendLlamaCppServerLog(`\n[server ready] ${baseUrl}\n`);

    return { modelPath, baseUrl };
  } finally {
    unlinkExternalAbort();
    if (activeStartAbort === startAbort) {
      activeStartAbort = null;
    }
  }
}

export async function stopLlamaCppRuntime(): Promise<void> {
  if (!serverChild) return;
  appendLlamaCppServerLog('\n[stop requested by app]\n');
  const child = serverChild;
  serverChild = null;
  loadedModelPath = null;
  activeBaseUrl = null;
  try {
    await child.kill();
  } catch {
    // best-effort
  }
}

export function isLlamaCppCliSupported(): boolean {
  return isTauriDesktopPlatform();
}

export { isTauriMacOS };
