import { useEffect } from 'react';
import { isPwaStandalone } from '@/utils/pwaStandalone';

type UsePwaNewFileShortcutOptions = {
  enabled?: boolean;
  onNewFile: () => void;
};

/**
 * PWA-only: Ctrl/Cmd+N opens the create-file flow (parent = focused file dir)
 * instead of a new browser window.
 */
export function usePwaNewFileShortcut({
  enabled = true,
  onNewFile,
}: UsePwaNewFileShortcutOptions): void {
  useEffect(() => {
    if (!enabled || !isPwaStandalone()) return;
    if (import.meta.env.VITE_ELECTRON === 'true') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return;
      if (event.key !== 'n' && event.key !== 'N') return;

      event.preventDefault();
      event.stopPropagation();
      onNewFile();
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [enabled, onNewFile]);
}
