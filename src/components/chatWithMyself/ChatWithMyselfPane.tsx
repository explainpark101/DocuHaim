import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChatGroup, ChatMessage } from '@/utils/chatWithMyself/messageTypes';
import type { ChatReaction } from '@/utils/chatWithMyself/reactions';
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
import ChatFileDropOverlay from '@/components/chatWithMyself/ChatFileDropOverlay';
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
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import PromptModal from '@/components/shared/modals/PromptModal';
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
  // @ts-expect-error TS(6133) FIXME: 'appendChatMessage' is declared but its value is n... Remove this comment to see the full error message
  appendChatMessage,
  appendShareChatMessage,
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
  getCollectionMediaFlags,
  upsertCollectionMembership,
  detectTimeZone,
  findMessageById,
  listDayKeys,
  localDateString,
  makeReplySnippet,
  createMessageId,
  dedupeMessagesById,
  prependUniqueMessages,
  appendUniqueMessages,
  readDayMessages,
  touchTimezone,
  fuzzyMatchTokensInHaystacks,
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
  getPerfReduceLayoutAnimEnabled,
  writePerfReduceLayoutAnimPref,
  getPerfReduceBubblePressFxEnabled,
  writePerfReduceBubblePressFxPref,
  getComposerLightweightEnabled,
  writeComposerLightweightPref,
  getChatRailOpen,
  writeChatRailOpenPref,
  flushPendingMessages,
  postChatSyncEvent,
  toggleReaction,
  hasReaction,
  reactionKey,
  normalizeReaction,
  normalizeStoragePath,
  isChatMessageEncrypted,
  ENCRYPTED_MESSAGE_LABEL,
  encryptChatMessageBody,
  decryptChatMessageBody,
  parseEncryptedChatPayload,
  buildTreeShareItems,
  listFilesUnderFolderPath,
} from '@/utils/chatWithMyself';
import {
  getPendingMessages,
  deletePendingMessage,
} from '@/utils/chatWithMyself/chatDb';
import { findFileNodeByPath, findNodeByPath } from '@/utils/vault/s3Tree';
import { getStorageScopeId } from '@/utils/vault/storageScope';

async function matchesFilters(msg: any, dateStr: any, filters: any, ogStorage: any, groups = []) {
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
  if (filters.noReactionsOnly) {
    const reactions = Array.isArray(msg.reactions) ? msg.reactions : [];
    if (reactions.length > 0) {
      return { ok: false, ogSearchText: '' };
    }
  }
  if (filters.query) {
    const body = msg.body || '';
    const group = msg.group || '';
    const { attachments } = extractChatBodyAttachments(body);
    const reactionSearchText = reactionsToSearchText(msg.reactions);
    const localHaystacks = [
      body,
      group,
      ...attachments.flatMap((att: any) => [att.name || '', att.path || '']),
      reactionSearchText,
    ];
    if (fuzzyMatchTokensInHaystacks(localHaystacks, filters.query)) {
      return { ok: true, ogSearchText: '' };
    }
    const ogSearchText = await loadMessageOgSearchText(msg, ogStorage);
    if (fuzzyMatchTokensInHaystacks([...localHaystacks, ogSearchText], filters.query)) {
      return { ok: true, ogSearchText };
    }
    return { ok: false, ogSearchText: '' };
  }
  return { ok: true, ogSearchText: '' };
}

function normalizeOutgoingAttachments(items: any) {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      if (!item) return null;
      if (item instanceof File || item instanceof Blob) {
        return { file: item, background: null };
      }
      if (item.file instanceof File || item.file instanceof Blob) {
        return { file: item.file, background: item.background || null };
      }
      return null;
    })
    .filter(Boolean);
}

/** Prefer enough history on first paint so viewport fill rarely day-steps. */
const INITIAL_MIN_MESSAGES = 40;
const INITIAL_MAX_DAYS = 21;
/** Silent fill safety net: multiple days per prepend to cut scroll stutter. */
const FILL_BATCH_DAYS = 3;

/**
 * Walk day keys newest→oldest from startIndex: first until at least one
 * message exists, then until minMessages / maxDays / end of keys.
 * Empty "today" must not hide older history. Short leftovers may still be
 * topped up by ChatMessageList silent fill when content does not overflow.
 *
 * @param {import('@/utils/chatWithMyself/storage').ChatStorageCtx} ctx
 * @param {string[]} dayKeysNewestFirst
 * @param {{ minMessages?: number, maxDays?: number, startIndex?: number }} [opts]
 * @returns {Promise<{ messages: import('@/utils/chatWithMyself/format').ChatMessage[], loadedDayIndex: number }>}
 */
async function readMessagesForInitialWindow(ctx: any, dayKeysNewestFirst: any, opts = {}) {
  // @ts-expect-error TS(2339) FIXME: Property 'minMessages' does not exist on type '{}'... Remove this comment to see the full error message
  const minMessages = Math.max(1, Number(opts.minMessages) || INITIAL_MIN_MESSAGES);
  // @ts-expect-error TS(2339) FIXME: Property 'maxDays' does not exist on type '{}'.
  const maxDays = Math.max(1, Number(opts.maxDays) || INITIAL_MAX_DAYS);
  const keys = Array.isArray(dayKeysNewestFirst) ? dayKeysNewestFirst : [];
  // @ts-expect-error TS(2339) FIXME: Property 'startIndex' does not exist on type '{}'.
  let loadedDayIndex = Math.max(0, Number(opts.startIndex) || 0);
  let messages: any = [];
  let daysRead = 0;

  while (loadedDayIndex < keys.length && messages.length === 0) {
    const dateStr = keys[loadedDayIndex];
    loadedDayIndex += 1;
    daysRead += 1;
    if (!dateStr) continue;
    const dayMsgs = await readDayMessages(ctx, dateStr);
    messages = prependUniqueMessages(dayMsgs || [], messages);
  }

  while (
    loadedDayIndex < keys.length &&
    messages.length < minMessages &&
    daysRead < maxDays
  ) {
    const dateStr = keys[loadedDayIndex];
    loadedDayIndex += 1;
    daysRead += 1;
    if (!dateStr) continue;
    const dayMsgs = await readDayMessages(ctx, dateStr);
    messages = prependUniqueMessages(dayMsgs || [], messages);
  }

  return { messages: dedupeMessagesById(messages), loadedDayIndex };
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
  onAttachDropHostChange,
  onRegisterTreeAttachDrop,
  isActive = true
}: any) {
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

  const storageScope = useMemo(
    () => (storageReady ? getStorageScopeId(ctx) : ''),
    [storageReady, ctx],
  );

  const fileTree = useMemo(() => {
    if (storageMode === 'local') return localTree || [];
    if (storageMode === 'webdav') return webdavTree || [];
    return s3Tree || [];
  }, [storageMode, s3Tree, localTree, webdavTree]);

  const setAttachDropHostNode = useCallback(
    (node: any) => {
      onAttachDropHostChange?.(node);
    },
    [onAttachDropHostChange],
  );

  useEffect(() => {
    return () => onAttachDropHostChange?.(null);
  }, [onAttachDropHostChange]);

  const noteExists = useCallback(
    (path: any) => {
      const p = normalizeStoragePath(path);
      if (!p || p.startsWith('.trash/')) return false;
      return Boolean(findFileNodeByPath(fileTree, p));
    },
    [fileTree],
  );

  const folderExists = useCallback(
    (path: any) => {
      const raw = normalizeStoragePath(path);
      if (!raw || raw.startsWith('.trash/')) return false;
      const withSlash = raw.endsWith('/') ? raw : `${raw}/`;
      const without = withSlash.replace(/\/+$/, '');
      const node =
        findNodeByPath(fileTree, withSlash) ||
        findNodeByPath(fileTree, without) ||
        findNodeByPath(fileTree, raw);
      return Boolean(node && node.type === 'folder');
    },
    [fileTree],
  );

  const listFolderFiles = useCallback(
    (folderPath: any) => listFilesUnderFolderPath(fileTree, folderPath, (path: any) => {
      const raw = normalizeStoragePath(path);
      const withSlash = raw.endsWith('/') ? raw : `${raw}/`;
      const without = withSlash.replace(/\/+$/, '');
      return (
        findNodeByPath(fileTree, withSlash) ||
        findNodeByPath(fileTree, without) ||
        findNodeByPath(fileTree, raw) ||
        null
      );
    }),
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

  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [timeZone, setTimeZone] = useState(detectTimeZone);
  const [selectedGroup, setSelectedGroup] = useState(SELF_GROUP);
  /** null = show all groups; otherwise only that group's messages */
  const [viewGroupFilter, setViewGroupFilter] = useState<string | null>(null);
  const [dayKeys, setDayKeys] = useState<string[]>([]);
  const [dayCounts, setDayCounts] = useState<Record<string, number>>({});
  /** Inclusive index of newest day currently in the message window. */
  const [windowNewestIndex, setWindowNewestIndex] = useState(0);
  /** Exclusive end index of oldest day in the window (same role as former loadedDayIndex). */
  const [loadedDayIndex, setLoadedDayIndex] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [loadingNewer, setLoadingNewer] = useState(false);
  const [booting, setBooting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [error, setError] = useState('');
  const [searchOpen, setSearchOpen] = useState(() =>
    getChatRailOpen('search', { isMobileLayout }),
  );
  const [searchFocusTick, setSearchFocusTick] = useState(0);
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
  const [perfReduceLayoutAnim, setPerfReduceLayoutAnim] = useState(
    getPerfReduceLayoutAnimEnabled,
  );
  const [perfReduceBubblePressFx, setPerfReduceBubblePressFx] = useState(
    getPerfReduceBubblePressFxEnabled,
  );
  const [composerLightweight, setComposerLightweight] = useState(
    getComposerLightweightEnabled,
  );
  const [composerSettingsOpen, setComposerSettingsOpen] = useState(false);
  const [activeJumpDate, setActiveJumpDate] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchCursor, setSearchCursor] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  // Persist across rail/drawer unmount so open/close never wipes the search form.
  const [searchQuery, setSearchQuery] = useState('');
  const [searchGroupFilter, setSearchGroupFilter] = useState('__all__');
  const [searchDateFilter, setSearchDateFilter] = useState('');
  const [searchFromDt, setSearchFromDt] = useState('');
  const [searchToDt, setSearchToDt] = useState('');
  const [searchNoReactionsOnly, setSearchNoReactionsOnly] = useState(false);
  const [searchFiltersUiOpen, setSearchFiltersUiOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [editTarget, setEditTarget] = useState<ChatMessage | null>(null);
  const [addToNoteMessage, setAddToNoteMessage] = useState<ChatMessage | null>(null);
  const [historyMessage, setHistoryMessage] = useState<ChatMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [deletingCount, setDeletingCount] = useState(0);
  /** @type {[Record<string, string>, Function]} session-only decrypted plaintext by message id */
  const [decryptedById, setDecryptedById] = useState<Record<string, string>>({});
  const [decryptTarget, setDecryptTarget] = useState<ChatMessage | null>(null);
  const [decryptError, setDecryptError] = useState('');
  const [addToNoteSubmitting, setAddToNoteSubmitting] = useState(false);
  const [composerSeed, setComposerSeed] = useState<any>(null);
  const [shareGroupModal, setShareGroupModal] = useState<any>(null);
  const [pinnedResults, setPinnedResults] = useState<any[]>([]);
  const [notedResults, setNotedResults] = useState<any[]>([]);
  const [editedResults, setEditedResults] = useState<any[]>([]);
  const [linkResults, setLinkResults] = useState<any[]>([]);
  const [fileResults, setFileResults] = useState<any[]>([]);
  const [photoResults, setPhotoResults] = useState<any[]>([]);
  const [pinnedLoading, setPinnedLoading] = useState(false);
  const searchDayKeysRef = useRef<string[]>([]);
  const searchGenRef = useRef(0);
  const pinnedDayKeysRef = useRef<string[]>([]);
  const messagesRef = useRef(messages);
  const dayKeysRef = useRef(dayKeys);
  const loadedDayIndexRef = useRef(loadedDayIndex);
  const windowNewestIndexRef = useRef(windowNewestIndex);
  const sendQueueRef = useRef<any[]>([]);
  const flushingSendRef = useRef(false);
  const reactionChainRef = useRef(new Map<string, Promise<unknown>>());
  const reactionGenRef = useRef(new Map<string, number>());
  const reactionBaseRef = useRef(new Map<string, any>());
  const syncApiRef = useRef<any>(null);
  const localTombstonesRef = useRef(new Set<string>());
  const loadingOlderRef = useRef(false);
  const loadingNewerRef = useRef(false);
  /** @type {React.MutableRefObject<import('@/utils/chatWithMyself/scrollToMessage').ChatMessageListHandle | null>} */
  const messageListRef = useRef<any>(null);
  const composerRef = useRef<any>(null);

  const noteLocalDayWrite = useCallback((dateStr: any) => {
    if (dateStr) syncApiRef.current?.invalidateDay(dateStr);
  }, []);
  const noteLocalMetaWrite = useCallback(() => {
    syncApiRef.current?.invalidateMeta();
  }, []);

  const handleTreeAttachDrop = useCallback(
    (items: any) => {
      if (!storageReady) return;
      try {
        const shareItems = buildTreeShareItems(items, (_storageType: any, path: any) =>
          findNodeByPath(fileTree, path) || findFileNodeByPath(fileTree, path),
        );
        if (!shareItems.length) return;
        composerRef.current?.enqueueShareItems?.(shareItems);
      } catch (err) {
        console.warn('Tree → chat share stage failed:', err);
      }
    },
    [storageReady, fileTree],
  );

  useEffect(() => {
    onRegisterTreeAttachDrop?.(handleTreeAttachDrop);
    return () => onRegisterTreeAttachDrop?.(null);
  }, [handleTreeAttachDrop, onRegisterTreeAttachDrop]);

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
    if (!storageScope) return;
    const meta = readComposerDraftMeta(storageScope);
    if (!meta) {
      setSelectedGroup(SELF_GROUP);
      setReplyTo(null);
      return;
    }
    if (meta.group) setSelectedGroup(meta.group);
    else setSelectedGroup(SELF_GROUP);
    if (meta.replyTo?.id) setReplyTo(meta.replyTo);
    else setReplyTo(null);
  }, [storageScope]);

  // Once groups load, map legacy draft/selected names → stable ids.
  useEffect(() => {
    if (!groups.length) return;
    setSelectedGroup((prev: any) => resolveGroupId(groups, prev || SELF_GROUP));
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

  const toggleComposerToolbar = useCallback((next: any) => {
    const value = typeof next === 'boolean' ? next : !composerToolbarOpen;
    setComposerToolbarOpen(value);
    writeComposerToolbarPref(value);
  }, [composerToolbarOpen]);

  const toggleComposerLineNumbers = useCallback((next: any) => {
    const value = typeof next === 'boolean' ? next : !composerLineNumbers;
    setComposerLineNumbers(value);
    writeComposerLineNumbersPref(value);
  }, [composerLineNumbers]);

  const toggleOpenLinksInNewWindow = useCallback((next: any) => {
    const value = typeof next === 'boolean' ? next : !openLinksInNewWindow;
    setOpenLinksInNewWindow(value);
    writeOpenLinksInNewWindowPref(value);
  }, [openLinksInNewWindow]);

  const togglePerfReduceLayoutAnim = useCallback((next: any) => {
    const value = typeof next === 'boolean' ? next : !perfReduceLayoutAnim;
    setPerfReduceLayoutAnim(value);
    writePerfReduceLayoutAnimPref(value);
  }, [perfReduceLayoutAnim]);

  const togglePerfReduceBubblePressFx = useCallback((next: any) => {
    const value = typeof next === 'boolean' ? next : !perfReduceBubblePressFx;
    setPerfReduceBubblePressFx(value);
    writePerfReduceBubblePressFxPref(value);
  }, [perfReduceBubblePressFx]);

  const toggleComposerLightweight = useCallback((next: any) => {
    const value = typeof next === 'boolean' ? next : !composerLightweight;
    setComposerLightweight(value);
    writeComposerLightweightPref(value);
  }, [composerLightweight]);

  const hasMore = loadedDayIndex < dayKeys.length;
  const hasMoreNewer = windowNewestIndex > 0;

  const visibleMessages = useMemo(() => {
    const source = !viewGroupFilter
      ? messages
      : messages.filter((m) =>
          groupMatches(groups, m.group || SELF_GROUP, viewGroupFilter),
        );
    return dedupeMessagesById(source);
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

  const handleToggleViewGroup = useCallback(
    (group: any) => {
      const next = viewGroupFilter === group ? null : group;
      setViewGroupFilter(next);
      // Keep composer send-group in sync with sidebar selection, but never
      // override the message group while an edit is in progress.
      if (next != null && !editTarget) {
        setSelectedGroup(next);
      }
    },
    [viewGroupFilter, editTarget],
  );

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
      // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
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
      const { messages: msgs, loadedDayIndex: end } =
        await readMessagesForInitialWindow(ctx, unique);
      localTombstonesRef.current.clear();
      setMessages(msgs);
      setWindowNewestIndex(0);
      setLoadedDayIndex(end);
      setActiveJumpDate(unique[0] || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : '채팅 로드 실패');
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
      let msgs = [];
      for (let i = parts.length - 1; i >= 0; i -= 1) {
        msgs.push(...(parts[i] || []));
      }
      msgs = dedupeMessagesById(msgs);

      let windowNewest = 0;
      let windowEnd = 0;
      let jumpDate = null;
      if (loadDates.length) {
        const firstDate = loadDates[0]!;
        const lastDate = loadDates[loadDates.length - 1]!;
        const firstIdx = unique.indexOf(firstDate);
        const lastIdx = unique.indexOf(lastDate);
        windowNewest = firstIdx >= 0 ? firstIdx : 0;
        windowEnd = lastIdx >= 0 ? lastIdx + 1 : unique[0] ? 1 : 0;
        jumpDate = loadDates[0] || unique[0] || null;
      }

      // Same empty-today trap as loadInitial: expand older days until history appears.
      if (!msgs.length && unique.length) {
        const filled = await readMessagesForInitialWindow(ctx, unique);
        msgs = filled.messages;
        windowNewest = 0;
        windowEnd = filled.loadedDayIndex;
        jumpDate = unique[0] || null;
      }

      setMessages(msgs);
      setWindowNewestIndex(windowNewest);
      setLoadedDayIndex(windowEnd);
      setActiveJumpDate(jumpDate);
    } catch (e) {
      setError(e instanceof Error ? e.message : '새로고침 실패');
    } finally {
      const elapsed = Date.now() - started;
      if (elapsed < 450) {
        await new Promise((r) => window.setTimeout(r, 450 - elapsed));
      }
      setRefreshing(false);
    }
  }, [storageReady, refreshing, ctx, refreshMeta]);

  useEffect(() => {
    setMessages([]);
    setGroups([]);
    setDayKeys([]);
    setDayCounts({});
    setWindowNewestIndex(0);
    setLoadedDayIndex(0);
    setActiveJumpDate(null);
    localTombstonesRef.current.clear();
  }, [storageScope]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  // Flush IDB pending messages after storage is ready
  useEffect(() => {
    if (!storageReady) return undefined;
    let cancelled = false;
    const scope = getStorageScopeId(ctx);
    (async () => {
      try {
        const { flushed, dateStrs } = await flushPendingMessages(ctx, {
          getPendingMessages: () => getPendingMessages(scope),
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

  const handleRemoteDayMerged = useCallback((dateStr: any, remoteMessages: any, remoteParsed: any) => {
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

  const handleRemoteMeta = useCallback((meta: any) => {
    setGroups(meta.groups || []);
    setTimeZone(meta.timezone || detectTimeZone());
  }, []);

  const handleRemoteDayKeys = useCallback((keys: any) => {
    const today = localDateString(new Date(), detectTimeZone());
    const ordered = [...new Set(keys.includes(today) ? keys : [today, ...keys])];
    const prev = dayKeysRef.current;
    const oldStart = windowNewestIndexRef.current;
    const oldEnd = loadedDayIndexRef.current;
    const loadedDates =
      prev.length && oldEnd > oldStart ? prev.slice(oldStart, oldEnd) : [];

    // @ts-expect-error TS(2345) FIXME: Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
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
    if (!shareGroupSend?.id) return;
    const hasBody = shareGroupSend.body != null;
    const hasFiles =
      Array.isArray(shareGroupSend.files) && shareGroupSend.files.length > 0;
    if (!hasBody && !hasFiles) return;
    setEditTarget(null);
    // @ts-expect-error TS(7006) FIXME: Parameter 'prev' implicitly has an 'any' type.
    setShareGroupModal((prev) =>
      prev?.id === shareGroupSend.id ? prev : shareGroupSend,
    );
  }, [shareGroupSend]);

  const clearShareGroupSend = useCallback(() => {
    setShareGroupModal(null);
    onShareGroupSendConsumed?.();
  }, [onShareGroupSendConsumed]);

  /**
   * Load older day file(s) and prepend.
   * @param {{ silent?: boolean, maxDays?: number }} [opts]
   *   silent — skip loadingOlder UI (viewport fill)
   *   maxDays — how many day files to read in one prepend (default 1)
   * @returns {Promise<boolean>} true if the window advanced
   */
  const handleLoadOlder = useCallback(async (opts = {}) => {
    // @ts-expect-error TS(2339) FIXME: Property 'silent' does not exist on type '{}'.
    const silent = Boolean(opts?.silent);
    // @ts-expect-error TS(2339) FIXME: Property 'maxDays' does not exist on type '{}'.
    const maxDays = Math.max(1, Number(opts?.maxDays) || 1);
    if (!storageReady || loadingOlderRef.current) return false;
    const keys = dayKeysRef.current;
    const startIdx = loadedDayIndexRef.current;
    if (startIdx >= keys.length) return false;

    loadingOlderRef.current = true;
    if (!silent) setLoadingOlder(true);

    let nextIdx = startIdx;
    /** @type {import('@/utils/chatWithMyself/format').ChatMessage[]} */
    let olderHead: any = [];
    try {
      let daysAttempted = 0;
      while (nextIdx < keys.length && daysAttempted < maxDays) {
        const dateStr = keys[nextIdx];
        nextIdx += 1;
        daysAttempted += 1;
        if (!dateStr) continue;
        const older = await readDayMessages(ctx, dateStr);
        olderHead = prependUniqueMessages(older || [], olderHead);
      }
      loadedDayIndexRef.current = nextIdx;
      setLoadedDayIndex(nextIdx);
      if (olderHead.length) {
        setMessages((prev) => prependUniqueMessages(olderHead, prev));
      }
      return nextIdx > startIdx;
    } catch (e) {
      loadedDayIndexRef.current = startIdx;
      setLoadedDayIndex(startIdx);
      // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
      setError(e?.message || '이전 대화 로드 실패');
      return false;
    } finally {
      loadingOlderRef.current = false;
      if (!silent) setLoadingOlder(false);
    }
  }, [storageReady, ctx]);

  const handleFillOlder = useCallback(
    () => handleLoadOlder({ silent: true, maxDays: FILL_BATCH_DAYS }),
    [handleLoadOlder],
  );

  const handleLoadNewer = useCallback(async () => {
    if (!storageReady || loadingNewerRef.current) return;
    const newestIdx = windowNewestIndexRef.current;
    if (newestIdx <= 0) return;
    const nextIdx = newestIdx - 1;
    const dateStr = dayKeysRef.current[nextIdx];
    if (!dateStr) return;

    loadingNewerRef.current = true;
    windowNewestIndexRef.current = nextIdx;
    setLoadingNewer(true);
    setWindowNewestIndex(nextIdx);
    try {
      const newer = await readDayMessages(ctx, dateStr);
      setMessages((prev) => appendUniqueMessages(prev, newer));
    } catch (e) {
      windowNewestIndexRef.current = newestIdx;
      setWindowNewestIndex(newestIdx);
      // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
      setError(e?.message || '이후 대화 로드 실패');
    } finally {
      loadingNewerRef.current = false;
      setLoadingNewer(false);
    }
  }, [storageReady, ctx]);

  const scrollToDayFirstMessage = useCallback((dateStr: any, messageId: string | null = null) => {
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
      messageListRef.current?.scrollToDateStr(dateStr);
    });
  }, []);

  /**
   * Jump to a day without loading middle days.
   * Loads that day plus older days up to the initial window budget; newer
   * days load via infinite scroll.
   */
  const jumpToDate = useCallback(
    async (dateStr: any, messageId: string | null = null) => {
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
        const { messages: msgs, loadedDayIndex: end } =
          await readMessagesForInitialWindow(ctx, keys, { startIndex: idx });
        setMessages(msgs);
        setWindowNewestIndex(idx);
        setLoadedDayIndex(end);
        const targetId =
          messageId ||
          msgs.find((m: any) => m.dateStr === dateStr)?.id ||
          msgs[0]?.id ||
          null;
        if (targetId) {
          if (messageId) setViewGroupFilter(null);
          setHighlightId(targetId);
          window.setTimeout(
            () => setHighlightId((cur) => (cur === targetId ? null : cur)),
            2200,
          );
        } else {
          requestAnimationFrame(() => {
            messageListRef.current?.scrollToDateStr(dateStr);
          });
        }
      } catch (e) {
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '날짜 이동 실패');
      } finally {
        setJumping(false);
      }
    },
    [storageReady, ctx, scrollToDayFirstMessage],
  );

  // Deep-link to a message via /chat#msg-{id} (Link / navigate / hashchange).
  useEffect(() => {
    if (!isActive || !storageReady) return undefined;
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
  }, [isActive, storageReady, ctx, jumpToDate, location.hash, location.pathname]);

  // Advanced Search shortcuts: /chat#settings|groups|dates|search|pinned|group-{id}
  useEffect(() => {
    if (!isActive) return undefined;
    if (location.pathname !== '/chat' && !location.pathname.endsWith('/chat')) {
      return undefined;
    }
    const hashRaw = String(location.hash || '').replace(/^#/, '');
    if (/^group-clear$/i.test(hashRaw) || /^clear-group$/i.test(hashRaw)) {
      setViewGroupFilter(null);
      if (isMobileLayout) {
        setGroupOpen(true);
        setDateOpen(false);
        setSearchOpen(false);
        setPinnedOpen(false);
      } else {
        setGroupOpen(true);
      }
      return undefined;
    }

    const groupMatch = hashRaw.match(/^group[-=](.+)$/i);
    if (groupMatch?.[1]) {
      let groupKey = groupMatch[1];
      try {
        groupKey = decodeURIComponent(groupKey);
      } catch {
        // keep raw
      }
      const id = resolveGroupId(groups, groupKey);
      setViewGroupFilter(id);
      if (!editTarget) {
        setSelectedGroup(id);
      }
      if (isMobileLayout) {
        setGroupOpen(true);
        setDateOpen(false);
        setSearchOpen(false);
        setPinnedOpen(false);
      } else {
        setGroupOpen(true);
      }
      return undefined;
    }

    const raw = hashRaw.toLowerCase();
    if (!raw || raw.startsWith('msg-')) return undefined;

    const openRail = (kind: any) => {
      if (isMobileLayout) {
        setGroupOpen(kind === 'group');
        setDateOpen(kind === 'date');
        setSearchOpen(kind === 'search');
        setPinnedOpen(kind === 'pinned');
      } else if (kind === 'group') setGroupOpen(true);
      else if (kind === 'date') setDateOpen(true);
      else if (kind === 'search') setSearchOpen(true);
      else if (kind === 'pinned') setPinnedOpen(true);
    };

    if (raw === 'settings' || raw === 'chat-settings') {
      setComposerSettingsOpen(true);
      return undefined;
    }
    if (raw === 'groups' || raw === 'group') {
      openRail('group');
      return undefined;
    }
    if (raw === 'dates' || raw === 'date') {
      openRail('date');
      return undefined;
    }
    if (raw === 'search') {
      openRail('search');
      return undefined;
    }
    if (raw === 'pinned' || raw === 'pins') {
      openRail('pinned');
      return undefined;
    }
    return undefined;
  }, [isActive, location.hash, location.pathname, isMobileLayout, groups, editTarget]);

  // Prefer composer focus on open; skip when deep-link opens another rail/modal.
  const autoFocusComposer = useMemo(() => {
    const hashRaw = String(location.hash || '').replace(/^#/, '');
    if (/^group[-=]/i.test(hashRaw) || /^group-clear$/i.test(hashRaw) || /^clear-group$/i.test(hashRaw)) {
      return true;
    }
    const raw = hashRaw.toLowerCase();
    if (!raw || raw.startsWith('msg-')) return true;
    return ![
      'settings',
      'chat-settings',
      'groups',
      'group',
      'dates',
      'date',
      'search',
      'pinned',
      'pins',
    ].includes(raw);
  }, [location.hash]);

  const confirmPendingMessages = useCallback((msgs: any, dateStr: any) => {
    if (!msgs?.length || !dateStr) return;
    const byId = new Map(msgs.map((m: any) => [m.id, m]));
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
          const prepared: Array<Record<string, unknown>> = [];
          for (const item of batch) {
            const uploaded = [];
            for (const attachment of item.files) {
              const uploadedItem = await uploadChatAttachment(ctx, attachment.file);
              uploaded.push({
                ...uploadedItem,
                background: attachment.background || null,
              });
            }
            const attachMd = chatAttachmentsToMarkdown(uploaded);
            let finalBody = [attachMd, item.text].filter(Boolean).join('\n\n');
            let encrypted = Boolean(item.encrypted);
            if (item.encryptPassword) {
              finalBody = await encryptChatMessageBody(
                finalBody,
                item.encryptPassword,
              );
              encrypted = true;
            }
            setMessages((prev) =>
              prev.map((m) =>
                m.id === item.clientId
                  ? {
                      ...m,
                      body: finalBody,
                      encrypted,
                      pendingSync: 'send',
                    }
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
              markdown: Boolean(item.markdown),
              encrypted,
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
          // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
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
    (body: any, group: any, replyTarget = null, imageFiles = [], options = {}) => {
      if (!storageReady) {
        setError(storageSendErrorHint);
        return;
      }
      const text = String(body || '').trim();
      const files = normalizeOutgoingAttachments(imageFiles);
      if (!text && files.length === 0) return;
      const markdown =
        // @ts-expect-error TS(2339) FIXME: Property 'markdown' does not exist on type '{}'.
        options.markdown === true ||
        // @ts-expect-error TS(2339) FIXME: Property 'markdown' does not exist on type '{}'.
        options.markdown === '1' ||
        // @ts-expect-error TS(2339) FIXME: Property 'markdown' does not exist on type '{}'.
        options.markdown === 'true';
      const encryptPassword =
        // @ts-expect-error TS(2339) FIXME: Property 'encryptPassword' does not exist on type ... Remove this comment to see the full error message
        typeof options.encryptPassword === 'string'
          // @ts-expect-error TS(2339) FIXME: Property 'encryptPassword' does not exist on type ... Remove this comment to see the full error message
          ? options.encryptPassword.trim()
          : '';
      const encrypted = Boolean(encryptPassword);

      const tz = detectTimeZone();
      const at = new Date().toISOString();
      const dateStr = localDateString(new Date(at), tz);
      const clientId = createMessageId();
      const optimisticBody = encrypted
        ? ENCRYPTED_MESSAGE_LABEL
        : [
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
        markdown: encrypted ? false : markdown,
        encrypted,
        // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
        replyTo: replyTarget?.id || '',
        replySnippet: replyTarget
          ? makeReplySnippet(
              isChatMessageEncrypted(replyTarget)
                ? ENCRYPTED_MESSAGE_LABEL
                // @ts-expect-error TS(2339) FIXME: Property 'snippet' does not exist on type 'never'.
                : replyTarget.snippet || replyTarget.body,
            )
          : '',
        // @ts-expect-error TS(2339) FIXME: Property 'group' does not exist on type 'never'.
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
        markdown,
        encrypted,
        encryptPassword: encryptPassword || '',
      });
      void flushSendQueue();
    },
    [storageReady, storageSendErrorHint, flushSendQueue],
  );

  const handleReply = useCallback((message: any) => {
    setEditTarget(null);
    const locked =
      isChatMessageEncrypted(message) && !decryptedById[message.id];
    setReplyTo({
      id: message.id,
      group: message.group || SELF_GROUP,
      body: locked ? ENCRYPTED_MESSAGE_LABEL : message.body,
      // @ts-expect-error TS(2345) FIXME: Argument of type '{ id: any; group: any; body: any... Remove this comment to see the full error message
      snippet: makeReplySnippet(
        locked ? ENCRYPTED_MESSAGE_LABEL : message.body,
      ),
      dateStr: message.dateStr,
      at: message.at,
    });
  }, [decryptedById]);

  const handleEdit = useCallback(
    (message: any) => {
      if (!message?.id) return;
      if (isChatMessageEncrypted(message)) {
        const plain = decryptedById[message.id];
        if (!plain) return;
        setReplyTo(null);
        setEditTarget({
          ...message,
          body: plain,
          encrypted: false,
        });
        setSelectedGroup(resolveGroupId(groups, message.group || SELF_GROUP));
        return;
      }
      setReplyTo(null);
      setEditTarget(message);
      setSelectedGroup(resolveGroupId(groups, message.group || SELF_GROUP));
    },
    [groups, decryptedById],
  );

  const handleRequestDecrypt = useCallback((message: any) => {
    if (!message?.id || !isChatMessageEncrypted(message)) return;
    if (decryptedById[message.id]) return;
    if (!parseEncryptedChatPayload(message.body)) return;
    setDecryptError('');
    setDecryptTarget(message);
  }, [decryptedById]);

  const handleConfirmDecrypt = useCallback(
    async (password: any) => {
      if (!decryptTarget?.id) return;
      try {
        const plain = await decryptChatMessageBody(decryptTarget.body, password);
        setDecryptedById((prev) => ({
          ...prev,
          [decryptTarget.id]: plain,
        }));
        setDecryptTarget(null);
        setDecryptError('');
      } catch {
        setDecryptError('비밀번호가 올바르지 않거나 메시지를 열 수 없습니다.');
      }
    },
    [decryptTarget],
  );

  const handleSaveEdit = useCallback(
    async (body: any, group: any, target: any, imageFiles = [], options = {}) => {
      if (!storageReady || !target?.id) return;
      const dateStr =
        target.dateStr || localDateString(new Date(target.at), detectTimeZone());
      const text = String(body || '').trim();
      const files = normalizeOutgoingAttachments(imageFiles);
      // @ts-expect-error TS(2339) FIXME: Property 'existingMarkdown' does not exist on type... Remove this comment to see the full error message
      const existingMarkdown = String(options.existingMarkdown || '').trim();
      // @ts-expect-error TS(2339) FIXME: Property 'removedPaths' does not exist on type '{}... Remove this comment to see the full error message
      const removedPaths = Array.isArray(options.removedPaths)
        // @ts-expect-error TS(2339) FIXME: Property 'removedPaths' does not exist on type '{}... Remove this comment to see the full error message
        ? options.removedPaths.filter(Boolean)
        : [];
      const markdown =
        // @ts-expect-error TS(2339) FIXME: Property 'markdown' does not exist on type '{}'.
        options.markdown === true ||
        // @ts-expect-error TS(2339) FIXME: Property 'markdown' does not exist on type '{}'.
        options.markdown === '1' ||
        // @ts-expect-error TS(2339) FIXME: Property 'markdown' does not exist on type '{}'.
        options.markdown === 'true';
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
                markdown,
                encrypted: false,
                editedAt,
                pendingSync: 'edit',
              }
            : m,
        ),
      );

      try {
        const uploaded = [];
        for (const attachment of files) {
          // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
          const item = await uploadChatAttachment(ctx, attachment.file);
          uploaded.push({
            ...item,
            // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
            background: attachment.background || null,
          });
        }
        const uploadedMd = chatAttachmentsToMarkdown(uploaded);
        const finalBody = [existingMarkdown, uploadedMd, text]
          .filter(Boolean)
          .join('\n\n');
        if (finalBody !== optimisticBody) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === target.id
                ? { ...m, body: finalBody, encrypted: false, pendingSync: 'edit' }
                : m,
            ),
          );
        }

        const updated = await updateChatMessage(ctx, dateStr, target.id, {
          body: finalBody,
          group,
          markdown,
          encrypted: false,
        });
        if (!updated) {
          setMessages((prev) =>
            prev.map((m) => (m.id === target.id ? { ...snapshot } : m)),
          );
          setError('메시지를 찾지 못했습니다.');
          return;
        }
        setDecryptedById((prev) => {
          if (!(target.id in prev)) return prev;
          const next = { ...prev };
          delete next[target.id];
          return next;
        });
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== target.id) return m;
            const next = { ...m, ...(updated as Record<string, unknown>), dateStr };
            delete next.pendingSync;
            return next;
          }),
        );
        setEditedResults((prev) => {
          const row = { ...(updated as Record<string, unknown>), dateStr };
          const next = prev.filter((m) => m.id !== target.id);
          return [row, ...next];
        });
        setPinnedResults((prev) =>
          prev.map((m) =>
            m.id === target.id
              ? { ...m, ...(updated as Record<string, unknown>), dateStr }
              : m,
          ),
        );
        setNotedResults((prev) =>
          prev.map((m) =>
            m.id === target.id
              ? { ...m, ...(updated as Record<string, unknown>), dateStr }
              : m,
          ),
        );
        {
          const row = { ...(updated as Record<string, unknown>), dateStr };
          const media = getCollectionMediaFlags(
            String((updated as Record<string, unknown>).body ?? ''),
          );
          setLinkResults((prev) =>
            upsertCollectionMembership(prev, row, media.hasLinks),
          );
          setFileResults((prev) =>
            upsertCollectionMembership(prev, row, media.hasFiles),
          );
          setPhotoResults((prev) =>
            upsertCollectionMembership(prev, row, media.hasPhotos),
          );
        }
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
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '수정 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const performDeleteMessage = useCallback(
    async (message: any) => {
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
        setLinkResults((prev) => prev.filter((m) => m.id !== message.id));
        setFileResults((prev) => prev.filter((m) => m.id !== message.id));
        setPhotoResults((prev) => prev.filter((m) => m.id !== message.id));
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
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '삭제 실패');
      } finally {
        setDeletingCount((c) => Math.max(0, c - 1));
      }
    },
    [storageReady, ctx, replyTo, editTarget, historyMessage, noteLocalDayWrite],
  );

  const handleDelete = useCallback(
    (message: any, options = {}) => {
      if (!storageReady || !message?.id) return;
      if (message.pendingSync === 'delete') return;
      // @ts-expect-error TS(2339) FIXME: Property 'skipConfirm' does not exist on type '{}'... Remove this comment to see the full error message
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
    async (messageId: any) => {
      const existing = messagesRef.current.find((m) => m.id === messageId);
      if (existing) return existing;

      const hit = await findMessageById(ctx, messageId);
      if (!hit?.msg) return null;
      const dateStr = hit.dateStr;
      if (!dateStr) return null;

      if (!dayKeysRef.current.includes(dateStr)) {
        setDayKeys((prev) => {
          const next = [...prev, dateStr];
          next.sort().reverse();
          return next;
        });
        // Allow dayKeysRef to update before jump indexes resolve.
        dayKeysRef.current = [...dayKeysRef.current, dateStr]
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort()
          .reverse();
      }

      await jumpToDate(dateStr, messageId);
      return (
        messagesRef.current.find((m) => m.id === messageId) || hit.msg
      );
    },
    [ctx, jumpToDate],
  );

  const handleOpenReplyTarget = useCallback(
    async (replyToId: any) => {
      if (!replyToId) return;
      const found = await ensureMessageLoaded(replyToId);
      if (!found) {
        setError('원본 메시지를 찾을 수 없습니다. (삭제되었을 수 있음)');
        return;
      }
      setHighlightId(replyToId);
      requestAnimationFrame(() => {
        messageListRef.current?.scrollToMessageId(replyToId, {
          align: 'center',
        });
      });
      window.setTimeout(() => setHighlightId((id) => (id === replyToId ? null : id)), 2200);
    },
    [ensureMessageLoaded],
  );

  const handleAddGroup = useCallback(
    async (name: any, options = {}) => {
      let iconPath =
        // @ts-expect-error TS(2339) FIXME: Property 'iconPath' does not exist on type '{}'.
        typeof options.iconPath === 'string' && options.iconPath.trim()
          // @ts-expect-error TS(2339) FIXME: Property 'iconPath' does not exist on type '{}'.
          ? options.iconPath.trim()
          : undefined;
      // @ts-expect-error TS(2339) FIXME: Property 'iconFile' does not exist on type '{}'.
      if (options.iconFile) {
        try {
          // @ts-expect-error TS(2339) FIXME: Property 'iconFile' does not exist on type '{}'.
          iconPath = await uploadGroupIcon(ctx, options.iconFile);
        } catch (e) {
          // Keep the group name; fall back to initials if icon upload fails.
          setError((e as Error)?.message || '그룹 아이콘 업로드 실패 (그룹은 추가됩니다)');
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
    async (groupId: any, file: any) => {
      if (!file) return;
      try {
        const iconPath = await uploadGroupIcon(ctx, file);
        const next = await setGroupIcon(ctx, groupId, iconPath);
        setGroups(next);
        noteLocalMetaWrite();
        postChatSyncEvent('meta');
      } catch (e) {
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '그룹 아이콘 변경 실패');
        throw e;
      }
    },
    [ctx, noteLocalMetaWrite],
  );

  const handleRenameGroup = useCallback(
    async (groupId: any, newName: any) => {
      try {
        const next = await renameGroup(ctx, groupId, newName);
        setGroups(next);
        noteLocalMetaWrite();
        postChatSyncEvent('meta');
        return next;
      } catch (e) {
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '그룹 이름 변경 실패');
        throw e;
      }
    },
    [ctx, noteLocalMetaWrite],
  );

  const handleLoadEditHistoryPage = useCallback(
    async (message: any, { offset = 0, limit = 10 } = {}) => {
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

  const applyUpdatedHistoryMessage = useCallback((messageId: any, updated: any, dateStr: any) => {
    if (!updated) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, ...updated, dateStr: dateStr || m.dateStr } : m,
      ),
    );
    setHistoryMessage((prev) =>
      prev?.id === messageId
        // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
        ? { ...prev, ...updated, dateStr: dateStr || prev.dateStr }
        : prev,
    );
    setEditedResults((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, ...updated, dateStr: dateStr || m.dateStr } : m,
      ),
    );
    const mediaRow = {
      id: messageId,
      ...updated,
      dateStr: dateStr || updated.dateStr,
    };
    const media = getCollectionMediaFlags(updated.body);
    setLinkResults((prev) =>
      upsertCollectionMembership(prev, mediaRow, media.hasLinks),
    );
    setFileResults((prev) =>
      upsertCollectionMembership(prev, mediaRow, media.hasFiles),
    );
    setPhotoResults((prev) =>
      upsertCollectionMembership(prev, mediaRow, media.hasPhotos),
    );
  }, []);

  const handleDeleteEditHistoryEntry = useCallback(
    async (message: any, entry: any) => {
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
    async (message: any) => {
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
    async (message: any) => {
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
            m.id === message.id
              ? { ...m, ...(updated as Record<string, unknown>), dateStr }
              : m,
          ),
        );
        setPinnedResults((prev) => {
          if (!nextPinnedAt) {
            return prev.filter((m) => m.id !== message.id);
          }
          const next = prev.filter((m) => m.id !== message.id);
          return [{ ...(updated as Record<string, unknown>), dateStr }, ...next];
        });
        const pinPatch = { ...(updated as Record<string, unknown>), dateStr };
        setLinkResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...pinPatch } : m)),
        );
        setFileResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...pinPatch } : m)),
        );
        setPhotoResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...pinPatch } : m)),
        );
        setNotedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...pinPatch } : m)),
        );
        setEditedResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...pinPatch } : m)),
        );
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      } catch (e) {
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '고정 변경 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const handleToggleCollapse = useCallback(
    async (message: any) => {
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
        const patch = { ...(updated as Record<string, unknown>), dateStr };
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
        setLinkResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setFileResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setPhotoResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        setSearchResults((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, ...patch } : m)),
        );
        noteLocalDayWrite(dateStr);
        postChatSyncEvent('day', { dateStr });
      } catch (e) {
        // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
        setError(e?.message || '접기 상태 변경 실패');
      }
    },
    [storageReady, ctx, noteLocalDayWrite],
  );

  const applyMessageLists = useCallback((messageId: any, updater: any) => {
    const apply = (prev: any) => prev.map((m: any) => m.id === messageId ? updater(m) : m);
    setMessages(apply);
    setPinnedResults(apply);
    setNotedResults(apply);
    setEditedResults(apply);
    setLinkResults(apply);
    setFileResults(apply);
    setPhotoResults(apply);
    setSearchResults(apply);
  }, []);

  const handleToggleReaction = useCallback(
    async (message: any, reaction: any) => {
      if (!storageReady || !message?.id || !reaction) return;
      const normalized = normalizeReaction(reaction);
      if (!normalized) return;
      const key = reactionKey(normalized);
      const latest =
        messagesRef.current.find((m) => m.id === message.id) || message;
      if ((latest.reactions || []).some((r: any) => reactionKey(r) === key && r.pending)) {
        return;
      }

      const dateStr =
        latest.dateStr ||
        message.dateStr ||
        localDateString(new Date(latest.at || message.at), detectTimeZone());
      const prevReactions = Array.isArray(latest.reactions)
        ? latest.reactions.map((r: any) => ({
        ...r
      }))
        : [];
      const prevReactionsAt = latest.reactionsAt || '';
      const existed = hasReaction(prevReactions, normalized);
      const nextReactions = toggleReaction(prevReactions, normalized).map((r: any) => !existed && reactionKey(r) === key ? { ...r, pending: true } : { ...r },
      );
      const reactionsAt =
        nextReactions.length > 0 ? new Date().toISOString() : '';
      const gen = (reactionGenRef.current.get(message.id) || 0) + 1;
      reactionGenRef.current.set(message.id, gen);
      if (!reactionBaseRef.current.has(message.id)) {
        reactionBaseRef.current.set(message.id, {
          reactions: prevReactions
            .filter((r: any) => !r.pending)
            .map((r: any) => normalizeReaction(r))
            .filter(Boolean),
          reactionsAt: prevReactionsAt,
        });
      }

      const optimistic = {
        reactions: nextReactions,
        reactionsAt,
        pendingReactionSync: true,
        dateStr,
      };
      messagesRef.current = messagesRef.current.map((m) =>
        m.id === message.id ? { ...m, ...optimistic } : m,
      );
      applyMessageLists(message.id, (m: any) => ({
        ...m,
        ...optimistic
      }));

      const persist = async () => {
        const toWrite = nextReactions
          .map((r: any) => normalizeReaction(r))
          .filter((r): r is ChatReaction => r != null);
        const rollbackToBase = () => {
          const base = reactionBaseRef.current.get(message.id) || {
            reactions: prevReactions,
            reactionsAt: prevReactionsAt,
          };
          reactionBaseRef.current.delete(message.id);
          const rolled = {
            reactions: base.reactions,
            reactionsAt: base.reactionsAt,
            pendingReactionSync: false,
            dateStr,
          };
          messagesRef.current = messagesRef.current.map((m) =>
            m.id === message.id ? { ...m, ...rolled } : m,
          );
          applyMessageLists(message.id, (m: any) => ({
            ...m,
            ...rolled
          }));
        };
        try {
          const updated = await patchChatMessageMeta(ctx, dateStr, message.id, {
            reactions: toWrite,
            reactionsAt,
          });
          if (!updated) {
            if (reactionGenRef.current.get(message.id) === gen) {
              rollbackToBase();
              setError('메시지를 찾지 못했습니다.');
            }
            return;
          }
          reactionBaseRef.current.set(message.id, {
            reactions: toWrite,
            reactionsAt,
          });
          if (reactionGenRef.current.get(message.id) !== gen) return;
          reactionBaseRef.current.delete(message.id);
          const confirmed = ((updated as { reactions?: unknown[] }).reactions || [])
            .map((r: any) => normalizeReaction(r))
            .filter(Boolean);
          const patch = {
            ...(updated as Record<string, unknown>),
            dateStr,
            reactions: confirmed,
            pendingReactionSync: false,
          };
          messagesRef.current = messagesRef.current.map((m) =>
            m.id === message.id ? { ...m, ...patch } : m,
          );
          applyMessageLists(message.id, (m: any) => ({
            ...m,
            ...patch
          }));
          noteLocalDayWrite(dateStr);
          postChatSyncEvent('day', { dateStr });
        } catch (e) {
          if (reactionGenRef.current.get(message.id) !== gen) return;
          rollbackToBase();
          // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
          setError(e?.message || '반응 변경 실패');
        }
      };

      const prevChain =
        reactionChainRef.current.get(message.id) || Promise.resolve();
      const nextChain = prevChain.then(persist, persist);
      reactionChainRef.current.set(message.id, nextChain);
      try {
        await nextChain;
      } finally {
        if (reactionChainRef.current.get(message.id) === nextChain) {
          reactionChainRef.current.delete(message.id);
        }
      }
    },
    [storageReady, ctx, noteLocalDayWrite, applyMessageLists],
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
      const links = [];
      const files = [];
      const photos = [];
      for (const dateStr of keys) {
        const msgs = await readDayMessages(ctx, dateStr);
        for (const msg of msgs) {
          const row = { ...msg, dateStr };
          if (msg.pinnedAt) pinned.push(row);
          if (msg.notePath) noted.push(row);
          if (msg.editedAt) edited.push(row);
          const media = getCollectionMediaFlags(msg.body);
          if (media.hasLinks) links.push(row);
          if (media.hasFiles) files.push(row);
          if (media.hasPhotos) photos.push(row);
        }
      }
      pinned.sort(
        (a, b) =>
          (Date.parse(b.pinnedAt || b.at) || 0) -
          (Date.parse(a.pinnedAt || a.at) || 0),
      );
      const byAtDesc = (a: any, b: any) =>
        (Date.parse(b.at) || 0) - (Date.parse(a.at) || 0);
      noted.sort(byAtDesc);
      edited.sort(
        (a, b) =>
          (Date.parse(b.editedAt || b.at) || 0) -
          (Date.parse(a.editedAt || a.at) || 0),
      );
      links.sort(byAtDesc);
      files.sort(byAtDesc);
      photos.sort(byAtDesc);
      setPinnedResults(pinned);
      setNotedResults(noted);
      setEditedResults(edited);
      setLinkResults(links);
      setFileResults(files);
      setPhotoResults(photos);
    } finally {
      setPinnedLoading(false);
    }
  }, [storageReady, ctx]);

  useEffect(() => {
    if (!pinnedOpen || !storageReady) return;
    void runPinnedScan();
  }, [pinnedOpen, storageReady, runPinnedScan]);

  const handleShareGroupSend = useCallback(
    async (body: any, group: any, files = []) => {
      if (!storageReady) throw new Error(storageSendErrorHint);
      const { dateStr } = await appendShareChatMessage(ctx, {
        body,
        files,
        group: group || SELF_GROUP,
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
    async (filters: any, fromIndex: any, accumulate: any) => {
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
              // @ts-expect-error TS(2345) FIXME: Argument of type 'ChatGroup[]' is not assignable t... Remove this comment to see the full error message
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
    async (filters: any) => {
      const gen = ++searchGenRef.current;
      setSearchFilters(filters);
      const active =
        filters?.query ||
        (filters?.groupFilter && filters.groupFilter !== '__all__') ||
        filters?.dateFilter ||
        filters?.fromDt ||
        filters?.toDt ||
        filters?.noReactionsOnly;
      if (!active) {
        setSearchResults([]);
        setSearchCursor(0);
        return;
      }
      setSearchLoading(true);
      searchDayKeysRef.current = [];
      try {
        const { results, nextIndex } = await runSearchScan(filters, 0, []);
        if (gen !== searchGenRef.current) return;
        setSearchResults(results);
        setSearchCursor(nextIndex);
      } finally {
        if (gen === searchGenRef.current) setSearchLoading(false);
      }
    },
    [runSearchScan],
  );

  const handleSearchLoadMore = useCallback(async () => {
    if (!searchFilters || searchLoading) return;
    const gen = searchGenRef.current;
    setSearchLoading(true);
    try {
      const { results, nextIndex } = await runSearchScan(
        searchFilters,
        searchCursor,
        searchResults,
      );
      if (gen !== searchGenRef.current) return;
      setSearchResults(results);
      setSearchCursor(nextIndex);
    } finally {
      if (gen === searchGenRef.current) setSearchLoading(false);
    }
  }, [searchFilters, searchLoading, searchCursor, searchResults, runSearchScan]);

  const handleSelectResult = useCallback(
    async (result: any) => {
      if (isMobileLayout) {
        setSearchOpen(false);
        setPinnedOpen(false);
      }
      await jumpToDate(result.dateStr, result.id);
    },
    [isMobileLayout, jumpToDate],
  );

  const closeOtherMobileRails = useCallback(
    (except: any) => {
      if (!isMobileLayout) return;
      if (except !== 'group') setGroupOpen(false);
      if (except !== 'date') setDateOpen(false);
      if (except !== 'search') setSearchOpen(false);
      if (except !== 'pinned') setPinnedOpen(false);
    },
    [isMobileLayout],
  );

  const toggleMobileRail = useCallback(
    (rail: any, open: any, setOpen: any) => {
      if (!isMobileLayout) {
        setOpen((v: any) => !v);
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

  const openSearchRail = useCallback(() => {
    if (isMobileLayout) closeOtherMobileRails('search');
    setSearchOpen(true);
    setSearchFocusTick((n) => n + 1);
  }, [isMobileLayout, closeOtherMobileRails]);

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.defaultPrevented || e.isComposing) return;
      if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
      if (e.key !== 'f' && e.key !== 'F') return;
      const target = e.target;
      if (
        target instanceof Element &&
        target.closest('[role="dialog"], [data-radix-dialog-content]')
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      openSearchRail();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [openSearchRail]);

  const mobileRailOpen = groupOpen || dateOpen || searchOpen || pinnedOpen;
  useHistoryOverlayBack(
    mobileRailOpen,
    closeTopMobileRail,
    isMobileLayout,
    'chat-rail',
  );

  const handleSearchGroupFilterChange = useCallback((next: any) => {
    const value = next || '__all__';
    setSearchGroupFilter(value);
    // Keep sidebar view lock aligned with the search group filter.
    if (value === '__all__') {
      setViewGroupFilter(null);
    } else if (viewGroupFilter) {
      setViewGroupFilter(value);
    }
  }, [viewGroupFilter]);

  const handleDismissSearchGroupFilter = useCallback(() => {
    setSearchGroupFilter('__all__');
    setViewGroupFilter(null);
  }, []);

  const searchHasMore = searchCursor < (searchDayKeysRef.current.length || 0);
  const effectiveSearchGroupFilter = viewGroupFilter || searchGroupFilter;

  const toolbarBtnClass = (active: any) => `rounded p-1.5 ${
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
    onAfterAddGroup: (id: any) => {
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
    folderExists,
    listFolderFiles,
    focusTick: searchFocusTick,
    query: searchQuery,
    onQueryChange: setSearchQuery,
    groupFilter: effectiveSearchGroupFilter,
    onGroupFilterChange: handleSearchGroupFilterChange,
    onDismissGroupFilter: handleDismissSearchGroupFilter,
    dateFilter: searchDateFilter,
    onDateFilterChange: setSearchDateFilter,
    fromDt: searchFromDt,
    onFromDtChange: setSearchFromDt,
    toDt: searchToDt,
    onToDtChange: setSearchToDt,
    noReactionsOnly: searchNoReactionsOnly,
    onNoReactionsOnlyChange: setSearchNoReactionsOnly,
    filtersOpen: searchFiltersUiOpen,
    onFiltersOpenChange: setSearchFiltersUiOpen,
  };

  // Links / files / photos follow the sidebar group selection; pin/note/edit stay global.
  const collectionMediaForView = useMemo(() => {
    if (!viewGroupFilter) {
      return { linkResults, fileResults, photoResults };
    }
    const inGroup = (m: any) => groupMatches(groups, m.group || SELF_GROUP, viewGroupFilter);
    return {
      linkResults: linkResults.filter(inGroup),
      fileResults: fileResults.filter(inGroup),
      photoResults: photoResults.filter(inGroup),
    };
  }, [viewGroupFilter, groups, linkResults, fileResults, photoResults]);

  const pinnedPanelProps = {
    groups,
    pinnedResults,
    notedResults,
    editedResults,
    linkResults: collectionMediaForView.linkResults,
    fileResults: collectionMediaForView.fileResults,
    photoResults: collectionMediaForView.photoResults,
    loading: pinnedLoading,
    onSelectResult: handleSelectResult,
    onTogglePin: handleTogglePin,
    onOpenNote,
    onViewEditHistory: setHistoryMessage,
    timeZone,
    getPresignedUrl: getPresignedUrlForPath,
    noteExists,
    folderExists,
    listFolderFiles,
  };

  const desktopResizableCount = Math.max(
    1,
    (groupOpen ? 1 : 0) +
      (dateOpen ? 1 : 0) +
      (searchOpen ? 1 : 0) +
      (pinnedOpen ? 1 : 0),
  );

  const handleComposerFilesDrop = useCallback((files: any) => {
    void composerRef.current?.enqueueFiles?.(files);
  }, []);

  return (
    <ChatImageLightboxProvider>
    <ChatUiPrefsProvider openLinksInNewWindow={openLinksInNewWindow}>
    <ChatFileDropOverlay
      className="flex h-full max-h-full min-h-0 w-full flex-col overflow-hidden bg-white dark:bg-odp-bg"
      disabled={!storageReady}
      onFilesDrop={handleComposerFilesDrop}
      rootRef={setAttachDropHostNode}
    >
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
            aria-label="채팅 설정"
            title="채팅 설정"
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
            <button
              type="button"
              onClick={() => setComposerSettingsOpen(true)}
              className={toolbarBtnClass(composerSettingsOpen)}
              aria-label="채팅 설정"
              title="채팅 설정"
              aria-pressed={composerSettingsOpen}
            >
              <Settings size={18} />
            </button>
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
              ref={messageListRef}
              messages={visibleMessages}
              ogStorage={ogStorage}
              timeZone={timeZone}
              highlightId={highlightId}
              editingMessageId={editTarget?.id || null}
              onReachTop={handleLoadOlder}
              onFillOlder={handleFillOlder}
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
              onRequestDecrypt={handleRequestDecrypt}
              decryptedById={decryptedById}
              getPresignedUrl={getPresignedUrlForPath}
              noteExists={noteExists}
              folderExists={folderExists}
              listFolderFiles={listFolderFiles}
              groupIconByName={groupIconByName}
              groupLabelByKey={groupLabelByKey}
              enableMessageLayoutAnim={!perfReduceLayoutAnim}
              enableBubblePressFx={!perfReduceBubblePressFx}
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
                    ref={composerRef}
                    key={storageScope || 'pending'}
                    bare
                    fillParent={!editTarget}
                    draftScope={storageScope}
                    autoFocusOnMount={autoFocusComposer}
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
                    showToolbar={composerToolbarOpen && !composerLightweight}
                    showLineNumbers={composerLineNumbers && !composerLightweight}
                    lightweight={composerLightweight}
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
                defaultWidth={380}
                reservedAside={0}
                openResizableCount={desktopResizableCount}
                label="날짜 사이드바 너비 조절"
              >
                <ChatDatePanel
                  dayKeys={dayKeys}
                  dayCounts={dayCounts}
                  activeDate={activeJumpDate}
                  timeZone={timeZone}
                  onSelectDate={(dateStr: any) => {
                    void jumpToDate(dateStr);
                  }}
                  onClose={() => setDateOpen(false)}
                />
              </ChatRailShell>
              <ChatRailShell
                open={groupOpen}
                onClose={() => setGroupOpen(false)}
                storageKey="s3haim_chat_group_rail_width"
                defaultWidth={380}
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
                defaultWidth={400}
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
                defaultWidth={420}
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
                  onSelectDate={(dateStr: any) => {
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
        onConfirm={async (payload: any) => {
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
        isOpen={Boolean(
          shareGroupModal &&
            (String(shareGroupModal.body || '').trim() ||
              (Array.isArray(shareGroupModal.files) &&
                shareGroupModal.files.length > 0)),
        )}
        body={shareGroupModal?.body || ''}
        files={shareGroupModal?.files || []}
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
        perfReduceLayoutAnim={perfReduceLayoutAnim}
        onPerfReduceLayoutAnimChange={togglePerfReduceLayoutAnim}
        perfReduceBubblePressFx={perfReduceBubblePressFx}
        onPerfReduceBubblePressFxChange={togglePerfReduceBubblePressFx}
        composerLightweight={composerLightweight}
        onComposerLightweightChange={toggleComposerLightweight}
      />
      <ChatEditHistoryModal
        open={Boolean(historyMessage)}
        message={
          historyMessage
            ? messages.find((m) => m.id === historyMessage.id) || historyMessage
            : null
        }
        onOpenChange={(next: any) => {
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
            ? `이 메시지를 삭제할까요?\n\n${
                isChatMessageEncrypted(deleteTarget)
                  ? ENCRYPTED_MESSAGE_LABEL
                  : (deleteTarget.body || '')
                      .replace(/\s+/g, ' ')
                      .trim()
                      .slice(0, 120) || '(빈 메시지)'
              }`
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
      <PromptModal
        isOpen={Boolean(decryptTarget)}
        title="메시지 잠금 해제"
        message="암호화할 때 사용한 비밀번호를 입력하세요."
        placeholder="비밀번호"
        confirmLabel="잠금 해제"
        cancelLabel="취소"
        inputType="password"
        error={decryptError}
        onCancel={() => {
          setDecryptTarget(null);
          setDecryptError('');
        }}
        onConfirm={(password: any) => {
          void handleConfirmDecrypt(password);
        }}
      />
    </ChatFileDropOverlay>
    </ChatUiPrefsProvider>
    </ChatImageLightboxProvider>
  );
}
