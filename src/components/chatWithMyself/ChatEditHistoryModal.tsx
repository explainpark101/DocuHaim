import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog } from 'radix-ui';
import { Loader2, Trash2 } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import ChatMessageBody from '@/components/chatWithMyself/ChatMessageBody';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import {
  AdaptiveContextMenu,
  AdaptiveMenuItem,
} from '@/components/shared/contextMenu/AdaptiveContextMenu';
import {
  chatDialogOverlayClass,
  chatMenuContentClass,
  chatMenuDangerItemClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import { usePressableCardMenu } from '@/components/chatWithMyself/usePressableCardMenu';
import {
  detectTimeZone,
  formatMessageTime,
  isChatMessageMarkdown,
  resolveGroupLabel,
  SELF_GROUP,
} from '@/utils/chatWithMyself';

const PAGE_SIZE = 10;

type HistoryEntry = { at: string; body: string; group: string; key?: string };

type ConfirmTarget =
  | { kind: 'one'; entry: HistoryEntry }
  | { kind: 'all' };

function formatHistoryWhen(iso: any, timeZone: any) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(iso));
  } catch {
    return formatMessageTime(iso, timeZone) || iso;
  }
}

function useShiftHeldRef() {
  const shiftRef = useRef(false);
  useEffect(() => {
    const onDown = (e: any) => {
      if (e.key === 'Shift') shiftRef.current = true;
    };
    const onUp = (e: any) => {
      if (e.key === 'Shift') shiftRef.current = false;
    };
    const onBlur = () => {
      shiftRef.current = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);
  return shiftRef;
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  });
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = () => setCoarse(mq.matches || window.innerWidth < 768);
    mq.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);
  return coarse;
}

/**
 * Edit-history card with chat-bubble press morph + context menu (right-click / long-press).
 */
function HistoryEntryCard({
  entry,
  indexLabel,
  timeZone,
  groups,
  getPresignedUrl,
  canDelete,
  deleting,
  onRequestDelete,
  shiftHeldRef,
  coarse,
  markdown = false
}: any) {
  const {
    contextMenuOpen,
    setContextMenuOpen,
    motionAnimate,
    motionTransition,
    interactiveClass,
    bindPress,
  } = usePressableCardMenu({ enabled: canDelete, coarse });

  const card = (
    <Motion.div
      className={`rounded-xl border border-gray-200 bg-gray-50 p-3 origin-center will-change-transform select-none [-webkit-touch-callout:none] transition-[background-color,box-shadow] duration-200 ease-out dark:border-odp-borderSoft dark:bg-odp-surface ${interactiveClass}`}
      initial={false}
      animate={motionAnimate}
      transition={motionTransition}
      {...(canDelete ? bindPress : {})}
    >
      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-odp-fg">
          {indexLabel}
        </span>
        <span>{formatHistoryWhen(entry.at, timeZone)}</span>
        <span className="text-gray-400">·</span>
        <span>{resolveGroupLabel(groups, entry.group || SELF_GROUP)}</span>
      </div>
      <ChatMessageBody
        markdown={Boolean(markdown)}
        text={entry.body || ''}
        className={`${
          markdown ? '' : 'whitespace-pre-wrap '
        }wrap-break-word text-sm text-gray-800 dark:text-odp-fgStrong select-text`}
        getPresignedUrl={getPresignedUrl}
      />
    </Motion.div>
  );

  if (!canDelete) {
    return card;
  }

  return (
    <AdaptiveContextMenu
      open={contextMenuOpen}
      onOpenChange={setContextMenuOpen}
      title={(entry.body || '').replace(/\s+/g, ' ').slice(0, 120) || '(빈 기록)'}
      subtitle="수정 기록"
      contentClassName={chatMenuContentClass}
      trigger={card}
    >
      <AdaptiveMenuItem
        className={chatMenuDangerItemClass}
        danger
        disabled={deleting}
        onPointerDown={(e: any) => {
          if (e.shiftKey) shiftHeldRef.current = true;
        }}
        onSelect={() => {
          onRequestDelete?.(entry, {
            skipConfirm: shiftHeldRef.current,
          });
        }}
      >
        <Trash2 size={16} className="shrink-0" />
        이 기록 삭제
      </AdaptiveMenuItem>
    </AdaptiveContextMenu>
  );
}

/**
 * Modal listing previous versions of an edited chat message (newest first).
 * Versions are loaded page-by-page from `.chat-with-myself/edits/<messageId>/`.
 * Entries can be deleted via context menu (right-click / long-press); Shift skips confirm.
 */
export default function ChatEditHistoryModal({
  open,
  message,
  onOpenChange,
  timeZone,
  getPresignedUrl,
  groups = [],
  onLoadHistoryPage,
  onDeleteHistoryEntry,
  onDeleteAllHistory
}: any) {
  const tz = timeZone || detectTimeZone();
  const isOpen = Boolean(open && message);
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);
  const shiftHeldRef = useShiftHeldRef();
  const coarse = useIsCoarsePointer();
  const messageId = message?.id || '';

  const loadPage = useCallback(
    async (nextOffset: any, {
      append
    }: any) => {
      if (!messageId || !onLoadHistoryPage) {
        setEntries([]);
        setHasMore(false);
        setTotal(0);
        return;
      }
      if (append) {
        if (loadingMoreRef.current) return;
        loadingMoreRef.current = true;
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError('');
      }
      try {
        const page = await onLoadHistoryPage(message, {
          offset: nextOffset,
          limit: PAGE_SIZE,
        });
        const list = Array.isArray(page?.entries) ? page.entries : [];
        setEntries((prev) => (append ? [...prev, ...list] : list));
        setOffset(Number(page?.nextOffset) || nextOffset + list.length);
        setHasMore(Boolean(page?.hasMore));
        setTotal(Number(page?.total) || 0);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : '수정 기록을 불러오지 못했습니다.');
        if (!append) {
          setEntries([]);
          setHasMore(false);
          setTotal(0);
        }
      } finally {
        if (append) {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [message, messageId, onLoadHistoryPage],
  );

  useEffect(() => {
    if (!isOpen) {
      setEntries([]);
      setOffset(0);
      setHasMore(false);
      setTotal(0);
      setError('');
      setLoading(false);
      setLoadingMore(false);
      setDeleting(false);
      setConfirmTarget(null);
      loadingMoreRef.current = false;
      return undefined;
    }
    void loadPage(0, { append: false });
    return undefined;
  }, [isOpen, messageId, loadPage]);

  useEffect(() => {
    if (!isOpen || !hasMore) return undefined;
    const root = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return undefined;
    const io = new IntersectionObserver(
      (rows) => {
        if (rows.some((r) => r.isIntersecting)) {
          void loadPage(offset, { append: true });
        }
      },
      { root, rootMargin: '80px', threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [isOpen, hasMore, offset, loadPage]);

  const runDeleteEntry = useCallback(
    async (entry: any) => {
      if (!message || !entry || deleting) return;
      setDeleting(true);
      setError('');
      try {
        await onDeleteHistoryEntry?.(message, entry);
        await loadPage(0, { append: false });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : '수정 기록 삭제에 실패했습니다.');
      } finally {
        setDeleting(false);
      }
    },
    [message, deleting, onDeleteHistoryEntry, loadPage],
  );

  const runDeleteAll = useCallback(async () => {
    if (!message || deleting) return;
    setDeleting(true);
    setError('');
    try {
      await onDeleteAllHistory?.(message);
      await loadPage(0, { append: false });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '수정 기록 전체 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  }, [message, deleting, onDeleteAllHistory, loadPage]);

  const requestDeleteEntry = useCallback(
    (entry: any, { skipConfirm = false } = {}) => {
      if (!entry || deleting) return;
      if (skipConfirm || shiftHeldRef.current) {
        void runDeleteEntry(entry);
        return;
      }
      setConfirmTarget({ kind: 'one', entry });
    },
    [deleting, runDeleteEntry, shiftHeldRef],
  );

  const requestDeleteAll = useCallback(
    ({ skipConfirm = false } = {}) => {
      if (total <= 0 || deleting) return;
      if (skipConfirm || shiftHeldRef.current) {
        void runDeleteAll();
        return;
      }
      setConfirmTarget({ kind: 'all' });
    },
    [total, deleting, runDeleteAll, shiftHeldRef],
  );

  const confirmDelete = useCallback(() => {
    const target = confirmTarget;
    setConfirmTarget(null);
    if (!target) return;
    if (target.kind === 'all') {
      void runDeleteAll();
      return;
    }
    if (target.kind === 'one' && target.entry) {
      void runDeleteEntry(target.entry);
    }
  }, [confirmTarget, runDeleteAll, runDeleteEntry]);

  const currentGroupLabel = resolveGroupLabel(
    groups,
    message?.group || SELF_GROUP,
  );
  const messageMarkdown = isChatMessageMarkdown(message);

  const canDelete = Boolean(onDeleteHistoryEntry) && total > 0;
  const canDeleteAll = Boolean(onDeleteAllHistory) && total > 0;

  return <>
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next: any) => {
        if (!next && (deleting || confirmTarget)) return;
        onOpenChange?.(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[201] flex max-h-[min(80vh,640px)] w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          aria-describedby={undefined}
        >
          <div className="shrink-0 border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                  수정 기록
                </Dialog.Title>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
                  {loading
                    ? '불러오는 중…'
                    : total > 0
                      ? `이전 버전 ${total}개 (최신순)`
                      : '저장된 이전 버전이 없습니다'}
                </p>
              </div>
              {canDeleteAll ? (
                <button
                  type="button"
                  disabled={deleting}
                  title="Shift+클릭 시 확인 생략"
                  onPointerDown={(e: any) => {
                    if (e.shiftKey) shiftHeldRef.current = true;
                  }}
                  onClick={() => requestDeleteAll()}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <Trash2 size={12} />
                  전부 삭제
                </button>
              ) : null}
            </div>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {message?.editedAt ? (
              <div className="mb-3 rounded-xl border border-sky-200/80 bg-sky-50/80 p-3 dark:border-sky-800/50 dark:bg-sky-950/40">
                <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-sky-700 dark:text-sky-300">
                    현재
                  </span>
                  <span>{formatHistoryWhen(message.editedAt, tz)}</span>
                  <span className="text-gray-400">·</span>
                  <span>{currentGroupLabel}</span>
                </div>
                <ChatMessageBody
                  message={message}
                  text={message.body || ''}
                  className={`${
                    messageMarkdown ? '' : 'whitespace-pre-wrap '
                  }wrap-break-word text-sm text-gray-800 dark:text-odp-fgStrong`}
                  getPresignedUrl={getPresignedUrl}
                />
              </div>
            ) : null}

            {error ? (
              <p className="py-4 text-center text-xs text-red-500">{error}</p>
            ) : null}

            {loading ? (
              <div className="flex items-center justify-center gap-2 py-10 text-xs text-gray-400">
                <Loader2 size={14} className="animate-spin" />
                불러오는 중
              </div>
            ) : entries.length === 0 && !error ? (
              <p className="py-6 text-center text-xs text-gray-400 dark:text-odp-muted">
                이 메시지에 쌓인 수정 기록이 없습니다.
              </p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {entries.map((entry, i) => {
                  const entryKey = entry.key || `${entry.at}-${i}`;
                  return (
                    <li key={entryKey}>
                      <HistoryEntryCard
                        entry={entry}
                        indexLabel={`이전 #${Math.max(1, total - i)}`}
                        timeZone={tz}
                        groups={groups}
                        getPresignedUrl={getPresignedUrl}
                        canDelete={canDelete}
                        deleting={deleting}
                        onRequestDelete={requestDeleteEntry}
                        shiftHeldRef={shiftHeldRef}
                        coarse={coarse}
                        markdown={messageMarkdown}
                      />
                    </li>
                  );
                })}
              </ul>
            )}

            <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
            {loadingMore ? (
              <div className="flex items-center justify-center gap-2 py-3 text-[11px] text-gray-400">
                <Loader2 size={12} className="animate-spin" />
                더 불러오는 중
              </div>
            ) : null}
            {deleting ? (
              <div className="flex items-center justify-center gap-2 py-2 text-[11px] text-gray-400">
                <Loader2 size={12} className="animate-spin" />
                삭제 중
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 justify-end border-t border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <Dialog.Close asChild>
              <button
                type="button"
                disabled={deleting}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-40 dark:bg-odp-surface dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
              >
                닫기
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

    <ConfirmModal
      isOpen={Boolean(confirmTarget)}
      title={
        confirmTarget?.kind === 'all' ? '수정 기록 전부 삭제' : '수정 기록 삭제'
      }
      message={
        confirmTarget?.kind === 'all'
          ? `이전 버전 ${total}개를 모두 삭제할까요? 이 작업은 되돌릴 수 없습니다.`
          : `이 이전 버전을 삭제할까요?\n\n${String(
              confirmTarget?.kind === 'one' ? confirmTarget.entry?.body || '' : '',
            )
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 120) || '(빈 버전)'}`
      }
      variant="danger"
      confirmLabel="삭제"
      cancelLabel="취소"
      onConfirm={confirmDelete}
      onCancel={() => setConfirmTarget(null)}
    />
  </>;
}
