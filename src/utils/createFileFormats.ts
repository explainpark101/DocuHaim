/**
 * Registry of vault note formats offered in CreateItemModal.
 * Add new createable extensions here — the modal maps this list into badges.
 * See `.cursor/rules/create-file-formats.mdc`.
 */

export type CreateFileFormat = {
  id: string;
  /** Full extension including leading dot; longest match wins. */
  extension: string;
  /** Badge label (usually same as extension). */
  label: string;
  /** Short KO description under the badge row. */
  description: string;
  /** Default selection when the modal opens. */
  default?: boolean;
};

export const CREATE_FILE_FORMATS: CreateFileFormat[] = [
  {
    id: 'md',
    extension: '.md',
    label: '.md',
    description: '일반 마크다운',
    default: true,
  },
  {
    id: 'quiz.md',
    extension: '.quiz.md',
    label: '.quiz.md',
    description: '퀴즈 / 문제 풀이 노트',
  },
  {
    id: 'enc.md',
    extension: '.enc.md',
    label: '.enc.md',
    description: '비밀번호로 암호화된 마크다운',
  },
];

/** Formats sorted by extension length descending (`.enc.md` before `.md`). */
export function createFileFormatsLongestFirst(): CreateFileFormat[] {
  return [...CREATE_FILE_FORMATS].sort(
    (a, b) => b.extension.length - a.extension.length,
  );
}

/**
 * Intermediate suffixes of composite `*.md` formats (e.g. `.enc` from `.enc.md`).
 * Longest first — typing `note.enc` should complete to `.enc.md`, not `.enc.enc.md`.
 */
export function createFileIntermediateSuffixes(): Array<{
  mid: string;
  format: CreateFileFormat;
}> {
  const out: Array<{ mid: string; format: CreateFileFormat }> = [];
  for (const fmt of CREATE_FILE_FORMATS) {
    const ext = fmt.extension.toLowerCase();
    if (ext === '.md' || !ext.endsWith('.md')) continue;
    const mid = ext.slice(0, -'.md'.length);
    if (mid.startsWith('.') && mid.length > 1) {
      out.push({ mid, format: fmt });
    }
  }
  return out.sort((a, b) => b.mid.length - a.mid.length);
}

export function defaultCreateFileFormat(): CreateFileFormat {
  return (
    CREATE_FILE_FORMATS.find((f) => f.default) ||
    CREATE_FILE_FORMATS[0] ||
    {
      id: 'md',
      extension: '.md',
      label: '.md',
      description: '일반 마크다운',
      default: true,
    }
  );
}

export function getCreateFileFormatById(
  id: string | null | undefined,
): CreateFileFormat | null {
  const key = String(id || '').trim();
  if (!key) return null;
  return CREATE_FILE_FORMATS.find((f) => f.id === key) || null;
}

/**
 * Detect format from a file base name (longest extension match).
 * Also recognizes partial composite suffixes (`.enc`, `.quiz`).
 * Falls back to default when no registry extension matches.
 */
export function detectCreateFileFormat(
  baseName: string | null | undefined,
): CreateFileFormat {
  const lower = String(baseName || '').trim().toLowerCase();
  for (const fmt of createFileFormatsLongestFirst()) {
    if (lower.endsWith(fmt.extension.toLowerCase())) return fmt;
  }
  for (const { mid, format } of createFileIntermediateSuffixes()) {
    if (lower.endsWith(mid)) return format;
  }
  return defaultCreateFileFormat();
}

/**
 * Strip any registered create-file extension (or composite intermediate like
 * `.enc` / `.quiz`) from the end of a base name.
 */
export function stripCreateFileExtension(baseName: string): string {
  const raw = String(baseName || '');
  const lower = raw.toLowerCase();
  for (const fmt of createFileFormatsLongestFirst()) {
    const ext = fmt.extension.toLowerCase();
    if (lower.endsWith(ext)) return raw.slice(0, raw.length - ext.length);
  }
  for (const { mid } of createFileIntermediateSuffixes()) {
    if (lower.endsWith(mid)) return raw.slice(0, raw.length - mid.length);
  }
  return raw;
}

/**
 * Apply a format to a create-path input (preserves directory stem).
 * Empty input → empty (caller shows empty preview).
 */
export function applyCreateFileFormat(
  nameInput: string,
  formatId: string,
): string {
  const fmt = getCreateFileFormatById(formatId) || defaultCreateFileFormat();
  const raw = String(nameInput ?? '').replace(/\\/g, '/');
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const lastSlash = trimmed.lastIndexOf('/');
  const dir = lastSlash >= 0 ? trimmed.slice(0, lastSlash + 1) : '';
  const base = lastSlash >= 0 ? trimmed.slice(lastSlash + 1) : trimmed;
  if (!base || base === '.' || base === '..') {
    return trimmed;
  }
  const stem = stripCreateFileExtension(base);
  const nextBase = stem ? `${stem}${fmt.extension}` : fmt.extension.slice(1);
  return `${dir}${nextBase}`;
}

/**
 * Ensure a file base name ends with the given format (or detected / default).
 * Used by `resolveCreateItemPath`.
 * Completes partial composites (`note.enc` → `note.enc.md`) before appending.
 */
export function ensureCreateFileExtension(
  baseName: string,
  formatId?: string | null,
): string {
  const raw = String(baseName || '');
  if (!raw) return raw;
  const lower = raw.toLowerCase();
  for (const fmt of createFileFormatsLongestFirst()) {
    if (lower.endsWith(fmt.extension.toLowerCase())) return raw;
  }
  // User typed `.enc` / `.quiz` — complete to the matching composite format.
  for (const { mid, format } of createFileIntermediateSuffixes()) {
    if (lower.endsWith(mid)) {
      return `${raw.slice(0, raw.length - mid.length)}${format.extension}`;
    }
  }
  const fmt =
    getCreateFileFormatById(formatId) || defaultCreateFileFormat();
  return `${stripCreateFileExtension(raw)}${fmt.extension}`;
}
