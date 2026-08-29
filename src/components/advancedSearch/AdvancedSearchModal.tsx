import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import { VList, type VListHandle } from 'virtua';
import {
  Bold,
  Circle,
  FilePlus,
  FileText,
  Folder,
  FolderPlus,
  Home,
  ListTree,
  MessageSquare,
  Printer,
  Search,
  Settings,
  Sparkles,
  Superscript,
  TextCursorInput,
  FlipHorizontal2,
  X,
} from 'lucide-react';
import ChatGroupAvatar from '@/components/chatWithMyself/ui/ChatGroupAvatar';
import type { AdvancedSearchHit } from '@/utils/advancedSearch/query';
import type { AppCommandId } from '@/utils/advancedSearch/commands';
import { loadAdvancedSearchUiAnimationEnabled } from '@/utils/advancedSearch/settings';
import { loadAltVimNavigationEnabled } from '@/utils/altVimNavigationSettings';
import { SELF_GROUP } from '@/utils/chatWithMyself/paths.js';

export type AdvancedSearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (query: string) => Promise<AdvancedSearchHit[]>;
  onSelectHit: (hit: AdvancedSearchHit) => boolean | void;
  indexEnabled?: boolean;
  hasIndex?: boolean;
  /** SharedArrayBuffer / COOP+COEP ready for Lucivy (web). */
  isolationReady?: boolean;
  /** Body search path: Lucivy index, live vault scan, or off. */
  contentSearchMode?: 'index' | 'live' | 'off';
  building?: boolean;
  /** Show editor toolbar shortcuts in empty-state hints. */
  editorActionsAvailable?: boolean;
  /** Show print-page shortcuts in empty-state hints. */
  printActionsAvailable?: boolean;
  /** Show chat composer shortcuts in empty-state hints. */
  chatActionsAvailable?: boolean;
  /** Show MLX-VLM shortcuts in empty-state hints. */
  mlxVlmActionsAvailable?: boolean;
  /** Show llama.cpp shortcuts in empty-state hints. */
  llamaCppActionsAvailable?: boolean;
  /** Prefer print-oriented empty hint copy. */
  preferPrintActions?: boolean;
  /** Nested paper-size picker mode. */
  printPaperPickerMode?: boolean;
  /** Directory browse mode (folder navigation). */
  browseDirectoryMode?: boolean;
  /** Current browse folder path ('' = root). */
  browsePath?: string;
  /** Nested chat group picker mode. */
  chatGroupsPickerMode?: boolean;
  /** Nested footnote insert: existing vs compose. */
  footnoteInsertPickerMode?: boolean;
  /** Nested existing footnote label picker. */
  footnoteExistingPickerMode?: boolean;
  /** Nested circled number picker (① ② …). */
  circleNumberPickerMode?: boolean;
  /** Resolve chat group icon paths (storage-aware). */
  getPresignedUrl?:
    | ((path: string) => Promise<string | null | undefined>)
    | undefined;
};

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring' as const, stiffness: 420, damping: 32 };

const OVERLAY_CLASS =
  'fixed inset-0 z-220 bg-black/45 backdrop-blur-[2px]';
/** Centering translate is driven by motion when animation is on (avoids CSS transform conflicts). */
const PANEL_CLASS =
  'fixed left-1/2 top-[min(18vh,8rem)] z-221 flex w-[min(94vw,560px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft';

function reasonLabel(hit: AdvancedSearchHit): string {
  if (hit.kind === 'folder') return '폴더';
  if (hit.kind === 'command') {
    if (hit.commandId === 'browse-directory') return '탐색';
    if (
      hit.commandId === 'browse-new-file'
      || hit.commandId === 'browse-new-folder'
      || hit.commandId === 'create-file'
      || hit.commandId === 'create-folder'
    ) {
      return '만들기';
    }
    if (hit.commandId === 'chat-select-group' || hit.commandId === 'chat-select-group-item') {
      return '채팅 그룹';
    }
    if (hit.commandId === 'chat-clear-group') return '채팅 그룹';
    if (
      hit.commandId === 'editor-insert-footnote' ||
      hit.commandId === 'footnote-insert-pick-existing' ||
      hit.commandId === 'footnote-insert-compose' ||
      hit.commandId === 'footnote-insert-existing-item' ||
      hit.commandId?.startsWith('settings-footnote-')
    ) {
      return '각주';
    }
    if (
      hit.commandId === 'editor-insert-circle-number' ||
      hit.commandId === 'circle-number-insert-item'
    ) {
      return '원숫자';
    }
    if (hit.commandId === 'chat-focus-composer') return '채팅';
    if (hit.commandId?.startsWith('chat')) return '채팅';
    if (
      hit.commandId?.startsWith('settings-alt-') ||
      hit.commandId?.startsWith('settings-show-') ||
      hit.commandId?.startsWith('settings-hide-') ||
      hit.commandId?.startsWith('settings-tree-') ||
      hit.commandId?.startsWith('settings-composer-') ||
      hit.commandId?.startsWith('settings-as-')
    ) {
      return '설정 토글';
    }
    if (hit.commandId?.startsWith('snippet-insert-')) return '스니펫';
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

function HitLeading({
  hit,
  getPresignedUrl,
}: {
  hit: AdvancedSearchHit;
  getPresignedUrl?:
    | ((path: string) => Promise<string | null | undefined>)
    | undefined;
}) {
  if (hit.commandId === 'chat-select-group-item') {
    const name = hit.title || hit.group || SELF_GROUP;
    return (
      <ChatGroupAvatar
        name={name}
        colorKey={hit.group || name}
        size="md"
        iconPath={hit.iconPath || null}
        getPresignedUrl={getPresignedUrl || null}
        className="mt-0.5"
      />
    );
  }
  return (
    <HitIcon
      kind={hit.kind}
      {...(hit.commandId ? { commandId: hit.commandId } : {})}
    />
  );
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
    if (commandId === 'browse-directory') return <Folder size={16} className={className} />;
    if (commandId === 'browse-new-file' || commandId === 'create-file') {
      return <FilePlus size={16} className={className} />;
    }
    if (commandId === 'browse-new-folder' || commandId === 'create-folder') {
      return <FolderPlus size={16} className={className} />;
    }
    if (commandId === 'export-pdf' || commandId === 'export-current' || commandId === 'editor-export-pdf') {
      return <Printer size={16} className={className} />;
    }
    if (commandId === 'print-scroll-heading') return <ListTree size={16} className={className} />;
    if (commandId?.startsWith('print-')) return <Printer size={16} className={className} />;
    if (
      commandId === 'editor-llm-assist' ||
      commandId === 'settings-llm-provider' ||
      commandId === 'settings-gemini' ||
      commandId === 'settings-openai-compat'
    ) {
      return <Sparkles size={16} className={className} />;
    }
    if (commandId === 'editor-autocomplete-toggle') {
      return <TextCursorInput size={16} className={className} />;
    }
    if (commandId === 'editor-mirror-edit-toggle') {
      return <FlipHorizontal2 size={16} className={className} />;
    }
    if (commandId?.startsWith('snippet-insert-')) return <Sparkles size={16} className={className} />;
    if (commandId === 'editor-bold') return <Bold size={16} className={className} />;
    if (
      commandId === 'editor-insert-footnote' ||
      commandId === 'footnote-insert-pick-existing' ||
      commandId === 'footnote-insert-compose' ||
      commandId === 'footnote-insert-existing-item' ||
      commandId?.startsWith('settings-footnote-')
    ) {
      return <Superscript size={16} className={className} />;
    }
    if (
      commandId === 'editor-insert-circle-number' ||
      commandId === 'circle-number-insert-item'
    ) {
      return <Circle size={16} className={className} />;
    }
    if (commandId?.startsWith('editor-')) return <Bold size={16} className={className} />;
    return <Search size={16} className={className} />;
  }
  if (kind === 'folder') return <Folder size={16} className={className} />;
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
  isolationReady = true,
  contentSearchMode = 'off',
  building = false,
  editorActionsAvailable = false,
  printActionsAvailable = false,
  chatActionsAvailable = false,
  mlxVlmActionsAvailable = false,
  llamaCppActionsAvailable = false,
  preferPrintActions = false,
  printPaperPickerMode = false,
  browseDirectoryMode = false,
  browsePath = '',
  chatGroupsPickerMode = false,
  footnoteInsertPickerMode = false,
  footnoteExistingPickerMode = false,
  circleNumberPickerMode = false,
  getPresignedUrl = undefined,
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

  // Reset query when navigating folders inside browse mode (keep dialog open).
  useEffect(() => {
    if (!open || !browseDirectoryMode) return;
    setQuery('');
    setActiveIndex(0);
  }, [browsePath, browseDirectoryMode, open]);

  // Clear parent command query when entering nested pickers.
  useEffect(() => {
    if (!open || !chatGroupsPickerMode) return;
    setQuery('');
    setActiveIndex(0);
  }, [chatGroupsPickerMode, open]);

  useEffect(() => {
    if (!open || !footnoteInsertPickerMode) return;
    setQuery('');
    setActiveIndex(0);
  }, [footnoteInsertPickerMode, open]);

  useEffect(() => {
    if (!open || !footnoteExistingPickerMode) return;
    setQuery('');
    setActiveIndex(0);
  }, [footnoteExistingPickerMode, open]);

  useEffect(() => {
    if (!open || !circleNumberPickerMode) return;
    setQuery('');
    setActiveIndex(0);
  }, [circleNumberPickerMode, open]);

  // Always highlight the first result as soon as the query changes.
  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [query, open]);

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
    listRef.current?.scrollToIndex(idx, {
      align: idx === 0 ? 'start' : 'nearest',
    });
  }, [activeIndex, hits, open]);

  const emptyHint = useMemo(() => {
    if (searching && hits.length === 0) return '검색 중…';
    if (hits.length === 0 && query.trim()) return '결과 없음';
    if (hits.length === 0 && !query.trim()) {
      if (browseDirectoryMode) {
        return browsePath
          ? '새 파일·폴더를 만들거나 항목을 선택하세요'
          : '새 파일·폴더를 만들거나 폴더/파일을 선택하세요';
      }
      if (chatGroupsPickerMode) return '채팅 그룹을 검색하거나 선택하세요';
      if (footnoteInsertPickerMode) return '기존 각주를 고르거나 직접 입력하세요';
      if (footnoteExistingPickerMode) return '이 문서의 각주를 검색하거나 선택하세요';
      if (circleNumberPickerMode) return '삽입할 원숫자를 검색하거나 선택하세요';
      if (printPaperPickerMode) return '용지 크기를 검색하거나 선택하세요';
      if (preferPrintActions || printActionsAvailable) {
        return '목차·용지·저장·폰트·내보내기를 검색하세요';
      }
      if (chatActionsAvailable) {
        return '입력창 포커스·그룹·채팅 바로가기를 검색하세요';
      }
      if (mlxVlmActionsAvailable) {
        return 'MLX-VLM 서버 시작·중지·모델 다운로드를 검색하세요';
      }
      if (llamaCppActionsAvailable) {
        return 'llama.cpp 서버 시작·중지·GGUF 다운로드를 검색하세요';
      }
      if (editorActionsAvailable) {
        return '설정·채팅·에디터 서식(굵게, AI…)을 검색하세요';
      }
      return '설정·채팅·새 파일 등 바로가기를 검색하거나 파일명·경로를 입력하세요';
    }
    return null;
  }, [
    query,
    searching,
    hits.length,
    editorActionsAvailable,
    printActionsAvailable,
    chatActionsAvailable,
    mlxVlmActionsAvailable,
    llamaCppActionsAvailable,
    preferPrintActions,
    printPaperPickerMode,
    browseDirectoryMode,
    browsePath,
    chatGroupsPickerMode,
    footnoteInsertPickerMode,
    footnoteExistingPickerMode,
    circleNumberPickerMode,
  ]);

  const listFooterHint = useMemo(() => {
    if (!indexEnabled) return '역색인 꺼짐 · 파일명·경로·바로가기';
    if (contentSearchMode === 'live') {
      return '본문 직접 검색(폴백) · 파일·채팅 스캔';
    }
    if (!isolationReady) return '웹 검색 격리 미지원 · 파일명·경로·바로가기';
    if (building) return '색인 생성 중…';
    if (!hasIndex) return '색인 없음 · 파일명·경로·바로가기';
    return null;
  }, [indexEnabled, contentSearchMode, isolationReady, hasIndex, building]);

  const navHint = vimEnabled
    ? browseDirectoryMode
      ? '↑↓ / ⌥JK 이동 · Enter 실행/들어가기/만들기 · Esc 닫기'
      : '↑↓ / ⌥JK 이동 · Enter 실행 · Esc 닫기'
    : browseDirectoryMode
      ? '↑↓ 이동 · Enter 실행/들어가기/만들기 · Esc 닫기'
      : '↑↓ 이동 · Enter 실행 · Esc 닫기';

  const selectActive = () => {
    const hit = hits[activeIndex];
    if (!hit) return;
    const keepOpen = onSelectHit(hit) === false;
    if (!keepOpen) onOpenChange(false);
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

  const isEnterKey = (e: KeyboardEvent) =>
    e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter';

  /** Enter runs the highlighted hit and closes (unless onSelectHit returns false). */
  const handleContentKeyDown = (e: KeyboardEvent) => {
    if (isEnterKey(e)) {
      // Let IME commit composition; the next Enter selects.
      if (e.nativeEvent.isComposing || e.keyCode === 229) return;
      e.preventDefault();
      e.stopPropagation();
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
          onKeyDown={handleContentKeyDown}
          placeholder={
            browseDirectoryMode
              ? browsePath
                ? `${browsePath} 에서 검색…`
                : '디렉토리 탐색 · 폴더/파일 이름…'
              : chatGroupsPickerMode
                ? '채팅 그룹 이름…'
                : footnoteInsertPickerMode
                  ? '기존 각주 또는 직접 입력…'
                  : footnoteExistingPickerMode
                    ? '각주 번호·제목·URL…'
                    : circleNumberPickerMode
                      ? '원숫자 번호…'
                      : '설정, 채팅, 파일명, 경로…'
          }
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
            {contentSearchMode === 'live'
              ? '직접 검색'
              : indexEnabled && !hasIndex
                ? '색인 없음'
                : null}
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

      {browseDirectoryMode ? (
        <div className="border-b border-gray-100 px-3 py-1.5 text-[11px] text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted">
          <span className="font-medium text-gray-700 dark:text-odp-fg">디렉토리 탐색</span>
          <span className="mx-1.5">·</span>
          <span className="font-mono">{browsePath || '/'}</span>
        </div>
      ) : footnoteInsertPickerMode ? (
        <div className="border-b border-gray-100 px-3 py-1.5 text-[11px] text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted">
          <span className="font-medium text-gray-700 dark:text-odp-fg">각주 삽입</span>
          <span className="mx-1.5">·</span>
          <span>기존 각주 선택 또는 직접 입력</span>
        </div>
      ) : footnoteExistingPickerMode ? (
        <div className="border-b border-gray-100 px-3 py-1.5 text-[11px] text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted">
          <span className="font-medium text-gray-700 dark:text-odp-fg">기존 각주 선택</span>
          <span className="mx-1.5">·</span>
          <span>본문 커서에 [^N] 삽입</span>
        </div>
      ) : circleNumberPickerMode ? (
        <div className="border-b border-gray-100 px-3 py-1.5 text-[11px] text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted">
          <span className="font-medium text-gray-700 dark:text-odp-fg">원숫자 삽입</span>
          <span className="mx-1.5">·</span>
          <span>①–㊿ 중 선택해 커서에 삽입</span>
        </div>
      ) : null}

      <div
        id={listId}
        role="listbox"
        aria-label="검색 결과"
        className="h-[min(52vh,420px)] min-h-18 overscroll-contain"
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
                    : hit.kind === 'folder'
                      ? 'folder'
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
                    const keepOpen = onSelectHit(hit) === false;
                    if (!keepOpen) onOpenChange(false);
                  }}
                >
                  <HitLeading
                    hit={hit}
                    {...(getPresignedUrl ? { getPresignedUrl } : {})}
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
                          : hit.kind === 'folder'
                            ? hit.preview || hit.path || '폴더'
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
                  data-advanced-search=""
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
            data-advanced-search=""
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
