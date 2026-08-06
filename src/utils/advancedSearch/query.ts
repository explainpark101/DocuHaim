import { tokenizeForIndexAsync } from './tokenize';
import type { DocMeta, InMemoryIndex } from './types';
import { collectSearchableFileEntries } from './collectSources';
import { matchAppCommands, type AppCommandId } from './commands';

export type MatchReason = 'command' | 'name' | 'path' | 'content';

export type AdvancedSearchHit = {
  docId: string;
  kind: 'file' | 'chat' | 'command';
  path: string;
  title: string;
  preview?: string;
  dateStr?: string;
  messageId?: string;
  group?: string;
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

function commandHits(query: string): AdvancedSearchHit[] {
  return matchAppCommands(query).map((cmd) => ({
    docId: `command:${cmd.id}`,
    kind: 'command' as const,
    path: cmd.path,
    title: cmd.title,
    preview: cmd.description,
    commandId: cmd.id,
    reasons: ['command'] as MatchReason[],
    score: scoreHit(['command']),
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
}): Promise<AdvancedSearchHit[]> {
  const q = String(options.query || '').trim();
  const limit = options.limit ?? 50;
  const commands = commandHits(q);

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

  // Filename / path (always)
  for (const tree of options.trees) {
    const files = collectSearchableFileEntries(tree);
    for (const file of files) {
      const nameLower = file.name.toLowerCase();
      const pathLower = file.path.toLowerCase();
      const nameHit = nameLower.includes(qLower);
      const pathHit = !nameHit && pathLower.includes(qLower);
      if (!nameHit && !pathHit) continue;
      upsert({
        docId: `file:${file.path}`,
        kind: 'file',
        path: file.path,
        title: file.name,
        reason: nameHit ? 'name' : 'path',
      });
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
  }

  return Array.from(hits.values())
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'))
    .slice(0, limit);
}

function pathBasenameSafe(path: string): string {
  return path.split('/').pop() || path;
}
