import { load as yamlLoad, dump as yamlDump } from 'js-yaml';
import { getObjectBody, headObject, putObject } from '@/utils/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';
import type {
  HaimTableStyleSettings,
  HaimTableTemplate,
  HaimTableTemplateRule,
  HaimTableSections,
} from '@/utils/haimTable/types';
import { normalizeHaimTableStyle, isEmptyStyle, styleToSnakeRecord } from '@/utils/haimTable/styleNormalize';

const TABLE_STYLES_KEY = '.settings/table-styles.yaml';
const LOCAL_STORAGE_KEY = 's3haim_table_styles';
export const TABLE_STYLES_CHANGED_EVENT = 's3haim-table-styles-changed';

export const DEFAULT_TABLE_STYLE_SETTINGS: HaimTableStyleSettings = {
  version: 1,
  templates: [],
};

type WebdavConfig = {
  endpoint: string;
  username: string;
  password: string;
  basePath: string;
};

type StoreState = {
  getS3Client: (() => unknown) | null;
  s3Creds: { bucket?: string } | null;
  localRootHandle: FileSystemDirectoryHandle | null;
  storageMode: string;
  webdavConfig: WebdavConfig | null;
  cached: HaimTableStyleSettings;
};

const store: StoreState = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
  cached: { ...DEFAULT_TABLE_STYLE_SETTINGS, templates: [] },
};

export function setTableStyleSettingsStore(payload: {
  getS3Client?: (() => unknown) | null;
  s3Creds?: { bucket?: string } | null;
  localRootHandle?: FileSystemDirectoryHandle | null;
  storageMode?: string;
  webdavConfig?: WebdavConfig | null | Record<string, unknown>;
}): void {
  if (!payload) return;
  if (payload.getS3Client !== undefined) store.getS3Client = payload.getS3Client;
  if (payload.s3Creds !== undefined) store.s3Creds = payload.s3Creds;
  if (payload.localRootHandle !== undefined) store.localRootHandle = payload.localRootHandle;
  if (payload.storageMode !== undefined) store.storageMode = payload.storageMode;
  if (payload.webdavConfig !== undefined) {
    store.webdavConfig = (payload.webdavConfig as WebdavConfig | null) ?? null;
  }
}

export function getCachedTableStyleSettings(): HaimTableStyleSettings {
  return store.cached;
}

export function getCachedTableStyleTemplate(id: string): HaimTableTemplate | null {
  const t = store.cached.templates.find((x) => x.id === id);
  return t ?? null;
}

function normalizeSections(raw: unknown): HaimTableSections | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const o = raw as Record<string, unknown>;
  const out: HaimTableSections = {};
  for (const key of ['thead', 'tbody', 'tfoot'] as const) {
    if (o[key]) {
      const s = normalizeHaimTableStyle(o[key]);
      if (!isEmptyStyle(s)) out[key] = s;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function normalizeRule(raw: unknown): HaimTableTemplateRule | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const style = normalizeHaimTableStyle(o);
  const rule: HaimTableTemplateRule = { ...style };
  if (typeof o.rows === 'string' && o.rows.trim()) rule.rows = o.rows.trim();
  if (typeof o.cols === 'string' && o.cols.trim()) rule.cols = o.cols.trim();
  if (!rule.rows && !rule.cols && isEmptyStyle(style)) return null;
  return rule;
}

function normalizeTemplate(raw: unknown): HaimTableTemplate | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === 'string' ? o.id.trim() : '';
  if (!id) return null;
  const name = typeof o.name === 'string' && o.name.trim() ? o.name.trim() : id;
  const template: HaimTableTemplate = { id, name };
  const sections = normalizeSections(o.sections);
  if (sections) template.sections = sections;
  if (Array.isArray(o.rules)) {
    const rules = o.rules.map(normalizeRule).filter(Boolean) as HaimTableTemplateRule[];
    if (rules.length) template.rules = rules;
  }
  return template;
}

export function parseTableStyleSettings(raw: unknown): HaimTableStyleSettings {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_TABLE_STYLE_SETTINGS, templates: [] };
  const o = raw as Record<string, unknown>;
  const templates: HaimTableTemplate[] = [];
  if (Array.isArray(o.templates)) {
    for (const item of o.templates) {
      const t = normalizeTemplate(item);
      if (t) templates.push(t);
    }
  }
  return { version: 1, templates };
}

export function parseTableStyleYaml(text: string): HaimTableStyleSettings {
  try {
    const raw = yamlLoad(text);
    return parseTableStyleSettings(raw);
  } catch {
    return { ...DEFAULT_TABLE_STYLE_SETTINGS, templates: [] };
  }
}

export function serializeTableStyleYaml(settings: HaimTableStyleSettings): string {
  const templates = (settings.templates ?? []).map((t) => {
    const item: Record<string, unknown> = {
      id: t.id,
      name: t.name,
    };
    if (t.sections) {
      const sections: Record<string, unknown> = {};
      for (const key of ['thead', 'tbody', 'tfoot'] as const) {
        if (t.sections[key] && !isEmptyStyle(t.sections[key])) {
          sections[key] = styleToSnakeRecord(t.sections[key]!);
        }
      }
      if (Object.keys(sections).length) item.sections = sections;
    }
    if (t.rules?.length) {
      item.rules = t.rules.map((r) => {
        const rule: Record<string, unknown> = { ...styleToSnakeRecord(r) };
        if (r.rows) rule.rows = r.rows;
        if (r.cols) rule.cols = r.cols;
        return rule;
      });
    }
    return item;
  });
  return yamlDump(
    { version: 1, templates },
    { indent: 2, lineWidth: 100, noRefs: true },
  );
}

function loadFromLocalStorage(): HaimTableStyleSettings | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (!raw) return null;
    // Prefer YAML; fall back to JSON
    if (raw.trimStart().startsWith('{')) {
      return parseTableStyleSettings(JSON.parse(raw));
    }
    return parseTableStyleYaml(raw);
  } catch {
    return null;
  }
}

function saveToLocalStorage(settings: HaimTableStyleSettings): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, serializeTableStyleYaml(settings));
    }
  } catch {
    /* ignore */
  }
}

export function notifyTableStylesChanged(settings: HaimTableStyleSettings): void {
  store.cached = settings;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(TABLE_STYLES_CHANGED_EVENT, { detail: settings }),
  );
}

async function loadFromWebdav(): Promise<HaimTableStyleSettings | null> {
  const cfg = store.webdavConfig;
  if (!cfg?.endpoint || !cfg?.username) return null;
  try {
    const backend = createWebdavBackend(cfg);
    const head = await backend.head(TABLE_STYLES_KEY);
    if (!head) return null;
    const { text } = await backend.readText(TABLE_STYLES_KEY);
    return parseTableStyleYaml(text);
  } catch (e) {
    console.warn('Table style settings load from WebDAV failed:', e);
    return null;
  }
}

async function loadFromS3(): Promise<HaimTableStyleSettings | null> {
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const head = await headObject(client as any, bucket, TABLE_STYLES_KEY);
    if (!head) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body } = await getObjectBody(client as any, bucket, TABLE_STYLES_KEY);
    const text = new TextDecoder('utf-8').decode(body);
    return parseTableStyleYaml(text);
  } catch (e) {
    console.warn('Table style settings load from S3 failed:', e);
    return null;
  }
}

async function loadFromLocal(): Promise<HaimTableStyleSettings | null> {
  const localHandle = store.localRootHandle;
  if (!localHandle) return null;
  try {
    const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: false });
    const fileHandle = await settingsDir.getFileHandle('table-styles.yaml', { create: false });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return parseTableStyleYaml(text);
  } catch (e) {
    if ((e as { name?: string })?.name !== 'NotFound') {
      console.warn('Table style settings load from local failed:', e);
    }
    return null;
  }
}

export async function loadTableStylesFromStorage(): Promise<HaimTableStyleSettings> {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_TABLE_STYLE_SETTINGS, templates: [] };
  const mode = store.storageMode || 's3';

  let remote: HaimTableStyleSettings | null = null;
  if (mode === 'webdav') remote = await loadFromWebdav();
  else if (mode === 'local') remote = await loadFromLocal();
  else remote = await loadFromS3();

  const next = remote ?? fallback;
  store.cached = next;
  saveToLocalStorage(next);
  return next;
}

export async function saveTableStylesToStorage(
  settings: HaimTableStyleSettings,
): Promise<HaimTableStyleSettings> {
  const payloadSettings = parseTableStyleSettings(settings);
  const payload = serializeTableStyleYaml(payloadSettings);
  const mode = store.storageMode || 's3';

  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (cfg?.endpoint && cfg?.username) {
      const backend = createWebdavBackend(cfg);
      await backend.writeText(TABLE_STYLES_KEY, payload, 'text/yaml');
    }
  } else if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (localHandle) {
      const settingsDir = await localHandle.getDirectoryHandle('.settings', { create: true });
      const fileHandle = await settingsDir.getFileHandle('table-styles.yaml', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
    }
  } else {
    const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
    const bucket = store.s3Creds?.bucket;
    if (client && bucket) {
      await putObject(client as never, {
        Bucket: bucket,
        Key: TABLE_STYLES_KEY,
        Body: payload,
        ContentType: 'text/yaml',
        CacheControl: 'no-cache, no-store, must-revalidate',
      });
    }
  }

  saveToLocalStorage(payloadSettings);
  notifyTableStylesChanged(payloadSettings);
  return payloadSettings;
}
