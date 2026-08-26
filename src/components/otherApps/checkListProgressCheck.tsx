// @ts-expect-error TS(1259) FIXME: Module '"/Users/jaehyung101/projects/s3haim/node_m... Remove this comment to see the full error message
import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ListTodo, 
  BarChart3, 
  Copy, 
  Check, 
  RotateCcw, 
  Search, 
  // @ts-expect-error TS(6133) FIXME: 'Filter' is declared but its value is never read.
  Filter, 
  LayoutDashboard, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  // @ts-expect-error TS(6133) FIXME: 'Sparkles' is declared but its value is never read... Remove this comment to see the full error message
  Sparkles,
  PieChart
} from 'lucide-react';

const DEFAULT_MARKDOWN = ``;

export default function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'checklist'

  const parsedData = useMemo(() => {
    const lines = markdown.split('\n');
    const categories = [];
    let currentCategory = { name: '일반 / 미분류', tasks: [] };
    let totalTasksCount = 0;
    let completedTasksCount = 0;

    lines.forEach((line, lineIndex) => {
      // Category header detection (##, ###, etc.)
      const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headerMatch) {
        if (currentCategory.tasks.length > 0 || currentCategory.name !== '일반 / 미분류') {
          categories.push(currentCategory);
        }
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        currentCategory = { name: headerMatch[2].trim(), tasks: [] };
        return;
      }

      // Checklist item detection `- [ ]`, `- [x]`, `* [ ]`, `1. [ ]`
      const taskMatch = line.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
      if (taskMatch) {
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        const indentLevel = Math.floor(taskMatch[1].length / 2);
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        const isCompleted = taskMatch[3].toLowerCase() === 'x';
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        const taskText = taskMatch[4].trim();

        totalTasksCount++;
        if (isCompleted) completedTasksCount++;

        currentCategory.tasks.push({
          id: `line-${lineIndex}`,
          lineIndex,
          indent: indentLevel,
          completed: isCompleted,
          text: taskText,
          rawLine: line
        });
      }
    });

    if (currentCategory.tasks.length > 0) {
      categories.push(currentCategory);
    }

    const overallPercentage = totalTasksCount > 0 
      ? Math.round((completedTasksCount / totalTasksCount) * 100) 
      : 0;

    return {
      categories,
      totalTasks: totalTasksCount,
      completedTasks: completedTasksCount,
      pendingTasks: totalTasksCount - completedTasksCount,
      percentage: overallPercentage
    };
  }, [markdown]);

  useEffect(() => {
    // Default all categories to expanded
    const initialExpanded = {};
    parsedData.categories.forEach(cat => {
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      initialExpanded[cat.name] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [parsedData.categories.length]);

  const toggleTaskInMarkdown = (lineIndex: any) => {
    const lines = markdown.split('\n');
    if (lineIndex >= 0 && lineIndex < lines.length) {
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
      }
      setMarkdown(lines.join('\n'));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMarkdown(DEFAULT_MARKDOWN);
  };

  const toggleCategory = (catName: any) => {
    setExpandedCategories(prev => ({
      ...prev,
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      [catName]: !prev[catName]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex items-center space-x-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <BarChart3 className="w-6 h-6 text-white" />
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2339): Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              체크리스트 진행률 대시보드
            // @ts-expect-error TS(2339): Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h1' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            </h1>
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            <p className="text-xs text-slate-400">실시간 마크다운 분석 & 체크박스 동기화</p>
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
        <div className="flex items-center gap-2">
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-slate-700/60"
            title="초기 샘플 데이터로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span>샘플 복원</span>
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
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-md shadow-indigo-600/30 active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span>{copied ? '복사됨!' : '마크다운 복사'}</span>
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
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </header>

      {/* Main Container */}
      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <main className="p-4 lg:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Markdown Input Editor */}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="lg:col-span-5 flex flex-col space-y-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center justify-between px-1">
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
              <FileText className="w-4 h-4 text-indigo-400" />
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              <span>마크다운 편집기</span>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-xs text-slate-500">
              {markdown.split('\n').length} 줄 입력됨
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
          <div className="relative flex-1 group">
            // @ts-expect-error TS(2339): Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
            <textarea
              value={markdown}
              onChange={(e: any) => setMarkdown(e.target.value)}
              placeholder="여기에 마크다운 체크리스트를 붙여넣으세요... (예: - [ ] 작업 내용)"
              className="w-full h-[600px] lg:h-[calc(100vh-180px)] p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition resize-none shadow-inner scrollbar-thin scrollbar-thumb-slate-800"
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

        {/* Right Column: Interactive Dashboard & Visualizer */}
        {}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Key Metrics Overview */}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Total Percentage Card */}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-4 rounded-2xl border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden">
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="absolute -right-2 -top-2 opacity-10">
                <PieChart className="w-24 h-24 text-indigo-400" />
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">전체 진행률</span>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="my-2 flex items-baseline gap-2">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                <span className="text-4xl font-extrabold text-white">{parsedData.percentage}%</span>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-700 ease-out"
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

            {/* Total Tasks */}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex justify-between items-center text-slate-400">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                <span className="text-xs font-medium">총 태스크</span>
                <ListTodo className="w-4 h-4 text-slate-500" />
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="text-2xl font-bold text-slate-100 mt-2">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                {parsedData.totalTasks} <span className="text-xs font-normal text-slate-500">개</span>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              <p className="text-[11px] text-slate-500 mt-1">분석된 전체 항목</p>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>

            {/* Completed Tasks */}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex justify-between items-center text-emerald-400">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                <span className="text-xs font-medium">완료됨</span>
                <CheckCircle2 className="w-4 h-4" />
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="text-2xl font-bold text-emerald-400 mt-2">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                {parsedData.completedTasks} <span className="text-xs font-normal text-slate-500">개</span>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              <p className="text-[11px] text-slate-500 mt-1">완료 처리된 항목</p>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>

            {/* Pending Tasks */}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex justify-between items-center text-amber-400">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                <span className="text-xs font-medium">진행 예정</span>
                <Circle className="w-4 h-4" />
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="text-2xl font-bold text-amber-400 mt-2">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                {parsedData.pendingTasks} <span className="text-xs font-normal text-slate-500">개</span>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
              <p className="text-[11px] text-slate-500 mt-1">남은 작업 항목</p>
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

          {}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              
              {/* Tab Selector */}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'dashboard' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  <span>카테고리 요약</span>
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
                  onClick={() => setActiveTab('checklist')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'checklist' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  <span>체크리스트 보기</span>
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

              {/* Search & Status Filters */}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex flex-wrap items-center gap-2 flex-1 max-w-md justify-end">
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                <div className="relative flex-1 min-w-[140px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                    placeholder="태스크 검색..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
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
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <option value="all">전체 상태</option>
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

            {}
            {activeTab === 'dashboard' && (
              <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {parsedData.categories.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    // @ts-expect-error TS(2339): Property 'br' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'br' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'br' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'br' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                    체크리스트 항목을 찾을 수 없습니다. <br/>
                    // @ts-expect-error TS(2339): Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'code' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-indigo-400 mt-1 inline-block">- [ ] 할 일</code> 형태로 작성해주세요.
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  </div>
                ) : (
                  parsedData.categories.map((cat, idx) => {
                    const catTotal = cat.tasks.length;
                    // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                    const catDone = cat.tasks.filter(t => t.completed).length;
                    const catPercent = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    const isExpanded = !!expandedCategories[cat.name];

                    // Filter tasks inside category
                    const filteredTasks = cat.tasks.filter(t => {
                      // @ts-expect-error TS(2339) FIXME: Property 'text' does not exist on type 'never'.
                      const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesStatus = 
                        statusFilter === 'all' ? true :
                        // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                        statusFilter === 'completed' ? t.completed :
                        // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                        !t.completed;
                      return matchesSearch && matchesStatus;
                    });

                    if (searchQuery && filteredTasks.length === 0) return null;

                    return (
                      <div 
                        key={idx} 
                        className="bg-slate-900/70 border border-slate-800/80 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-700"
                      >
                        {/* Category Header */}
                        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        <div 
                          onClick={() => toggleCategory(cat.name)}
                          className="p-3.5 flex items-center justify-between cursor-pointer select-none bg-slate-900/40 hover:bg-slate-800/40 transition"
                        >
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          <div className="flex items-center space-x-3">
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            <button className="text-slate-500 hover:text-slate-300">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            </button>
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            <span className="font-semibold text-slate-200 text-sm">{cat.name}</span>
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          </div>

                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          <div className="flex items-center space-x-4">
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            <span className="text-xs font-medium text-slate-400">
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
                            
                            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            <div className="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  catPercent === 100 ? 'bg-emerald-400' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${catPercent}%` }}
                              />
                            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                            </div>

                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              catPercent === 100 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            }`}>
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
                        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                        </div>

                        {/* Task items preview */}
                        {isExpanded && (
                          <div className="p-3 border-t border-slate-800/60 bg-slate-950/40 space-y-1.5">
                            {filteredTasks.length === 0 ? (
                              <p className="text-xs text-slate-500 py-1 pl-7">조건에 일치하는 태스크가 없습니다.</p>
                            ) : (
                              filteredTasks.map((task) => (
                                <div 
                                  // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                                  key={task.id}
                                  // @ts-expect-error TS(2339) FIXME: Property 'lineIndex' does not exist on type 'never... Remove this comment to see the full error message
                                  onClick={() => toggleTaskInMarkdown(task.lineIndex)}
                                  // @ts-expect-error TS(2339) FIXME: Property 'indent' does not exist on type 'never'.
                                  style={{ paddingLeft: `${task.indent * 16 + 12}px` }}
                                  className="flex items-start space-x-2 py-1.5 px-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition text-xs group"
                                >
                                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  <button className="mt-0.5 text-slate-400 group-hover:scale-110 transition">
                                    // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                    // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                    // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                    // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                    {task.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                    )}
                                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                                  </button>
                                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                                  <span className={`leading-relaxed transition ${
                                    // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                                    task.completed ? 'line-through text-slate-500' : 'text-slate-300'
                                  }`}>
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
                                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                                </div>
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

            {}
            {activeTab === 'checklist' && (
              <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {parsedData.categories.map((cat, catIdx) => {
                  const filtered = cat.tasks.filter(t => {
                    // @ts-expect-error TS(2339) FIXME: Property 'text' does not exist on type 'never'.
                    const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStatus = 
                      statusFilter === 'all' ? true :
                      // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                      statusFilter === 'completed' ? t.completed :
                      // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                      !t.completed;
                    return matchesSearch && matchesStatus;
                  });

                  if (filtered.length === 0) return null;

                  return (
                    <div key={catIdx} className="space-y-1.5">
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 sticky top-0 bg-slate-950 py-1 border-b border-slate-800/80">
                        {cat.name} ({filtered.length})
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      </div>
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      <div className="space-y-1 pt-1">
                        {filtered.map(task => (
                          <div
                            // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                            key={task.id}
                            // @ts-expect-error TS(2339) FIXME: Property 'lineIndex' does not exist on type 'never... Remove this comment to see the full error message
                            onClick={() => toggleTaskInMarkdown(task.lineIndex)}
                            // @ts-expect-error TS(2339) FIXME: Property 'indent' does not exist on type 'never'.
                            style={{ paddingLeft: `${task.indent * 12 + 8}px` }}
                            className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/40 cursor-pointer transition text-xs"
                          >
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            <button className="mt-0.5">
                              // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339): Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                              // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                              {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-600" />
                              )}
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                            </button>
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                            <span className={`leading-relaxed ${
                              // @ts-expect-error TS(2339) FIXME: Property 'completed' does not exist on type 'never... Remove this comment to see the full error message
                              task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                            }`}>
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
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                          </div>
                        ))}
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

      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      </main>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}