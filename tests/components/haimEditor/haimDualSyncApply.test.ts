import { describe, expect, it } from 'vitest';
import {
  HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  clampCmOffset,
  clampPmSelection,
  canDriveVaultSync,
  isLocalInputDebounceActive,
  resolveHaimDualSyncAuthor,
  shouldRewriteFollowerPane,
} from '@/components/haimEditor/haimDualSyncApply';
import {
  isVaultValueEcho,
  shouldApplyExternalVaultMarkdown,
  shouldEmitVaultMarkdown,
} from '@/components/haimEditor/haimExternalValueSync';
import {
  applyTextChanges,
  lineDiffChanges,
  mapSelectionThroughChanges,
  prefixSuffixChange,
  shouldUseWasmLineDiff,
} from '@/components/haimEditor/haimTextDiff';
import {
  changedBlockIndexes,
  shouldAbortScheduledApply,
  shouldRewriteCmFromParentValue,
  shouldUseFullTipTapReplace,
  splitTopLevelMarkdownBlocks,
} from '@/components/haimEditor/haimTipTapBlockPatch';
import { runDualIdleFlush } from '@/components/haimEditor/haimDualIdleFlush';

describe('HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS', () => {
  it('defaults to 150ms while local input is ongoing', () => {
    expect(HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS).toBe(150);
  });
});

describe('resolveHaimDualSyncAuthor', () => {
  it('prefers the focused TipTap pane', () => {
    expect(
      resolveHaimDualSyncAuthor({
        tipTapFocused: true,
        cmFocused: false,
        lastAuthor: 'cm',
      }),
    ).toBe('tiptap');
  });

  it('prefers the focused source (CM) pane', () => {
    expect(
      resolveHaimDualSyncAuthor({
        tipTapFocused: false,
        cmFocused: true,
        lastAuthor: 'tiptap',
      }),
    ).toBe('cm');
  });

  it('keeps lastAuthor when neither pane is focused', () => {
    expect(
      resolveHaimDualSyncAuthor({
        tipTapFocused: false,
        cmFocused: false,
        lastAuthor: 'cm',
      }),
    ).toBe('cm');
  });

  it('keeps lastAuthor when both report focus (rare race)', () => {
    expect(
      resolveHaimDualSyncAuthor({
        tipTapFocused: true,
        cmFocused: true,
        lastAuthor: 'tiptap',
      }),
    ).toBe('tiptap');
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

  it('is active inside the default 150ms window after a keystroke', () => {
    const t0 = 10_000;
    expect(isLocalInputDebounceActive(t0 + 149, t0)).toBe(true);
    expect(isLocalInputDebounceActive(t0 + 150, t0)).toBe(false);
  });

  it('is never active when debounceMs is 0 (immediate sync)', () => {
    const t0 = 10_000;
    expect(isLocalInputDebounceActive(t0, t0, 0)).toBe(false);
    expect(isLocalInputDebounceActive(t0 + 1, t0, 0)).toBe(false);
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

describe('canDriveVaultSync', () => {
  it('allows sync only when the pane is focused and the loaded body is applied', () => {
    expect(canDriveVaultSync({ paneFocused: true, vaultReady: true })).toBe(true);
    expect(canDriveVaultSync({ paneFocused: false, vaultReady: true })).toBe(false);
    expect(canDriveVaultSync({ paneFocused: true, vaultReady: false })).toBe(false);
  });
});

describe('shouldEmitVaultMarkdown', () => {
  it('drops an empty emission that would wipe a loaded note before the user edits', () => {
    expect(
      shouldEmitVaultMarkdown({
        markdown: '',
        parentMarkdown: '# note',
        userEdited: false,
      }),
    ).toBe(false);
  });

  it('keeps a real clear after the user has edited', () => {
    expect(
      shouldEmitVaultMarkdown({
        markdown: '',
        parentMarkdown: '# note',
        userEdited: true,
      }),
    ).toBe(true);
  });

  it('applies a fetched body onto an editor that is still empty', () => {
    expect(
      shouldApplyExternalVaultMarkdown({
        externalValue: '# note',
        liveMarkdown: '',
        lastEmittedMd: null,
        fileChanged: false,
        userEdited: false,
        localInputActive: true,
      }),
    ).toBe(true);
  });

  it('does not treat the fetched body as an echo before it is on screen', () => {
    expect(
      isVaultValueEcho('# note', null),
    ).toBe(false);
    expect(
      shouldApplyExternalVaultMarkdown({
        externalValue: '# note',
        liveMarkdown: '',
        lastEmittedMd: '# note',
        fileChanged: false,
        userEdited: false,
        localInputActive: false,
      }),
    ).toBe(true);
  });

  it('skips a keystroke echo after the user has edited', () => {
    expect(
      shouldApplyExternalVaultMarkdown({
        externalValue: '# note',
        liveMarkdown: '# note!',
        lastEmittedMd: '# note',
        fileChanged: false,
        userEdited: true,
        localInputActive: false,
      }),
    ).toBe(false);
  });

  it('does not emit when markdown already matches the parent', () => {
    expect(
      shouldEmitVaultMarkdown({
        markdown: '# note',
        parentMarkdown: '# note',
        userEdited: false,
      }),
    ).toBe(false);
  });
});

describe('source follower apply', () => {
  it('aborts when the CM document moved after the sync was scheduled', () => {
    expect(
      shouldAbortScheduledApply({
        scheduledDocLength: 10,
        currentDocLength: 11,
        scheduledInputAt: 1,
        currentInputAt: 1,
      }),
    ).toBe(true);
    expect(
      shouldAbortScheduledApply({
        scheduledDocLength: 10,
        currentDocLength: 10,
        scheduledInputAt: 1,
        currentInputAt: 2,
      }),
    ).toBe(true);
    expect(
      shouldAbortScheduledApply({
        scheduledDocLength: 10,
        currentDocLength: 10,
        scheduledInputAt: 5,
        currentInputAt: 5,
      }),
    ).toBe(false);
  });

  it('full setContent only on blur or an explicit full replace', () => {
    expect(
      shouldUseFullTipTapReplace({ sourceFocused: true, forceFull: false }),
    ).toBe(false);
    expect(
      shouldUseFullTipTapReplace({ sourceFocused: true, forceFull: true }),
    ).toBe(true);
    expect(
      shouldUseFullTipTapReplace({ sourceFocused: false, forceFull: false }),
    ).toBe(true);
  });

  it('patches only changed top-level blocks while the count stays the same', () => {
    const before = splitTopLevelMarkdownBlocks('one\n\ntwo\n\nthree');
    const after = splitTopLevelMarkdownBlocks('one\n\nTWO\n\nthree');
    expect(changedBlockIndexes(before, after)).toEqual([1]);
    expect(
      changedBlockIndexes(before, splitTopLevelMarkdownBlocks('one\n\ntwo')),
    ).toBeNull();
  });

  it('does not rewrite CM from parent value while source is the author', () => {
    expect(
      shouldRewriteCmFromParentValue({
        fileChanged: false,
        authorIsSource: true,
        sourceFocused: true,
      }),
    ).toBe(false);
    expect(
      shouldRewriteCmFromParentValue({
        fileChanged: true,
        authorIsSource: true,
        sourceFocused: true,
      }),
    ).toBe(true);
  });
});

describe('CM prefix/suffix selection', () => {
  it('keeps the same document string', () => {
    const before = 'hello world';
    const after = 'hello there world';
    const span = prefixSuffixChange(before, after);
    expect(span).not.toBeNull();
    expect(applyTextChanges(before, span ? [span] : [])).toBe(after);
  });

  it('keeps cursor N on a covering replace and does not expand a range to the whole doc', () => {
    const before = 'x'.repeat(80);
    const after = 'y'.repeat(80);
    const changes = [{ from: 0, to: before.length, insert: after }];
    expect(mapSelectionThroughChanges(40, 40, changes, after.length)).toEqual({
      anchor: 40,
      head: 40,
    });
    const range = mapSelectionThroughChanges(10, 30, changes, after.length);
    expect(range).toEqual({ anchor: 10, head: 30 });
    expect(range).not.toEqual({ anchor: 0, head: after.length });
  });

  it('uses WASM only for a large dirty span and JS hunks round-trip', () => {
    const small = 'a\nb\n';
    expect(shouldUseWasmLineDiff(small, 'a\nB\n', 2)).toBe(false);
    const before = 'a'.repeat(40_000);
    const after = `${'b'.repeat(20_000)}${'a'.repeat(20_000)}`;
    expect(before.length).toBeGreaterThanOrEqual(32 * 1024);
    expect(after.length).toBeGreaterThanOrEqual(32 * 1024);
    const span = prefixSuffixChange(before, after);
    expect(span).not.toBeNull();
    expect(
      shouldUseWasmLineDiff(before, after, span ? Math.max(span.to - span.from, span.insert.length) : 0),
    ).toBe(true);
    const hunks = lineDiffChanges('alpha\nbeta\ngamma', 'alpha\nBETA\ngamma');
    expect(applyTextChanges('alpha\nbeta\ngamma', hunks)).toBe('alpha\nBETA\ngamma');
  });
});

describe('dual idle flush', () => {
  it('reads vault markdown once', () => {
    let reads = 0;
    const markdown = runDualIdleFlush({
      readVaultMarkdown: () => {
        reads += 1;
        return 'once';
      },
      applyFollower: () => {},
      updateSourceLines: () => {},
    });
    expect(reads).toBe(1);
    expect(markdown).toBe('once');
  });
});
