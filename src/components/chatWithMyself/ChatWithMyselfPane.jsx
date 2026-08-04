import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistoryOverlayBack } from '@/hooks/useHistoryOverlayBack';
import {
  CalendarDays,
  Menu,
  MessageCircleMore,
  Pin,
  RefreshCw,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import ChatComposer from '@/components/chatWithMyself/ChatComposer';
import ChatComposerDock from '@/components/chatWithMyself/ChatComposerDock';
import ChatComposerSettingsModal from '@/components/chatWithMyself/ChatComposerSettingsModal';
import ChatDatePanel from '@/components/chatWithMyself/ChatDatePanel';
import ChatGroupPanel from '@/components/chatWithMyself/ChatGroupPanel';
import ChatMessageList from '@/components/chatWithMyself/ChatMessageList';
import ChatMobileDrawer from '@/components/chatWithMyself/ChatMobileDrawer';
import ChatSearchPanel from '@/components/chatWithMyself/ChatSearchPanel';
import ChatPinnedPanel from '@/components/chatWithMyself/ChatPinnedPanel';
import ChatShareGroupSendModal from '@/components/chatWithMyself/ChatShareGroupSendModal';
import ChatAddToNoteModal from '@/components/chatWithMyself/ChatAddToNoteModal';
import ChatEditHistoryModal from '@/components/chatWithMyself/ChatEditHistoryModal';
import ChatRailShell from '@/components/chatWithMyself/ChatRailShell';
import ChatNavSwitch from '@/components/chatWithMyself/ui/ChatNavSwitch';
import { ChatImageLightboxProvider } from '@/components/chatWithMyself/ChatImageLightbox';
import { ChatUiPrefsProvider } from '@/components/chatWithMyself/ChatUiPrefsContext';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useChatActivityStatus } from '@/components/chatWithMyself/useChatActivityStatus';
import {
  useChatRemoteSync,
  mergeMessagesForDate,
} from '@/components/chatWithMyself/useChatRemoteSync';
import {
  SELF_GROUP,
  addGroup,
  setGroupIcon,
  renameGroup,
  uploadGroupIcon,
  groupIconMap,
  groupLabelMap,
  groupMatches,
  resolveGroupLabel,
  resolveGroupId,
  appendChatMessages,
  appendChatMessage,
  createOgStorageAdapters,
  deleteChatMessage,
  deleteChatAttachment,
  updateChatMessage,
  patchChatMessageMeta,
  uploadChatAttachment,
  loadMessageEditHistoryPage,
  deleteMessageEditHistoryEntry,
  deleteAllMessageEditHistory,
  chatAttachmentsToMarkdown,
  extractChatBodyAttachments,
  detectTimeZone,
  findMessageById,
  listDayKeys,
  localDateString,
  makeReplySnippet,
  createMessageId,
  readDayMessages,
  touchTimezone,
  fuzzyMatchText,
  loadMessageOgSearchText,
  reactionsToSearchText,
  readComposerDraftMeta,
  getComposerToolbarVisible,
  readComposerToolbarPref,
  writeComposerToolbarPref,
  getComposerLineNumbersVisible,
  writeComposerLineNumbersPref,
  getOpenLinksInNewWindow,
  writeOpenLinksInNewWindowPref,
  getChatRailOpen,
  writeChatRailOpenPref,
  flushPendingMessages,
  postChatSyncEvent,
  toggleReaction,
  normalizeStoragePath,
} from '@/utils/chatWithMyself';
import {
  getPendingMessages,
  deletePendingMessage,
} from '@/utils/chatWithMyself/chatDb.js';
import { findFileNodeByPath } from '@/utils/s3Tree';

async function matchesFilters(msg, dateStr, filters, ogStorage, groups = []) {
  if (!filters) return { ok: true, ogSearchText: '' };
  if (filters.groupFilter && filters.groupFilter !== '__all__') {
    if (!groupMatches(groups, msg.group || SELF_GROUP, filters.groupFilter)) {
      return { ok: false, ogSearchText: '' };
    }
  }
  if (filters.dateFilter && dateStr !== filters.dateFilter) {
    return { ok: false, ogSearchText: '' };
  }
  if (filters.fromDt) {
    const from = new Date(filters.fromDt).getTime();
    if (!Number.isNaN(from) && new Date(msg.at).getTime() < from) {
      return { ok: false, ogSearchText: '' };
    }
  }
  if (filters.toDt) {
    const to = new Date(filters.toDt).getTime();
    if (!Number.isNaN(to) && new Date(msg.at).getTime() > to) {
      return { ok: false, ogSearchText: '' };
    }
  }
  if (filters.query) {
    const body = msg.body || '';
    const group = msg.group || '';
    if (fuzzyMatchText(body, filters.query) || fuzzyMatchText(group, filters.query)) {
      return { ok: true, ogSearchText: '' };
    }
    const { attachments } = extractChatBodyAttachments(body);
    for (const att of attachments) {
      if (
        fuzzyMatchText(att.name || '', filters.query) ||
        fuzzyMatchText(att.path || '', filters.query)
      ) {
        return { ok: true, ogSearchText: '' };
      }
    }
    const reactionSearchText = reactionsToSearchText(msg.reactions);
    if (fuzzyMatchText(reactionSearchText, filters.query)) {
      return { ok: true, ogSearchText: '' };
    }
    const ogSearchText = await loadMessageOgSearchText(msg, ogStorage);
    if (fuzzyMatchText(ogSearchText, filters.query)) {
      return { ok: true, ogSearchText };
    }
    return { ok: false, ogSearchText: '' };
  }
  return { ok: true, ogSearchText: '' };
}

/**
 * Main chat pane for /chat — keeps MainApp sidebar; this is the right content area.
 */
export default function ChatWithMyselfPane({
  storageMode,
  getS3Client,
  s3Bucket,
  localRootHandle,
  webdavConfig,
  theme,
  isMobileLayout = false,
  sidebarOpen,
  onOpenSidebar,
  s3Tree = [],
  localTree = [],
  webdavTree = [],
  onRequestCreateFolderForNote,
  onRequestMoveFolder,
  onCreateNoteFromMessage,
  selectPathAfterCreateFolder,
  onSelectPathAfterCreateFolderApplied,
  getPresignedUrlForPath,
  onDropOnFolder,
  dropTarget,
  onLoadLocalFolderChildren,
  localFolderLoadingPath = null,
  shareGroupSend = null,
  onShareGroupSendConsumed,
  onOpenNote,
}) {
  const location = useLocation();
  const ctx = useMemo(() => {
    if (storageMode === 'local') {
      return { mode: 'local', localRootHandle };
    }
    if (storageMode === 'webdav') {
      return { mode: 'webdav', webdavConfig };
    }
    return {
      mode: 's3',
      client: getS3Client?.(),
      bucket: s3Bucket,
    };
  }, [storageMode, getS3Client, s3Bucket, localRootHandle, webdavConfig]);

  const storageReady =
    (ctx.mode === 's3' && ctx.client && ctx.bucket) ||
    (ctx.mode === 'local' && ctx.localRootHandle) ||
    (ctx.mode === 'webdav' &&
      Boolean(ctx.webdavConfig?.endpoint && ctx.webdavConfig?.username));

  const fileTree = useMemo(() => {
    if (storageMode === 'local') return localTree || [];
    if (storageMode === 'webdav') return webdavTree || [];
    return s3Tree || [];
  }, [storageMode, s3Tree, localTree, webdavTree]);

  const noteExists = useCallback(
    (path) => {
      const p = normalizeStoragePath(path);
      if (!p || p.startsWith('.trash/')) return false;
      return Boolean(findFileNodeByPath(fileTree, p));
    },
    [fileTree],
  );

  const remotePoll = ctx.mode === 's3' || ctx.mode === 'webdav';

  const storageNotReadyHint =
    storageMode === 'local'
      ? '로컬 폴더를 연 뒤 채팅을 사용할 수 있습니다.'
      : storageMode === 'webdav'
        ? '설정에서 WebDAV 연결 정보를 저장한 뒤 채팅을 사용할 수 있습니다.'
        : 'S3에 로그인한 뒤 채팅을 사용할 수 있습니다.';

  const storageSendErrorHint =
    storageMode === 'local'
      ? '로컬 폴더를 먼저 열어주세요.'
      : storageMode === 'webdav'
        ? 'WebDAV 연결 정보가 필요합니다.'
        : 'S3 자격 증명이 필요합니다.';

  const ogStorage = useMemo(
    () => (storageReady ? createOgStorageAdapters(ctx) : null),
    [storageReady, ctx],
  );

  const [groups, setGroups] = useState([]);
  const [timeZone, setTimeZone] = useState(detectTimeZone);
  const [selectedGroup, setSelectedGroup] = useState(SELF_GROUP);
  /** null = show all groups; otherwise only that group's messages */
  const [viewGroupFilter, setViewGroupFilter] = useState(null);
  const [dayKeys, setDayKeys] = useState([]);
  const [dayCounts, setDayCounts] = useState({});
  /** Inclusive index of newest day currently in the message window. */
  const [windowNewestIndex, setWindowNewestIndex] = useState(0);
  /** Exclusive end index of oldest day in the window (same role as former loadedDayIndex). */
  const [loadedDayIndex, setLoadedDayIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [loadingNewer, setLoadingNewer] = useState(false);
  const [booting, setBooting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [error, setError] = useState('');
  const [searchOpen, setSearchOpen] = useState(() =>
    getChatRailOpen('search', { isMobileLayout }),
  );
  const [pinnedOpen, setPinnedOpen] = useState(() =>
    getChatRailOpen('pinned', { isMobileLayout }),
  );
  const [dateOpen, setDateOpen] = useState(() =>
    getChatRailOpen('date', { isMobileLayout }),
  );
  const [groupOpen, setGroupOpen] = useState(() =>
    getChatRailOpen('group', { isMobileLayout }),
  );
  const [composerToolbarOpen, setComposerToolbarOpen] = useState(
    getComposerToolbarVisible,
  );
  const [composerLineNumbers, setComposerLineNumbers] = useState(
    getComposerLineNumbersVisible,
  );
  const [openLinksInNewWindow, setOpenLinksInNewWindow] = useState(
    getOpenLinksInNewWindow,
  );
  const [composerSettingsOpen, setComposerSettingsOpen] = useState(false);
  const [activeJumpDate, setActiveJumpDate] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCursor, setSearchCursor] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [highlightId, setHighlightId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [addToNoteMessage, setAddToNoteMessage] = useState(null);
  const [historyMessage, setHistoryMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingCount, setDeletingCount] = useState(0);
  const [addToNoteSubmitting, setAddToNoteSubmitting] = useState(false);
  const [composerSeed, setComposerSeed] = useState(null);
  const [shareGroupModal, setShareGroupModal] = useState(null);
  const [pinnedResults, setPinnedResults] = useState([]);
  const [notedResults, setNotedResults] = useState([]);
  const [editedResults, setEditedResults] = useState([]);
  const [pinnedLoading, setPinnedLoading] = useState(false);
  const searchDayKeysRef = useRef([]);
  const pinnedDayKeysRef = useRef([]);
  const messagesRef = useRef(messages);
  const dayKeysRef = useRef(dayKeys);
  const loadedDayIndexRef = useRef(loadedDayIndex);
  const windowNewestIndexRef = useRef(windowNewestIndex);
  const sendQueueRef = useRef([]);
  const flushingSendRef = useRef(false);
  const syncApiRef = useRef(null);
  const localTombstonesRef = useRef(new Set());

  const noteLocalDayWrite = useCallback((dateStr) => {
    if (dateStr) syncApiRef.current?.invalidateDay(dateStr);
  }, []);
  const noteLocalMetaWrite = useCallback(() => {
    syncApiRef.current?.invalidateMeta();
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    dayKeysRef.current = dayKeys;
  }, [dayKeys]);
  useEffect(() => {
    loadedDayIndexRef.current = loadedDayIndex;
  }, [loadedDayIndex]);
  useEffect(() => {
    windowNewestIndexRef.current = windowNewestIndex;
  }, [windowNewestIndex]);

  // Persist which desktop rails are open.
  useEffect(() => {
    if (isMobileLayout) return;
    writeChatRailOpenPref('group', groupOpen);
    writeChatRailOpenPref('date', dateOpen);
    writeChatRailOpenPref('search', searchOpen);
    writeChatRailOpenPref('pinned', pinnedOpen);
  }, [isMobileLayout, groupOpen, dateOpen, searchOpen, pinnedOpen]);

  // Restore compose draft group / reply target (body+images restored in ChatComposer).
  useEffect(() => {
    const meta = readComposerDraftMeta();
    if (!meta) return;
    if (meta.group) setSelectedGroup(meta.group);
    if (meta.replyTo?.id) setReplyTo(meta.replyTo);
  }, []);

  // Once groups load, map legacy draft/selected names → stable ids.
  useEffect(() => {
    if (!groups.length) return;
    setSelectedGroup((prev) => resolveGroupId(groups, prev || SELF_GROUP));
    setViewGroupFilter((prev) =>
      prev ? resolveGroupId(groups, prev) : prev,
    );
  }, [groups]);

  // Follow orientation default until the user sets an explicit toolbar preference.
  useEffect(() => {
    if (readComposerToolbarPref() != null) return undefined;
    const mq = window.matchMedia('(orientation: landscape)');
    const sync = () => setComposerToolbarOpen(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const toggleComposerToolbar = useCallback((next) => {
    const value = typeof next === 'boolean' ? next : !composerToolbarOpen;
    setComposerToolbarOpen(value);
    writeComposerToolbarPref(value);
  }, [composerToolbarOpen]);

  const toggleComposerLineNumbers = useCallback((next) => {
    const value = typeof next === 'boolean' ? next : !composerLineNumbers;
    setComposerLineNumbers(value);
    writeComposerLineNumbersPref(value);
  }, [composerLineNumbers]);

  const toggleOpenLinksInNewWindow = useCallback((next) => {
    const value = typeof next === 'boolean' ? next : !openLinksInNewWindow;
    setOpenLinksInNewWindow(value);
    writeOpenLinksInNewWindowPref(value);
  }, [openLinksInNewWindow]);

  const hasMore = loadedDayIndex < dayKeys.length;
  const hasMoreNewer = windowNewestIndex > 0;

  const visibleMessages = useMemo(() => {
    if (!viewGroupFilter) return messages;
    return messages.filter((m) =>
      groupMatches(groups, m.group || SELF_GROUP, viewGroupFilter),
    );
  }, [messages, viewGroupFilter, groups]);

  const pendingSend = useMemo(
    () => messages.some((m) => m.pendingSync === 'send'),
    [messages],
  );
  const pendingEdit = useMemo(
    () => messages.some((m) => m.pendingSync === 'edit'),
    [messages],
  );
  const deleting = deletingCount > 0;

  const handleToggleViewGroup = useCallback((group) => {
    setViewGroupFilter((prev) => (prev === group ? null : group));
  }, []);

  useChatActivityStatus({
    storageReady,
    storageMode,
    pendingSend,
    pendingEdit,
    deleting,
    loadingOlder,
    loadingNewer,
    searchLoading,
    jumping,
    booting,
    noteSubmitting: addToNoteSubmitting,
    error,
  });

  const refreshMeta = useCallback(async () => {
    if (!storageReady) return;
    try {
      const meta = await touchTimezone(ctx);
      setGroups(meta.groups || []);
      setTimeZone(meta.timezone || detectTimeZone());
    } catch (e) {
      setError(e?.message || 'meta 로드 실패');
    }
  }, [storageReady, ctx]);

  const loadInitial = useCallback(async () => {
    if (!storageReady) return;
    setBooting(true);
    try {
      await refreshMeta();
      const keys = await listDayKeys(ctx);
      const today = localDateString(new Date(), detectTimeZone());
      const ordered = keys.includes(today) ? keys : [today, ...keys];
      const unique = [...new Set(ordered)];
      setDayKeys(unique);
      const first = unique[0];
      const msgs = first ? await readDayMessages(ctx, first) : [];
      localTombstonesRef.current.clear();
      setMessages(msgs);
      setWindowNewestIndex(0);
      setLoadedDayIndex(first ? 1 : 0);
      setActiveJumpDate(first || null);
    } catch (e) {
      setError(e?.message || '채팅 로드 실패');
    } finally {
      setBooting(false);
    }
  }, [storageReady, ctx, refreshMeta]);

  // Load per-day message counts while the date panel is open (uses day-file cache).
  useEffect(() => {
    if (!storageReady || !dateOpen) return undefined;
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        dayKeys.map(async (dateStr) => {
          try {
            const msgs = await readDayMessages(ctx, dateStr);
            return [dateStr, msgs.length];
          } catch {
            return [dateStr, 0];
          }
        }),
      );
      if (!cancelled) setDayCounts(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [storageReady, dateOpen, dayKeys, ctx]);

  const handleRefresh = useCallback(async () => {
    if (!storageReady || refreshing) return;
    setRefreshing(true);
    setError('');
    const started = Date.now();
    try {
      await refreshMeta();
      const keys = await listDayKeys(ctx);
      const today = localDateString(new Date(), detectTimeZone());
      const ordered = keys.includes(today) ? keys : [today, ...keys];
      const unique = [...new Set(ordered)];
      setDayKeys(unique);

      const prevKeys = dayKeysRef.current;
      const wStart = windowNewestIndexRef.current;
      const wEnd = loadedDayIndexRef.current;
      let loadDates =
        prevKeys.length && wEnd > wStart
          ? prevKeys.slice(wStart, wEnd).filter((d) => unique.includes(d))
          : [];
      if (!loadDates.length && unique[0]) loadDates = [unique[0]];

      const parts = await Promise.all(
        loadDates.map((d) => readDayMessages(ctx, d)),
      );
      // dayKeys order is newest→oldest; messages are chronological (oldest first).
      const msgs = [];
      for (let i = parts.length - 1; i >= 0; i -= 1) {
        msgs.push(...(parts[i] || []));
      }
      setMessages(msgs);

      if (loadDates.length) {
        const firstIdx = unique.indexOf(loadDates[0]);
        const lastIdx = unique.indexOf(loadDates[loadDates.length - 1]);
        setWindowNewestIndex(firstIdx >= 0 ? firstIdx : 0);
        setLoadedDayIndex(lastIdx >= 0 ? lastIdx + 1 : unique[0] ? 1 : 0);
        setActiveJumpDate(loadDates[0] || unique[0] || null);
      } else {
        setWindowNewestIndex(0);
        setLoadedDayIndex(0);
        setActiveJumpDate(null);
      }
    } catch (e) {
      setError(e?.message || '새로고침 실패');
    } finally {
      const elapsed = Date.now() - started;
      if (elapsed < 450) {
        await new Promise((r) => window.setTimeout(r, 450 - elapsed));
      }
      setRefreshing(false);
    }
  }, [storageReady, refreshing, ctx, refreshMeta]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  // Flush IDB pending messages after storage is ready
  useEffect(() => {
    if (!storageReady) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const { flushed, dateStrs } = await flushPendingMessages(ctx, {
          getPendingMessages,
          deletePendingMessage,
        });
        if (!cancelled && flushed > 0) {
          const days = dateStrs?.length
            ? dateStrs
            : [localDateString(new Date(), detectTimeZone())];
          for (const d of days) {
            noteLocalDayWrite(d);
            postChatSyncEvent('day', { dateStr: d });
          }
          await loadInitial();
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storageReady, ctx, loadInitial, noteLocalDayWrite]);

  const getWatchedDateStrs = useCallback(() => {
    const keys = dayKeysRef.current;
    const start = windowNewestIndexRef.current;
    const end = loadedDayIndexRef.current;
    if (!keys.length) {
      return [localDateString(new Date(), detectTimeZone())];
    }
    if (end > start) return keys.slice(start, end);
    return keys[0] ? [keys[0]] : [];
  }, []);

  const handleRemoteDayMerged = useCallback((dateStr, remoteMessages, remoteParsed) => {
    const remoteDeleted = remoteParsed?.deletedIds || [];
    if (remoteDeleted.length) {
      for (const id of remoteDeleted) {
        localTombstonesRef.current.delete(id);
      }
    }
    setMessages((prev) => {
      const next = mergeMessagesForDate(
        prev,
        dateStr,
        remoteMessages,
        remoteParsed,
        localTombstonesRef.current,
      );
      const count = next.filter((m) => m.dateStr === dateStr).length;
      queueMicrotask(() => {
        setDayCounts((prevCounts) => ({
          ...prevCounts,
          [dateStr]: count,
        }));
      });
      return next;
    });
  }, []);

  const handleRemoteMeta = useCallback((meta) => {
    setGroups(meta.groups || []);
    setTimeZone(meta.timezone || detectTimeZone());
  }, []);

  const handleRemoteDayKeys = useCallback((keys) => {
    const today = localDateString(new Date(), detectTimeZone());
    const ordered = [...new Set(keys.includes(today) ? keys : [today, ...keys])];
    const prev = dayKeysRef.current;
    const oldStart = windowNewestIndexRef.current;
    const oldEnd = loadedDayIndexRef.current;
    const loadedDates =
      prev.length && oldEnd > oldStart ? prev.slice(oldStart, oldEnd) : [];

    setDayKeys(ordered);

    if (!loadedDates.length) return;
    const newIndexes = loadedDates
      .map((d) => ordered.indexOf(d))
      .filter((i) => i >= 0);
    if (!newIndexes.length) return;
    setWindowNewestIndex(Math.min(...newIndexes));
    setLoadedDayIndex(Math.max(...newIndexes) + 1);
  }, []);

  useChatRemoteSync({
    enabled: storageReady,
    storageReady,
    ctx: storageReady ? ctx : null,
    remotePoll,
    getWatchedDateStrs,
    onDayMerged: handleRemoteDayMerged,
    onMeta: handleRemoteMeta,
    onDayKeys: handleRemoteDayKeys,
    syncApiRef,
  });

  // Apply share-target group-send modal from App-level ShareTargetGate.
  // Keep App seed until the modal closes/sends — clearing on apply loses the payload
  // when this pane remounts after unlock/auth.
  useEffect(() => {
    if (!shareGroupSend?.id || shareGroupSend.body == null) return;
    setEditTarget(null);
    setShareGroupModal((prev) =>
      prev?.id === shareGroupSend.id ? prev : shareGroupSend,
    );
  }, [shareGroupSend]);

  const clearShareGroupSend = useCallback(() => {
    setShareGroupModal(null);
    onShareGroupSendConsumed?.();
  }, [onShareGroupSendConsumed]);

  const handleLoadOlder = useCallback(async () => {
    if (!storageReady || loadingOlder || loadedDayIndex >= dayKeys.length) return;
    setLoadingOlder(true);
    try {
      const dateStr = dayKeys[loadedDayIndex];
      const older = await readDayMessages(ctx, dateStr);
      setMessages((prev) => [...older, ...prev]);
      setLoadedDayIndex((i) => i + 1);
    } finally {
      setLoadingOlder(false);
    }
  }, [storageReady, loadingOlder, loadedDayIndex, dayKeys, ctx]);

  const handleLoadNewer = useCallback(async () => {
    if (!storageReady || loadingNewer || windowNewestIndex <= 0) return;
    setLoadingNewer(true);
    try {
      const nextIdx = windowNewestIndex - 1;
      const newer = await readDayMessages(ctx, dayKeys[nextIdx]);
      setMessages((prev) => [...prev, ...newer]);
      setWindowNewestIndex(nextIdx);
    } finally {
      setLoadingNewer(false);
    }
  }, [storageReady, loadingNewer, windowNewestIndex, dayKeys, ctx]);

  const scrollToDayFirstMessage = useCallback((dateStr, messageId = null) => {
    const id =
      messageId ||
      messagesRef.current.find((m) => m.dateStr === dateStr)?.id ||
      null;
    if (id) {
      if (messageId) setViewGroupFilter(null);
      setHighlightId(id);
      window.setTimeout(
        () => setHighlightId((cur) => (cur === id ? null : cur)),
        2200,
      );
      return;
    }
    requestAnimationFrame(() => {
      document.getElementById(`chat-date-${dateStr}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, []);

  /**
   * Jump to a day without loading middle days.
   * Resets the message window to that day; older/newer load via infinite scroll.
   */
  const jumpToDate = useCallback(
    async (dateStr, messageId = null) => {
      if (!storageReady || !dateStr) return;
      setActiveJumpDate(dateStr);
      const keys = dayKeysRef.current;
      const idx = keys.indexOf(dateStr);
      if (idx < 0) return;

      const newest = windowNewestIndexRef.current;
      const oldestEnd = loadedDayIndexRef.current;
      const inWindow = idx >= newest && idx < oldestEnd;

      if (inWindow) {
        scrollToDayFirstMessage(dateStr, messageId);
        return;
      }

      setJumping(true);
      try {
        const msgs = await readDayMessages(ctx, dateStr);
        setMessages(msgs);
        setWindowNewestIndex(idx);
        setLoadedDayIndex(idx + 1);
        const targetId = messageId || msgs[0]?.id || null;
        if (targetId) {
          if (messageId) setViewGroupFilter(null);
          setHighlightId(targetId);
          window.setTimeout(
            () => setHighlightId((cur) => (cur === targetId ? null : cur)),
            2200,
          );
        } else {
          requestAnimationFrame(() => {
            document.getElementById(`chat-date-${dateStr}`)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          });
        }
      } catch (e) {
        setError(e?.message || '날짜 이동 실패');
      } finally {
        setJumping(false);
      }
    },
    [storageReady, ctx, scrollToDayFirstMessage],
  );

  // Deep-link to a message via /chat#msg-{id} (Link / navigate / hashchange).
  useEffect(() => {
    if (!storageReady) return undefined;
    const scrollToHash = () => {
      const rawHash = location.hash || window.location.hash || '';
      const match = rawHash.match(/^#?msg-(.+)$/);
      if (!match?.[1]) return;
      const messageId = match[1];
      void (async () => {
        const hit = await findMessageById(ctx, messageId);
        if (!hit?.msg) return;
        await jumpToDate(hit.dateStr, messageId);
      })();
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [storageReady, ctx, jumpToDate, location.hash, location.pathname]);

  const confirmPendingMessages = useCallback((msgs, dateStr) => {
    if (!msgs?.length || !dateStr) return;
    const byId = new Map(msgs.map((m) => [m.id, m]));
    setMessages((prev) => {
      if (windowNewestIndexRef.current !== 0) {
        return prev.filter((m) => !byId.has(m.id));
      }
      return prev.map((m) => {
        const confirmed = byId.get(m.id);
        if (!confirmed) return m;
        const next = { ...m, ...confirmed, dateStr };
        delete next.pendingSync;
        return next;
      });
    });
    setDayCounts((prev) => ({
      ...prev,
      [dateStr]: (prev[dateStr] || 0) + msgs.length,
    }));
    if (dayKeysRef.current.includes(dateStr)) return;
    setDayKeys((prev) => [dateStr, ...prev.filter((d) => d !== dateStr)]);
    if (windowNewestIndexRef.current === 0) {
      setWindowNewestIndex(0);
      setLoadedDayIndex((i) => Math.max(i, 1));
    } else {
      setWindowNewestIndex((i) => i + 1);
      setLoadedDayIndex((i) => i + 1);
    }
  }, []);

  const flushSendQueue = useCallback(async () => {
    if (flushingSendRef.current) return;
    flushingSendRef.current = true;
    try {
      while (sendQueueRef.current.length > 0) {
        const batch = sendQueueRef.current.splice(0, sendQueueRef.current.length);
        setError('');
        const batchIds = batch.map((item) => item.clientId);
        try {
          const prepared = [];
          for (const item of batch) {
            const uploaded = [];
            for (const file of item.files) {
              const uploadedItem = await uploadChatAttachment(ctx, file);
              uploaded.push(uploadedItem);
            }
            const attachMd = chatAttachmentsToMarkdown(uploaded);
            const finalBody = [attachMd, item.text].filter(Boolean).join('\n\n');
            setMessages((prev) =>
              prev.map((m) =>
                m.id === item.clientId
                  ? { ...m, body: finalBody, pendingSync: 'send' }
                  : m,
              ),
            );
            prepared.push({
              id: item.clientId,
              at: item.at,
              tz: item.tz,
              body: finalBody,
              group: item.group,
              source: 'compose',
              replyTo: item.replyTarget?.id || '',
              replySnippet: item.replyTarget
                ? makeReplySnippet(
                    item.replyTarget.snippet || item.replyTarget.body,
                  )
                : '',
              replyGroup: item.replyTarget?.group || '',
            });
          }
          const { msgs, dateStr } = await appendChatMessages(ctx, prepared);
          confirmPendingMessages(msgs, dateStr);
          if (dateStr) {
            noteLocalDayWrite(dateStr);
            postChatSyncEvent('day', { dateStr });
          }
        } catch (e) {
          setMessages((prev) => prev.filter((m) => !batchIds.includes(m.id)));
          setError(e?.message || '전송 실패');
        }
      }
    } finally {
      flushingSendRef.current = false;
      if (sendQueueRef.current.length > 0) {
        void flushSendQueue();
      }
    }
  }, [ctx, confirmPendingMessages, noteLocalDayWrite]);

  const handleSend = useCallback(
    (body, group, replyTarget = null, imageFiles = []) => {
      if (!storageReady) {
        setError(storageSendErrorHint);
        return;
      }
      const text = String(body || '').trim();
      const files = Array.isArray(imageFiles) ? imageFiles : [];
      if (!text && files.length === 0) return;

      const tz = detectTimeZone();
      const at = new Date().toISOString();
      const dateStr = localDateString(new Date(at), tz);
      const clientId = createMessageId();
      const optimisticBody = [
        files.length > 0 ? `(첨부 ${files.length}개 업로드 중…)` : '',
        text,
      ]
        .filter(Boolean)
        .join('\n\n');
      const optimistic = {
        id: clientId,
        at,
        tz,
        source: 'compose',
        group: group || SELF_GROUP,
        body: optimisticBody,
        replyTo: replyTarget?.id || '',
        replySnippet: replyTarget
          ? makeReplySnippet(replyTarget.snippet || replyTarget.body)
          : '',
        replyGroup: replyTarget?.group || '',
        dateStr,
        pendingSync: 'send',
      };

      if (windowNewestIndexRef.current === 0) {
        setMessages((prev) => [...prev, optimistic]);
      }
      if (!dayKeysRef.current.includes(dateStr)) {
        setDayKeys((prev) => [dateStr, ...prev.filter((d) => d !== dateStr)]);
        setWindowNewestIndex(0);
        setLoadedDayIndex((i) => Math.max(i, 1));
      }

      sendQueueRef.current.push({
        clientId,
        at,
        tz,
        text,
        group,
        replyTarget: replyTarget || null,
        files,
      });
      void flushSendQueue();
    },
    [storageReady, storageSendErrorHint, flushSendQueue],
  );

  const handleReply = useCallback((message) => {
    setEditTarget(null);
    setReplyTo({
      id: message.id,
      group: message.group || SELF_GROUP,
      body: message.body,
      snippet: makeReplySnippet(message.body),
      dateStr: message.dateStr,
      at: message.at,
    });
  }, []);

  const handleEdit = useCallback(
    (message) => {
      if (!message?.id) return;
      setReplyTo(null);
      setEditTarget(message);
      setSelectedGroup(resolveGroupId(groups, message.group || SELF_GROUP));
    },
    [groups],
  );

  const handleSaveEdit = useCallback(
    async (body, group, target, imageFiles = [], options = {}) => {
      if (!storageReady || !target?.id) return;
      const dateStr =
        target.dateStr || localDateString(new Date(target.at), detectTimeZone());
      const text = String(body || '').trim();
      const files = Array.isArray(imageFiles) ? imageFiles : [];
      const existingMarkdown = String(options.existingMarkdown || '').trim();
      const removedPaths = Array.isArray(options.removedPaths)
        ? options.removedPaths.filter(Boolean)
        : [];
      if (!text && files.length === 0 && !existingMarkdown) return;

      const snapshot = messagesRef.current.find((m) => m.id === target.id) || target;
      const attachHint =
        files.length > 0
          ? `(첨부 ${files.length}개 업로드 중…)`
          : existingMarkdown;
      const optimisticBody = [attachHint, text].filter(Boolean).join('\n\n');
      const editedAt = new Date().toISOString();

      setEditTarget(null);
      setError('');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === target.id
            ? {
                ...m,
                body: optimisticBody,
                group: group || SELF_GROUP,
                editedAt,
                pendingSync: 'edit',
              }
            : m,
        ),
      );

      try {
        const uploaded = [];
        for (const file of files) {
          const item = await uploadChatAttachment(ctx, file);
          uploaded.push(item);
        }
        const uploadedMd = chatAttachmentsToMarkdown(uploaded);
        const finalBody = [existingMarkdown, uploadedMd, text]
          .filter(Boolean)
          .join('\n\n');
        if (finalBody !== optimisticBody) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === target.id
                ? { ...m, body: finalBody, pendingSync: 'edit' }
                : m,
            ),
          );
        }

        const updated = await updateChatMessage(ctx, dateStr, target.id, {
          body: finalBody,
          group,
        });
        if (!updated) {
          setMessages((prev) =>
            prev.map((m) => (m.id === target.id ? { ...snapshot } : m)),
          );
          setError('메시지를 찾지 못했습니다.');
          return;
        }
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== target.id) return m;
            const next = { ...m, ...updated, dateStr };
            delete next.pendingSync;
            return next;
          }),
        );
        setEditedResults((prev) => {
          const row = { ...updated, dateStr };
          const next = prev.filter((m) => m.id !== target.id);
          return [row, ...next];
        });
        setPinnedResults((prev) =>
          prev.map((m) =>
            m.id === target.id ? { ...m, ...updated, dateStr } : m,
          ),
        );
        setNotedResults((prev) =>
          prev.map((m) =>
            m.id === target.id ? { ...m, ...updated, dateStr } : m,
          ),
        );
        postChatSyncEvent('day', { dateStr });
        noteLocalDayWrite(dateStr);

        for (const path of removedPaths) {
          try {
            await deleteChatAttachment(ctx, path);
          } catch {
            /* best-effort storage cleanup */
          }
        }
      } catch (e) {
        setMessages((prev) =>
          prev.map((m) => (m.id === target.id ? { ...snapshot } : m)),
        );
        setError(e?.message || '수정 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const performDeleteMessage = useCallback(
    async (message) => {
      if (!storageReady || !message?.id) return;
      if (message.pendingSync === 'delete') return;
      const dateStr =
        message.dateStr || localDateString(new Date(message.at), detectTimeZone());
      const snapshot = { ...message };
      delete snapshot.pendingSync;

      // Close confirm immediately; keep bubble in a disabled deleting state.
      setDeleteTarget(null);
      setError('');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, pendingSync: 'delete' } : m,
        ),
      );
      if (replyTo?.id === message.id) setReplyTo(null);
      if (editTarget?.id === message.id) setEditTarget(null);
      if (historyMessage?.id === message.id) setHistoryMessage(null);
      setDeletingCount((c) => c + 1);

      try {
        const ok = await deleteChatMessage(ctx, dateStr, message.id);
        if (!ok) {
          setMessages((prev) =>
            prev.map((m) => (m.id === message.id ? { ...snapshot } : m)),
          );
          setError('메시지를 찾지 못했습니다.');
          return;
        }
        setMessages((prev) => prev.filter((m) => m.id !== message.id));
        setPinnedResults((prev) => prev.filter((m) => m.id !== message.id));
        setNotedResults((prev) => prev.filter((m) => m.id !== message.id));
        setEditedResults((prev) => prev.filter((m) => m.id !== message.id));
        setDayCounts((prev) => ({
          ...prev,
          [dateStr]: Math.max(0, (prev[dateStr] || 1) - 1),
        }));
        localTombstonesRef.current.add(message.id);
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      } catch (e) {
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...snapshot } : m)),
        );
        setError(e?.message || '삭제 실패');
      } finally {
        setDeletingCount((c) => Math.max(0, c - 1));
      }
    },
    [storageReady, ctx, replyTo, editTarget, historyMessage, noteLocalDayWrite],
  );

  const handleDelete = useCallback(
    (message, options = {}) => {
      if (!storageReady || !message?.id) return;
      if (message.pendingSync === 'delete') return;
      if (options.skipConfirm) {
        void performDeleteMessage(message);
        return;
      }
      setDeleteTarget(message);
    },
    [storageReady, performDeleteMessage],
  );

  const confirmDeleteMessage = useCallback(() => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    void performDeleteMessage(target);
  }, [deleteTarget, performDeleteMessage]);

  const ensureMessageLoaded = useCallback(
    async (messageId) => {
      const existing = messagesRef.current.find((m) => m.id === messageId);
      if (existing) return existing;

      const hit = await findMessageById(ctx, messageId);
      if (!hit?.msg) return null;

      if (!dayKeysRef.current.includes(hit.dateStr)) {
        setDayKeys((prev) => {
          const next = [...prev, hit.dateStr];
          next.sort().reverse();
          return next;
        });
        // Allow dayKeysRef to update before jump indexes resolve.
        dayKeysRef.current = [...dayKeysRef.current, hit.dateStr]
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort()
          .reverse();
      }

      await jumpToDate(hit.dateStr, messageId);
      return (
        messagesRef.current.find((m) => m.id === messageId) || hit.msg
      );
    },
    [ctx, jumpToDate],
  );

  const handleOpenReplyTarget = useCallback(
    async (replyToId) => {
      if (!replyToId) return;
      const found = await ensureMessageLoaded(replyToId);
      if (!found) {
        setError('원본 메시지를 찾을 수 없습니다. (삭제되었을 수 있음)');
        return;
      }
      setHighlightId(replyToId);
      // re-trigger scroll even if same id
      requestAnimationFrame(() => {
        document.getElementById(`chat-msg-${replyToId}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
      window.setTimeout(() => setHighlightId((id) => (id === replyToId ? null : id)), 2200);
    },
    [ensureMessageLoaded],
  );

  const handleAddGroup = useCallback(
    async (name, options = {}) => {
      let iconPath =
        typeof options.iconPath === 'string' && options.iconPath.trim()
          ? options.iconPath.trim()
          : undefined;
      if (options.iconFile) {
        try {
          iconPath = await uploadGroupIcon(ctx, options.iconFile);
        } catch (e) {
          // Keep the group name; fall back to initials if icon upload fails.
          setError(e?.message || '그룹 아이콘 업로드 실패 (그룹은 추가됩니다)');
        }
      }
      const next = await addGroup(ctx, name, iconPath ? { iconPath } : {});
      setGroups(next);
      noteLocalMetaWrite();
      postChatSyncEvent('meta');
      return next;
    },
    [ctx, noteLocalMetaWrite],
  );

  const handleSetGroupIcon = useCallback(
    async (groupId, file) => {
      if (!file) return;
      try {
        const iconPath = await uploadGroupIcon(ctx, file);
        const next = await setGroupIcon(ctx, groupId, iconPath);
        setGroups(next);
        noteLocalMetaWrite();
        postChatSyncEvent('meta');
      } catch (e) {
        setError(e?.message || '그룹 아이콘 변경 실패');
        throw e;
      }
    },
    [ctx, noteLocalMetaWrite],
  );

  const handleRenameGroup = useCallback(
    async (groupId, newName) => {
      try {
        const next = await renameGroup(ctx, groupId, newName);
        setGroups(next);
        noteLocalMetaWrite();
        postChatSyncEvent('meta');
        return next;
      } catch (e) {
        setError(e?.message || '그룹 이름 변경 실패');
        throw e;
      }
    },
    [ctx, noteLocalMetaWrite],
  );

  const handleLoadEditHistoryPage = useCallback(
    async (message, { offset = 0, limit = 10 } = {}) => {
      if (!storageReady || !message?.id) {
        return { entries: [], nextOffset: 0, hasMore: false, total: 0 };
      }
      return loadMessageEditHistoryPage(ctx, message.id, {
        offset,
        limit,
        legacyEntries: Array.isArray(message.editHistory)
          ? message.editHistory
          : [],
      });
    },
    [storageReady, ctx],
  );

  const applyUpdatedHistoryMessage = useCallback((messageId, updated, dateStr) => {
    if (!updated) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, ...updated, dateStr: dateStr || m.dateStr } : m,
      ),
    );
    setHistoryMessage((prev) =>
      prev?.id === messageId
        ? { ...prev, ...updated, dateStr: dateStr || prev.dateStr }
        : prev,
    );
    setEditedResults((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, ...updated, dateStr: dateStr || m.dateStr } : m,
      ),
    );
  }, []);

  const handleDeleteEditHistoryEntry = useCallback(
    async (message, entry) => {
      if (!storageReady || !message?.id || !entry) return;
      const dateStr =
        message.dateStr ||
        localDateString(new Date(message.at), detectTimeZone());
      const { updatedMessage } = await deleteMessageEditHistoryEntry(
        ctx,
        message.id,
        entry,
        { dateStr },
      );
      if (updatedMessage) {
        applyUpdatedHistoryMessage(message.id, updatedMessage, dateStr);
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      }
    },
    [storageReady, ctx, applyUpdatedHistoryMessage, noteLocalDayWrite],
  );

  const handleDeleteAllEditHistory = useCallback(
    async (message) => {
      if (!storageReady || !message?.id) return;
      const dateStr =
        message.dateStr ||
        localDateString(new Date(message.at), detectTimeZone());
      const { updatedMessage } = await deleteAllMessageEditHistory(
        ctx,
        message.id,
        { dateStr },
      );
      if (updatedMessage) {
        applyUpdatedHistoryMessage(message.id, updatedMessage, dateStr);
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      }
    },
    [storageReady, ctx, applyUpdatedHistoryMessage, noteLocalDayWrite],
  );

  const handleTogglePin = useCallback(
    async (message) => {
      if (!storageReady || !message?.id) return;
      const dateStr =
        message.dateStr || localDateString(new Date(message.at), detectTimeZone());
      const nextPinnedAt = message.pinnedAt ? '' : new Date().toISOString();
      try {
        const updated = await patchChatMessageMeta(ctx, dateStr, message.id, {
          pinnedAt: nextPinnedAt,
        });
        if (!updated) {
          setError('메시지를 찾지 못했습니다.');
          return;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === message.id ? { ...m, ...updated, dateStr } : m,
          ),
        );
        setPinnedResults((prev) => {
          if (!nextPinnedAt) {
            return prev.filter((m) => m.id !== message.id);
          }
          const next = prev.filter((m) => m.id !== message.id);
          return [{ ...updated, dateStr }, ...next];
        });
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      } catch (e) {
        setError(e?.message || '고정 변경 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const handleToggleCollapse = useCallback(
    async (message) => {
      if (!storageReady || !message?.id) return;
      const dateStr =
        message.dateStr || localDateString(new Date(message.at), detectTimeZone());
      const nextCollapsed =
        message.collapsed === '1' || message.collapsed === true ? '' : '1';
      try {
        const updated = await patchChatMessageMeta(ctx, dateStr, message.id, {
          collapsed: nextCollapsed,
        });
        if (!updated) {
          setError('메시지를 찾지 못했습니다.');
          return;
        }
        const patch = { ...updated, dateStr };
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setPinnedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setNotedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setEditedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setSearchResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      } catch (e) {
        setError(e?.message || '접기 상태 변경 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const handleToggleReaction = useCallback(
    async (message, reaction) => {
      if (!storageReady || !message?.id || !reaction) return;
      const dateStr =
        message.dateStr || localDateString(new Date(message.at), detectTimeZone());
      const nextReactions = toggleReaction(message.reactions, reaction);
      const reactionsAt =
        nextReactions.length > 0 ? new Date().toISOString() : '';
      try {
        const updated = await patchChatMessageMeta(ctx, dateStr, message.id, {
          reactions: nextReactions,
          reactionsAt,
        });
        if (!updated) {
          setError('메시지를 찾지 못했습니다.');
          return;
        }
        const patch = { ...updated, dateStr };
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setPinnedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setNotedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setEditedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setSearchResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      } catch (e) {
        setError(e?.message || '반응 변경 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const runPinnedScan = useCallback(async () => {
    if (!storageReady) return;
    setPinnedLoading(true);
    pinnedDayKeysRef.current = [];
    try {
      const keys = await listDayKeys(ctx);
      pinnedDayKeysRef.current = keys;
      const pinned = [];
      const noted = [];
      const edited = [];
      for (const dateStr of keys) {
        const msgs = await readDayMessages(ctx, dateStr);
        for (const msg of msgs) {
          const row = { ...msg, dateStr };
          if (msg.pinnedAt) pinned.push(row);
          if (msg.notePath) noted.push(row);
          if (msg.editedAt) edited.push(row);
        }
      }
      pinned.sort(
        (a, b) =>
          (Date.parse(b.pinnedAt || b.at) || 0) -
          (Date.parse(a.pinnedAt || a.at) || 0),
      );
      noted.sort(
        (a, b) => (Date.parse(b.at) || 0) - (Date.parse(a.at) || 0),
      );
      edited.sort(
        (a, b) =>
          (Date.parse(b.editedAt || b.at) || 0) -
          (Date.parse(a.editedAt || a.at) || 0),
      );
      setPinnedResults(pinned);
      setNotedResults(noted);
      setEditedResults(edited);
    } finally {
      setPinnedLoading(false);
    }
  }, [storageReady, ctx]);

  useEffect(() => {
    if (!pinnedOpen || !storageReady) return;
    void runPinnedScan();
  }, [pinnedOpen, storageReady, runPinnedScan]);

  const handleShareGroupSend = useCallback(
    async (body, group) => {
      if (!storageReady) throw new Error(storageSendErrorHint);
      const trimmed = String(body || '').trim();
      if (!trimmed) return;
      const { dateStr } = await appendChatMessage(ctx, {
        body: trimmed,
        group: group || SELF_GROUP,
        source: 'share',
      });
      if (dateStr) {
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
        const msgs = await readDayMessages(ctx, dateStr);
        setMessages(msgs);
        setDayKeys((prev) =>
          prev.includes(dateStr) ? prev : [dateStr, ...prev].sort().reverse(),
        );
        setWindowNewestIndex(0);
        setLoadedDayIndex(1);
      }
      clearShareGroupSend();
    },
    [storageReady, ctx, storageSendErrorHint, noteLocalDayWrite, clearShareGroupSend],
  );

  const runSearchScan = useCallback(
    async (filters, fromIndex, accumulate) => {
      if (!storageReady) return { results: accumulate, nextIndex: fromIndex, hasMore: false };
      const keys = searchDayKeysRef.current.length
        ? searchDayKeysRef.current
        : await listDayKeys(ctx);
      searchDayKeysRef.current = keys;
      const batchSize = 3;
      let i = fromIndex;
      const found = [...accumulate];
      while (i < keys.length && found.length - accumulate.length < 40) {
        const end = Math.min(i + batchSize, keys.length);
        for (; i < end; i++) {
          const dateStr = keys[i];
          const msgs = await readDayMessages(ctx, dateStr);
          for (const msg of msgs) {
            const hit = await matchesFilters(
              msg,
              dateStr,
              filters,
              ogStorage,
              groups,
            );
            if (hit.ok) {
              found.push({
                ...msg,
                dateStr,
                ogSearchText: hit.ogSearchText || '',
              });
            }
          }
        }
        // if only group/date filter with no query, still scan but stop after enough
        if (!filters?.query && found.length >= 60) break;
      }
      return { results: found, nextIndex: i, hasMore: i < keys.length };
    },
    [storageReady, ctx, ogStorage, groups],
  );

  const handleSearch = useCallback(
    async (filters) => {
      setSearchFilters(filters);
      const active =
        filters?.query ||
        (filters?.groupFilter && filters.groupFilter !== '__all__') ||
        filters?.dateFilter ||
        filters?.fromDt ||
        filters?.toDt;
      if (!active) {
        setSearchResults([]);
        setSearchCursor(0);
        return;
      }
      setSearchLoading(true);
      searchDayKeysRef.current = [];
      try {
        const { results, nextIndex } = await runSearchScan(filters, 0, []);
        setSearchResults(results);
        setSearchCursor(nextIndex);
      } finally {
        setSearchLoading(false);
      }
    },
    [runSearchScan],
  );

  const handleSearchLoadMore = useCallback(async () => {
    if (!searchFilters || searchLoading) return;
    setSearchLoading(true);
    try {
      const { results, nextIndex } = await runSearchScan(
        searchFilters,
        searchCursor,
        searchResults,
      );
      setSearchResults(results);
      setSearchCursor(nextIndex);
    } finally {
      setSearchLoading(false);
    }
  }, [searchFilters, searchLoading, searchCursor, searchResults, runSearchScan]);

  const handleSelectResult = useCallback(
    async (result) => {
      if (isMobileLayout) {
        setSearchOpen(false);
        setPinnedOpen(false);
      }
      await jumpToDate(result.dateStr, result.id);
    },
    [isMobileLayout, jumpToDate],
  );

  const closeOtherMobileRails = useCallback(
    (except) => {
      if (!isMobileLayout) return;
      if (except !== 'group') setGroupOpen(false);
      if (except !== 'date') setDateOpen(false);
      if (except !== 'search') setSearchOpen(false);
      if (except !== 'pinned') setPinnedOpen(false);
    },
    [isMobileLayout],
  );

  const toggleMobileRail = useCallback(
    (rail, open, setOpen) => {
      if (!isMobileLayout) {
        setOpen((v) => !v);
        return;
      }
      if (open) {
        setOpen(false);
        return;
      }
      closeOtherMobileRails(rail);
      setOpen(true);
    },
    [isMobileLayout, closeOtherMobileRails],
  );

  const closeTopMobileRail = useCallback(() => {
    if (searchOpen) setSearchOpen(false);
    else if (pinnedOpen) setPinnedOpen(false);
    else if (dateOpen) setDateOpen(false);
    else if (groupOpen) setGroupOpen(false);
  }, [searchOpen, pinnedOpen, dateOpen, groupOpen]);

  const mobileRailOpen = groupOpen || dateOpen || searchOpen || pinnedOpen;
  useHistoryOverlayBack(
    mobileRailOpen,
    closeTopMobileRail,
    isMobileLayout,
    'chat-rail',
  );

  const searchHasMore = searchCursor < (searchDayKeysRef.current.length || 0);

  const toolbarBtnClass = (active) =>
    `rounded p-1.5 ${
      active
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg'
    }`;

  const groupIconByName = useMemo(() => groupIconMap(groups), [groups]);
  const groupLabelByKey = useMemo(() => groupLabelMap(groups), [groups]);

  const groupPanelProps = {
    groups,
    viewGroup: viewGroupFilter,
    onToggleViewGroup: handleToggleViewGroup,
    onAddGroup: handleAddGroup,
    onRenameGroup: handleRenameGroup,
    onSetGroupIcon: handleSetGroupIcon,
    getPresignedUrl: getPresignedUrlForPath,
    onAfterAddGroup: (id) => {
      const key = id || SELF_GROUP;
      setSelectedGroup(key);
      setViewGroupFilter(key);
    },
  };

  const searchPanelProps = {
    groups,
    dayKeys,
    onSearch: handleSearch,
    results: searchResults,
    loading: searchLoading,
    hasMore: searchHasMore,
    onLoadMore: handleSearchLoadMore,
    onSelectResult: handleSelectResult,
    onTogglePin: handleTogglePin,
    onOpenNote,
    onViewEditHistory: setHistoryMessage,
    timeZone,
    getPresignedUrl: getPresignedUrlForPath,
    noteExists,
  };

  const pinnedPanelProps = {
    groups,
    pinnedResults,
    notedResults,
    editedResults,
    loading: pinnedLoading,
    onSelectResult: handleSelectResult,
    onTogglePin: handleTogglePin,
    onOpenNote,
    onViewEditHistory: setHistoryMessage,
    timeZone,
    getPresignedUrl: getPresignedUrlForPath,
    noteExists,
  };

  const desktopResizableCount = Math.max(
    1,
    (groupOpen ? 1 : 0) +
      (dateOpen ? 1 : 0) +
      (searchOpen ? 1 : 0) +
      (pinnedOpen ? 1 : 0),
  );

  return (
    <ChatImageLightboxProvider>
    <ChatUiPrefsProvider openLinksInNewWindow={openLinksInNewWindow}>
    <div className="flex h-full max-h-full min-h-0 w-full flex-col overflow-hidden bg-white dark:bg-odp-bg">
      <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 dark:border-odp-borderSoft px-3 py-2">
        {isMobileLayout && !sidebarOpen ? (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg"
            aria-label="사이드바 열기"
          >
            <Menu size={18} />
          </button>
        ) : null}
        <div className="flex min-w-0 flex-1 items-center gap-0.5">
          <h2 className="min-w-0 truncate text-sm font-bold text-gray-800 dark:text-odp-fgStrong">
            <span className="flex items-center gap-1">
              <MessageCircleMore size={18} className="shrink-0 text-gray-500 dark:text-gray-400" />
              나와의 채팅
            </span>
          </h2>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={!storageReady || refreshing}
            className={`${toolbarBtnClass(false)} shrink-0 disabled:opacity-40`}
            aria-label="새로고침"
            title="새로고침"
          >
            <RefreshCw
              size={18}
              className={refreshing ? 'animate-spin' : undefined}
              aria-hidden
            />
          </button>
        </div>
        {isMobileLayout ? (
          <button
            type="button"
            onClick={() => setComposerSettingsOpen(true)}
            className={toolbarBtnClass(composerSettingsOpen)}
            aria-label="입력창 설정"
            title="입력창 설정"
            aria-pressed={composerSettingsOpen}
          >
            <Settings size={18} />
          </button>
        ) : (
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <ChatNavSwitch
              id="chat-nav-toolbar"
              label="툴바"
              title="입력창 툴바"
              checked={composerToolbarOpen}
              onCheckedChange={toggleComposerToolbar}
            />
            <ChatNavSwitch
              id="chat-nav-line-numbers"
              label="줄번호"
              title="입력창 줄 번호"
              checked={composerLineNumbers}
              onCheckedChange={toggleComposerLineNumbers}
            />
            <ChatNavSwitch
              id="chat-nav-open-links-new-window"
              label="링크 새창"
              title="링크를 새창으로 열기"
              checked={openLinksInNewWindow}
              onCheckedChange={toggleOpenLinksInNewWindow}
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => toggleMobileRail('date', dateOpen, setDateOpen)}
          className={toolbarBtnClass(dateOpen)}
          aria-label="날짜 목록"
          title="날짜 목록"
          aria-pressed={dateOpen}
        >
          <CalendarDays size={18} />
        </button>
        <button
          type="button"
          onClick={() => toggleMobileRail('group', groupOpen, setGroupOpen)}
          className={toolbarBtnClass(groupOpen)}
          aria-label="그룹"
          title="그룹"
          aria-pressed={groupOpen}
        >
          <Users size={18} />
        </button>
        <button
          type="button"
          onClick={() => toggleMobileRail('search', searchOpen, setSearchOpen)}
          className={toolbarBtnClass(searchOpen)}
          aria-label="검색"
          title="검색"
          aria-pressed={searchOpen}
        >
          <Search size={18} />
        </button>
        <button
          type="button"
          onClick={() => toggleMobileRail('pinned', pinnedOpen, setPinnedOpen)}
          className={toolbarBtnClass(pinnedOpen)}
          aria-label="모아보기"
          title="모아보기"
          aria-pressed={pinnedOpen}
        >
          <Pin size={18} />
        </button>
      </div>

      {error ? (
        <div className="shrink-0 bg-red-50 px-3 py-1.5 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {!storageReady ? (
        <div className="flex flex-1 items-center justify-center p-6 text-sm text-gray-500">
          {storageNotReadyHint}
        </div>
      ) : (
        <div className="flex min-h-0 max-h-full flex-1 overflow-hidden" data-chat-rails-root>
          <div className="flex min-h-0 min-w-0 max-h-full flex-1 flex-col overflow-hidden bg-[#b9cfe0] dark:bg-[#0b1220]">
            <ChatMessageList
              messages={visibleMessages}
              ogStorage={ogStorage}
              timeZone={timeZone}
              highlightId={highlightId}
              editingMessageId={editTarget?.id || null}
              onReachTop={handleLoadOlder}
              onReachBottom={handleLoadNewer}
              loadingOlder={loadingOlder}
              loadingNewer={loadingNewer}
              hasMore={hasMore}
              hasMoreNewer={hasMoreNewer}
              onReply={handleReply}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onAddToNote={setAddToNoteMessage}
              onViewEditHistory={setHistoryMessage}
              onTogglePin={handleTogglePin}
              onToggleCollapse={handleToggleCollapse}
              onToggleReaction={handleToggleReaction}
              onOpenNote={onOpenNote}
              onOpenReplyTarget={handleOpenReplyTarget}
              getPresignedUrl={getPresignedUrlForPath}
              noteExists={noteExists}
              groupIconByName={groupIconByName}
              groupLabelByKey={groupLabelByKey}
              emptyHint={
                viewGroupFilter
                  ? `「${resolveGroupLabel(groups, viewGroupFilter)}」 그룹 메시지가 없습니다`
                  : undefined
              }
            />
            <ChatComposerDock
              autoFit={Boolean(editTarget)}
              fitKey={editTarget?.id || ''}
            >
              <div
                className={
                  editTarget
                    ? 'mx-auto flex w-full max-w-full px-2 md:max-w-[min(100%,50vw)] md:px-3'
                    : 'mx-auto flex h-full min-h-0 w-full max-w-full px-2 md:max-w-[min(100%,50vw)] md:px-3'
                }
              >
                <div
                  className={
                    editTarget
                      ? 'flex w-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white px-2 py-1 shadow-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:shadow-none md:px-3 md:py-1.5'
                      : 'flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white px-2 py-1 shadow-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:shadow-none md:px-3 md:py-1.5'
                  }
                >
                  <ChatComposer
                    bare
                    fillParent={!editTarget}
                    groups={groups}
                    selectedGroup={selectedGroup}
                    onSelectedGroupChange={setSelectedGroup}
                    onAddGroup={handleAddGroup}
                    onSend={handleSend}
                    sending={pendingSend || pendingEdit}
                    theme={theme === 'dark' ? 'dark' : 'light'}
                    replyTo={replyTo}
                    onClearReply={() => setReplyTo(null)}
                    editTarget={editTarget}
                    onClearEdit={() => setEditTarget(null)}
                    onSaveEdit={handleSaveEdit}
                    ogStorage={ogStorage}
                    timeZone={timeZone}
                    getPresignedUrl={getPresignedUrlForPath}
                    showToolbar={composerToolbarOpen}
                    showLineNumbers={composerLineNumbers}
                    seedBody={composerSeed}
                    onSeedConsumed={() => setComposerSeed(null)}
                  />
                </div>
              </div>
            </ChatComposerDock>
          </div>
          {!isMobileLayout ? (
            <>
              <ChatRailShell
                open={dateOpen}
                onClose={() => setDateOpen(false)}
                storageKey="s3haim_chat_date_rail_width"
                defaultWidth={280}
                reservedAside={0}
                openResizableCount={desktopResizableCount}
                label="날짜 사이드바 너비 조절"
              >
                <ChatDatePanel
                  dayKeys={dayKeys}
                  dayCounts={dayCounts}
                  activeDate={activeJumpDate}
                  timeZone={timeZone}
                  onSelectDate={(dateStr) => {
                    void jumpToDate(dateStr);
                  }}
                  onClose={() => setDateOpen(false)}
                />
              </ChatRailShell>
              <ChatRailShell
                open={groupOpen}
                onClose={() => setGroupOpen(false)}
                storageKey="s3haim_chat_group_rail_width"
                defaultWidth={260}
                reservedAside={0}
                openResizableCount={desktopResizableCount}
                label="그룹 사이드바 너비 조절"
              >
                <ChatGroupPanel
                  {...groupPanelProps}
                  onClose={() => setGroupOpen(false)}
                />
              </ChatRailShell>
              <ChatRailShell
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                storageKey="s3haim_chat_search_rail_width"
                defaultWidth={320}
                reservedAside={0}
                openResizableCount={desktopResizableCount}
                label="검색 사이드바 너비 조절"
              >
                <ChatSearchPanel
                  open
                  onClose={() => setSearchOpen(false)}
                  {...searchPanelProps}
                />
              </ChatRailShell>
              <ChatRailShell
                open={pinnedOpen}
                onClose={() => setPinnedOpen(false)}
                storageKey="s3haim_chat_pinned_rail_width"
                defaultWidth={300}
                reservedAside={0}
                openResizableCount={desktopResizableCount}
                label="모아보기 사이드바 너비 조절"
              >
                <ChatPinnedPanel
                  open
                  onClose={() => setPinnedOpen(false)}
                  {...pinnedPanelProps}
                />
              </ChatRailShell>
            </>
          ) : (
            <>
              <ChatMobileDrawer
                open={groupOpen}
                onClose={() => setGroupOpen(false)}
                width="80vw"
                zClass="z-[70]"
                label="그룹"
              >
                <ChatGroupPanel
                  {...groupPanelProps}
                  onClose={() => setGroupOpen(false)}
                />
              </ChatMobileDrawer>
              <ChatMobileDrawer
                open={dateOpen}
                onClose={() => setDateOpen(false)}
                width="80vw"
                zClass="z-[72]"
                label="날짜"
              >
                <ChatDatePanel
                  dayKeys={dayKeys}
                  dayCounts={dayCounts}
                  activeDate={activeJumpDate}
                  timeZone={timeZone}
                  onSelectDate={(dateStr) => {
                    void jumpToDate(dateStr);
                    setDateOpen(false);
                  }}
                  onClose={() => setDateOpen(false)}
                />
              </ChatMobileDrawer>
              <ChatMobileDrawer
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                width="100%"
                zClass="z-[80]"
                label="검색"
              >
                <ChatSearchPanel
                  open
                  onClose={() => setSearchOpen(false)}
                  {...searchPanelProps}
                />
              </ChatMobileDrawer>
              <ChatMobileDrawer
                open={pinnedOpen}
                onClose={() => setPinnedOpen(false)}
                width="100%"
                zClass="z-[80]"
                label="모아보기"
              >
                <ChatPinnedPanel
                  open
                  onClose={() => setPinnedOpen(false)}
                  disableTabAutoClose={isMobileLayout}
                  {...pinnedPanelProps}
                />
              </ChatMobileDrawer>
            </>
          )}
        </div>
      )}

      <ChatAddToNoteModal
        isOpen={Boolean(addToNoteMessage)}
        message={addToNoteMessage}
        storageType={storageMode === 'local' ? 'local' : 's3'}
        s3Tree={s3Tree}
        localTree={localTree}
        localRootHandle={localRootHandle}
        timeZone={timeZone}
        isSubmitting={addToNoteSubmitting}
        selectPathAfterCreate={selectPathAfterCreateFolder}
        onSelectPathAfterCreateApplied={onSelectPathAfterCreateFolderApplied}
        onClose={() => {
          if (!addToNoteSubmitting) setAddToNoteMessage(null);
        }}
        onRequestCreateFolder={onRequestCreateFolderForNote}
        onRequestMoveFolder={onRequestMoveFolder}
        onDropOnFolder={onDropOnFolder}
        dropTarget={dropTarget}
        onLoadLocalFolderChildren={onLoadLocalFolderChildren}
        localFolderLoadingPath={localFolderLoadingPath}
        onConfirm={async (payload) => {
          if (!onCreateNoteFromMessage) return;
          setAddToNoteSubmitting(true);
          try {
            const notePath = await onCreateNoteFromMessage(payload);
            if (notePath && payload?.message?.id) {
              const dateStr =
                payload.message.dateStr ||
                localDateString(
                  new Date(payload.message.at || Date.now()),
                  detectTimeZone(),
                );
              const nextMsg = { ...payload.message, notePath, dateStr };
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === payload.message.id ? { ...m, notePath } : m,
                ),
              );
              setNotedResults((prev) => {
                const next = prev.filter((m) => m.id !== payload.message.id);
                return [nextMsg, ...next];
              });
            }
            setAddToNoteMessage(null);
          } finally {
            setAddToNoteSubmitting(false);
          }
        }}
      />
      <ChatShareGroupSendModal
        isOpen={Boolean(shareGroupModal?.body)}
        body={shareGroupModal?.body || ''}
        groups={groups}
        onAddGroup={handleAddGroup}
        onSend={handleShareGroupSend}
        onClose={clearShareGroupSend}
        getPresignedUrl={getPresignedUrlForPath}
      />
      <ChatComposerSettingsModal
        open={composerSettingsOpen}
        onOpenChange={setComposerSettingsOpen}
        showToolbar={composerToolbarOpen}
        onShowToolbarChange={toggleComposerToolbar}
        showLineNumbers={composerLineNumbers}
        onShowLineNumbersChange={toggleComposerLineNumbers}
        openLinksInNewWindow={openLinksInNewWindow}
        onOpenLinksInNewWindowChange={toggleOpenLinksInNewWindow}
      />
      <ChatEditHistoryModal
        open={Boolean(historyMessage)}
        message={
          historyMessage
            ? messages.find((m) => m.id === historyMessage.id) || historyMessage
            : null
        }
        onOpenChange={(next) => {
          if (!next) setHistoryMessage(null);
        }}
        timeZone={timeZone}
        getPresignedUrl={getPresignedUrlForPath}
        groups={groups}
        onLoadHistoryPage={handleLoadEditHistoryPage}
        onDeleteHistoryEntry={handleDeleteEditHistoryEntry}
        onDeleteAllHistory={handleDeleteAllEditHistory}
      />
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="메시지 삭제"
        message={
          deleteTarget
            ? `이 메시지를 삭제할까요?\n\n${(deleteTarget.body || '')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 120) || '(빈 메시지)'}`
            : ''
        }
        variant="danger"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          confirmDeleteMessage();
        }}
        onCancel={() => {
          setDeleteTarget(null);
        }}
      />
    </div>
    </ChatUiPrefsProvider>
    </ChatImageLightboxProvider>
  );
}
