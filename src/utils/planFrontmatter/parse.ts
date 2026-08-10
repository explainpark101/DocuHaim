import { load as yamlLoad } from 'js-yaml';

/** Normalized todo status for plan frontmatter UI. */
export type PlanTodoStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'error';

export type PlanTodo = {
  id: string;
  content: string;
  status: PlanTodoStatus;
};

export type PlanFrontmatter = {
  name: string;
  overview: string;
  todos: PlanTodo[];
  isProject: boolean;
};

const FRONTMATTER_OPEN_RE = /^---[ \t]*\r?\n/;

/**
 * Match leading YAML frontmatter fence (`---` … `---`).
 * Returns yaml body + byte offset where markdown body starts, or null.
 */
export function extractLeadingYamlFrontmatter(src: string): { yaml: string; bodyOffset: number } | null {
  const text = String(src ?? '');
  if (!FRONTMATTER_OPEN_RE.test(text)) return null;

  const afterOpen = text.replace(FRONTMATTER_OPEN_RE, '');
  const closeMatch = afterOpen.match(/\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!closeMatch || closeMatch.index == null) return null;

  const yaml = afterOpen.slice(0, closeMatch.index);
  const bodyOffset = text.length - afterOpen.length + closeMatch.index + closeMatch[0].length;
  return { yaml, bodyOffset };
}

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

/**
 * Map Cursor / marketplace aliases onto a single status enum.
 * Accepts `in-progress` and `in_progress`, `canceled` / `cancelled`.
 */
export function normalizePlanTodoStatus(raw: unknown): PlanTodoStatus {
  const s = String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  if (s === 'completed' || s === 'complete' || s === 'done') return 'completed';
  if (s === 'in-progress' || s === 'inprogress' || s === 'progress') return 'in_progress';
  if (s === 'cancelled' || s === 'canceled') return 'cancelled';
  if (s === 'error' || s === 'failed' || s === 'fail') return 'error';
  return 'pending';
}

function normalizeTodo(raw: unknown, index: number): PlanTodo | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  const content = asNonEmptyString(row.content) ?? asNonEmptyString(row.title);
  if (!content) return null;
  const id = asNonEmptyString(row.id) ?? `todo-${index + 1}`;
  return {
    id,
    content,
    status: normalizePlanTodoStatus(row.status),
  };
}

/**
 * True when YAML object looks like a Cursor-style `*.plan.md` frontmatter.
 * Requires a `todos` array (may be empty). `name` optional.
 */
export type PlanFrontmatterObject = {
  todos: unknown[];
  name?: unknown;
  title?: unknown;
  overview?: unknown;
  description?: unknown;
  isProject?: unknown;
  is_project?: unknown;
};

export function isPlanFrontmatterObject(value: unknown): value is PlanFrontmatterObject {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  if (!Array.isArray(obj.todos)) return false;
  // Reject accidental bare frontmatter that only lists unrelated keys without plan shape.
  if (obj.name != null && typeof obj.name !== 'string' && typeof obj.name !== 'number') return false;
  return true;
}

/**
 * Parse YAML text into a normalized plan, or null if not plan-shaped / invalid.
 */
export function parsePlanFrontmatterYaml(yamlText: string): PlanFrontmatter | null {
  let loaded: unknown;
  try {
    loaded = yamlLoad(String(yamlText ?? ''));
  } catch {
    return null;
  }
  if (!isPlanFrontmatterObject(loaded)) return null;

  const todos: PlanTodo[] = [];
  for (let i = 0; i < loaded.todos.length; i += 1) {
    const todo = normalizeTodo(loaded.todos[i], i);
    if (todo) todos.push(todo);
  }

  const name =
    asNonEmptyString(loaded.name)
    ?? asNonEmptyString(loaded.title)
    ?? 'Plan';
  const overview = asNonEmptyString(loaded.overview) ?? asNonEmptyString(loaded.description) ?? '';
  const isProject = loaded.isProject === true || loaded.is_project === true;

  return { name, overview, todos, isProject };
}

/**
 * Parse leading plan frontmatter from a full markdown source.
 * Returns plan + body markdown, or null when absent / not a plan.
 */
export function parseLeadingPlanFrontmatter(src: string): { plan: PlanFrontmatter; body: string } | null {
  const extracted = extractLeadingYamlFrontmatter(src);
  if (!extracted) return null;
  const plan = parsePlanFrontmatterYaml(extracted.yaml);
  if (!plan) return null;
  return { plan, body: String(src).slice(extracted.bodyOffset) };
}
