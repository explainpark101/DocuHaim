export const MAX_APP_HEADING_LEVEL = 10;
export const MAX_EXPORT_HEADING_LEVEL = 6;

export const APP_HEADING_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const EXPORT_HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

export type AppHeadingLevel = (typeof APP_HEADING_LEVELS)[number];
export type ExportHeadingLevel = (typeof EXPORT_HEADING_LEVELS)[number];

export type HeadingRemapMapping = {
  from: number;
  to: number;
};

export type HeadingRemapPlan = {
  sourceMax: number | null;
  sourceLevels: number[];
  mappings: HeadingRemapMapping[];
  shift: number;
  deepCollapsed: boolean;
};

export type HeadingEntry = {
  level: number;
  text: string;
};

export type HeadingRemapRow = {
  text: string;
  /** Title after remap (includes new outline prefix when renumbering). */
  nextText: string;
  from: number;
  to: number;
};

export type OutlineNumberStyle = 'flat' | 'nested';
export type OutlineStartNumber = 1 | 2;

export type HeadingOutlineOptions = {
  renumberOutline?: boolean;
  outlineStyle?: OutlineNumberStyle;
  outlineStart?: OutlineStartNumber;
};

export type HeadingRemapOptions = {
  sourceMax?: number | null;
  maxLevel?: number;
} & HeadingOutlineOptions;

const FENCED_BLOCK_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;
const ATX_HEADING_LINE_RE = /^(#{1,10})([ \t]+)(.*)$/gm;
const ATX_HEADING_DETECT_RE = /^(#{1,10})(?:[ \t]+|[ \t]*$)/gm;
/** Leading outline like `1.` / `2.1.` / `10.2.3.` (one or more digit-dot groups). */
const OUTLINE_PREFIX_RE = /^(?:\d+\.)+\s*/;

function mapOutsideFences(source: string, transform: (chunk: string) => string): string {
  return source
    .split(FENCED_BLOCK_RE)
    .map((part, index) => (index % 2 === 1 ? part : transform(part)))
    .join('');
}

function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function resolveMaxLevel(maxLevel: number | undefined): number {
  return clampInt(Math.round(Number(maxLevel) || MAX_EXPORT_HEADING_LEVEL), 1, MAX_APP_HEADING_LEVEL);
}

function normalizeTargetMax(targetMax: number, maxLevel: number): number {
  return clampInt(Math.round(Number(targetMax) || 1), 1, maxLevel);
}

function headingTextFromRest(rest: string): string {
  return String(rest ?? '').replace(/[ \t]+#+\s*$/, '').trim();
}

function splitClosingHashes(rest: string): { content: string; closing: string } {
  const raw = String(rest ?? '');
  const match = raw.match(/^(.*?)([ \t]+#+)[ \t]*$/);
  if (!match) return { content: raw, closing: '' };
  return { content: match[1] ?? '', closing: match[2] ?? '' };
}

export function stripHeadingOutlinePrefix(text: string): string {
  return String(text ?? '').replace(OUTLINE_PREFIX_RE, '');
}

export function formatHeadingOutline(parts: readonly number[]): string {
  if (!parts.length) return '';
  return `${parts.join('.')}. `;
}

/**
 * Assign outline prefixes for remapped heading levels (document order).
 * - flat: max heading is one segment (`1.` / `2.`); deeper levels add segments
 * - nested: segment count equals heading level (h2 → `2.1.`, h3 → `2.1.1.`, …)
 */
export function assignHeadingOutlineNumbers(
  levels: readonly number[],
  options: {
    style: OutlineNumberStyle;
    startNumber: OutlineStartNumber;
    targetMax: number;
  },
): string[] {
  const style = options.style === 'nested' ? 'nested' : 'flat';
  const startNumber: OutlineStartNumber = options.startNumber === 2 ? 2 : 1;
  const targetMax = Math.max(1, Math.round(Number(options.targetMax) || 1));
  const extraPrefix = style === 'nested' ? Math.max(0, targetMax - 1) : 0;

  const counters: number[] = [];
  if (extraPrefix === 0) {
    counters.push(startNumber - 1);
  } else {
    counters.push(startNumber);
    for (let i = 1; i < extraPrefix; i += 1) counters.push(1);
    counters.push(0);
  }

  return levels.map((level) => {
    const L = Math.max(1, Math.round(Number(level) || 1));
    const idx = Math.max(0, extraPrefix + (L - targetMax));
    while (counters.length <= idx) counters.push(0);
    counters.length = idx + 1;
    const current = counters[idx] ?? 0;
    counters[idx] = current + 1;
    return formatHeadingOutline(counters.slice(0, idx + 1));
  });
}

function resolveOutlineOptions(options?: HeadingOutlineOptions): {
  renumber: boolean;
  style: OutlineNumberStyle;
  start: OutlineStartNumber;
} {
  return {
    renumber: Boolean(options?.renumberOutline),
    style: options?.outlineStyle === 'flat' ? 'flat' : 'nested',
    start: options?.outlineStart === 2 ? 2 : 1,
  };
}

function buildNextHeadingText(
  text: string,
  outlinePrefix: string | null,
): string {
  if (outlinePrefix === null) return text;
  const body = stripHeadingOutlinePrefix(text).trim();
  return `${outlinePrefix}${body}`;
}

export function isExportHeadingLevel(value: unknown): value is ExportHeadingLevel {
  return typeof value === 'number' && EXPORT_HEADING_LEVELS.includes(value as ExportHeadingLevel);
}

export function isAppHeadingLevel(value: unknown): value is AppHeadingLevel {
  return typeof value === 'number' && APP_HEADING_LEVELS.includes(value as AppHeadingLevel);
}

/** Unique ATX heading levels, largest first (h1-closest → h10). */
export function detectHeadingLevels(markdown: string): number[] {
  const levels = new Set<number>();
  mapOutsideFences(String(markdown ?? ''), (chunk) => {
    ATX_HEADING_DETECT_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = ATX_HEADING_DETECT_RE.exec(chunk)) !== null) {
      const level = match[1]?.length ?? 0;
      if (level >= 1) levels.add(level);
    }
    return chunk;
  });
  return [...levels].sort((a, b) => a - b);
}

export function detectHeadingEntries(markdown: string): HeadingEntry[] {
  const entries: HeadingEntry[] = [];
  mapOutsideFences(String(markdown ?? ''), (chunk) => {
    ATX_HEADING_LINE_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = ATX_HEADING_LINE_RE.exec(chunk)) !== null) {
      const level = match[1]?.length ?? 0;
      if (level < 1) continue;
      entries.push({ level, text: headingTextFromRest(match[3] ?? '') });
    }
    return chunk;
  });
  return entries;
}

/** Largest heading in the document (closest to h1). */
export function detectMaxHeadingLevel(markdown: string): number | null {
  return detectHeadingLevels(markdown)[0] ?? null;
}

export function defaultExportHeadingMax(markdown: string): ExportHeadingLevel {
  const detected = detectMaxHeadingLevel(markdown);
  if (!detected) return 1;
  return clampInt(detected, 1, MAX_EXPORT_HEADING_LEVEL) as ExportHeadingLevel;
}

export function defaultAppHeadingMax(markdown: string): AppHeadingLevel {
  const detected = detectMaxHeadingLevel(markdown);
  if (!detected) return 1;
  return clampInt(detected, 1, MAX_APP_HEADING_LEVEL) as AppHeadingLevel;
}

export function planHeadingRemap(
  sourceLevels: readonly number[],
  targetMax: number,
  options?: { maxLevel?: number },
): HeadingRemapPlan {
  const maxLevel = resolveMaxLevel(options?.maxLevel);
  const levels = [...new Set(sourceLevels.filter((level) => level >= 1))].sort((a, b) => a - b);
  const sourceMax = levels[0] ?? null;
  const target = normalizeTargetMax(targetMax, maxLevel);
  if (sourceMax === null) {
    return { sourceMax: null, sourceLevels: [], mappings: [], shift: 0, deepCollapsed: false };
  }

  const shift = target - sourceMax;
  const deepCollapsed = levels.some((level) => level > maxLevel);
  const mappings = levels.map((level) => ({
    from: level,
    to: clampInt(level + shift, 1, maxLevel),
  }));

  return { sourceMax, sourceLevels: levels, mappings, shift, deepCollapsed };
}

export function planHeadingRemapRows(
  markdown: string,
  targetMax: number,
  options?: { maxLevel?: number } & HeadingOutlineOptions,
): {
  sourceMax: number | null;
  rows: HeadingRemapRow[];
  shift: number;
} {
  const maxLevel = resolveMaxLevel(options?.maxLevel);
  const outline = resolveOutlineOptions(options);
  const entries = detectHeadingEntries(markdown);
  const sourceMax = entries.reduce<number | null>((min, entry) => (
    min === null || entry.level < min ? entry.level : min
  ), null);
  if (sourceMax === null) {
    return { sourceMax: null, rows: [], shift: 0 };
  }

  const target = normalizeTargetMax(targetMax, maxLevel);
  const shift = target - sourceMax;
  const toLevels = entries.map((entry) => clampInt(entry.level + shift, 1, maxLevel));
  const prefixes = outline.renumber
    ? assignHeadingOutlineNumbers(toLevels, {
      style: outline.style,
      startNumber: outline.start,
      targetMax: target,
    })
    : null;

  return {
    sourceMax,
    shift,
    rows: entries.map((entry, index) => {
      const to = toLevels[index] ?? entry.level;
      const text = entry.text;
      const nextText = buildNextHeadingText(text, prefixes?.[index] ?? null);
      return { text, nextText, from: entry.level, to };
    }),
  };
}

export function remapMarkdownHeadingLevels(
  markdown: string,
  targetMax: number,
  options?: HeadingRemapOptions,
): string {
  const source = String(markdown ?? '');
  const maxLevel = resolveMaxLevel(options?.maxLevel);
  const outline = resolveOutlineOptions(options);
  const sourceMax = options && 'sourceMax' in options
    ? options.sourceMax ?? null
    : detectMaxHeadingLevel(source);
  const target = normalizeTargetMax(targetMax, maxLevel);
  if (!sourceMax) return source;

  const shift = target - sourceMax;
  if (!outline.renumber && shift === 0 && sourceMax <= maxLevel) {
    const hasDeeper = detectHeadingLevels(source).some((level) => level > maxLevel);
    if (!hasDeeper) return source;
  }

  const toLevels: number[] = [];
  mapOutsideFences(source, (chunk) => {
    ATX_HEADING_LINE_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = ATX_HEADING_LINE_RE.exec(chunk)) !== null) {
      const level = match[1]?.length ?? 0;
      if (level < 1) continue;
      toLevels.push(clampInt(level + shift, 1, maxLevel));
    }
    return chunk;
  });

  const prefixes = outline.renumber
    ? assignHeadingOutlineNumbers(toLevels, {
      style: outline.style,
      startNumber: outline.start,
      targetMax: target,
    })
    : null;

  let headingIndex = 0;
  return mapOutsideFences(source, (chunk) => {
    ATX_HEADING_LINE_RE.lastIndex = 0;
    return chunk.replace(ATX_HEADING_LINE_RE, (_full, hashes: string, space: string, rest: string) => {
      const next = clampInt(hashes.length + shift, 1, maxLevel);
      const index = headingIndex;
      headingIndex += 1;
      if (!prefixes) {
        return `${'#'.repeat(next)}${space}${rest}`;
      }
      const { content, closing } = splitClosingHashes(rest);
      const display = headingTextFromRest(content);
      const nextText = buildNextHeadingText(display, prefixes[index] ?? null);
      return `${'#'.repeat(next)}${space}${nextText}${closing}`;
    });
  });
}

export function describeHeadingRemap(
  sourceLevels: readonly number[] | number | null,
  targetMax: number,
  options?: { maxLevel?: number },
): string {
  const levels = Array.isArray(sourceLevels)
    ? sourceLevels
    : typeof sourceLevels === 'number'
      ? [sourceLevels]
      : [];
  const plan = planHeadingRemap(levels, targetMax, options);
  if (!plan.sourceMax) return '문서에 heading이 없습니다.';

  const maxLevel = resolveMaxLevel(options?.maxLevel);
  const mapped = plan.mappings.map((item) => `h${item.from}→h${item.to}`);
  const deepNote = plan.deepCollapsed
    ? ` h${maxLevel + 1} 이상은 내보낼 때 h${maxLevel} 이하로 맞춥니다.`
    : '';
  return `${mapped.join(', ')}.${deepNote}`;
}
