import { useCallback, useEffect, useState } from 'react';
import {
  loadMirrorEditEnabled,
  setMirrorEditEnabled,
  subscribeMirrorEdit,
} from '@/utils/mirrorEditSettings';

/** Persisted per-device: preview double-click Mirror Edit on/off. */
export function useMirrorEdit(): [
  boolean,
  (next: boolean | ((prev: boolean) => boolean)) => void,
] {
  const [enabled, setEnabledState] = useState(loadMirrorEditEnabled);

  useEffect(() => {
    return subscribeMirrorEdit((next) => {
      setEnabledState(next);
    });
  }, []);

  const setEnabled = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setEnabledState((prev) => {
      const value = typeof next === 'function' ? next(prev) : Boolean(next);
      setMirrorEditEnabled(value);
      return value;
    });
  }, []);

  return [enabled, setEnabled];
}
