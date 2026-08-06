import { useEffect, useRef } from 'react';
import {
  useActivityIndicator,
  ActivityTypes,
} from '@/contexts/ActivityIndicatorContext';
import { advancedSearchEngine } from '@/utils/advancedSearch';

const INDICATOR_ID = 'advanced-search-index';
const DONE_HIDE_MS = 2500;
const ERROR_HIDE_MS = 5000;

/**
 * Mirror Advanced Search index build status onto the bottom activity bar.
 */
export function useAdvancedSearchActivityStatus() {
  const { addIndicator, removeIndicator, updateIndicator } =
    useActivityIndicator();
  const wasBuildingRef = useRef(false);
  const shownErrorRef = useRef(/** @type {string | null} */ (null));
  const hideTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    /** @param {number} ms */
    const scheduleHide = (ms) => {
      clearHideTimer();
      hideTimerRef.current = setTimeout(() => {
        removeIndicator(INDICATOR_ID);
        hideTimerRef.current = null;
      }, ms);
    };

    const sync = () => {
      const status = advancedSearchEngine.getStatus();
      const building = status.building;
      const wasBuilding = wasBuildingRef.current;

      if (building) {
        clearHideTimer();
        shownErrorRef.current = null;
        const pct =
          typeof status.buildProgress === 'number'
            ? Math.round(Math.min(100, Math.max(0, status.buildProgress * 100)))
            : null;
        addIndicator({
          id: INDICATOR_ID,
          type: ActivityTypes.ADVANCED_SEARCH_INDEX,
          label: '검색 색인',
          detail: pct != null ? `${pct}%` : '준비 중',
          progress: pct ?? 0,
          status: 'processing',
        });
        updateIndicator(INDICATOR_ID, {
          label: '검색 색인',
          detail: pct != null ? `${pct}%` : '준비 중',
          progress: pct ?? 0,
          status: 'processing',
        });
        wasBuildingRef.current = true;
        return;
      }

      if (wasBuilding) {
        wasBuildingRef.current = false;
        if (status.lastBuildCancelled) {
          shownErrorRef.current = null;
          updateIndicator(INDICATOR_ID, {
            label: '검색 색인 중지',
            detail: '이어서 재개 가능',
            status: 'done',
          });
          scheduleHide(DONE_HIDE_MS);
        } else if (status.lastError) {
          shownErrorRef.current = status.lastError;
          updateIndicator(INDICATOR_ID, {
            label: '검색 색인 실패',
            detail: status.lastError,
            status: 'error',
          });
          scheduleHide(ERROR_HIDE_MS);
        } else {
          shownErrorRef.current = null;
          updateIndicator(INDICATOR_ID, {
            label: '검색 색인',
            detail: '완료',
            progress: 100,
            status: 'done',
          });
          scheduleHide(DONE_HIDE_MS);
        }
        return;
      }

      if (status.lastError && status.lastError !== shownErrorRef.current) {
        shownErrorRef.current = status.lastError;
        addIndicator({
          id: INDICATOR_ID,
          type: ActivityTypes.ADVANCED_SEARCH_INDEX,
          label: '검색 색인 오류',
          detail: status.lastError,
          status: 'error',
        });
        updateIndicator(INDICATOR_ID, {
          label: '검색 색인 오류',
          detail: status.lastError,
          status: 'error',
        });
        scheduleHide(ERROR_HIDE_MS);
      }
    };

    sync();
    const unsub = advancedSearchEngine.subscribe(sync);
    return () => {
      unsub();
      clearHideTimer();
    };
  }, [addIndicator, removeIndicator, updateIndicator]);

  useEffect(() => {
    return () => {
      removeIndicator(INDICATOR_ID);
    };
  }, [removeIndicator]);
}
