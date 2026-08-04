import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MoreHorizontal,
  Reply,
  Trash2,
  FilePlus2,
  History,
  Pencil,
  Loader2,
  Pin,
  Copy,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { ContextMenu, DropdownMenu } from 'radix-ui';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import ChatMessageContextMenu from '@/components/chatWithMyself/ChatMessageContextMenu';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import ChatGroupAvatar from '@/components/chatWithMyself/ui/ChatGroupAvatar';
import {
  chatMenuContentClass,
  chatMenuDangerItemClass,
  chatMenuItemClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import {
  extractUrls,
  formatMessageDateLabel,
  formatMessageTime,
  isSelfGroup,
  detectTimeZone,
  localDateString,
  SELF_GROUP,
  formatChatMessagePlainText,
  formatChatMessageMarkdownCopy,
  resolveGroupLabel,
} from '@/utils/chatWithMyself';

/** Shrink feedback starts at this hold duration. */
const LONG_PRESS_THRESHOLD_MS = 250;
/** Context menu opens after this total hold duration. */
const LONG_PRESS_MENU_MS = 500;
const SWIPE_REPLY_THRESHOLD = 64;
const SWIPE_REPLY_MAX = 72;

/** Soft morph for long-press / selected bubble shape. */
const BUBBLE_SHAPE_SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
  mass: 0.85,
};
/** Matches Tailwind rounded-2xl + rounded-br/bl-md chat-tail. */
const BUBBLE_RADIUS_SELF = '1rem 1rem 0.375rem 1rem';
const BUBBLE_RADIUS_OTHER = '1rem 1rem 1rem 0.375rem';
const BUBBLE_RADIUS_PRESSED = '1.125rem';

const iconBtnClass =
  'inline-flex shrink-0 items-center justify-center rounded p-0.5 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 bg-transparent hover:bg-transparent focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400';

async function copyText(text) {
  const value = String(text ?? '');
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    /* ignore */
  }
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

function useEnteringMessageIds(messages) {
  const knownRef = useRef(null);
  const enterRef = useRef(new Set());
  const ids = messages.map((m) => m.id);

  if (knownRef.current === null) {
    knownRef.current = new Set(ids);
    enterRef.current = new Set();
  } else {
    const known = knownRef.current;
    const unknown = ids.filter((id) => !known.has(id));
    if (unknown.length > 0) {
      const suffix = [];
      for (let i = ids.length - 1; i >= 0; i -= 1) {
        if (known.has(ids[i])) break;
        suffix.push(ids[i]);
      }
      const suffixSet = new Set(suffix);
      const onlySuffix = unknown.every((id) => suffixSet.has(id));
      enterRef.current = onlySuffix ? new Set(suffix) : new Set();
      for (const id of unknown) known.add(id);
    } else {
      enterRef.current = new Set();
    }
  }

  return enterRef.current;
}

function useShiftHeldRef() {
  const shiftRef = useRef(false);
  useEffect(() => {
    const onDown = (e) => {
      if (e.key === 'Shift') shiftRef.current = true;
    };
    const onUp = (e) => {
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

function hasMessageEditHistory(msg) {
  return Boolean(msg?.editedAt);
}

function MessageActionItems({
  msg,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  onTogglePin,
  shiftHeldRef,
  _Item,
}) {
  const pinned = Boolean(msg?.pinnedAt);
  return (
    <>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onReply?.(msg)}
      >
        <Reply size={16} className="shrink-0 text-gray-500" />
        답장
      </_Item>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onEdit?.(msg)}
      >
        <Pencil size={16} className="shrink-0 text-gray-500" />
        수정
      </_Item>
      {hasMessageEditHistory(msg) ? (
        <_Item
          className={chatMenuItemClass}
          onSelect={() => onViewEditHistory?.(msg)}
        >
          <History size={16} className="shrink-0 text-gray-500" />
          수정기록 보기
        </_Item>
      ) : null}
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onTogglePin?.(msg)}
      >
        <Pin size={16} className={`shrink-0 text-gray-500 ${pinned ? 'fill-current' : ''}`} />
        {pinned ? '고정 해제' : '고정'}
      </_Item>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => {
          void copyText(formatChatMessagePlainText(msg));
        }}
      >
        <Copy size={16} className="shrink-0 text-gray-500" />
        내용 복사
      </_Item>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => {
          void copyText(formatChatMessageMarkdownCopy(msg));
        }}
      >
        <FileText size={16} className="shrink-0 text-gray-500" />
        MD 복사
      </_Item>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onAddToNote?.(msg)}
      >
        <FilePlus2 size={16} className="shrink-0 text-gray-500" />
        노트로 추가
      </_Item>
      <_Item
        className={chatMenuDangerItemClass}
        onPointerDown={(e) => {
          if (shiftHeldRef) shiftHeldRef.current = e.shiftKey;
        }}
        onSelect={() =>
          onDelete?.(msg, { skipConfirm: Boolean(shiftHeldRef?.current) })
        }
      >
        <Trash2 size={16} className="shrink-0" />
        삭제
      </_Item>
    </>
  );
}

function ReplyPreview({ msg, onOpen, replyGroupLabel }) {
  if (!msg?.replyTo) return null;
  const label = replyGroupLabel || msg.replyGroup || SELF_GROUP;
  const snippet = msg.replySnippet || '원본 메시지';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen?.(msg.replyTo);
      }}
      className="mb-1.5 flex w-full min-w-0 max-w-full items-stretch gap-1.5 overflow-hidden rounded-md border border-blue-200/80 border-l-4 border-l-blue-500 bg-blue-100 px-2 py-1 text-left shadow-sm dark:border-blue-800/60 dark:border-l-blue-400 dark:bg-blue-950 dark:shadow-none"
    >
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="truncate text-[11px] font-semibold text-blue-700 dark:text-blue-300">
          {label}
        </div>
        <div className="line-clamp-3 whitespace-pre-wrap wrap-anywhere text-[11px] text-gray-600 dark:text-gray-300">
          {snippet}
        </div>
      </div>
    </button>
  );
}

function MessageReplyButton({ msg, onReply }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onReply?.(msg);
      }}
      className={iconBtnClass}
      title="답장"
      aria-label="답장"
    >
      <Reply size={16} />
    </button>
  );
}

function MessageMoreButton({
  msg,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  onTogglePin,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
}) {
  if (coarse) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenMobileSheet?.(msg);
        }}
        className={iconBtnClass}
        title="메시지 옵션"
        aria-label="메시지 옵션"
      >
        <MoreHorizontal size={16} />
      </button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={iconBtnClass}
          title="메시지 옵션"
          aria-label="메시지 옵션"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={chatMenuContentClass}
          sideOffset={4}
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <MessageActionItems
            msg={msg}
            onReply={onReply}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddToNote={onAddToNote}
            onViewEditHistory={onViewEditHistory}
            onTogglePin={onTogglePin}
            shiftHeldRef={shiftHeldRef}
            _Item={DropdownMenu.Item}
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function MessageSideActions({
  msg,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  onTogglePin,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
  time,
}) {
  const syncing =
    msg?.pendingSync === 'send' || msg?.pendingSync === 'edit';
  const timeNode = syncing ? (
    <Loader2
      size={12}
      className="animate-spin text-gray-400"
      aria-label={msg.pendingSync === 'edit' ? '수정 저장 중' : '전송 중'}
    />
  ) : (
    <span className="text-[10px] text-gray-400 whitespace-nowrap">{time}</span>
  );

  const buttons = (
    <>
      <MessageReplyButton msg={msg} onReply={onReply} />
      <MessageMoreButton
        msg={msg}
        onReply={onReply}
        onDelete={onDelete}
        onEdit={onEdit}
        onAddToNote={onAddToNote}
        onViewEditHistory={onViewEditHistory}
        onTogglePin={onTogglePin}
        onOpenMobileSheet={onOpenMobileSheet}
        shiftHeldRef={shiftHeldRef}
        coarse={coarse}
      />
    </>
  );

  if (coarse) {
    return (
      <div className="flex shrink-0 flex-col items-center gap-0.5">
        {timeNode}
        {!syncing ? <div className="flex items-center gap-0.5">{buttons}</div> : null}
      </div>
    );
  }

  return (
    <div className="relative flex h-10 w-auto shrink-0 flex-col items-center justify-end">
      <div
        className={`flex items-center justify-center transition-transform duration-150 ease-out ${
          syncing ? '' : 'group-hover:-translate-y-4'
        }`}
      >
        {timeNode}
      </div>
      {!syncing ? (
        <div className="pointer-events-none absolute bottom-0 flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
          {buttons}
        </div>
      ) : null}
    </div>
  );
}

function MessageBubble({
  msg,
  showName,
  highlight,
  ogStorage,
  timeZone,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  onTogglePin,
  onOpenNote,
  onOpenReply,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
  rowSelected = false,
  isEditing = false,
  getPresignedUrl,
  groupIconPath = null,
  groupLabel = null,
  replyGroupLabel = null,
}) {
  const self = isSelfGroup(msg.group);
  const displayName = groupLabel || msg.group || SELF_GROUP;
  const urls = useMemo(() => extractUrls(msg.body), [msg.body]);
  const time = formatMessageTime(msg.at, timeZone || detectTimeZone());
  const longPressThresholdTimer = useRef(null);
  const longPressMenuTimer = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const offsetRef = useRef(0);
  const pointerIdRef = useRef(null);
  const swipeStartRef = useRef(null);
  const axisRef = useRef(null);
  const rowRef = useRef(null);
  const longPressOpenedRef = useRef(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [pressing, setPressing] = useState(false);
  const rowActive = contextMenuOpen || rowSelected || isEditing;
  const isDeleting = msg?.pendingSync === 'delete';
  /** Long-press / sheet / context — morph shape without snapping between states. */
  const shapeActive = !isDeleting && (pressing || rowSelected || contextMenuOpen);
  const syncing =
    msg?.pendingSync === 'send' || msg?.pendingSync === 'edit';
  const dimmed = syncing || isDeleting;
  const pinned = Boolean(msg?.pinnedAt);

  const clearLongPress = () => {
    if (longPressThresholdTimer.current) {
      clearTimeout(longPressThresholdTimer.current);
      longPressThresholdTimer.current = null;
    }
    if (longPressMenuTimer.current) {
      clearTimeout(longPressMenuTimer.current);
      longPressMenuTimer.current = null;
    }
  };

  const endPressVisual = () => {
    setPressing(false);
  };

  const openMobileSheetFromLongPress = () => {
    if (axisRef.current === 'h' || isDeleting) return;
    longPressOpenedRef.current = true;
    longPressMenuTimer.current = null;
    try {
      navigator.vibrate?.(12);
    } catch {
      /* ignore */
    }
    // Keep press morph; rowSelected takes over when finger lifts.
    onOpenMobileSheet?.(msg);
  };

  const applyOffset = (x) => {
    offsetRef.current = x;
    setOffsetX(x);
  };

  useEffect(() => {
    if (!isDeleting) return;
    setContextMenuOpen(false);
    applyOffset(0);
    clearLongPress();
    endPressVisual();
  }, [isDeleting]);

  const endSwipe = (pointerId) => {
    if (pointerIdRef.current !== pointerId) return;
    const x = offsetRef.current;
    const wasHorizontal = axisRef.current === 'h';
    pointerIdRef.current = null;
    swipeStartRef.current = null;
    axisRef.current = null;
    applyOffset(0);
    try {
      rowRef.current?.releasePointerCapture?.(pointerId);
    } catch {
      /* ignore */
    }
    if (
      wasHorizontal &&
      Math.abs(x) >= SWIPE_REPLY_THRESHOLD &&
      !longPressOpenedRef.current
    ) {
      if (!isDeleting) onReply?.(msg);
    }
  };

  const swipeIconOpacity = Math.min(1, Math.abs(offsetX) / SWIPE_REPLY_THRESHOLD);
  const swipeIconSide = offsetX >= 0 ? 'left' : 'right';
  const isSwiping = offsetX !== 0;

  const rowClassName = [
    'group relative -mx-3 flex w-[calc(100%+1.5rem)] max-w-[calc(100%+1.5rem)] gap-2 touch-pan-y px-3 py-1.5 rounded-md transition-[background-color,box-shadow] duration-200 ease-out overflow-x-hidden',
    self ? 'justify-end' : 'justify-start',
    isDeleting
      ? 'pointer-events-none select-none bg-red-500/20 dark:bg-red-500/25'
      : 'hover:bg-black/10 dark:hover:bg-white/10',
    !isDeleting && rowActive
      ? 'bg-sky-500/25 hover:bg-sky-500/30 dark:bg-sky-400/25 dark:hover:bg-sky-400/30'
      : '',
    highlight && !isDeleting ? 'ring-2 ring-amber-400' : '',
    isSwiping ? 'select-none' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const deletingStatus = (
    <div
      className="flex h-10 shrink-0 items-end justify-center gap-0.5 pb-0.5 text-red-600 dark:text-red-400"
      aria-label="삭제 중"
    >
      <Trash2 size={12} className="shrink-0" aria-hidden />
      <Loader2 size={12} className="animate-spin shrink-0" aria-hidden />
    </div>
  );

  const bubble = (
    <div
      id={`chat-msg-${msg.id}`}
      ref={rowRef}
      className={rowClassName}
      aria-disabled={isDeleting ? 'true' : undefined}
      data-row-selected={!isDeleting && rowActive ? 'true' : undefined}
      onPointerDown={(e) => {
        if (isDeleting) return;
        // Mouse: no swipe-to-reply (text selection / click only)
        if (e.pointerType === 'mouse') return;
        if (e.button !== 0 && e.button !== -1) return;
        if (e.target.closest('button, a, input, textarea')) return;
        pointerIdRef.current = e.pointerId;
        swipeStartRef.current = { x: e.clientX, y: e.clientY };
        axisRef.current = null;
        longPressOpenedRef.current = false;
        if (!coarse) return;
        clearLongPress();
        longPressThresholdTimer.current = setTimeout(() => {
          setPressing(true);
        }, LONG_PRESS_THRESHOLD_MS);
        longPressMenuTimer.current = setTimeout(() => {
          openMobileSheetFromLongPress();
        }, LONG_PRESS_MENU_MS);
      }}
      onPointerMove={(e) => {
        if (isDeleting) return;
        if (e.pointerType === 'mouse') return;
        if (pointerIdRef.current !== e.pointerId || !swipeStartRef.current) return;
        const dx = e.clientX - swipeStartRef.current.x;
        const dy = e.clientY - swipeStartRef.current.y;
        if (!axisRef.current) {
          if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
          axisRef.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
          if (axisRef.current === 'h') {
            clearLongPress();
            endPressVisual();
            try {
              rowRef.current?.setPointerCapture?.(e.pointerId);
            } catch {
              /* ignore */
            }
          } else if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            clearLongPress();
            endPressVisual();
          }
        }
        if (axisRef.current !== 'h') return;
        e.preventDefault();
        applyOffset(Math.max(-SWIPE_REPLY_MAX, Math.min(SWIPE_REPLY_MAX, dx)));
      }}
      onPointerUp={(e) => {
        if (isDeleting) return;
        if (e.pointerType === 'mouse') return;
        clearLongPress();
        endPressVisual();
        endSwipe(e.pointerId);
      }}
      onPointerCancel={(e) => {
        if (isDeleting) return;
        if (e.pointerType === 'mouse') return;
        clearLongPress();
        endPressVisual();
        endSwipe(e.pointerId);
      }}
      onContextMenu={(e) => {
        if (isDeleting || coarse) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 flex items-center ${
          swipeIconSide === 'left' ? 'left-3' : 'right-3'
        }`}
        style={{ opacity: swipeIconOpacity }}
        aria-hidden
      >
        <span className="rounded-full bg-blue-500/90 p-1.5 text-white shadow">
          <Reply size={16} />
        </span>
      </div>

      <div
        className={`flex min-w-0 w-full max-w-full gap-2 ${self ? 'justify-end' : 'justify-start'}`}
        style={{
          transform: offsetX ? `translateX(${offsetX}px)` : undefined,
          transition: offsetX === 0 ? 'transform 160ms ease-out' : undefined,
        }}
      >
        {!self ? (
          <ChatGroupAvatar
            name={displayName}
            colorKey={msg.group}
            size="lg"
            className="mt-1"
            iconPath={groupIconPath}
            getPresignedUrl={getPresignedUrl}
          />
        ) : (
          <div className="w-8 shrink-0" aria-hidden />
        )}
        <div
          className={`flex min-w-0 max-w-[min(85%,100%)] flex-1 flex-col ${
            self ? 'items-end' : 'items-start'
          }`}
        >
          {showName && !self ? (
            <div className="mb-0.5 max-w-full truncate px-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
              {displayName}
            </div>
          ) : null}
          <div className="flex min-w-0 max-w-full items-end gap-1">
            {self && !isDeleting ? (
              <MessageSideActions
                msg={msg}
                onReply={onReply}
                onDelete={onDelete}
                onEdit={onEdit}
                onAddToNote={onAddToNote}
                onViewEditHistory={onViewEditHistory}
                onTogglePin={onTogglePin}
                onOpenMobileSheet={onOpenMobileSheet}
                shiftHeldRef={shiftHeldRef}
                coarse={coarse}
                time={time}
              />
            ) : self && isDeleting ? (
              deletingStatus
            ) : null}
            <Motion.div
              className={`min-w-0 max-w-full overflow-hidden px-3 py-2 text-sm shadow-sm select-none origin-center will-change-transform [-webkit-touch-callout:none] transition-[background-color,border-color,opacity,box-shadow] duration-200 ease-out ${
                isDeleting
                  ? 'bg-red-100 text-gray-900 border border-red-300/80 shadow dark:bg-red-950/70 dark:text-odp-fgStrong dark:border-red-700/60'
                  : isEditing
                    ? 'bg-sky-500/25 text-gray-900 border border-sky-400/60 shadow dark:bg-sky-400/25 dark:text-odp-fgStrong dark:border-sky-400/50'
                    : self
                      ? 'bg-sky-100 text-gray-900 dark:bg-[#1a2740] dark:text-odp-fgStrong border border-sky-200/80 dark:border-sky-800/50 shadow'
                      : 'bg-white text-gray-900 dark:bg-[#243044] dark:text-odp-fgStrong border border-white/60 dark:border-white/10 shadow'
              }`}
              initial={false}
              animate={{
                scale: shapeActive ? 0.97 : 1,
                borderRadius: shapeActive
                  ? BUBBLE_RADIUS_PRESSED
                  : self
                    ? BUBBLE_RADIUS_SELF
                    : BUBBLE_RADIUS_OTHER,
                filter:
                  pressing && !isDeleting
                    ? 'brightness(0.92)'
                    : 'brightness(1)',
              }}
              transition={BUBBLE_SHAPE_SPRING}
              style={dimmed ? { opacity: 0.7 } : undefined}
            >
              <ReplyPreview
                msg={msg}
                onOpen={isDeleting ? undefined : onOpenReply}
                replyGroupLabel={replyGroupLabel}
              />
              {pinned ? (
                <div className="mb-1 inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-300">
                  <Pin size={10} className="fill-current" />
                  고정됨
                </div>
              ) : null}
              <ChatLinkedText
                text={msg.body}
                className={`min-w-0 max-w-full overflow-hidden whitespace-pre-wrap wrap-anywhere ${
                  isDeleting ? 'select-none' : 'select-text'
                }`}
                getPresignedUrl={getPresignedUrl}
              />
              {msg.notePath && !isDeleting ? (
                <button
                  type="button"
                  className="mt-1 inline-flex items-center gap-1 text-[10px] text-blue-600 underline-offset-2 hover:underline dark:text-blue-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenNote?.(msg.notePath, msg);
                  }}
                >
                  <ExternalLink size={10} />
                  노트 열기
                </button>
              ) : null}
              {msg.editedAt && !isDeleting ? (
                <button
                  type="button"
                  className="mt-1 text-[10px] text-gray-400 underline-offset-2 hover:text-gray-600 hover:underline dark:text-gray-500 dark:hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewEditHistory?.(msg);
                  }}
                >
                  수정됨
                </button>
              ) : null}
              {urls.map((u) => (
                <ChatOgCard key={u} url={u} ogStorage={ogStorage} />
              ))}
            </Motion.div>
            {!self && !isDeleting ? (
              <MessageSideActions
                msg={msg}
                onReply={onReply}
                onDelete={onDelete}
                onEdit={onEdit}
                onAddToNote={onAddToNote}
                onViewEditHistory={onViewEditHistory}
                onTogglePin={onTogglePin}
                onOpenMobileSheet={onOpenMobileSheet}
                shiftHeldRef={shiftHeldRef}
                coarse={coarse}
                time={time}
              />
            ) : !self && isDeleting ? (
              deletingStatus
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  if (coarse || isDeleting) {
    return bubble;
  }

  return (
    <ContextMenu.Root
      open={contextMenuOpen}
      onOpenChange={(next) => {
        if (isDeleting) {
          setContextMenuOpen(false);
          return;
        }
        setContextMenuOpen(next);
      }}
    >
      <ContextMenu.Trigger asChild disabled={isDeleting}>
        {bubble}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={chatMenuContentClass}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <MessageActionItems
            msg={msg}
            onReply={onReply}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddToNote={onAddToNote}
            onViewEditHistory={onViewEditHistory}
            onTogglePin={onTogglePin}
            shiftHeldRef={shiftHeldRef}
            _Item={ContextMenu.Item}
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export default function ChatMessageList({
  messages,
  ogStorage,
  timeZone,
  highlightId,
  editingMessageId = null,
  onReachTop,
  onReachBottom,
  loadingOlder = false,
  loadingNewer = false,
  hasMore = false,
  hasMoreNewer = false,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  onTogglePin,
  onOpenNote,
  onOpenReplyTarget,
  emptyHint,
  getPresignedUrl,
  /** @type {Map<string, string>|Record<string, string>|null} */
  groupIconByName = null,
  /** @type {Map<string, string>|Record<string, string>|null} */
  groupLabelByKey = null,
}) {
  const scrollerRef = useRef(null);
  const topSentinelRef = useRef(null);
  const bottomSentinelRef = useRef(null);
  const stickBottomRef = useRef(true);
  const prevLenRef = useRef(0);
  const [sheetMessage, setSheetMessage] = useState(null);
  const coarse = useIsCoarsePointer();
  const shiftHeldRef = useShiftHeldRef();
  const enterIds = useEnteringMessageIds(messages);

  useEffect(() => {
    if (!sheetMessage?.id) return;
    const current = messages.find((m) => m.id === sheetMessage.id);
    if (!current || current.pendingSync === 'delete') {
      setSheetMessage(null);
    }
  }, [messages, sheetMessage]);

  const items = useMemo(() => {
    const tz = timeZone || detectTimeZone();
    const out = [];
    let lastDate = '';
    let prevGroup = null;
    const labelOf = (key) => {
      if (groupLabelByKey instanceof Map) {
        return groupLabelByKey.get(key) || resolveGroupLabel(null, key);
      }
      if (groupLabelByKey?.[key]) return groupLabelByKey[key];
      return resolveGroupLabel(null, key);
    };
    for (const msg of messages) {
      const dateStr =
        msg.dateStr || localDateString(new Date(msg.at), tz);
      const dateLabel = formatMessageDateLabel(msg.at, tz);
      if (dateLabel !== lastDate) {
        out.push({
          type: 'date',
          key: `date-${dateStr}`,
          label: dateLabel,
          dateStr,
        });
        lastDate = dateLabel;
        prevGroup = null;
      }
      const showName = !isSelfGroup(msg.group) && msg.group !== prevGroup;
      out.push({
        type: 'msg',
        key: msg.id,
        msg,
        showName,
        groupLabel: labelOf(msg.group || SELF_GROUP),
      });
      prevGroup = msg.group;
    }
    return out;
  }, [messages, timeZone, groupLabelByKey]);

  // Sticky date needs a tall parent (divider + that day's messages). A wrapper
  // that only wraps the divider is the same height as the sticky node → no stick.
  const dayGroups = useMemo(() => {
    const groups = [];
    let current = null;
    for (const item of items) {
      if (item.type === 'date') {
        current = { key: item.key, date: item, messages: [] };
        groups.push(current);
        continue;
      }
      if (!current) {
        current = {
          key: `orphan-${item.key}`,
          date: null,
          messages: [],
        };
        groups.push(current);
      }
      current.messages.push(item);
    }
    return groups;
  }, [items]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const grewAtEnd = messages.length > prevLenRef.current;
    const prepended =
      messages.length > prevLenRef.current &&
      prevLenRef.current > 0 &&
      !stickBottomRef.current;
    prevLenRef.current = messages.length;

    // Skip auto-stick when highlighting a jumped-to message.
    if (highlightId) return;

    if (stickBottomRef.current && grewAtEnd && !prepended) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, highlightId]);

  useEffect(() => {
    if (highlightId) {
      const node = document.getElementById(`chat-msg-${highlightId}`);
      node?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  useEffect(() => {
    const root = scrollerRef.current;
    const sentinel = bottomSentinelRef.current;
    if (!root || !sentinel || !onReachBottom) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((e) => e.isIntersecting) &&
          hasMoreNewer &&
          !loadingNewer
        ) {
          Promise.resolve(onReachBottom());
        }
      },
      { root, rootMargin: '0px 0px 80px 0px', threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [onReachBottom, hasMoreNewer, loadingNewer]);

  return (
    <>
      <div
        ref={scrollerRef}
        className="min-h-0 max-h-full flex-1 overflow-y-auto overflow-x-clip overscroll-contain"
        onScroll={(e) => {
          const el = e.currentTarget;
          const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
          stickBottomRef.current = dist < 80;
        }}
      >
        {/* Messages stay in a narrower column; date dividers span the full chat scroller. */}
        <div className="relative flex w-full min-w-0 flex-col gap-3 py-3">
          <div
            ref={topSentinelRef}
            className="mx-auto h-1 w-full max-w-full px-3 md:max-w-[min(100%,50vw)]"
            aria-hidden
          />
          {loadingOlder ? (
            <div
              className="mx-auto flex w-full max-w-full justify-center px-3 py-2 md:max-w-[min(100%,50vw)]"
              aria-label="이전 대화 불러오는 중"
              role="status"
            >
              <Loader2 size={16} className="animate-spin text-gray-400" />
            </div>
          ) : null}
          {!hasMore && messages.length > 0 ? (
            <div className="mx-auto w-full max-w-full px-3 py-1 text-center text-[10px] text-gray-400 md:max-w-[min(100%,50vw)]">
              더 이상 없음
            </div>
          ) : null}
          {dayGroups.map((group) => (
            <div
              key={group.key}
              className="relative flex w-full min-w-0 flex-col gap-3"
            >
              {group.date ? (
                <ChatDateDivider
                  id={
                    group.date.dateStr
                      ? `chat-date-${group.date.dateStr}`
                      : undefined
                  }
                  label={group.date.label}
                />
              ) : null}
              <div className="mx-auto flex w-full max-w-full min-w-0 flex-col gap-3 px-3 md:max-w-[min(100%,50vw)]">
                <AnimatePresence initial={false} mode="popLayout">
                  {group.messages.map((item) => (
                    <Motion.div
                      key={item.key}
                      layout
                      className="min-w-0 max-w-full"
                      initial={
                        enterIds.has(item.msg.id)
                          ? { opacity: 0, y: 14, scale: 0.98 }
                          : false
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.94,
                        y: -10,
                        filter: 'blur(2px)',
                        transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 30,
                        mass: 0.8,
                      }}
                    >
                      <MessageBubble
                        msg={item.msg}
                        showName={item.showName}
                        highlight={highlightId === item.msg.id}
                        ogStorage={ogStorage}
                        timeZone={timeZone}
                        onReply={onReply}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onAddToNote={onAddToNote}
                        onViewEditHistory={onViewEditHistory}
                        onTogglePin={onTogglePin}
                        onOpenNote={onOpenNote}
                        onOpenReply={onOpenReplyTarget}
                        onOpenMobileSheet={setSheetMessage}
                        shiftHeldRef={shiftHeldRef}
                        coarse={coarse}
                        rowSelected={sheetMessage?.id === item.msg.id}
                        isEditing={editingMessageId === item.msg.id}
                        getPresignedUrl={getPresignedUrl}
                        groupIconPath={
                          groupIconByName instanceof Map
                            ? groupIconByName.get(item.msg.group) || null
                            : groupIconByName?.[item.msg.group] || null
                        }
                        groupLabel={item.groupLabel}
                        replyGroupLabel={
                          groupLabelByKey instanceof Map
                            ? groupLabelByKey.get(item.msg.replyGroup) ||
                              item.msg.replyGroup
                            : groupLabelByKey?.[item.msg.replyGroup] ||
                              item.msg.replyGroup
                        }
                      />
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
          {messages.length === 0 ? (
            <div className="mx-auto w-full max-w-full px-3 py-16 text-center text-sm text-gray-400 md:max-w-[min(100%,50vw)]">
              {emptyHint || '아직 채팅이 없습니다'}
            </div>
          ) : null}
          {loadingNewer ? (
            <div
              className="mx-auto flex w-full max-w-full justify-center px-3 py-2 md:max-w-[min(100%,50vw)]"
              aria-label="이후 대화 불러오는 중"
              role="status"
            >
              <Loader2 size={16} className="animate-spin text-gray-400" />
            </div>
          ) : null}
          <div
            ref={bottomSentinelRef}
            className="mx-auto h-1 w-full max-w-full px-3 md:max-w-[min(100%,50vw)]"
            aria-hidden
          />
        </div>
      </div>
      <ChatMessageContextMenu
        open={Boolean(sheetMessage)}
        message={sheetMessage}
        onOpenChange={(next) => {
          if (!next) setSheetMessage(null);
        }}
        onReply={onReply}
        onDelete={onDelete}
        onEdit={onEdit}
        onAddToNote={onAddToNote}
        onViewEditHistory={onViewEditHistory}
        onTogglePin={onTogglePin}
        shiftHeldRef={shiftHeldRef}
      />
    </>
  );
}
