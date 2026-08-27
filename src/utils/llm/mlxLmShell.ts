import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  cacheDirEntryToRepoId,
  fetchHuggingFaceModelInfo,
  isMlxCommunityRepoId,
  resolveMlxLmDownloadMode,
  type HfModelSearchHit,
  type MlxLmDownloadMode,
} from '@/utils/llm/mlxLmHuggingFace';
import {
  addInstalledModel,
  loadMlxLmSettings,
  mergeInstalledModels,
  resolveMlxLmOpenAiBaseUrl,
  saveMlxLmSettings,
  type MlxLmInstalledModel,
  type MlxLmSettings,
} from '@/utils/llm/mlxLmSettingsStore';

export { resolveMlxLmOpenAiBaseUrl };

type ChildHandle = {
  kill: () => Promise<void>;
};

let serverChild: ChildHandle | null = null;
let lastDownloadRepoId = '';
let cachedServerBin: string | null | undefined;

const MLX_LM_SERVER_BIN = 'mlx_lm.server';
const MLX_LM_SERVER_BIN_PATH_RE = /^(\/[A-Za-z0-9._/-]+)\/mlx_lm\.server$/;

export function isMlxLmCliSupported(): boolean {
  return isTauriMacOS();
}

export function getLastMlxLmDownloadRepoId(): string {
  return lastDownloadRepoId;
}

export function rememberMlxLmDownloadTarget(repoId: string): void {
  lastDownloadRepoId = String(repoId || '').trim();
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

export function parseMlxLmServerBinPath(whichOutput: string): string | null {
  const line = whichOutput
    .split('\n')
    .map((part) => part.trim())
    .find(Boolean);
  if (!line || !MLX_LM_SERVER_BIN_PATH_RE.test(line)) return null;
  return line;
}

export async function resolveMlxLmServerBin(options?: {
  force?: boolean;
}): Promise<string | null> {
  if (!isMlxLmCliSupported()) return null;
  if (!options?.force && cachedServerBin !== undefined) return cachedServerBin;

  try {
    const result = await runShellExecute('mlx-lm-which', [MLX_LM_SERVER_BIN]);
    const binPath = parseMlxLmServerBinPath(result.stdout);
    cachedServerBin = result.code === 0 && binPath ? binPath : null;
    return cachedServerBin;
  } catch {
    cachedServerBin = null;
    return null;
  }
}

function buildMlxLmServerSpawnArgs(
  binPath: string,
  settings: Pick<MlxLmSettings, 'host' | 'port' | 'selectedModelId'>,
): string[] {
  const model = String(settings.selectedModelId || '').trim();
  return [
    '-c',
    'exec "$0" "$@"',
    binPath,
    '--model',
    model,
    '--port',
    String(settings.port),
    '--host',
    settings.host || '127.0.0.1',
  ];
}

export async function probeMlxLmCli(): Promise<{ available: boolean; detail?: string }> {
  if (!isMlxLmCliSupported()) {
    return { available: false, detail: 'Tauri macOS build only.' };
  }
  try {
    const binPath = await resolveMlxLmServerBin();
    if (binPath) {
      const result = await runShellExecute('mlx-lm-probe-bin', ['-c', 'exec "$0" --help', binPath]);
      if (result.code === 0) {
        return { available: true, detail: binPath };
      }
    }

    const fallback = await runShellExecute('mlx-lm-probe', ['-m', 'mlx_lm.server', '--help']);
    if (fallback.code === 0) {
      return {
        available: true,
        detail: binPath ? `${binPath} (python3 -m fallback ready)` : 'python3 -m mlx_lm.server',
      };
    }

    return {
      available: false,
      detail:
        fallback.stderr.trim() ||
        'mlx_lm.server not found in PATH. Try: uv tool install mlx-lm or pip install mlx-lm',
    };
  } catch (err) {
    return {
      available: false,
      detail: err instanceof Error ? err.message : 'Failed to probe mlx_lm CLI.',
    };
  }
}

function modelsUrl(settings: Pick<MlxLmSettings, 'host' | 'port'>): string {
  const host = settings.host.trim() || '127.0.0.1';
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

  const binPath = await resolveMlxLmServerBin();
  if (!binPath) {
    throw new Error(
      'mlx_lm.server was not found in PATH. Install mlx-lm (e.g. uv tool install mlx-lm) and ensure it is on PATH.',
    );
  }

  const { Command } = await import('@tauri-apps/plugin-shell');
  const child = await Command.create(
    'mlx-lm-server',
    buildMlxLmServerSpawnArgs(binPath, settings),
  ).spawn();
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

  const args =
    mode === 'download'
      ? ['-m', 'huggingface_hub.cli', 'download', id]
      : ['-m', 'mlx_lm.convert', '--model', id, '-q'];

  const scopeName = mode === 'download' ? 'mlx-lm-download' : 'mlx-lm-convert';
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
