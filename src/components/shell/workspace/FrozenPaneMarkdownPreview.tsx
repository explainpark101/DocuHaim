import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { MdPreview, config } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import { MD_EDITOR_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import { sanitizeMdEditorIdFragment } from '@/utils/mdEditorInstanceId';
import { recallEditorScroll } from '@/utils/editorScrollMemory';
import '@/styles/md-editor-rt/preview.css';

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
});

type FrozenPaneMarkdownPreviewProps = {
  content: string;
  previewId: string;
  /** `type:path` key for editorScrollMemory restore. */
  scrollMemoryKey?: string | null;
  theme?: 'light' | 'dark';
  className?: string;
};

/**
 * Lightweight markdown snapshot for frozen split panes (CodeMirror unmounted).
 * Skips wiki hydration / mermaid / observers — visual placeholder until remount.
 */
function FrozenPaneMarkdownPreview({
  content,
  previewId,
  scrollMemoryKey = null,
  theme = 'light',
  className = '',
}: FrozenPaneMarkdownPreviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => String(content || ''), [content]);
  // md-editor-rt builds `#${id} …` querySelectors — path chars must be stripped.
  const safeId = useMemo(
    () => `frozen-pane-${sanitizeMdEditorIdFragment(previewId.replace(/^frozen-pane-/, ''))}`,
    [previewId],
  );

  // Restore approximate scroll so demoted panes do not jump to the top.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || !scrollMemoryKey) return;
    const snap = recallEditorScroll(scrollMemoryKey);
    if (!snap) return;
    const top = Math.max(snap.previewTop || 0, snap.editorTop || 0);
    const left = Math.max(snap.previewLeft || 0, snap.editorLeft || 0);
    el.scrollTop = top;
    el.scrollLeft = left;
  }, [scrollMemoryKey, value]);

  return (
    <div
      ref={rootRef}
      className={`h-full min-h-0 w-full overflow-auto bg-white dark:bg-odp-surface ${className}`}
      inert
      aria-hidden
    >
      <MdPreview
        id={safeId}
        modelValue={value}
        theme={theme === 'dark' ? 'dark' : 'light'}
        previewTheme="default"
        codeTheme={MD_EDITOR_CODE_THEME}
        language="ko-KR"
        showCodeRowNumber={false}
        noImgZoomIn
        noMermaid
        // @ts-expect-error custom icons shape
        iconfontType={undefined}
        sanitize={(html) => html}
      />
    </div>
  );
}

void MD_EDITOR_CUSTOM_ICONS;

export default memo(FrozenPaneMarkdownPreview);
