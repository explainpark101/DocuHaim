export const MAX_APP_HEADING_LEVEL = 10;
export const MAX_EXPORT_HEADING_LEVEL = 6;

export const APP_HEADING_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const EXPORT_HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

export type AppHeadingLevel = (typeof APP_HEADING_LEVELS)[number];
export type ExportHeadingLevel = (typeof EXPORT_HEADING_LEVELS)[number];

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

export function isExportHeadingLevel(value: unknown): value is ExportHeadingLevel {
  return typeof value === 'number' && EXPORT_HEADING_LEVELS.includes(value as ExportHeadingLevel);
}

export function detectMaxHeadingLevel(markdown: string): number | null {
  let max: number | null = null;
  mapOutsideFences(String(markdown ?? ''), (chunk) => {
    ATX_HEADING_DETECT_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = ATX_HEADING_DETECT_RE.exec(chunk)) !== null) {
      const level = match[1]?.length ?? 0;
      if (level < 1) continue;
      if (max === null || level > max) max = level;
    }
    return chunk;
  });
  return max;
}

export function defaultExportHeadingMax(markdown: string): ExportHeadingLevel {
  const detected = detectMaxHeadingLevel(markdown);
  if (!detected) return 1;
  return clampInt(detected, 1, MAX_EXPORT_HEADING_LEVEL) as ExportHeadingLevel;
}

export function remapMarkdownHeadingLevels(
  markdown: string,
  targetMax: number,
  sourceMax: number | null = detectMaxHeadingLevel(markdown),
): string {
  const source = String(markdown ?? '');
  const target = clampInt(Math.round(Number(targetMax) || 1), 1, MAX_EXPORT_HEADING_LEVEL);
  if (!sourceMax) return source;

  const effectiveSource = clampInt(sourceMax, 1, MAX_EXPORT_HEADING_LEVEL);
  const shift = target - effectiveSource;
  if (shift === 0 && sourceMax <= MAX_EXPORT_HEADING_LEVEL) return source;

  return mapOutsideFences(source, (chunk) => {
    ATX_HEADING_LINE_RE.lastIndex = 0;
    return chunk.replace(ATX_HEADING_LINE_RE, (_full, hashes: string, space: string, rest: string) => {
      const collapsed = Math.min(hashes.length, MAX_EXPORT_HEADING_LEVEL);
      const next = clampInt(collapsed + shift, 1, MAX_EXPORT_HEADING_LEVEL);
      return `${'#'.repeat(next)}${space}${rest}`;
    });
  });
}

export function describeHeadingRemap(sourceMax: number | null, targetMax: number): string {
  if (!sourceMax) return '문서에 heading이 없습니다.';
  const target = clampInt(targetMax, 1, MAX_EXPORT_HEADING_LEVEL);
  const effectiveSource = clampInt(sourceMax, 1, MAX_EXPORT_HEADING_LEVEL);
  const shift = target - effectiveSource;
  const levels = Array.from({ length: effectiveSource }, (_, index) => index + 1);
  const mapped = levels.map((level) => {
    const next = clampInt(level + shift, 1, MAX_EXPORT_HEADING_LEVEL);
    return `h${level}→h${next}`;
  });
  const deepNote =
    sourceMax > MAX_EXPORT_HEADING_LEVEL
      ? ` h${MAX_EXPORT_HEADING_LEVEL + 1}–h${sourceMax}는 h${MAX_EXPORT_HEADING_LEVEL}으로 맞춘 뒤 이동합니다.`
      : '';
  return `${mapped.join(', ')}.${deepNote}`;
}
