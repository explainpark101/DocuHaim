/**
 * Live vault body scan for Advanced Search when Lucivy is unavailable (web).
 * Reads file / chat-day text via the storage backend; AND-of-substring match.
 */

import {
  collectIndexablePathsFromTree,
  chatDateFromPath,
  type IndexablePathOptions,
} from '@/utils/advancedSearch/collectSources';
import { scrubTextForIndex, pathBasename } from '@/utils/advancedSearch/scrubText';
import { tokenizeForIndexAsync } from '@/utils/advancedSearch/tokenize';
import type { AdvancedSearchHit } from '@/utils/advancedSearch/query';
import type { AdvancedSearchBackend } from '@/utils/advancedSearch/store';
import { indexableEncMdBody } from '@/utils/encMd';
import { parseDayFile } from '@/utils/chatWithMyself/format.js';

import type { AdvancedSearchLiveScanLimits } from '@/utils/advancedSearch/settings';
import {
  isLiveScanUnlimited,
  loadAdvancedSearchLiveScanLimits,
  normalizeLiveScanLimits,
} from '@/utils/advancedSearch/settings';

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

const YIELD_EVERY = 8;
const PREVIEW_LEN = 120;

export type LiveContentSearchOptions = {
  query: string;
  trees: Array<TreeNode[] | null | undefined>;
  backend: AdvancedSearchBackend;
  includeOtherFiles?: boolean;
  /** Cap content hits; defaults to limits.maxHits. */
  limit?: number;
  limits?: Partial<AdvancedSearchLiveScanLimits>;
  /** Abort when this generation no longer matches (stale query). */
  generation?: number;
  isCurrent?: (generation: number) => boolean;
};

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function previewFrom(text: string, max = PREVIEW_LEN): string {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

function haystackMatchesAll(haystackLower: string, terms: string[]): boolean {
  if (!haystackLower || terms.length === 0) return false;
  return terms.every((t) => haystackLower.includes(t));
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

/**
 * Scan vault files + chat day messages for query terms (substring AND).
 * Returns content hits only (caller merges with name/path/commands).
 */
export async function liveScanContentHits(
  options: LiveContentSearchOptions,
): Promise<AdvancedSearchHit[]> {
  const backend = options.backend;
  if (
    !backend?.readText ||
    (typeof backend.isReady === 'function' && !backend.isReady())
  ) {
    return [];
  }

  const terms = await queryTerms(options.query);
  if (terms.length === 0) return [];

  const limits = normalizeLiveScanLimits({
    ...loadAdvancedSearchLiveScanLimits(),
    ...options.limits,
  });

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
  };

  const filePaths: string[] = [];
  const chatDayPaths: string[] = [];
  const seenFile = new Set<string>();
  const seenChat = new Set<string>();
  for (const tree of options.trees) {
    const { filePaths: files, chatDayPaths: chats } =
      collectIndexablePathsFromTree(tree, pathOpts);
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

  // Prefer newer chat days first.
  chatDayPaths.sort((a, b) => b.localeCompare(a));

  const hits: AdvancedSearchHit[] = [];
  let scanned = 0;

  const filesToScan = isLiveScanUnlimited(limits.maxFiles)
    ? filePaths
    : filePaths.slice(0, limits.maxFiles);
  for (const path of filesToScan) {
    if (!isCurrent(gen) || hits.length >= limit) break;
    try {
      const { text: raw } = (await backend.readText(path)) || { text: '' };
      const text = indexableEncMdBody(path, raw);
      const scrubbed = scrubTextForIndex(text).text;
      const hay = scrubbed.toLowerCase();
      if (!haystackMatchesAll(hay, terms)) {
        scanned += 1;
        if (scanned % YIELD_EVERY === 0) await yieldToMain();
        continue;
      }
      const name = pathBasename(path);
      hits.push({
        docId: `file:${path}`,
        kind: 'file',
        path,
        title: name,
        preview: previewFrom(scrubbed),
        reasons: ['content'],
        score: 10 + terms.length * 2,
      });
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
        const body = String(msg?.body || '');
        const group = String(msg?.group || '');
        const scrubbed = scrubTextForIndex(`${group} ${body}`).text;
        const hay = scrubbed.toLowerCase();
        if (!haystackMatchesAll(hay, terms)) continue;
        const id = String(msg?.id || '');
        if (!id) continue;
        const hit: AdvancedSearchHit = {
          docId: `chat:${dateStr}:${id}`,
          kind: 'chat',
          path,
          title: group || 'chat',
          preview: previewFrom(scrubbed || body),
          dateStr,
          messageId: id,
          reasons: ['content'],
          score: 10 + terms.length * 2,
        };
        if (group) hit.group = group;
        hits.push(hit);
      }
    } catch {
      // skip
    }
    scanned += 1;
    if (scanned % YIELD_EVERY === 0) await yieldToMain();
  }

  if (!isCurrent(gen)) return [];
  return hits;
}
