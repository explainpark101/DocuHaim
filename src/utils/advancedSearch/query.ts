import { tokenizeForIndexAsync } from './tokenize';
import type { DocMeta, InMemoryIndex } from './types';
import { collectSearchableFileEntries } from './collectSources';
import {
  matchAppCommandsRanked,
  type AppCommandContext,
  type AppCommandId,
} from './commands';
import { fuzzyMatchText, scoreFuzzyRelevance } from './fuzzyMatch';

export type MatchReason = 'command' | 'name' | 'path' | 'content';

export type AdvancedSearchHit = {
  docId: string;
  kind: 'file' | 'chat' | 'command' | 'folder';
  path: string;
  title: string;
  preview?: string;
  dateStr?: string;
  messageId?: string;
  group?: string;
  /** Chat group icon storage path (for picker avatars). */
  iconPath?: string;
  /** Built-in command id when kind === 'command'. */
  commandId?: AppCommandId;
  reasons: MatchReason[];
  score: number;
};

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

function intersectSorted(a: string[], b: Set<string>): string[] {
  const out: string[] = [];
  for (const id of a) {
    if (b.has(id)) out.push(id);
  }
  return out;
}

function postingsLookup(
  index: InMemoryIndex,
  terms: string[],
): string[] {
  if (terms.length === 0) return [];
  let current: string[] | null = null;
  for (const term of terms) {
    const set = index.postings.get(term);
    if (!set || set.size === 0) return [];
    const ids = Array.from(set);
    if (!current) {
      current = ids;
      continue;
    }
    current = intersectSorted(current, set);
    if (current.length === 0) return [];
  }
  return current || [];
}

function scoreHit(reasons: MatchReason[]): number {
  let s = 0;
  if (reasons.includes('command')) s += 200;
  if (reasons.includes('name')) s += 100;
  if (reasons.includes('path')) s += 40;
  if (reasons.includes('content')) s += 10;
  return s;
}

function commandHits(
  query: string,
  context?: AppCommandContext,
): AdvancedSearchHit[] {
  return matchAppCommandsRanked(query, context).map(({ command: cmd, score }) => ({
    docId: `command:${cmd.id}`,
    kind: 'command' as const,
    path: cmd.path,
    title: cmd.title,
    preview: cmd.description,
    commandId: cmd.id,
    reasons: ['command'] as MatchReason[],
    // Relevance-first: keep command category boost small so ranking is mostly score.
    score: score + 50,
  }));
}

/**
 * Merge built-in commands, filename/path matches, and inverted-index content hits.
 * Empty query → built-in commands only (palette suggestions).
 */
export async function runAdvancedSearch(options: {
  query: string;
  trees: Array<TreeNode[] | null | undefined>;
  index: InMemoryIndex | null;
  indexEnabled: boolean;
  limit?: number;
  commandContext?: AppCommandContext;
}): Promise<AdvancedSearchHit[]> {
  const q = String(options.query || '').trim();
  const limit = options.limit ?? 50;
  const commands = commandHits(q, options.commandContext);

  // Empty query: show app shortcuts only
  if (!q) {
    return commands.slice(0, limit);
  }

  const qLower = q.toLowerCase();
  const hits = new Map<string, AdvancedSearchHit>();

  for (const cmd of commands) {
    hits.set(cmd.docId, cmd);
  }

  const upsert = (
    partial: Omit<AdvancedSearchHit, 'score' | 'reasons'> & {
      reason: MatchReason;
    },
  ) => {
    const prev = hits.get(partial.docId);
    const reasons = prev
      ? Array.from(new Set([...prev.reasons, partial.reason]))
      : [partial.reason];
    const next: AdvancedSearchHit = {
      docId: partial.docId,
      kind: partial.kind,
      path: partial.path,
      title: partial.title,
      reasons,
      score: scoreHit(reasons),
    };
    const preview = partial.preview ?? prev?.preview;
    if (preview !== undefined) next.preview = preview;
    const dateStr = partial.dateStr ?? prev?.dateStr;
    if (dateStr !== undefined) next.dateStr = dateStr;
    const messageId = partial.messageId ?? prev?.messageId;
    if (messageId !== undefined) next.messageId = messageId;
    const group = partial.group ?? prev?.group;
    if (group !== undefined) next.group = group;
    const commandId = partial.commandId ?? prev?.commandId;
    if (commandId !== undefined) next.commandId = commandId;
    hits.set(partial.docId, next);
  };

  // Filename / path from live trees (chat-style fuzzy / partial match)
  for (const tree of options.trees) {
    const files = collectSearchableFileEntries(tree);
    for (const file of files) {
      const nameLower = file.name.toLowerCase();
      const pathLower = file.path.toLowerCase();
      const nameScore = scoreFuzzyRelevance(nameLower, qLower);
      const pathScore = scoreFuzzyRelevance(pathLower, qLower);
      if (nameScore <= 0 && pathScore <= 0) continue;
      if (nameScore > 0) {
        upsert({
          docId: `file:${file.path}`,
          kind: 'file',
          path: file.path,
          title: file.name,
          reason: 'name',
        });
        const hit = hits.get(`file:${file.path}`);
        if (hit) hit.score += nameScore;
      }
      if (pathScore > 0) {
        upsert({
          docId: `file:${file.path}`,
          kind: 'file',
          path: file.path,
          title: file.name,
          reason: 'path',
        });
        const hit = hits.get(`file:${file.path}`);
        // Path fuzzy is weaker than name; avoid double-counting full nameScore.
        if (hit && nameScore <= 0) hit.score += Math.round(pathScore * 0.45);
        else if (hit && pathScore > nameScore) {
          hit.score += Math.round((pathScore - nameScore) * 0.3);
        }
      }
    }
  }

  // Path / title from indexed docs (folder segments, even when tree is incomplete)
  if (options.indexEnabled && options.index) {
    for (const [docId, meta] of options.index.docs) {
      if (meta.kind !== 'file') continue;
      const title = meta.title || pathBasenameSafe(meta.path);
      const nameLower = title.toLowerCase();
      const pathLower = String(meta.path || '').toLowerCase();
      const nameScore = scoreFuzzyRelevance(nameLower, qLower);
      const pathScore = scoreFuzzyRelevance(pathLower, qLower);
      if (nameScore <= 0 && pathScore <= 0) continue;
      if (nameScore > 0) {
        upsert({
          docId,
          kind: 'file',
          path: meta.path,
          title,
          ...(meta.preview ? { preview: meta.preview } : {}),
          reason: 'name',
        });
        const hit = hits.get(docId);
        if (hit) hit.score += nameScore;
      }
      if (pathScore > 0) {
        upsert({
          docId,
          kind: 'file',
          path: meta.path,
          title,
          ...(meta.preview ? { preview: meta.preview } : {}),
          reason: 'path',
        });
        const hit = hits.get(docId);
        if (hit && nameScore <= 0) hit.score += Math.round(pathScore * 0.45);
      }
    }
  }

  // Content / chat via inverted index
  if (options.indexEnabled && options.index) {
    const terms = await tokenizeForIndexAsync(q, []);
    const queryTerms =
      terms.length > 0
        ? terms
        : qLower
            .split(/\s+/)
            .map((t) => t.trim())
            .filter((t) => t.length >= 2);

    if (queryTerms.length > 0) {
      const docIds = postingsLookup(options.index, queryTerms);
      for (const docId of docIds) {
        const meta: DocMeta | undefined = options.index.docs.get(docId);
        if (!meta) continue;
        if (meta.kind === 'file') {
          upsert({
            docId,
            kind: 'file',
            path: meta.path,
            title: meta.title || pathBasenameSafe(meta.path),
            ...(meta.preview ? { preview: meta.preview } : {}),
            reason: 'content',
          });
        } else {
          upsert({
            docId,
            kind: 'chat',
            path: meta.path,
            title: meta.group || meta.title || 'chat',
            ...(meta.preview ? { preview: meta.preview } : {}),
            ...(meta.dateStr ? { dateStr: meta.dateStr } : {}),
            ...(meta.messageId ? { messageId: meta.messageId } : {}),
            ...(meta.group ? { group: meta.group } : {}),
            reason: 'content',
          });
        }
      }
    }

    // Path-like query: OR postings for slash-separated segments (folder navigation).
    if (qLower.includes('/') || qLower.includes('\\')) {
      const pathParts = qLower
        .split(/[/\\]+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 2);
      const seenIds = new Set<string>();
      for (const part of pathParts) {
        const set = options.index.postings.get(part);
        if (!set) continue;
        for (const docId of set) {
          if (seenIds.has(docId)) continue;
          const meta = options.index.docs.get(docId);
          if (!meta || meta.kind !== 'file') continue;
          const pathLower = String(meta.path || '').toLowerCase();
          if (
            !fuzzyMatchText(pathLower, qLower) &&
            !pathParts.every((p) => fuzzyMatchText(pathLower, p))
          ) {
            continue;
          }
          seenIds.add(docId);
          upsert({
            docId,
            kind: 'file',
            path: meta.path,
            title: meta.title || pathBasenameSafe(meta.path),
            ...(meta.preview ? { preview: meta.preview } : {}),
            reason: 'path',
          });
        }
      }
    }

    // Fuzzy / partial match on indexed chat + file meta when token postings miss.
    for (const [docId, meta] of options.index.docs) {
      if (hits.has(docId)) continue;
      const title = meta.title || pathBasenameSafe(meta.path);
      const haystacks = [
        title,
        meta.path,
        meta.preview,
        meta.group,
        meta.messageId,
      ];
      const matched = haystacks.some((h) => fuzzyMatchText(String(h || ''), qLower));
      if (!matched) continue;
      if (meta.kind === 'file') {
        upsert({
          docId,
          kind: 'file',
          path: meta.path,
          title,
          ...(meta.preview ? { preview: meta.preview } : {}),
          reason: 'name',
        });
        const hit = hits.get(docId);
        if (hit) hit.score += scoreFuzzyRelevance(title, qLower);
      } else {
        upsert({
          docId,
          kind: 'chat',
          path: meta.path,
          title: meta.group || meta.title || 'chat',
          ...(meta.preview ? { preview: meta.preview } : {}),
          ...(meta.dateStr ? { dateStr: meta.dateStr } : {}),
          ...(meta.messageId ? { messageId: meta.messageId } : {}),
          ...(meta.group ? { group: meta.group } : {}),
          reason: 'content',
        });
        const hit = hits.get(docId);
        if (hit) {
          hit.score += scoreFuzzyRelevance(
            `${meta.preview || ''} ${meta.group || ''} ${title}`,
            qLower,
          );
        }
      }
    }
  }

  return Array.from(hits.values())
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'))
    .slice(0, limit);
}

function pathBasenameSafe(path: string): string {
  return path.split('/').pop() || path;
}
