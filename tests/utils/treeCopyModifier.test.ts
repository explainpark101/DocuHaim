import { describe, expect, it } from 'vitest';
import { isTreeCopyModifierHeld } from '@/utils/treeCopy';

describe('isTreeCopyModifierHeld', () => {
  it('returns false without an event or modifiers', () => {
    expect(isTreeCopyModifierHeld()).toBe(false);
    expect(isTreeCopyModifierHeld(null)).toBe(false);
    expect(isTreeCopyModifierHeld({})).toBe(false);
  });

  it('treats Ctrl, Cmd (meta), and Alt as copy modifiers', () => {
    expect(isTreeCopyModifierHeld({ ctrlKey: true })).toBe(true);
    expect(isTreeCopyModifierHeld({ metaKey: true })).toBe(true);
    expect(isTreeCopyModifierHeld({ altKey: true })).toBe(true);
  });
});
