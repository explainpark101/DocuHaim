import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  cacheDirEntryToRepoId,
  fetchHuggingFaceModelInfo,
  huggingFaceCacheEntryMatchesRepo,
  isMlxCommunityRepoId,
  isValidHuggingFaceRepoId,
  repoIdToCacheDirEntryName,
  resolveHuggingFaceModelDiskBytes,
  resolveMlxVlmDownloadMode,
  type HfModelSearchHit,
  type MlxVlmDownloadMode,
} from '@/utils/llm/mlxVlmHuggingFace';
import {
  buildMlxVlmDownloadProgressFromBytes,
  buildMlxVlmDownloadProgressFromCurrentBytes,
  mergeMlxVlmDownloadProgressChunk,
  pickMlxVlmDownloadProgress,
  type MlxVlmDownloadProgressSnapshot,
} from '@/utils/llm/mlxVlmDownloadProgress';
import {
  appendMlxVlmDownloadLog,
  clearMlxVlmDownloadLog,
} from '@/utils/llm/mlxVlmDownloadLog';
import { notifyMlxVlmModelLoaded } from '@/utils/llm/mlxVlmLoadNotifications';
import {
  addInstalledModel,
  loadMlxVlmSettings,
  mergeInstalledModels,
  removeInstalledModel,
  saveMlxVlmSettings,
  setSelectedMlxVlmModelId,
  type MlxVlmInstalledModel,
  type MlxVlmSettings,
} from '@/utils/llm/mlxVlmSettingsStore';
import {
  generateMlxVlmCompletion,
  getMlxVlmRuntimeStatus,
  getMlxVlmRuntimeStatusSync,
  isMlxVlmRuntimeManagedByApp,
  MLX_VLM_GENERATE_HELP_ARGS,
  startMlxVlmRuntime,
  stopMlxVlmRuntime,
  type MlxVlmGenerateParams,
  type MlxVlmRuntimeStatus,
} from '@/utils/llm/mlxVlmRuntime';

export {
  generateMlxVlmCompletion,
  getMlxVlmRuntimeStatus,
  getMlxVlmRuntimeStatusSync,
  isMlxVlmRuntimeManagedByApp,
  startMlxVlmRuntime,
  stopMlxVlmRuntime,
};
export type { MlxVlmGenerateParams, MlxVlmRuntimeStatus };

export type MlxVlmToolkitStatus = {
  uvAvailable: boolean;
  uvPath?: string;
  mlxVlmInstalled: boolean;
  hfHubInstalled: boolean;
  mlxVlmRunnable: boolean;
  hfHubRunnable: boolean;
  /** uv is present and mlx_vlm.generate responds via uv tool run */
  available: boolean;
  detail?: string;
};

let lastDownloadRepoId = '';
let cachedUvBin: string | null | undefined;

type ActiveMlxVlmDownloadSession = {
  repoId: string;
  mode: MlxVlmDownloadMode;
  abortController: AbortController;
  kill: () => Promise<void>;
  stopPolling: () => void;
};

let activeDownloadSession: ActiveMlxVlmDownloadSession | null = null;

export class MlxVlmDownloadAbortedError extends Error {
  readonly repoId: string;

  constructor(repoId: string) {
    super(`Download aborted: ${repoId}`);
    this.name = 'MlxVlmDownloadAbortedError';
    this.repoId = repoId;
  }
}

export function isMlxVlmDownloadAbortedError(err: unknown): err is MlxVlmDownloadAbortedError {
  return err instanceof MlxVlmDownloadAbortedError;
}

export function getActiveMlxVlmDownloadRepoId(): string | null {
  return activeDownloadSession?.repoId ?? null;
}

const UV_BIN_PATH_RE = /^(\/[A-Za-z0-9._/-]+)\/uv$/;

export const UV_BIN_CANDIDATES = [
  '/opt/homebrew/bin/uv',
  '/usr/local/bin/uv',
] as const;

const UV_RESOLVE_SHELL_ARGS = [
  '-lc',
  'for p in "$HOME/.local/bin/uv" "$HOME/.cargo/bin/uv" "/opt/homebrew/bin/uv"; do if [ -x "$p" ]; then echo "$p"; exit 0; fi; done; command -v uv 2>/dev/null || true',
] as const;

const UV_INSTALL_SHELL_ARGS = ['-lc', 'curl -LsSf https://astral.sh/uv/install.sh | sh'] as const;

const UV_TOOL_RUN = {
  generateHelp: MLX_VLM_GENERATE_HELP_ARGS,
  hfHelp: ['-lc', 'exec "$0" tool run --from huggingface-hub hf --help'] as const,
  hfDownload: [
    '-lc',
    'exec "$0" tool run --from huggingface-hub python -u -m huggingface_hub.cli.hf download "$1"',
  ] as const,
  mlxConvert: ['-lc', 'exec "$0" tool run --from mlx-vlm mlx_vlm.convert --model "$1" -q'] as const,
  installMlxVlm: ['-lc', 'exec "$0" tool install mlx-vlm'] as const,
  installHfHub: ['-lc', 'exec "$0" tool install huggingface-hub'] as const,
};

const UV_TOOL_DIR_NAMES = {
  mlxVlm: 'mlx-vlm',
  hfHub: 'huggingface-hub',
} as const;

export function buildUvBinCandidates(homeDir: string): string[] {
  const home = String(homeDir || '').trim() || '/';
  return [
    ...UV_BIN_CANDIDATES,
    `${home}/.local/bin/uv`,
    `${home}/.cargo/bin/uv`,
  ];
}

export function parseUvBinPath(output: string): string | null {
  const lines = output
    .split('\n')
    .map((part) => part.trim())
    .filter(Boolean);
  for (const line of lines) {
    if (UV_BIN_PATH_RE.test(line)) return line;
  }
  return null;
}

export function isMlxVlmCliSupported(): boolean {
  return isTauriMacOS();
}

export function getLastMlxVlmDownloadRepoId(): string {
  return lastDownloadRepoId;
}

export function isMlxVlmServerManagedByApp(): boolean {
  return isMlxVlmRuntimeManagedByApp();
}

export type MlxVlmServerStatus = {
  /** Model weights are loaded in the worker. */
  loaded: boolean;
  /** Worker subprocess is alive (may remain after a failed load). */
  workerRunning: boolean;
  models: string[];
  /** Alias of `loaded` for existing callers. */
  running: boolean;
};

export async function getMlxVlmServerStatus(
  _settings: MlxVlmSettings = loadMlxVlmSettings(),
): Promise<MlxVlmServerStatus> {
  const status = await getMlxVlmRuntimeStatus();
  const loaded = status.loaded;
  return {
    loaded,
    workerRunning: status.workerRunning,
    models: status.model ? [status.model] : [],
    running: loaded,
  };
}

export async function startMlxVlmServer(
  settings: MlxVlmSettings = loadMlxVlmSettings(),
): Promise<{ model: string }> {
  requireMacSupport();
  const uvPath = await requireUvBin();
  const toolkit = await probeMlxVlmToolkit();
  if (!toolkit.mlxVlmRunnable) {
    throw new Error(
      'mlx_vlm.generate is not runnable via uv tool run. Install mlx-vlm (uv tool install mlx-vlm).',
    );
  }
  const before = await getMlxVlmRuntimeStatus();
  const result = await startMlxVlmRuntime(settings, uvPath);
  if (!before.loaded || before.model !== result.model) {
    notifyMlxVlmModelLoaded(result.model);
  }
  return result;
}

export async function loadMlxVlmModelById(
  modelId: string,
  settings: MlxVlmSettings = loadMlxVlmSettings(),
): Promise<{ model: string }> {
  const id = String(modelId || '').trim();
  if (!id) throw new Error('Model id is required.');
  const next = setSelectedMlxVlmModelId(settings, id);
  saveMlxVlmSettings(next);
  return startMlxVlmServer(next);
}

export async function stopMlxVlmServer(): Promise<void> {
  await stopMlxVlmRuntime();
}

export function rememberMlxVlmDownloadTarget(repoId: string): void {
  lastDownloadRepoId = String(repoId || '').trim();
}

export function clearMlxVlmToolkitCache(): void {
  cachedUvBin = undefined;
}

function requireMacSupport(): void {
  if (!isMlxVlmCliSupported()) {
    throw new Error('MLX-VLM CLI is only available in the Tauri macOS build.');
  }
}

async function runShellExecute(
  name: string,
  args: string[],
  onOutput?: (line: string) => void,
): Promise<{ code: number; stdout: string; stderr: string }> {
  requireMacSupport();
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

type ShellSpawnResult = {
  code: number;
  stdout: string;
  stderr: string;
  aborted: boolean;
};

async function runShellSpawn(
  name: string,
  args: string[],
  options?: {
    onOutput?: (line: string) => void;
    signal?: AbortSignal;
    onChild?: (child: { kill: () => Promise<void> }) => void;
    env?: Record<string, string>;
  },
): Promise<ShellSpawnResult> {
  requireMacSupport();
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

async function findUvBinViaShellResolve(): Promise<string | null> {
  try {
    const result = await runShellExecute('uv-resolve', [...UV_RESOLVE_SHELL_ARGS]);
    return parseUvBinPath(result.stdout);
  } catch {
    return null;
  }
}

async function findExistingUvBin(): Promise<string | null> {
  const { homeDir, join } = await import('@tauri-apps/api/path');
  const { exists } = await import('@tauri-apps/plugin-fs');
  const home = await homeDir();
  const candidates = [
    ...buildUvBinCandidates(home),
    await join(home, '.local', 'bin', 'uv'),
    await join(home, '.cargo', 'bin', 'uv'),
  ];
  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (!candidate || seen.has(candidate)) continue;
    seen.add(candidate);
    if (!UV_BIN_PATH_RE.test(candidate)) continue;
    try {
      if (await exists(candidate)) return candidate;
    } catch {
      // try next candidate
    }
  }
  return null;
}

export async function resolveUvBin(options?: { force?: boolean }): Promise<string | null> {
  if (!isMlxVlmCliSupported()) return null;
  if (!options?.force && cachedUvBin !== undefined) return cachedUvBin;

  const resolvers = [findUvBinViaShellResolve, findExistingUvBin];
  for (const resolve of resolvers) {
    try {
      const binPath = await resolve();
      if (binPath) {
        cachedUvBin = binPath;
        return binPath;
      }
    } catch {
      // try next resolver
    }
  }

  cachedUvBin = null;
  return null;
}

async function requireUvBin(): Promise<string> {
  let uvPath = await resolveUvBin();
  if (!uvPath) uvPath = await resolveUvBin({ force: true });
  if (!uvPath) {
    throw new Error('uv was not found. Install uv from the ? help panel first.');
  }
  return uvPath;
}

async function isUvToolInstalled(toolDirName: string): Promise<boolean> {
  try {
    const { homeDir, join } = await import('@tauri-apps/api/path');
    const { exists } = await import('@tauri-apps/plugin-fs');
    const toolRoot = await join(await homeDir(), '.local', 'share', 'uv', 'tools', toolDirName);
    return await exists(toolRoot);
  } catch {
    return false;
  }
}

async function probeUvToolRun(
  scope: string,
  scriptArgs: readonly string[],
  uvPath: string,
): Promise<boolean> {
  try {
    const result = await runShellExecute(scope, [...scriptArgs, uvPath]);
    return result.code === 0;
  } catch {
    return false;
  }
}

export async function probeMlxVlmToolkit(): Promise<MlxVlmToolkitStatus> {
  if (!isMlxVlmCliSupported()) {
    return {
      uvAvailable: false,
      mlxVlmInstalled: false,
      hfHubInstalled: false,
      mlxVlmRunnable: false,
      hfHubRunnable: false,
      available: false,
      detail: 'Tauri macOS build only.',
    };
  }

  const uvPath = await resolveUvBin({ force: true });
  const uvAvailable = Boolean(uvPath);
  const [mlxVlmInstalled, hfHubInstalled] = await Promise.all([
    isUvToolInstalled(UV_TOOL_DIR_NAMES.mlxVlm),
    isUvToolInstalled(UV_TOOL_DIR_NAMES.hfHub),
  ]);

  let mlxVlmRunnable = false;
  let hfHubRunnable = false;
  if (uvPath) {
    [mlxVlmRunnable, hfHubRunnable] = await Promise.all([
      probeUvToolRun('uv-tool-run-mlx-generate-help', UV_TOOL_RUN.generateHelp, uvPath),
      probeUvToolRun('uv-tool-run-hf-help', UV_TOOL_RUN.hfHelp, uvPath),
    ]);
  }

  const available = uvAvailable && mlxVlmRunnable;
  let detail: string | undefined;
  if (!uvAvailable) {
    detail = 'uv not found. Use ? help to install uv on this Mac.';
  } else if (!mlxVlmRunnable) {
    detail = 'uv tool run --from mlx-vlm mlx_vlm.generate failed. Install mlx-vlm with uv tool install.';
  } else if (!hfHubRunnable) {
    detail = `uv: ${uvPath} · mlx-vlm ready · huggingface-hub missing (uv tool install huggingface-hub)`;
  } else {
    detail = `uv tool run (${uvPath})`;
  }

  return {
    uvAvailable,
    ...(uvPath ? { uvPath } : {}),
    mlxVlmInstalled,
    hfHubInstalled,
    mlxVlmRunnable,
    hfHubRunnable,
    available,
    detail,
  };
}

export async function probeMlxVlmCli(): Promise<{ available: boolean; detail?: string }> {
  const toolkit = await probeMlxVlmToolkit();
  return {
    available: toolkit.available,
    ...(toolkit.detail ? { detail: toolkit.detail } : {}),
  };
}

export async function installUvMac(options?: { onOutput?: (line: string) => void }): Promise<void> {
  requireMacSupport();
  const result = await runShellExecute('uv-install', [...UV_INSTALL_SHELL_ARGS], options?.onOutput);
  clearMlxVlmToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'Failed to install uv.');
  }
}

export async function installMlxVlmTool(options?: {
  onOutput?: (line: string) => void;
}): Promise<void> {
  requireMacSupport();
  const uvPath = await requireUvBin();
  const result = await runShellExecute(
    'uv-tool-install-mlx-vlm',
    [...UV_TOOL_RUN.installMlxVlm, uvPath],
    options?.onOutput,
  );
  clearMlxVlmToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'Failed to install mlx-vlm with uv tool install.');
  }
}

export async function installHuggingFaceHubTool(options?: {
  onOutput?: (line: string) => void;
}): Promise<void> {
  requireMacSupport();
  const uvPath = await requireUvBin();
  const result = await runShellExecute(
    'uv-tool-install-hf-hub',
    [...UV_TOOL_RUN.installHfHub, uvPath],
    options?.onOutput,
  );
  clearMlxVlmToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'Failed to install huggingface-hub with uv tool install.');
  }
}

export async function resolveHuggingFaceHubRoot(): Promise<string | null> {
  if (!isMlxVlmCliSupported()) return null;
  try {
    const { homeDir, join } = await import('@tauri-apps/api/path');
    return await join(await homeDir(), '.cache', 'huggingface', 'hub');
  } catch {
    return null;
  }
}

export function hasInstalledModelsDelta(
  current: readonly MlxVlmInstalledModel[],
  merged: readonly MlxVlmInstalledModel[],
): boolean {
  if (current.length !== merged.length) return true;
  const ids = new Set(current.map((model) => model.id));
  return merged.some((model) => !ids.has(model.id));
}

export async function scanHuggingFaceCacheModels(): Promise<MlxVlmInstalledModel[]> {
  if (!isMlxVlmCliSupported()) return [];
  try {
    const hubRoot = await resolveHuggingFaceHubRoot();
    if (!hubRoot) return [];
    const { exists, readDir } = await import('@tauri-apps/plugin-fs');
    if (!(await exists(hubRoot))) return [];
    const entries = await readDir(hubRoot);
    const models: MlxVlmInstalledModel[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory && !entry.isSymlink) continue;
      const repoId = cacheDirEntryToRepoId(entry.name);
      if (!repoId) continue;
      models.push({
        id: repoId,
        repoId,
        source: 'huggingface',
        installedAt: 0,
      });
    }
    return models;
  } catch {
    return [];
  }
}

export async function listInstalledMlxVlmModels(
  _settings?: MlxVlmSettings,
): Promise<MlxVlmInstalledModel[]> {
  const current = loadMlxVlmSettings();
  const cached = await scanHuggingFaceCacheModels();
  return mergeInstalledModels(current.installedModels, cached);
}

export async function refreshInstalledMlxVlmModels(): Promise<{
  settings: MlxVlmSettings;
  models: MlxVlmInstalledModel[];
}> {
  const current = loadMlxVlmSettings();
  const cached = await scanHuggingFaceCacheModels();
  const merged = mergeInstalledModels(current.installedModels, cached);
  if (!hasInstalledModelsDelta(current.installedModels, merged)) {
    return { settings: current, models: merged };
  }
  const next: MlxVlmSettings = { ...current, installedModels: merged };
  saveMlxVlmSettings(next);
  return { settings: next, models: merged };
}

export async function isMlxCommunityOrPreconverted(repoId: string): Promise<boolean> {
  if (isMlxCommunityRepoId(repoId)) return true;
  const info = await fetchHuggingFaceModelInfo(repoId);
  if (!info) return false;
  return resolveMlxVlmDownloadMode(repoId, info) === 'download';
}

let measureCacheBytesInFlight: Promise<number> | null = null;

export async function measureInstalledMlxVlmModelsCacheBytes(
  models: readonly MlxVlmInstalledModel[],
): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  await Promise.all(
    models.map(async (model) => {
      const repoId = String(model.repoId || model.id || '').trim();
      if (!isValidHuggingFaceRepoId(repoId)) return;
      const bytes = await measureHuggingFaceCacheRepoBytes(repoId);
      out[model.id] = bytes;
      if (model.repoId && model.repoId !== model.id) {
        out[model.repoId] = bytes;
      }
    }),
  );
  return out;
}

async function measureHuggingFaceCacheRepoBytesInner(repoId: string): Promise<number> {
  const dirName = repoIdToCacheDirEntryName(repoId);
  if (!dirName) return 0;
  const hubRoot = await resolveHuggingFaceHubRoot();
  if (!hubRoot) return 0;
  try {
    const { join } = await import('@tauri-apps/api/path');
    const { exists } = await import('@tauri-apps/plugin-fs');
    const repoRoot = await join(hubRoot, dirName);
    if (!(await exists(repoRoot))) return 0;
    const blobsRoot = await join(repoRoot, 'blobs');
    if (await exists(blobsRoot)) return await sumPathBytes(blobsRoot);
    return await sumPathBytes(repoRoot);
  } catch {
    return 0;
  }
}

export async function measureHuggingFaceCacheRepoBytes(repoId: string): Promise<number> {
  if (measureCacheBytesInFlight) return measureCacheBytesInFlight;
  measureCacheBytesInFlight = measureHuggingFaceCacheRepoBytesInner(repoId).finally(() => {
    measureCacheBytesInFlight = null;
  });
  return measureCacheBytesInFlight;
}

async function sumPathBytes(path: string): Promise<number> {
  const { readDir, stat } = await import('@tauri-apps/plugin-fs');
  const { join } = await import('@tauri-apps/api/path');
  const info = await stat(path);
  if (!info.isDirectory) return info.size ?? 0;

  let total = 0;
  const entries = await readDir(path);
  for (const entry of entries) {
    total += await sumPathBytes(await join(path, entry.name));
  }
  return total;
}

const HF_DOWNLOAD_PROGRESS_POLL_MS = 1500;

function buildMlxVlmDownloadSpawnEnv(hfToken: string): Record<string, string> {
  const env: Record<string, string> = { PYTHONUNBUFFERED: '1' };
  const token = hfToken.trim();
  if (token) env.HF_TOKEN = token;
  return env;
}

export function startHuggingFaceDownloadProgressPoller(
  repoId: string,
  onProgress: (snapshot: MlxVlmDownloadProgressSnapshot) => void,
  totalBytes?: number,
): () => void {
  let stopped = false;
  let pollInFlight = false;
  let timer: ReturnType<typeof setInterval> | null = null;
  const expectedTotal = totalBytes && totalBytes > 0 ? totalBytes : 0;

  const tick = async () => {
    if (stopped || pollInFlight) return;
    pollInFlight = true;
    try {
      const currentBytes = await measureHuggingFaceCacheRepoBytes(repoId);
      const snapshot =
        expectedTotal > 0
          ? buildMlxVlmDownloadProgressFromBytes(currentBytes, expectedTotal)
          : buildMlxVlmDownloadProgressFromCurrentBytes(currentBytes);
      if (!snapshot) return;
      onProgress(snapshot);
    } catch {
      // ignore polling errors
    } finally {
      pollInFlight = false;
    }
  };

  void tick();
  timer = setInterval(() => {
    void tick();
  }, HF_DOWNLOAD_PROGRESS_POLL_MS);

  return () => {
    stopped = true;
    if (timer) clearInterval(timer);
  };
}

export async function cleanupMlxVlmPartialDownload(repoId: string): Promise<void> {
  const id = String(repoId || '').trim();
  if (!id || !isValidHuggingFaceRepoId(id)) return;
  await removeHuggingFaceCacheRepo(id);
}

export async function abortMlxVlmDownload(repoId?: string): Promise<void> {
  const session = activeDownloadSession;
  if (!session) return;
  const id = String(repoId || '').trim();
  if (id && session.repoId !== id) {
    throw new Error('No matching download is in progress.');
  }
  session.stopPolling();
  session.abortController.abort();
  await session.kill();
}

export async function downloadMlxVlmModel(
  repoId: string,
  options?: {
    mode?: MlxVlmDownloadMode;
    hit?: HfModelSearchHit | null;
    expectedTotalBytes?: number;
    onOutput?: (line: string) => void;
    onProgress?: (snapshot: MlxVlmDownloadProgressSnapshot) => void;
    signal?: AbortSignal;
  },
): Promise<MlxVlmSettings> {
  requireMacSupport();
  const id = String(repoId || '').trim();
  if (!id) throw new Error('Model repo id is required.');

  const mode = options?.mode ?? resolveMlxVlmDownloadMode(id, options?.hit ?? null);
  lastDownloadRepoId = id;

  const settings = loadMlxVlmSettings();
  const spawnEnv = buildMlxVlmDownloadSpawnEnv(settings.hfToken);

  const uvPath = await requireUvBin();
  const toolkit = await probeMlxVlmToolkit();

  let scopeName: string;
  let args: string[];
  if (mode === 'convert') {
    if (!toolkit.mlxVlmRunnable) {
      throw new Error(
        'mlx_vlm.convert is not runnable via uv tool run. Install mlx-vlm (uv tool install mlx-vlm).',
      );
    }
    scopeName = 'uv-tool-run-mlx-convert';
    args = [...UV_TOOL_RUN.mlxConvert, uvPath, id];
  } else {
    if (!toolkit.hfHubRunnable) {
      throw new Error(
        'hf download is not runnable via uv tool run. Install huggingface-hub (uv tool install huggingface-hub).',
      );
    }
    scopeName = 'uv-tool-run-hf-download';
    args = [...UV_TOOL_RUN.hfDownload, uvPath, id];
  }

  let expectedTotalBytes =
    options?.expectedTotalBytes ?? options?.hit?.diskBytes ?? 0;
  if (expectedTotalBytes <= 0) {
    expectedTotalBytes = await resolveHuggingFaceModelDiskBytes(id, {
      ...(options?.hit ? { hit: options.hit } : {}),
    });
  }

  clearMlxVlmDownloadLog();

  let latestProgress: MlxVlmDownloadProgressSnapshot | null = null;
  const reportProgress = (snapshot: MlxVlmDownloadProgressSnapshot | null) => {
    latestProgress = pickMlxVlmDownloadProgress(latestProgress, snapshot);
    if (latestProgress) options?.onProgress?.(latestProgress);
  };

  if (expectedTotalBytes > 0) {
    reportProgress(buildMlxVlmDownloadProgressFromBytes(0, expectedTotalBytes));
  }

  const onChunk = (line: string) => {
    appendMlxVlmDownloadLog(line);
    options?.onOutput?.(line);
    reportProgress(mergeMlxVlmDownloadProgressChunk(line, latestProgress));
  };

  const stopPolling = startHuggingFaceDownloadProgressPoller(
    id,
    reportProgress,
    expectedTotalBytes > 0 ? expectedTotalBytes : undefined,
  );

  const abortController = new AbortController();
  const signal = options?.signal ?? abortController.signal;

  activeDownloadSession = {
    repoId: id,
    mode,
    abortController,
    kill: async () => {
      await activeDownloadSession?.stopPolling();
    },
    stopPolling: () => {
      stopPolling?.();
    },
  };

  let result: ShellSpawnResult;
  try {
    result = await runShellSpawn(scopeName, args, {
      onOutput: onChunk,
      signal,
      env: spawnEnv,
      onChild: (child) => {
        if (!activeDownloadSession) return;
        activeDownloadSession.kill = async () => {
          activeDownloadSession?.stopPolling();
          await child.kill();
        };
      },
    });
  } catch (err) {
    if (signal.aborted) {
      await cleanupMlxVlmPartialDownload(id);
      throw new MlxVlmDownloadAbortedError(id);
    }
    throw err;
  } finally {
    stopPolling?.();
    activeDownloadSession = null;
  }

  if (signal.aborted || result.aborted) {
    await cleanupMlxVlmPartialDownload(id);
    throw new MlxVlmDownloadAbortedError(id);
  }

  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || `MLX-VLM ${mode} failed for ${id}.`);
  }

  if (expectedTotalBytes > 0) {
    reportProgress(buildMlxVlmDownloadProgressFromBytes(expectedTotalBytes, expectedTotalBytes));
  }

  const current = loadMlxVlmSettings();
  const next = addInstalledModel(current, {
    id,
    repoId: id,
    source: 'huggingface',
  });
  next.selectedModelId = id;
  saveMlxVlmSettings(next);
  return next;
}

export async function listMlxVlmModelsFromServer(
  settings: MlxVlmSettings = loadMlxVlmSettings(),
): Promise<string[]> {
  const status = await getMlxVlmServerStatus(settings);
  return status.models;
}

function resolveModelRepoId(model: Pick<MlxVlmInstalledModel, 'id' | 'repoId'>): string {
  const repoId = String(model.repoId || model.id || '').trim();
  return repoId;
}

export function isMlxVlmModelInUse(
  modelId: string,
  settings: MlxVlmSettings,
  serverStatus: Pick<MlxVlmServerStatus, 'loaded' | 'running' | 'models'>,
): boolean {
  const id = String(modelId || '').trim();
  const loaded = serverStatus.loaded ?? serverStatus.running ?? false;
  if (!id || !loaded) return false;
  if (settings.selectedModelId === id) return true;
  return serverStatus.models.includes(id);
}

async function removePathIfExists(path: string): Promise<boolean> {
  const { exists, remove } = await import('@tauri-apps/plugin-fs');
  if (!(await exists(path))) return false;
  await remove(path, { recursive: true });
  return true;
}

export async function isHuggingFaceCacheRepoPresent(repoId: string): Promise<boolean> {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return false;
  const hubRoot = await resolveHuggingFaceHubRoot();
  if (!hubRoot) return false;
  try {
    const { join } = await import('@tauri-apps/api/path');
    const { exists, readDir } = await import('@tauri-apps/plugin-fs');
    if (!(await exists(hubRoot))) return false;

    const entries = await readDir(hubRoot);
    for (const entry of entries) {
      if (!entry.isDirectory && !entry.isSymlink) continue;
      if (huggingFaceCacheEntryMatchesRepo(entry.name, id)) return true;
    }

    const locksRoot = await join(hubRoot, '.locks');
    if (await exists(locksRoot)) {
      const lockEntries = await readDir(locksRoot);
      for (const entry of lockEntries) {
        if (huggingFaceCacheEntryMatchesRepo(entry.name, id)) return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

async function removeHuggingFaceCacheRepo(repoId: string): Promise<boolean> {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return false;
  const hubRoot = await resolveHuggingFaceHubRoot();
  if (!hubRoot) return false;

  try {
    const { join } = await import('@tauri-apps/api/path');
    const { exists, readDir } = await import('@tauri-apps/plugin-fs');
    let removed = false;

    if (await exists(hubRoot)) {
      const entries = await readDir(hubRoot);
      for (const entry of entries) {
        if (!entry.isDirectory && !entry.isSymlink) continue;
        if (!huggingFaceCacheEntryMatchesRepo(entry.name, id)) continue;
        removed = (await removePathIfExists(await join(hubRoot, entry.name))) || removed;
      }
    }

    const locksRoot = await join(hubRoot, '.locks');
    if (await exists(locksRoot)) {
      const lockEntries = await readDir(locksRoot);
      for (const entry of lockEntries) {
        if (!huggingFaceCacheEntryMatchesRepo(entry.name, id)) continue;
        removed = (await removePathIfExists(await join(locksRoot, entry.name))) || removed;
      }
    }

    return removed;
  } catch {
    return false;
  }
}

export async function removeHuggingFaceCacheRepoOrThrow(repoId: string): Promise<void> {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return;
  await removeHuggingFaceCacheRepo(id);
  if (await isHuggingFaceCacheRepoPresent(id)) {
    throw new Error(`Failed to remove Hugging Face cache for ${id}.`);
  }
}

export async function deleteMlxVlmModel(
  modelId: string,
  options?: {
    settings?: MlxVlmSettings;
    serverStatus?: Pick<MlxVlmServerStatus, 'loaded' | 'running' | 'models'>;
  },
): Promise<MlxVlmSettings> {
  requireMacSupport();
  const id = String(modelId || '').trim();
  if (!id) throw new Error('Model id is required.');

  const settings = loadMlxVlmSettings();
  const serverStatus = options?.serverStatus ?? (await getMlxVlmServerStatus(settings));
  if (isMlxVlmModelInUse(id, settings, serverStatus)) {
    throw new Error('Stop the loaded MLX-VLM model before deleting it.');
  }

  const installed = await listInstalledMlxVlmModels(settings);
  const target =
    installed.find((model) => model.id === id || model.repoId === id) ??
    (isValidHuggingFaceRepoId(id)
      ? { id, repoId: id, source: 'huggingface' as const, installedAt: 0 }
      : null);
  if (!target) {
    throw new Error(`Model not found: ${id}`);
  }

  const repoId = resolveModelRepoId(target);
  const activeDownloadRepoId = getActiveMlxVlmDownloadRepoId();
  if (activeDownloadRepoId && (activeDownloadRepoId === repoId || activeDownloadRepoId === id)) {
    throw new Error('Stop or abort the in-progress download before deleting this model.');
  }

  if (isValidHuggingFaceRepoId(repoId)) {
    await removeHuggingFaceCacheRepoOrThrow(repoId);
  }

  const next = removeInstalledModel(settings, repoId);
  const cleaned = repoId !== id ? removeInstalledModel(next, id) : next;
  saveMlxVlmSettings(cleaned);
  return cleaned;
}
