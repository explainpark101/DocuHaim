import { describe, expect, it } from 'vitest';
import {
  EDITOR_IMAGE_ALIGN_DEFAULT,
  EDITOR_IMAGE_ALIGN_OPTIONS,
  isEditorImageAlign,
} from '@/utils/editorImageAlignSettings';

describe('editorImageAlignSettings', () => {
  it('defaults to center', () => {
    expect(EDITOR_IMAGE_ALIGN_DEFAULT).toBe('center');
  });

  it('exposes left/center/right options', () => {
    expect(EDITOR_IMAGE_ALIGN_OPTIONS.map((o) => o.value)).toEqual([
      'left',
      'center',
      'right',
    ]);
  });

  it('accepts left/center/right only', () => {
    expect(isEditorImageAlign('left')).toBe(true);
    expect(isEditorImageAlign('center')).toBe(true);
    expect(isEditorImageAlign('right')).toBe(true);
    expect(isEditorImageAlign('middle')).toBe(false);
  });
});
