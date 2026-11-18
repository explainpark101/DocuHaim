import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';
import { markdownToEditorContent } from '@/components/haimEditor/markdownIo';

type LlmAssistChatHaimPreviewProps = {
  markdown: string;
  className?: string;
};

/**
 * Read-only Haim (TipTap) WYSIWYG surface for chat assistant replies.
 * Uses the lean `composer` extension profile.
 */
export default function LlmAssistChatHaimPreview({
  markdown,
  className = '',
}: LlmAssistChatHaimPreviewProps) {
  const appliedRef = useRef<string | null>(null);
  const editor = useEditor({
    extensions: createHaimExtensions({
      placeholder: '',
      profile: 'composer',
      isSourceLineEnabled: () => false,
    }),
    content: markdownToEditorContent(markdown || '').content,
    contentType: 'markdown',
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'haim-chat-readonly prose prose-sm max-w-none dark:prose-invert focus:outline-none ' +
          'text-[12px] leading-relaxed text-gray-800 dark:text-odp-fg',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const key = markdown || '';
    if (appliedRef.current === key) return;
    appliedRef.current = key;
    editor.commands.setContent(markdownToEditorContent(key).content, {
      contentType: 'markdown',
    });
  }, [editor, markdown]);

  if (!editor) {
    return (
      <div className={`whitespace-pre-wrap break-words text-[12px] ${className}`}>
        {markdown}
      </div>
    );
  }

  return (
    <div className={`min-w-0 overflow-x-auto ${className}`}>
      <EditorContent editor={editor} />
    </div>
  );
}
