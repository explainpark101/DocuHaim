import { useEffect, useMemo, useRef, useState } from 'react';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import ChatMessageContextMenu from '@/components/chatWithMyself/ChatMessageContextMenu';
import {
  extractUrls,
  formatMessageDateLabel,
  formatMessageTime,
  isSelfGroup,
  detectTimeZone,
  SELF_GROUP,
} from '@/utils/chatWithMyself';

const LONG_PRESS_MS = 480;

function groupColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return { bg: `hsl(${hue} 55% 42%)` };
}

function ReplyPreview({ msg, onOpen }) {
  if (!msg?.replyTo) return null;
  const label = msg.replyGroup || SELF_GROUP;
  const snippet = msg.replySnippet || '원본 메시지';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen?.(msg.replyTo);
      }}
      className="mb-1.5 flex w-full max-w-full items-stretch gap-1.5 rounded-md border-l-4 border-blue-500 bg-black/5 px-2 py-1 text-left dark:bg-white/10"
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold text-blue-700 dark:text-blue-300">
          {label}
        </div>
        <div className="truncate text-[11px] text-gray-600 dark:text-gray-300">{snippet}</div>
      </div>
    </button>
  );
}

function MessageBubble({
  msg,
  showName,
  highlight,
  ogStorage,
  timeZone,
  onContextMenu,
  onOpenReply,
}) {
  const self = isSelfGroup(msg.group);
  const urls = useMemo(() => extractUrls(msg.body), [msg.body]);
  const colors = !self ? groupColor(msg.group || '') : null;
  const time = formatMessageTime(msg.at, timeZone || detectTimeZone());
  const longPressTimer = useRef(null);
  const touchStart = useRef(null);

  const clearLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <div
      id={`chat-msg-${msg.id}`}
      className={`flex w-full gap-2 ${self ? 'justify-end' : 'justify-start'} ${
        highlight ? 'ring-2 ring-amber-400 rounded-lg' : ''
      }`}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.({ message: msg, x: e.clientX, y: e.clientY, mode: 'menu' });
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        touchStart.current = { x: t.clientX, y: t.clientY };
        clearLongPress();
        longPressTimer.current = setTimeout(() => {
          onContextMenu?.({
            message: msg,
            x: t.clientX,
            y: t.clientY,
            mode: 'modal',
          });
          longPressTimer.current = null;
        }, LONG_PRESS_MS);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        const start = touchStart.current;
        if (!t || !start) return;
        if (Math.abs(t.clientX - start.x) > 10 || Math.abs(t.clientY - start.y) > 10) {
          clearLongPress();
        }
      }}
      onTouchEnd={clearLongPress}
      onTouchCancel={clearLongPress}
    >
      {!self ? (
        <div
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: colors.bg }}
          title={msg.group}
        >
          {(msg.group || '?').slice(0, 1)}
        </div>
      ) : (
        <div className="w-8 shrink-0" />
      )}
          <div className={`flex w-full max-w-[85%] flex-col ${self ? 'items-end' : 'items-start'}`}>
        {showName && !self ? (
          <div className="mb-0.5 px-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
            {msg.group}
          </div>
        ) : null}
        <div className="flex items-end gap-1.5">
          {self ? (
            <span className="mb-0.5 text-[10px] text-gray-400 whitespace-nowrap">{time}</span>
          ) : null}
          <div
            className={`rounded-2xl px-3 py-2 text-sm shadow-sm select-none ${
              self
                ? 'rounded-br-md bg-yellow-300 text-gray-900 dark:bg-yellow-500/90'
                : 'rounded-bl-md bg-white text-gray-900 dark:bg-odp-surface dark:text-odp-fgStrong border border-gray-100 dark:border-odp-borderSoft'
            }`}
          >
            <ReplyPreview msg={msg} onOpen={onOpenReply} />
            <div className="whitespace-pre-wrap break-words select-text">{msg.body}</div>
            {urls.map((u) => (
              <ChatOgCard key={u} url={u} ogStorage={ogStorage} />
            ))}
          </div>
          {!self ? (
            <span className="mb-0.5 text-[10px] text-gray-400 whitespace-nowrap">{time}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ChatMessageList({
  messages,
  ogStorage,
  timeZone,
  highlightId,
  onReachTop,
  loadingOlder = false,
  hasMore = false,
  onReply,
  onDelete,
  onOpenReplyTarget,
}) {
  const scrollerRef = useRef(null);
  const topSentinelRef = useRef(null);
  const stickBottomRef = useRef(true);
  const prevLenRef = useRef(0);
  const [menu, setMenu] = useState(null);

  const items = useMemo(() => {
    const tz = timeZone || detectTimeZone();
    const out = [];
    let lastDate = '';
    let prevGroup = null;
    for (const msg of messages) {
      const dateLabel = formatMessageDateLabel(msg.at, tz);
      if (dateLabel !== lastDate) {
        out.push({ type: 'date', key: `date-${dateLabel}-${msg.at}`, label: dateLabel });
        lastDate = dateLabel;
        prevGroup = null;
      }
      const showName = !isSelfGroup(msg.group) && msg.group !== prevGroup;
      out.push({ type: 'msg', key: msg.id, msg, showName });
      prevGroup = msg.group;
    }
    return out;
  }, [messages, timeZone]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const grewAtEnd = messages.length > prevLenRef.current;
    const prepended =
      messages.length > prevLenRef.current &&
      prevLenRef.current > 0 &&
      !stickBottomRef.current;
    prevLenRef.current = messages.length;

    if (stickBottomRef.current && grewAtEnd && !prepended) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (highlightId) {
      const node = document.getElementById(`chat-msg-${highlightId}`);
      node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightId, messages]);

  useEffect(() => {
    const root = scrollerRef.current;
    const sentinel = topSentinelRef.current;
    if (!root || !sentinel || !onReachTop) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && hasMore && !loadingOlder) {
          stickBottomRef.current = false;
          const prevHeight = root.scrollHeight;
          const prevTop = root.scrollTop;
          Promise.resolve(onReachTop()).then(() => {
            requestAnimationFrame(() => {
              const delta = root.scrollHeight - prevHeight;
              root.scrollTop = prevTop + delta;
            });
          });
        }
      },
      { root, rootMargin: '80px 0px 0px 0px', threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [onReachTop, hasMore, loadingOlder]);

  return (
    <>
      <div
        ref={scrollerRef}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3"
        onScroll={(e) => {
          const el = e.currentTarget;
          const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
          stickBottomRef.current = dist < 80;
        }}
      >
        <div ref={topSentinelRef} className="h-1 w-full" aria-hidden />
        {loadingOlder ? (
          <div className="text-center text-xs text-gray-400 py-2">이전 대화 불러오는 중…</div>
        ) : null}
        {!hasMore && messages.length > 0 ? (
          <div className="text-center text-[10px] text-gray-400 py-1">더 이상 없음</div>
        ) : null}
        {items.map((item) =>
          item.type === 'date' ? (
            <div key={item.key} className="flex justify-center py-1">
              <span className="rounded-full bg-black/10 dark:bg-white/10 px-3 py-0.5 text-[11px] text-gray-600 dark:text-gray-300">
                {item.label}
              </span>
            </div>
          ) : (
            <MessageBubble
              key={item.key}
              msg={item.msg}
              showName={item.showName}
              highlight={highlightId === item.msg.id}
              ogStorage={ogStorage}
              timeZone={timeZone}
              onContextMenu={setMenu}
              onOpenReply={onOpenReplyTarget}
            />
          ),
        )}
        {messages.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">아직 채팅이 없습니다</div>
        ) : null}
      </div>
      <ChatMessageContextMenu
        mode={menu?.mode || 'menu'}
        x={menu?.x}
        y={menu?.y}
        message={menu?.message || null}
        onClose={() => setMenu(null)}
        onReply={onReply}
        onDelete={onDelete}
      />
    </>
  );
}
