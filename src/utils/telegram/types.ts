export type TelegramConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'need-credentials'
  | 'need-phone'
  | 'need-code'
  | 'need-password'
  | 'need-name'
  | 'ready'
  | 'error';

export type TelegramLoginField = 'phone' | 'code' | 'password' | 'name';

export type TelegramDialogItem = {
  id: string;
  title: string;
  unread: number;
  preview: string;
  isChannel: boolean;
  isGroup: boolean;
};

export type TelegramMessageItem = {
  id: number;
  dialogId: string;
  text: string;
  date: number;
  out: boolean;
  senderLabel: string;
  replyToId: number | null;
  hasMedia: boolean;
  mediaName: string;
};

export type TelegramReplyDraft = {
  id: number;
  snippet: string;
};

export type TelegramSnapshot = {
  status: TelegramConnectionStatus;
  error: string | null;
  selfName: string;
  dialogs: TelegramDialogItem[];
  activeDialogId: string | null;
  messages: TelegramMessageItem[];
  messagesLoading: boolean;
  hasMoreHistory: boolean;
  replyTo: TelegramReplyDraft | null;
  notice: string | null;
  /** Shown on the in-app login step (where the code was sent, 2FA hint, sign-up). */
  loginHint: string | null;
  /** True when Telegram delivered the login code to another Telegram client. */
  codeViaApp: boolean;
  /** portal-phone / portal-code: my.telegram.org confirmation. mtproto: device sign-in. */
  loginStep: 'portal-phone' | 'portal-code' | 'mtproto' | null;
};

export type TelegramStoredSession = {
  apiId: number;
  apiHash: string;
  session: string;
};
