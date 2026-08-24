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

export type LucivyContentSearchFn = (
  terms: string[],
  limit: number,
) => Promise<Array<{ docId: string; score: number }>>;

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
    score: score + 50,
  }));
}

/**
 * Merge built-in commands, filename/path matches, and Lucivy content hits.
 * Empty query → built-in commands only (palette suggestions).
 */
export async function runAdvancedSearch(options: {
  query: string;
  trees: Array<TreeNode[] | null | undefined>;
  index: InMemoryIndex | null;
  indexEnabled: boolean;
  /** Lucivy content search; null when index unavailable. */
  lucivySearch?: LucivyContentSearchFn | null;
  limit?: number;
  commandContext?: AppCommandContext;
}): Promise<AdvancedSearchHit[]> {
  const q = String(options.query || '').trim();
  const limit = options.limit ?? 50;
  const commands = commandHits(q, options.commandContext);

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
      scoreBoost?: number;
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
      score: scoreHit(reasons) + (partial.scoreBoost || 0),
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
    if (prev && partial.scoreBoost) {
      next.score = Math.max(prev.score, next.score) + (partial.scoreBoost || 0);
    }
    hits.set(partial.docId, next);
  };

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
        if (hit && nameScore <= 0) hit.score += Math.round(pathScore * 0.45);
        else if (hit && pathScore > nameScore) {
          hit.score += Math.round((pathScore - nameScore) * 0.3);
        }
      }
    }
  }

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

  // Content / chat via Lucivy
  if (options.indexEnabled && options.index && options.lucivySearch) {
    const terms = await tokenizeForIndexAsync(q, []);
    const queryTerms =
      terms.length > 0
        ? terms
        : qLower
            .split(/\s+/)
            .map((t) => t.trim())
            .filter((t) => t.length >= 2);

    if (queryTerms.length > 0) {
      try {
        const lucivyHits = await options.lucivySearch(queryTerms, limit * 2);
        for (const { docId, score } of lucivyHits) {
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
              scoreBoost: Math.round(score * 10),
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
              scoreBoost: Math.round(score * 10),
            });
          }
        }
      } catch (err) {
        console.warn('[advancedSearch] Lucivy search failed', err);
      }
    }

    // Path-like query: fuzzy on indexed paths for slash segments
    if (qLower.includes('/') || qLower.includes('\\')) {
      const pathParts = qLower
        .split(/[/\\]+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 2);
      for (const [docId, meta] of options.index.docs) {
        if (meta.kind !== 'file') continue;
        const pathLower = String(meta.path || '').toLowerCase();
        if (
          !fuzzyMatchText(pathLower, qLower) &&
          !pathParts.every((p) => fuzzyMatchText(pathLower, p))
        ) {
          continue;
        }
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
