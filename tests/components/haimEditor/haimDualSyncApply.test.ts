import { describe, expect, it } from 'vitest';
import {
  HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  clampCmOffset,
  clampPmSelection,
  isLocalInputDebounceActive,
  shouldRewriteFollowerPane,
} from '@/components/haimEditor/haimDualSyncApply';
import { isVaultValueEcho } from '@/components/haimEditor/haimExternalValueSync';

describe('HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS', () => {
  it('uses 300ms while local input is ongoing', () => {
    expect(HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS).toBe(300);
  });
});

describe('shouldRewriteFollowerPane', () => {
  it('rewrites the unfocused follower', () => {
    expect(shouldRewriteFollowerPane(false)).toBe(true);
  });

  it('does not rewrite the focused follower (protects caret while typing)', () => {
    expect(shouldRewriteFollowerPane(true)).toBe(false);
  });
});

describe('isLocalInputDebounceActive', () => {
  it('is inactive before any local input', () => {
    expect(isLocalInputDebounceActive(1000, 0)).toBe(false);
  });

  it('is active inside the 300ms window after a keystroke', () => {
    const t0 = 10_000;
    expect(isLocalInputDebounceActive(t0 + 299, t0)).toBe(true);
    expect(isLocalInputDebounceActive(t0 + 300, t0)).toBe(false);
  });

  it('blocks parent value apply while typing ahead of last emit (list race)', () => {
    const lastEmit = '- a\n';
    const parentEcho = '- a\n';
    const lastLocalInputAt = 1000;
    const now = 1000 + 100;
    // Echo alone would skip; local-input window is an extra guard when value diverges.
    expect(isVaultValueEcho(parentEcho, lastEmit)).toBe(true);
    expect(isLocalInputDebounceActive(now, lastLocalInputAt)).toBe(true);
  });
});

describe('clampPmSelection', () => {
  it('keeps a mid-doc caret inside bounds (does not snap to end)', () => {
    expect(clampPmSelection(12, 12, 40)).toEqual({ from: 12, to: 12 });
  });

  it('clamps an out-of-range caret instead of jumping past doc end', () => {
    expect(clampPmSelection(999, 999, 20)).toEqual({ from: 20, to: 20 });
  });

  it('clamps inverted ranges', () => {
    expect(clampPmSelection(30, 10, 25)).toEqual({ from: 10, to: 25 });
  });

  it('uses at least position 1 for empty-ish docs', () => {
    expect(clampPmSelection(0, 0, 2)).toEqual({ from: 1, to: 1 });
  });
});

describe('clampCmOffset', () => {
  it('preserves an in-range source caret', () => {
    expect(clampCmOffset(8, 20)).toBe(8);
  });

  it('does not place caret past doc length (bottom jump)', () => {
    expect(clampCmOffset(100, 20)).toBe(20);
  });

  it('does not place caret before 0', () => {
    expect(clampCmOffset(-3, 20)).toBe(0);
  });
});
