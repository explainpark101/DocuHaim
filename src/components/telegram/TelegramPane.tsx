import { useEffect, useState } from 'react';
import { ArrowLeft, LogOut, Plus, RefreshCw } from 'lucide-react';
import Button from '@/components/Button';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { useChatStorageCtx, type UseChatStorageCtxArgs } from '@/components/chatWithMyself/ShareTargetGate';
import TelegramShellGate from '@/components/telegram/TelegramShellGate';
import TelegramLoginModal from '@/components/telegram/TelegramLoginModal';
import TelegramDialogList from '@/components/telegram/TelegramDialogList';
import TelegramMessageList from '@/components/telegram/TelegramMessageList';
import TelegramComposer from '@/components/telegram/TelegramComposer';
import TelegramForwardModal from '@/components/telegram/TelegramForwardModal';
import TelegramCreateChatModal from '@/components/telegram/TelegramCreateChatModal';
import TelegramSaveToVaultModal from '@/components/telegram/TelegramSaveToVaultModal';
import { useTelegramSnapshot } from '@/components/telegram/useTelegramSnapshot';
import { isTelegramShell } from '@/utils/telegram/telegramPlatform';
import {
  connectTelegram,
  connectTelegramWithCredentials,
  disconnectTelegram,
  logoutTelegram,
} from '@/utils/telegram/telegramClient';
import { refreshTelegramDialogs } from '@/utils/telegram/dialogs';
import {
  forwardTelegramMessage,
  loadTelegramHistory,
  sendTelegramText,
  setTelegramReply,
} from '@/utils/telegram/messages';
import { downloadTelegramMedia, sendTelegramFile } from '@/utils/telegram/media';
import { createTelegramChat, type TelegramCreateKind } from '@/utils/telegram/chats';
import { shareTelegramMessageToChat } from '@/utils/telegram/shareToChat';
import { saveTelegramMediaToVault } from '@/utils/telegram/saveToVault';
import { submitLoginInput, patchTelegram, restartLoginForSms } from '@/utils/telegram/telegramState';
import type { TelegramMessageItem } from '@/utils/telegram/types';

type TreeNode = {
  name: string;
  type: string;
  path: string;
  children?: TreeNode[];
};

export type TelegramPaneProps = {
  isActive?: boolean;
  isMobileLayout?: boolean;
  storageMode?: string;
  getS3Client?: () => unknown;
  s3Bucket?: string;
  localRootHandle?: FileSystemDirectoryHandle | null;
  localVaultFsPath?: string;
  webdavConfig?: {
    endpoint: string;
    username: string;
    password: string;
    basePath: string;
  } | null;
  tree?: TreeNode[] | null;
  onVaultSaved?: () => void | Promise<void>;
};

const LOGIN_STATUSES = new Set([
  'need-credentials',
  'need-phone',
  'need-code',
  'need-password',
  'need-name',
]);

export default function TelegramPane({
  isActive = true,
  isMobileLayout = false,
  storageMode = 's3',
  getS3Client,
  s3Bucket,
  localRootHandle = null,
  localVaultFsPath = '',
  webdavConfig = null,
  tree = null,
  onVaultSaved,
}: TelegramPaneProps) {
  const snap = useTelegramSnapshot();
  const { addIndicator, updateIndicator, removeIndicator } = useActivityIndicator();
  const chat = useChatStorageCtx({
    storageMode,
    getS3Client: (getS3Client as UseChatStorageCtxArgs['getS3Client']) ?? null,
    s3Bucket: s3Bucket ?? null,
    localRootHandle,
    webdavConfig,
  });
  const [showList, setShowList] = useState(true);
  const [forwardMessage, setForwardMessage] = useState<TelegramMessageItem | null>(null);
  const [saveMessage, setSaveMessage] = useState<TelegramMessageItem | null>(null);
  const [creating, setCreating] = useState(false);
  const narrow = isMobileLayout;

  useEffect(() => {
    if (!isActive || !isTelegramShell()) return undefined;
    void connectTelegram();
    return undefined;
  }, [isActive]);

  useEffect(() => {
    if (snap.status !== 'connecting' && snap.status !== 'ready') return undefined;
    const id = 'telegram-connect';
    if (snap.status === 'connecting') {
      addIndicator({
        id,
        type: ActivityTypes.TELEGRAM_CONNECT,
        label: 'Telegram 연결 중',
        status: 'processing',
      });
      return undefined;
    }
    updateIndicator(id, { status: 'done', label: 'Telegram 연결됨' });
    const timer = window.setTimeout(() => removeIndicator(id), 2500);
    return () => window.clearTimeout(timer);
  }, [snap.status, addIndicator, updateIndicator, removeIndicator]);

  if (!isTelegramShell()) return <TelegramShellGate />;

  const activeDialog = snap.dialogs.find((dialog) => dialog.id === snap.activeDialogId) || null;
  const showThread = !narrow || !showList;

  const run = async (
    label: string,
    type: (typeof ActivityTypes)[keyof typeof ActivityTypes],
    fn: () => Promise<void>,
  ) => {
    const id = addIndicator({ type, label, status: 'processing' });
    try {
      await fn();
      updateIndicator(id, { status: 'done' });
    } catch (err) {
      const detail = err instanceof Error ? err.message : '실패';
      updateIndicator(id, { status: 'error', detail });
      patchTelegram({ error: detail });
    } finally {
      window.setTimeout(() => removeIndicator(id), 4000);
    }
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex shrink-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        {narrow && !showList ? (
          <Button type="button" variant="tertiary" aria-label="대화 목록" onClick={() => setShowList(true)}>
            <ArrowLeft size={16} />
            목록
          </Button>
        ) : (
          <h1 className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">Telegram</h1>
        )}
        <span className="min-w-0 flex-1 truncate text-sm text-gray-600 dark:text-odp-muted">
          {showThread ? activeDialog?.title || snap.selfName : snap.selfName}
        </span>
        <Button type="button" variant="tertiary" onClick={() => setCreating(true)} disabled={snap.status !== 'ready'}>
          <Plus size={14} />
          만들기
        </Button>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => void refreshTelegramDialogs()}
          disabled={snap.status !== 'ready'}
        >
          <RefreshCw size={14} />
          새로고침
        </Button>
        <Button type="button" variant="secondary" onClick={() => void logoutTelegram()} disabled={snap.status === 'idle'}>
          <LogOut size={14} />
          로그아웃
        </Button>
      </header>
      {snap.error && snap.status === 'error' ? (
        <p className="shrink-0 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-200">
          {snap.error}
        </p>
      ) : null}
      {snap.notice ? (
        <p className="shrink-0 px-3 py-1 text-xs text-sky-800 dark:text-sky-200">{snap.notice}</p>
      ) : null}
      <div className="flex min-h-0 flex-1">
        {(!narrow || showList) && (
          <div className={narrow ? 'flex min-h-0 min-w-0 flex-1 flex-col' : 'flex w-72 shrink-0 flex-col border-r border-gray-200 dark:border-odp-borderSoft'}>
            <TelegramDialogList
              dialogs={snap.dialogs}
              activeId={snap.activeDialogId}
              onSelect={(id) => {
                setShowList(false);
                void loadTelegramHistory(id, false);
              }}
            />
          </div>
        )}
        {showThread ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <TelegramMessageList
              messages={snap.messages}
              loading={snap.messagesLoading}
              hasMore={snap.hasMoreHistory}
              isMobileLayout={isMobileLayout}
              onLoadOlder={() => {
                if (snap.activeDialogId) void loadTelegramHistory(snap.activeDialogId, true);
              }}
              onReply={(message) => setTelegramReply(message)}
              onForward={setForwardMessage}
              onShare={(message) => {
                if (!chat.ready || !chat.ctx || !activeDialog) {
                  patchTelegram({ error: '나와의 채팅 저장소가 준비되지 않았습니다.' });
                  return;
                }
                void run('나와의 채팅으로 공유', ActivityTypes.TELEGRAM_DOWNLOAD, async () => {
                  await shareTelegramMessageToChat(chat.ctx, activeDialog.title, message);
                  patchTelegram({ notice: '나와의 채팅에 공유했습니다.' });
                });
              }}
              onSaveToVault={setSaveMessage}
              onDownload={(message) => {
                void run('기기에 다운로드', ActivityTypes.TELEGRAM_DOWNLOAD, async () => {
                  const media = await downloadTelegramMedia(message.dialogId, message.id);
                  const blob = new Blob([media.bytes as BlobPart], { type: media.mime });
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement('a');
                  anchor.href = url;
                  anchor.download = media.name;
                  anchor.click();
                  URL.revokeObjectURL(url);
                });
              }}
            />
            <TelegramComposer
              replyTo={snap.replyTo}
              disabled={snap.status !== 'ready' || !snap.activeDialogId}
              onClearReply={() => setTelegramReply(null)}
              onSend={(text, file) => {
                const dialogId = snap.activeDialogId;
                if (!dialogId) return;
                const replyId = snap.replyTo?.id;
                void run('Telegram 전송', ActivityTypes.TELEGRAM_SEND, async () => {
                  if (file) await sendTelegramFile(dialogId, file, text, replyId);
                  else await sendTelegramText(dialogId, text, replyId);
                });
              }}
            />
          </div>
        ) : null}
      </div>
      {LOGIN_STATUSES.has(snap.status) ? (
        <TelegramLoginModal
          status={snap.status}
          error={snap.error}
          loginHint={snap.loginHint}
          codeViaApp={snap.codeViaApp}
          onRequestSms={restartLoginForSms}
          onSubmitCredentials={(apiId, apiHash) => {
            void connectTelegramWithCredentials(apiId, apiHash).catch((err) => {
              patchTelegram({
                status: 'error',
                error: err instanceof Error ? err.message : '연결에 실패했습니다.',
              });
            });
          }}
          onSubmitField={submitLoginInput}
          onClose={() => {
            void disconnectTelegram();
          }}
        />
      ) : null}
      {forwardMessage ? (
        <TelegramForwardModal
          dialogs={snap.dialogs.filter((dialog) => dialog.id !== forwardMessage.dialogId)}
          onClose={() => setForwardMessage(null)}
          onPick={(dialogId) => {
            const message = forwardMessage;
            setForwardMessage(null);
            void run('전달', ActivityTypes.TELEGRAM_SEND, async () => {
              await forwardTelegramMessage(message.dialogId, message.id, dialogId);
              patchTelegram({ notice: '전달했습니다.' });
            });
          }}
        />
      ) : null}
      {creating ? (
        <TelegramCreateChatModal
          onClose={() => setCreating(false)}
          onCreate={(kind: TelegramCreateKind, title) => {
            setCreating(false);
            void run(kind === 'channel' ? '채널 만들기' : '그룹 만들기', ActivityTypes.TELEGRAM_SYNC, async () => {
              await createTelegramChat(kind, title);
            });
          }}
        />
      ) : null}
      {saveMessage ? (
        <TelegramSaveToVaultModal
          tree={tree}
          fileName={saveMessage.mediaName || `telegram-${saveMessage.id}`}
          onClose={() => setSaveMessage(null)}
          onConfirm={(folderPath) => {
            const message = saveMessage;
            setSaveMessage(null);
            const mode = storageMode === 'local' || storageMode === 'webdav' || storageMode === 'idb' ? storageMode : 's3';
            void run('Vault에 저장', ActivityTypes.TELEGRAM_DOWNLOAD, async () => {
              await saveTelegramMediaToVault(
                {
                  mode,
                  ...(getS3Client ? { getS3Client } : {}),
                  ...(s3Bucket ? { bucket: s3Bucket } : {}),
                  localRootHandle,
                  localVaultFsPath,
                  webdavConfig,
                },
                folderPath,
                message.dialogId,
                message.id,
              );
              await onVaultSaved?.();
              patchTelegram({ notice: 'Vault에 저장했습니다.' });
            });
          }}
        />
      ) : null}
    </div>
  );
}
