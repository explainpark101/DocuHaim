import { useEffect, useRef } from 'react';
import { MdEditor, config, type ExposeParam } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import MdEditorToolbarTooltips from '@/components/MdEditorToolbarTooltips';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import { CHAT_COMPOSER_MD_EDITOR_ID } from '@/utils/chatWithMyself/composerAutocompleteSettings';
import { handleMdEditorSelectionWrapKeydown } from '@/utils/mdEditorSelectionWrap';
import '@/styles/md-editor-rt/style.css';

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
});

const CHAT_COMPOSER_TOOLBARS = [
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  '-',
  'revoke',
  'next',
] as const;

type ChatComposerMdEditorProps = {
  value: string;
  onChange: (value: string) => void;
  theme: 'light' | 'dark';
  showToolbar?: boolean;
  onUploadImg?: (
    files: File[],
    callback: (urls: string[]) => void,
  ) => void | Promise<void>;
};

/**
 * Lazy-loaded md-editor-rt wrapper for the full chat composer.
 */
export default function ChatComposerMdEditor({
  value,
  onChange,
  theme,
  showToolbar = true,
  onUploadImg,
}: ChatComposerMdEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<ExposeParam>(null);

  // Same selection-wrap behavior as MarkdownEditor (backtick → inline code, etc.).
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const register = (): boolean => {
      const api = editorRef.current;
      if (!api?.domEventHandlers) return false;
      api.domEventHandlers({
        keydown: (e, view) => {
          if (!view) return;
          if (handleMdEditorSelectionWrapKeydown(e, view)) {
            e.preventDefault();
            e.stopPropagation();
            return true;
          }
        },
      });
      return true;
    };

    if (!register()) {
      timer = setInterval(() => {
        if (cancelled) return;
        if (register() && timer) {
          clearInterval(timer);
          timer = null;
        }
      }, 50);
    }

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <MdEditor
        ref={editorRef}
        editorId={CHAT_COMPOSER_MD_EDITOR_ID}
        modelValue={value}
        onChange={onChange}
        theme={theme}
        language="ko-KR"
        customIcon={{ ...MD_EDITOR_CUSTOM_ICONS }}
        preview={false}
        toolbars={showToolbar ? [...CHAT_COMPOSER_TOOLBARS] : []}
        footers={[]}
        placeholder="메시지 입력…"
        style={{ height: '100%' }}
        {...(onUploadImg ? { onUploadImg } : {})}
      />
      {showToolbar ? <MdEditorToolbarTooltips containerRef={containerRef} /> : null}
    </div>
  );
}
