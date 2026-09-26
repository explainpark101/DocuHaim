/**
 * Preview translation layer. Switches between md-editor-rt MdPreview and
 * TipTap HaimMarkdownPreview based on engineHint / editor type settings.
 */

import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
} from 'react';
import {
  EDITOR_TYPE_CHANGED_EVENT,
  loadEditorType,
} from '@/utils/editorTypeSettings';
import {
  resolvePreviewEngine,
  type PreviewEngineHint,
  type PreviewEngineId,
} from '@/utils/previewEngine';

const LegacyMdPreview = lazy(async () => {
  const { ensureMdEditorConfig } = await import('@/config/mdEditorConfig');
  await ensureMdEditorConfig();
  const mod = await import('md-editor-rt');
  return { default: mod.MdPreview as ComponentType<Record<string, unknown>> };
});

const HaimMarkdownPreview = lazy(
  () => import('@/components/editor/surface/HaimMarkdownPreview'),
);

export type MarkdownPreviewSurfaceProps = Record<string, unknown> & {
  /** `auto` follows loadEditorType(); freeze panes should force `legacy`. */
  engineHint?: PreviewEngineHint;
};

function PreviewFallback() {
  return (
    <div className="min-h-8 text-sm text-gray-400 dark:text-odp-muted">
      미리보기 로딩…
    </div>
  );
}

export default function MarkdownPreviewSurface({
  engineHint = 'auto',
  ...props
}: MarkdownPreviewSurfaceProps) {
  const [engine, setEngine] = useState<PreviewEngineId>(() =>
    resolvePreviewEngine(engineHint, loadEditorType()),
  );

  useEffect(() => {
    const sync = () => {
      setEngine(resolvePreviewEngine(engineHint, loadEditorType()));
    };
    sync();
    if (engineHint !== 'auto') return undefined;
    window.addEventListener(EDITOR_TYPE_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EDITOR_TYPE_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [engineHint]);

  const Preview = engine === 'haim' ? HaimMarkdownPreview : LegacyMdPreview;

  return (
    <Suspense fallback={<PreviewFallback />}>
      <Preview {...props} />
    </Suspense>
  );
}
