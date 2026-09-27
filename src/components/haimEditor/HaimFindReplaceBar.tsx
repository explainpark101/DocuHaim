import { useEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { ChevronDown, ChevronUp, Replace, X } from 'lucide-react';

type Props = {
  editor: Editor;
  onClose: () => void;
};

/**
 * Lazy find/replace bar using @tiptap/extension-find-and-replace commands.
 */
export default function HaimFindReplaceBar({ editor, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    editor.commands.setSearchTerm(query);
    const storage = (
      editor.storage as {
        findAndReplace?: { results?: unknown[]; resultIndex?: number };
      }
    ).findAndReplace;
    setResultCount(storage?.results?.length ?? 0);
  }, [editor, query, caseSensitive]);

  useEffect(() => {
    editor.commands.setCaseSensitive(caseSensitive);
  }, [editor, caseSensitive]);

  useEffect(() => {
    editor.commands.setReplaceTerm(replace);
  }, [editor, replace]);

  useEffect(() => {
    return () => {
      editor.commands.clearSearch();
    };
  }, [editor]);

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="찾기"
        aria-label="찾기"
        className="h-7 min-w-[8rem] flex-1 rounded border border-gray-300 bg-white px-2 text-xs dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
        autoFocus
      />
      <input
        type="text"
        value={replace}
        onChange={(e) => setReplace(e.target.value)}
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
        {resultCount}건
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
