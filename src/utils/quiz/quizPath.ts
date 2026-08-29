/** Detect `*.quiz.md` vault note paths. */

export const QUIZ_MD_EXTENSION = '.quiz.md';

export function isQuizMdPath(path: string | null | undefined): boolean {
  const p = String(path || '').trim().toLowerCase().replace(/\\/g, '/');
  return p.endsWith(QUIZ_MD_EXTENSION);
}

export function quizBasename(path: string | null | undefined): string {
  const raw = String(path || '').replace(/\\/g, '/');
  const parts = raw.split('/').filter(Boolean);
  return parts[parts.length - 1] || raw;
}
