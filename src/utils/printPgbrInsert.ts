import MarkdownIt from 'markdown-it';
import { parseNoteCover, upsertNoteCoverComment } from '@/utils/noteCover/parse';
import { headingLevelsMarkdownItPlugin } from '@/utils/markdownItHeadingLevels';
import { planFrontmatterMarkdownItPlugin } from '@/utils/planFrontmatter/markdownItPlugin';
import { insertPgbrBeforeVisualLine } from '@/utils/printVisualLinePgbr';
import {
  normalizePrintVisibleText,
  visibleInlineTextFromMarkdown,
} from '@/utils/printMarkdownVisibleText';

const PG_BR_RE = /^<pgbr\s*\/?\s*>$/i;

function isFenceStart(line: string): boolean {
  return /^\s*(```+|~~~+)/.test(line);
}

export const normalizePrintHeadingText = normalizePrintVisibleText;

/** Strip common inline markdown so DOM textContent can match ATX source. */
export const visibleHeadingTextFromMarkdown = visibleInlineTextFromMarkdown;

/** Same heading pipeline as Export PDF MdPreview (levels + plan frontmatter). */
let headingLineMd: MarkdownIt | null = null;
function getHeadingLineMarkdownIt(): MarkdownIt {
  if (!headingLineMd) {
    headingLineMd = new MarkdownIt({ html: true, linkify: false });
    headingLevelsMarkdownItPlugin(headingLineMd);
    planFrontmatterMarkdownItPlugin(headingLineMd);
  }
  return headingLineMd;
}

/**
 * Source line of the heading with mdHeadingId `index` (1-based, same as md-editor-rt).
 * md-editor-rt pushes to headsRef then passes `index: headsRef.length`, so the first
 * heading is `pdf-ex-heading-1`, not `…-0`.
 */
export function findHeadingSourceLineIndex(body: string, headingIndex: number): number {
  if (!Number.isInteger(headingIndex) || headingIndex < 1) return -1;
  const tokens = getHeadingLineMarkdownIt().parse(String(body ?? ''), {});
  let i = 0;
  for (const token of tokens) {
    if (token.type !== 'heading_open' || !token.map) continue;
    i += 1;
    if (i === headingIndex) return token.map[0] ?? -1;
  }
  return -1;
}

/** Parse `pdf-ex-heading-12` → 12 (1-based mdHeadingId index). */
export function headingIndexFromElement(el: HTMLElement): number | null {
  const id = String(el.id || '');
  const match = id.match(/^pdf-ex-heading-(\d+)$/);
  if (!match?.[1]) return null;
  const n = Number(match[1]);
  return Number.isInteger(n) && n >= 1 ? n : null;
}

function collectHrLineIndexes(markdown: string): { lines: string[]; indexes: number[] } {
  const lines = String(markdown ?? '').split('\n');
  const indexes: number[] = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    if (isFenceStart(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const t = line.trim();
    if (!t) continue;
    if (/^<hr\b[^>]*\/?>$/i.test(t)) {
      indexes.push(i);
      continue;
    }
    if (/^(\*\s*){3,}$/.test(t) || /^(-\s*){3,}$/.test(t) || /^(_\s*){3,}$/.test(t)) {
      indexes.push(i);
    }
  }

  return { lines, indexes };
}

function insertPgbrBeforeSourceLine(lines: string[], lineIndex: number): string {
  let prevIdx = lineIndex - 1;
  while (prevIdx >= 0 && !(lines[prevIdx] ?? '').trim()) prevIdx -= 1;
  if (prevIdx >= 0 && PG_BR_RE.test((lines[prevIdx] ?? '').trim())) {
    return lines.join('\n');
  }
  const insertion = ['<pgbr/>', ''];
  if (lineIndex > 0 && (lines[lineIndex - 1] ?? '').trim() !== '') {
    insertion.unshift('');
  }
  const next = [...lines];
  next.splice(lineIndex, 0, ...insertion);
  return next.join('\n');
}

function applyOnBody(
  fullMarkdown: string,
  updateBody: (body: string) => { markdown: string; updated: boolean },
): { markdown: string; updated: boolean } {
  const parsed = parseNoteCover(fullMarkdown);
  const result = updateBody(parsed.body);
  if (!result.updated) return { markdown: fullMarkdown, updated: false };
  if (!parsed.cover) {
    // Keep a broken/unparsed cover comment if present.
    if (parsed.match?.[0]) {
      return {
        markdown: `${parsed.match[0]}\n${result.markdown.replace(/^\uFEFF/, '')}`,
        updated: true,
      };
    }
    return result;
  }
  return {
    markdown: upsertNoteCoverComment(result.markdown, parsed.cover),
    updated: true,
  };
}

/**
 * Insert `<pgbr/>` above a heading identified by mdHeadingId index (`pdf-ex-heading-N`,
 * 1-based) and/or visible text + occurrence.
 */
export function insertPgbrBeforeHeadingByText(
  fullMarkdown: string,
  headingText: string,
  occurrence: number,
  headingIndex?: number,
): { markdown: string; updated: boolean } {
  const needle = visibleHeadingTextFromMarkdown(headingText);
  const hasIndex = Number.isInteger(headingIndex) && headingIndex != null && headingIndex >= 1;
  if (!hasIndex && (!needle || !Number.isInteger(occurrence) || occurrence < 0)) {
    return { markdown: fullMarkdown, updated: false };
  }

  return applyOnBody(fullMarkdown, (body) => {
    let lineIndex = -1;

    if (hasIndex) {
      lineIndex = findHeadingSourceLineIndex(body, headingIndex!);
    }

    if (lineIndex < 0 && needle) {
      // Fallback: scan heading_open tokens and match visible text.
      const tokens = getHeadingLineMarkdownIt().parse(body, {});
      let seen = -1;
      for (let t = 0; t < tokens.length; t += 1) {
        const open = tokens[t];
        if (open?.type !== 'heading_open' || !open.map) continue;
        const inline = tokens[t + 1];
        const raw = inline?.type === 'inline' ? String(inline.content ?? '') : '';
        if (visibleHeadingTextFromMarkdown(raw) !== needle) continue;
        seen += 1;
        if (seen !== occurrence) continue;
        lineIndex = open.map[0] ?? -1;
        break;
      }
    }

    if (lineIndex < 0) return { markdown: body, updated: false };
    const lines = body.split('\n');
    const next = insertPgbrBeforeSourceLine(lines, lineIndex);
    // Treat "already has pgbr" as success no-op only when content identical —
    // still report updated:false so caller can tell; prefer true insert.
    return { markdown: next, updated: next !== body };
  });
}

export function insertPgbrBeforeHrInBody(
  fullMarkdown: string,
  hrIndex: number,
): { markdown: string; updated: boolean } {
  if (!Number.isInteger(hrIndex) || hrIndex < 0) {
    return { markdown: fullMarkdown, updated: false };
  }
  return applyOnBody(fullMarkdown, (body) => {
    const { lines, indexes } = collectHrLineIndexes(body);
    const lineIndex = indexes[hrIndex];
    if (!Number.isInteger(lineIndex)) return { markdown: body, updated: false };
    const next = insertPgbrBeforeSourceLine(lines, lineIndex!);
    return { markdown: next, updated: next !== body };
  });
}

export function insertPgbrBeforeVisualLineInBody(
  fullMarkdown: string,
  lineText: string,
  occurrence: number,
): { markdown: string; updated: boolean } {
  return applyOnBody(fullMarkdown, (body) =>
    insertPgbrBeforeVisualLine(body, lineText, occurrence));
}

export function removePgbrByOccurrenceInBody(
  fullMarkdown: string,
  targetOccurrence: number,
): { markdown: string; updated: boolean } {
  if (!Number.isInteger(targetOccurrence) || targetOccurrence < 0) {
    return { markdown: fullMarkdown, updated: false };
  }
  return applyOnBody(fullMarkdown, (body) => {
    const lines = body.split('\n');
    let inFence = false;
    let occurrence = -1;
    let updated = false;

    const nextLines = lines.map((line) => {
      if (isFenceStart(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      if (!/<pgbr\s*\/?\s*>/i.test(line)) return line;
      return line.replace(/<pgbr\s*\/?\s*>/gi, (m) => {
        occurrence += 1;
        if (occurrence !== targetOccurrence) return m;
        updated = true;
        return '';
      });
    });

    if (!updated) return { markdown: body, updated: false };
    return { markdown: nextLines.join('\n'), updated: true };
  });
}

/** Resolve heading identity from a preview heading element. */
export function headingTargetFromElement(
  root: HTMLElement,
  headingEl: HTMLElement,
): { text: string; occurrence: number; headingIndex: number } {
  const text = normalizePrintHeadingText(headingVisibleText(headingEl));
  const fromId = headingIndexFromElement(headingEl);
  const headings = [
    ...root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'),
  ].filter((el) => root.contains(el));
  const domIndex = headings.findIndex((el) => el === headingEl);
  // mdHeadingId index is 1-based; DOM ordinal fallback must match.
  const headingIndex = fromId ?? (domIndex < 0 ? 1 : domIndex + 1);

  let occurrence = 0;
  for (const el of headings) {
    if (el === headingEl) break;
    if (normalizePrintHeadingText(headingVisibleText(el)) === text) {
      occurrence += 1;
    }
  }
  return { text, occurrence, headingIndex };
}

function headingVisibleText(el: HTMLElement): string {
  const clone = el.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      '.md-preview-heading-fold-chevron, [aria-hidden="true"], button',
    )
    .forEach((node) => node.remove());
  return clone.textContent || '';
}
