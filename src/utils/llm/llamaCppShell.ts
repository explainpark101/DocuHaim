import { isTauriMacOS, isTauriWindows } from '@/utils/tauriPlatform';
import {
  appendLlamaCppDownloadLog,
  clearLlamaCppDownloadLog,
} from '@/utils/llm/llamaCppDownloadLog';
import { isValidHuggingFaceRepoId } from '@/utils/llm/llamaCppHuggingFace';
import {
  notifyLlamaCppServerStarted,
  notifyLlamaCppRuntimeChanged,
} from '@/utils/llm/llamaCppLoadNotifications';
import {
  addInstalledLlamaCppModel,
  loadLlamaCppSettings,
  mergeInstalledLlamaCppModels,
  normalizeLlamaCppHfDownloadMaxWorkers,
  removeInstalledLlamaCppModel,
  resolveLlamaCppModelPath,
  saveLlamaCppSettings,
  setSelectedLlamaCppModelId,
  type LlamaCppInstalledModel,
  type LlamaCppSettings,
} from '@/utils/llm/llamaCppSettingsStore';
import {
  getLlamaCppRuntimeStatus,
  getLlamaCppRuntimeStatusSync,
  isLlamaCppCliSupported,
  isLlamaCppRuntimeManagedByApp,
  startLlamaCppRuntime,
  stopLlamaCppRuntime,
  type LlamaCppRuntimeStatus,
} from '@/utils/llm/llamaCppRuntime';

export {
  getLlamaCppRuntimeStatus,
  getLlamaCppRuntimeStatusSync,
  isLlamaCppCliSupported,
  isLlamaCppRuntimeManagedByApp,
  startLlamaCppRuntime,
  stopLlamaCppRuntime,
};
export type { LlamaCppRuntimeStatus };

export const LLAMA_SERVER_BIN_PATH_RE =
  /^([A-Za-z]:\\[^\\]+(?:\\[^\\]+)*\\llama-server\.exe|[A-Za-z]:\\[^\\]+(?:\\[^\\]+)*\\llama-server|[\/][A-Za-z0-9._/-]+\/llama-server(?:\.exe)?)$/;

export type LlamaCppToolkitStatus = {
  binaryAvailable: boolean;
  binaryPath?: string;
  hfDownloadAvailable: boolean;
  available: boolean;
  detail?: string;
};

let lastDownloadRepoId = '';
let cachedBinaryPath: string | null | undefined;

type ActiveLlamaCppDownloadSession = {
  repoId: string;
  abortController: AbortController;
  kill: () => Promise<void>;
};

let activeDownloadSession: ActiveLlamaCppDownloadSession | null = null;

export class LlamaCppDownloadAbortedError extends Error {
  readonly repoId: string;

  constructor(repoId: string) {
    super(`Download aborted: ${repoId}`);
    this.name = 'LlamaCppDownloadAbortedError';
    this.repoId = repoId;
  }
}

export function isLlamaCppDownloadAbortedError(err: unknown): err is LlamaCppDownloadAbortedError {
  return err instanceof LlamaCppDownloadAbortedError;
}

export function getActiveLlamaCppDownloadRepoId(): string | null {
  return activeDownloadSession?.repoId ?? null;
}

export function getLastLlamaCppDownloadRepoId(): string {
  return lastDownloadRepoId;
}

export function rememberLlamaCppDownloadTarget(repoId: string): void {
  lastDownloadRepoId = String(repoId || '').trim();
}

export function clearLlamaCppToolkitCache(): void {
  cachedBinaryPath = undefined;
}

const LLAMA_CPP_BREW_INSTALL_SHELL_ARGS = [
  '-lc',
  'export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"; brew install llama.cpp',
] as const;

const LLAMA_CPP_OFFICIAL_INSTALL_SHELL_ARGS = [
  '-lc',
  'curl -LsSf https://llama.app/install.sh | sh',
] as const;

export async function installLlamaCppViaBrewMac(options?: {
  onOutput?: (line: string) => void;
}): Promise<void> {
  requireDesktopSupport();
  if (!isTauriMacOS()) {
    throw new Error('Homebrew install is only available on macOS.');
  }
  const result = await runShellExecute(
    'llama-cpp-brew-install',
    [...LLAMA_CPP_BREW_INSTALL_SHELL_ARGS],
    options?.onOutput,
  );
  clearLlamaCppToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'brew install llama.cpp failed.');
  }
}

export async function installLlamaCppViaOfficialScriptMac(options?: {
  onOutput?: (line: string) => void;
}): Promise<void> {
  requireDesktopSupport();
  if (!isTauriMacOS()) {
    throw new Error('Official installer is only available on macOS.');
  }
  const result = await runShellExecute(
    'llama-cpp-official-install',
    [...LLAMA_CPP_OFFICIAL_INSTALL_SHELL_ARGS],
    options?.onOutput,
  );
  clearLlamaCppToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'llama.cpp official install failed.');
  }
}

export async function installLlamaCppViaScoopWindows(options?: {
  onOutput?: (line: string) => void;
}): Promise<void> {
  requireDesktopSupport();
  if (!isTauriWindows()) {
    throw new Error('Scoop install is only available on Windows.');
  }
  const result = await runShellExecute(
    'llama-cpp-scoop-install',
    ['/c', 'scoop bucket add extras 2>nul & scoop install llama.cpp'],
    options?.onOutput,
  );
  clearLlamaCppToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'scoop install llama.cpp failed.');
  }
}

export function buildLlamaServerBinCandidates(homeDir: string): string[] {
  const home = String(homeDir || '').trim() || '/';
  if (typeof process !== 'undefined' && process.platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || `${home}\\AppData\\Local`;
    return [
      `${localAppData}\\llama.cpp\\llama-server.exe`,
      `${localAppData}\\Programs\\llama.cpp\\llama-server.exe`,
      'llama-server.exe',
    ];
  }
  return [
    `${home}/.local/bin/llama-server`,
    '/opt/homebrew/bin/llama-server',
    '/usr/local/bin/llama-server',
    '/usr/bin/llama-server',
    'llama-server',
  ];
}

export function parseLlamaServerBinPath(output: string): string | null {
  const lines = output
    .split('\n')
    .map((part) => part.trim())
    .filter(Boolean);
  for (const line of lines) {
    if (LLAMA_SERVER_BIN_PATH_RE.test(line)) return line;
  }
  return null;
}

export type LlamaCppServerStatus = {
  loaded: boolean;
  serverRunning: boolean;
  models: string[];
  running: boolean;
  baseUrl: string | null;
};

export async function getLlamaCppServerStatus(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
): Promise<LlamaCppServerStatus> {
  const status = await getLlamaCppRuntimeStatus();
  const loaded = status.loaded;
  const modelPath = status.modelPath || resolveLlamaCppModelPath(settings);
  return {
    loaded,
    serverRunning: status.serverRunning,
    models: modelPath ? [modelPath] : [],
    running: loaded,
    baseUrl: status.baseUrl,
  };
}

export function isLlamaCppServerManagedByApp(): boolean {
  return isLlamaCppRuntimeManagedByApp();
}

function requireDesktopSupport(): void {
  if (!isLlamaCppCliSupported()) {
    throw new Error('llama.cpp server is only available in the Tauri desktop build.');
  }
}

async function runShellExecute(
  name: string,
  args: string[],
  onOutput?: (line: string) => void,
): Promise<{ code: number; stdout: string; stderr: string }> {
  requireDesktopSupport();
  const { Command } = await import('@tauri-apps/plugin-shell');
  const command = Command.create(name, args);
  let stderr = '';
  let stdout = '';

  command.stderr.on('data', (line) => {
    const text = String(line || '');
    stderr += text;
    onOutput?.(text);
  });
  command.stdout.on('data', (line) => {
    const text = String(line || '');
    stdout += text;
    onOutput?.(text);
  });

  const result = await command.execute();
  if (!stderr && result.stderr) stderr = String(result.stderr);
  if (!stdout && result.stdout) stdout = String(result.stdout);
  return { code: result.code ?? 1, stdout, stderr };
}

async function runShellSpawn(
  name: string,
  args: string[],
  options?: {
    onOutput?: (line: string) => void;
    signal?: AbortSignal;
    onChild?: (child: { kill: () => Promise<void> }) => void;
    env?: Record<string, string>;
  },
): Promise<{ code: number; stdout: string; stderr: string; aborted: boolean }> {
  requireDesktopSupport();
  const { Command } = await import('@tauri-apps/plugin-shell');
  const command = Command.create(name, args, options?.env ? { env: options.env } : undefined);
  let stderr = '';
  let stdout = '';
  let aborted = false;

  command.stderr.on('data', (line) => {
    const text = String(line || '');
    stderr += text;
    options?.onOutput?.(text);
  });
  command.stdout.on('data', (line) => {
    const text = String(line || '');
    stdout += text;
    options?.onOutput?.(text);
  });

  const child = await command.spawn();
  options?.onChild?.(child);

  const onAbort = () => {
    aborted = true;
    void child.kill();
  };
  options?.signal?.addEventListener('abort', onAbort, { once: true });

  try {
    const close = await new Promise<{ code: number | null; signal: number | null }>((resolve, reject) => {
      command.on('close', (data) => resolve({ code: data.code, signal: data.signal }));
      command.on('error', (error) => reject(new Error(String(error))));
    });
    return {
      code: close.code ?? 1,
      stdout,
      stderr,
      aborted: aborted || options?.signal?.aborted === true,
    };
  } finally {
    options?.signal?.removeEventListener('abort', onAbort);
  }
}

async function findBinaryViaShellResolve(): Promise<string | null> {
  try {
    const name = isTauriWindows() ? 'llama-cpp-resolve-windows' : 'llama-cpp-resolve-unix';
    const args = isTauriWindows()
      ? ['/c', 'where llama-server.exe 2>nul']
      : [
          '-lc',
          'for p in "$HOME/.local/bin/llama-server" "/opt/homebrew/bin/llama-server" "/usr/local/bin/llama-server" "/usr/bin/llama-server"; do if [ -x "$p" ]; then echo "$p"; exit 0; fi; done; command -v llama-server 2>/dev/null || true',
        ];
    const result = await runShellExecute(name, args);
    return parseLlamaServerBinPath(result.stdout);
  } catch {
    return null;
  }
}

async function findExistingBinary(settings: LlamaCppSettings): Promise<string | null> {
  const manual = settings.binaryPath.trim();
  if (manual && LLAMA_SERVER_BIN_PATH_RE.test(manual)) {
    try {
      const { exists } = await import('@tauri-apps/plugin-fs');
      if (await exists(manual)) return manual;
    } catch {
      return manual;
    }
  }

  try {
    const { homeDir, join } = await import('@tauri-apps/api/path');
    const { exists } = await import('@tauri-apps/plugin-fs');
    const home = await homeDir();
    const candidates = [
      ...buildLlamaServerBinCandidates(home),
      await join(home, '.local', 'bin', 'llama-server'),
    ];
    const seen = new Set<string>();
    for (const candidate of candidates) {
      if (!candidate || seen.has(candidate)) continue;
      seen.add(candidate);
      if (!LLAMA_SERVER_BIN_PATH_RE.test(candidate) && !candidate.endsWith('llama-server.exe')) {
        continue;
      }
      try {
        if (await exists(candidate)) return candidate;
      } catch {
        // try next
      }
    }
  } catch {
    // fall through
  }
  return null;
}

async function probeBinaryRunnable(binaryPath: string): Promise<boolean> {
  try {
    const name = isTauriWindows() ? 'llama-cpp-probe-windows' : 'llama-cpp-probe-unix';
    const args = isTauriWindows()
      ? ['/c', `"${binaryPath}" --help`]
      : ['-lc', '"$0" --help', binaryPath];
    const result = await runShellExecute(name, args);
    return result.code === 0 || result.stdout.toLowerCase().includes('llama');
  } catch {
    return false;
  }
}

export async function resolveLlamaServerBin(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
  options?: { force?: boolean },
): Promise<string | null> {
  if (!isLlamaCppCliSupported()) return null;
  if (!options?.force && cachedBinaryPath !== undefined) return cachedBinaryPath;

  const resolvers = [
    () => findExistingBinary(settings),
    findBinaryViaShellResolve,
  ];
  for (const resolve of resolvers) {
    try {
      const binPath = await resolve();
      if (binPath && (await probeBinaryRunnable(binPath))) {
        cachedBinaryPath = binPath;
        return binPath;
      }
    } catch {
      // try next
    }
  }

  cachedBinaryPath = null;
  return null;
}

async function requireLlamaServerBin(settings: LlamaCppSettings): Promise<string> {
  let binPath = await resolveLlamaServerBin(settings);
  if (!binPath) binPath = await resolveLlamaServerBin(settings, { force: true });
  if (!binPath) {
    throw new Error(
      'llama-server was not found. Install llama.cpp and ensure llama-server is on PATH, or set the binary path in Settings.',
    );
  }
  return binPath;
}

export async function probeLlamaCppToolkit(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
): Promise<LlamaCppToolkitStatus> {
  if (!isLlamaCppCliSupported()) {
    return {
      binaryAvailable: false,
      hfDownloadAvailable: false,
      available: false,
      detail: 'Tauri desktop build only.',
    };
  }

  const binaryPath = await resolveLlamaServerBin(settings, { force: true });
  const binaryAvailable = Boolean(binaryPath);
  let hfDownloadAvailable = false;

  if (isTauriMacOS()) {
    try {
      const { resolveUvBin } = await import('@/utils/llm/mlxVlmShell');
      const uvPath = await resolveUvBin({ force: true });
      hfDownloadAvailable = Boolean(uvPath);
    } catch {
      hfDownloadAvailable = false;
    }
  } else {
    hfDownloadAvailable = true;
  }

  const available = binaryAvailable;
  const detail = !binaryAvailable
    ? 'llama-server binary not found.'
    : binaryPath
      ? `binary: ${binaryPath}`
      : undefined;

  return {
    binaryAvailable,
    ...(binaryPath ? { binaryPath } : {}),
    hfDownloadAvailable,
    available,
    ...(detail ? { detail } : {}),
  };
}

export async function probeLlamaCppCli(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
): Promise<{ available: boolean; detail?: string }> {
  const toolkit = await probeLlamaCppToolkit(settings);
  return {
    available: toolkit.available,
    ...(toolkit.detail ? { detail: toolkit.detail } : {}),
  };
}

export async function startLlamaCppServer(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
): Promise<{ modelPath: string; baseUrl: string }> {
  requireDesktopSupport();
  const binaryPath = await requireLlamaServerBin(settings);
  const toolkit = await probeLlamaCppToolkit(settings);
  if (!toolkit.binaryAvailable) {
    throw new Error('llama-server is not runnable. Check the binary path in Settings.');
  }
  const before = await getLlamaCppRuntimeStatus();
  const result = await startLlamaCppRuntime(settings, binaryPath);
  if (!before.loaded || before.modelPath !== result.modelPath) {
    notifyLlamaCppServerStarted(result.modelPath, result.baseUrl);
  }
  return result;
}

export async function stopLlamaCppServer(): Promise<void> {
  await stopLlamaCppRuntime();
  notifyLlamaCppRuntimeChanged(null);
}

async function findGgufInDownloadDir(dir: string): Promise<string | null> {
  try {
    const { readDir } = await import('@tauri-apps/plugin-fs');
    const { join } = await import('@tauri-apps/api/path');

    async function walk(current: string, depth: number): Promise<string | null> {
      if (depth > 6) return null;
      const entries = await readDir(current);
      for (const entry of entries) {
        if (entry.name?.endsWith('.gguf')) {
          if ('path' in entry && typeof entry.path === 'string') return entry.path;
          return join(current, entry.name);
        }
        if (entry.isDirectory && entry.name) {
          const nested = await walk(await join(current, entry.name), depth + 1);
          if (nested) return nested;
        }
      }
      return null;
    }

    return await walk(dir, 0);
  } catch {
    // ignore
  }
  return null;
}

export function resolveLlamaCppHfDownloadMaxWorkers(
  settings: LlamaCppSettings = loadLlamaCppSettings(),
): number {
  return normalizeLlamaCppHfDownloadMaxWorkers(settings.hfDownloadMaxWorkers);
}

export async function downloadLlamaCppModel(
  repoId: string,
  options?: { signal?: AbortSignal },
): Promise<LlamaCppInstalledModel> {
  requireDesktopSupport();
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) {
    throw new Error('Invalid Hugging Face repo id.');
  }
  if (activeDownloadSession) {
    throw new Error(`Download already in progress: ${activeDownloadSession.repoId}`);
  }

  rememberLlamaCppDownloadTarget(id);
  clearLlamaCppDownloadLog();
  const settings = loadLlamaCppSettings();
  const maxWorkers = resolveLlamaCppHfDownloadMaxWorkers(settings);
  appendLlamaCppDownloadLog(
    `Downloading GGUF model: ${id}\n  parallel workers: ${maxWorkers}\n`,
  );

  const abortController = new AbortController();
  const signal = options?.signal ?? abortController.signal;
  let killChild: (() => Promise<void>) | null = null;
  const workersArg = String(maxWorkers);

  activeDownloadSession = {
    repoId: id,
    abortController,
    kill: async () => {
      if (killChild) await killChild();
    },
  };

  const env: Record<string, string> = {};
  if (settings.hfToken.trim()) env.HF_TOKEN = settings.hfToken.trim();

  try {
    let code = 1;
    let stderr = '';

    if (isTauriMacOS()) {
      const { resolveUvBin } = await import('@/utils/llm/mlxVlmShell');
      const uv = await resolveUvBin({ force: true });
      if (!uv) {
        throw new Error('uv was not found. Install uv for Hugging Face downloads on macOS.');
      }

      const result = await runShellSpawn(
        'llama-cpp-hf-download-macos',
        [
          '-lc',
          'exec "$0" tool run --from huggingface-hub python -u -m huggingface_hub.cli.hf download "$1" --include "*.gguf" --max-workers "$2"',
          uv,
          id,
          workersArg,
        ],
        {
          env,
          signal,
          onOutput: (line) => appendLlamaCppDownloadLog(line),
          onChild: (child) => {
            killChild = () => child.kill();
          },
        },
      );
      code = result.code;
      stderr = result.stderr;
      if (result.aborted) throw new LlamaCppDownloadAbortedError(id);
    } else if (isTauriWindows()) {
      const result = await runShellSpawn(
        'llama-cpp-hf-download-windows',
        ['/c', `huggingface-cli download ${id} --include "*.gguf" --max-workers ${workersArg}`],
        {
          env,
          signal,
          onOutput: (line) => appendLlamaCppDownloadLog(line),
          onChild: (child) => {
            killChild = () => child.kill();
          },
        },
      );
      code = result.code;
      stderr = result.stderr;
      if (result.aborted) throw new LlamaCppDownloadAbortedError(id);
    } else {
      const result = await runShellSpawn(
        'llama-cpp-hf-download-linux',
        [
          '-lc',
          'huggingface-cli download "$1" --include "*.gguf" --max-workers "$2"',
          id,
          workersArg,
        ],
        {
          env,
          signal,
          onOutput: (line) => appendLlamaCppDownloadLog(line),
          onChild: (child) => {
            killChild = () => child.kill();
          },
        },
      );
      code = result.code;
      stderr = result.stderr;
      if (result.aborted) throw new LlamaCppDownloadAbortedError(id);
    }

    if (code !== 0) {
      throw new Error(stderr.trim() || `Download failed (exit ${code})`);
    }

    const { homeDir, join } = await import('@tauri-apps/api/path');
    const cacheRoot = await join(await homeDir(), '.cache', 'huggingface', 'hub');
    const { repoIdToCacheDirEntryName } = await import('@/utils/llm/llamaCppHuggingFace');
    const cacheEntry = repoIdToCacheDirEntryName(id);
    const modelDir = cacheEntry ? await join(cacheRoot, cacheEntry) : cacheRoot;
    const ggufPath = (await findGgufInDownloadDir(modelDir)) || modelDir;

    const current = loadLlamaCppSettings();
    const next = addInstalledLlamaCppModel(current, {
      id,
      repoId: id,
      localPath: ggufPath,
      source: 'huggingface',
    });
    saveLlamaCppSettings(next);
    appendLlamaCppDownloadLog(`\n[done] ${ggufPath}\n`);

    const installed = next.installedModels.find((m) => m.id === id);
    if (!installed) throw new Error('Installed model record missing after download.');
    return installed;
  } finally {
    activeDownloadSession = null;
  }
}

export function hasInstalledLlamaCppModelsDelta(
  current: LlamaCppInstalledModel[],
  merged: LlamaCppInstalledModel[],
): boolean {
  if (merged.length !== current.length) return true;
  const currentIds = new Set(current.map((m) => m.id));
  return merged.some((m) => !currentIds.has(m.id));
}

export {
  addInstalledLlamaCppModel,
  loadLlamaCppSettings,
  mergeInstalledLlamaCppModels,
  removeInstalledLlamaCppModel,
  saveLlamaCppSettings,
  setSelectedLlamaCppModelId,
};

export async function shutdownManagedLlamaCppServer(): Promise<void> {
  if (!isLlamaCppRuntimeManagedByApp()) return;
  try {
    await stopLlamaCppServer();
  } catch {
    // best-effort on quit
  }
}
