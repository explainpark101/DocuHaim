import { useEffect, useRef, useState } from 'react';
import {
  advancedSearchEngine,
  type EngineStatus,
} from '@/utils/advancedSearch';

const STATUS_EMIT_THROTTLE_MS = 400;

/**
 * Live Advanced Search engine status for Settings / storage UI.
 * Flushes immediately when a build ends so stop/restart buttons stay in sync.
 */
export function useAdvancedSearchEngineStatus(): EngineStatus {
  const [status, setStatus] = useState<EngineStatus>(() =>
    advancedSearchEngine.getStatus(),
  );
  const wasBuildingRef = useRef(status.building);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let pending = false;

    const apply = () => {
      const next = advancedSearchEngine.getStatus();
      wasBuildingRef.current = next.building;
      setStatus(next);
    };

    return advancedSearchEngine.subscribe(() => {
      const next = advancedSearchEngine.getStatus();
      const buildEnded = wasBuildingRef.current && !next.building;
      wasBuildingRef.current = next.building;

      if (buildEnded) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        pending = false;
        apply();
        return;
      }

      if (timer) {
        pending = true;
        return;
      }
      apply();
      timer = setTimeout(() => {
        timer = null;
        if (pending) {
          pending = false;
          apply();
        }
      }, STATUS_EMIT_THROTTLE_MS);
    });
  }, []);

  return status;
}
