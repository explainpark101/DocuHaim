import { useEffect, useState } from 'react';
import {
  Copy,
  FilePlus2,
  FileText,
  History,
  Pencil,
  Pin,
  Reply,
  Share2,
  Trash2,
  ChevronsDownUp,
  ChevronsUpDown,
  SmilePlus,
  RefreshCw,
  TextSelect,
  Link2,
} from 'lucide-react';
import MobileContextMenuModal from '@/components/shared/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/shared/contextMenu/mobileContextMenuStyles';
import {
  canOfferWebShare,
  ENCRYPTED_MESSAGE_LABEL,
  extractUrls,
  formatChatMessageMarkdownCopy,
  formatChatMessagePlainText,
  isChatMessageEncrypted,
  shareChatMessage,
} from '@/utils/chatWithMyself';
import { copyText } from '@/utils/shared/copyText';

/** Briefly block selection after open (long-press residual selection). */
const SELECT_NONE_MS = 200;

/**
 * Mobile message actions dialog (centered).
 * Desktop uses ContextMenu / DropdownMenu in ChatMessageList.
 */
export default function ChatMessageContextMenu({
  open,
  message,
  linkHref = null,
  decryptedBody = null,
  onOpenChange,
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
  getPresignedUrl,
  shiftHeldRef
}: any) {
  const [selectNone, setSelectNone] = useState(false);
  const isOpen = Boolean(open && message);

  useEffect(() => {
    if (!isOpen) {
      setSelectNone(false);
      return undefined;
    }
    setSelectNone(true);
    const tSelect = window.setTimeout(() => setSelectNone(false), SELECT_NONE_MS);
    return () => window.clearTimeout(tSelect);
  }, [isOpen]);

  if (!message && !open) return null;

  const hasEditHistory = Boolean(message?.editedAt);
  const pinned = Boolean(message?.pinnedAt);
  const collapsed =
    message?.collapsed === '1' || message?.collapsed === true;
  const encryptedLocked =
    isChatMessageEncrypted(message) && decryptedBody == null;
  const resolvedMsg =
    decryptedBody != null
      ? { ...message, body: decryptedBody, encrypted: false }
      : message;
  const shareAvailable = canOfferWebShare();
  const hasLinks = encryptedLocked
    ? false
    : extractUrls(resolvedMsg?.body || '').length > 0;
  const copyLinkHref = String(linkHref || '').trim() || null;

  const messagePreview = encryptedLocked
    ? ENCRYPTED_MESSAGE_LABEL
    : (resolvedMsg?.body || '').replace(/\s+/g, ' ').slice(0, 120) ||
      '(빈 메시지)';

  const menuBtnClass = MOBILE_CONTEXT_MENU_ITEM_CLASS;

  return (
    <MobileContextMenuModal
      open={isOpen}
      onOpenChange={(next: any) => onOpenChange?.(next)}
      title={messagePreview}
      subtitle="채팅 메시지"
      bodyClassName={selectNone ? 'select-none' : ''}
    >
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          onReply?.(message);
          onOpenChange?.(false);
        }}
      >
        <Reply size={16} className="shrink-0 text-gray-500" />
        답장
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          onOpenReactionPicker?.(message);
          onOpenChange?.(false);
        }}
      >
        <SmilePlus size={16} className="shrink-0 text-gray-500" />
        반응 추가
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      {!encryptedLocked ? (
        <button
          type="button"
          className={menuBtnClass}
          onClick={() => {
            onEdit?.(message);
            onOpenChange?.(false);
          }}
        >
          <Pencil size={16} className="shrink-0 text-gray-500" />
          수정
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      {hasEditHistory ? (
        <button
          type="button"
          className={menuBtnClass}
          onClick={() => {
            onViewEditHistory?.(message);
            onOpenChange?.(false);
          }}
        >
          <History size={16} className="shrink-0 text-gray-500" />
          수정기록 보기
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          onTogglePin?.(message);
          onOpenChange?.(false);
        }}
      >
        <Pin
          size={16}
          className={`shrink-0 text-gray-500 ${pinned ? 'fill-current' : ''}`}
        />
        {pinned ? '고정 해제' : '고정'}
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          onToggleCollapse?.(message);
          onOpenChange?.(false);
        }}
      >
        {collapsed ? (
          <ChevronsUpDown size={16} className="shrink-0 text-gray-500" />
        ) : (
          <ChevronsDownUp size={16} className="shrink-0 text-gray-500" />
        )}
        {collapsed ? '펼치기' : '접기'}
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      {copyLinkHref ? (
        <button
          type="button"
          className={menuBtnClass}
          onClick={() => {
            void copyText(copyLinkHref, {
              message: '링크 복사됨',
              icon: 'link',
            });
            onOpenChange?.(false);
          }}
        >
          <Link2 size={16} className="shrink-0 text-gray-500" />
          링크 복사
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          void copyText(formatChatMessagePlainText(resolvedMsg));
          onOpenChange?.(false);
        }}
      >
        <Copy size={16} className="shrink-0 text-gray-500" />
        내용 복사
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          onSelectCopy?.(resolvedMsg);
          onOpenChange?.(false);
        }}
      >
        <TextSelect size={16} className="shrink-0 text-gray-500" />
        내용 선택 복사
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={menuBtnClass}
        onClick={() => {
          void copyText(formatChatMessageMarkdownCopy(resolvedMsg));
          onOpenChange?.(false);
        }}
      >
        <FileText size={16} className="shrink-0 text-gray-500" />
        MD 복사
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
      {hasLinks ? (
        <button
          type="button"
          className={menuBtnClass}
          onClick={() => {
            onReloadOg?.(message);
            onOpenChange?.(false);
          }}
        >
          <RefreshCw size={16} className="shrink-0 text-gray-500" />
          OpenGraph 캐시 재로딩
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      {shareAvailable && !encryptedLocked ? (
        <button
          type="button"
          className={menuBtnClass}
          onClick={() => {
            void (async () => {
              await shareChatMessage(resolvedMsg, { getPresignedUrl });
              onOpenChange?.(false);
            })();
          }}
        >
          <Share2 size={16} className="shrink-0 text-gray-500" />
          공유
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      {!encryptedLocked ? (
        <button
          type="button"
          className={menuBtnClass}
          onClick={() => {
            onAddToNote?.(resolvedMsg);
            onOpenChange?.(false);
          }}
        >
          <FilePlus2 size={16} className="shrink-0 text-gray-500" />
          노트로 추가
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      ) : null}
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <button
        type="button"
        className={MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS}
        onPointerDown={(e: any) => {
          if (shiftHeldRef) shiftHeldRef.current = e.shiftKey;
        }}
        onClick={() => {
          onDelete?.(message, {
            skipConfirm: Boolean(shiftHeldRef?.current),
          });
          onOpenChange?.(false);
        }}
      >
        <Trash2 size={16} className="shrink-0" />
        삭제
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </button>
    </MobileContextMenuModal>
  );
}
