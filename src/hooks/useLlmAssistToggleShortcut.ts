import { useEffect } from 'react';

type UseLlmAssistToggleShortcutOptions = {
  enabled?: boolean;
  onToggle: () => void;
};

type KeyLike = Pick<
  KeyboardEvent,
  'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'defaultPrevented' | 'isComposing'
>;

/** True when the event is the default LLM Assist toggle chord (Mod+L). */
export function isLlmAssistToggleShortcutEvent(event: KeyLike): boolean {
  if (event.defaultPrevented || event.isComposing) return false;
  if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) return false;
  return event.key === 'l' || event.key === 'L';
}

/**
 * Ctrl/Cmd+L toggles the LLM Assist panel (Cursor-style default).
 * Capture-phase so editor keymaps and browser address-bar focus do not win first.
 */
export function useLlmAssistToggleShortcut({
  enabled = true,
  onToggle,
}: UseLlmAssistToggleShortcutOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!isLlmAssistToggleShortcutEvent(event)) return;
      event.preventDefault();
      event.stopPropagation();
      onToggle();
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [enabled, onToggle]);
}
