import { memo, useMemo, useRef } from 'react';
import { MdPreview, config } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
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

  useWikiImageHydration(rootRef, value, getPresignedUrl, currentNotePath);

  return (
    <div ref={rootRef} className={`quiz-md-preview markdown-content ${className}`}>
      <MdPreview
        id={previewId}
        modelValue={value}
        theme={theme === 'dark' ? 'dark' : 'light'}
        previewTheme="default"
        codeTheme={MD_EDITOR_CODE_THEME}
        language="ko-KR"
        showCodeRowNumber={false}
        noImgZoomIn
        // @ts-expect-error custom icons shape
        iconfontType={undefined}
        sanitize={(html) => html}
      />
    </div>
  );
}

void MD_EDITOR_CUSTOM_ICONS;

export default memo(QuizMdPreview);
