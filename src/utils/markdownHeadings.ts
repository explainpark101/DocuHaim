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
  from: number;
  to: number;
};

export type HeadingRemapOptions = {
  sourceMax?: number | null;
  maxLevel?: number;
};

const FENCED_BLOCK_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;
const ATX_HEADING_LINE_RE = /^(#{1,10})([ \t]+)(.*)$/gm;
const ATX_HEADING_DETECT_RE = /^(#{1,10})(?:[ \t]+|[ \t]*$)/gm;

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
  options?: { maxLevel?: number },
): {
  sourceMax: number | null;
  rows: HeadingRemapRow[];
  shift: number;
} {
  const maxLevel = resolveMaxLevel(options?.maxLevel);
  const entries = detectHeadingEntries(markdown);
  const sourceMax = entries.reduce<number | null>((min, entry) => (
    min === null || entry.level < min ? entry.level : min
  ), null);
  if (sourceMax === null) {
    return { sourceMax: null, rows: [], shift: 0 };
  }

  const target = normalizeTargetMax(targetMax, maxLevel);
  const shift = target - sourceMax;
  return {
    sourceMax,
    shift,
    rows: entries.map((entry) => ({
      text: entry.text,
      from: entry.level,
      to: clampInt(entry.level + shift, 1, maxLevel),
    })),
  };
}

export function remapMarkdownHeadingLevels(
  markdown: string,
  targetMax: number,
  options?: HeadingRemapOptions,
): string {
  const source = String(markdown ?? '');
  const maxLevel = resolveMaxLevel(options?.maxLevel);
  const sourceMax = options && 'sourceMax' in options
    ? options.sourceMax ?? null
    : detectMaxHeadingLevel(source);
  const target = normalizeTargetMax(targetMax, maxLevel);
  if (!sourceMax) return source;

  const shift = target - sourceMax;
  if (shift === 0 && sourceMax <= maxLevel) {
    const hasDeeper = detectHeadingLevels(source).some((level) => level > maxLevel);
    if (!hasDeeper) return source;
  }

  return mapOutsideFences(source, (chunk) => {
    ATX_HEADING_LINE_RE.lastIndex = 0;
    return chunk.replace(ATX_HEADING_LINE_RE, (_full, hashes: string, space: string, rest: string) => {
      const next = clampInt(hashes.length + shift, 1, maxLevel);
      return `${'#'.repeat(next)}${space}${rest}`;
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
