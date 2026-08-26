import Dexie from 'dexie';
import { createStorageBackend } from '@/utils/storage/createStorageBackend.js';
import { tryGetStorageScopeId } from '@/utils/storageScope';
import { getDefaultLlmAssistSystemPrompt } from '@/utils/llm/llmAssistBaseSystemPrompt';

export const LLM_PROMPT_TEMPLATES_KEY = '.settings/llm-prompt-templates.json';

export const LLM_PROMPT_TEMPLATES_SCOPE_EVENT = 's3haim-llm-prompt-templates-scope';

const IDB_MIGRATED_STORAGE_KEY = 's3haim_llm_prompt_templates_idb_migrated';
const IDB_CACHE_SCOPE_KEY = 's3haim_llm_prompt_templates_cache_scope';

export const llmPromptTemplatesDb = new Dexie('s3haim-llm-prompts');

llmPromptTemplatesDb.version(1).stores({
  templates: 'id, name, updatedAt',
});

/**
 * @typedef {Object} LlmPromptTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} instruction
 * @property {string} [systemPrompt]
 * @property {Record<string, unknown>} [requestOptions]
 * @property {number} updatedAt
 */

/**
 * @typedef {Object} LlmPromptTemplatesStoreDeps
 * @property {() => import('@aws-sdk/client-s3').S3Client | null} [getS3Client]
 * @property {{ bucket?: string } | null} [s3Creds]
 * @property {FileSystemDirectoryHandle | null} [localRootHandle]
 * @property {'s3' | 'local' | 'webdav'} [storageMode]
 * @property {{ endpoint: string, username: string, password: string, basePath: string } | null} [webdavConfig]
 */

/** @type {LlmPromptTemplatesStoreDeps} */
const store = {
  getS3Client: null,
  s3Creds: null,
  localRootHandle: null,
  storageMode: 's3',
  webdavConfig: null,
};

/** @type {Promise<LlmPromptTemplate[] | null> | null} */
let syncInFlight = null;
/** @type {string | null} */
let syncInFlightScope = null;
let syncGeneration = 0;
/** @type {string | null} */
let lastReadyScope = null;

function currentScopeId() {
  return tryGetStorageScopeId({
    mode: store.storageMode,
    s3Creds: store.s3Creds,
    localRootHandle: store.localRootHandle,
    webdavConfig: store.webdavConfig,
  });
}

function migratedKeyForScope(scope) {
  return `${IDB_MIGRATED_STORAGE_KEY}:${scope}`;
}

/**
 * Inject storage access from MainApp (same pattern as printSettingsStore).
 * @param {LlmPromptTemplatesStoreDeps | null | undefined} payload
 */
export function setLlmPromptTemplatesStore(payload) {
  if (!payload) return;
  if (payload.getS3Client !== undefined) store.getS3Client = payload.getS3Client;
  if (payload.s3Creds !== undefined) store.s3Creds = payload.s3Creds;
  if (payload.localRootHandle !== undefined) store.localRootHandle = payload.localRootHandle;
  if (payload.storageMode !== undefined) store.storageMode = payload.storageMode;
  if (payload.webdavConfig !== undefined) store.webdavConfig = payload.webdavConfig;

  const nextScope = currentScopeId();
  if (!nextScope || nextScope === lastReadyScope) return;
  lastReadyScope = nextScope;
  syncGeneration += 1;
  syncInFlight = null;
  syncInFlightScope = null;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(LLM_PROMPT_TEMPLATES_SCOPE_EVENT, { detail: { scope: nextScope } }),
    );
  }
}

function getBackend() {
  return createStorageBackend({
    mode: store.storageMode || 's3',
    getS3Client: store.getS3Client || (() => null),
    s3Creds: store.s3Creds,
    localRootHandle: store.localRootHandle,
    webdavConfig: store.webdavConfig,
  });
}

function hasGlobalMigratedIdbToRemote() {
  try {
    return localStorage.getItem(IDB_MIGRATED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function markGlobalMigratedIdbToRemote() {
  try {
    localStorage.setItem(IDB_MIGRATED_STORAGE_KEY, '1');
  } catch {
    // ignore quota / private mode
  }
}

function hasMigratedIdbToRemote(scope) {
  if (!scope) return hasGlobalMigratedIdbToRemote();
  try {
    if (localStorage.getItem(migratedKeyForScope(scope)) === '1') return true;
  } catch {
    // ignore
  }
  return false;
}

function markIdbMigratedToRemote(scope) {
  markGlobalMigratedIdbToRemote();
  if (!scope) return;
  try {
    localStorage.setItem(migratedKeyForScope(scope), '1');
  } catch {
    // ignore quota / private mode
  }
}

function getIdbCacheScope() {
  try {
    return localStorage.getItem(IDB_CACHE_SCOPE_KEY) || '';
  } catch {
    return '';
  }
}

function setIdbCacheScope(scope) {
  try {
    if (scope) localStorage.setItem(IDB_CACHE_SCOPE_KEY, scope);
    else localStorage.removeItem(IDB_CACHE_SCOPE_KEY);
  } catch {
    // ignore
  }
}

export function createEmptyLlmPromptTemplate() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: '',
    instruction: '',
    systemPrompt: getDefaultLlmAssistSystemPrompt(),
    requestOptions: { temperature: 0.4 },
    updatedAt: Date.now(),
  };
}

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function normalizeRequestOptionsField(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { temperature: 0.4 };
  }
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [key, v] of Object.entries(/** @type {Record<string, unknown>} */ (value))) {
    const k = typeof key === 'string' ? key.trim() : '';
    if (!k) continue;
    out[k] = v;
  }
  return Object.keys(out).length ? out : { temperature: 0.4 };
}

/**
 * @param {unknown} value
 * @returns {LlmPromptTemplate | null}
 */
function normalizeTemplate(value) {
  if (!value || typeof value !== 'object') return null;
  const row = /** @type {Record<string, unknown>} */ (value);
  const id = typeof row.id === 'string' ? row.id.trim() : '';
  if (!id) return null;
  return {
    id,
    name: typeof row.name === 'string' ? row.name : '',
    instruction: typeof row.instruction === 'string' ? row.instruction : '',
    systemPrompt: typeof row.systemPrompt === 'string' ? row.systemPrompt : '',
    requestOptions: normalizeRequestOptionsField(row.requestOptions),
    updatedAt: typeof row.updatedAt === 'number' && Number.isFinite(row.updatedAt) ? row.updatedAt : Date.now(),
  };
}

/**
 * @param {unknown} parsed
 * @returns {LlmPromptTemplate[] | null}
 */
function parseTemplatesPayload(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  const templates = /** @type {{ templates?: unknown }} */ (parsed).templates;
  if (!Array.isArray(templates)) return null;
  return templates.map(normalizeTemplate).filter(Boolean);
}

function sortByUpdatedAtDesc(templates) {
  return [...templates].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

/**
 * @param {LlmPromptTemplate[]} remoteTemplates
 * @param {LlmPromptTemplate[]} idbTemplates
 * @returns {{ templates: LlmPromptTemplate[], changed: boolean }}
 */
function mergeTemplates(remoteTemplates, idbTemplates) {
  const byId = new Map();
  for (const t of remoteTemplates) byId.set(t.id, t);

  let changed = false;
  for (const t of idbTemplates) {
    const existing = byId.get(t.id);
    if (!existing) {
      byId.set(t.id, t);
      changed = true;
      continue;
    }
    if ((t.updatedAt || 0) > (existing.updatedAt || 0)) {
      byId.set(t.id, t);
      changed = true;
    }
  }

  return {
    templates: sortByUpdatedAtDesc([...byId.values()]),
    changed,
  };
}

/** @returns {Promise<LlmPromptTemplate[]>} */
async function listFromIdb() {
  return llmPromptTemplatesDb.templates.orderBy('updatedAt').reverse().toArray();
}

/** @param {LlmPromptTemplate[]} templates */
async function replaceIdbCache(templates) {
  await llmPromptTemplatesDb.transaction('rw', llmPromptTemplatesDb.templates, async () => {
    await llmPromptTemplatesDb.templates.clear();
    if (templates.length) {
      await llmPromptTemplatesDb.templates.bulkPut(templates);
    }
  });
}

/**
 * @returns {Promise<{ templates: LlmPromptTemplate[], existed: boolean } | null>}
 */
async function loadFromRemote() {
  const backend = getBackend();
  if (!backend?.isReady?.()) return null;

  try {
    const head = await backend.head(LLM_PROMPT_TEMPLATES_KEY);
    if (!head) return { templates: [], existed: false };

    const { text } = await backend.readText(LLM_PROMPT_TEMPLATES_KEY);
    const parsed = parseTemplatesPayload(JSON.parse(text));
    if (!parsed) return { templates: [], existed: true };
    return { templates: sortByUpdatedAtDesc(parsed), existed: true };
  } catch (e) {
    console.warn('LLM prompt templates load from remote failed:', e);
    return null;
  }
}

/** @param {LlmPromptTemplate[]} templates */
async function saveToRemote(templates) {
  const backend = getBackend();
  if (!backend?.isReady?.()) {
    throw new Error('Storage is not ready for LLM prompt templates');
  }
  const payload = JSON.stringify({ templates }, null, 2);
  await backend.writeText(LLM_PROMPT_TEMPLATES_KEY, payload, 'application/json');
}

/**
 * Push IndexedDB templates to remote as soon as storage is ready.
 * One-time merge of local IDB into remote; afterwards remote is source of truth.
 * Cache and migration are scoped per storage backend so S3/Local/WebDAV never mix.
 * @returns {Promise<LlmPromptTemplate[] | null>} synced list, or null if storage not ready
 */
export async function syncLlmPromptTemplatesToRemote() {
  const scope = currentScopeId();
  if (!scope) return null;
  if (syncInFlight && syncInFlightScope === scope) return syncInFlight;

  const generation = syncGeneration;
  syncInFlightScope = scope;
  syncInFlight = (async () => {
    const remote = await loadFromRemote();
    if (generation !== syncGeneration || currentScopeId() !== scope) return null;
    if (!remote) return null;

    const idbList = await listFromIdb();
    if (generation !== syncGeneration || currentScopeId() !== scope) return null;

    const cacheScope = getIdbCacheScope();
    const idbBelongsHere = cacheScope === scope;
    const legacyUnscoped = !cacheScope && idbList.length > 0;
    const globalMigrated = hasGlobalMigratedIdbToRemote();
    const shouldMigrateLegacy = legacyUnscoped && !globalMigrated && !hasMigratedIdbToRemote(scope);

    if (!remote.existed) {
      if (idbBelongsHere && idbList.length) {
        await saveToRemote(idbList);
        if (generation !== syncGeneration || currentScopeId() !== scope) return null;
        await replaceIdbCache(idbList);
        setIdbCacheScope(scope);
        markIdbMigratedToRemote(scope);
        return sortByUpdatedAtDesc(idbList);
      }
      if (shouldMigrateLegacy) {
        await saveToRemote(idbList);
        if (generation !== syncGeneration || currentScopeId() !== scope) return null;
        await replaceIdbCache(idbList);
        setIdbCacheScope(scope);
        markIdbMigratedToRemote(scope);
        return sortByUpdatedAtDesc(idbList);
      }
      await replaceIdbCache([]);
      setIdbCacheScope(scope);
      markIdbMigratedToRemote(scope);
      return [];
    }

    if (shouldMigrateLegacy) {
      const { templates, changed } = mergeTemplates(remote.templates, idbList);
      if (changed) {
        await saveToRemote(templates);
        if (generation !== syncGeneration || currentScopeId() !== scope) return null;
      }
      await replaceIdbCache(templates);
      setIdbCacheScope(scope);
      markIdbMigratedToRemote(scope);
      return templates;
    }

    await replaceIdbCache(remote.templates);
    setIdbCacheScope(scope);
    markIdbMigratedToRemote(scope);
    return remote.templates;
  })()
    .catch((e) => {
      console.warn('LLM prompt templates sync to remote failed:', e);
      return null;
    })
    .finally(() => {
      if (syncInFlightScope === scope) {
        syncInFlight = null;
        syncInFlightScope = null;
      }
    });

  return syncInFlight;
}

/**
 * Prefer remote `.settings/llm-prompt-templates.json` (default).
 * Ensures IndexedDB templates are uploaded/merged when storage is ready.
 * Falls back to IndexedDB only when it belongs to the current storage backend.
 * @returns {Promise<LlmPromptTemplate[]>}
 */
export async function listLlmPromptTemplates() {
  const synced = await syncLlmPromptTemplatesToRemote();
  if (synced) return synced;
  const scope = currentScopeId();
  if (scope && getIdbCacheScope() === scope) {
    return listFromIdb();
  }
  return [];
}

/**
 * @param {LlmPromptTemplate} template
 * @returns {Promise<LlmPromptTemplate>}
 */
export async function saveLlmPromptTemplate(template) {
  const record = {
    ...template,
    name: (template.name || '').trim(),
    instruction: (template.instruction || '').trim(),
    systemPrompt: (template.systemPrompt || '').trim(),
    requestOptions: normalizeRequestOptionsField(template.requestOptions),
    updatedAt: Date.now(),
  };

  const current = await listLlmPromptTemplates();
  const next = sortByUpdatedAtDesc([
    ...current.filter((t) => t.id !== record.id),
    record,
  ]);

  const backend = getBackend();
  const scope = currentScopeId();
  if (backend?.isReady?.() && scope) {
    await saveToRemote(next);
    await replaceIdbCache(next);
    setIdbCacheScope(scope);
    markIdbMigratedToRemote(scope);
  } else if (scope && getIdbCacheScope() === scope) {
    await llmPromptTemplatesDb.templates.put(record);
  } else if (scope) {
    await replaceIdbCache(next);
    setIdbCacheScope(scope);
  } else {
    await llmPromptTemplatesDb.templates.put(record);
  }
  return record;
}

/** @param {string} id */
export async function deleteLlmPromptTemplate(id) {
  const current = await listLlmPromptTemplates();
  const next = current.filter((t) => t.id !== id);

  const backend = getBackend();
  const scope = currentScopeId();
  if (backend?.isReady?.() && scope) {
    await saveToRemote(next);
    await replaceIdbCache(next);
    setIdbCacheScope(scope);
    markIdbMigratedToRemote(scope);
  } else if (scope && getIdbCacheScope() === scope) {
    await llmPromptTemplatesDb.templates.delete(id);
  } else if (scope) {
    await replaceIdbCache(next);
    setIdbCacheScope(scope);
  } else {
    await llmPromptTemplatesDb.templates.delete(id);
  }
}
