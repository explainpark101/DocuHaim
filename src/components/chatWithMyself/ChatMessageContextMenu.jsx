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
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import {
  canOfferWebShare,
  extractUrls,
  formatChatMessageMarkdownCopy,
  formatChatMessagePlainText,
  shareChatMessage,
} from '@/utils/chatWithMyself';
import { copyText } from '@/utils/copyText';

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
  shiftHeldRef,
}) {
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
  const shareAvailable = canOfferWebShare();
  const hasLinks = extractUrls(message?.body || '').length > 0;
  const copyLinkHref = String(linkHref || '').trim() || null;

  const messagePreview =
    (message?.body || '').replace(/\s+/g, ' ').slice(0, 120) || '(빈 메시지)';

  const menuBtnClass = MOBILE_CONTEXT_MENU_ITEM_CLASS;

  return (
    <MobileContextMenuModal
      open={isOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
      title={messagePreview}
      subtitle="채팅 메시지"
      bodyClassName={selectNone ? 'select-none' : ''}
    >
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
              </button>
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
              </button>
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
              </button>
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
                </button>
              ) : null}
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  onTogglePin?.(message);
                  onOpenChange?.(false);
                }}
              >
                <Pin size={16} className={`shrink-0 text-gray-500 ${pinned ? 'fill-current' : ''}`} />
                {pinned ? '고정 해제' : '고정'}
              </button>
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
                </button>
              ) : null}
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  void copyText(formatChatMessagePlainText(message));
                  onOpenChange?.(false);
                }}
              >
                <Copy size={16} className="shrink-0 text-gray-500" />
                내용 복사
              </button>
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  onSelectCopy?.(message);
                  onOpenChange?.(false);
                }}
              >
                <TextSelect size={16} className="shrink-0 text-gray-500" />
                내용 선택 복사
              </button>
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  void copyText(formatChatMessageMarkdownCopy(message));
                  onOpenChange?.(false);
                }}
              >
                <FileText size={16} className="shrink-0 text-gray-500" />
                MD 복사
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
                </button>
              ) : null}
              {shareAvailable ? (
                <button
                  type="button"
                  className={menuBtnClass}
                  onClick={() => {
                    void (async () => {
                      await shareChatMessage(message, { getPresignedUrl });
                      onOpenChange?.(false);
                    })();
                  }}
                >
                  <Share2 size={16} className="shrink-0 text-gray-500" />
                  공유
                </button>
              ) : null}
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  onAddToNote?.(message);
                  onOpenChange?.(false);
                }}
              >
                <FilePlus2 size={16} className="shrink-0 text-gray-500" />
                노트로 추가
              </button>
              <button
                type="button"
                className={MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS}
                onPointerDown={(e) => {
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
              </button>
    </MobileContextMenuModal>
  );
}
