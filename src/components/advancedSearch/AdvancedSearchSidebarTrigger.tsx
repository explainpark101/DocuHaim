import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { requestOpenAdvancedSearch } from '@/utils/advancedSearch';

const CAST_MS = 480;

/**
 * Sidebar search glyph → Advanced Search.
 * Hover/click: icon lifts slightly with a soft violet–blue–green glow (icon only).
 */
export default function AdvancedSearchSidebarTrigger() {
  const [casting, setCasting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    setCasting(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    timerRef.current = setTimeout(() => {
      setCasting(false);
      timerRef.current = null;
    }, CAST_MS);
    openTimerRef.current = setTimeout(() => {
      requestOpenAdvancedSearch({ source: 'sidebar' });
      openTimerRef.current = null;
    }, 70);
  }, []);

  return (
    <button
      type="button"
      className={`advanced-search-trigger ${casting ? 'is-casting' : ''}`}
      onClick={handleClick}
      title="Advanced Search (⌘K / Ctrl+K)"
      aria-label="Advanced Search 열기"
    >
      <Search size={16} className="advanced-search-trigger__icon" aria-hidden />
    </button>
  );
}
