import { useCallback } from 'react';
import { DropdownMenu } from 'radix-ui';
import { Heading } from 'lucide-react';
import { toggleHeadingForSelection } from '@/utils/editorMarkdownStyle';

type EditorApi = {
  getEditorView?: () => import('@codemirror/view').EditorView | undefined;
};

type Props = {
  editorRef: { current: { value?: EditorApi } | EditorApi | null };
};

export default function MarkdownDeepHeadingToolbar({ editorRef }: Props) {
  const apply = useCallback((level: number) => {
    const api = (editorRef.current as { value?: EditorApi } | null)?.value ?? editorRef.current;
    const view = api && 'getEditorView' in api ? api.getEditorView?.() : undefined;
    if (!view) return;
    toggleHeadingForSelection(view, level);
    view.focus();
  }, [editorRef]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="md-editor-toolbar-item"
        title="제목 7–10"
        aria-label="제목 7–10"
      >
        <Heading className="md-editor-icon" size={16} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-100010 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          sideOffset={4}
        >
          {[7, 8, 9, 10].map((level) => (
            <DropdownMenu.Item
              key={level}
              className="cursor-pointer rounded px-2 py-1.5 text-sm text-gray-800 outline-none data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg"
              onSelect={() => apply(level)}
            >
              제목 {level}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
