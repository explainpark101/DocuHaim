import { useMemo } from 'react';
import { Loader2, Pin, X } from 'lucide-react';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import {
  SELF_GROUP,
  formatMessageDateLabel,
  formatMessageTime,
  detectTimeZone,
  extractChatBodyAttachments,
} from '@/utils/chatWithMyself';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';

function PinnedCard({ msg, timeZone, onSelect, onUnpin, getPresignedUrl }) {
  const tz = timeZone || detectTimeZone();
  const time = formatMessageTime(msg.at, tz);
  const { text, attachments } = extractChatBodyAttachments(msg.body || '');
  const preview = text.replace(/\s+/g, ' ').trim().slice(0, 120);

  return (
    <div className="rounded-xl border border-black/8 bg-white px-3 py-2.5 shadow-sm dark:border-white/10 dark:bg-[#243044]">
      <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="truncate font-medium text-gray-700 dark:text-gray-200">
          {msg.group || SELF_GROUP}
        </span>
        <span className="shrink-0 tabular-nums">{time}</span>
      </div>
      <button
        type="button"
        onClick={() => onSelect?.(msg)}
        className="w-full text-left"
      >
        {preview ? (
          <div className="line-clamp-3 text-sm leading-relaxed text-gray-800 dark:text-odp-fg">
            {preview}
          </div>
        ) : null}
        {attachments.length > 0 ? (
          <ChatLinkedText
            text={msg.body}
            className={`text-sm text-gray-800 dark:text-odp-fg ${preview ? 'mt-2' : ''}`}
            getPresignedUrl={getPresignedUrl}
          />
        ) : !preview ? (
          <div className="text-sm text-gray-400">(빈 메시지)</div>
        ) : null}
      </button>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => onUnpin?.(msg)}
          className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
        >
          <Pin size={12} className="rotate-45" />
          고정 해제
        </button>
      </div>
    </div>
  );
}

/**
 * Pinned messages collection panel.
 */
export default function ChatPinnedPanel({
  open,
  onClose,
  results = [],
  loading = false,
  onSelectResult,
  onUnpin,
  timeZone,
  getPresignedUrl,
}) {
  const tz = timeZone || detectTimeZone();

  const resultItems = useMemo(() => {
    const out = [];
    let lastDate = '';
    for (const r of results) {
      const dateStr = r.dateStr || '';
      if (dateStr && dateStr !== lastDate) {
        out.push({
          type: 'date',
          key: `date-${dateStr}`,
          label: formatMessageDateLabel(r.at || `${dateStr}T12:00:00`, tz),
        });
        lastDate = dateStr;
      }
      out.push({ type: 'msg', key: `${dateStr}-${r.id}`, result: r });
    }
    return out;
  }, [results, tz]);

  if (!open) return null;

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft">
      <div className="sticky top-0 z-10 shrink-0 border-b border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
        <div className="flex items-center gap-2 px-3 py-2">
          <Pin size={16} className="shrink-0 text-gray-500" />
          <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            고정 메시지
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="고정 목록 닫기"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[#d7e4ef] px-2 py-3 dark:bg-[#0b1220]">
        {loading && results.length === 0 ? (
          <div className="flex justify-center py-8" aria-label="불러오는 중" role="status">
            <Loader2 size={18} className="animate-spin text-gray-400" />
          </div>
        ) : null}

        {resultItems.map((item) =>
          item.type === 'date' ? (
            <ChatDateDivider
              key={item.key}
              label={item.label}
              className="-mx-2 z-[1]"
              surfaceClassName="bg-[#d7e4ef] dark:bg-[#0b1220]"
              bubbleClassName="bg-[#c5d5e4] text-gray-700 dark:bg-[#152033] dark:text-gray-300"
            />
          ) : (
            <PinnedCard
              key={item.key}
              msg={item.result}
              timeZone={tz}
              onSelect={onSelectResult}
              onUnpin={onUnpin}
              getPresignedUrl={getPresignedUrl}
            />
          ),
        )}

        {!loading && results.length === 0 ? (
          <div className="py-10 text-center text-xs text-gray-500 dark:text-gray-400">
            고정된 메시지가 없습니다
          </div>
        ) : null}
      </div>
    </div>
  );
}
