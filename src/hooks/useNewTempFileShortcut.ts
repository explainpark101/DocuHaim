import { useEffect } from 'react';

type UseNewTempFileShortcutOptions = {
  enabled?: boolean;
  onNewTempFile: () => void;
};

/**
 * Ctrl/Cmd+Shift+N opens an in-memory untitled session file.
 * Works in all shells (no native browser shortcut conflict).
 */
export function useNewTempFileShortcut({
  enabled = true,
  onNewTempFile,
}: UseNewTempFileShortcutOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if (!(event.ctrlKey || event.metaKey) || event.altKey || !event.shiftKey) return;
      if (event.key !== 'n' && event.key !== 'N') return;

      event.preventDefault();
      event.stopPropagation();
      onNewTempFile();
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [enabled, onNewTempFile]);
}
