/**
 * Insert `[^N]` at the caret and keep / append trailing source entries.
 */
import { splitBottomSourceFootnotes } from '@/utils/footnoteMarkdownIt';

export type FootnoteInsertResult = {
  next: string;
  caret: number;
  label: string;
};

function nextLabel(order: string[], byLabel: Record<string, string>): string {
  let max = 0;
  for (const key of [...order, ...Object.keys(byLabel)]) {
    const n = Number.parseInt(key, 10);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return String(max + 1);
}

function formatSourceBlock(order: string[], byLabel: Record<string, string>): string {
  return order
    .map((label) => {
      const content = (byLabel[label] ?? '').trim();
      if (!content) return `[^${label}]:`;
      const lines = content.split(/\n/);
      const first = (lines[0] ?? '').trim();
      const rest = lines
        .slice(1)
        .map((line) => line.trim())
        .filter(Boolean);
      if (!rest.length) return `[^${label}]: ${first}`;
      return `[^${label}]: ${first}\n${rest.join('\n')}`;
    })
    .join('\n\n');
}

function joinBodyAndSources(body: string, sources: string): string {
  const trimmed = body.replace(/\s+$/, '');
  if (!sources) return trimmed;
  return `${trimmed}\n\n${sources}\n`;
}

function clampRange(from: number, to: number, max: number): { from: number; to: number } {
  const a = Math.max(0, Math.min(from, max));
  const b = Math.max(a, Math.min(to, max));
  return { from: a, to: b };
}

function insertRefInBody(
  body: string,
  from: number,
  to: number,
  label: string,
): { nextBody: string; caret: number } {
  const range = clampRange(from, to, body.length);
  const ref = `[^${label}]`;
  return {
    nextBody: body.slice(0, range.from) + ref + body.slice(range.to),
    caret: range.from + ref.length,
  };
}

/** Reuse an existing source label: insert `[^N]` at the caret only. */
export function insertExistingFootnoteRef(
  markdown: string,
  from: number,
  to: number,
  label: string,
): FootnoteInsertResult {
  const { body, byLabel, order } = splitBottomSourceFootnotes(markdown);
  const { nextBody, caret } = insertRefInBody(body, from, to, label);
  return {
    next: joinBodyAndSources(nextBody, formatSourceBlock(order, byLabel)),
    caret,
    label,
  };
}

/** Allocate the next `[^N]`, insert the ref, and append a 1–2 line source. */
export function insertNewFootnote(
  markdown: string,
  from: number,
  to: number,
  line1: string,
  line2: string,
): FootnoteInsertResult {
  const { body, byLabel, order } = splitBottomSourceFootnotes(markdown);
  const label = nextLabel(order, byLabel);
  const parts = [line1.trim(), line2.trim()].filter(Boolean);
  byLabel[label] = parts.join('\n');
  if (!order.includes(label)) order.push(label);
  const { nextBody, caret } = insertRefInBody(body, from, to, label);
  return {
    next: joinBodyAndSources(nextBody, formatSourceBlock(order, byLabel)),
    caret,
    label,
  };
}

export function listExistingFootnoteEntries(markdown: string): Array<{
  label: string;
  preview: string;
}> {
  const { order, byLabel } = splitBottomSourceFootnotes(markdown);
  return order.map((label) => {
    const preview = (byLabel[label] ?? '')
      .trim()
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join(' · ');
    return { label, preview };
  });
}
