import { useEffect } from 'react';

type UseSidebarToggleShortcutOptions = {
  enabled?: boolean;
  onToggle: () => void;
};

/**
 * Ctrl/Cmd+Shift+B toggles the file-tree sidebar
 * (collapse on desktop, open overlay on mobile).
 */
export function useSidebarToggleShortcut({
  enabled = true,
  onToggle,
}: UseSidebarToggleShortcutOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if (!(event.ctrlKey || event.metaKey) || event.altKey || !event.shiftKey) return;
      if (event.key !== 'b' && event.key !== 'B') return;

      event.preventDefault();
      event.stopPropagation();
      onToggle();
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [enabled, onToggle]);
}
