import { memo, useMemo, useRef } from 'react';
import { config } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import MarkdownPreviewSurface from '@/components/editor/surface/MarkdownPreviewSurface';
import { useDocumentTheme } from '@/hooks/useDocumentTheme';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { useQuizImageHydration } from '@/components/quiz/QuizImageHydrationContext';
import { MD_EDITOR_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import '@/styles/md-editor-rt/preview.css';

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
});

type QuizMdPreviewProps = {
  text: string;
  previewId: string;
  className?: string;
  getPresignedUrl?: ((path: string) => Promise<string | null>) | undefined;
  currentNotePath?: string | null | undefined;
};

function QuizMdPreview({
  text,
  previewId,
  className = '',
  getPresignedUrl: getPresignedUrlProp,
  currentNotePath: currentNotePathProp,
}: QuizMdPreviewProps) {
  const theme = useDocumentTheme();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => String(text || ''), [text]);
  const hydration = useQuizImageHydration();
  const getPresignedUrl = getPresignedUrlProp ?? hydration.getPresignedUrl;
  const currentNotePath = currentNotePathProp ?? hydration.currentNotePath ?? null;
  const hydrationEnabled = hydration.hydrationEnabled !== false;

  useWikiImageHydration(rootRef, value, getPresignedUrl, currentNotePath, {
    enabled: hydrationEnabled,
  });

  return (
    <div ref={rootRef} className={`quiz-md-preview markdown-content ${className}`}>
      <MarkdownPreviewSurface
        id={previewId}
        modelValue={value}
        theme={theme === 'dark' ? 'dark' : 'light'}
        previewTheme="default"
        codeTheme={MD_EDITOR_CODE_THEME}
        language="ko-KR"
        showCodeRowNumber={false}
        noImgZoomIn
        iconfontType={undefined}
        sanitize={(html: string) => html}
      />
    </div>
  );
}

void MD_EDITOR_CUSTOM_ICONS;

export default memo(QuizMdPreview);
