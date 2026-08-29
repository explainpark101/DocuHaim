import {
  chatDateFromPath,
  collectIndexablePathsFromTree,
  type IndexablePathOptions,
} from '@/utils/advancedSearch/collectSources';
import {
  extractMatchRegions,
  type ContentSearchFileHit,
} from '@/utils/advancedSearch/contentSearchSnippets';
import type { IndexedCoverage } from '@/utils/advancedSearch/indexedCoverage';
import { isIndexedChatMessage, isIndexedFilePath } from '@/utils/advancedSearch/indexedCoverage';
import { scrubTextForIndex, pathBasename } from '@/utils/advancedSearch/scrubText';
import { tokenizeForIndexAsync } from '@/utils/advancedSearch/tokenize';
import type { AdvancedSearchBackend } from '@/utils/advancedSearch/store';
import type { DocMeta, InMemoryIndex } from '@/utils/advancedSearch/types';
import type { AdvancedSearchLiveScanLimits } from '@/utils/advancedSearch/settings';
import {
  isLiveScanUnlimited,
  normalizeLiveScanLimits,
} from '@/utils/advancedSearch/settings';
import { indexableEncMdBody } from '@/utils/encMd';
import { parseDayFile } from '@/utils/chatWithMyself/format.js';
import { fileDocId } from '@/utils/advancedSearch/paths';
import type { LucivyContentSearchFn } from '@/utils/advancedSearch/query';

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

const YIELD_EVERY = 8;

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

async function queryTerms(query: string): Promise<string[]> {
  const q = String(query || '').trim();
  if (!q) return [];
  const tokens = await tokenizeForIndexAsync(q, []);
  if (tokens.length > 0) return tokens.map((t) => t.toLowerCase());
  return q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
}

function displayTextFromRaw(path: string, raw: string): string {
  const body = indexableEncMdBody(path, raw);
  return scrubTextForIndex(body).text;
}

function buildFileHit(
  path: string,
  text: string,
  terms: string[],
  rawQuery: string,
  score: number,
): ContentSearchFileHit | null {
  const { regions, matchCount } = extractMatchRegions(text, terms, rawQuery);
  if (matchCount === 0) return null;
  const name = pathBasename(path);
  return {
    docId: fileDocId(path),
    kind: 'file',
    path,
    title: name,
    matchCount,
    regions,
    score,
  };
}

function buildChatHit(
  path: string,
  msg: Record<string, unknown>,
  dateStr: string,
  text: string,
  terms: string[],
  rawQuery: string,
  score: number,
): ContentSearchFileHit | null {
  const messageId = String(msg?.id || '');
  if (!messageId) return null;
  const group = String(msg?.group || '');
  const { regions, matchCount } = extractMatchRegions(text, terms, rawQuery);
  if (matchCount === 0) return null;
  const hit: ContentSearchFileHit = {
    docId: `chat:${dateStr}:${messageId}`,
    kind: 'chat',
    path,
    title: group || 'chat',
    matchCount,
    regions,
    score,
    dateStr,
    messageId,
  };
  if (group) hit.group = group;
  return hit;
}

async function loadIndexedFileHit(
  backend: AdvancedSearchBackend,
  path: string,
  terms: string[],
  rawQuery: string,
  score: number,
): Promise<ContentSearchFileHit | null> {
  if (!backend.readText) return null;
  try {
    const { text: raw } = (await backend.readText(path)) || { text: '' };
    const display = displayTextFromRaw(path, raw);
    return buildFileHit(path, display, terms, rawQuery, score);
  } catch {
    return null;
  }
}

async function loadIndexedChatHit(
  backend: AdvancedSearchBackend,
  meta: DocMeta,
  terms: string[],
  rawQuery: string,
  score: number,
): Promise<ContentSearchFileHit | null> {
  const dateStr = meta.dateStr || chatDateFromPath(meta.path);
  const messageId = meta.messageId;
  if (!dateStr || !messageId) return null;
  if (!backend.readText) return null;
  try {
    const { text } = (await backend.readText(meta.path)) || { text: '' };
    const { messages } = parseDayFile(text);
    const msg = (messages || []).find((m) => String(m?.id || '') === messageId);
    if (!msg) return null;
    const body = String(msg.body || '');
    const group = String(msg.group || '');
    const display = scrubTextForIndex(`${group}\n${body}`).text;
    return buildChatHit(meta.path, msg, dateStr, display, terms, rawQuery, score);
  } catch {
    return null;
  }
}

export async function searchContentPageFromIndex(options: {
  query: string;
  index: InMemoryIndex;
  lucivySearch: LucivyContentSearchFn;
  backend: AdvancedSearchBackend;
  limit?: number;
  generation?: number;
  isCurrent?: (generation: number) => boolean;
}): Promise<ContentSearchFileHit[]> {
  const q = String(options.query || '').trim();
  if (!q) return [];
  const terms = await queryTerms(q);
  if (terms.length === 0 && !q) return [];

  const limit = options.limit ?? 40;
  const gen = options.generation ?? 0;
  const isCurrent = options.isCurrent ?? (() => true);

  const lucivyHits = await options.lucivySearch(terms.length > 0 ? terms : [q.toLowerCase()], limit * 4);
  if (!isCurrent(gen)) return [];

  const hits: ContentSearchFileHit[] = [];
  const seenFiles = new Set<string>();
  const seenChat = new Set<string>();
  let processed = 0;

  for (const { docId, score } of lucivyHits) {
    if (!isCurrent(gen) || hits.length >= limit) break;
    const meta = options.index.docs.get(docId);
    if (!meta) continue;

    if (meta.kind === 'file') {
      const path = String(meta.path || '').replace(/^\/+/, '');
      if (!path || seenFiles.has(path)) continue;
      seenFiles.add(path);
      const hit = await loadIndexedFileHit(
        options.backend,
        path,
        terms,
        q,
        Math.round(score * 10) + 10,
      );
      if (hit) hits.push(hit);
    } else {
      const chatKey = `${meta.dateStr || ''}:${meta.messageId || docId}`;
      if (seenChat.has(chatKey)) continue;
      seenChat.add(chatKey);
      const hit = await loadIndexedChatHit(options.backend, meta, terms, q, Math.round(score * 10) + 10);
      if (hit) hits.push(hit);
    }

    processed += 1;
    if (processed % YIELD_EVERY === 0) await yieldToMain();
  }

  return hits
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'))
    .slice(0, limit);
}

export async function searchContentPageLive(options: {
  query: string;
  trees: Array<TreeNode[] | null | undefined>;
  backend: AdvancedSearchBackend;
  includeOtherFiles?: boolean;
  excludedFolders?: readonly string[];
  limits?: Partial<AdvancedSearchLiveScanLimits>;
  limit?: number;
  generation?: number;
  isCurrent?: (generation: number) => boolean;
  onlyUnindexed?: boolean;
  indexedCoverage?: IndexedCoverage | null;
}): Promise<ContentSearchFileHit[]> {
  const backend = options.backend;
  if (!backend?.readText || (typeof backend.isReady === 'function' && !backend.isReady())) {
    return [];
  }

  const q = String(options.query || '').trim();
  if (!q) return [];
  const terms = await queryTerms(q);
  if (terms.length === 0) return [];

  const limits = normalizeLiveScanLimits(options.limits ?? {});
  const gen = options.generation ?? 0;
  const isCurrent = options.isCurrent ?? (() => true);
  const hitCap = isLiveScanUnlimited(limits.maxHits)
    ? Number.POSITIVE_INFINITY
    : limits.maxHits;
  const optionCap =
    typeof options.limit === 'number' && Number.isFinite(options.limit)
      ? options.limit
      : hitCap;
  const limit = Math.min(optionCap, hitCap);

  const pathOpts: IndexablePathOptions = {
    includeOtherFiles: Boolean(options.includeOtherFiles),
    excludedFolders: options.excludedFolders || [],
  };

  const filePaths: string[] = [];
  const chatDayPaths: string[] = [];
  const seenFile = new Set<string>();
  const seenChat = new Set<string>();
  for (const tree of options.trees) {
    const { filePaths: files, chatDayPaths: chats } = collectIndexablePathsFromTree(tree, pathOpts);
    for (const p of files) {
      if (seenFile.has(p)) continue;
      seenFile.add(p);
      filePaths.push(p);
    }
    for (const p of chats) {
      if (seenChat.has(p)) continue;
      seenChat.add(p);
      chatDayPaths.push(p);
    }
  }

  chatDayPaths.sort((a, b) => b.localeCompare(a));

  const hits: ContentSearchFileHit[] = [];
  let scanned = 0;

  const filesToScan = isLiveScanUnlimited(limits.maxFiles)
    ? filePaths
    : filePaths.slice(0, limits.maxFiles);

  for (const path of filesToScan) {
    if (!isCurrent(gen) || hits.length >= limit) break;
    if (options.onlyUnindexed && options.indexedCoverage && isIndexedFilePath(options.indexedCoverage, path)) {
      scanned += 1;
      if (scanned % YIELD_EVERY === 0) await yieldToMain();
      continue;
    }
    try {
      const { text: raw } = (await backend.readText(path)) || { text: '' };
      const display = displayTextFromRaw(path, raw);
      const lower = display.toLowerCase();
      if (!terms.every((t) => lower.includes(t))) {
        scanned += 1;
        if (scanned % YIELD_EVERY === 0) await yieldToMain();
        continue;
      }
      const hit = buildFileHit(path, display, terms, q, 10 + terms.length * 2);
      if (hit) hits.push(hit);
    } catch {
      // skip unreadable
    }
    scanned += 1;
    if (scanned % YIELD_EVERY === 0) await yieldToMain();
  }

  const chatsToScan = isLiveScanUnlimited(limits.maxChatDays)
    ? chatDayPaths
    : chatDayPaths.slice(0, limits.maxChatDays);

  for (const path of chatsToScan) {
    if (!isCurrent(gen) || hits.length >= limit) break;
    try {
      const { text } = (await backend.readText(path)) || { text: '' };
      const dateStr = chatDateFromPath(path);
      if (!dateStr) continue;
      const { messages } = parseDayFile(text);
      for (const msg of messages || []) {
        if (hits.length >= limit) break;
        const id = String(msg?.id || '');
        if (!id) continue;
        if (
          options.onlyUnindexed &&
          options.indexedCoverage &&
          isIndexedChatMessage(options.indexedCoverage, dateStr, id)
        ) {
          continue;
        }
        const body = String(msg?.body || '');
        const group = String(msg?.group || '');
        const display = scrubTextForIndex(`${group}\n${body}`).text;
        const lower = display.toLowerCase();
        if (!terms.every((t) => lower.includes(t))) continue;
        const hit = buildChatHit(path, msg, dateStr, display, terms, q, 10 + terms.length * 2);
        if (hit) hits.push(hit);
      }
    } catch {
      // skip
    }
    scanned += 1;
    if (scanned % YIELD_EVERY === 0) await yieldToMain();
  }

  if (!isCurrent(gen)) return [];
  return hits
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'))
    .slice(0, limit);
}
