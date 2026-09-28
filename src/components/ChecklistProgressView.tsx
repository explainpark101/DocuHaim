import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleDot,
  LayoutDashboard,
  ListTodo,
  PieChart,
  Search,
} from 'lucide-react';
import {
  advanceTaskCheckboxStatus,
  parseTaskCheckboxMarker,
  serializeTaskCheckboxMarkerForKind,
  type TaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';
import { resolveDocumentTaskCheckbox } from '@/utils/documentSettingsMeta';

type ChecklistTask = {
  id: string;
  lineIndex: number;
  indent: number;
  completed: boolean;
  status: TaskCheckboxStatus;
  text: string;
  rawLine: string;
};

type ChecklistCategory = {
  name: string;
  tasks: ChecklistTask[];
};

type ParsedChecklist = {
  categories: ChecklistCategory[];
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  percentage: number;
};

type StatusFilter = 'all' | 'completed' | 'pending';
type ActiveTab = 'dashboard' | 'checklist';

export type ChecklistProgressViewProps = {
  markdown?: string | undefined;
  onMarkdownChange?: ((next: string) => void) | undefined;
};

function parseChecklistMarkdown(markdown: string): ParsedChecklist {
  const lines = String(markdown ?? '').split('\n');
  const categories: ChecklistCategory[] = [];
  let currentCategory: ChecklistCategory = { name: '일반 / 미분류', tasks: [] };
  let totalTasksCount = 0;
  let completedTasksCount = 0;

  lines.forEach((line, lineIndex) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headerMatch) {
      if (
        currentCategory.tasks.length > 0 ||
        currentCategory.name !== '일반 / 미분류'
      ) {
        categories.push(currentCategory);
      }
      currentCategory = {
        name: (headerMatch[2] ?? '').trim(),
        tasks: [],
      };
      return;
    }

    const taskMatch = line.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX~])\]\s+(.*)/);
    if (taskMatch) {
      const indentLevel = Math.floor((taskMatch[1]?.length ?? 0) / 2);
      const status = parseTaskCheckboxMarker(taskMatch[3]);
      const isCompleted = status === 'done';
      const taskText = (taskMatch[4] ?? '').trim();

      totalTasksCount += 1;
      if (isCompleted) completedTasksCount += 1;

      currentCategory.tasks.push({
        id: `line-${lineIndex}`,
        lineIndex,
        indent: indentLevel,
        completed: isCompleted,
        status,
        text: taskText,
        rawLine: line,
      });
    }
  });

  if (currentCategory.tasks.length > 0) {
    categories.push(currentCategory);
  }

  const percentage =
    totalTasksCount > 0
      ? Math.round((completedTasksCount / totalTasksCount) * 100)
      : 0;

  return {
    categories,
    totalTasks: totalTasksCount,
    completedTasks: completedTasksCount,
    pendingTasks: totalTasksCount - completedTasksCount,
    percentage,
  };
}

function toggleTaskLine(markdown: string, lineIndex: number): string {
  const lines = String(markdown ?? '').split('\n');
  if (lineIndex < 0 || lineIndex >= lines.length) return markdown;
  const line = lines[lineIndex] ?? '';
  const match = line.match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!match) return markdown;
  const preferred = resolveDocumentTaskCheckbox(markdown);
  const next = serializeTaskCheckboxMarkerForKind(
    advanceTaskCheckboxStatus(parseTaskCheckboxMarker(match[2]), preferred),
    preferred,
  );
  lines[lineIndex] = `${match[1]}[${next}]${match[3] ?? ''}`;
  return lines.join('\n');
}

/**
 * Compact checklist progress dashboard.
 * Summary cards: 2×2 when narrow, 1×4 when the container is wide enough.
 */
export default function ChecklistProgressView({
  markdown = '',
  onMarkdownChange,
}: ChecklistProgressViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const parsedData = useMemo(() => parseChecklistMarkdown(markdown), [markdown]);

  const categoryNamesKey = useMemo(
    () => parsedData.categories.map((c) => c.name).join('\0'),
    [parsedData.categories],
  );

  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    for (const name of categoryNamesKey ? categoryNamesKey.split('\0') : []) {
      if (name) initialExpanded[name] = true;
    }
    setExpandedCategories(initialExpanded);
  }, [categoryNamesKey]);

  const toggleTask = (lineIndex: number) => {
    if (typeof onMarkdownChange !== 'function') return;
    onMarkdownChange(toggleTaskLine(markdown, lineIndex));
  };

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const filterTask = (task: ChecklistTask) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'completed'
          ? task.completed
          : !task.completed;
    return matchesSearch && matchesStatus;
  };

  return (
    <div className="@container space-y-3 text-xs text-slate-100">
      {/*
        Narrow container → 2×2 grid.
        Wide enough (≥380px) → 1×4 row.
      */}
      <div className="grid grid-cols-2 gap-2 @[380px]:grid-cols-4">
        <div className="relative min-h-19 overflow-hidden rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3">
          <div className="pointer-events-none absolute -right-2 -top-2 opacity-10">
            <PieChart className="h-14 w-14 text-indigo-400 @[380px]:h-16 @[380px]:w-16" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
            전체 진행률
          </span>
          <div className="my-1 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white @[380px]:text-3xl">
              {parsedData.percentage}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${parsedData.percentage}%` }}
            />
          </div>
        </div>

        <div className="flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-medium">총 태스크</span>
            <ListTodo className="h-3.5 w-3.5 text-slate-500" />
          </div>
          <div className="mt-1 text-xl font-bold text-slate-100">
            {parsedData.totalTasks}{' '}
            <span className="text-[10px] font-normal text-slate-500">개</span>
          </div>
        </div>

        <div className="flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[10px] font-medium">완료됨</span>
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <div className="mt-1 text-xl font-bold text-emerald-400">
            {parsedData.completedTasks}{' '}
            <span className="text-[10px] font-normal text-slate-500">개</span>
          </div>
        </div>

        <div className="flex min-h-19 flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-medium">진행 예정</span>
            <Circle className="h-3.5 w-3.5" />
          </div>
          <div className="mt-1 text-xl font-bold text-amber-400">
            {parsedData.pendingTasks}{' '}
            <span className="text-[10px] font-normal text-slate-500">개</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
          <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="h-3 w-3" />
              <span>카테고리</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                activeTab === 'checklist'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListTodo className="h-3 w-3" />
              <span>체크리스트</span>
            </button>
          </div>

          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5">
            <div className="relative min-w-30 flex-1">
              <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="검색..."
                className="w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
              className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">전체</option>
              <option value="completed">완료만</option>
              <option value="pending">미완료만</option>
            </select>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5">
            {parsedData.categories.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <BarChart3 className="mx-auto mb-2 h-8 w-8 opacity-40" />
                <p>체크리스트 항목을 찾을 수 없습니다.</p>
                <code className="mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400">
                  - [ ] 할 일
                </code>
              </div>
            ) : (
              parsedData.categories.map((cat, idx) => {
                const catTotal = cat.tasks.length;
                const catDone = cat.tasks.filter((t) => t.completed).length;
                const catPercent =
                  catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
                const isExpanded = Boolean(expandedCategories[cat.name]);
                const filteredTasks = cat.tasks.filter(filterTask);
                if (searchQuery && filteredTasks.length === 0) return null;

                return (
                  <div
                    key={`${cat.name}-${idx}`}
                    className="overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.name)}
                      className="flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="shrink-0 text-slate-500">
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <span className="truncate text-[12px] font-semibold text-slate-200">
                          {cat.name}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-[10px] font-medium text-slate-400">
                          <strong className="text-slate-200">{catDone}</strong> /{' '}
                          {catTotal}
                        </span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                            catPercent === 100
                              ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                              : 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
                          }`}
                        >
                          {catPercent}%
                        </span>
                      </div>
                    </button>

                    {isExpanded ? (
                      <div className="space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2">
                        {filteredTasks.length === 0 ? (
                          <p className="py-1 pl-5 text-[11px] text-slate-500">
                            조건에 일치하는 태스크가 없습니다.
                          </p>
                        ) : (
                          filteredTasks.map((task) => (
                            <button
                              key={task.id}
                              type="button"
                              onClick={() => toggleTask(task.lineIndex)}
                              style={{ paddingLeft: `${task.indent * 12 + 8}px` }}
                              className="flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50"
                            >
                              <span className="mt-0.5 shrink-0 text-slate-400">
                                {task.completed ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                ) : task.status === 'doing' ? (
                                  <CircleDot className="h-3.5 w-3.5 text-amber-400" />
                                ) : (
                                  <Circle className="h-3.5 w-3.5 text-slate-600" />
                                )}
                              </span>
                              <span
                                className={`leading-relaxed ${
                                  task.completed
                                    ? 'text-slate-500 line-through'
                                    : task.status === 'doing'
                                      ? 'text-amber-200/90'
                                      : 'text-slate-300'
                                }`}
                              >
                                {task.text}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'checklist' ? (
          <div className="max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5">
            {parsedData.categories.map((cat, catIdx) => {
              const filtered = cat.tasks.filter(filterTask);
              if (filtered.length === 0) return null;
              return (
                <div key={`${cat.name}-list-${catIdx}`} className="space-y-1">
                  <div className="sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    {cat.name} ({filtered.length})
                  </div>
                  {filtered.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.lineIndex)}
                      style={{ paddingLeft: `${task.indent * 10 + 6}px` }}
                      className="flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60"
                    >
                      <span className="mt-0.5 shrink-0">
                        {task.completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        ) : task.status === 'doing' ? (
                          <CircleDot className="h-3.5 w-3.5 text-amber-400" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-600" />
                        )}
                      </span>
                      <span
                        className={`leading-relaxed ${
                          task.completed
                            ? 'text-slate-500 line-through'
                            : task.status === 'doing'
                              ? 'text-amber-200/90'
                              : 'text-slate-200'
                        }`}
                      >
                        {task.text}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
