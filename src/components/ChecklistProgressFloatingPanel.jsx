import { useCallback, useEffect, useRef, useState } from 'react';
import { BarChart3, GripHorizontal, RefreshCw, X } from 'lucide-react';
import ChecklistProgressView from '@/components/ChecklistProgressView';
import { getEditorSelectionFromRef, replaceEditorRange } from '@/utils/editorSelection';
import {
  loadChecklistProgressModalPosition,
  saveChecklistProgressModalPosition,
} from '@/utils/checklistProgressModalPosition';

const MOBILE_MQ = '(max-width: 768px)';
const DRAG_THRESHOLD_PX = 5;

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches;
}

export default function ChecklistProgressFloatingPanel({
  editorRef,
  onChange,
  open,
  onOpenChange,
}) {
  const [position, setPosition] = useState(() => loadChecklistProgressModalPosition());
  const [markdown, setMarkdown] = useState('');
  const [selectionRange, setSelectionRange] = useState({ from: 0, to: 0 });
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startLeftVw: 0,
    startTopVh: 0,
  });

  const refreshSelection = useCallback(() => {
    const { text, from, to } = getEditorSelectionFromRef(editorRef);
    setMarkdown(text);
    setSelectionRange({ from, to });
    return text;
  }, [editorRef]);

  useEffect(() => {
    if (!open) return;
    if (isMobileViewport()) {
      onOpenChange?.(false);
      return;
    }
    refreshSelection();
  }, [open, refreshSelection, onOpenChange]);

  useEffect(() => {
    if (!open) return undefined;
    const mql = window.matchMedia(MOBILE_MQ);
    const onChangeMq = (e) => {
      if (e.matches) onOpenChange?.(false);
    };
    mql.addEventListener('change', onChangeMq);
    return () => mql.removeEventListener('change', onChangeMq);
  }, [open, onOpenChange]);

  const startPositionDrag = useCallback(
    (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;

      dragRef.current = {
        active: true,
        startX,
        startY,
        startLeftVw: position.leftVw,
        startTopVh: position.topVh,
      };

      const onMove = (ev) => {
        if (!dragRef.current.active) return;
        if (Math.hypot(ev.clientX - startX, ev.clientY - startY) <= DRAG_THRESHOLD_PX) {
          // still within tap threshold; keep updating anyway for smooth drag feel after threshold
        }
        const vw = window.innerWidth || 1;
        const vh = window.innerHeight || 1;
        const dxVw = ((ev.clientX - dragRef.current.startX) / vw) * 100;
        const dyVh = ((ev.clientY - dragRef.current.startY) / vh) * 100;
        setPosition({
          leftVw: Math.min(92, Math.max(0, dragRef.current.startLeftVw + dxVw)),
          topVh: Math.min(90, Math.max(0, dragRef.current.startTopVh + dyVh)),
        });
      };

      const onUp = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        setPosition((prev) => {
          saveChecklistProgressModalPosition(prev);
          return prev;
        });
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    },
    [position.leftVw, position.topVh],
  );

  const handleMarkdownChange = useCallback(
    (next) => {
      setMarkdown(next);
      const { view } = getEditorSelectionFromRef(editorRef);
      const { from, to } = selectionRange;
      const ok = replaceEditorRange(view, from, to, next, onChange);
      if (ok) {
        setSelectionRange({ from, to: from + next.length });
      }
    },
    [editorRef, selectionRange, onChange],
  );

  const handleClose = () => {
    onOpenChange?.(false);
  };

  if (!open || isMobileViewport()) return null;

  return (
    <div
      className="fixed z-[10050] w-[min(92vw,440px)] rounded-lg border border-indigo-400/40 bg-slate-950/95 shadow-2xl backdrop-blur-md"
      style={{ left: `${position.leftVw}vw`, top: `${position.topVh}vh` }}
      role="dialog"
      aria-modal="false"
      aria-label="체크리스트 진행률"
    >
      <div
        className="flex cursor-grab items-center justify-between gap-2 border-b border-indigo-500/30 bg-indigo-950/50 px-3 py-2 active:cursor-grabbing"
        onPointerDown={startPositionDrag}
      >
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-100">
          <GripHorizontal size={16} className="shrink-0 opacity-60" aria-hidden />
          <BarChart3 size={16} className="shrink-0" aria-hidden />
          <span className="truncate">체크리스트 진행률</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={refreshSelection}
            className="inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] text-indigo-200 hover:bg-indigo-900/50"
            title="선택 영역 새로고침"
            aria-label="선택 영역 새로고침"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">새로고침</span>
          </button>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleClose}
            className="rounded p-1 text-indigo-200 hover:bg-indigo-900/50"
            title="닫기"
            aria-label="닫기"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="max-h-[min(72vh,640px)] overflow-y-auto p-3">
        {!markdown.trim() ? (
          <p className="rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-6 text-center text-xs text-slate-400">
            에디터에서 체크리스트가 포함된 텍스트를 선택한 뒤
            <br />
            툴바 버튼을 누르거나 새로고침하세요.
          </p>
        ) : (
          <ChecklistProgressView markdown={markdown} onMarkdownChange={handleMarkdownChange} />
        )}
      </div>
    </div>
  );
}
