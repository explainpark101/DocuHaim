import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  LayoutDashboard,
  ListTodo,
  PieChart,
  Search,
} from 'lucide-react';

function parseChecklistMarkdown(markdown: any) {
  const lines = String(markdown ?? '').split('\n');
  const categories = [];
  let currentCategory = { name: '일반 / 미분류', tasks: [] };
  let totalTasksCount = 0;
  let completedTasksCount = 0;

  lines.forEach((line, lineIndex) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headerMatch) {
      if (currentCategory.tasks.length > 0 || currentCategory.name !== '일반 / 미분류') {
        categories.push(currentCategory);
      }
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
      currentCategory = { name: headerMatch[2].trim(), tasks: [] };
      return;
    }

    const taskMatch = line.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
    if (taskMatch) {
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
      const indentLevel = Math.floor(taskMatch[1].length / 2);
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
      const isCompleted = taskMatch[3].toLowerCase() === 'x';
      // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
      const taskText = taskMatch[4].trim();

      totalTasksCount += 1;
      if (isCompleted) completedTasksCount += 1;

      currentCategory.tasks.push({
        id: `line-${lineIndex}`,
        lineIndex,
        indent: indentLevel,
        completed: isCompleted,
        text: taskText,
        rawLine: line,
      });
    }
  });

  if (currentCategory.tasks.length > 0) {
    categories.push(currentCategory);
  }

  const percentage =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return {
    categories,
    totalTasks: totalTasksCount,
    completedTasks: completedTasksCount,
    pendingTasks: totalTasksCount - completedTasksCount,
    percentage,
  };
}

function toggleTaskLine(markdown: any, lineIndex: any) {
  const lines = String(markdown ?? '').split('\n');
  if (lineIndex < 0 || lineIndex >= lines.length) return markdown;
  const line = lines[lineIndex];
  // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
  if (line.includes('[ ]')) {
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    lines[lineIndex] = line.replace('[ ]', '[x]');
  // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
  } else if (line.includes('[x]')) {
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    lines[lineIndex] = line.replace('[x]', '[ ]');
  // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
  } else if (line.includes('[X]')) {
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    lines[lineIndex] = line.replace('[X]', '[ ]');
  } else {
    return markdown;
  }
  return lines.join('\n');
}

/**
 * Compact checklist progress dashboard (from checkListProgressCheck).
 * @param {{ markdown: string, onMarkdownChange?: (next: string) => void }} props
 */
export default function ChecklistProgressView({
  markdown = '',
  onMarkdownChange
}: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');

  const parsedData = useMemo(() => parseChecklistMarkdown(markdown), [markdown]);

  useEffect(() => {
    const initialExpanded = {};
    parsedData.categories.forEach((cat) => {
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      initialExpanded[cat.name] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [parsedData.categories.length]);

  const toggleTask = (lineIndex: any) => {
    if (typeof onMarkdownChange !== 'function') return;
    onMarkdownChange(toggleTaskLine(markdown, lineIndex));
  };

  const toggleCategory = (catName: any) => {
    setExpandedCategories((prev) => ({
      ...prev,
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      [catName]: !prev[catName],
    }));
  };

  const filterTask = (task: any) => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'completed'
          ? task.completed
          : !task.completed;
    return matchesSearch && matchesStatus;
  };

  return (
    <div className="space-y-3 text-xs text-slate-100">
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="col-span-2 sm:col-span-1 relative overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="pointer-events-none absolute -right-2 -top-2 opacity-10">
            <PieChart className="h-16 w-16 text-indigo-400" />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
            전체 진행률
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          </span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="my-1.5 flex items-baseline gap-1">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-3xl font-extrabold text-white">{parsedData.percentage}%</span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${parsedData.percentage}%` }}
            />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center justify-between text-slate-400">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-[10px] font-medium">총 태스크</span>
            <ListTodo className="h-3.5 w-3.5 text-slate-500" />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="mt-1 text-xl font-bold text-slate-100">
            {parsedData.totalTasks}{' '}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-[10px] font-normal text-slate-500">개</span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center justify-between text-emerald-400">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-[10px] font-medium">완료됨</span>
            <CheckCircle2 className="h-3.5 w-3.5" />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="mt-1 text-xl font-bold text-emerald-400">
            {parsedData.completedTasks}{' '}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-[10px] font-normal text-slate-500">개</span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center justify-between text-amber-400">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-[10px] font-medium">진행 예정</span>
            <Circle className="h-3.5 w-3.5" />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="mt-1 text-xl font-bold text-amber-400">
            {parsedData.pendingTasks}{' '}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-[10px] font-normal text-slate-500">개</span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>

      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-0.5">
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              <span>카테고리</span>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              <span>체크리스트</span>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>

          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5">
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="relative min-w-[120px] flex-1">
              <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
              // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              <input
                type="text"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder="검색..."
                className="w-full rounded-md border border-slate-800 bg-slate-900 py-1 pl-7 pr-2 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
            // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              <option value="all">전체</option>
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              <option value="completed">완료만</option>
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              <option value="pending">미완료만</option>
            // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </select>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>

        {activeTab === 'dashboard' && (
          <div className="max-h-[min(42vh,360px)] space-y-2 overflow-y-auto pr-0.5">
            {parsedData.categories.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <BarChart3 className="mx-auto mb-2 h-8 w-8 opacity-40" />
                // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                <p>체크리스트 항목을 찾을 수 없습니다.</p>
                // @ts-expect-error TS(2339): Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                <code className="mt-1 inline-block rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-indigo-400">
                  - [ ] 할 일
                // @ts-expect-error TS(2339): Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                </code>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            ) : (
              parsedData.categories.map((cat, idx) => {
                const catTotal = cat.tasks.length;
                // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                const catDone = cat.tasks.filter((t) => t.completed).length;
                const catPercent = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                const isExpanded = !!expandedCategories[cat.name];
                const filteredTasks = cat.tasks.filter(filterTask);
                if (searchQuery && filteredTasks.length === 0) return null;

                return (
                  <div
                    key={`${cat.name}-${idx}`}
                    className="overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70"
                  >
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.name)}
                      className="flex w-full cursor-pointer items-center justify-between bg-slate-900/40 p-2.5 text-left hover:bg-slate-800/40"
                    >
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      <div className="flex min-w-0 items-center gap-2">
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        <span className="shrink-0 text-slate-500">
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        </span>
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        <span className="truncate text-[12px] font-semibold text-slate-200">
                          {cat.name}
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        </span>
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      </div>
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      <div className="flex shrink-0 items-center gap-2">
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        <span className="text-[10px] font-medium text-slate-400">
                          // @ts-expect-error TS(2339): Property 'strong' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'strong' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339): Property 'strong' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'strong' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                          <strong className="text-slate-200">{catDone}</strong> / {catTotal}
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        </span>
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                            catPercent === 100
                              ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                              : 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
                          }`}
                        >
                          {catPercent}%
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                        </span>
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      </div>
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    </button>

                    {isExpanded && (
                      <div className="space-y-1 border-t border-slate-800/60 bg-slate-950/40 p-2">
                        {filteredTasks.length === 0 ? (
                          <p className="py-1 pl-5 text-[11px] text-slate-500">
                            조건에 일치하는 태스크가 없습니다.
                          // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
                          </p>
                        ) : (
                          filteredTasks.map((task) => (
                            <button
                              // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                              key={task.id}
                              type="button"
                              // @ts-expect-error TS(2339) FIXME: Property 'lineIndex' does not exist on type 'never... Remove this comment to see the full error message
                              onClick={() => toggleTask(task.lineIndex)}
                              // @ts-expect-error TS(2339) FIXME: Property 'indent' does not exist on type 'never'.
                              style={{ paddingLeft: `${task.indent * 12 + 8}px` }}
                              className="flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left text-[11px] hover:bg-slate-800/50"
                            >
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              <span className="mt-0.5 shrink-0 text-slate-400">
                                // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                {task.completed ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                  <Circle className="h-3.5 w-3.5 text-slate-600" />
                                )}
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              </span>
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              <span
                                className={`leading-relaxed ${
                                  // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                  task.completed
                                    ? 'text-slate-500 line-through'
                                    : 'text-slate-300'
                                }`}
                              >
                                // @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'.
                                // @ts-expect-error TS(2339) FIXME: Property 'text' does not exist on type 'never'.
                                // @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'.
                                // @ts-expect-error TS(2339) FIXME: Property 'text' does not exist on type 'never'.
                                {task.text}
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                              </span>
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            </button>
                          ))
                        )}
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      </div>
                    )}
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  </div>
                );
              })
            )}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="max-h-[min(42vh,360px)] space-y-3 overflow-y-auto pr-0.5">
            {parsedData.categories.map((cat, catIdx) => {
              const filtered = cat.tasks.filter(filterTask);
              if (filtered.length === 0) return null;
              return (
                <div key={`${cat.name}-list-${catIdx}`} className="space-y-1">
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  <div className="sticky top-0 border-b border-slate-800/80 bg-slate-950 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    {cat.name} ({filtered.length})
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  </div>
                  {filtered.map((task) => (
                    <button
                      // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                      key={task.id}
                      type="button"
                      // @ts-expect-error TS(2339) FIXME: Property 'lineIndex' does not exist on type 'never... Remove this comment to see the full error message
                      onClick={() => toggleTask(task.lineIndex)}
                      // @ts-expect-error TS(2339) FIXME: Property 'indent' does not exist on type 'never'.
                      style={{ paddingLeft: `${task.indent * 10 + 6}px` }}
                      className="flex w-full items-start gap-2 rounded-md border border-slate-800/40 bg-slate-900/40 p-1.5 text-left text-[11px] hover:bg-slate-800/60"
                    >
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      <span className="mt-0.5 shrink-0">
                        // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                        {task.completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-600" />
                        )}
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      </span>
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      <span
                        className={`leading-relaxed ${
                          // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                          task.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                        }`}
                      >
                        // @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'.
                        // @ts-expect-error TS(2339) FIXME: Property 'text' does not exist on type 'never'.
                        // @ts-expect-error TS(2339): Property 'text' does not exist on type 'never'.
                        // @ts-expect-error TS(2339) FIXME: Property 'text' does not exist on type 'never'.
                        {task.text}
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                      </span>
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    </button>
                  ))}
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
              );
            })}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        )}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}
