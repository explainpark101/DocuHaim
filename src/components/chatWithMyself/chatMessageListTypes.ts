import type {
  ComponentType,
  MutableRefObject,
  PointerEvent,
  ReactNode,
} from 'react';
import type { ChatReaction } from '@/utils/chatWithMyself/reactions';
import type {
  ChatMessageContextMenuMessage,
  ChatMessageDeleteOptions,
} from '@/components/chatWithMyself/ChatMessageContextMenu';
import type { ChatMessageListHandle as ScrollChatMessageListHandle } from '@/utils/chatWithMyself/scrollToMessage';

/** Message row used by the chat virtual list / bubble UI. */
export type ChatListMessage = ChatMessageContextMenuMessage & {
  id: string;
  at?: string;
  dateStr?: string;
  replyTo?: string;
  replyGroup?: string;
  replySnippet?: string;
  notePath?: string;
  pendingSync?: 'send' | 'edit' | 'delete' | string;
  reactions?: ChatReaction[];
  reactionsAt?: string;
  markdown?: string | boolean;
};

export type ChatPresignedUrlFn = (
  path: string,
) =>
  | Promise<string | null | undefined>
  | string
  | null
  | undefined;

export type ChatMessageToggleSelectOptions = {
  shiftKey?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  fromCheckbox?: boolean;
};

export type ChatMessageActionHandlers = {
  onReply?: ((message: ChatListMessage) => void) | undefined;
  onDelete?:
    | ((message: ChatListMessage, options?: ChatMessageDeleteOptions) => void)
    | undefined;
  onEdit?: ((message: ChatListMessage) => void) | undefined;
  onAddToNote?: ((message: ChatListMessage) => void) | undefined;
  onViewEditHistory?: ((message: ChatListMessage) => void) | undefined;
  onTogglePin?: ((message: ChatListMessage) => void) | undefined;
  onToggleCollapse?: ((message: ChatListMessage) => void) | undefined;
  onOpenReactionPicker?: ((message: ChatListMessage) => void) | undefined;
  onReloadOg?: ((message: ChatListMessage) => void) | undefined;
  onSelectCopy?: ((message: ChatListMessage) => void) | undefined;
  onEnterSelection?: ((message: ChatListMessage) => void) | undefined;
  onToggleReaction?:
    | ((message: ChatListMessage, reaction: ChatReaction) => void)
    | undefined;
  onOpenNote?:
    | ((path: string, message?: ChatListMessage) => void)
    | undefined;
  onOpenReply?: ((replyToId: string) => void) | undefined;
  onOpenMobileSheet?:
    | ((message: ChatListMessage, linkHref?: string | null) => void)
    | undefined;
  onToggleSelect?:
    | ((
        message: ChatListMessage,
        options?: ChatMessageToggleSelectOptions,
      ) => void)
    | undefined;
  onBubbleActivate?: ((message: ChatListMessage) => void) | undefined;
  onRequestDecrypt?: ((message: ChatListMessage) => void) | undefined;
  getPresignedUrl?: ChatPresignedUrlFn | null | undefined;
};

/** Radix ContextMenu.Item / DropdownMenu.Item-compatible action row. */
export type ChatMessageMenuItemComponent = ComponentType<{
  className?: string | undefined;
  onSelect?: ((event: Event) => void) | undefined;
  onPointerDown?: ((event: PointerEvent) => void) | undefined;
  children?: ReactNode | undefined;
}>;

/** Imperative API shared with scrollToMessage helpers / Pane. */
export type ChatMessageListHandle = ScrollChatMessageListHandle;

export type ChatVirtualDateRow = {
  type: 'date';
  key: string;
  label: string;
  dateStr: string;
};

export type ChatVirtualMsgRow = {
  type: 'msg';
  key: string;
  msg: ChatListMessage;
  showName: boolean;
  clustered: boolean;
  groupLabel: string;
};

export type ChatVirtualEndRow = {
  type: 'end-older';
  key: string;
};

export type ChatVirtualEmptyRow = {
  type: 'empty';
  key: string;
};

export type ChatVirtualRow =
  | ChatVirtualDateRow
  | ChatVirtualMsgRow
  | ChatVirtualEndRow
  | ChatVirtualEmptyRow;

export type ChatMessageListProps = ChatMessageActionHandlers & {
  messages: ChatListMessage[];
  ogStorage?: unknown;
  timeZone?: string | null | undefined;
  highlightId?: string | null | undefined;
  editingMessageId?: string | null | undefined;
  onReachTop?: (() => void | boolean | Promise<void | boolean>) | undefined;
  onFillOlder?: (() => void | boolean | Promise<void | boolean>) | undefined;
  onReachBottom?: (() => void | boolean | Promise<void | boolean>) | undefined;
  loadingOlder?: boolean | undefined;
  loadingNewer?: boolean | undefined;
  hasMore?: boolean | undefined;
  hasMoreNewer?: boolean | undefined;
  onJumpToBottom?: (() => void) | null | undefined;
  jumpToBottomBusy?: boolean | undefined;
  onOpenReplyTarget?: ((replyToId: string) => void) | undefined;
  decryptedById?: Record<string, string> | undefined;
  emptyHint?: string | null | undefined;
  groupIconByName?: Map<string, string> | Record<string, string> | null | undefined;
  groupLabelByKey?: Map<string, string> | Record<string, string> | null | undefined;
  noteExists?: ((path: string) => boolean) | null | undefined;
  folderExists?: ((path: string) => boolean) | null | undefined;
  listFolderFiles?:
    | ((folderPath: string) => Array<{ path: string; name: string }>)
    | null
    | undefined;
  enableMessageLayoutAnim?: boolean | undefined;
  enableBubblePressFx?: boolean | undefined;
  selectionMode?: boolean | undefined;
  selectedIds?: Set<string> | null | undefined;
};

export type { MutableRefObject };
