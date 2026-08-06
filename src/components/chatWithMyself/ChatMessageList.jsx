import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  ChevronsDownUp,
  ChevronsUpDown,
  SmilePlus,
  Share2,
} from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { VList } from 'virtua';
import { ContextMenu, DropdownMenu } from 'radix-ui';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import ChatMessageBody from '@/components/chatWithMyself/ChatMessageBody';
import ChatMessageContextMenu from '@/components/chatWithMyself/ChatMessageContextMenu';
import ChatMessageReactions from '@/components/chatWithMyself/ChatMessageReactions';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import ChatGroupAvatar from '@/components/chatWithMyself/ui/ChatGroupAvatar';
import { useViewportClampNudge } from '@/components/chatWithMyself/useViewportClampNudge';
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
  isChatMessageMarkdown,
  detectTimeZone,
  localDateString,
  SELF_GROUP,
  formatChatMessagePlainText,
  formatChatMessageMarkdownCopy,
  resolveGroupLabel,
  canOfferWebShare,
  shareChatMessage,
} from '@/utils/chatWithMyself';
import {
  CHAT_MESSAGE_SCROLL_MARGIN,
} from '@/utils/chatWithMyself/scrollToMessage';

/** Near-bottom threshold for stick-to-bottom (px). */
const STICK_BOTTOM_PX = 80;
/** Near-edge threshold to trigger older/newer day load (px). */
const LOAD_EDGE_PX = 120;

/** Shrink feedback starts at this hold duration. */
const LONG_PRESS_THRESHOLD_MS = 250;
/** Context menu opens after this total hold duration. */
const LONG_PRESS_MENU_MS = 500;
const SWIPE_REPLY_THRESHOLD = 64;
const SWIPE_REPLY_MAX = 72;
/** Same-group messages within this window omit name/avatar and use tight spacing. */
const GROUP_CLUSTER_MS = 10 * 60 * 1000;

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
  onToggleCollapse,
  onOpenReactionPicker,
  shiftHeldRef,
  getPresignedUrl,
  _Item,
}) {
  const pinned = Boolean(msg?.pinnedAt);
  const collapsed = msg?.collapsed === '1' || msg?.collapsed === true;
  const shareAvailable = canOfferWebShare();
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
        onSelect={() => onOpenReactionPicker?.(msg)}
      >
        <SmilePlus size={16} className="shrink-0 text-gray-500" />
        반응 추가
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
        onSelect={() => onToggleCollapse?.(msg)}
      >
        {collapsed ? (
          <ChevronsUpDown size={16} className="shrink-0 text-gray-500" />
        ) : (
          <ChevronsDownUp size={16} className="shrink-0 text-gray-500" />
        )}
        {collapsed ? '펼치기' : '접기'}
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
      {shareAvailable ? (
        <_Item
          className={chatMenuItemClass}
          onSelect={() => {
            void shareChatMessage(msg, { getPresignedUrl });
          }}
        >
          <Share2 size={16} className="shrink-0 text-gray-500" />
          공유
        </_Item>
      ) : null}
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
  onToggleCollapse,
  onOpenReactionPicker,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
  getPresignedUrl,
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
            onToggleCollapse={onToggleCollapse}
            onOpenReactionPicker={onOpenReactionPicker}
            shiftHeldRef={shiftHeldRef}
            getPresignedUrl={getPresignedUrl}
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
  onToggleCollapse,
  onOpenReactionPicker,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
  time,
  getPresignedUrl,
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
        onToggleCollapse={onToggleCollapse}
        onOpenReactionPicker={onOpenReactionPicker}
        onOpenMobileSheet={onOpenMobileSheet}
        shiftHeldRef={shiftHeldRef}
        coarse={coarse}
        getPresignedUrl={getPresignedUrl}
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

const MessageBubble = memo(function MessageBubble({
  msg,
  showName,
  clustered = false,
  highlight,
  ogStorage,
  timeZone,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  onTogglePin,
  onToggleCollapse,
  onToggleReaction,
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
  externalReactionPickerOpen = false,
  onReactionPickerOpenChange,
  noteExists,
  allowOgEmbed = true,
  /** will-change + brightness press filter (perf toggle). */
  enableBubblePressFx = true,
  /** Reserve empty reaction-row height (typically the last list message). */
  reserveReactionSpace = false,
}) {
  const self = isSelfGroup(msg.group);
  const displayName = groupLabel || msg.group || SELF_GROUP;
  const urls = useMemo(() => extractUrls(msg.body), [msg.body]);
  const isMarkdown = isChatMessageMarkdown(msg);
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
  const contextMenuClamp = useViewportClampNudge(contextMenuOpen);
  const [pressing, setPressing] = useState(false);
  const [localReactionPickerOpen, setLocalReactionPickerOpen] = useState(false);
  const forceReactionPickerOpen = Boolean(externalReactionPickerOpen);
  const reactionPickerOpen = forceReactionPickerOpen || localReactionPickerOpen;
  const setReactionPickerOpen = (open) => {
    setLocalReactionPickerOpen(open);
    onReactionPickerOpenChange?.(open);
  };
  const rowActive = contextMenuOpen || rowSelected || isEditing;
  const isDeleting = msg?.pendingSync === 'delete';
  /** Long-press / sheet / context — morph shape without snapping between states. */
  const shapeActive = !isDeleting && (pressing || rowSelected || contextMenuOpen);
  const syncing =
    msg?.pendingSync === 'send' || msg?.pendingSync === 'edit';
  const dimmed = syncing || isDeleting;
  const pinned = Boolean(msg?.pinnedAt);
  const collapsed = msg?.collapsed === '1' || msg?.collapsed === true;

  const openReactionPicker = () => {
    if (isDeleting) return;
    setReactionPickerOpen(true);
  };

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
    'group relative -mx-3 flex w-[calc(100%+1.5rem)] max-w-[calc(100%+1.5rem)] gap-2 touch-pan-y px-3 rounded-md transition-[background-color,box-shadow] duration-200 ease-out overflow-x-hidden',
    clustered ? 'py-0.5' : 'py-1.5',
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
        {!self && showName ? (
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
                onToggleCollapse={onToggleCollapse}
                onOpenReactionPicker={openReactionPicker}
                onOpenMobileSheet={onOpenMobileSheet}
                shiftHeldRef={shiftHeldRef}
                coarse={coarse}
                time={time}
                getPresignedUrl={getPresignedUrl}
              />
            ) : self && isDeleting ? (
              deletingStatus
            ) : null}
            <Motion.div
              className={`min-w-0 max-w-full overflow-hidden px-3 py-2 text-sm shadow-sm select-none origin-center [-webkit-touch-callout:none] transition-[background-color,border-color,opacity,box-shadow] duration-200 ease-out ${
                enableBubblePressFx ? 'will-change-transform' : ''
              } ${
                isDeleting
                  ? 'bg-red-100 text-gray-900 border border-red-300/80 shadow dark:bg-red-950/70 dark:text-odp-fgStrong dark:border-red-700/60'
                  : isEditing
                    ? 'bg-sky-500/25 text-gray-900 border border-sky-400/60 shadow dark:bg-sky-400/25 dark:text-odp-fgStrong dark:border-sky-400/50'
                    : collapsed
                      ? 'bg-black/[0.06] text-gray-500 border border-black/5 shadow-none dark:bg-white/[0.04] dark:text-gray-400 dark:border-white/5'
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
                ...(enableBubblePressFx
                  ? {
                      filter:
                        pressing && !isDeleting
                          ? 'brightness(0.92)'
                          : 'brightness(1)',
                    }
                  : { filter: 'none' }),
              }}
              transition={BUBBLE_SHAPE_SPRING}
              style={dimmed ? { opacity: 0.7 } : undefined}
            >
              {!collapsed ? (
                <ReplyPreview
                  msg={msg}
                  onOpen={isDeleting ? undefined : onOpenReply}
                  replyGroupLabel={replyGroupLabel}
                />
              ) : null}
              {pinned ? (
                <div className="mb-1 inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-300">
                  <Pin size={10} className="fill-current" />
                  고정됨
                </div>
              ) : null}
              {collapsed ? (
                <div className="mb-1 inline-flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                  <ChevronsDownUp size={10} />
                  접힘
                </div>
              ) : null}
              <ChatMessageBody
                message={msg}
                text={msg.body}
                collapsed={collapsed}
                className={`min-w-0 max-w-full overflow-hidden ${
                  collapsed
                    ? 'whitespace-nowrap'
                    : isMarkdown
                      ? 'wrap-anywhere'
                      : 'whitespace-pre-wrap wrap-anywhere'
                } ${isDeleting ? 'select-none' : 'select-text'}`}
                getPresignedUrl={getPresignedUrl}
                noteExists={noteExists}
                onOpenViewPath={
                  onOpenNote ? (path) => onOpenNote(path, msg) : undefined
                }
              />
              {!collapsed &&
              msg.notePath &&
              !isDeleting &&
              (typeof noteExists !== 'function' || noteExists(msg.notePath)) ? (
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
              {!collapsed && msg.editedAt && !isDeleting ? (
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
              {!collapsed
                ? urls.map((u) => (
                    <ChatOgCard
                      key={u}
                      url={u}
                      ogStorage={ogStorage}
                      allowEmbed={allowOgEmbed}
                    />
                  ))
                : null}
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
                onToggleCollapse={onToggleCollapse}
                onOpenReactionPicker={openReactionPicker}
                onOpenMobileSheet={onOpenMobileSheet}
                shiftHeldRef={shiftHeldRef}
                coarse={coarse}
                time={time}
                getPresignedUrl={getPresignedUrl}
              />
            ) : !self && isDeleting ? (
              deletingStatus
            ) : null}
          </div>
          <ChatMessageReactions
            reactions={msg.reactions}
            coarse={coarse}
            disabled={isDeleting || syncing}
            expanded={rowActive}
            reserveSpace={reserveReactionSpace}
            pickerOpen={reactionPickerOpen}
            onPickerOpenChange={setReactionPickerOpen}
            onToggle={(reaction) => onToggleReaction?.(msg, reaction)}
          />
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
          ref={contextMenuClamp.ref}
          style={contextMenuClamp.style}
          className={`${chatMenuContentClass} overflow-y-auto`}
          collisionPadding={{ top: 12, right: 12, left: 12, bottom: 48 }}
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
            onToggleCollapse={onToggleCollapse}
            onOpenReactionPicker={openReactionPicker}
            shiftHeldRef={shiftHeldRef}
            getPresignedUrl={getPresignedUrl}
            _Item={ContextMenu.Item}
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
});
const ChatMessageList = forwardRef(function ChatMessageList(
  {
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
    onToggleCollapse,
    onToggleReaction,
    onOpenNote,
    onOpenReplyTarget,
    emptyHint,
    getPresignedUrl,
    /** @type {Map<string, string>|Record<string, string>|null} */
    groupIconByName = null,
    /** @type {Map<string, string>|Record<string, string>|null} */
    groupLabelByKey = null,
    /** @type {((path: string) => boolean) | null | undefined} */
    noteExists,
    /** Kept for settings API; virtualized path never uses layout/popLayout. */
    enableMessageLayoutAnim: _enableMessageLayoutAnim = true,
    /** Bubble will-change + brightness press filter. */
    enableBubblePressFx = true,
  },
  ref,
) {
  const listRef = useRef(null);
  const stickBottomRef = useRef(true);
  const prevFirstIdRef = useRef(/** @type {string|null} */ (null));
  const prevLenRef = useRef(0);
  const initialBottomPinRef = useRef(true);
  const loadingOlderLockRef = useRef(false);
  const loadingNewerLockRef = useRef(false);
  const listHostRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [sheetMessage, setSheetMessage] = useState(null);
  const [reactionPickerMsgId, setReactionPickerMsgId] = useState(null);
  const [overlayDate, setOverlayDate] = useState(
    /** @type {{ label: string, dateStr: string } | null} */ (null),
  );
  const coarse = useIsCoarsePointer();
  const shiftHeldRef = useShiftHeldRef();

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
    let prevAtMs = 0;
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
        prevAtMs = 0;
      }
      const atMs = Date.parse(msg.at) || 0;
      const sameGroup = prevGroup != null && msg.group === prevGroup;
      const withinWindow =
        prevAtMs > 0 &&
        atMs > 0 &&
        Math.abs(atMs - prevAtMs) <= GROUP_CLUSTER_MS;
      const clustered = sameGroup && withinWindow;
      const showName = !isSelfGroup(msg.group) && !clustered;
      out.push({
        type: 'msg',
        key: msg.id,
        msg,
        showName,
        clustered,
        groupLabel: labelOf(msg.group || SELF_GROUP),
      });
      prevGroup = msg.group;
      prevAtMs = atMs;
    }
    return out;
  }, [messages, timeZone, groupLabelByKey]);

  const rows = useMemo(() => {
    const out = [];
    if (loadingOlder) {
      out.push({ type: 'loading-older', key: 'loading-older' });
    } else if (!hasMore && messages.length > 0) {
      out.push({ type: 'end-older', key: 'end-older' });
    }
    for (const item of items) out.push(item);
    if (messages.length === 0) {
      out.push({ type: 'empty', key: 'empty' });
    }
    if (loadingNewer) {
      out.push({ type: 'loading-newer', key: 'loading-newer' });
    }
    return out;
  }, [items, loadingOlder, loadingNewer, hasMore, messages.length]);

  const messageIdToIndex = useMemo(() => {
    const map = new Map();
    rows.forEach((row, index) => {
      if (row.type === 'msg') map.set(row.msg.id, index);
    });
    return map;
  }, [rows]);

  const lastMessageRowIndex = useMemo(() => {
    for (let i = rows.length - 1; i >= 0; i -= 1) {
      if (rows[i]?.type === 'msg') return i;
    }
    return -1;
  }, [rows]);

  const dateStrToIndex = useMemo(() => {
    const map = new Map();
    rows.forEach((row, index) => {
      if (row.type === 'date' && row.dateStr) map.set(row.dateStr, index);
    });
    return map;
  }, [rows]);

  const scrollToMessageId = useCallback(
    (messageId, opts = {}) => {
      if (!messageId || !listRef.current) return false;
      const index = messageIdToIndex.get(messageId);
      if (index == null) return false;
      listRef.current.scrollToIndex(index, {
        align: opts.align || 'start',
        offset: opts.align === 'start' ? -CHAT_MESSAGE_SCROLL_MARGIN : 0,
      });
      return true;
    },
    [messageIdToIndex],
  );

  const scrollToDateStr = useCallback(
    (dateStr) => {
      if (!dateStr || !listRef.current) return false;
      const index = dateStrToIndex.get(dateStr);
      if (index == null) return false;
      listRef.current.scrollToIndex(index, { align: 'start' });
      return true;
    },
    [dateStrToIndex],
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollToMessageId,
      scrollToDateStr,
    }),
    [scrollToMessageId, scrollToDateStr],
  );

  // Detect prepend vs append for virtua `shift` (compare against prior render refs).
  const firstId = messages[0]?.id || null;
  const nextLen = messages.length;
  const shift =
    nextLen > prevLenRef.current &&
    prevLenRef.current > 0 &&
    Boolean(firstId) &&
    Boolean(prevFirstIdRef.current) &&
    firstId !== prevFirstIdRef.current;
  const grewAtEnd =
    nextLen > prevLenRef.current && !shift && prevLenRef.current > 0;

  useLayoutEffect(() => {
    const prepended = shift;
    prevFirstIdRef.current = firstId;
    prevLenRef.current = nextLen;

    if (highlightId || editingMessageId) {
      initialBottomPinRef.current = false;
      return;
    }

    const list = listRef.current;
    if (!list) return;

    const pinInitial = initialBottomPinRef.current && nextLen > 0;
    if (pinInitial) {
      stickBottomRef.current = true;
      list.scrollToIndex(Math.max(0, rows.length - 1), { align: 'end' });
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex(Math.max(0, rows.length - 1), {
          align: 'end',
        });
      });
      initialBottomPinRef.current = false;
      return;
    }

    if (stickBottomRef.current && grewAtEnd && !prepended) {
      list.scrollToIndex(Math.max(0, rows.length - 1), { align: 'end' });
    }
  }, [
    messages,
    highlightId,
    editingMessageId,
    rows.length,
    shift,
    firstId,
    nextLen,
    grewAtEnd,
  ]);

  // Keep stick-to-bottom when content height changes (images / OG).
  useEffect(() => {
    if (highlightId || editingMessageId) return undefined;
    const host = listHostRef.current;
    if (!host || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => {
      if (!stickBottomRef.current || !listRef.current) return;
      listRef.current.scrollToIndex(Math.max(0, rows.length - 1), {
        align: 'end',
      });
    });
    const viewport = host.firstElementChild;
    const content = viewport?.firstElementChild;
    if (content) ro.observe(content);
    else ro.observe(host);
    return () => ro.disconnect();
  }, [highlightId, editingMessageId, rows.length]);

  useEffect(() => {
    if (!highlightId) return undefined;
    let cancelled = false;
    const align = () => {
      if (cancelled) return;
      scrollToMessageId(highlightId, { align: 'start' });
    };
    align();
    requestAnimationFrame(align);
    const t1 = window.setTimeout(align, 50);
    const t2 = window.setTimeout(align, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [highlightId, scrollToMessageId, messages]);

  const updateOverlayFromOffset = useCallback(
    (offset) => {
      const list = listRef.current;
      if (!list || rows.length === 0) {
        setOverlayDate(null);
        return;
      }
      const index = list.findItemIndex(offset + 4);
      let dateRow = null;
      for (let i = Math.min(index, rows.length - 1); i >= 0; i -= 1) {
        const row = rows[i];
        if (row?.type === 'date') {
          dateRow = row;
          break;
        }
      }
      setOverlayDate((prev) => {
        if (!dateRow) return null;
        if (
          prev &&
          prev.dateStr === dateRow.dateStr &&
          prev.label === dateRow.label
        ) {
          return prev;
        }
        return { label: dateRow.label, dateStr: dateRow.dateStr };
      });
    },
    [rows],
  );

  const handleScroll = useCallback(
    (offset) => {
      const list = listRef.current;
      if (!list) return;

      const distBottom = list.scrollSize - offset - list.viewportSize;
      stickBottomRef.current = distBottom < STICK_BOTTOM_PX;
      updateOverlayFromOffset(offset);

      if (
        offset < LOAD_EDGE_PX &&
        hasMore &&
        !loadingOlder &&
        !loadingOlderLockRef.current &&
        onReachTop
      ) {
        loadingOlderLockRef.current = true;
        stickBottomRef.current = false;
        Promise.resolve(onReachTop()).finally(() => {
          loadingOlderLockRef.current = false;
        });
      }

      if (
        distBottom < LOAD_EDGE_PX &&
        hasMoreNewer &&
        !loadingNewer &&
        !loadingNewerLockRef.current &&
        onReachBottom
      ) {
        loadingNewerLockRef.current = true;
        Promise.resolve(onReachBottom()).finally(() => {
          loadingNewerLockRef.current = false;
        });
      }
    },
    [
      hasMore,
      hasMoreNewer,
      loadingOlder,
      loadingNewer,
      onReachTop,
      onReachBottom,
      updateOverlayFromOffset,
    ],
  );

  const renderRow = useCallback(
    (row, index) => {
      if (row.type === 'loading-older' || row.type === 'loading-newer') {
        return (
          <div
            key={row.key}
            className="mx-auto flex w-full max-w-full justify-center px-3 py-2 md:max-w-[min(100%,50vw)]"
            aria-label={
              row.type === 'loading-older'
                ? '이전 대화 불러오는 중'
                : '이후 대화 불러오는 중'
            }
            role="status"
          >
            <Loader2 size={16} className="animate-spin text-gray-400" />
          </div>
        );
      }
      if (row.type === 'end-older') {
        return (
          <div
            key={row.key}
            className="mx-auto w-full max-w-full px-3 py-1 text-center text-[10px] text-gray-400 md:max-w-[min(100%,50vw)]"
          >
            더 이상 없음
          </div>
        );
      }
      if (row.type === 'empty') {
        return (
          <div
            key={row.key}
            className="mx-auto w-full max-w-full px-3 py-16 text-center text-sm text-gray-400 md:max-w-[min(100%,50vw)]"
          >
            {emptyHint || '아직 채팅이 없습니다'}
          </div>
        );
      }
      if (row.type === 'date') {
        return (
          <ChatDateDivider
            key={row.key}
            sticky={false}
            id={row.dateStr ? `chat-date-${row.dateStr}` : undefined}
            label={row.label}
          />
        );
      }

      const prev = index > 0 ? rows[index - 1] : null;
      const gapClass = row.clustered
        ? 'mt-0.5'
        : prev?.type === 'msg'
          ? 'mt-3'
          : '';

      return (
        <div
          key={row.key}
          className={`mx-auto w-full max-w-full min-w-0 px-3 md:max-w-[min(100%,50vw)] ${gapClass}`}
        >
          <MessageBubble
            msg={row.msg}
            showName={row.showName}
            clustered={row.clustered}
            highlight={highlightId === row.msg.id}
            ogStorage={ogStorage}
            allowOgEmbed={!editingMessageId}
            timeZone={timeZone}
            onReply={onReply}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddToNote={onAddToNote}
            onViewEditHistory={onViewEditHistory}
            onTogglePin={onTogglePin}
            onToggleCollapse={onToggleCollapse}
            onToggleReaction={onToggleReaction}
            onOpenNote={onOpenNote}
            onOpenReply={onOpenReplyTarget}
            onOpenMobileSheet={setSheetMessage}
            shiftHeldRef={shiftHeldRef}
            coarse={coarse}
            rowSelected={sheetMessage?.id === row.msg.id}
            isEditing={editingMessageId === row.msg.id}
            externalReactionPickerOpen={reactionPickerMsgId === row.msg.id}
            onReactionPickerOpenChange={(open) => {
              setReactionPickerMsgId(open ? row.msg.id : null);
            }}
            getPresignedUrl={getPresignedUrl}
            noteExists={noteExists}
            enableBubblePressFx={enableBubblePressFx}
            reserveReactionSpace={index === lastMessageRowIndex}
            groupIconPath={
              groupIconByName instanceof Map
                ? groupIconByName.get(row.msg.group) || null
                : groupIconByName?.[row.msg.group] || null
            }
            groupLabel={row.groupLabel}
            replyGroupLabel={
              groupLabelByKey instanceof Map
                ? groupLabelByKey.get(row.msg.replyGroup) ||
                  row.msg.replyGroup
                : groupLabelByKey?.[row.msg.replyGroup] || row.msg.replyGroup
            }
          />
        </div>
      );
    },
    [
      rows,
      emptyHint,
      highlightId,
      ogStorage,
      editingMessageId,
      timeZone,
      onReply,
      onDelete,
      onEdit,
      onAddToNote,
      onViewEditHistory,
      onTogglePin,
      onToggleCollapse,
      onToggleReaction,
      onOpenNote,
      onOpenReplyTarget,
      shiftHeldRef,
      coarse,
      sheetMessage?.id,
      reactionPickerMsgId,
      getPresignedUrl,
      noteExists,
      enableBubblePressFx,
      groupIconByName,
      groupLabelByKey,
      lastMessageRowIndex,
    ],
  );

  const highlightIndex = highlightId
    ? messageIdToIndex.get(highlightId)
    : undefined;
  const keepMounted =
    highlightIndex != null ? [highlightIndex] : undefined;

  return (
    <>
      <div
        ref={listHostRef}
        className="relative min-h-0 max-h-full flex-1 overflow-hidden"
      >
        {overlayDate ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
            <ChatDateDivider
              sticky={false}
              label={overlayDate.label}
              className="pointer-events-none shadow-sm"
            />
          </div>
        ) : null}
        <VList
          ref={listRef}
          className="h-full max-h-full overscroll-contain"
          data={rows}
          shift={shift}
          keepMounted={keepMounted}
          onScroll={handleScroll}
          style={{ overflowX: 'clip' }}
        >
          {renderRow}
        </VList>
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
        onToggleCollapse={onToggleCollapse}
        onOpenReactionPicker={(m) => {
          setSheetMessage(null);
          setReactionPickerMsgId(m?.id || null);
        }}
        getPresignedUrl={getPresignedUrl}
        shiftHeldRef={shiftHeldRef}
      />
    </>
  );
});

export default ChatMessageList;
