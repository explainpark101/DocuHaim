import { useRef } from 'react';
import { MdEditor, config } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import MdEditorToolbarTooltips from '@/components/editor/MdEditorToolbarTooltips';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
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
];

/**
 * Lazy-loaded md-editor-rt wrapper for the full chat composer.
 */
export default function ChatComposerMdEditor({
  value,
  onChange,
  theme,
  showToolbar = true,
  onUploadImg
}: any) {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <MdEditor
        editorId="chat-with-myself-composer"
        modelValue={value}
        onChange={onChange}
        theme={theme}
        language="ko-KR"
        customIcon={MD_EDITOR_CUSTOM_ICONS}
        preview={false}
        toolbars={(showToolbar ? CHAT_COMPOSER_TOOLBARS : []) as any}
        footers={[]}
        placeholder="메시지 입력…"
        style={{ height: '100%' }}
        onUploadImg={onUploadImg}
      />
      {showToolbar ? <MdEditorToolbarTooltips containerRef={containerRef} /> : null}
    </div>
  );
}
