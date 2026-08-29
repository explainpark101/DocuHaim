import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import ContentSearchResultCard from '@/components/contentSearch/ContentSearchResultCard';
import { advancedSearchEngine } from '@/utils/advancedSearch';
import type { ContentSearchFileHit } from '@/utils/advancedSearch/contentSearchSnippets';
import { tokenizeForIndexAsync } from '@/utils/advancedSearch/tokenize';
import { contentSearchPathname } from '@/utils/appHref';
import { buildSessionTree, type SessionWorkspace } from '@/utils/sessionWorkspace';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

export type ContentSearchPageProps = {
  storageMode: string;
  s3Tree?: TreeNode[] | null;
  localTree?: TreeNode[] | null;
  webdavTree?: TreeNode[] | null;
  sessionWorkspace?: SessionWorkspace | null;
  onOpenFile: (path: string) => void | Promise<void>;
  isActive?: boolean;
};

const SEARCH_DEBOUNCE_MS = 250;

function statusHint(status: ReturnType<typeof advancedSearchEngine.getStatus>): string {
  if (!status.enabled) return '역색인 꺼짐 · 직접 스캔만 가능';
  if (!status.loaded) return '색인 로드 중…';
  if (status.contentSearchMode === 'index') return '역색인 본문 검색';
  if (status.contentSearchMode === 'live') return '본문 직접 검색(폴백)';
  return '본문 검색 불가 · 파일명·경로는 Advanced Search 사용';
}

export default function ContentSearchPage({
  storageMode,
  s3Tree,
  localTree,
  webdavTree,
  sessionWorkspace,
  onOpenFile,
  isActive = true,
}: ContentSearchPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [hits, setHits] = useState<ContentSearchFileHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [terms, setTerms] = useState<string[]>([]);
  const [status, setStatus] = useState(() => advancedSearchEngine.getStatus());
  const searchGenRef = useRef(0);

  useEffect(() => {
    return advancedSearchEngine.subscribe(() => {
      setStatus(advancedSearchEngine.getStatus());
    });
  }, []);

  useEffect(() => {
    if (advancedSearchEngine.isEnabled()) {
      void advancedSearchEngine.ensureLoaded();
    }
  }, []);

  useEffect(() => {
    const next = searchParams.get('q') || '';
    setQuery(next);
    setDebouncedQuery(next);
  }, [searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      const next = query.trim();
      const current = searchParams.get('q') || '';
      if (next === current) return;
      if (next) {
        setSearchParams({ q: next }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query, searchParams, setSearchParams]);

  const getTrees = useCallback((): Array<TreeNode[] | null | undefined> => {
    const trees: Array<TreeNode[] | null | undefined> = [];
    if (storageMode === STORAGE_MODE_LOCAL) trees.push(localTree || []);
    else if (storageMode === STORAGE_MODE_WEBDAV) trees.push(webdavTree || []);
    else trees.push(s3Tree || []);
    if (sessionWorkspace) {
      trees.push(buildSessionTree(sessionWorkspace));
    }
    return trees;
  }, [storageMode, s3Tree, localTree, webdavTree, sessionWorkspace]);

  useEffect(() => {
    if (!isActive) return undefined;
    const q = debouncedQuery;
    const gen = ++searchGenRef.current;
    if (!q) {
      setHits([]);
      setSearching(false);
      setTerms([]);
      return undefined;
    }

    setSearching(true);
    void (async () => {
      const tokenized = await tokenizeForIndexAsync(q, []);
      const nextTerms =
        tokenized.length > 0
          ? tokenized.map((t) => t.toLowerCase())
          : q
              .toLowerCase()
              .split(/\s+/)
              .map((t) => t.trim())
              .filter((t) => t.length >= 2);
      if (gen !== searchGenRef.current) return;
      setTerms(nextTerms);

      const results = await advancedSearchEngine.searchContentPage(q, getTrees(), 60);
      if (gen !== searchGenRef.current) return;
      setHits(results);
      setSearching(false);
    })();

    return undefined;
  }, [debouncedQuery, getTrees, isActive]);

  const emptyMessage = useMemo(() => {
    if (!debouncedQuery) return '검색어를 입력하면 볼트 본문에서 일치 구간을 찾습니다.';
    if (searching) return '검색 중…';
    return '일치하는 본문이 없습니다.';
  }, [debouncedQuery, searching]);

  const openHit = useCallback(
    (hit: ContentSearchFileHit) => {
      if (hit.kind === 'chat' && hit.messageId) {
        navigate(`/chat#msg-${hit.messageId}`);
        return;
      }
      if (hit.path) void onOpenFile(hit.path);
    },
    [navigate, onOpenFile],
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-odp-borderSoft">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <h1 className="shrink-0 text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            본문 검색
          </h1>
          <span className="text-xs text-gray-500 dark:text-odp-muted">{statusHint(status)}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
          <Search size={16} className="shrink-0 text-gray-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="본문 검색…"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-odp-fg"
            aria-label="본문 검색"
          />
          {query ? (
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => {
                setQuery('');
                navigate(contentSearchPathname(''), { replace: true });
              }}
              className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
            >
              <X size={14} aria-hidden />
            </button>
          ) : null}
          {searching ? <Loader2 size={16} className="shrink-0 animate-spin text-gray-400" /> : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {hits.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-odp-muted">{emptyMessage}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {hits.map((hit) => (
              <ContentSearchResultCard
                key={hit.docId}
                title={hit.title}
                path={hit.path}
                kind={hit.kind}
                matchCount={hit.matchCount}
                regions={hit.regions}
                query={debouncedQuery}
                terms={terms}
                onOpen={() => openHit(hit)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
