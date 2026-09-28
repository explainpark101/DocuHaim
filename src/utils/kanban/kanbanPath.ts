/** Detect `*.kanban.json` vault board paths. */

export const KANBAN_JSON_EXTENSION = '.kanban.json';

export function isKanbanJsonPath(path: string | null | undefined): boolean {
  const p = String(path || '')
    .trim()
    .toLowerCase()
    .replace(/\\/g, '/');
  return p.endsWith(KANBAN_JSON_EXTENSION);
}

export function kanbanBasename(path: string | null | undefined): string {
  const raw = String(path || '').replace(/\\/g, '/');
  const parts = raw.split('/').filter(Boolean);
  return parts[parts.length - 1] || raw;
}
