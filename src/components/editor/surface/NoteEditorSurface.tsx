/**
 * Translation layer: picks legacy md-editor-rt vs Haim TipTap by settings.
 * Only the selected engine chunk is dynamically imported.
 */

import { lazy, Suspense, useState, useEffect, type ComponentType } from 'react';
import { Loader2 } from 'lucide-react';
import type { NoteEditorProps } from '@/editor/contracts/noteEditorTypes';
import {
  EDITOR_TYPE_CHANGED_EVENT,
  EDITOR_TYPE_HAIM,
  loadEditorType,
  type EditorTypeId,
} from '@/utils/editorTypeSettings';

const LegacyMarkdownEditor = lazy(
  () => import('@/components/editor/MarkdownEditor.jsx'),
) as unknown as ComponentType<NoteEditorProps>;

const HaimEditor = lazy(
  () => import('@/components/haimEditor/HaimEditor'),
) as unknown as ComponentType<NoteEditorProps>;

function SurfaceFallback() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-white dark:bg-odp-surface">
      <Loader2 size={18} className="animate-spin text-gray-400 dark:text-gray-500" aria-hidden />
      <div className="text-sm text-gray-500 dark:text-odp-muted">에디터 로딩 중…</div>
    </div>
  );
}

type Props = NoteEditorProps & {
  /** Override settings (tests / story); defaults to loadEditorType(). */
  engine?: EditorTypeId;
};

export default function NoteEditorSurface({ engine, ...props }: Props) {
  const [editorType, setEditorType] = useState<EditorTypeId>(
    () => engine ?? loadEditorType(),
  );

  useEffect(() => {
    if (engine) {
      setEditorType(engine);
      return undefined;
    }
    const sync = () => setEditorType(loadEditorType());
    sync();
    window.addEventListener(EDITOR_TYPE_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EDITOR_TYPE_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [engine]);

  const useHaim = editorType === EDITOR_TYPE_HAIM;
  const Editor = useHaim ? HaimEditor : LegacyMarkdownEditor;

  return (
    <Suspense fallback={<SurfaceFallback />}>
      <Editor {...props} />
    </Suspense>
  );
}
