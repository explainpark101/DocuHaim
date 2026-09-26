import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Link2,
  Undo2,
  Redo2,
} from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';
import {
  getCachedMarkdown,
  invalidateMarkdownCache,
} from '@/components/haimEditor/markdownCache';
import type { ChatComposerEditorProps } from '@/components/chatWithMyself/ChatComposerLegacyMdEditor';
import '@/styles/haim-editor/style.css';

function ToolBtn({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          disabled={disabled}
          onClick={() => onClick()}
          className={`inline-flex h-7 w-7 items-center justify-center rounded border text-gray-700 dark:text-odp-fg ${
            active
              ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40'
              : 'border-transparent hover:bg-gray-100 dark:hover:bg-odp-bgSoft'
          } disabled:opacity-40`}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={6}
          className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
        >
          {label}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/**
 * Compact Haim (TipTap) editor for chat composer — no dual/source chrome.
 */
export default function ChatComposerHaimEditor({
  value,
  onChange,
  theme,
  showToolbar = true,
  onUploadImg,
}: ChatComposerEditorProps) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const valueRef = useRef(value);
  valueRef.current = value;
  const composingRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const extensions = useMemo(
    () => createHaimExtensions({ placeholder: '메시지 입력…' }),
    [],
  );

  const editor = useEditor(
    {
      extensions,
      content: value || '',
      contentType: 'markdown',
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: `haim-editor-prose prose dark:prose-invert max-w-none focus:outline-none min-h-[4rem] px-2.5 py-2 text-sm ${
            theme === 'dark' ? 'haim-editor--dark' : ''
          }`,
        },
      },
    },
    [extensions],
  );

  const emitMarkdown = useCallback(() => {
    if (!editor) return;
    const md = getCachedMarkdown(editor);
    if (md !== valueRef.current) onChangeRef.current(md);
  }, [editor]);

  useEffect(() => {
    if (!editor) return undefined;
    const dom = editor.view.dom;
    const onCompositionStart = () => {
      composingRef.current = true;
    };
    const onCompositionEnd = () => {
      composingRef.current = false;
      emitMarkdown();
    };
    dom.addEventListener('compositionstart', onCompositionStart);
    dom.addEventListener('compositionend', onCompositionEnd);

    const onUpdate = () => {
      if (composingRef.current) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        emitMarkdown();
      }, 120);
    };
    editor.on('update', onUpdate);
    return () => {
      editor.off('update', onUpdate);
      dom.removeEventListener('compositionstart', onCompositionStart);
      dom.removeEventListener('compositionend', onCompositionEnd);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [editor, emitMarkdown]);

  // External value (clear after send, edit target load)
  useEffect(() => {
    if (!editor) return;
    const current = getCachedMarkdown(editor);
    if (current === (value || '')) return;
    invalidateMarkdownCache(editor);
    editor.commands.setContent(value || '', {
      contentType: 'markdown',
      emitUpdate: false,
    } as never);
  }, [editor, value]);

  useEffect(() => {
    if (!editor || !onUploadImg) return undefined;
    const dom = editor.view.dom;
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (!files.length) return;
      e.preventDefault();
      void onUploadImg(files, () => undefined);
    };
    dom.addEventListener('paste', onPaste);
    return () => dom.removeEventListener('paste', onPaste);
  }, [editor, onUploadImg]);

  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) return null;
      return {
        bold: ed.isActive('bold'),
        italic: ed.isActive('italic'),
        underline: ed.isActive('underline'),
        strike: ed.isActive('strike'),
        code: ed.isActive('code'),
        bullet: ed.isActive('bulletList'),
        ordered: ed.isActive('orderedList'),
        task: ed.isActive('taskList'),
        quote: ed.isActive('blockquote'),
        link: ed.isActive('link'),
        canUndo: ed.can().undo(),
        canRedo: ed.can().redo(),
      };
    },
  });

  if (!editor) {
    return (
      <div className="flex h-full items-center px-2.5 text-sm text-gray-400">
        Haim Editor 로딩 중…
      </div>
    );
  }

  const s = state;

  return (
    <div
      className={`chat-composer-haim flex h-full min-h-0 w-full flex-col ${
        theme === 'dark' ? 'haim-editor--dark' : ''
      }`}
    >
      {showToolbar ? (
        <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
          <div className="flex h-8 shrink-0 items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
            <ToolBtn
              label="실행 취소"
              disabled={!s?.canUndo}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 size={13} />
            </ToolBtn>
            <ToolBtn
              label="다시 실행"
              disabled={!s?.canRedo}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 size={13} />
            </ToolBtn>
            <span className="mx-0.5 h-3.5 w-px bg-slate-300 dark:bg-odp-borderStrong" />
            <ToolBtn
              label="굵게"
              active={Boolean(s?.bold)}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={13} />
            </ToolBtn>
            <ToolBtn
              label="밑줄"
              active={Boolean(s?.underline)}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={13} />
            </ToolBtn>
            <ToolBtn
              label="기울임"
              active={Boolean(s?.italic)}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={13} />
            </ToolBtn>
            <ToolBtn
              label="취소선"
              active={Boolean(s?.strike)}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough size={13} />
            </ToolBtn>
            <ToolBtn
              label="인용"
              active={Boolean(s?.quote)}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote size={13} />
            </ToolBtn>
            <ToolBtn
              label="글머리"
              active={Boolean(s?.bullet)}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={13} />
            </ToolBtn>
            <ToolBtn
              label="번호 목록"
              active={Boolean(s?.ordered)}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={13} />
            </ToolBtn>
            <ToolBtn
              label="할 일"
              active={Boolean(s?.task)}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
            >
              <ListTodo size={13} />
            </ToolBtn>
            <ToolBtn
              label="인라인 코드"
              active={Boolean(s?.code)}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <Code size={13} />
            </ToolBtn>
            <ToolBtn
              label="코드 블록"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Code size={13} className="opacity-70" />
            </ToolBtn>
            <ToolBtn
              label="링크"
              active={Boolean(s?.link)}
              onClick={() => {
                const prev = editor.getAttributes('link').href as string | undefined;
                const url = window.prompt('URL', prev || 'https://');
                if (url === null) return;
                if (url === '') {
                  editor.chain().focus().extendMarkRange('link').unsetLink().run();
                  return;
                }
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              }}
            >
              <Link2 size={13} />
            </ToolBtn>
          </div>
        </Tooltip.Provider>
      ) : null}
      <div className="min-h-0 flex-1 overflow-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
