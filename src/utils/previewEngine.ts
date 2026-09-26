/**
 * Resolve which markdown preview engine MarkdownPreviewSurface should mount.
 */

import {
  EDITOR_TYPE_HAIM,
  loadEditorType,
  type EditorTypeId,
} from '@/utils/editorTypeSettings';

export type PreviewEngineHint = 'legacy' | 'haim' | 'auto';
export type PreviewEngineId = 'legacy' | 'haim';

export function resolvePreviewEngine(
  hint: PreviewEngineHint = 'auto',
  editorType: EditorTypeId = loadEditorType(),
): PreviewEngineId {
  if (hint === 'legacy') return 'legacy';
  if (hint === 'haim') return 'haim';
  return editorType === EDITOR_TYPE_HAIM ? 'haim' : 'legacy';
}
