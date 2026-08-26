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
  RefreshCw,
  TextSelect,
  Link2,
} from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { VList } from 'virtua';
import { ContextMenu, DropdownMenu } from 'radix-ui';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import ChatMessageBody from '@/components/chatWithMyself/ChatMessageBody';
import ChatMessageContextMenu from '@/components/chatWithMyself/ChatMessageContextMenu';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import ChatMessageSelectCopyModal from '@/components/chatWithMyself/ChatMessageSelectCopyModal';
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
  isChatMessageEncrypted,
  ENCRYPTED_MESSAGE_LABEL,
  detectTimeZone,
  localDateString,
  SELF_GROUP,
  formatChatMessagePlainText,
  formatChatMessageMarkdownCopy,
  resolveGroupLabel,
  canOfferWebShare,
  shareChatMessage,
} from '@/utils/chatWithMyself';
import { IconLock } from '@/components/icons';
import {
  CHAT_MESSAGE_SCROLL_MARGIN,
} from '@/utils/chatWithMyself/scrollToMessage';
import { vibrateLongPressAction } from '@/utils/shared/hapticFeedback';
import { copyText, resolveAnchorHref } from '@/utils/shared/copyText';

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

function hasMessageEditHistory(msg: any) {
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
  onReloadOg,
  onSelectCopy,
  shiftHeldRef,
  getPresignedUrl,
  linkHref = null,

  /** When set, encrypted message is unlocked in this session. */
  decryptedBody = null,

  _Item
}: any) {
  const pinned = Boolean(msg?.pinnedAt);
  const collapsed = msg?.collapsed === '1' || msg?.collapsed === true;
  const encryptedLocked =
    isChatMessageEncrypted(msg) && decryptedBody == null;
  const shareAvailable = canOfferWebShare();
  const bodyForLinks = encryptedLocked
    ? ''
    : decryptedBody != null
      ? decryptedBody
      : msg?.body || '';
  const hasLinks = extractUrls(bodyForLinks).length > 0;
  const copyLinkHref = String(linkHref || '').trim() || null;
  return <>
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
    {!encryptedLocked ? (
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onEdit?.(msg)}
      >
        <Pencil size={16} className="shrink-0 text-gray-500" />
        수정
      </_Item>
    ) : null}
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
    {copyLinkHref ? (
      <_Item
        className={chatMenuItemClass}
        onSelect={() => {
          void copyText(copyLinkHref, {
            message: '링크 복사됨',
            icon: 'link',
          });
        }}
      >
        <Link2 size={16} className="shrink-0 text-gray-500" />
        링크 복사
      </_Item>
    ) : null}
    <_Item
      className={chatMenuItemClass}
      onSelect={() => {
        const copyMsg =
          decryptedBody != null
            ? { ...msg, body: decryptedBody, encrypted: false }
            : msg;
        void copyText(formatChatMessagePlainText(copyMsg));
      }}
    >
      <Copy size={16} className="shrink-0 text-gray-500" />
      내용 복사
    </_Item>
    <_Item
      className={chatMenuItemClass}
      onSelect={() => {
        const copyMsg =
          decryptedBody != null
            ? { ...msg, body: decryptedBody, encrypted: false }
            : msg;
        onSelectCopy?.(copyMsg);
      }}
    >
      <TextSelect size={16} className="shrink-0 text-gray-500" />
      내용 선택 복사
    </_Item>
    <_Item
      className={chatMenuItemClass}
      onSelect={() => {
        const copyMsg =
          decryptedBody != null
            ? { ...msg, body: decryptedBody, encrypted: false }
            : msg;
        void copyText(formatChatMessageMarkdownCopy(copyMsg));
      }}
    >
      <FileText size={16} className="shrink-0 text-gray-500" />
      MD 복사
    </_Item>
    {hasLinks ? (
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onReloadOg?.(msg)}
      >
        <RefreshCw size={16} className="shrink-0 text-gray-500" />
        OpenGraph 캐시 재로딩
      </_Item>
    ) : null}
    {shareAvailable && !encryptedLocked ? (
      <_Item
        className={chatMenuItemClass}
        onSelect={() => {
          const shareMsg =
            decryptedBody != null
              ? { ...msg, body: decryptedBody, encrypted: false }
              : msg;
          void shareChatMessage(shareMsg, { getPresignedUrl });
        }}
      >
        <Share2 size={16} className="shrink-0 text-gray-500" />
        공유
      </_Item>
    ) : null}
    {!encryptedLocked ? (
      <_Item
        className={chatMenuItemClass}
        onSelect={() => {
          const noteMsg =
            decryptedBody != null
              ? { ...msg, body: decryptedBody, encrypted: false }
              : msg;
          onAddToNote?.(noteMsg);
        }}
      >
        <FilePlus2 size={16} className="shrink-0 text-gray-500" />
        노트로 추가
      </_Item>
    ) : null}
    <_Item
      className={chatMenuDangerItemClass}
      onPointerDown={(e: any) => {
        if (shiftHeldRef) shiftHeldRef.current = e.shiftKey;
      }}
      onSelect={() =>
        onDelete?.(msg, { skipConfirm: Boolean(shiftHeldRef?.current) })
      }
    >
      <Trash2 size={16} className="shrink-0" />
      삭제
    </_Item>
  </>;
}

function ReplyPreview({
  msg,
  onOpen,
  replyGroupLabel
}: any) {
  if (!msg?.replyTo) return null;
  const label = replyGroupLabel || msg.replyGroup || SELF_GROUP;
  const snippet = msg.replySnippet || '원본 메시지';
  return (
    <button
      type="button"
      onClick={(e: any) => {
        e.stopPropagation();
        onOpen?.(msg.replyTo);
      }}
      className="mb-1.5 flex w-full min-w-0 max-w-full items-stretch gap-1.5 overflow-hidden rounded-md border border-blue-200/80 border-l-4 border-l-blue-500 bg-blue-100 px-2 py-1 text-left shadow-sm dark:border-blue-800/60 dark:border-l-blue-400 dark:bg-blue-950 dark:shadow-none"
    >
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="min-w-0 flex-1 overflow-hidden">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="truncate text-[11px] font-semibold text-blue-700 dark:text-blue-300">
          {label}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="line-clamp-3 whitespace-pre-wrap wrap-anywhere text-[11px] text-gray-600 dark:text-gray-300">
          {snippet}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    </button>
  );
}

function MessageReplyButton({
  msg,
  onReply
}: any) {
  return (
    <button
      type="button"
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        onReply?.(msg);
      }}
      className={iconBtnClass}
      title="답장"
      aria-label="답장"
    >
      <Reply size={16} />
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
  onReloadOg,
  onSelectCopy,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
  getPresignedUrl,
  decryptedBody = null
}: any) {
  if (coarse) {
    return (
      <button
        type="button"
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenMobileSheet?.(msg);
        }}
        className={iconBtnClass}
        aria-label="메시지 옵션"
      >
        <MoreHorizontal size={16} />
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        <button
          type="button"
          className={iconBtnClass}
          aria-label="메시지 옵션"
          onClick={(e: any) => e.stopPropagation()}
          onContextMenu={(e: any) => e.stopPropagation()}
        >
          <MoreHorizontal size={16} />
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${chatMenuContentClass} z-100010`}
          sideOffset={4}
          align="end"
          onCloseAutoFocus={(e: any) => e.preventDefault()}
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
            onReloadOg={onReloadOg}
            onSelectCopy={onSelectCopy}
            shiftHeldRef={shiftHeldRef}
            getPresignedUrl={getPresignedUrl}
            decryptedBody={decryptedBody}
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
  onReloadOg,
  onSelectCopy,
  onOpenMobileSheet,
  shiftHeldRef,
  coarse,
  time,
  getPresignedUrl,
  decryptedBody = null
}: any) {
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
        onReloadOg={onReloadOg}
        onSelectCopy={onSelectCopy}
        onOpenMobileSheet={onOpenMobileSheet}
        shiftHeldRef={shiftHeldRef}
        coarse={coarse}
        getPresignedUrl={getPresignedUrl}
        decryptedBody={decryptedBody}
      />
    </>
  );

  if (coarse) {
    return (
      <div className="flex shrink-0 flex-col items-center gap-0.5">
        {timeNode}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        {!syncing ? <div className="flex items-center gap-0.5">{buttons}</div> : null}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    );
  }

  return (
    <div className="relative flex h-10 w-auto shrink-0 flex-col items-center justify-end">
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div
        className={`flex items-center justify-center transition-transform duration-150 ease-out ${
          syncing ? '' : 'group-hover:-translate-y-4'
        }`}
      >
        {timeNode}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
      {!syncing ? (
        <div className="pointer-events-none absolute bottom-0 flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
          {buttons}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      ) : null}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

const MessageBubble = memo(function MessageBubble({
  // @ts-expect-error TS(2339) FIXME: Property 'msg' does not exist on type '{}'.
  msg,
  // @ts-expect-error TS(2339) FIXME: Property 'showName' does not exist on type '{}'.
  showName,
  // @ts-expect-error TS(2339) FIXME: Property 'clustered' does not exist on type '{}'.
  clustered = false,
  // @ts-expect-error TS(2339) FIXME: Property 'highlight' does not exist on type '{}'.
  highlight,
  // @ts-expect-error TS(2339) FIXME: Property 'ogStorage' does not exist on type '{}'.
  ogStorage,
  // @ts-expect-error TS(2339) FIXME: Property 'timeZone' does not exist on type '{}'.
  timeZone,
  // @ts-expect-error TS(2339) FIXME: Property 'onReply' does not exist on type '{}'.
  onReply,
  // @ts-expect-error TS(2339) FIXME: Property 'onDelete' does not exist on type '{}'.
  onDelete,
  // @ts-expect-error TS(2339) FIXME: Property 'onEdit' does not exist on type '{}'.
  onEdit,
  // @ts-expect-error TS(2339) FIXME: Property 'onAddToNote' does not exist on type '{}'... Remove this comment to see the full error message
  onAddToNote,
  // @ts-expect-error TS(2339) FIXME: Property 'onViewEditHistory' does not exist on typ... Remove this comment to see the full error message
  onViewEditHistory,
  // @ts-expect-error TS(2339) FIXME: Property 'onTogglePin' does not exist on type '{}'... Remove this comment to see the full error message
  onTogglePin,
  // @ts-expect-error TS(2339) FIXME: Property 'onToggleCollapse' does not exist on type... Remove this comment to see the full error message
  onToggleCollapse,
  // @ts-expect-error TS(2339) FIXME: Property 'onToggleReaction' does not exist on type... Remove this comment to see the full error message
  onToggleReaction,
  // @ts-expect-error TS(2339) FIXME: Property 'onOpenNote' does not exist on type '{}'.
  onOpenNote,
  // @ts-expect-error TS(2339) FIXME: Property 'onOpenReply' does not exist on type '{}'... Remove this comment to see the full error message
  onOpenReply,
  // @ts-expect-error TS(2339) FIXME: Property 'onOpenMobileSheet' does not exist on typ... Remove this comment to see the full error message
  onOpenMobileSheet,
  // @ts-expect-error TS(2339) FIXME: Property 'onSelectCopy' does not exist on type '{}... Remove this comment to see the full error message
  onSelectCopy,
  // @ts-expect-error TS(2339) FIXME: Property 'onReloadOg' does not exist on type '{}'.
  onReloadOg,
  // @ts-expect-error TS(2339) FIXME: Property 'onBubbleActivate' does not exist on type... Remove this comment to see the full error message
  onBubbleActivate,
  // @ts-expect-error TS(2339) FIXME: Property 'onRequestDecrypt' does not exist on type... Remove this comment to see the full error message
  onRequestDecrypt,
  /** Session plaintext when message is encrypted. */
  // @ts-expect-error TS(2339) FIXME: Property 'decryptedBody' does not exist on type '{... Remove this comment to see the full error message
  decryptedBody = null,
  /** Session-only expand for a persisted-collapsed message (not saved). */
  // @ts-expect-error TS(2339) FIXME: Property 'peeked' does not exist on type '{}'.
  peeked = false,
  // @ts-expect-error TS(2339) FIXME: Property 'ogReloadKey' does not exist on type '{}'... Remove this comment to see the full error message
  ogReloadKey = 0,
  // @ts-expect-error TS(2339) FIXME: Property 'shiftHeldRef' does not exist on type '{}... Remove this comment to see the full error message
  shiftHeldRef,
  // @ts-expect-error TS(2339) FIXME: Property 'coarse' does not exist on type '{}'.
  coarse,
  // @ts-expect-error TS(2339) FIXME: Property 'mobileContextMenu' does not exist on typ... Remove this comment to see the full error message
  mobileContextMenu = false,
  // @ts-expect-error TS(2339) FIXME: Property 'rowSelected' does not exist on type '{}'... Remove this comment to see the full error message
  rowSelected = false,
  // @ts-expect-error TS(2339) FIXME: Property 'isEditing' does not exist on type '{}'.
  isEditing = false,
  // @ts-expect-error TS(2339) FIXME: Property 'getPresignedUrl' does not exist on type ... Remove this comment to see the full error message
  getPresignedUrl,
  // @ts-expect-error TS(2339) FIXME: Property 'groupIconPath' does not exist on type '{... Remove this comment to see the full error message
  groupIconPath = null,
  // @ts-expect-error TS(2339) FIXME: Property 'groupLabel' does not exist on type '{}'.
  groupLabel = null,
  // @ts-expect-error TS(2339) FIXME: Property 'replyGroupLabel' does not exist on type ... Remove this comment to see the full error message
  replyGroupLabel = null,
  // @ts-expect-error TS(2339) FIXME: Property 'externalReactionPickerOpen' does not exi... Remove this comment to see the full error message
  externalReactionPickerOpen = false,
  // @ts-expect-error TS(2339) FIXME: Property 'onReactionPickerOpenChange' does not exi... Remove this comment to see the full error message
  onReactionPickerOpenChange,
  // @ts-expect-error TS(2339) FIXME: Property 'noteExists' does not exist on type '{}'.
  noteExists,
  // @ts-expect-error TS(2339) FIXME: Property 'folderExists' does not exist on type '{}... Remove this comment to see the full error message
  folderExists,
  // @ts-expect-error TS(2339) FIXME: Property 'listFolderFiles' does not exist on type ... Remove this comment to see the full error message
  listFolderFiles,
  // @ts-expect-error TS(2339) FIXME: Property 'allowOgEmbed' does not exist on type '{}... Remove this comment to see the full error message
  allowOgEmbed = true,
  /** will-change + brightness press filter (perf toggle). */
  // @ts-expect-error TS(2339) FIXME: Property 'enableBubblePressFx' does not exist on t... Remove this comment to see the full error message
  enableBubblePressFx = true,
  /** Reserve empty reaction-row height (typically the last list message). */
  // @ts-expect-error TS(2339) FIXME: Property 'reserveReactionSpace' does not exist on ... Remove this comment to see the full error message
  reserveReactionSpace = false,
}) {
  const self = isSelfGroup(msg.group);
  const displayName = groupLabel || msg.group || SELF_GROUP;
  const encrypted = isChatMessageEncrypted(msg);
  const encryptedLocked = encrypted && decryptedBody == null;
  const displayBody = encryptedLocked
    ? ENCRYPTED_MESSAGE_LABEL
    : decryptedBody != null
      ? decryptedBody
      : msg.body;
  const urls = useMemo(
    () => (encryptedLocked ? [] : extractUrls(displayBody)),
    [encryptedLocked, displayBody],
  );
  const isMarkdown = !encryptedLocked && isChatMessageMarkdown(msg);
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
  const swipedThisGestureRef = useRef(false);
  const contextLinkHrefRef = useRef(/** @type {string|null} */ (null));
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextLinkHref, setContextLinkHref] = useState(
    /** @type {string|null} */ (null),
  );
  const contextMenuClamp = useViewportClampNudge(contextMenuOpen);
  const [pressing, setPressing] = useState(false);
  const [localReactionPickerOpen, setLocalReactionPickerOpen] = useState(false);
  const forceReactionPickerOpen = Boolean(externalReactionPickerOpen);
  const reactionPickerOpen = forceReactionPickerOpen || localReactionPickerOpen;
  const setReactionPickerOpen = (open: any) => {
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
  const persistedCollapsed =
    msg?.collapsed === '1' || msg?.collapsed === true;
  const collapsed = persistedCollapsed && !peeked;

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
    vibrateLongPressAction();
    // Keep press morph; rowSelected takes over when finger lifts.
    onOpenMobileSheet?.(msg, contextLinkHrefRef.current);
  };

  const captureContextLink = (target: any) => {
    const href = resolveAnchorHref(target);
    // @ts-expect-error TS(2322) FIXME: Type 'string | null' is not assignable to type 'nu... Remove this comment to see the full error message
    contextLinkHrefRef.current = href;
    // @ts-expect-error TS(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    setContextLinkHref(href);
    return href;
  };

  const applyOffset = (x: any) => {
    offsetRef.current = x;
    setOffsetX(x);
  };

  useEffect(() => {
    if (!isDeleting) return;
    setContextMenuOpen(false);
    setContextLinkHref(null);
    contextLinkHrefRef.current = null;
    applyOffset(0);
    clearLongPress();
    endPressVisual();
  }, [isDeleting]);

  const endSwipe = (pointerId: any) => {
    if (pointerIdRef.current !== pointerId) return;
    const x = offsetRef.current;
    const wasHorizontal = axisRef.current === 'h';
    pointerIdRef.current = null;
    swipeStartRef.current = null;
    axisRef.current = null;
    applyOffset(0);
    try {
      // @ts-expect-error TS(2339) FIXME: Property 'releasePointerCapture' does not exist on... Remove this comment to see the full error message
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
    !isDeleting && persistedCollapsed ? 'cursor-pointer' : '',
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
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );

  const bubble = (
    <div
      id={`chat-msg-${msg.id}`}
      ref={rowRef}
      className={rowClassName}
      aria-disabled={isDeleting ? 'true' : undefined}
      aria-expanded={
        persistedCollapsed ? (peeked ? 'true' : 'false') : undefined
      }
      data-row-selected={!isDeleting && rowActive ? 'true' : undefined}
      onPointerDown={(e: any) => {
        if (isDeleting) return;
        // Mouse: no swipe-to-reply (text selection / click only)
        if (e.pointerType === 'mouse') return;
        if (e.button !== 0 && e.button !== -1) return;
        if (e.target.closest('button, input, textarea')) return;
        const onLink = Boolean(e.target.closest?.('a[href]'));
        captureContextLink(e.target);
        // Links: allow long-press menu (copy link) but not swipe-to-reply.
        if (onLink) {
          if (!coarse) return;
          pointerIdRef.current = e.pointerId;
          // @ts-expect-error TS(2322) FIXME: Type '{ x: any; y: any; }' is not assignable to ty... Remove this comment to see the full error message
          swipeStartRef.current = { x: e.clientX, y: e.clientY };
          axisRef.current = null;
          longPressOpenedRef.current = false;
          swipedThisGestureRef.current = false;
          clearLongPress();
          // @ts-expect-error TS(2322) FIXME: Type 'number' is not assignable to type 'null'.
          longPressThresholdTimer.current = setTimeout(() => {
            setPressing(true);
          }, LONG_PRESS_THRESHOLD_MS);
          // @ts-expect-error TS(2322) FIXME: Type 'number' is not assignable to type 'null'.
          longPressMenuTimer.current = setTimeout(() => {
            openMobileSheetFromLongPress();
          }, LONG_PRESS_MENU_MS);
          return;
        }
        pointerIdRef.current = e.pointerId;
        // @ts-expect-error TS(2322) FIXME: Type '{ x: any; y: any; }' is not assignable to ty... Remove this comment to see the full error message
        swipeStartRef.current = { x: e.clientX, y: e.clientY };
        axisRef.current = null;
        longPressOpenedRef.current = false;
        swipedThisGestureRef.current = false;
        if (!coarse) return;
        clearLongPress();
        // @ts-expect-error TS(2322) FIXME: Type 'number' is not assignable to type 'null'.
        longPressThresholdTimer.current = setTimeout(() => {
          setPressing(true);
        }, LONG_PRESS_THRESHOLD_MS);
        // @ts-expect-error TS(2322) FIXME: Type 'number' is not assignable to type 'null'.
        longPressMenuTimer.current = setTimeout(() => {
          openMobileSheetFromLongPress();
        }, LONG_PRESS_MENU_MS);
      }}
      onPointerMove={(e: any) => {
        if (isDeleting) return;
        if (e.pointerType === 'mouse') return;
        if (pointerIdRef.current !== e.pointerId || !swipeStartRef.current) return;
        // @ts-expect-error TS(2339) FIXME: Property 'x' does not exist on type 'never'.
        const dx = e.clientX - swipeStartRef.current.x;
        // @ts-expect-error TS(2339) FIXME: Property 'y' does not exist on type 'never'.
        const dy = e.clientY - swipeStartRef.current.y;
        if (!axisRef.current) {
          if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
          // @ts-expect-error TS(2322) FIXME: Type '"h" | "v"' is not assignable to type 'null'.
          axisRef.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
          if (axisRef.current === 'h') {
            swipedThisGestureRef.current = true;
            clearLongPress();
            endPressVisual();
            try {
              // @ts-expect-error TS(2339) FIXME: Property 'setPointerCapture' does not exist on typ... Remove this comment to see the full error message
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
      onPointerUp={(e: any) => {
        if (isDeleting) return;
        if (e.pointerType === 'mouse') return;
        clearLongPress();
        endPressVisual();
        endSwipe(e.pointerId);
      }}
      onPointerCancel={(e: any) => {
        if (isDeleting) return;
        if (e.pointerType === 'mouse') return;
        clearLongPress();
        endPressVisual();
        endSwipe(e.pointerId);
      }}
      onClick={(e: any) => {
        if (isDeleting) return;
        if (e.target.closest('button, a, input, textarea')) return;
        if (longPressOpenedRef.current) {
          longPressOpenedRef.current = false;
          return;
        }
        if (swipedThisGestureRef.current) {
          swipedThisGestureRef.current = false;
          return;
        }
        const sel = typeof window !== 'undefined' ? window.getSelection() : null;
        if (
          sel &&
          !sel.isCollapsed &&
          rowRef.current &&
          // @ts-expect-error TS(2339) FIXME: Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
          (rowRef.current.contains(sel.anchorNode) ||
            // @ts-expect-error TS(2339) FIXME: Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
            rowRef.current.contains(sel.focusNode))
        ) {
          return;
        }
        onBubbleActivate?.(msg);
        if (encryptedLocked) {
          onRequestDecrypt?.(msg);
        }
      }}
      onContextMenu={(e: any) => {
        captureContextLink(e.target);
        if (isDeleting || coarse) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div
        className={`pointer-events-none absolute inset-y-0 flex items-center ${
          swipeIconSide === 'left' ? 'left-3' : 'right-3'
        }`}
        style={{ opacity: swipeIconOpacity }}
        aria-hidden
      >
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="rounded-full bg-blue-500/90 p-1.5 text-white shadow">
          <Reply size={16} />
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        </span>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>

      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div
          className={`flex min-w-0 max-w-[min(85%,100%)] flex-1 flex-col ${
            self ? 'items-end' : 'items-start'
          }`}
        >
          {showName && !self ? (
            <div className="mb-0.5 max-w-full truncate px-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
              {displayName}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
          ) : null}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
                onReloadOg={onReloadOg}
                onSelectCopy={onSelectCopy}
                onOpenMobileSheet={onOpenMobileSheet}
                shiftHeldRef={shiftHeldRef}
                coarse={coarse}
                time={time}
                getPresignedUrl={getPresignedUrl}
                decryptedBody={decryptedBody}
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
                      : encryptedLocked
                        ? 'bg-violet-100 text-gray-900 dark:bg-[#1e1830] dark:text-odp-fgStrong border border-violet-200/80 dark:border-violet-800/50 shadow cursor-pointer'
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
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
              ) : null}
              {collapsed ? (
                <div className="mb-1 inline-flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                  <ChevronsDownUp size={10} />
                  접힘
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
              ) : null}
              {encryptedLocked ? (
                <div
                  className={`inline-flex min-w-0 max-w-full items-center gap-1.5 text-sm ${
                    collapsed ? 'whitespace-nowrap' : ''
                  } ${isDeleting ? 'select-none' : 'select-none'}`}
                >
                  <IconLock size={14} className="shrink-0 opacity-70" />
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  <span>{ENCRYPTED_MESSAGE_LABEL}</span>
                  {!collapsed && !msg.pendingSync ? (
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      · 클릭하여 잠금 해제
                    // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    </span>
                  ) : null}
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
              ) : (
                <ChatMessageBody
                  message={msg}
                  text={displayBody}
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
                  folderExists={folderExists}
                  listFolderFiles={listFolderFiles}
                  onOpenViewPath={
                    onOpenNote ? (path: any) => onOpenNote(path, msg) : undefined
                  }
                />
              )}
              {!collapsed &&
              !encryptedLocked &&
              msg.notePath &&
              !isDeleting &&
              (typeof noteExists !== 'function' || noteExists(msg.notePath)) ? (
                <button
                  type="button"
                  className="mt-1 inline-flex items-center gap-1 text-[10px] text-blue-600 underline-offset-2 hover:underline dark:text-blue-300"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onOpenNote?.(msg.notePath, msg);
                  }}
                >
                  <ExternalLink size={10} />
                  노트 열기
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                </button>
              ) : null}
              {!collapsed && msg.editedAt && !isDeleting ? (
                <button
                  type="button"
                  className="mt-1 text-[10px] text-gray-400 underline-offset-2 hover:text-gray-600 hover:underline dark:text-gray-500 dark:hover:text-gray-300"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onViewEditHistory?.(msg);
                  }}
                >
                  수정됨
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                </button>
              ) : null}
              {!collapsed
                ? urls.map((u: any) => <ChatOgCard
                key={u}
                url={u}
                ogStorage={ogStorage}
                allowEmbed={allowOgEmbed}
                reloadKey={ogReloadKey}
              />)
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
                onReloadOg={onReloadOg}
                onSelectCopy={onSelectCopy}
                onOpenMobileSheet={onOpenMobileSheet}
                shiftHeldRef={shiftHeldRef}
                coarse={coarse}
                time={time}
                getPresignedUrl={getPresignedUrl}
                decryptedBody={decryptedBody}
              />
            ) : !self && isDeleting ? (
              deletingStatus
            ) : null}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          <ChatMessageReactions
            reactions={msg.reactions}
            coarse={coarse}
            disabled={isDeleting || syncing}
            expanded={rowActive}
            reserveSpace={reserveReactionSpace}
            pickerOpen={reactionPickerOpen}
            onPickerOpenChange={setReactionPickerOpen}
            onToggle={(reaction: any) => onToggleReaction?.(msg, reaction)}
          />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );

  if (mobileContextMenu || isDeleting) {
    return bubble;
  }

  return (
    <ContextMenu.Root
      open={contextMenuOpen}
      onOpenChange={(next: any) => {
        if (isDeleting) {
          setContextMenuOpen(false);
          setContextLinkHref(null);
          contextLinkHrefRef.current = null;
          return;
        }
        setContextMenuOpen(next);
        if (!next) {
          setContextLinkHref(null);
          contextLinkHrefRef.current = null;
        }
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
          onCloseAutoFocus={(e: any) => e.preventDefault()}
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
            onReloadOg={onReloadOg}
            onSelectCopy={onSelectCopy}
            shiftHeldRef={shiftHeldRef}
            getPresignedUrl={getPresignedUrl}
            linkHref={contextLinkHref}
            decryptedBody={decryptedBody}
            _Item={ContextMenu.Item}
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
});
const ChatMessageList = forwardRef(function ChatMessageList(
  {
    // @ts-expect-error TS(2339) FIXME: Property 'messages' does not exist on type '{}'.
    messages,
    // @ts-expect-error TS(2339) FIXME: Property 'ogStorage' does not exist on type '{}'.
    ogStorage,
    // @ts-expect-error TS(2339) FIXME: Property 'timeZone' does not exist on type '{}'.
    timeZone,
    // @ts-expect-error TS(2339) FIXME: Property 'highlightId' does not exist on type '{}'... Remove this comment to see the full error message
    highlightId,
    // @ts-expect-error TS(2339) FIXME: Property 'editingMessageId' does not exist on type... Remove this comment to see the full error message
    editingMessageId = null,
    // @ts-expect-error TS(2339) FIXME: Property 'onReachTop' does not exist on type '{}'.
    onReachTop,
    /** Silent multi-day older load for viewport fill (no loadingOlder UI). */
    // @ts-expect-error TS(2339) FIXME: Property 'onFillOlder' does not exist on type '{}'... Remove this comment to see the full error message
    onFillOlder,
    // @ts-expect-error TS(2339) FIXME: Property 'onReachBottom' does not exist on type '{... Remove this comment to see the full error message
    onReachBottom,
    // @ts-expect-error TS(2339) FIXME: Property 'loadingOlder' does not exist on type '{}... Remove this comment to see the full error message
    loadingOlder = false,
    // @ts-expect-error TS(2339) FIXME: Property 'loadingNewer' does not exist on type '{}... Remove this comment to see the full error message
    loadingNewer = false,
    // @ts-expect-error TS(2339) FIXME: Property 'hasMore' does not exist on type '{}'.
    hasMore = false,
    // @ts-expect-error TS(2339) FIXME: Property 'hasMoreNewer' does not exist on type '{}... Remove this comment to see the full error message
    hasMoreNewer = false,
    // @ts-expect-error TS(2339) FIXME: Property 'onReply' does not exist on type '{}'.
    onReply,
    // @ts-expect-error TS(2339) FIXME: Property 'onDelete' does not exist on type '{}'.
    onDelete,
    // @ts-expect-error TS(2339) FIXME: Property 'onEdit' does not exist on type '{}'.
    onEdit,
    // @ts-expect-error TS(2339) FIXME: Property 'onAddToNote' does not exist on type '{}'... Remove this comment to see the full error message
    onAddToNote,
    // @ts-expect-error TS(2339) FIXME: Property 'onViewEditHistory' does not exist on typ... Remove this comment to see the full error message
    onViewEditHistory,
    // @ts-expect-error TS(2339) FIXME: Property 'onTogglePin' does not exist on type '{}'... Remove this comment to see the full error message
    onTogglePin,
    // @ts-expect-error TS(2339) FIXME: Property 'onToggleCollapse' does not exist on type... Remove this comment to see the full error message
    onToggleCollapse,
    // @ts-expect-error TS(2339) FIXME: Property 'onToggleReaction' does not exist on type... Remove this comment to see the full error message
    onToggleReaction,
    // @ts-expect-error TS(2339) FIXME: Property 'onOpenNote' does not exist on type '{}'.
    onOpenNote,
    // @ts-expect-error TS(2339) FIXME: Property 'onOpenReplyTarget' does not exist on typ... Remove this comment to see the full error message
    onOpenReplyTarget,
    // @ts-expect-error TS(2339) FIXME: Property 'onRequestDecrypt' does not exist on type... Remove this comment to see the full error message
    onRequestDecrypt,
    /** @type {Record<string, string>} */
    // @ts-expect-error TS(2339) FIXME: Property 'decryptedById' does not exist on type '{... Remove this comment to see the full error message
    decryptedById = {},
    // @ts-expect-error TS(2339) FIXME: Property 'emptyHint' does not exist on type '{}'.
    emptyHint,
    // @ts-expect-error TS(2339) FIXME: Property 'getPresignedUrl' does not exist on type ... Remove this comment to see the full error message
    getPresignedUrl,
    /** @type {Map<string, string>|Record<string, string>|null} */
    // @ts-expect-error TS(2339) FIXME: Property 'groupIconByName' does not exist on type ... Remove this comment to see the full error message
    groupIconByName = null,
    /** @type {Map<string, string>|Record<string, string>|null} */
    // @ts-expect-error TS(2339) FIXME: Property 'groupLabelByKey' does not exist on type ... Remove this comment to see the full error message
    groupLabelByKey = null,
    /** @type {((path: string) => boolean) | null | undefined} */
    // @ts-expect-error TS(2339) FIXME: Property 'noteExists' does not exist on type '{}'.
    noteExists,
    /** @type {((path: string) => boolean) | null | undefined} */
    // @ts-expect-error TS(2339) FIXME: Property 'folderExists' does not exist on type '{}... Remove this comment to see the full error message
    folderExists,
    /** @type {((folderPath: string) => Array<{ path: string, name: string }>) | null | undefined} */
    // @ts-expect-error TS(2339) FIXME: Property 'listFolderFiles' does not exist on type ... Remove this comment to see the full error message
    listFolderFiles,
    /** Kept for settings API; virtualized path never uses layout/popLayout. */
    // @ts-expect-error TS(2339) FIXME: Property 'enableMessageLayoutAnim' does not exist ... Remove this comment to see the full error message
    enableMessageLayoutAnim: _enableMessageLayoutAnim = true,
    /** Bubble will-change + brightness press filter. */
    // @ts-expect-error TS(2339) FIXME: Property 'enableBubblePressFx' does not exist on t... Remove this comment to see the full error message
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
  /** True while silent viewport-fill prepends; suppresses stick-bottom RO. */
  const fillingRef = useRef(false);
  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;
  const listHostRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [sheetMessage, setSheetMessage] = useState(null);
  const [sheetLinkHref, setSheetLinkHref] = useState(
    /** @type {string|null} */ (null),
  );
  const [selectCopyMessage, setSelectCopyMessage] = useState(null);
  const [ogReloadById, setOgReloadById] = useState(
    /** @type {Record<string, number>} */ ({}),
  );
  const [reactionPickerMsgId, setReactionPickerMsgId] = useState(null);
  /** Session-only: temporarily show a collapsed message without persisting. */
  const [peekedCollapsedId, setPeekedCollapsedId] = useState(
    /** @type {string|null} */ (null),
  );
  const [overlayDate, setOverlayDate] = useState(
    /** @type {{ label: string, dateStr: string } | null} */ (null),
  );
  const coarse = useIsCoarsePointer();
  const mobileContextMenu = useMobileContextMenuMode();
  const shiftHeldRef = useShiftHeldRef();

  const openMobileSheet = useCallback((msg: any, linkHref = null) => {
    if (!msg) return;
    setSheetLinkHref(linkHref || null);
    setSheetMessage(msg);
  }, []);

  const closeMobileSheet = useCallback(() => {
    setSheetMessage(null);
    setSheetLinkHref(null);
  }, []);

  useEffect(() => {
    // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
    if (!sheetMessage?.id) return;
    // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
    const current = messages.find((m: any) => m.id === sheetMessage.id);
    if (!current || current.pendingSync === 'delete') {
      closeMobileSheet();
    }
  }, [messages, sheetMessage, closeMobileSheet]);

  useEffect(() => {
    // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
    if (!selectCopyMessage?.id) return;
    // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
    const current = messages.find((m: any) => m.id === selectCopyMessage.id);
    if (!current || current.pendingSync === 'delete') {
      setSelectCopyMessage(null);
    }
  }, [messages, selectCopyMessage]);

  useEffect(() => {
    if (!peekedCollapsedId) return;
    const current = messages.find((m: any) => m.id === peekedCollapsedId);
    const stillCollapsed =
      current &&
      current.pendingSync !== 'delete' &&
      (current.collapsed === '1' || current.collapsed === true);
    if (!stillCollapsed) setPeekedCollapsedId(null);
  }, [messages, peekedCollapsedId]);

  const handleBubbleActivate = useCallback((msg: any) => {
    if (!msg?.id) return;
    const isCollapsed = msg.collapsed === '1' || msg.collapsed === true;
    setPeekedCollapsedId((prev) => {
      if (isCollapsed) return prev === msg.id ? null : msg.id;
      return null;
    });
  }, []);

  const handleSelectCopy = useCallback((msg: any) => {
    if (!msg) return;
    closeMobileSheet();
    setSelectCopyMessage(msg);
  }, [closeMobileSheet]);

  const handleReloadOg = useCallback((msg: any) => {
    const id = msg?.id;
    if (!id) return;
    setOgReloadById((prev) => ({
      ...prev,
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      [id]: (prev[id] || 0) + 1,
    }));
  }, []);

  const items = useMemo(() => {
    const tz = timeZone || detectTimeZone();
    const out = [];
    let lastDate = '';
    let prevGroup = null;
    let prevAtMs = 0;
    const labelOf = (key: any) => {
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
    if (!hasMore && messages.length > 0) {
      out.push({ type: 'end-older', key: 'end-older' });
    }
    for (const item of items) out.push(item);
    if (messages.length === 0) {
      out.push({ type: 'empty', key: 'empty' });
    }
    return out;
  }, [items, hasMore, messages.length]);

  const messageIdToIndex = useMemo(() => {
    const map = new Map();
    rows.forEach((row, index) => {
      // @ts-expect-error TS(2339) FIXME: Property 'msg' does not exist on type '{ type: str... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339) FIXME: Property 'dateStr' does not exist on type '{ type:... Remove this comment to see the full error message
      if (row.type === 'date' && row.dateStr) map.set(row.dateStr, index);
    });
    return map;
  }, [rows]);

  const scrollToMessageId = useCallback(
    (messageId: any, opts = {}) => {
      if (!messageId || !listRef.current) return false;
      const index = messageIdToIndex.get(messageId);
      if (index == null) return false;
      // @ts-expect-error TS(2339) FIXME: Property 'scrollToIndex' does not exist on type 'n... Remove this comment to see the full error message
      listRef.current.scrollToIndex(index, {
        // @ts-expect-error TS(2339) FIXME: Property 'align' does not exist on type '{}'.
        align: opts.align || 'start',
        // @ts-expect-error TS(2339) FIXME: Property 'align' does not exist on type '{}'.
        offset: opts.align === 'start' ? -CHAT_MESSAGE_SCROLL_MARGIN : 0,
      });
      return true;
    },
    [messageIdToIndex],
  );

  const scrollToDateStr = useCallback(
    (dateStr: any) => {
      if (!dateStr || !listRef.current) return false;
      const index = dateStrToIndex.get(dateStr);
      if (index == null) return false;
      // @ts-expect-error TS(2339) FIXME: Property 'scrollToIndex' does not exist on type 'n... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339) FIXME: Property 'scrollToIndex' does not exist on type 'n... Remove this comment to see the full error message
      list.scrollToIndex(Math.max(0, rows.length - 1), { align: 'end' });
      requestAnimationFrame(() => {
        // @ts-expect-error TS(2339) FIXME: Property 'scrollToIndex' does not exist on type 'n... Remove this comment to see the full error message
        listRef.current?.scrollToIndex(Math.max(0, rows.length - 1), {
          align: 'end',
        });
      });
      initialBottomPinRef.current = false;
      return;
    }

    if (stickBottomRef.current && grewAtEnd && !prepended) {
      // @ts-expect-error TS(2339) FIXME: Property 'scrollToIndex' does not exist on type 'n... Remove this comment to see the full error message
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
  // Skip while silent fill is prepending — virtua shift owns scroll then.
  useEffect(() => {
    if (highlightId || editingMessageId) return undefined;
    const host = listHostRef.current;
    if (!host || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => {
      if (fillingRef.current) return;
      if (!stickBottomRef.current || !listRef.current) return;
      // @ts-expect-error TS(2339) FIXME: Property 'scrollToIndex' does not exist on type 'n... Remove this comment to see the full error message
      listRef.current.scrollToIndex(Math.max(0, rows.length - 1), {
        align: 'end',
      });
    });
    // @ts-expect-error TS(2339) FIXME: Property 'firstElementChild' does not exist on typ... Remove this comment to see the full error message
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
    (offset: any) => {
      const list = listRef.current;
      if (!list || rows.length === 0) {
        setOverlayDate(null);
        return;
      }
      // @ts-expect-error TS(2339) FIXME: Property 'findItemIndex' does not exist on type 'n... Remove this comment to see the full error message
      const index = list.findItemIndex(offset + 4);
      let dateRow: any = null;
      for (let i = Math.min(index, rows.length - 1); i >= 0; i -= 1) {
        const row = rows[i];
        if (row?.type === 'date') {
          dateRow = row;
          break;
        }
      }
      // @ts-expect-error TS(2345) FIXME: Argument of type '(prev: null) => { label: any; da... Remove this comment to see the full error message
      setOverlayDate((prev) => {
        if (!dateRow) return null;
        if (
          prev &&
          // @ts-expect-error TS(2339) FIXME: Property 'dateStr' does not exist on type 'never'.
          prev.dateStr === dateRow.dateStr &&
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'never'.
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
    (offset: any) => {
      const list = listRef.current;
      if (!list) return;

      // @ts-expect-error TS(2339) FIXME: Property 'scrollSize' does not exist on type 'neve... Remove this comment to see the full error message
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

  // Short lists (e.g. one message today) never scroll, so onReachTop never fires.
  // Keep loading older days (silent batch) until content overflows or history ends.
  useEffect(() => {
    const fillFn = onFillOlder || onReachTop;
    if (!hasMore || loadingOlder || !fillFn) return undefined;

    let cancelled = false;
    let raf = 0;
    let attempts = 0;

    const tryFill = () => {
      if (cancelled) return;
      const list = listRef.current;
      if (!list) {
        if (attempts++ < 30) raf = requestAnimationFrame(tryFill);
        return;
      }
      // @ts-expect-error TS(2339) FIXME: Property 'scrollSize' does not exist on type 'neve... Remove this comment to see the full error message
      const scrollSize = Number(list.scrollSize) || 0;
      // @ts-expect-error TS(2339) FIXME: Property 'viewportSize' does not exist on type 'ne... Remove this comment to see the full error message
      const viewportSize = Number(list.viewportSize) || 0;
      if (viewportSize <= 0) {
        if (attempts++ < 30) raf = requestAnimationFrame(tryFill);
        return;
      }
      if (scrollSize > viewportSize + LOAD_EDGE_PX) {
        fillingRef.current = false;
        return;
      }
      if (loadingOlderLockRef.current) return;
      if (!hasMoreRef.current) {
        fillingRef.current = false;
        return;
      }

      fillingRef.current = true;
      loadingOlderLockRef.current = true;
      // Stay pinned to newest; virtua shift keeps bottom items visible.
      Promise.resolve(fillFn())
        .then((advanced) => {
          loadingOlderLockRef.current = false;
          if (cancelled || advanced === false) {
            fillingRef.current = false;
            return;
          }
          raf = requestAnimationFrame(tryFill);
        })
        .catch(() => {
          loadingOlderLockRef.current = false;
          fillingRef.current = false;
        });
    };

    raf = requestAnimationFrame(tryFill);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      fillingRef.current = false;
    };
  }, [hasMore, loadingOlder, onFillOlder, onReachTop, messages.length, rows.length]);

  const renderRow = useCallback(
    (row: any, index: any) => {
      if (row.type === 'end-older') {
        return (
          <div
            key={row.key}
            className="mx-auto w-full max-w-full px-3 py-1 text-center text-[10px] text-gray-400 md:max-w-[min(100%,50vw)]"
          >
            더 이상 없음
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
            onOpenMobileSheet={openMobileSheet}
            onSelectCopy={handleSelectCopy}
            onReloadOg={handleReloadOg}
            onBubbleActivate={handleBubbleActivate}
            onRequestDecrypt={onRequestDecrypt}
            decryptedBody={
              decryptedById[row.msg.id] != null
                ? decryptedById[row.msg.id]
                : null
            }
            peeked={peekedCollapsedId === row.msg.id}
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ogReloadKey={ogReloadById[row.msg.id] || 0}
            shiftHeldRef={shiftHeldRef}
            coarse={coarse}
            mobileContextMenu={mobileContextMenu}
            // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
            rowSelected={sheetMessage?.id === row.msg.id}
            isEditing={editingMessageId === row.msg.id}
            externalReactionPickerOpen={reactionPickerMsgId === row.msg.id}
            onReactionPickerOpenChange={(open: any) => {
              setReactionPickerMsgId(open ? row.msg.id : null);
            }}
            getPresignedUrl={getPresignedUrl}
            noteExists={noteExists}
            folderExists={folderExists}
            listFolderFiles={listFolderFiles}
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
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
      onRequestDecrypt,
      decryptedById,
      shiftHeldRef,
      coarse,
      // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
      sheetMessage?.id,
      reactionPickerMsgId,
      peekedCollapsedId,
      handleBubbleActivate,
      getPresignedUrl,
      noteExists,
      folderExists,
      listFolderFiles,
      enableBubblePressFx,
      groupIconByName,
      groupLabelByKey,
      lastMessageRowIndex,
      handleSelectCopy,
      handleReloadOg,
      openMobileSheet,
      ogReloadById,
    ],
  );

  const highlightIndex = highlightId
    ? messageIdToIndex.get(highlightId)
    : undefined;
  const keepMounted =
    highlightIndex != null ? [highlightIndex] : undefined;

  return <>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    <div
      ref={listHostRef}
      className="relative min-h-0 max-h-full flex-1 overflow-hidden"
    >
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
      {overlayDate ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
          <ChatDateDivider
            sticky={false}
            // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'never'.
            label={overlayDate.label}
            className="pointer-events-none shadow-sm"
          />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      ) : null}
      {loadingOlder ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center py-2"
          aria-label="이전 대화 불러오는 중"
          role="status"
        >
          <Loader2 size={16} className="animate-spin text-gray-400" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      ) : null}
      {loadingNewer ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center py-2"
          aria-label="이후 대화 불러오는 중"
          role="status"
        >
          <Loader2 size={16} className="animate-spin text-gray-400" />
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      ) : null}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
    <ChatMessageContextMenu
      open={Boolean(sheetMessage)}
      message={sheetMessage}
      linkHref={sheetLinkHref}
      decryptedBody={
        // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
        sheetMessage?.id != null && decryptedById[sheetMessage.id] != null
          // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
          ? decryptedById[sheetMessage.id]
          : null
      }
      onOpenChange={(next: any) => {
        if (!next) closeMobileSheet();
      }}
      onReply={onReply}
      onDelete={onDelete}
      onEdit={onEdit}
      onAddToNote={onAddToNote}
      onViewEditHistory={onViewEditHistory}
      onTogglePin={onTogglePin}
      onToggleCollapse={onToggleCollapse}
      onOpenReactionPicker={(m: any) => {
        closeMobileSheet();
        setReactionPickerMsgId(m?.id || null);
      }}
      onReloadOg={handleReloadOg}
      onSelectCopy={handleSelectCopy}
      getPresignedUrl={getPresignedUrl}
      shiftHeldRef={shiftHeldRef}
    />
    <ChatMessageSelectCopyModal
      open={Boolean(selectCopyMessage)}
      message={selectCopyMessage}
      onOpenChange={(next: any) => {
        if (!next) setSelectCopyMessage(null);
      }}
      ogStorage={ogStorage}
      timeZone={timeZone}
      getPresignedUrl={getPresignedUrl}
      noteExists={noteExists}
      folderExists={folderExists}
      listFolderFiles={listFolderFiles}
      onOpenNote={onOpenNote}
      groupLabel={
        selectCopyMessage
          ? groupLabelByKey instanceof Map
            // @ts-expect-error TS(2339) FIXME: Property 'group' does not exist on type 'never'.
            ? groupLabelByKey.get(selectCopyMessage.group) ||
              // @ts-expect-error TS(2339) FIXME: Property 'group' does not exist on type 'never'.
              selectCopyMessage.group
            // @ts-expect-error TS(2339) FIXME: Property 'group' does not exist on type 'never'.
            : groupLabelByKey?.[selectCopyMessage.group] ||
              // @ts-expect-error TS(2339) FIXME: Property 'group' does not exist on type 'never'.
              selectCopyMessage.group
          : undefined
      }
    />
  </>;
});

export default ChatMessageList;
