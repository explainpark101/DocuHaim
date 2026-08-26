import type { ChatReaction } from '@/utils/chatWithMyself/reactions';

/** Parsed chat message (day file / in-memory window). */
export type ChatMessage = {
  id: string;
  at: string;
  tz?: string;
  source?: string;
  group: string;
  body: string;
  markdown?: boolean;
  encrypted?: boolean;
  replyTo?: string;
  replySnippet?: string;
  replyGroup?: string;
  dateStr?: string;
  editedAt?: string;
  pinnedAt?: string;
  notePath?: string;
  collapsed?: string | boolean;
  reactions?: ChatReaction[];
  reactionsAt?: string;
  editHistory?: { at: string; body: string; group: string }[];
  pendingSync?: boolean | 'send' | 'edit' | 'delete';
  pendingReactionSync?: boolean;
};

export type ChatGroup = {
  id: string;
  name: string;
  iconPath?: string;
  aliases?: string[];
};

export type ComposerImageQueueItem = {
  id: string;
  kind: string;
  path?: string;
  name?: string;
  size?: number | null;
  background?: string | null;
  file: File | null;
  existing?: boolean;
  previewUrl: string | null;
};

export type ChecklistTask = {
  id: string;
  lineIndex: number;
  indent: number;
  completed: boolean;
  text: string;
  rawLine: string;
};

export type ChecklistCategory = {
  name: string;
  tasks: ChecklistTask[];
};
