/** Prepare scrubbed + Korean-enriched body text for Lucivy indexing. */

import { pathBasename, scrubTextForIndex } from './scrubText';
import { ensureGaru, tokenizeForIndexAsync } from './tokenize';
import type { DocKind } from './types';
import type { LucivyDocFields } from './lucivyBackend';

function previewFromText(text: string, max = 120): string {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

/**
 * Build Lucivy fields: scrubbed body + garu-ko nouns appended for Korean recall.
 */
export async function prepareFileLucivyFields(
  path: string,
  content: string,
): Promise<{ fields: LucivyDocFields; preview: string; title: string }> {
  await ensureGaru();
  const scrubbed = scrubTextForIndex(content);
  const name = pathBasename(path);
  const pathParts = String(path || '')
    .split(/[/\\]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const nouns = await tokenizeForIndexAsync(scrubbed.text, [
    ...scrubbed.extraTerms,
    name,
    path,
    ...pathParts,
  ]);
  const body = [scrubbed.text, nouns.join(' ')].filter(Boolean).join('\n');
  return {
    fields: {
      title: name,
      body,
      path,
      kind: 'file' satisfies DocKind,
    },
    preview: previewFromText(scrubbed.text),
    title: name,
  };
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
