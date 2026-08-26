import type { ChecklistCategory } from '@/utils/chatWithMyself/messageTypes';
import { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ListTodo, 
  BarChart3, 
  Copy, 
  Check, 
  RotateCcw, 
  Search, 
  LayoutDashboard, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  PieChart
} from 'lucide-react';

const DEFAULT_MARKDOWN = ``;

export default function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'checklist'

  const parsedData = useMemo(() => {
    const lines = markdown.split('\n');
    const categories: ChecklistCategory[] = [];
    let currentCategory: ChecklistCategory = { name: '일반 / 미분류', tasks: [] };
    let totalTasksCount = 0;
    let completedTasksCount = 0;

    lines.forEach((line, lineIndex) => {
      // Category header detection (##, ###, etc.)
      const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headerMatch) {
        if (currentCategory.tasks.length > 0 || currentCategory.name !== '일반 / 미분류') {
          categories.push(currentCategory);
        }
        currentCategory = { name: headerMatch[2]?.trim() ?? '', tasks: [] };
        return;
      }

      // Checklist item detection `- [ ]`, `- [x]`, `* [ ]`, `1. [ ]`
      const taskMatch = line.match(/^(\s*)([-*]|\d+\.)\s+\[([ xX])\]\s+(.*)/);
      if (taskMatch) {
        const indentLevel = Math.floor((taskMatch[1]?.length ?? 0) / 2);
        const isCompleted = (taskMatch[3] ?? '').toLowerCase() === 'x';
        const taskText = (taskMatch[4] ?? '').trim();

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
    const initialExpanded: Record<string, boolean> = {};
    parsedData.categories.forEach(cat => {
      initialExpanded[cat.name] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [parsedData.categories.length]);

  const toggleTaskInMarkdown = (lineIndex: number) => {
    const lines = markdown.split('\n');
    if (lineIndex >= 0 && lineIndex < lines.length) {
      const line = lines[lineIndex];
      if (line == null) return;
      if (line.includes('[ ]')) {
        lines[lineIndex] = line.replace('[ ]', '[x]');
      } else if (line.includes('[x]')) {
        lines[lineIndex] = line.replace('[x]', '[ ]');
      } else if (line.includes('[X]')) {
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

  const toggleCategory = (catName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              체크리스트 진행률 대시보드
            </h1>
            <p className="text-xs text-slate-400">실시간 마크다운 분석 & 체크박스 동기화</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-slate-700/60"
            title="초기 샘플 데이터로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>샘플 복원</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-md shadow-indigo-600/30 active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨!' : '마크다운 복사'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 lg:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Markdown Input Editor */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>마크다운 편집기</span>
            </div>
            <span className="text-xs text-slate-500">
              {markdown.split('\n').length} 줄 입력됨
            </span>
          </div>

          <div className="relative flex-1 group">
            <textarea
              value={markdown}
              onChange={(e: any) => setMarkdown(e.target.value)}
              placeholder="여기에 마크다운 체크리스트를 붙여넣으세요... (예: - [ ] 작업 내용)"
              className="w-full h-[600px] lg:h-[calc(100vh-180px)] p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition resize-none shadow-inner scrollbar-thin scrollbar-thumb-slate-800"
            />
          </div>
        </div>

        {/* Right Column: Interactive Dashboard & Visualizer */}
        {}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Key Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Total Percentage Card */}
            <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 p-4 rounded-2xl border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-2 -top-2 opacity-10">
                <PieChart className="w-24 h-24 text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">전체 진행률</span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">{parsedData.percentage}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-700 ease-out"
                  style={{ width: `${parsedData.percentage}%` }}
                />
              </div>
            </div>

            {/* Total Tasks */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-medium">총 태스크</span>
                <ListTodo className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-2xl font-bold text-slate-100 mt-2">
                {parsedData.totalTasks} <span className="text-xs font-normal text-slate-500">개</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">분석된 전체 항목</p>
            </div>

            {/* Completed Tasks */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-emerald-400">
                <span className="text-xs font-medium">완료됨</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-emerald-400 mt-2">
                {parsedData.completedTasks} <span className="text-xs font-normal text-slate-500">개</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">완료 처리된 항목</p>
            </div>

            {/* Pending Tasks */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-amber-400">
                <span className="text-xs font-medium">진행 예정</span>
                <Circle className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-amber-400 mt-2">
                {parsedData.pendingTasks} <span className="text-xs font-normal text-slate-500">개</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">남은 작업 항목</p>
            </div>
          </div>

          {}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              
              {/* Tab Selector */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'dashboard' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>카테고리 요약</span>
                </button>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'checklist' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  <span>체크리스트 보기</span>
                </button>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center gap-2 flex-1 max-w-md justify-end">
                <div className="relative flex-1 min-w-[140px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                    placeholder="태스크 검색..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">전체 상태</option>
                  <option value="completed">완료만</option>
                  <option value="pending">미완료만</option>
                </select>
              </div>
            </div>

            {}
            {activeTab === 'dashboard' && (
              <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {parsedData.categories.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    체크리스트 항목을 찾을 수 없습니다. <br/>
                    <code className="text-xs bg-slate-900 px-1.5 py-0.5 rounded text-indigo-400 mt-1 inline-block">- [ ] 할 일</code> 형태로 작성해주세요.
                  </div>
                ) : (
                  parsedData.categories.map((cat, idx) => {
                    const catTotal = cat.tasks.length;
                    const catDone = cat.tasks.filter(t => t.completed).length;
                    const catPercent = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
                    const isExpanded = !!expandedCategories[cat.name];

                    // Filter tasks inside category
                    const filteredTasks = cat.tasks.filter(t => {
                      const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesStatus = 
                        statusFilter === 'all' ? true :
                        statusFilter === 'completed' ? t.completed :
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
                        <div 
                          onClick={() => toggleCategory(cat.name)}
                          className="p-3.5 flex items-center justify-between cursor-pointer select-none bg-slate-900/40 hover:bg-slate-800/40 transition"
                        >
                          <div className="flex items-center space-x-3">
                            <button className="text-slate-500 hover:text-slate-300">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <span className="font-semibold text-slate-200 text-sm">{cat.name}</span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-xs font-medium text-slate-400">
                              <strong className="text-slate-200">{catDone}</strong> / {catTotal}
                            </span>
                            
                            <div className="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  catPercent === 100 ? 'bg-emerald-400' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${catPercent}%` }}
                              />
                            </div>

                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              catPercent === 100 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            }`}>
                              {catPercent}%
                            </span>
                          </div>
                        </div>

                        {/* Task items preview */}
                        {isExpanded && (
                          <div className="p-3 border-t border-slate-800/60 bg-slate-950/40 space-y-1.5">
                            {filteredTasks.length === 0 ? (
                              <p className="text-xs text-slate-500 py-1 pl-7">조건에 일치하는 태스크가 없습니다.</p>
                            ) : (
                              filteredTasks.map((task) => (
                                <div 
                                  key={task.id}
                                  onClick={() => toggleTaskInMarkdown(task.lineIndex)}
                                  style={{ paddingLeft: `${task.indent * 16 + 12}px` }}
                                  className="flex items-start space-x-2 py-1.5 px-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition text-xs group"
                                >
                                  <button className="mt-0.5 text-slate-400 group-hover:scale-110 transition">
                                    {task.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                    )}
                                  </button>
                                  <span className={`leading-relaxed transition ${
                                    task.completed ? 'line-through text-slate-500' : 'text-slate-300'
                                  }`}>
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

            {}
            {activeTab === 'checklist' && (
              <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {parsedData.categories.map((cat, catIdx) => {
                  const filtered = cat.tasks.filter(t => {
                    const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStatus = 
                      statusFilter === 'all' ? true :
                      statusFilter === 'completed' ? t.completed :
                      !t.completed;
                    return matchesSearch && matchesStatus;
                  });

                  if (filtered.length === 0) return null;

                  return (
                    <div key={catIdx} className="space-y-1.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 sticky top-0 bg-slate-950 py-1 border-b border-slate-800/80">
                        {cat.name} ({filtered.length})
                      </div>
                      <div className="space-y-1 pt-1">
                        {filtered.map(task => (
                          <div
                            key={task.id}
                            onClick={() => toggleTaskInMarkdown(task.lineIndex)}
                            style={{ paddingLeft: `${task.indent * 12 + 8}px` }}
                            className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/40 cursor-pointer transition text-xs"
                          >
                            <button className="mt-0.5">
                              {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-600" />
                              )}
                            </button>
                            <span className={`leading-relaxed ${
                              task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                            }`}>
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