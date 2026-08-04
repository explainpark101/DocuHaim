import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog } from 'radix-ui';
import { Loader2 } from 'lucide-react';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import { chatDialogOverlayClass } from '@/components/chatWithMyself/ui/chatUiStyles';
import {
  detectTimeZone,
  formatMessageTime,
  resolveGroupLabel,
  SELF_GROUP,
} from '@/utils/chatWithMyself';

const PAGE_SIZE = 10;

function formatHistoryWhen(iso, timeZone) {
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

/**
 * Modal listing previous versions of an edited chat message (newest first).
 * Versions are loaded page-by-page from `.chat-with-myself/edits/<messageId>/`.
 */
export default function ChatEditHistoryModal({
  open,
  message,
  onOpenChange,
  timeZone,
  getPresignedUrl,
  groups = [],
  onLoadHistoryPage,
}) {
  const tz = timeZone || detectTimeZone();
  const isOpen = Boolean(open && message);
  const [entries, setEntries] = useState(
    /** @type {Array<{ at: string, body: string, group: string, key?: string }>} */ ([]),
  );
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const sentinelRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const loadingMoreRef = useRef(false);
  const messageId = message?.id || '';

  const loadPage = useCallback(
    async (nextOffset, { append }) => {
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
      } catch (e) {
        setError(e?.message || '수정 기록을 불러오지 못했습니다.');
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

  const currentGroupLabel = resolveGroupLabel(
    groups,
    message?.group || SELF_GROUP,
  );

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[201] flex max-h-[min(80vh,640px)] w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          aria-describedby={undefined}
        >
          <div className="shrink-0 border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
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
                <ChatLinkedText
                  text={message.body || ''}
                  className="whitespace-pre-wrap wrap-break-word text-sm text-gray-800 dark:text-odp-fgStrong"
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
                {entries.map((entry, i) => (
                  <li
                    key={entry.key || `${entry.at}-${i}`}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-odp-borderSoft dark:bg-odp-surface"
                  >
                    <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-gray-700 dark:text-odp-fg">
                        이전 #{total - i}
                      </span>
                      <span>{formatHistoryWhen(entry.at, tz)}</span>
                      <span className="text-gray-400">·</span>
                      <span>
                        {resolveGroupLabel(groups, entry.group || SELF_GROUP)}
                      </span>
                    </div>
                    <ChatLinkedText
                      text={entry.body || ''}
                      className="whitespace-pre-wrap wrap-break-word text-sm text-gray-800 dark:text-odp-fgStrong"
                      getPresignedUrl={getPresignedUrl}
                    />
                  </li>
                ))}
              </ul>
            )}

            <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
            {loadingMore ? (
              <div className="flex items-center justify-center gap-2 py-3 text-[11px] text-gray-400">
                <Loader2 size={12} className="animate-spin" />
                더 불러오는 중
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 justify-end border-t border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-odp-surface dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
              >
                닫기
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
