import { useCallback, useEffect, useState } from 'react';
import {
  loadEditorAutocompleteEnabled,
  setEditorAutocompleteEnabled,
  subscribeEditorAutocomplete,
} from '@/utils/editorAutocompleteSettings';

/** Persisted per-device: md-editor-rt autocomplete suggestions on/off. */
export function useEditorAutocomplete(): [
  boolean,
  (next: boolean | ((prev: boolean) => boolean)) => void,
] {
  const [enabled, setEnabledState] = useState(loadEditorAutocompleteEnabled);

  useEffect(() => {
    return subscribeEditorAutocomplete((next) => {
      setEnabledState(next);
    });
  }, []);

  const setEnabled = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setEnabledState((prev) => {
      const value = typeof next === 'function' ? next(prev) : Boolean(next);
      setEditorAutocompleteEnabled(value);
      return value;
    });
  }, []);

  return [enabled, setEnabled];
}
