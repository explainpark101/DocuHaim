import { ActivityTypes, flashActivityIndicator } from '@/contexts/ActivityIndicatorContext';
import { isTelegramAppPathname } from '@/utils/appHref';
import { isTauriAndroid } from '@/utils/tauriPlatform';
import { patchTelegram } from '@/utils/telegram/telegramState';
import type { TelegramDialogItem, TelegramMessageItem } from '@/utils/telegram/types';

const ANDROID_CHANNEL_ID = 'telegram-messages';

function clip(text: string, max = 140): string {
  const trimmed = text.replace(/\s+/g, ' ').trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

function telegramSurfaceFocused(): boolean {
  if (typeof document === 'undefined' || document.visibilityState !== 'visible') return false;
  const path = window.location.pathname || '/';
  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1).split('?')[0] || '/'
    : '';
  return isTelegramAppPathname(path) || (hash ? isTelegramAppPathname(hash) : false);
}

export async function notifyTelegramIncoming(title: string, body: string): Promise<void> {
  const safeTitle = clip(title, 80) || 'Telegram';
  const safeBody = clip(body, 180) || '새 메시지';
  if (!telegramSurfaceFocused()) {
    flashActivityIndicator({
      id: `telegram-incoming-${Date.now()}`,
      type: ActivityTypes.TELEGRAM_SYNC,
      label: safeTitle,
      detail: safeBody,
      status: 'done',
    });
  }
  if (typeof document !== 'undefined' && !document.hidden && !isTauriAndroid()) return;

  if (isTauriAndroid()) {
    try {
      const notification = await import('@tauri-apps/plugin-notification');
      let granted = await notification.isPermissionGranted();
      if (!granted) {
        const perm = await notification.requestPermission();
        granted = perm === 'granted';
      }
      if (!granted) return;
      await notification.createChannel({
        id: ANDROID_CHANNEL_ID,
        name: 'Telegram',
        importance: notification.Importance.Default,
      });
      notification.sendNotification({
        title: safeTitle,
        body: safeBody,
        channelId: ANDROID_CHANNEL_ID,
      });
    } catch {
      // Notification plugin is optional until the shell is rebuilt.
    }
    return;
  }

  if (typeof document === 'undefined' || !document.hidden) return;
  if (typeof Notification === 'undefined') return;
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }
  if (permission !== 'granted') return;
  new Notification(safeTitle, { body: safeBody });
}

export function applyIncomingMessage(
  dialogs: TelegramDialogItem[],
  activeDialogId: string | null,
  messages: TelegramMessageItem[],
  incoming: TelegramMessageItem,
): void {
  const nextDialogs = dialogs.map((dialog) => {
    if (dialog.id !== incoming.dialogId) return dialog;
    const viewing = activeDialogId === incoming.dialogId && document.visibilityState === 'visible';
    return {
      ...dialog,
      preview: incoming.text || incoming.mediaName || dialog.preview,
      unread: viewing || incoming.out ? dialog.unread : dialog.unread + 1,
    };
  });
  const nextMessages =
    activeDialogId === incoming.dialogId
      ? messages.some((m) => m.id === incoming.id)
        ? messages
        : [...messages, incoming]
      : messages;
  patchTelegram({ dialogs: nextDialogs, messages: nextMessages });
}
