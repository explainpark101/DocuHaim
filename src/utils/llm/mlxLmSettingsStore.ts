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
  /** When true, mlx_lm.server binds to 0.0.0.0 so other apps/devices can connect. */
  allowExternalAccess: boolean;
  port: number;
  adapterPath: string;
  selectedModelId: string;
  installedModels: MlxLmInstalledModel[];
};

const STORAGE_KEY = 's3haim_mlx_lm_settings';
const DEFAULT_MODEL = 'mlx-community/Llama-3.2-3B-Instruct-4bit';

export const MLX_LM_LOCAL_CLIENT_HOST = '127.0.0.1';
export const MLX_LM_EXTERNAL_BIND_HOST = '0.0.0.0';

export const MLX_LM_SETTINGS_CHANGED_EVENT = 's3haim-mlx-lm-settings-changed';

function defaultSettings(): MlxLmSettings {
  return {
    host: MLX_LM_LOCAL_CLIENT_HOST,
    allowExternalAccess: true,
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
  const allowExternalAccess =
    typeof rec.allowExternalAccess === 'boolean' ? rec.allowExternalAccess : true;
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
    host: allowExternalAccess ? MLX_LM_LOCAL_CLIENT_HOST : host,
    allowExternalAccess,
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

export function resolveMlxLmServerBindHost(
  settings: Pick<MlxLmSettings, 'host' | 'allowExternalAccess'>,
): string {
  if (settings.allowExternalAccess) return MLX_LM_EXTERNAL_BIND_HOST;
  const host = settings.host.trim() || MLX_LM_LOCAL_CLIENT_HOST;
  return host;
}

export function resolveMlxLmClientHost(
  settings: Pick<MlxLmSettings, 'host' | 'allowExternalAccess'>,
): string {
  if (settings.allowExternalAccess) return MLX_LM_LOCAL_CLIENT_HOST;
  const host = settings.host.trim() || MLX_LM_LOCAL_CLIENT_HOST;
  if (host === MLX_LM_EXTERNAL_BIND_HOST || host === '::' || host === '[::]') {
    return MLX_LM_LOCAL_CLIENT_HOST;
  }
  return host;
}

export function resolveMlxLmOpenAiBaseUrl(
  settings?: Pick<MlxLmSettings, 'host' | 'port' | 'allowExternalAccess'>,
): string {
  const merged = { ...loadMlxLmSettings(), ...settings };
  const host = resolveMlxLmClientHost(merged);
  const port = merged.port ?? 8080;
  return `http://${host}:${port}/v1`;
}

export function resolveMlxLmExternalBaseUrlHint(
  settings?: Pick<MlxLmSettings, 'port' | 'allowExternalAccess'>,
): string | null {
  const merged = { ...loadMlxLmSettings(), ...settings };
  if (!merged.allowExternalAccess) return null;
  return `http://<this-machine-ip>:${merged.port}/v1`;
}

export function resolveMlxLmConnectionSummary(
  settings: Pick<MlxLmSettings, 'host' | 'port' | 'allowExternalAccess'>,
): string {
  const bindHost = resolveMlxLmServerBindHost(settings);
  const port = settings.port || 8080;
  if (settings.allowExternalAccess) {
    return `${bindHost}:${port} (외부 접속 허용)`;
  }
  return `${bindHost}:${port}`;
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

export function removeInstalledModel(settings: MlxLmSettings, modelId: string): MlxLmSettings {
  const id = String(modelId || '').trim();
  if (!id) return settings;
  const installedModels = settings.installedModels.filter((model) => model.id !== id);
  const selectedModelId =
    settings.selectedModelId === id ? (installedModels[0]?.id ?? '') : settings.selectedModelId;
  return { ...settings, installedModels, selectedModelId };
}

export function isMlxLmRepoInstalled(
  repoId: string,
  models: readonly Pick<MlxLmInstalledModel, 'id' | 'repoId'>[],
): boolean {
  const id = String(repoId || '').trim();
  if (!id) return false;
  return models.some((model) => model.id === id || model.repoId === id);
}
