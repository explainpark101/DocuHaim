import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  cacheDirEntryToRepoId,
  fetchHuggingFaceModelInfo,
  isMlxCommunityRepoId,
  isValidHuggingFaceRepoId,
  repoIdToCacheDirEntryName,
  resolveMlxLmDownloadMode,
  type HfModelSearchHit,
  type MlxLmDownloadMode,
} from '@/utils/llm/mlxLmHuggingFace';
import {
  addInstalledModel,
  loadMlxLmSettings,
  mergeInstalledModels,
  removeInstalledModel,
  resolveMlxLmClientHost,
  resolveMlxLmOpenAiBaseUrl,
  resolveMlxLmServerBindHost,
  saveMlxLmSettings,
  type MlxLmInstalledModel,
  type MlxLmSettings,
} from '@/utils/llm/mlxLmSettingsStore';
import { appendMlxLmServerLog, resetMlxLmServerLog } from '@/utils/llm/mlxLmServerLog';

export { resolveMlxLmOpenAiBaseUrl };

type ChildHandle = {
  kill: () => Promise<void>;
};

export type MlxLmToolkitStatus = {
  uvAvailable: boolean;
  uvPath?: string;
  mlxLmInstalled: boolean;
  hfHubInstalled: boolean;
  mlxLmRunnable: boolean;
  hfHubRunnable: boolean;
  /** uv is present and mlx_lm.server responds via uv tool run */
  available: boolean;
  detail?: string;
};

let serverChild: ChildHandle | null = null;
let lastDownloadRepoId = '';
let cachedUvBin: string | null | undefined;

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
  mlxServerHelp: ['-lc', 'exec "$0" tool run --from mlx-lm mlx_lm.server --help'] as const,
  hfHelp: ['-lc', 'exec "$0" tool run --from huggingface-hub hf --help'] as const,
  hfDownload: ['-lc', 'exec "$0" tool run --from huggingface-hub hf download "$1"'] as const,
  mlxConvert: ['-lc', 'exec "$0" tool run --from mlx-lm mlx_lm.convert --model "$1" -q'] as const,
  mlxServer: [
    '-lc',
    'exec "$0" tool run --from mlx-lm mlx_lm.server --model "$1" --port "$2" --host "$3"',
  ] as const,
  installMlxLm: ['-lc', 'exec "$0" tool install mlx-lm'] as const,
  installHfHub: ['-lc', 'exec "$0" tool install huggingface-hub'] as const,
};

const UV_TOOL_DIR_NAMES = {
  mlxLm: 'mlx-lm',
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

export function isMlxLmCliSupported(): boolean {
  return isTauriMacOS();
}

export function getLastMlxLmDownloadRepoId(): string {
  return lastDownloadRepoId;
}

export function isMlxLmServerManagedByApp(): boolean {
  return serverChild !== null;
}

export function rememberMlxLmDownloadTarget(repoId: string): void {
  lastDownloadRepoId = String(repoId || '').trim();
}

export function clearMlxLmToolkitCache(): void {
  cachedUvBin = undefined;
}

function requireMacSupport(): void {
  if (!isMlxLmCliSupported()) {
    throw new Error('MLX-LM CLI is only available in the Tauri macOS build.');
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
  if (!isMlxLmCliSupported()) return null;
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

export async function probeMlxLmToolkit(): Promise<MlxLmToolkitStatus> {
  if (!isMlxLmCliSupported()) {
    return {
      uvAvailable: false,
      mlxLmInstalled: false,
      hfHubInstalled: false,
      mlxLmRunnable: false,
      hfHubRunnable: false,
      available: false,
      detail: 'Tauri macOS build only.',
    };
  }

  const uvPath = await resolveUvBin({ force: true });
  const uvAvailable = Boolean(uvPath);
  const [mlxLmInstalled, hfHubInstalled] = await Promise.all([
    isUvToolInstalled(UV_TOOL_DIR_NAMES.mlxLm),
    isUvToolInstalled(UV_TOOL_DIR_NAMES.hfHub),
  ]);

  let mlxLmRunnable = false;
  let hfHubRunnable = false;
  if (uvPath) {
    [mlxLmRunnable, hfHubRunnable] = await Promise.all([
      probeUvToolRun('uv-tool-run-mlx-server-help', UV_TOOL_RUN.mlxServerHelp, uvPath),
      probeUvToolRun('uv-tool-run-hf-help', UV_TOOL_RUN.hfHelp, uvPath),
    ]);
  }

  const available = uvAvailable && mlxLmRunnable;
  let detail: string | undefined;
  if (!uvAvailable) {
    detail = 'uv not found. Use ? help to install uv on this Mac.';
  } else if (!mlxLmRunnable) {
    detail = 'uv tool run --from mlx-lm mlx_lm.server failed. Install mlx-lm with uv tool install.';
  } else if (!hfHubRunnable) {
    detail = `uv: ${uvPath} · mlx-lm ready · huggingface-hub missing (uv tool install huggingface-hub)`;
  } else {
    detail = `uv tool run (${uvPath})`;
  }

  return {
    uvAvailable,
    ...(uvPath ? { uvPath } : {}),
    mlxLmInstalled,
    hfHubInstalled,
    mlxLmRunnable,
    hfHubRunnable,
    available,
    detail,
  };
}

export async function probeMlxLmCli(): Promise<{ available: boolean; detail?: string }> {
  const toolkit = await probeMlxLmToolkit();
  return {
    available: toolkit.available,
    ...(toolkit.detail ? { detail: toolkit.detail } : {}),
  };
}

export async function installUvMac(options?: { onOutput?: (line: string) => void }): Promise<void> {
  requireMacSupport();
  const result = await runShellExecute('uv-install', [...UV_INSTALL_SHELL_ARGS], options?.onOutput);
  clearMlxLmToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'Failed to install uv.');
  }
}

export async function installMlxLmTool(options?: {
  onOutput?: (line: string) => void;
}): Promise<void> {
  requireMacSupport();
  const uvPath = await requireUvBin();
  const result = await runShellExecute(
    'uv-tool-install-mlx-lm',
    [...UV_TOOL_RUN.installMlxLm, uvPath],
    options?.onOutput,
  );
  clearMlxLmToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'Failed to install mlx-lm with uv tool install.');
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
  clearMlxLmToolkitCache();
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || 'Failed to install huggingface-hub with uv tool install.');
  }
}

function modelsUrl(settings: Pick<MlxLmSettings, 'host' | 'port' | 'allowExternalAccess'>): string {
  const host = resolveMlxLmClientHost(settings);
  const port = settings.port || 8080;
  return `http://${host}:${port}/v1/models`;
}

export async function getMlxLmServerStatus(
  settings: MlxLmSettings = loadMlxLmSettings(),
): Promise<{ running: boolean; models: string[] }> {
  try {
    const res = await fetch(modelsUrl(settings), {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { running: false, models: [] };
    const data = (await res.json()) as { data?: Array<{ id?: string }> };
    const models = (data.data || [])
      .map((item) => String(item.id || '').trim())
      .filter(Boolean);
    return { running: true, models };
  } catch {
    return { running: false, models: [] };
  }
}

async function waitForServerReady(
  settings: MlxLmSettings,
  timeoutMs = 60_000,
): Promise<{ running: boolean; models: string[] }> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const status = await getMlxLmServerStatus(settings);
    if (status.running) return status;
    await new Promise((resolve) => window.setTimeout(resolve, 2000));
  }
  return { running: false, models: [] };
}

export async function startMlxLmServer(
  settings: MlxLmSettings = loadMlxLmSettings(),
): Promise<{ port: number; baseUrl: string; models: string[] }> {
  requireMacSupport();
  const model = String(settings.selectedModelId || '').trim();
  if (!model) throw new Error('Select a model before starting the MLX-LM server.');

  const existing = await getMlxLmServerStatus(settings);
  if (existing.running) {
    if (!serverChild) {
      appendMlxLmServerLog(
        '[info] MLX-LM server is already running outside this app. Logs are unavailable.\n',
      );
    }
    return {
      port: settings.port,
      baseUrl: resolveMlxLmOpenAiBaseUrl(settings),
      models: existing.models,
    };
  }

  if (serverChild) {
    try {
      await serverChild.kill();
    } catch {
      // ignore stale child
    }
    serverChild = null;
  }

  const uvPath = await requireUvBin();
  const toolkit = await probeMlxLmToolkit();
  if (!toolkit.mlxLmRunnable) {
    throw new Error(
      'mlx_lm.server is not runnable via uv tool run. Install mlx-lm (uv tool install mlx-lm).',
    );
  }

  const bindHost = resolveMlxLmServerBindHost(settings);
  resetMlxLmServerLog();
  appendMlxLmServerLog(
    `Starting mlx_lm.server\n  model: ${model}\n  bind: ${bindHost}:${settings.port}\n\n`,
  );

  const { Command } = await import('@tauri-apps/plugin-shell');
  const command = Command.create('mlx-lm-server-uv', [
    ...UV_TOOL_RUN.mlxServer,
    uvPath,
    model,
    String(settings.port),
    bindHost,
  ]);
  command.stdout.on('data', (line) => {
    appendMlxLmServerLog(String(line ?? ''));
  });
  command.stderr.on('data', (line) => {
    appendMlxLmServerLog(String(line ?? ''));
  });
  command.on('close', (payload) => {
    appendMlxLmServerLog(
      `\n[process exited code=${payload.code} signal=${payload.signal ?? 'none'}]\n`,
    );
    serverChild = null;
  });
  command.on('error', (error) => {
    appendMlxLmServerLog(`\n[process error: ${String(error)}]\n`);
  });

  const child = await command.spawn();
  serverChild = child;

  const ready = await waitForServerReady(settings);
  if (!ready.running) {
    throw new Error('MLX-LM server did not become ready in time.');
  }

  return {
    port: settings.port,
    baseUrl: resolveMlxLmOpenAiBaseUrl(settings),
    models: ready.models,
  };
}

export async function stopMlxLmServer(): Promise<void> {
  if (serverChild) {
    try {
      appendMlxLmServerLog('\n[stop requested by app]\n');
      await serverChild.kill();
    } finally {
      serverChild = null;
    }
    return;
  }

  const settings = loadMlxLmSettings();
  const status = await getMlxLmServerStatus(settings);
  if (status.running) {
    throw new Error(
      'The MLX-LM server is running outside this app. Stop it in Terminal or Activity Monitor.',
    );
  }
}

export async function scanHuggingFaceCacheModels(): Promise<MlxLmInstalledModel[]> {
  if (!isMlxLmCliSupported()) return [];
  try {
    const { homeDir, join } = await import('@tauri-apps/api/path');
    const { readDir } = await import('@tauri-apps/plugin-fs');
    const hubRoot = await join(await homeDir(), '.cache', 'huggingface', 'hub');
    const entries = await readDir(hubRoot);
    const models: MlxLmInstalledModel[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory) continue;
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

export async function listInstalledMlxLmModels(
  settings: MlxLmSettings = loadMlxLmSettings(),
): Promise<MlxLmInstalledModel[]> {
  const cached = await scanHuggingFaceCacheModels();
  return mergeInstalledModels(settings.installedModels, cached);
}

export async function isMlxCommunityOrPreconverted(repoId: string): Promise<boolean> {
  if (isMlxCommunityRepoId(repoId)) return true;
  const info = await fetchHuggingFaceModelInfo(repoId);
  if (!info) return false;
  return resolveMlxLmDownloadMode(repoId, info) === 'download';
}

export async function downloadMlxLmModel(
  repoId: string,
  options?: {
    mode?: MlxLmDownloadMode;
    hit?: HfModelSearchHit | null;
    onOutput?: (line: string) => void;
  },
): Promise<MlxLmSettings> {
  requireMacSupport();
  const id = String(repoId || '').trim();
  if (!id) throw new Error('Model repo id is required.');

  const mode = options?.mode ?? resolveMlxLmDownloadMode(id, options?.hit ?? null);
  lastDownloadRepoId = id;

  const uvPath = await requireUvBin();
  const toolkit = await probeMlxLmToolkit();

  let scopeName: string;
  let args: string[];
  if (mode === 'convert') {
    if (!toolkit.mlxLmRunnable) {
      throw new Error(
        'mlx_lm.convert is not runnable via uv tool run. Install mlx-lm (uv tool install mlx-lm).',
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

  const result = await runShellExecute(scopeName, args, options?.onOutput);
  if (result.code !== 0) {
    throw new Error(result.stderr.trim() || `MLX-LM ${mode} failed for ${id}.`);
  }

  const current = loadMlxLmSettings();
  const next = addInstalledModel(current, {
    id,
    repoId: id,
    source: 'huggingface',
  });
  next.selectedModelId = id;
  saveMlxLmSettings(next);
  return next;
}

export async function listMlxLmModelsFromServer(
  settings: MlxLmSettings = loadMlxLmSettings(),
): Promise<string[]> {
  const status = await getMlxLmServerStatus(settings);
  return status.models;
}

function resolveModelRepoId(model: Pick<MlxLmInstalledModel, 'id' | 'repoId'>): string {
  const repoId = String(model.repoId || model.id || '').trim();
  return repoId;
}

export function isMlxLmModelInUse(
  modelId: string,
  settings: MlxLmSettings,
  serverStatus: { running: boolean; models: string[] },
): boolean {
  const id = String(modelId || '').trim();
  if (!id || !serverStatus.running) return false;
  if (settings.selectedModelId === id) return true;
  return serverStatus.models.includes(id);
}

async function removeHuggingFaceCacheRepo(repoId: string): Promise<boolean> {
  const dirName = repoIdToCacheDirEntryName(repoId);
  if (!dirName) return false;
  const { homeDir, join } = await import('@tauri-apps/api/path');
  const { exists, remove } = await import('@tauri-apps/plugin-fs');
  const cachePath = await join(await homeDir(), '.cache', 'huggingface', 'hub', dirName);
  if (!(await exists(cachePath))) return false;
  await remove(cachePath, { recursive: true });
  return true;
}

export async function deleteMlxLmModel(
  modelId: string,
  options?: {
    settings?: MlxLmSettings;
    serverStatus?: { running: boolean; models: string[] };
  },
): Promise<MlxLmSettings> {
  requireMacSupport();
  const id = String(modelId || '').trim();
  if (!id) throw new Error('Model id is required.');

  const settings = options?.settings ?? loadMlxLmSettings();
  const serverStatus = options?.serverStatus ?? (await getMlxLmServerStatus(settings));
  if (isMlxLmModelInUse(id, settings, serverStatus)) {
    throw new Error('Stop the MLX-LM server before deleting the loaded model.');
  }

  const installed = await listInstalledMlxLmModels(settings);
  const target = installed.find((model) => model.id === id);
  if (!target && !isValidHuggingFaceRepoId(id)) {
    throw new Error(`Model not found: ${id}`);
  }

  const repoId = target ? resolveModelRepoId(target) : id;
  if (isValidHuggingFaceRepoId(repoId)) {
    await removeHuggingFaceCacheRepo(repoId);
  }

  const next = removeInstalledModel(settings, id);
  saveMlxLmSettings(next);
  return next;
}
