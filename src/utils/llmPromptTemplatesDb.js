import Dexie from 'dexie';
import { createStorageBackend } from '@/utils/storage/createStorageBackend.js';

export const LLM_PROMPT_TEMPLATES_KEY = '.settings/llm-prompt-templates.json';

const IDB_MIGRATED_STORAGE_KEY = 's3haim_llm_prompt_templates_idb_migrated';

export const llmPromptTemplatesDb = new Dexie('s3haim-llm-prompts');

llmPromptTemplatesDb.version(1).stores({
  templates: 'id, name, updatedAt',
});

/**
 * @typedef {Object} LlmPromptTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} instruction
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

function hasMigratedIdbToRemote() {
  try {
    return localStorage.getItem(IDB_MIGRATED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function markIdbMigratedToRemote() {
  try {
    localStorage.setItem(IDB_MIGRATED_STORAGE_KEY, '1');
  } catch {
    // ignore quota / private mode
  }
}

export function createEmptyLlmPromptTemplate() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: '',
    instruction: '',
    updatedAt: Date.now(),
  };
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
 * @returns {Promise<LlmPromptTemplate[] | null>} synced list, or null if storage not ready
 */
export async function syncLlmPromptTemplatesToRemote() {
  if (syncInFlight) return syncInFlight;

  syncInFlight = (async () => {
    const remote = await loadFromRemote();
    if (!remote) return null;

    const idbList = await listFromIdb();
    const shouldMigrateIdb = !hasMigratedIdbToRemote() && idbList.length > 0;

    if (!remote.existed) {
      if (idbList.length) {
        await saveToRemote(idbList);
        await replaceIdbCache(idbList);
      }
      markIdbMigratedToRemote();
      return sortByUpdatedAtDesc(idbList);
    }

    if (shouldMigrateIdb) {
      const { templates, changed } = mergeTemplates(remote.templates, idbList);
      if (changed) {
        await saveToRemote(templates);
      }
      await replaceIdbCache(templates);
      markIdbMigratedToRemote();
      return templates;
    }

    await replaceIdbCache(remote.templates);
    markIdbMigratedToRemote();
    return remote.templates;
  })()
    .catch((e) => {
      console.warn('LLM prompt templates sync to remote failed:', e);
      return null;
    })
    .finally(() => {
      syncInFlight = null;
    });

  return syncInFlight;
}

/**
 * Prefer remote `.settings/llm-prompt-templates.json` (default).
 * Ensures IndexedDB templates are uploaded/merged when storage is ready.
 * Falls back to IndexedDB when storage is not ready.
 * @returns {Promise<LlmPromptTemplate[]>}
 */
export async function listLlmPromptTemplates() {
  const synced = await syncLlmPromptTemplatesToRemote();
  if (synced) return synced;
  return listFromIdb();
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
    updatedAt: Date.now(),
  };

  const current = await listLlmPromptTemplates();
  const next = sortByUpdatedAtDesc([
    ...current.filter((t) => t.id !== record.id),
    record,
  ]);

  const backend = getBackend();
  if (backend?.isReady?.()) {
    await saveToRemote(next);
    await replaceIdbCache(next);
    markIdbMigratedToRemote();
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
  if (backend?.isReady?.()) {
    await saveToRemote(next);
    await replaceIdbCache(next);
    markIdbMigratedToRemote();
  } else {
    await llmPromptTemplatesDb.templates.delete(id);
  }
}
