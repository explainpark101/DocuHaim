import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import { VList, type VListHandle } from 'virtua';
import {
  Bold,
  FileText,
  Home,
  ListTree,
  MessageSquare,
  Printer,
  Search,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';
import type { AdvancedSearchHit } from '@/utils/advancedSearch/query';
import type { AppCommandId } from '@/utils/advancedSearch/commands';
import { loadAdvancedSearchUiAnimationEnabled } from '@/utils/advancedSearch/settings';
import { loadAltVimNavigationEnabled } from '@/utils/altVimNavigationSettings';

export type AdvancedSearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (query: string) => Promise<AdvancedSearchHit[]>;
  onSelectHit: (hit: AdvancedSearchHit) => void;
  indexEnabled?: boolean;
  hasIndex?: boolean;
  building?: boolean;
  /** Show editor toolbar shortcuts in empty-state hints. */
  editorActionsAvailable?: boolean;
  /** Show print-page shortcuts in empty-state hints. */
  printActionsAvailable?: boolean;
  /** Prefer print-oriented empty hint copy. */
  preferPrintActions?: boolean;
  /** Nested paper-size picker mode. */
  printPaperPickerMode?: boolean;
};

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring' as const, stiffness: 420, damping: 32 };

const OVERLAY_CLASS =
  'fixed inset-0 z-220 bg-black/45 backdrop-blur-[2px]';
/** Centering translate is driven by motion when animation is on (avoids CSS transform conflicts). */
const PANEL_CLASS =
  'fixed left-1/2 top-[min(18vh,8rem)] z-221 flex w-[min(94vw,560px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft';

function reasonLabel(hit: AdvancedSearchHit): string {
  if (hit.kind === 'command') {
    if (hit.commandId === 'print-scroll-heading') return '목차';
    if (hit.commandId?.startsWith('print-paper-')) return '용지';
    if (hit.commandId?.startsWith('print-')) return '인쇄';
    if (hit.commandId?.startsWith('editor-')) return '에디터';
    return '바로가기';
  }
  const reasons = hit.reasons;
  if (reasons.includes('name')) return '파일명';
  if (reasons.includes('path')) return '경로';
  if (reasons.includes('content')) return '내용';
  return '';
}

function HitIcon({
  kind,
  commandId,
}: {
  kind: AdvancedSearchHit['kind'];
  commandId?: AppCommandId;
}) {
  const className = 'mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted';
  if (kind === 'command') {
    if (commandId?.startsWith('settings')) return <Settings size={16} className={className} />;
    if (commandId?.startsWith('chat')) return <MessageSquare size={16} className={className} />;
    if (commandId === 'home') return <Home size={16} className={className} />;
    if (commandId === 'export-pdf' || commandId === 'export-current' || commandId === 'editor-export-pdf') {
      return <Printer size={16} className={className} />;
    }
    if (commandId === 'print-scroll-heading') return <ListTree size={16} className={className} />;
    if (commandId?.startsWith('print-')) return <Printer size={16} className={className} />;
    if (commandId === 'editor-llm-assist') return <Sparkles size={16} className={className} />;
    if (commandId === 'editor-bold') return <Bold size={16} className={className} />;
    if (commandId?.startsWith('editor-')) return <Bold size={16} className={className} />;
    return <Search size={16} className={className} />;
  }
  if (kind === 'chat') return <MessageSquare size={16} className={className} />;
  return <FileText size={16} className={className} />;
}

/** Arrow keys always; Alt/Opt+hjkl when Alt+Vim setting is on (j↓ k↑; h/l captured). */
function moveDeltaFromKey(e: KeyboardEvent, vimEnabled: boolean): number | null {
  if (e.key === 'ArrowDown') return 1;
  if (e.key === 'ArrowUp') return -1;
  if (!vimEnabled || !e.altKey || e.metaKey || e.ctrlKey) return null;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === 'j') return 1;
  if (key === 'k') return -1;
  // h/l are part of the vim chord set; consume so OS/browser shortcuts don't fire.
  if (key === 'h' || key === 'l') return 0;
  return null;
}

export default function AdvancedSearchModal({
  open,
  onOpenChange,
  onSearch,
  onSelectHit,
  indexEnabled = true,
  hasIndex = false,
  building = false,
  editorActionsAvailable = false,
  printActionsAvailable = false,
  preferPrintActions = false,
  printPaperPickerMode = false,
}: AdvancedSearchModalProps) {
  const inputId = useId();
  const listId = useId();
  const optionIdPrefix = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<VListHandle | null>(null);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<AdvancedSearchHit[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searching, setSearching] = useState(false);
  const [vimEnabled, setVimEnabled] = useState(() =>
    loadAltVimNavigationEnabled(),
  );
  const [uiAnimationEnabled, setUiAnimationEnabled] = useState(() =>
    loadAdvancedSearchUiAnimationEnabled(),
  );
  const reqSeq = useRef(0);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setHits([]);
    setActiveIndex(0);
    setVimEnabled(loadAltVimNavigationEnabled());
    setUiAnimationEnabled(loadAdvancedSearchUiAnimationEnabled());
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const seq = ++reqSeq.current;
    setSearching(true);
    const delay = query.trim() ? 160 : 0;
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const next = await onSearch(query);
          if (seq !== reqSeq.current) return;
          setHits(next);
          setActiveIndex(0);
        } finally {
          if (seq === reqSeq.current) setSearching(false);
        }
      })();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [query, open, onSearch]);

  useEffect(() => {
    if (!open || hits.length === 0) return;
    const idx = Math.min(Math.max(activeIndex, 0), hits.length - 1);
    listRef.current?.scrollToIndex(idx, { align: 'nearest' });
  }, [activeIndex, hits.length, open]);

  const emptyHint = useMemo(() => {
    if (searching && hits.length === 0) return '검색 중…';
    if (hits.length === 0 && query.trim()) return '결과 없음';
    if (hits.length === 0 && !query.trim()) {
      if (printPaperPickerMode) return '용지 크기를 검색하거나 선택하세요';
      if (preferPrintActions || printActionsAvailable) {
        return '목차·용지·저장·폰트·내보내기를 검색하세요';
      }
      if (editorActionsAvailable) {
        return '설정·채팅·에디터 서식(굵게, AI…)을 검색하세요';
      }
      return '설정·채팅 등 바로가기를 검색하거나 파일명·경로를 입력하세요';
    }
    return null;
  }, [
    query,
    searching,
    hits.length,
    editorActionsAvailable,
    printActionsAvailable,
    preferPrintActions,
    printPaperPickerMode,
  ]);

  const listFooterHint = useMemo(() => {
    if (!indexEnabled) return '역색인 꺼짐 · 파일명·경로·바로가기';
    if (building) return '색인 생성 중…';
    if (!hasIndex) return '색인 없음 · 파일명·경로·바로가기';
    return null;
  }, [indexEnabled, hasIndex, building]);

  const navHint = vimEnabled
    ? '↑↓ / ⌥JK 이동 · Enter 열기 · Esc 닫기'
    : '↑↓ 이동 · Enter 열기 · Esc 닫기';

  const selectActive = () => {
    const hit = hits[activeIndex];
    if (!hit) return;
    onSelectHit(hit);
    onOpenChange(false);
  };

  const moveActive = (delta: number) => {
    if (delta === 0 || hits.length === 0) return;
    setActiveIndex((i) => {
      const next = i + delta;
      return Math.min(Math.max(next, 0), hits.length - 1);
    });
  };

  const activeOptionId =
    hits.length > 0 ? `${optionIdPrefix}-${activeIndex}` : undefined;

  const handleContentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      selectActive();
      return;
    }
    const delta = moveDeltaFromKey(e, vimEnabled);
    if (delta === null) return;
    e.preventDefault();
    e.stopPropagation();
    moveActive(delta);
  };

  const panelInner = (
    <>
      <Dialog.Title className="sr-only">Advanced Search</Dialog.Title>

      <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5 dark:border-odp-borderSoft">
        <Search
          size={18}
          className="shrink-0 text-gray-400 dark:text-odp-muted"
          aria-hidden
        />
        <label htmlFor={inputId} className="sr-only">
          Advanced Search
        </label>
        <input
          id={inputId}
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="설정, 채팅, 파일명, 경로…"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-odp-fgStrong dark:placeholder:text-odp-muted"
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={hits.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
        />
        {building ? (
          <span className="shrink-0 text-[11px] text-amber-600 dark:text-amber-400">
            색인 중
          </span>
        ) : listFooterHint && !building ? (
          <span className="hidden shrink-0 text-[11px] text-gray-400 dark:text-odp-muted sm:inline">
            {indexEnabled && !hasIndex ? '색인 없음' : null}
          </span>
        ) : null}
        <Dialog.Close asChild>
          <button
            type="button"
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </Dialog.Close>
      </div>

      <div
        id={listId}
        role="listbox"
        aria-label="검색 결과"
        className="h-[min(52vh,420px)] min-h-[4.5rem] overscroll-contain"
      >
        {emptyHint ? (
          <p className="px-4 py-6 text-center text-sm text-gray-500 dark:text-odp-muted">
            {emptyHint}
          </p>
        ) : (
          <VList
            ref={listRef}
            className="h-full overscroll-contain"
            data={hits}
            style={{ overflowX: 'clip' }}
          >
            {(hit, i) => {
              const active = i === activeIndex;
              const kindLabel =
                hit.kind === 'command'
                  ? 'app'
                  : hit.kind === 'chat'
                    ? 'chat'
                    : 'file';
              return (
                <button
                  id={`${optionIdPrefix}-${i}`}
                  key={hit.docId}
                  type="button"
                  role="option"
                  aria-selected={active}
                  tabIndex={-1}
                  className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors ${
                    active
                      ? 'bg-blue-50 dark:bg-odp-focusBg'
                      : 'hover:bg-gray-50 dark:hover:bg-odp-bg'
                  }`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    onSelectHit(hit);
                    onOpenChange(false);
                  }}
                >
                  <HitIcon
                    kind={hit.kind}
                    {...(hit.commandId ? { commandId: hit.commandId } : {})}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong">
                        {hit.title}
                      </span>
                      <span className="shrink-0 text-[10px] uppercase tracking-wide text-gray-400 dark:text-odp-muted">
                        {kindLabel} · {reasonLabel(hit)}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-odp-muted">
                      {hit.kind === 'command'
                        ? hit.preview || hit.path
                        : hit.kind === 'chat'
                          ? `${hit.dateStr || ''} ${hit.preview || ''}`.trim()
                          : hit.path}
                    </span>
                  </span>
                </button>
              );
            }}
          </VList>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-3 py-1.5 text-[10px] text-gray-400 dark:border-odp-borderSoft dark:text-odp-muted">
        <span>{navHint}</span>
        <span>{listFooterHint || '⌘K / Ctrl+K'}</span>
      </div>
    </>
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {uiAnimationEnabled ? (
        <AnimatePresence>
          {open ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <Motion.div
                  className={OVERLAY_CLASS}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={OVERLAY_TRANSITION}
                />
              </Dialog.Overlay>
              <Dialog.Content
                asChild
                aria-describedby={undefined}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onKeyDown={handleContentKeyDown}
              >
                <Motion.div
                  className={PANEL_CLASS}
                  initial={{ opacity: 0, scale: 0.96, x: '-50%', y: -10 }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: '-50%', y: -6 }}
                  transition={PANEL_TRANSITION}
                >
                  {panelInner}
                </Motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      ) : open ? (
        <Dialog.Portal>
          <Dialog.Overlay className={OVERLAY_CLASS} />
          <Dialog.Content
            className={`${PANEL_CLASS} -translate-x-1/2`}
            aria-describedby={undefined}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onKeyDown={handleContentKeyDown}
          >
            {panelInner}
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  );
}
