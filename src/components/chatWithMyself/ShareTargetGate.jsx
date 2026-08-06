import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ChatShareTargetModal from '@/components/chatWithMyself/ChatShareTargetModal';
import {
  claimComposePendingShares,
  enqueuePendingShare,
  flushSendSelfPendingShares,
  hasShareSearchParams,
  loadShareTargetFiles,
  normalizeShareFiles,
  peekChoosePendingShare,
  readSharePromptFromWindow,
  removePendingShare,
  shareBodyFromSearch,
  sharePromptHasContent,
} from '@/utils/chatWithMyself/pendingShares';
import {
  SELF_GROUP,
  appendShareChatMessage,
  postChatLocalSyncEvent,
  postChatSyncEvent,
} from '@/utils/chatWithMyself';

function pendingChooseToPrompt(choose) {
  if (!choose || !sharePromptHasContent(choose)) return null;
  return {
    id: choose.id,
    body: choose.body || '',
    files: normalizeShareFiles(choose.files),
  };
}

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
  const initialShareUrl =
    typeof window !== 'undefined' && hasShareSearchParams(window.location.search);
  const [prompt, setPrompt] = useState(() => readSharePromptFromWindow());
  const [bootstrapDone, setBootstrapDone] = useState(() => Boolean(initialShareUrl));
  const [shareIntakePending, setShareIntakePending] = useState(() =>
    Boolean(initialShareUrl),
  );
  const urlClearedRef = useRef(false);
  const actionLockRef = useRef(false);
  const ensureChatOpenRef = useRef(() => {});
  const onComposeClaimedRef = useRef(onComposeClaimed);

  const blocking =
    sharePromptHasContent(prompt) || !bootstrapDone || shareIntakePending;

  useEffect(() => {
    onBlockingChange?.(blocking);
  }, [blocking, onBlockingChange]);

  useEffect(() => {
    onComposeClaimedRef.current = onComposeClaimed;
  }, [onComposeClaimed]);

  // Allow a new chooser action when a fresh prompt arrives.
  useEffect(() => {
    if (sharePromptHasContent(prompt)) actionLockRef.current = false;
  }, [prompt]);

  // Clear share query params once (keeps /chat path) and claim Cache Storage files.
  useLayoutEffect(() => {
    if (urlClearedRef.current) return;
    if (!hasShareSearchParams(location.search)) return;
    urlClearedRef.current = true;
    const search = location.search;
    const body = shareBodyFromSearch(search) || '';
    navigate(
      { pathname: location.pathname, search: '', hash: location.hash },
      { replace: true },
    );
    void (async () => {
      let files = [];
      try {
        files = await loadShareTargetFiles();
      } catch {
        files = [];
      }
      if (body || files.length) {
        setPrompt((prev) => ({
          id: prev?.id,
          body: body || prev?.body || '',
          files,
        }));
      } else {
        setPrompt(null);
      }
      setShareIntakePending(false);
      setBootstrapDone(true);
    })();
  }, [location.hash, location.pathname, location.search, navigate]);

  // If no URL share, surface a leftover "choose" pending before auth.
  useEffect(() => {
    if (bootstrapDone) return undefined;
    let cancelled = false;
    (async () => {
      try {
        if (!sharePromptHasContent(prompt)) {
          const choose = await peekChoosePendingShare();
          const next = pendingChooseToPrompt(choose);
          if (!cancelled && next) {
            setPrompt(next);
          }
        }
      } finally {
        if (!cancelled) setBootstrapDone(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bootstrapDone, prompt]);

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

  const ensureChatOpen = useCallback(() => {
    if (!location.pathname.endsWith('/chat')) {
      navigate('/chat');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    ensureChatOpenRef.current = ensureChatOpen;
  }, [ensureChatOpen]);

  const handleSendAsSelf = useCallback(async () => {
    const current = prompt;
    if (!sharePromptHasContent(current) || actionLockRef.current) return;
    actionLockRef.current = true;
    const body = String(current.body || '').trim();
    const files = normalizeShareFiles(current.files);
    let appended = false;
    try {
      if (isUnlocked && storageReady && chatCtx) {
        const { dateStr } = await appendShareChatMessage(chatCtx, {
          body,
          files,
          group: SELF_GROUP,
        });
        appended = true;
        if (dateStr) {
          postChatSyncEvent('day', { dateStr });
          postChatLocalSyncEvent('day', { dateStr });
        }
        await clearPromptRecord(current);
      } else {
        await clearPromptRecord(current);
        await enqueuePendingShare({ body, files, intent: 'sendSelf' });
      }
    } catch {
      // Only re-queue when the day-file write did not already succeed.
      if (!appended) {
        try {
          await clearPromptRecord(current);
          await enqueuePendingShare({ body, files, intent: 'sendSelf' });
        } catch {
          /* ignore */
        }
      }
    } finally {
      ensureChatOpen();
      finishPrompt();
    }
  }, [
    prompt,
    isUnlocked,
    storageReady,
    chatCtx,
    clearPromptRecord,
    finishPrompt,
    ensureChatOpen,
  ]);

  const handleComposeWithGroup = useCallback(async () => {
    const current = prompt;
    if (!sharePromptHasContent(current) || actionLockRef.current) return;
    actionLockRef.current = true;
    const body = String(current.body || '').trim();
    const files = normalizeShareFiles(current.files);
    try {
      await clearPromptRecord(current);
      const payload = {
        id: `share-group-send-${Date.now()}`,
        body,
        files,
      };
      ensureChatOpen();
      if (isUnlocked) {
        onComposeClaimed?.(payload);
      } else {
        await enqueuePendingShare({ body, files, intent: 'compose' });
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
    ensureChatOpen,
    onComposeClaimed,
  ]);

  const handleClose = useCallback(async () => {
    if (actionLockRef.current) return;
    actionLockRef.current = true;
    const current = prompt;
    await clearPromptRecord(current);
    finishPrompt();
  }, [prompt, clearPromptRecord, finishPrompt]);

  // Flush sendSelf pending after unlock + storage ready (any page).
  // Module-level mutex in flushSendSelfPendingShares prevents double-append on re-entry.
  useEffect(() => {
    if (!isUnlocked || !storageReady || !chatCtx) return undefined;
    let cancelled = false;
    (async () => {
      const { flushed } = await flushSendSelfPendingShares(chatCtx);
      if (!cancelled && flushed > 0) {
        ensureChatOpenRef.current();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isUnlocked, storageReady, chatCtx]);

  // After unlock + storage ready, claim compose seeds (navigate to chat if needed).
  // claimComposePendingShares is serialized with the pane backup claim.
  useEffect(() => {
    if (!isUnlocked || !storageReady || !bootstrapDone || sharePromptHasContent(prompt)) {
      return undefined;
    }
    (async () => {
      const composeRows = await claimComposePendingShares();
      if (!composeRows.length) return;
      const body = composeRows
        .map((row) => String(row.body || '').trim())
        .filter(Boolean)
        .join('\n\n');
      const files = composeRows.flatMap((row) => normalizeShareFiles(row.files));
      if (!body && !files.length) return;
      ensureChatOpenRef.current();
      onComposeClaimedRef.current?.({
        id: `share-group-send-${Date.now()}`,
        body,
        files,
      });
    })();
  }, [isUnlocked, storageReady, bootstrapDone, prompt]);

  return (
    <ChatShareTargetModal
      isOpen={sharePromptHasContent(prompt)}
      body={prompt?.body || ''}
      files={normalizeShareFiles(prompt?.files)}
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
