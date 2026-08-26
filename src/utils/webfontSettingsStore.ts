import { deleteObject, getObjectBody, headObject, listObjectsV2, putObject } from '@/utils/vault/s3Client';
import { createWebdavBackend } from '@/utils/storage/webdavBackend';

const WEBFONTS_DIR = '.settings/webfonts';
const WEBFONTS_INDEX_KEY = `${WEBFONTS_DIR}/index.json`;
/** Legacy single-file path (v1). Migrated into webfonts/ on first load. */
const LEGACY_WEBFONTS_JSON_KEY = '.settings/webfonts.json';
const LOCAL_STORAGE_KEY = 's3haim_webfonts_v2';
export const WEBFONTS_CHANGED_EVENT = 's3haim-webfonts-changed';

/** App-bundled fonts (index.css @font-face). Always available; not vault files. */
export const BUILTIN_WEBFONT_ENTRIES = [
  { id: 'builtin-paperozi', name: 'Paperozi', families: ['Paperozi'] as const },
  { id: 'builtin-a2z', name: 'A2z', families: ['A2z'] as const },
  { id: 'builtin-d2coding', name: 'D2Coding', families: ['D2Coding'] as const },
  { id: 'builtin-kopub-dotum', name: 'KoPub Dotum', families: ['KoPub Dotum'] as const },
  { id: 'builtin-kopub-batang', name: 'KoPub Batang', families: ['KoPub Batang'] as const },
  {
    id: 'builtin-joseon-shinmyeongjo',
    name: 'JoseonShinmyeongjo',
    families: ['JoseonShinmyeongjo'] as const,
  },
] as const;

export type WebfontFileMeta = {
  id: string;
  /** Display label in settings / pickers. */
  name: string;
  /** File under `.settings/webfonts/` (e.g. `abc123.css`). */
  filename: string;
};

export type WebfontFileEntry = WebfontFileMeta & {
  css: string;
};

export type WebfontSettings = {
  version: 2;
  files: WebfontFileEntry[];
  /** Concatenated user CSS for document injection. */
  css: string;
};

export const DEFAULT_WEBFONT_SETTINGS: WebfontSettings = {
  version: 2,
  files: [],
  css: '',
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
  cached: WebfontSettings;
};

const store: StoreState = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
  cached: { ...DEFAULT_WEBFONT_SETTINGS, files: [] },
};

type IndexDoc = {
  version: 2;
  files: WebfontFileMeta[];
};

/**
 * Inject S3/local/WebDAV access from MainApp (same pattern as print settings).
 */
export function setWebfontSettingsStore(payload: {
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

export function getCachedWebfontSettings(): WebfontSettings {
  return store.cached;
}

export function getCachedWebfontCss(): string {
  return store.cached.css || '';
}

/** Parse font-family names declared inside @font-face blocks. */
export function extractFontFamilyNamesFromCss(css: string): string[] {
  if (!css || typeof css !== 'string') return [];
  const names = new Set<string>();
  const faceRe = /@font-face\s*\{([\s\S]*?)\}/gi;
  let match: RegExpExecArray | null;
  while ((match = faceRe.exec(css)) !== null) {
    const block = match[1] ?? '';
    const fam = /font-family\s*:\s*([^;]+)/i.exec(block);
    if (!fam?.[1]) continue;
    let name = fam[1].trim();
    name = name.split(',')[0]?.trim() ?? '';
    name = name.replace(/^['"]+|['"]+$/g, '').trim();
    if (name) names.add(name);
  }
  return [...names].sort((a, b) => a.localeCompare(b, 'ko'));
}

export function getCachedWebfontFamilyNames(): string[] {
  return extractFontFamilyNamesFromCss(store.cached.css);
}

function joinCss(files: WebfontFileEntry[]): string {
  return files
    .map((f) => (f.css || '').trim())
    .filter(Boolean)
    .join('\n\n');
}

function withJoinedCss(files: WebfontFileEntry[]): WebfontSettings {
  return {
    version: 2,
    files,
    css: joinCss(files),
  };
}

function sanitizeFilename(id: string): string {
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || `wf-${Date.now().toString(36)}`;
  return `${safe}.css`;
}

function newWebfontId(): string {
  return `wf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseIndex(raw: unknown): IndexDoc {
  if (!raw || typeof raw !== 'object') return { version: 2, files: [] };
  const o = raw as Record<string, unknown>;
  const filesRaw = Array.isArray(o.files) ? o.files : [];
  const files: WebfontFileMeta[] = [];
  for (const item of filesRaw) {
    if (!item || typeof item !== 'object') continue;
    const f = item as Record<string, unknown>;
    const id = typeof f.id === 'string' ? f.id.trim() : '';
    if (!id) continue;
    const filename =
      typeof f.filename === 'string' && f.filename.trim()
        ? f.filename.trim().replace(/^.*\//, '')
        : sanitizeFilename(id);
    const name =
      typeof f.name === 'string' && f.name.trim()
        ? f.name.trim()
        : id;
    files.push({ id, name, filename });
  }
  return { version: 2, files };
}

function parseLegacyV1(raw: unknown): string {
  if (!raw || typeof raw !== 'object') return '';
  const o = raw as Record<string, unknown>;
  return typeof o.css === 'string' ? o.css : '';
}

function loadFromLocalStorage(): WebfontSettings | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const o = parsed as Record<string, unknown>;
    if (o.version === 2 && Array.isArray(o.files)) {
      const files: WebfontFileEntry[] = [];
      for (const item of o.files) {
        if (!item || typeof item !== 'object') continue;
        const f = item as Record<string, unknown>;
        const id = typeof f.id === 'string' ? f.id : '';
        if (!id) continue;
        files.push({
          id,
          name: typeof f.name === 'string' ? f.name : id,
          filename: typeof f.filename === 'string' ? f.filename : sanitizeFilename(id),
          css: typeof f.css === 'string' ? f.css : '',
        });
      }
      return withJoinedCss(files);
    }
    // accidental v1 shape in new key
    const css = typeof o.css === 'string' ? o.css : '';
    if (!css.trim()) return { ...DEFAULT_WEBFONT_SETTINGS, files: [] };
    const id = 'migrated-local';
    return withJoinedCss([
      { id, name: 'Migrated', filename: sanitizeFilename(id), css },
    ]);
  } catch {
    return null;
  }
}

function saveToLocalStorage(settings: WebfontSettings): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    }
  } catch {
    /* ignore quota */
  }
}

export function notifyWebfontsChanged(settings: WebfontSettings): void {
  store.cached = settings;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(WEBFONTS_CHANGED_EVENT, {
      detail: {
        css: settings.css,
        files: settings.files,
        families: extractFontFamilyNamesFromCss(settings.css),
      },
    }),
  );
}

async function storageReadText(key: string): Promise<string | null> {
  const mode = store.storageMode || 's3';
  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (!cfg?.endpoint || !cfg?.username) return null;
    try {
      const backend = createWebdavBackend(cfg);
      const head = await backend.head(key);
      if (!head) return null;
      const { text } = await backend.readText(key);
      return text;
    } catch (e) {
      console.warn('Webfont read WebDAV failed:', key, e);
      return null;
    }
  }
  if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (!localHandle) return null;
    try {
      const parts = key.split('/').filter(Boolean);
      let dir: FileSystemDirectoryHandle = localHandle;
      for (let i = 0; i < parts.length - 1; i += 1) {
        dir = await dir.getDirectoryHandle(parts[i]!, { create: false });
      }
      const fileHandle = await dir.getFileHandle(parts[parts.length - 1]!, { create: false });
      return await (await fileHandle.getFile()).text();
    } catch (e) {
      if ((e as { name?: string })?.name !== 'NotFound') {
        console.warn('Webfont read local failed:', key, e);
      }
      return null;
    }
  }
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const head = await headObject(client as any, bucket, key);
    if (!head) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body } = await getObjectBody(client as any, bucket, key);
    return new TextDecoder('utf-8').decode(body);
  } catch (e) {
    console.warn('Webfont read S3 failed:', key, e);
    return null;
  }
}

async function storageWriteText(key: string, text: string, contentType: string): Promise<void> {
  const mode = store.storageMode || 's3';
  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (!cfg?.endpoint || !cfg?.username) return;
    const backend = createWebdavBackend(cfg);
    await backend.writeText(key, text, contentType);
    return;
  }
  if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (!localHandle) return;
    const parts = key.split('/').filter(Boolean);
    let dir: FileSystemDirectoryHandle = localHandle;
    for (let i = 0; i < parts.length - 1; i += 1) {
      dir = await dir.getDirectoryHandle(parts[i]!, { create: true });
    }
    const fileHandle = await dir.getFileHandle(parts[parts.length - 1]!, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
    return;
  }
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return;
  await putObject(client as never, {
    Bucket: bucket,
    Key: key,
    Body: text,
    ContentType: contentType,
    CacheControl: 'no-cache, no-store, must-revalidate',
  });
}

async function storageDelete(key: string): Promise<void> {
  const mode = store.storageMode || 's3';
  if (mode === 'webdav') {
    const cfg = store.webdavConfig;
    if (!cfg?.endpoint || !cfg?.username) return;
    const backend = createWebdavBackend(cfg);
    try {
      await backend.delete(key);
    } catch (e) {
      console.warn('Webfont delete WebDAV failed:', key, e);
    }
    return;
  }
  if (mode === 'local') {
    const localHandle = store.localRootHandle;
    if (!localHandle) return;
    try {
      const parts = key.split('/').filter(Boolean);
      let dir: FileSystemDirectoryHandle = localHandle;
      for (let i = 0; i < parts.length - 1; i += 1) {
        dir = await dir.getDirectoryHandle(parts[i]!, { create: false });
      }
      await dir.removeEntry(parts[parts.length - 1]!);
    } catch (e) {
      if ((e as { name?: string })?.name !== 'NotFound') {
        console.warn('Webfont delete local failed:', key, e);
      }
    }
    return;
  }
  const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
  const bucket = store.s3Creds?.bucket;
  if (!client || !bucket) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await deleteObject(client as any, bucket, key);
  } catch (e) {
    console.warn('Webfont delete S3 failed:', key, e);
  }
}

async function writeIndex(files: WebfontFileMeta[]): Promise<void> {
  const doc: IndexDoc = {
    version: 2,
    files: files.map(({ id, name, filename }) => ({ id, name, filename })),
  };
  await storageWriteText(WEBFONTS_INDEX_KEY, JSON.stringify(doc, null, 2), 'application/json');
}

async function migrateLegacyIfNeeded(): Promise<WebfontFileEntry[] | null> {
  const legacyText = await storageReadText(LEGACY_WEBFONTS_JSON_KEY);
  if (!legacyText) return null;
  let css = '';
  try {
    css = parseLegacyV1(JSON.parse(legacyText));
  } catch {
    return null;
  }
  if (!css.trim()) return null;

  const id = 'migrated';
  const filename = sanitizeFilename(id);
  const families = extractFontFamilyNamesFromCss(css);
  const entry: WebfontFileEntry = {
    id,
    name: families[0] ?? 'Migrated webfonts',
    filename,
    css,
  };
  await storageWriteText(`${WEBFONTS_DIR}/${filename}`, css, 'text/css; charset=utf-8');
  await writeIndex([{ id: entry.id, name: entry.name, filename: entry.filename }]);
  return [entry];
}

async function loadRemoteFiles(): Promise<WebfontFileEntry[] | null> {
  const indexText = await storageReadText(WEBFONTS_INDEX_KEY);
  if (!indexText) {
    return migrateLegacyIfNeeded();
  }
  let index: IndexDoc;
  try {
    index = parseIndex(JSON.parse(indexText));
  } catch {
    return migrateLegacyIfNeeded();
  }

  const files: WebfontFileEntry[] = [];
  for (const meta of index.files) {
    const cssText = (await storageReadText(`${WEBFONTS_DIR}/${meta.filename}`)) ?? '';
    const families = extractFontFamilyNamesFromCss(cssText);
    files.push({
      ...meta,
      name: meta.name || families[0] || meta.id,
      css: cssText,
    });
  }

  // Orphan .css under prefix (optional recovery for S3)
  if ((store.storageMode || 's3') === 's3') {
    const client = typeof store.getS3Client === 'function' ? store.getS3Client() : null;
    const bucket = store.s3Creds?.bucket;
    if (client && bucket) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const listed = await listObjectsV2(client as any, bucket, `${WEBFONTS_DIR}/`);
        const known = new Set(files.map((f) => f.filename));
        for (const obj of listed) {
          const key = obj.Key as string | undefined;
          if (!key || !key.endsWith('.css')) continue;
          const filename = key.slice(WEBFONTS_DIR.length + 1);
          if (!filename || filename.includes('/') || known.has(filename)) continue;
          const cssText = (await storageReadText(key)) ?? '';
          if (!cssText.trim()) continue;
          const id = filename.replace(/\.css$/i, '');
          const families = extractFontFamilyNamesFromCss(cssText);
          files.push({
            id,
            name: families[0] ?? id,
            filename,
            css: cssText,
          });
          known.add(filename);
        }
        if (files.length !== index.files.length) {
          await writeIndex(files.map(({ id, name, filename }) => ({ id, name, filename })));
        }
      } catch (e) {
        console.warn('Webfont orphan scan failed:', e);
      }
    }
  }

  return files;
}

export async function loadWebfontsFromStorage(): Promise<WebfontSettings> {
  const fallback = loadFromLocalStorage() ?? { ...DEFAULT_WEBFONT_SETTINGS, files: [] };
  let remote: WebfontFileEntry[] | null = null;
  try {
    remote = await loadRemoteFiles();
  } catch (e) {
    console.warn('Webfont load failed:', e);
  }
  const next = remote ? withJoinedCss(remote) : fallback;
  store.cached = next;
  saveToLocalStorage(next);
  return next;
}

/**
 * Create or update one webfont CSS file in the vault.
 */
export async function saveWebfontFile(input: {
  id?: string;
  name?: string;
  css: string;
}): Promise<WebfontSettings> {
  const css = typeof input.css === 'string' ? input.css : '';
  const families = extractFontFamilyNamesFromCss(css);
  const id = (input.id && input.id.trim()) || newWebfontId();
  const filename = sanitizeFilename(id);
  const name =
    (input.name && input.name.trim())
    || families[0]
    || id;

  const prev = store.cached.files.filter((f) => f.id !== id);
  const entry: WebfontFileEntry = { id, name, filename, css };
  const files = [...prev, entry];

  await storageWriteText(`${WEBFONTS_DIR}/${filename}`, css, 'text/css; charset=utf-8');
  await writeIndex(files.map(({ id: fid, name: n, filename: fn }) => ({ id: fid, name: n, filename: fn })));

  const next = withJoinedCss(files);
  saveToLocalStorage(next);
  notifyWebfontsChanged(next);
  return next;
}

export async function deleteWebfontFile(id: string): Promise<WebfontSettings> {
  const target = store.cached.files.find((f) => f.id === id);
  const files = store.cached.files.filter((f) => f.id !== id);
  if (target) {
    await storageDelete(`${WEBFONTS_DIR}/${target.filename}`);
  }
  await writeIndex(files.map(({ id: fid, name, filename }) => ({ id: fid, name, filename })));
  const next = withJoinedCss(files);
  saveToLocalStorage(next);
  notifyWebfontsChanged(next);
  return next;
}

/** @deprecated Prefer saveWebfontFile — kept for callers that still pass a blob. */
export async function saveWebfontsToStorage(settings: {
  css?: string;
  files?: WebfontFileEntry[];
}): Promise<WebfontSettings> {
  if (Array.isArray(settings?.files)) {
    for (const f of settings.files) {
      await storageWriteText(
        `${WEBFONTS_DIR}/${f.filename || sanitizeFilename(f.id)}`,
        f.css || '',
        'text/css; charset=utf-8',
      );
    }
    await writeIndex(
      settings.files.map((f) => ({
        id: f.id,
        name: f.name,
        filename: f.filename || sanitizeFilename(f.id),
      })),
    );
    const next = withJoinedCss(
      settings.files.map((f) => ({
        ...f,
        filename: f.filename || sanitizeFilename(f.id),
      })),
    );
    saveToLocalStorage(next);
    notifyWebfontsChanged(next);
    return next;
  }
  const css = typeof settings?.css === 'string' ? settings.css : '';
  if (!css.trim()) {
    const empty = { ...DEFAULT_WEBFONT_SETTINGS, files: [] as WebfontFileEntry[] };
    await writeIndex([]);
    saveToLocalStorage(empty);
    notifyWebfontsChanged(empty);
    return empty;
  }
  return saveWebfontFile({ id: 'default', name: 'Default', css });
}
