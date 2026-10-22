import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Editor } from '@tiptap/react';
import { ChevronDown, ChevronUp, Replace, X } from 'lucide-react';
import {
  dispatchHaimFindMeta,
  readHaimFindSummary,
} from '@/components/haimEditor/haimFindReplace';

type QueryState = {
  query: string;
  replace: string;
  caseSensitive: boolean;
};

type Props = {
  editor: Editor;
  onClose: () => void;
  /** Mirror the query onto another surface (source pane). */
  onQueryState?: ((state: QueryState) => void) | undefined;
};

/**
 * Find/replace for the WYSIWYG pane.
 * Search meta is dispatched immediately; the result label follows editor transactions.
 */
export default function HaimFindReplaceBar({ editor, onClose, onQueryState }: Props) {
  const [query, setQuery] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const onQueryStateRef = useRef(onQueryState);
  onQueryStateRef.current = onQueryState;

  useEffect(() => {
    const sync = () => {
      const summary = readHaimFindSummary(editor);
      setResultCount(summary.count);
      setCurrentIndex(summary.current);
    };
    sync();
    editor.on('transaction', sync);
    return () => {
      editor.off('transaction', sync);
    };
  }, [editor]);

  useEffect(() => {
    dispatchHaimFindMeta(editor, {
      searchTerm: query,
      replaceTerm: replace,
      caseSensitive,
    });
    onQueryStateRef.current?.({ query, replace, caseSensitive });
  }, [editor, query, replace, caseSensitive]);

  useEffect(() => {
    return () => {
      dispatchHaimFindMeta(editor, { searchTerm: '' });
    };
  }, [editor]);

  const label =
    resultCount > 0
      ? `${(currentIndex ?? 0) + 1}/${resultCount}`
      : '0건';

  const onFindKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (event.shiftKey) editor.commands.goToPreviousResult();
    else editor.commands.goToNextResult();
  };

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onFindKeyDown}
        placeholder="찾기"
        aria-label="찾기"
        className="h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
        autoFocus
      />
      <input
        type="text"
        value={replace}
        onChange={(e) => setReplace(e.target.value)}
        onKeyDown={onFindKeyDown}
        placeholder="바꾸기"
        aria-label="바꾸기"
        className="h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
      />
      <label className="inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted">
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
        />
        대소문자
      </label>
      <span className="text-[11px] tabular-nums text-gray-500 dark:text-odp-muted">
        {label}
      </span>
      <button
        type="button"
        aria-label="이전"
        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
        onClick={() => editor.commands.goToPreviousResult()}
      >
        <ChevronUp size={14} />
      </button>
      <button
        type="button"
        aria-label="다음"
        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
        onClick={() => editor.commands.goToNextResult()}
      >
        <ChevronDown size={14} />
      </button>
      <button
        type="button"
        aria-label="바꾸기"
        className="inline-flex h-7 items-center gap-1 rounded px-2 text-xs hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
        onClick={() => editor.commands.replace()}
      >
        <Replace size={12} />
        바꾸기
      </button>
      <button
        type="button"
        aria-label="모두 바꾸기"
        className="inline-flex h-7 items-center rounded px-2 text-xs hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
        onClick={() => editor.commands.replaceAll()}
      >
        모두
      </button>
      <button
        type="button"
        aria-label="닫기"
        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
        onClick={onClose}
      >
        <X size={14} />
      </button>
    </div>
  );
}
