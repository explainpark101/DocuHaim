import type { PlanFrontmatter, PlanTodo, PlanTodoStatus } from './parse';

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const STATUS_LABEL: Record<PlanTodoStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  error: 'Error',
};

function todoItemHtml(todo: PlanTodo): string {
  const status = todo.status;
  const label = STATUS_LABEL[status];
  return [
    `<li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--${status}" data-status="${status}">`,
    `<span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--${status}" aria-hidden="true"></span>`,
    `<span class="md-plan-frontmatter__todo-body">`,
    `<span class="md-plan-frontmatter__todo-content">${escapeHtml(todo.content)}</span>`,
    `<span class="md-plan-frontmatter__status-label">${escapeHtml(label)}</span>`,
    `</span>`,
    `</li>`,
  ].join('');
}

/**
 * Canonical HTML for a Cursor-style plan frontmatter card (preview + print).
 */
export function buildPlanFrontmatterHtml(plan: PlanFrontmatter): string {
  const completed = plan.todos.filter((t) => t.status === 'completed').length;
  const total = plan.todos.length;
  const progressLabel = total > 0 ? `${completed}/${total}` : '0/0';

  const badge = plan.isProject
    ? '<span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>'
    : '';

  const overview = plan.overview
    ? `<p class="md-plan-frontmatter__overview">${escapeHtml(plan.overview)}</p>`
    : '';

  const todos = plan.todos.length
    ? [
        '<ul class="md-plan-frontmatter__todos">',
        ...plan.todos.map(todoItemHtml),
        '</ul>',
      ].join('')
    : '<p class="md-plan-frontmatter__empty">No todos</p>';

  return [
    '<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">',
    '<div class="md-plan-frontmatter__header">',
    // div (not h2): avoid preview heading-fold / print TOC treating the plan title as a section heading
    `<div class="md-plan-frontmatter__name" role="heading" aria-level="2">${escapeHtml(plan.name)}</div>`,
    '<div class="md-plan-frontmatter__meta">',
    badge,
    `<span class="md-plan-frontmatter__progress" data-md-plan-progress="1">${escapeHtml(progressLabel)}</span>`,
    '</div>',
    '</div>',
    overview,
    todos,
    '</div>',
  ].join('');
}
