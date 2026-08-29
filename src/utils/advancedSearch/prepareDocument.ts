/** Prepare scrubbed + Korean-enriched body text for Lucivy indexing. */

import { pathBasename, scrubTextForIndex } from '@/utils/advancedSearch/scrubText';
import {
  ensureGaru,
  tokenizeForIndexAsync,
} from '@/utils/advancedSearch/tokenize';

const HAS_HANGUL_RE = /[\uac00-\ud7a3]/;
import type { DocKind } from '@/utils/advancedSearch/types';
import type { LucivyDocFields } from '@/utils/advancedSearch/lucivyBackend';

function previewFromText(text: string, max = 120): string {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

/**
 * Build Lucivy fields: scrubbed body + garu-ko nouns appended for Korean recall.
 */
async function ensureGaruForText(...parts: string[]): Promise<void> {
  if (parts.some((t) => HAS_HANGUL_RE.test(t))) {
    await ensureGaru();
  }
}

/**
 * Prepare one index chunk (full file when totalChunks === 1).
 */
export async function prepareFileChunkLucivyFields(
  path: string,
  chunkText: string,
  chunkIndex: number,
  totalChunks: number,
): Promise<{ fields: LucivyDocFields; preview: string; title: string }> {
  const name = pathBasename(path);
  await ensureGaruForText(chunkText, name, path);
  const scrubbed = scrubTextForIndex(chunkText);
  const pathParts = String(path || '')
    .split(/[/\\]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const extraTerms =
    chunkIndex === 0
      ? [...scrubbed.extraTerms, name, path, ...pathParts]
      : scrubbed.extraTerms;
  const nouns = await tokenizeForIndexAsync(scrubbed.text, extraTerms);
  const body = [scrubbed.text, nouns.join(' ')].filter(Boolean).join('\n');
  const title =
    totalChunks > 1 ? `${name} (${chunkIndex + 1}/${totalChunks})` : name;
  return {
    fields: {
      title,
      body,
      path,
      kind: 'file' satisfies DocKind,
    },
    preview: previewFromText(scrubbed.text),
    title,
  };
}

export async function prepareFileLucivyFields(
  path: string,
  content: string,
): Promise<{ fields: LucivyDocFields; preview: string; title: string }> {
  return prepareFileChunkLucivyFields(path, content, 0, 1);
}

export async function prepareChatLucivyFields(options: {
  dateStr: string;
  messageId: string;
  group: string;
  body: string;
}): Promise<{ fields: LucivyDocFields; preview: string; title: string }> {
  await ensureGaru();
  const scrubbed = scrubTextForIndex(options.body);
  const nouns = await tokenizeForIndexAsync(
    `${options.group} ${scrubbed.text}`,
    scrubbed.extraTerms,
  );
  const title = options.group || 'chat';
  const path = `.chat-with-myself/${options.dateStr}.md`;
  const body = [options.group, scrubbed.text, nouns.join(' ')].filter(Boolean).join('\n');
  return {
    fields: {
      title,
      body,
      path,
      kind: 'chat' satisfies DocKind,
      dateStr: options.dateStr,
    },
    preview: previewFromText(scrubbed.text || options.body),
    title,
  };
}

export { previewFromText };
