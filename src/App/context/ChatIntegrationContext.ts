import { createContext } from 'react';

/** Chat-with-myself integration handlers for AppLayout. */
export type ChatIntegrationValue = {
  chatStorageCtx: any;
  chatStorageReady: boolean;
  shareGroupSend: any;
  handleShareBlockingChange: (...args: any[]) => any;
  handleShareComposeClaimed: (...args: any[]) => any;
  handleShareGroupSendConsumed: (...args: any[]) => any;
  handleShareNodeToChatWithMyself: (...args: any[]) => any;
  handleShareNoteToChatWithMyself: (...args: any[]) => any;
  handleCreateNoteFromChatMessage: (...args: any[]) => any;
  handleOpenNoteFromChat: (...args: any[]) => any;
  getChatImageUrlForPath: (...args: any[]) => any;
  getAdvancedSearchChatGroups: (...args: any[]) => any;
};

export const CHAT_INTEGRATION_KEYS = [
  'chatStorageCtx',
  'chatStorageReady',
  'shareGroupSend',
  'handleShareBlockingChange',
  'handleShareComposeClaimed',
  'handleShareGroupSendConsumed',
  'handleShareNodeToChatWithMyself',
  'handleShareNoteToChatWithMyself',
  'handleCreateNoteFromChatMessage',
  'handleOpenNoteFromChat',
  'getChatImageUrlForPath',
  'getAdvancedSearchChatGroups',
] as const satisfies readonly (keyof ChatIntegrationValue)[];

export const ChatIntegrationContext = createContext<ChatIntegrationValue | null>(null);
