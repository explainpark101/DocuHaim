import { fuzzyMatchText } from '@/utils/advancedSearch/fuzzyMatch';

export type ContentSearchLine = {
  lineNumber: number;
  text: string;
  isMatch: boolean;
};

export type ContentSearchRegion = {
  startLine: number;
  endLine: number;
  lines: ContentSearchLine[];
};

export type ContentSearchFileHit = {
  docId: string;
  kind: 'file' | 'chat';
  path: string;
  title: string;
  matchCount: number;
  regions: ContentSearchRegion[];
  score: number;
  dateStr?: string;
  messageId?: string;
  group?: string;
};

const DEFAULT_CONTEXT_LINES = 2;
const DEFAULT_MAX_REGIONS = 8;

export function lineMatchesQuery(line: string, terms: string[], rawQuery: string): boolean {
  const text = String(line || '');
  if (terms.length > 0) {
    const lower = text.toLowerCase();
    return terms.every((t) => lower.includes(String(t || '').toLowerCase()));
  }
  return fuzzyMatchText(text, rawQuery);
}

export function extractMatchRegions(
  text: string,
  terms: string[],
  rawQuery: string,
  opts?: { contextLines?: number; maxRegions?: number },
): { regions: ContentSearchRegion[]; matchCount: number } {
  const contextLines = opts?.contextLines ?? DEFAULT_CONTEXT_LINES;
  const maxRegions = opts?.maxRegions ?? DEFAULT_MAX_REGIONS;
  const raw = String(text ?? '');
  if (!raw.trim()) return { regions: [], matchCount: 0 };

  const lines = raw.split('\n');
  const matchIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lineMatchesQuery(lines[i] ?? '', terms, rawQuery)) {
      matchIndices.push(i);
    }
  }
  if (matchIndices.length === 0) return { regions: [], matchCount: 0 };

  type Range = { start: number; end: number };
  const ranges: Range[] = [];
  for (const idx of matchIndices) {
    const start = Math.max(0, idx - contextLines);
    const end = Math.min(lines.length - 1, idx + contextLines);
    const last = ranges[ranges.length - 1];
    if (last && start <= last.end + 1) {
      last.end = Math.max(last.end, end);
    } else {
      ranges.push({ start, end });
    }
  }

  const regions: ContentSearchRegion[] = ranges.slice(0, maxRegions).map((r) => {
    const regionLines: ContentSearchLine[] = [];
    for (let i = r.start; i <= r.end; i++) {
      const lineText = lines[i] ?? '';
      regionLines.push({
        lineNumber: i + 1,
        text: lineText,
        isMatch: lineMatchesQuery(lineText, terms, rawQuery),
      });
    }
    return {
      startLine: r.start + 1,
      endLine: r.end + 1,
      lines: regionLines,
    };
  });

  return { regions, matchCount: matchIndices.length };
}

export function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Highlight query tokens inside plain text (used after HTML escape). */
export function highlightPlainText(text: string, terms: string[], rawQuery: string): string {
  let out = escapeHtml(text);
  const tokens = [
    ...new Set(
      [
        ...terms.map((t) => String(t || '').trim()).filter(Boolean),
        ...String(rawQuery || '')
          .trim()
          .split(/\s+/)
          .filter(Boolean),
      ].sort((a, b) => b.length - a.length),
    ),
  ];
  for (const token of tokens) {
    const re = new RegExp(`(${escapeRegExp(token)})`, 'gi');
    out = out.replace(
      re,
      '<mark class="rounded-sm bg-amber-200/90 px-0.5 text-inherit dark:bg-amber-500/40">$1</mark>',
    );
  }
  return out;
}
