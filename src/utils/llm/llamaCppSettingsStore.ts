export type LlamaCppModelSource = 'huggingface' | 'local';

export type LlamaCppInstalledModel = {
  id: string;
  repoId?: string;
  localPath?: string;
  source: LlamaCppModelSource;
  installedAt: number;
};

export type LlamaCppSettings = {
  selectedModelId: string;
  serverHost: string;
  serverPort: number;
  binaryPath: string;
  apiKey: string;
  ctxSize: number;
  nGpuLayers: number;
  hfToken: string;
  /** Parallel HF download workers (--max-workers). */
  hfDownloadMaxWorkers: number;
  installedModels: LlamaCppInstalledModel[];
};

const STORAGE_KEY = 's3haim_llama_cpp_settings';
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '127.0.0.1';
export const DEFAULT_LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS = 16;
const LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS_MIN = 1;
const LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS_MAX = 32;

export const LLAMA_CPP_SETTINGS_CHANGED_EVENT = 's3haim-llama-cpp-settings-changed';

function defaultSettings(): LlamaCppSettings {
  return {
    selectedModelId: '',
    serverHost: DEFAULT_HOST,
    serverPort: DEFAULT_PORT,
    binaryPath: '',
    apiKey: '',
    ctxSize: 0,
    nGpuLayers: -1,
    hfToken: '',
    hfDownloadMaxWorkers: DEFAULT_LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS,
    installedModels: [],
  };
}

export function normalizeLlamaCppHfDownloadMaxWorkers(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number.parseInt(String(raw ?? ''), 10);
  if (!Number.isFinite(n)) return DEFAULT_LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS;
  return Math.min(
    Math.max(Math.trunc(n), LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS_MIN),
    LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS_MAX,
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalizePort(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number.parseInt(String(raw ?? ''), 10);
  if (!Number.isFinite(n) || n < 1 || n > 65535) return DEFAULT_PORT;
  return n;
}

function normalizeInstalledModel(raw: unknown): LlamaCppInstalledModel | null {
  const rec = asRecord(raw);
  if (!rec) return null;
  const id = typeof rec.id === 'string' ? rec.id.trim() : '';
  if (!id) return null;
  const source = rec.source === 'local' ? 'local' : 'huggingface';
  const repoId = typeof rec.repoId === 'string' ? rec.repoId.trim() : '';
  const localPath = typeof rec.localPath === 'string' ? rec.localPath.trim() : '';
  const installedAt =
    typeof rec.installedAt === 'number' && Number.isFinite(rec.installedAt)
      ? rec.installedAt
      : Date.now();
  return {
    id,
    ...(repoId ? { repoId } : {}),
    ...(localPath ? { localPath } : {}),
    source,
    installedAt,
  };
}

export function normalizeLlamaCppSettings(raw: unknown): LlamaCppSettings {
  const base = defaultSettings();
  const rec = asRecord(raw);
  if (!rec) return base;

  let selectedModelId =
    typeof rec.selectedModelId === 'string' ? rec.selectedModelId.trim() : base.selectedModelId;
  const serverHost =
    typeof rec.serverHost === 'string' && rec.serverHost.trim()
      ? rec.serverHost.trim()
      : base.serverHost;
  const binaryPath = typeof rec.binaryPath === 'string' ? rec.binaryPath.trim() : '';
  const apiKey = typeof rec.apiKey === 'string' ? rec.apiKey.trim() : '';
  const hfToken = typeof rec.hfToken === 'string' ? rec.hfToken.trim() : '';
  const hfDownloadMaxWorkers = normalizeLlamaCppHfDownloadMaxWorkers(rec.hfDownloadMaxWorkers);
  const ctxSize =
    typeof rec.ctxSize === 'number' && Number.isFinite(rec.ctxSize) ? rec.ctxSize : base.ctxSize;
  const nGpuLayers =
    typeof rec.nGpuLayers === 'number' && Number.isFinite(rec.nGpuLayers)
      ? rec.nGpuLayers
      : base.nGpuLayers;

  const installedModels: LlamaCppInstalledModel[] = [];
  const seen = new Set<string>();
  if (Array.isArray(rec.installedModels)) {
    for (const item of rec.installedModels) {
      const model = normalizeInstalledModel(item);
      if (!model || seen.has(model.id)) continue;
      seen.add(model.id);
      installedModels.push(model);
    }
  }

  if (selectedModelId) {
    const isDirectPath =
      selectedModelId.endsWith('.gguf') ||
      selectedModelId.startsWith('/') ||
      selectedModelId.startsWith('.');
    if (!isDirectPath) {
      const installed = installedModels.some(
        (model) => model.id === selectedModelId || model.repoId === selectedModelId,
      );
      if (!installed) selectedModelId = '';
    }
  }

  return {
    selectedModelId,
    serverHost,
    serverPort: normalizePort(rec.serverPort),
    binaryPath,
    apiKey,
    ctxSize,
    nGpuLayers,
    hfToken,
    hfDownloadMaxWorkers,
    installedModels,
  };
}

export function loadLlamaCppSettings(): LlamaCppSettings {
  if (typeof window === 'undefined') return defaultSettings();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings();
    return normalizeLlamaCppSettings(JSON.parse(raw));
  } catch {
    return defaultSettings();
  }
}

export function saveLlamaCppSettings(next: LlamaCppSettings): void {
  if (typeof window === 'undefined') return;
  const normalized = normalizeLlamaCppSettings(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(LLAMA_CPP_SETTINGS_CHANGED_EVENT));
  } catch {
    // ignore
  }
}

export function mergeInstalledLlamaCppModels(
  primary: LlamaCppInstalledModel[],
  secondary: LlamaCppInstalledModel[],
): LlamaCppInstalledModel[] {
  const out: LlamaCppInstalledModel[] = [];
  const seen = new Set<string>();
  for (const model of [...primary, ...secondary]) {
    if (seen.has(model.id)) continue;
    seen.add(model.id);
    out.push(model);
  }
  return out.sort((a, b) => b.installedAt - a.installedAt);
}

export function addInstalledLlamaCppModel(
  settings: LlamaCppSettings,
  entry: Omit<LlamaCppInstalledModel, 'installedAt'> & { installedAt?: number },
): LlamaCppSettings {
  const installedAt = entry.installedAt ?? Date.now();
  const nextModel: LlamaCppInstalledModel = { ...entry, installedAt };
  const without = settings.installedModels.filter((m) => m.id !== nextModel.id);
  return {
    ...settings,
    installedModels: [nextModel, ...without],
  };
}

export function setSelectedLlamaCppModelId(
  settings: LlamaCppSettings,
  modelId: string,
): LlamaCppSettings {
  const id = String(modelId || '').trim();
  return { ...settings, selectedModelId: id };
}

export function removeInstalledLlamaCppModel(
  settings: LlamaCppSettings,
  modelId: string,
): LlamaCppSettings {
  const id = String(modelId || '').trim();
  if (!id) return settings;
  const installedModels = settings.installedModels.filter(
    (model) => model.id !== id && model.repoId !== id,
  );
  const selectedStillInstalled = installedModels.some(
    (model) => model.id === settings.selectedModelId || model.repoId === settings.selectedModelId,
  );
  const selectedModelId = selectedStillInstalled ? settings.selectedModelId : '';
  return { ...settings, installedModels, selectedModelId };
}

export function buildLlamaCppBaseUrl(settings: LlamaCppSettings): string {
  const host = settings.serverHost.trim() || DEFAULT_HOST;
  const port = normalizePort(settings.serverPort);
  return `http://${host}:${port}/v1`;
}

/** Resolve GGUF path from selected model id or direct path. */
export function resolveLlamaCppModelPath(settings: LlamaCppSettings): string {
  const selected = String(settings.selectedModelId || '').trim();
  if (!selected) return '';

  if (selected.endsWith('.gguf') || selected.startsWith('/') || selected.startsWith('.')) {
    return selected;
  }

  const installed = settings.installedModels.find(
    (m) => m.id === selected || m.repoId === selected,
  );
  if (installed?.localPath) return installed.localPath;
  return selected;
}

export function isLlamaCppRepoInstalled(
  repoId: string,
  models: readonly Pick<LlamaCppInstalledModel, 'id' | 'repoId'>[],
): boolean {
  const id = String(repoId || '').trim();
  if (!id) return false;
  return models.some((model) => model.id === id || model.repoId === id);
}
