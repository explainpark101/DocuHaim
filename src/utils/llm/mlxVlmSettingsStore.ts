export type MlxVlmModelSource = 'huggingface' | 'local';

export type MlxVlmInstalledModel = {
  id: string;
  repoId?: string;
  localPath?: string;
  source: MlxVlmModelSource;
  installedAt: number;
};

export type MlxVlmSettings = {
  adapterPath: string;
  hfToken: string;
  selectedModelId: string;
  /** Parallel HF download workers (--max-workers). */
  hfDownloadMaxWorkers: number;
  installedModels: MlxVlmInstalledModel[];
};

const STORAGE_KEY = 's3haim_mlx_vlm_settings';
const LEGACY_STORAGE_KEY = 's3haim_mlx_lm_settings';
export const DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS = 16;
const MLX_VLM_HF_DOWNLOAD_MAX_WORKERS_MIN = 1;
const MLX_VLM_HF_DOWNLOAD_MAX_WORKERS_MAX = 32;

export const MLX_VLM_SETTINGS_CHANGED_EVENT = 's3haim-mlx-vlm-settings-changed';

export function normalizeMlxVlmHfDownloadMaxWorkers(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number.parseInt(String(raw ?? ''), 10);
  if (!Number.isFinite(n)) return DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS;
  return Math.min(
    Math.max(Math.trunc(n), MLX_VLM_HF_DOWNLOAD_MAX_WORKERS_MIN),
    MLX_VLM_HF_DOWNLOAD_MAX_WORKERS_MAX,
  );
}

function defaultSettings(): MlxVlmSettings {
  return {
    adapterPath: '',
    hfToken: '',
    selectedModelId: '',
    hfDownloadMaxWorkers: DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS,
    installedModels: [],
  };
}

function isSelectedModelInstalled(
  selectedModelId: string,
  installedModels: readonly MlxVlmInstalledModel[],
): boolean {
  if (!selectedModelId) return true;
  return installedModels.some(
    (model) => model.id === selectedModelId || model.repoId === selectedModelId,
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalizeInstalledModel(raw: unknown): MlxVlmInstalledModel | null {
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

export function normalizeMlxVlmSettings(raw: unknown): MlxVlmSettings {
  const base = defaultSettings();
  const rec = asRecord(raw);
  if (!rec) return base;

  const adapterPath = typeof rec.adapterPath === 'string' ? rec.adapterPath.trim() : '';
  const hfToken = typeof rec.hfToken === 'string' ? rec.hfToken.trim() : '';
  const hfDownloadMaxWorkers = normalizeMlxVlmHfDownloadMaxWorkers(rec.hfDownloadMaxWorkers);
  let selectedModelId =
    typeof rec.selectedModelId === 'string' ? rec.selectedModelId.trim() : base.selectedModelId;

  const installedModels: MlxVlmInstalledModel[] = [];
  const seen = new Set<string>();
  if (Array.isArray(rec.installedModels)) {
    for (const item of rec.installedModels) {
      const model = normalizeInstalledModel(item);
      if (!model || seen.has(model.id)) continue;
      seen.add(model.id);
      installedModels.push(model);
    }
  }

  if (!isSelectedModelInstalled(selectedModelId, installedModels)) {
    selectedModelId = '';
  }

  return {
    adapterPath,
    hfToken,
    selectedModelId,
    hfDownloadMaxWorkers,
    installedModels,
  };
}

export function loadMlxVlmSettings(): MlxVlmSettings {
  if (typeof window === 'undefined') return defaultSettings();
  try {
    const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? legacyRaw;
    if (!raw) return defaultSettings();
    const normalized = normalizeMlxVlmSettings(JSON.parse(raw));
    if (legacyRaw && !window.localStorage.getItem(STORAGE_KEY)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return defaultSettings();
  }
}

export function saveMlxVlmSettings(next: MlxVlmSettings): void {
  if (typeof window === 'undefined') return;
  const normalized = normalizeMlxVlmSettings(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(MLX_VLM_SETTINGS_CHANGED_EVENT));
  } catch {
    // ignore
  }
}

export function mergeInstalledModels(
  primary: MlxVlmInstalledModel[],
  secondary: MlxVlmInstalledModel[],
): MlxVlmInstalledModel[] {
  const out: MlxVlmInstalledModel[] = [];
  const seen = new Set<string>();
  for (const model of [...primary, ...secondary]) {
    if (seen.has(model.id)) continue;
    seen.add(model.id);
    out.push(model);
  }
  return out.sort((a, b) => b.installedAt - a.installedAt);
}

export function addInstalledModel(
  settings: MlxVlmSettings,
  entry: Omit<MlxVlmInstalledModel, 'installedAt'> & { installedAt?: number },
): MlxVlmSettings {
  const installedAt = entry.installedAt ?? Date.now();
  const nextModel: MlxVlmInstalledModel = { ...entry, installedAt };
  const without = settings.installedModels.filter((m) => m.id !== nextModel.id);
  return {
    ...settings,
    installedModels: [nextModel, ...without],
  };
}

export function setSelectedMlxVlmModelId(settings: MlxVlmSettings, modelId: string): MlxVlmSettings {
  const id = String(modelId || '').trim();
  return { ...settings, selectedModelId: id };
}

export function removeInstalledModel(settings: MlxVlmSettings, modelId: string): MlxVlmSettings {
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

export function isMlxVlmRepoInstalled(
  repoId: string,
  models: readonly Pick<MlxVlmInstalledModel, 'id' | 'repoId'>[],
): boolean {
  const id = String(repoId || '').trim();
  if (!id) return false;
  return models.some((model) => model.id === id || model.repoId === id);
}

/** Keep MLX-VLM installed rows; drop llama.cpp GGUF cache auto-discovery noise. */
export function isMlxVlmInstalledModelEntry(
  model: Pick<MlxVlmInstalledModel, 'id' | 'repoId' | 'source' | 'installedAt'>,
): boolean {
  const repoId = String(model.repoId || model.id || '').trim();
  if (!repoId) return false;
  if (model.source === 'local') return true;
  if (/gguf/i.test(repoId)) return false;
  if (repoId.toLowerCase().startsWith('mlx-community/')) return true;
  return (model.installedAt ?? 0) > 0;
}

export function filterMlxVlmInstalledModels(
  models: readonly MlxVlmInstalledModel[],
): MlxVlmInstalledModel[] {
  return models.filter(isMlxVlmInstalledModelEntry);
}
