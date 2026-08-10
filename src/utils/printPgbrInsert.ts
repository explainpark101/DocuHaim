import { parseNoteCover, upsertNoteCoverComment } from '@/utils/noteCover/parse';
import { MAX_APP_HEADING_LEVEL } from '@/utils/markdownHeadings';
import { insertPgbrBeforeVisualLine } from '@/utils/printVisualLinePgbr';

const PG_BR_RE = /^<pgbr\s*\/?\s*>$/i;
const ATX_HEADING_RE = new RegExp(`^\\s{0,3}(#{1,${MAX_APP_HEADING_LEVEL}})[ \\t]+(.*)$`);

function isFenceStart(line: string): boolean {
  return /^\s*(```+|~~~+)/.test(line);
}

export function normalizePrintHeadingText(value: string): string {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

function atxHeadingText(line: string): string | null {
  const match = line.match(ATX_HEADING_RE);
  if (!match) return null;
  let content = String(match[2] ?? '').trim();
  content = content.replace(/[ \t]+#+[ \t]*$/, '').trim();
  return content || null;
}

type HeadingTarget = { lineIndex: number; text: string };

/** Collect ATX (h1–h10) + setext heading targets from markdown body. */
export function collectBodyHeadingTargets(markdown: string): HeadingTarget[] {
  const lines = String(markdown ?? '').split('\n');
  const targets: HeadingTarget[] = [];
  let inFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    if (isFenceStart(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const atx = atxHeadingText(line);
    if (atx != null) {
      targets.push({ lineIndex: i, text: atx });
      continue;
    }

    const next = lines[i + 1] ?? '';
    if (line.trim() && /^\s{0,3}(=+|-+)\s*$/.test(next)) {
      targets.push({ lineIndex: i, text: line.trim() });
    }
  }

  return targets;
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
  if (!parsed.cover) return result;
  return {
    markdown: upsertNoteCoverComment(result.markdown, parsed.cover),
    updated: true,
  };
}

/**
 * Insert `<pgbr/>` above the heading matched by visible text + occurrence
 * within the note body (cover comment excluded from matching).
 */
export function insertPgbrBeforeHeadingByText(
  fullMarkdown: string,
  headingText: string,
  occurrence: number,
): { markdown: string; updated: boolean } {
  const needle = normalizePrintHeadingText(headingText);
  if (!needle || !Number.isInteger(occurrence) || occurrence < 0) {
    return { markdown: fullMarkdown, updated: false };
  }

  return applyOnBody(fullMarkdown, (body) => {
    const targets = collectBodyHeadingTargets(body);
    let seen = -1;
    let lineIndex = -1;
    for (const target of targets) {
      if (normalizePrintHeadingText(target.text) !== needle) continue;
      seen += 1;
      if (seen !== occurrence) continue;
      lineIndex = target.lineIndex;
      break;
    }
    if (lineIndex < 0) return { markdown: body, updated: false };
    const lines = body.split('\n');
    const next = insertPgbrBeforeSourceLine(lines, lineIndex);
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

/** Count same-text heading occurrence before `headingEl` within `root`. */
export function headingTextOccurrenceInRoot(
  root: HTMLElement,
  headingEl: HTMLElement,
): { text: string; occurrence: number } {
  const text = normalizePrintHeadingText(headingVisibleText(headingEl));
  const headings = [
    ...root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'),
  ].filter((el) => root.contains(el));
  let occurrence = 0;
  for (const el of headings) {
    if (el === headingEl) break;
    if (normalizePrintHeadingText(headingVisibleText(el)) === text) {
      occurrence += 1;
    }
  }
  return { text, occurrence };
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
