import { afterEach, describe, expect, it } from 'vitest';
import {
  EDITOR_TYPE_HAIM,
  EDITOR_TYPE_MD_EDITOR_RT,
  saveEditorType,
} from '@/utils/editorTypeSettings';
import { resolvePreviewEngine } from '@/utils/previewEngine';

describe('resolvePreviewEngine', () => {
  afterEach(() => {
    saveEditorType(EDITOR_TYPE_MD_EDITOR_RT);
  });

  it('honors explicit legacy and haim hints', () => {
    expect(resolvePreviewEngine('legacy', EDITOR_TYPE_HAIM)).toBe('legacy');
    expect(resolvePreviewEngine('haim', EDITOR_TYPE_MD_EDITOR_RT)).toBe('haim');
  });

  it('auto follows editor type', () => {
    expect(resolvePreviewEngine('auto', EDITOR_TYPE_MD_EDITOR_RT)).toBe('legacy');
    expect(resolvePreviewEngine('auto', EDITOR_TYPE_HAIM)).toBe('haim');
  });

  it('defaults hint to auto when omitted', () => {
    expect(resolvePreviewEngine(undefined, EDITOR_TYPE_HAIM)).toBe('haim');
    expect(resolvePreviewEngine(undefined, EDITOR_TYPE_MD_EDITOR_RT)).toBe('legacy');
  });
});
