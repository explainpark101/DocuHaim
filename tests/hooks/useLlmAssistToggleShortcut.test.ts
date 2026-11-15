import { describe, expect, it } from 'vitest';
import { isLlmAssistToggleShortcutEvent } from '@/hooks/useLlmAssistToggleShortcut';

describe('isLlmAssistToggleShortcutEvent', () => {
  it('matches Ctrl/Cmd+L without Shift/Alt', () => {
    expect(
      isLlmAssistToggleShortcutEvent({
        key: 'l',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        defaultPrevented: false,
        isComposing: false,
      }),
    ).toBe(true);
    expect(
      isLlmAssistToggleShortcutEvent({
        key: 'L',
        ctrlKey: false,
        metaKey: true,
        altKey: false,
        shiftKey: false,
        defaultPrevented: false,
        isComposing: false,
      }),
    ).toBe(true);
  });

  it('rejects Shift/Alt, composing, and already-handled events', () => {
    expect(
      isLlmAssistToggleShortcutEvent({
        key: 'l',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: true,
        defaultPrevented: false,
        isComposing: false,
      }),
    ).toBe(false);
    expect(
      isLlmAssistToggleShortcutEvent({
        key: 'l',
        ctrlKey: true,
        metaKey: false,
        altKey: true,
        shiftKey: false,
        defaultPrevented: false,
        isComposing: false,
      }),
    ).toBe(false);
    expect(
      isLlmAssistToggleShortcutEvent({
        key: 'l',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        defaultPrevented: true,
        isComposing: false,
      }),
    ).toBe(false);
    expect(
      isLlmAssistToggleShortcutEvent({
        key: 'l',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        defaultPrevented: false,
        isComposing: true,
      }),
    ).toBe(false);
  });
});
