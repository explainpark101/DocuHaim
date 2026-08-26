import { isDesktopApp } from '@/utils/shared/isDesktopApp';
import { useEffect } from 'react';
import { isPwaStandalone } from '@/utils/pwaStandalone';

type UsePwaNewFileShortcutOptions = {
  enabled?: boolean;
  onNewFile: () => void;
};

/**
 * PWA / Tauri: Ctrl/Cmd+N opens the create-file flow (parent = focused file dir)
 * instead of a new browser window. Regular browser tabs are excluded.
 */
export function usePwaNewFileShortcut({
  enabled = true,
  onNewFile,
}: UsePwaNewFileShortcutOptions): void {
  useEffect(() => {
    if (!enabled) return;
    // Browser tabs: keep native Cmd+N (new window).
    if (!isPwaStandalone() && !isDesktopApp()) return;

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
