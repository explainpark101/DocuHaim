import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ChatShareTargetModal from '@/components/chatWithMyself/ChatShareTargetModal';
import {
  claimComposePendingShares,
  enqueuePendingShare,
  flushSendSelfPendingShares,
  hasShareSearchParams,
  peekChoosePendingShare,
  readSharePromptFromWindow,
  removePendingShare,
  shareBodyFromSearch,
} from '@/utils/chatWithMyself/pendingShares';
import { appendChatMessage, SELF_GROUP, postChatSyncEvent } from '@/utils/chatWithMyself';

/**
 * App-level share-target gate:
 * - Shows chooser above the lock blur
 * - Defers AuthModal until the chooser finishes
 * - Queues sendSelf/compose in IndexedDB without unlock
 * - Flushes sendSelf after unlock + storage ready (any route)
 */
export default function ShareTargetGate({
  isUnlocked,
  storageReady,
  chatCtx,
  onBlockingChange,
  onComposeClaimed,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(() => readSharePromptFromWindow());
  const [bootstrapDone, setBootstrapDone] = useState(() =>
    Boolean(readSharePromptFromWindow()),
  );
  const urlClearedRef = useRef(false);
  const flushingRef = useRef(false);
  const composeNavigatedRef = useRef(false);

  const blocking = Boolean(prompt?.body) || !bootstrapDone;

  useEffect(() => {
    onBlockingChange?.(blocking);
  }, [blocking, onBlockingChange]);

  // Clear share query params once (keeps /chat path).
  useLayoutEffect(() => {
    if (urlClearedRef.current) return;
    if (!hasShareSearchParams(location.search)) return;
    urlClearedRef.current = true;
    const body = shareBodyFromSearch(location.search);
    if (body) {
      setPrompt((prev) => (prev?.body ? prev : { body }));
    }
    navigate(
      { pathname: location.pathname, search: '', hash: location.hash },
      { replace: true },
    );
  }, [location.hash, location.pathname, location.search, navigate]);

  // If no URL share, surface a leftover "choose" pending before auth.
  useEffect(() => {
    if (bootstrapDone) return undefined;
    let cancelled = false;
    (async () => {
      try {
        if (!prompt?.body) {
          const choose = await peekChoosePendingShare();
          if (!cancelled && choose?.body) {
            setPrompt({ id: choose.id, body: choose.body });
          }
        }
      } finally {
        if (!cancelled) setBootstrapDone(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bootstrapDone, prompt?.body]);

  const clearPromptRecord = useCallback(async (current) => {
    if (current?.id != null) {
      try {
        await removePendingShare(current.id);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const finishPrompt = useCallback(() => {
    setPrompt(null);
  }, []);

  const handleSendAsSelf = useCallback(async () => {
    const current = prompt;
    if (!current?.body) return;
    try {
      if (isUnlocked && storageReady && chatCtx) {
        const { dateStr } = await appendChatMessage(chatCtx, {
          body: current.body,
          group: SELF_GROUP,
          source: 'share',
        });
        if (dateStr) postChatSyncEvent('day', { dateStr });
        await clearPromptRecord(current);
      } else {
        await clearPromptRecord(current);
        await enqueuePendingShare({ body: current.body, intent: 'sendSelf' });
      }
    } catch {
      try {
        await clearPromptRecord(current);
        await enqueuePendingShare({ body: current.body, intent: 'sendSelf' });
      } catch {
        /* ignore */
      }
    } finally {
      finishPrompt();
    }
  }, [
    prompt,
    isUnlocked,
    storageReady,
    chatCtx,
    clearPromptRecord,
    finishPrompt,
  ]);

  const handleComposeWithGroup = useCallback(async () => {
    const current = prompt;
    if (!current?.body) return;
    try {
      await clearPromptRecord(current);
      const payload = {
        id: `share-group-send-${Date.now()}`,
        body: current.body,
      };
      if (!location.pathname.endsWith('/chat')) {
        navigate('/chat');
      }
      if (isUnlocked) {
        onComposeClaimed?.(payload);
      } else {
        await enqueuePendingShare({ body: current.body, intent: 'compose' });
      }
    } catch {
      /* ignore */
    } finally {
      finishPrompt();
    }
  }, [
    prompt,
    clearPromptRecord,
    finishPrompt,
    isUnlocked,
    location.pathname,
    navigate,
    onComposeClaimed,
  ]);

  const handleClose = useCallback(async () => {
    const current = prompt;
    await clearPromptRecord(current);
    finishPrompt();
  }, [prompt, clearPromptRecord, finishPrompt]);

  // Flush sendSelf pending after unlock + storage ready (any page).
  useEffect(() => {
    if (!isUnlocked || !storageReady || !chatCtx) return undefined;
    if (flushingRef.current) return undefined;
    let cancelled = false;
    flushingRef.current = true;
    (async () => {
      try {
        await flushSendSelfPendingShares(chatCtx);
      } finally {
        if (!cancelled) flushingRef.current = false;
      }
    })();
    return () => {
      cancelled = true;
      flushingRef.current = false;
    };
  }, [isUnlocked, storageReady, chatCtx]);

  // After unlock, claim compose seeds (navigate to chat if needed).
  useEffect(() => {
    if (!isUnlocked || !bootstrapDone || prompt) return undefined;
    let cancelled = false;
    (async () => {
      const composeRows = await claimComposePendingShares();
      if (cancelled || !composeRows.length) return;
      const body = composeRows.map((row) => row.body).filter(Boolean).join('\n\n');
      if (!body) return;
      if (!location.pathname.endsWith('/chat')) {
        composeNavigatedRef.current = true;
        navigate('/chat');
      }
      onComposeClaimed?.({ id: `share-group-send-${Date.now()}`, body });
    })();
    return () => {
      cancelled = true;
    };
  }, [
    isUnlocked,
    bootstrapDone,
    prompt,
    location.pathname,
    navigate,
    onComposeClaimed,
  ]);

  return (
    <ChatShareTargetModal
      isOpen={Boolean(prompt?.body)}
      body={prompt?.body || ''}
      canSendAsSelf
      onSendAsSelf={() => {
        void handleSendAsSelf();
      }}
      onComposeWithGroup={() => {
        void handleComposeWithGroup();
      }}
      onClose={() => {
        void handleClose();
      }}
    />
  );
}

/**
 * Build chat storage ctx from app storage state (null if not ready).
 */
export function useChatStorageCtx({
  storageMode,
  getS3Client,
  s3Bucket,
  localRootHandle,
  webdavConfig,
}) {
  return useMemo(() => {
    if (storageMode === 'local') {
      if (!localRootHandle) return { ready: false, ctx: null };
      return { ready: true, ctx: { mode: 'local', localRootHandle } };
    }
    if (storageMode === 'webdav') {
      const ready = Boolean(webdavConfig?.endpoint && webdavConfig?.username);
      if (!ready) return { ready: false, ctx: null };
      return { ready: true, ctx: { mode: 'webdav', webdavConfig } };
    }
    const client = typeof getS3Client === 'function' ? getS3Client() : null;
    const ready = Boolean(client && s3Bucket);
    if (!ready) return { ready: false, ctx: null };
    return { ready: true, ctx: { mode: 's3', client, bucket: s3Bucket } };
  }, [storageMode, getS3Client, s3Bucket, localRootHandle, webdavConfig]);
}
