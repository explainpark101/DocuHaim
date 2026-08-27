export type MlxLmModelSource = 'huggingface' | 'local';

export type MlxLmInstalledModel = {
  id: string;
  repoId?: string;
  localPath?: string;
  source: MlxLmModelSource;
  installedAt: number;
};

export type MlxLmSettings = {
  host: string;
  port: number;
  adapterPath: string;
  selectedModelId: string;
  installedModels: MlxLmInstalledModel[];
};

const STORAGE_KEY = 's3haim_mlx_lm_settings';
const DEFAULT_MODEL = 'mlx-community/Llama-3.2-3B-Instruct-4bit';

export const MLX_LM_SETTINGS_CHANGED_EVENT = 's3haim-mlx-lm-settings-changed';

function defaultSettings(): MlxLmSettings {
  return {
    host: '127.0.0.1',
    port: 8080,
    adapterPath: '',
    selectedModelId: DEFAULT_MODEL,
    installedModels: [],
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalizeInstalledModel(raw: unknown): MlxLmInstalledModel | null {
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

export function normalizeMlxLmSettings(raw: unknown): MlxLmSettings {
  const base = defaultSettings();
  const rec = asRecord(raw);
  if (!rec) return base;

  const host = typeof rec.host === 'string' && rec.host.trim() ? rec.host.trim() : base.host;
  const portRaw = rec.port;
  const port =
    typeof portRaw === 'number' && Number.isFinite(portRaw) && portRaw > 0 && portRaw < 65536
      ? Math.floor(portRaw)
      : base.port;
  const adapterPath = typeof rec.adapterPath === 'string' ? rec.adapterPath.trim() : '';
  const selectedModelId =
    typeof rec.selectedModelId === 'string' && rec.selectedModelId.trim()
      ? rec.selectedModelId.trim()
      : base.selectedModelId;

  const installedModels: MlxLmInstalledModel[] = [];
  const seen = new Set<string>();
  if (Array.isArray(rec.installedModels)) {
    for (const item of rec.installedModels) {
      const model = normalizeInstalledModel(item);
      if (!model || seen.has(model.id)) continue;
      seen.add(model.id);
      installedModels.push(model);
    }
  }

  return {
    host,
    port,
    adapterPath,
    selectedModelId,
    installedModels,
  };
}

export function loadMlxLmSettings(): MlxLmSettings {
  if (typeof window === 'undefined') return defaultSettings();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings();
    return normalizeMlxLmSettings(JSON.parse(raw));
  } catch {
    return defaultSettings();
  }
}

export function saveMlxLmSettings(next: MlxLmSettings): void {
  if (typeof window === 'undefined') return;
  const normalized = normalizeMlxLmSettings(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(MLX_LM_SETTINGS_CHANGED_EVENT));
  } catch {
    // ignore
  }
}

export function resolveMlxLmOpenAiBaseUrl(settings?: Pick<MlxLmSettings, 'host' | 'port'>): string {
  const host = String(settings?.host || loadMlxLmSettings().host || '127.0.0.1').trim() || '127.0.0.1';
  const port = settings?.port ?? loadMlxLmSettings().port ?? 8080;
  return `http://${host}:${port}/v1`;
}

export function mergeInstalledModels(
  primary: MlxLmInstalledModel[],
  secondary: MlxLmInstalledModel[],
): MlxLmInstalledModel[] {
  const out: MlxLmInstalledModel[] = [];
  const seen = new Set<string>();
  for (const model of [...primary, ...secondary]) {
    if (seen.has(model.id)) continue;
    seen.add(model.id);
    out.push(model);
  }
  return out.sort((a, b) => b.installedAt - a.installedAt);
}

export function addInstalledModel(
  settings: MlxLmSettings,
  entry: Omit<MlxLmInstalledModel, 'installedAt'> & { installedAt?: number },
): MlxLmSettings {
  const installedAt = entry.installedAt ?? Date.now();
  const nextModel: MlxLmInstalledModel = { ...entry, installedAt };
  const without = settings.installedModels.filter((m) => m.id !== nextModel.id);
  return {
    ...settings,
    selectedModelId: settings.selectedModelId || nextModel.id,
    installedModels: [nextModel, ...without],
  };
}

export function setSelectedMlxLmModelId(settings: MlxLmSettings, modelId: string): MlxLmSettings {
  const id = String(modelId || '').trim();
  if (!id) return settings;
  return { ...settings, selectedModelId: id };
}
