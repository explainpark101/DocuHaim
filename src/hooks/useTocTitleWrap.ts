import { useCallback, useState } from 'react';
import {
  loadTocTitleWrapEnabled,
  saveTocTitleWrapEnabled,
} from '@/utils/tocTitleWrapSettings';

/** Shared TOC title display mode: ellipsis vs word-break wrap. Persisted in localStorage. */
export function useTocTitleWrap() {
  const [wrapTitles, setWrapTitlesState] = useState(loadTocTitleWrapEnabled);

  const setWrapTitles = useCallback((next: any) => {
    setWrapTitlesState((prev) => {
      const value = typeof next === 'function' ? next(prev) : Boolean(next);
      saveTocTitleWrapEnabled(value);
      return value;
    });
  }, []);

  return [wrapTitles, setWrapTitles];
}

/** Button/title classes for TOC heading rows. */
export function tocTitleTextClass(wrapTitles: any) {
  return wrapTitles
    ? 'whitespace-normal break-words [overflow-wrap:anywhere]'
    : 'truncate';
}
