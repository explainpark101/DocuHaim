import { useEffect, useRef } from 'react';
import {
  useActivityIndicator,
  ActivityTypes,
} from '@/contexts/ActivityIndicatorContext';
import { advancedSearchEngine } from '@/utils/advancedSearch';

const INDICATOR_ID = 'advanced-search-index';
const DONE_HIDE_MS = 2500;
const ERROR_HIDE_MS = 5000;
/** Only push activity-bar updates when progress jumps by this many percent. */
const PROGRESS_STEP_PCT = 5;
const LABEL = '역색인';

/**
 * Mirror Advanced Search index build status onto the bottom activity bar.
 * Chip text is only "역색인" + percent; spinner while processing/preparing.
 */
export function useAdvancedSearchActivityStatus() {
  const { addIndicator, removeIndicator, updateIndicator } =
    useActivityIndicator();
  const wasBuildingRef = useRef(false);
  const shownErrorRef = useRef(/** @type {string | null} */ (null));
  const hideTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const lastPctRef = useRef(/** @type {number | null} */ (null));

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
        const stepped =
          pct == null
            ? null
            : Math.floor(pct / PROGRESS_STEP_PCT) * PROGRESS_STEP_PCT;
        if (
          wasBuilding &&
          stepped != null &&
          lastPctRef.current != null &&
          stepped === lastPctRef.current
        ) {
          return;
        }
        if (stepped != null) lastPctRef.current = stepped;

        // status=processing → spinner. No detail text (only label + %).
        // Omit progress until known so "준비 중" does not show a fake 0%.
        /** @type {{ label: string; detail: string; status: 'processing'; progress?: number }} */
        const payload = {
          label: LABEL,
          detail: '',
          status: 'processing',
        };
        if (pct != null) payload.progress = pct;

        addIndicator({
          id: INDICATOR_ID,
          type: ActivityTypes.ADVANCED_SEARCH_INDEX,
          ...payload,
        });
        updateIndicator(INDICATOR_ID, {
          ...payload,
          // Clear stale progress when still preparing (pct unknown).
          progress: pct != null ? pct : undefined,
        });
        wasBuildingRef.current = true;
        return;
      }

      lastPctRef.current = null;

      if (wasBuilding) {
        wasBuildingRef.current = false;
        if (status.lastBuildCancelled) {
          shownErrorRef.current = null;
          updateIndicator(INDICATOR_ID, {
            label: LABEL,
            detail: '중지됨',
            progress: undefined,
            status: 'done',
          });
          scheduleHide(DONE_HIDE_MS);
        } else if (status.lastError) {
          shownErrorRef.current = status.lastError;
          updateIndicator(INDICATOR_ID, {
            label: LABEL,
            detail: status.lastError,
            progress: undefined,
            status: 'error',
          });
          scheduleHide(ERROR_HIDE_MS);
        } else {
          shownErrorRef.current = null;
          updateIndicator(INDICATOR_ID, {
            label: LABEL,
            detail: '',
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
          label: LABEL,
          detail: status.lastError,
          status: 'error',
        });
        updateIndicator(INDICATOR_ID, {
          label: LABEL,
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
