import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Menu, Search } from 'lucide-react';
import ChatComposer from '@/components/chatWithMyself/ChatComposer';
import ChatGroupPanel from '@/components/chatWithMyself/ChatGroupPanel';
import ChatMessageList from '@/components/chatWithMyself/ChatMessageList';
import ChatSearchPanel from '@/components/chatWithMyself/ChatSearchPanel';
import {
  SELF_GROUP,
  addGroup,
  appendChatMessage,
  createOgStorageAdapters,
  deleteChatMessage,
  detectTimeZone,
  findMessageById,
  listDayKeys,
  localDateString,
  makeReplySnippet,
  readDayMessages,
  sharePayloadFromSearch,
  touchTimezone,
} from '@/utils/chatWithMyself';
import { savePendingShare, getPendingShares, deletePendingShare } from '@/utils/chatWithMyself/chatDb.js';

function matchesFilters(msg, dateStr, filters) {
  if (!filters) return true;
  if (filters.groupFilter && filters.groupFilter !== '__all__') {
    if ((msg.group || SELF_GROUP) !== filters.groupFilter) return false;
  }
  if (filters.dateFilter && dateStr !== filters.dateFilter) return false;
  if (filters.fromDt) {
    const from = new Date(filters.fromDt).getTime();
    if (!Number.isNaN(from) && new Date(msg.at).getTime() < from) return false;
  }
  if (filters.toDt) {
    const to = new Date(filters.toDt).getTime();
    if (!Number.isNaN(to) && new Date(msg.at).getTime() > to) return false;
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const body = (msg.body || '').toLowerCase();
    const group = (msg.group || '').toLowerCase();
    if (!body.includes(q) && !group.includes(q)) return false;
  }
  return true;
}

/**
 * Main chat pane for /chat — keeps MainApp sidebar; this is the right content area.
 */
export default function ChatWithMyselfPane({
  storageMode,
  getS3Client,
  s3Bucket,
  localRootHandle,
  theme,
  isMobileLayout = false,
  sidebarOpen,
  onOpenSidebar,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const ctx = useMemo(() => {
    if (storageMode === 'local') {
      return { mode: 'local', localRootHandle };
    }
    return {
      mode: 's3',
      client: getS3Client?.(),
      bucket: s3Bucket,
    };
  }, [storageMode, getS3Client, s3Bucket, localRootHandle]);

  const storageReady =
    (ctx.mode === 's3' && ctx.client && ctx.bucket) ||
    (ctx.mode === 'local' && ctx.localRootHandle);

  const ogStorage = useMemo(
    () => (storageReady ? createOgStorageAdapters(ctx) : null),
    [storageReady, ctx],
  );

  const [groups, setGroups] = useState([]);
  const [timeZone, setTimeZone] = useState(detectTimeZone);
  const [selectedGroup, setSelectedGroup] = useState(SELF_GROUP);
  const [dayKeys, setDayKeys] = useState([]);
  const [loadedDayIndex, setLoadedDayIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCursor, setSearchCursor] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [highlightId, setHighlightId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const shareHandledRef = useRef(false);
  const searchDayKeysRef = useRef([]);
  const messagesRef = useRef(messages);
  const dayKeysRef = useRef(dayKeys);
  const loadedDayIndexRef = useRef(loadedDayIndex);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    dayKeysRef.current = dayKeys;
  }, [dayKeys]);
  useEffect(() => {
    loadedDayIndexRef.current = loadedDayIndex;
  }, [loadedDayIndex]);

  const hasMore = loadedDayIndex < dayKeys.length;

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
    try {
      await refreshMeta();
      const keys = await listDayKeys(ctx);
      const today = localDateString(new Date(), detectTimeZone());
      const ordered = keys.includes(today) ? keys : [today, ...keys];
      const unique = [...new Set(ordered)];
      setDayKeys(unique);
      const first = unique[0];
      const msgs = first ? await readDayMessages(ctx, first) : [];
      setMessages(msgs);
      setLoadedDayIndex(1);
    } catch (e) {
      setError(e?.message || '채팅 로드 실패');
    }
  }, [storageReady, ctx, refreshMeta]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const appendShareBody = useCallback(
    async (body) => {
      if (!body || !storageReady) return;
      await appendChatMessage(ctx, {
        body,
        group: SELF_GROUP,
        source: 'share',
      });
      await loadInitial();
    },
    [ctx, storageReady, loadInitial],
  );

  // Share target query ingest
  useEffect(() => {
    if (shareHandledRef.current) return;
    const hasShare =
      searchParams.has('title') ||
      searchParams.has('text') ||
      searchParams.has('url');
    if (!hasShare) return;
    shareHandledRef.current = true;
    const { body } = sharePayloadFromSearch(searchParams);
    setSearchParams({}, { replace: true });
    (async () => {
      if (!body) return;
      if (!storageReady) {
        await savePendingShare({ body });
        return;
      }
      try {
        await appendShareBody(body);
      } catch {
        await savePendingShare({ body });
      }
    })();
  }, [searchParams, setSearchParams, storageReady, appendShareBody]);

  // Flush pending shares when storage becomes ready
  useEffect(() => {
    if (!storageReady) return;
    (async () => {
      const pending = await getPendingShares();
      for (const p of pending) {
        try {
          await appendShareBody(p.body);
          await deletePendingShare(p.id);
        } catch {
          /* keep pending */
        }
      }
    })();
  }, [storageReady, appendShareBody]);

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

  const handleSend = useCallback(
    async (body, group, replyTarget = null) => {
      if (!storageReady) {
        setError(
          storageMode === 'local'
            ? '로컬 폴더를 먼저 열어주세요.'
            : 'S3 자격 증명이 필요합니다.',
        );
        return;
      }
      setSending(true);
      setError('');
      try {
        const { msg, dateStr } = await appendChatMessage(ctx, {
          body,
          group,
          source: 'compose',
          replyTo: replyTarget?.id || '',
          replySnippet: replyTarget
            ? makeReplySnippet(replyTarget.snippet || replyTarget.body)
            : '',
          replyGroup: replyTarget?.group || '',
        });
        setMessages((prev) => {
          const today = localDateString(new Date(), detectTimeZone());
          if (dateStr === today || dayKeys[0] === dateStr) {
            return [...prev, msg];
          }
          return prev;
        });
        if (!dayKeys.includes(dateStr)) {
          setDayKeys((prev) => [dateStr, ...prev.filter((d) => d !== dateStr)]);
        }
        setReplyTo(null);
      } catch (e) {
        setError(e?.message || '전송 실패');
      } finally {
        setSending(false);
      }
    },
    [storageReady, storageMode, ctx, dayKeys],
  );

  const handleReply = useCallback((message) => {
    setReplyTo({
      id: message.id,
      group: message.group || SELF_GROUP,
      body: message.body,
      snippet: makeReplySnippet(message.body),
      dateStr: message.dateStr,
    });
  }, []);

  const handleDelete = useCallback(
    async (message) => {
      if (!storageReady || !message?.id) return;
      const dateStr =
        message.dateStr || localDateString(new Date(message.at), detectTimeZone());
      if (!window.confirm('이 메시지를 삭제할까요?')) return;
      try {
        const ok = await deleteChatMessage(ctx, dateStr, message.id);
        if (ok) {
          setMessages((prev) => prev.filter((m) => m.id !== message.id));
          if (replyTo?.id === message.id) setReplyTo(null);
        } else {
          setError('메시지를 찾지 못했습니다.');
        }
      } catch (e) {
        setError(e?.message || '삭제 실패');
      }
    },
    [storageReady, ctx, replyTo],
  );

  const ensureMessageLoaded = useCallback(
    async (messageId) => {
      const existing = messagesRef.current.find((m) => m.id === messageId);
      if (existing) return existing;

      const keys = dayKeysRef.current;
      let idx = loadedDayIndexRef.current;
      let msgs = [...messagesRef.current];
      while (idx < keys.length) {
        const dateStr = keys[idx];
        const older = await readDayMessages(ctx, dateStr);
        msgs = [...older, ...msgs];
        idx += 1;
        setMessages(msgs);
        setLoadedDayIndex(idx);
        const found = older.find((m) => m.id === messageId);
        if (found) return found;
      }

      const hit = await findMessageById(ctx, messageId);
      if (!hit) return null;
      if (!keys.includes(hit.dateStr)) {
        setDayKeys((prev) => [...prev, hit.dateStr]);
      }
      setMessages((prev) => {
        if (prev.some((m) => m.id === messageId)) return prev;
        return [...hit.msg ? [hit.msg] : [], ...prev];
      });
      return hit.msg;
    },
    [ctx],
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
    async (name) => {
      const next = await addGroup(ctx, name);
      setGroups(next);
    },
    [ctx],
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
            if (matchesFilters(msg, dateStr, filters)) {
              found.push({ ...msg, dateStr });
            }
          }
        }
        // if only group/date filter with no query, still scan but stop after enough
        if (!filters?.query && found.length >= 60) break;
      }
      return { results: found, nextIndex: i, hasMore: i < keys.length };
    },
    [storageReady, ctx],
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
      setHighlightId(result.id);
      if (isMobileLayout) setSearchOpen(false);
      // Ensure day is loaded in main list
      const idx = dayKeys.indexOf(result.dateStr);
      if (idx >= 0 && idx >= loadedDayIndex) {
        let msgs = [...messages];
        for (let i = loadedDayIndex; i <= idx; i++) {
          const older = await readDayMessages(ctx, dayKeys[i]);
          msgs = [...older, ...msgs];
        }
        setMessages(msgs);
        setLoadedDayIndex(idx + 1);
      }
    },
    [isMobileLayout, dayKeys, loadedDayIndex, messages, ctx],
  );

  const searchHasMore = searchCursor < (searchDayKeysRef.current.length || 0);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white dark:bg-odp-bg">
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
        <h2 className="flex-1 truncate text-sm font-bold text-gray-800 dark:text-odp-fgStrong">
          나와의 채팅
        </h2>
        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          className={`rounded p-1.5 ${
            searchOpen
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg'
          }`}
          aria-label="검색"
          title="검색"
        >
          <Search size={18} />
        </button>
      </div>

      {error ? (
        <div className="shrink-0 bg-red-50 px-3 py-1.5 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {!storageReady ? (
        <div className="flex flex-1 items-center justify-center p-6 text-sm text-gray-500">
          {storageMode === 'local'
            ? '로컬 폴더를 연 뒤 채팅을 사용할 수 있습니다.'
            : 'S3에 로그인한 뒤 채팅을 사용할 수 있습니다.'}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-slate-100/80 dark:bg-odp-bg">
            <div className="mx-auto flex h-full min-h-0 w-full max-w-full flex-col md:max-w-[min(100%,50vw)]">
              <ChatMessageList
                messages={messages}
                ogStorage={ogStorage}
                timeZone={timeZone}
                highlightId={highlightId}
                onReachTop={handleLoadOlder}
                loadingOlder={loadingOlder}
                hasMore={hasMore}
                onReply={handleReply}
                onDelete={handleDelete}
                onOpenReplyTarget={handleOpenReplyTarget}
              />
              <ChatComposer
                groups={groups}
                selectedGroup={selectedGroup}
                onSelectedGroupChange={setSelectedGroup}
                onAddGroup={handleAddGroup}
                onSend={handleSend}
                sending={sending}
                theme={theme === 'dark' ? 'dark' : 'light'}
                replyTo={replyTo}
                onClearReply={() => setReplyTo(null)}
              />
            </div>
          </div>
          {!isMobileLayout && !searchOpen ? (
            <ChatGroupPanel
              groups={groups}
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
              onAddGroup={handleAddGroup}
            />
          ) : null}
          <ChatSearchPanel
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            groups={groups}
            onSearch={handleSearch}
            results={searchResults}
            loading={searchLoading}
            hasMore={searchHasMore}
            onLoadMore={handleSearchLoadMore}
            onSelectResult={handleSelectResult}
            fullscreen={isMobileLayout}
          />
        </div>
      )}
    </div>
  );
}
