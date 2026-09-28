import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { copyText } from '@/utils/copyText';
import {
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleDot,
  Copy,
  FileText,
  LayoutDashboard,
  ListTodo,
  PieChart,
  RotateCcw,
  Search,
} from 'lucide-react';
import {
  cycleTaskCheckboxStatus,
  parseTaskCheckboxMarker,
  serializeTaskCheckboxMarker,
  type TaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';

const DEFAULT_MARKDOWN = '';

type StatusFilter = 'all' | 'completed' | 'pending';
type ActiveTab = 'dashboard' | 'checklist';

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

function parseChecklistMarkdown(markdown: string): ParsedChecklist {
  const lines = markdown.split('\n');
  const categories: ChecklistCategory[] = [];
  let currentCategory: ChecklistCategory = { name: '일반 / 미분류', tasks: [] };
  let totalTasksCount = 0;
  let completedTasksCount = 0;

  lines.forEach((line, lineIndex) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headerMatch) {
      if (currentCategory.tasks.length > 0 || currentCategory.name !== '일반 / 미분류') {
        categories.push(currentCategory);
      }
      currentCategory = { name: (headerMatch[2] ?? '').trim(), tasks: [] };
      return;
    }

    const taskMatch = line.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX~])\]\s+(.*)/);
    if (taskMatch) {
      const indentLevel = Math.floor((taskMatch[1] ?? '').length / 2);
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

function cycleTaskLine(markdown: string, lineIndex: number): string {
  const lines = markdown.split('\n');
  if (lineIndex < 0 || lineIndex >= lines.length) return markdown;
  const line = lines[lineIndex] ?? '';
  const match = line.match(/^(\s*(?:[-*]|\d+\.)\s+)\[([ xX~])\](.*)$/);
  if (!match) return markdown;
  const next = serializeTaskCheckboxMarker(
    cycleTaskCheckboxStatus(parseTaskCheckboxMarker(match[2])),
  );
  lines[lineIndex] = `${match[1]}[${next}]${match[3] ?? ''}`;
  return lines.join('\n');
}

function taskMatchesFilters(
  task: ChecklistTask,
  searchQuery: string,
  statusFilter: StatusFilter,
): boolean {
  const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStatus =
    statusFilter === 'all'
      ? true
      : statusFilter === 'completed'
        ? task.completed
        : !task.completed;
  return matchesSearch && matchesStatus;
}

function TaskStatusIcon({ task }: { task: ChecklistTask }) {
  if (task.completed) {
    return <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400/10" />;
  }
  if (task.status === 'doing') {
    return <CircleDot className="h-4 w-4 text-amber-400" />;
  }
  return <Circle className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />;
}

export default function CheckListProgressCheck() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    {},
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const parsedData = useMemo(() => parseChecklistMarkdown(markdown), [markdown]);

  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    for (const cat of parsedData.categories) {
      initialExpanded[cat.name] = true;
    }
    setExpandedCategories(initialExpanded);
  }, [parsedData.categories.length]);

  const toggleTaskInMarkdown = (lineIndex: number) => {
    setMarkdown((prev) => cycleTaskLine(prev, lineIndex));
  };

  const handleCopy = () => {
    void copyText(markdown, false).then((ok) => {
      if (!ok) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setMarkdown(DEFAULT_MARKDOWN);
  };

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const onStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all' || value === 'completed' || value === 'pending') {
      setStatusFilter(value);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur-md lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 shadow-lg shadow-indigo-500/20">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-lg font-bold text-transparent lg:text-xl">
              체크리스트 진행률 대시보드
            </h1>
            <p className="text-xs text-slate-400">실시간 마크다운 분석 & 체크박스 동기화</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            aria-label="초기 샘플 데이터로 복원"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>샘플 복원</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-95"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-300" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? '복사됨!' : '마크다운 복사'}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 lg:grid-cols-12 lg:p-8">
        <div className="flex flex-col space-y-3 lg:col-span-5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
              <FileText className="h-4 w-4 text-indigo-400" />
              <span>마크다운 편집기</span>
            </div>
            <span className="text-xs text-slate-500">
              {markdown.split('\n').length} 줄 입력됨
            </span>
          </div>

          <div className="group relative flex-1">
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="여기에 마크다운 체크리스트를 붙여넣으세요... (예: - [ ] 작업 내용)"
              className="h-[600px] w-full resize-none rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-200 shadow-inner transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 lg:h-[calc(100vh-180px)]"
            />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-4 sm:col-span-1">
              <div className="absolute -right-2 -top-2 opacity-10">
                <PieChart className="h-24 w-24 text-indigo-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                전체 진행률
              </span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">
                  {parsedData.percentage}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out"
                  style={{ width: `${parsedData.percentage}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium">총 태스크</span>
                <ListTodo className="h-4 w-4 text-slate-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-100">
                {parsedData.totalTasks}{' '}
                <span className="text-xs font-normal text-slate-500">개</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">분석된 전체 항목</p>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="text-xs font-medium">완료됨</span>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-400">
                {parsedData.completedTasks}{' '}
                <span className="text-xs font-normal text-slate-500">개</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">완료 처리된 항목</p>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs font-medium">진행 예정</span>
                <Circle className="h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-amber-400">
                {parsedData.pendingTasks}{' '}
                <span className="text-xs font-normal text-slate-500">개</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">남은 작업 항목</p>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    activeTab === 'dashboard'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>카테고리 요약</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('checklist')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    activeTab === 'checklist'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ListTodo className="h-3.5 w-3.5" />
                  <span>체크리스트 보기</span>
                </button>
              </div>

              <div className="flex max-w-md flex-1 flex-wrap items-center justify-end gap-2">
                <div className="relative min-w-[140px] flex-1">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="태스크 검색..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-8 pr-3 text-xs text-slate-200 transition focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={onStatusFilterChange}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">전체 상태</option>
                  <option value="completed">완료만</option>
                  <option value="pending">미완료만</option>
                </select>
              </div>
            </div>

            {activeTab === 'dashboard' && (
              <div className="max-h-[calc(100vh-320px)] space-y-3 overflow-y-auto pr-1">
                {parsedData.categories.length === 0 ? (
                  <div className="py-12 text-center text-sm text-slate-500">
                    체크리스트 항목을 찾을 수 없습니다. <br />
                    <code className="mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-xs text-indigo-400">
                      - [ ] 할 일
                    </code>{' '}
                    형태로 작성해주세요.
                  </div>
                ) : (
                  parsedData.categories.map((cat, idx) => {
                    const catTotal = cat.tasks.length;
                    const catDone = cat.tasks.filter((t) => t.completed).length;
                    const catPercent =
                      catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
                    const isExpanded = Boolean(expandedCategories[cat.name]);

                    const filteredTasks = cat.tasks.filter((t) =>
                      taskMatchesFilters(t, searchQuery, statusFilter),
                    );

                    if (searchQuery && filteredTasks.length === 0) return null;

                    return (
                      <div
                        key={`${cat.name}-${idx}`}
                        className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 transition-all duration-200 hover:border-slate-700"
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleCategory(cat.name)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleCategory(cat.name);
                            }
                          }}
                          className="flex cursor-pointer select-none items-center justify-between bg-slate-900/40 p-3.5 transition hover:bg-slate-800/40"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-slate-500 hover:text-slate-300">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </span>
                            <span className="text-sm font-semibold text-slate-200">
                              {cat.name}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-xs font-medium text-slate-400">
                              <strong className="text-slate-200">{catDone}</strong> /{' '}
                              {catTotal}
                            </span>

                            <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-slate-800 sm:block sm:w-32">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  catPercent === 100 ? 'bg-emerald-400' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${catPercent}%` }}
                              />
                            </div>

                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                                catPercent === 100
                                  ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                  : 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
                              }`}
                            >
                              {catPercent}%
                            </span>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="space-y-1.5 border-t border-slate-800/60 bg-slate-950/40 p-3">
                            {filteredTasks.length === 0 ? (
                              <p className="py-1 pl-7 text-xs text-slate-500">
                                조건에 일치하는 태스크가 없습니다.
                              </p>
                            ) : (
                              filteredTasks.map((task) => (
                                <div
                                  key={task.id}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => toggleTaskInMarkdown(task.lineIndex)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      toggleTaskInMarkdown(task.lineIndex);
                                    }
                                  }}
                                  style={{ paddingLeft: `${task.indent * 16 + 12}px` }}
                                  className="group flex cursor-pointer items-start space-x-2 rounded-lg px-2 py-1.5 text-xs transition hover:bg-slate-800/50"
                                >
                                  <span className="mt-0.5 text-slate-400 transition group-hover:scale-110">
                                    <TaskStatusIcon task={task} />
                                  </span>
                                  <span
                                    className={`leading-relaxed transition ${
                                      task.completed
                                        ? 'text-slate-500 line-through'
                                        : task.status === 'doing'
                                          ? 'text-amber-200/90'
                                          : 'text-slate-300'
                                    }`}
                                  >
                                    {task.text}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="max-h-[calc(100vh-320px)] space-y-4 overflow-y-auto pr-1">
                {parsedData.categories.map((cat, catIdx) => {
                  const filtered = cat.tasks.filter((t) =>
                    taskMatchesFilters(t, searchQuery, statusFilter),
                  );

                  if (filtered.length === 0) return null;

                  return (
                    <div key={`${cat.name}-list-${catIdx}`} className="space-y-1.5">
                      <div className="sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-xs font-bold uppercase tracking-wider text-indigo-400">
                        {cat.name} ({filtered.length})
                      </div>
                      <div className="space-y-1 pt-1">
                        {filtered.map((task) => (
                          <div
                            key={task.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleTaskInMarkdown(task.lineIndex)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleTaskInMarkdown(task.lineIndex);
                              }
                            }}
                            style={{ paddingLeft: `${task.indent * 12 + 8}px` }}
                            className="flex cursor-pointer items-start space-x-2.5 rounded-lg border border-slate-800/40 bg-slate-900/40 p-2 text-xs transition hover:bg-slate-800/60"
                          >
                            <span className="mt-0.5">
                              <TaskStatusIcon task={task} />
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
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
