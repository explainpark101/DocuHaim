import { describe, expect, it } from 'vitest';
import {
  haimScrollApplyStuck,
  haimScrollReadToSnapshot,
  haimScrollRestorePlan,
} from '@/components/haimEditor/haimEditorScrollMemory';

describe('haimEditorScrollMemory', () => {
  it('stores wysiwyg in editorTop and source in previewTop when both panes are open', () => {
    expect(
      haimScrollReadToSnapshot({
        showWysiwyg: true,
        showSource: true,
        wysiwygTop: 400,
        wysiwygLeft: 0,
        sourceTop: 180,
        sourceLeft: 2,
      }),
    ).toEqual({
      editorTop: 400,
      editorLeft: 0,
      previewTop: 180,
      previewLeft: 2,
    });
  });

  it('waits until a visible pane is mounted', () => {
    expect(
      haimScrollReadToSnapshot({
        showWysiwyg: true,
        showSource: false,
        wysiwygTop: null,
        wysiwygLeft: null,
        sourceTop: 10,
        sourceLeft: 0,
      }),
    ).toBeNull();
  });

  it('restores the single visible pane from editorTop', () => {
    const snap = {
      editorTop: 320,
      editorLeft: 4,
      previewTop: 0,
      previewLeft: 0,
    };
    expect(haimScrollRestorePlan(snap, { showWysiwyg: true, showSource: false })).toEqual({
      wysiwyg: { top: 320, left: 4 },
      source: null,
    });
    expect(haimScrollRestorePlan(snap, { showWysiwyg: false, showSource: true })).toEqual({
      wysiwyg: null,
      source: { top: 320, left: 4 },
    });
  });

  it('treats a short document as not yet able to hold a deep offset', () => {
    expect(haimScrollApplyStuck(0, 500, 0)).toBe(false);
    expect(haimScrollApplyStuck(500, 500, 800)).toBe(true);
    expect(haimScrollApplyStuck(0, 0, 0)).toBe(true);
  });
});
