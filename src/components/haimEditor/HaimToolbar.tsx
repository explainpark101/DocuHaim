import { useEditorState, type Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Link2,
  Table,
  Undo2,
  Redo2,
  SeparatorHorizontal,
  Subscript,
  Superscript,
  Columns2,
  Eye,
  FileCode2,
  ArrowUpDown,
} from 'lucide-react';
import { Switch, Tooltip } from 'radix-ui';
import {
  HAIM_VIEW_MODE_DOUBLE,
  HAIM_VIEW_MODE_OPTIONS,
  HAIM_VIEW_MODE_SOURCE,
  HAIM_VIEW_MODE_WYSIWYG,
  type HaimViewMode,
  saveHaimViewMode,
} from '@/utils/haimViewModeSettings';

type Props = {
  editor: Editor | null;
  viewMode: HaimViewMode;
  onViewModeChange: (mode: HaimViewMode) => void;
  previewOnly?: boolean | undefined;
  onInsertPageBreak?: (() => void) | undefined;
  onSave?: (() => void) | undefined;
  scrollSyncEnabled?: boolean | undefined;
  onScrollSyncChange?: ((enabled: boolean) => void) | undefined;
};

function ToolBtn({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean | undefined;
  disabled?: boolean | undefined;
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
          onClick={() => {
            onClick();
          }}
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
          side="bottom"
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
 * Haim toolbar — subscribes via useEditorState so EditorContent does not re-render.
 */
export default function HaimToolbar({
  editor,
  viewMode,
  onViewModeChange,
  previewOnly = false,
  onInsertPageBreak,
  scrollSyncEnabled = true,
  onScrollSyncChange,
}: Props) {
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
        h1: ed.isActive('heading', { level: 1 }),
        h2: ed.isActive('heading', { level: 2 }),
        h3: ed.isActive('heading', { level: 3 }),
        bullet: ed.isActive('bulletList'),
        ordered: ed.isActive('orderedList'),
        task: ed.isActive('taskList'),
        quote: ed.isActive('blockquote'),
        link: ed.isActive('link'),
        sub: ed.isActive('subscript'),
        sup: ed.isActive('superscript'),
        canUndo: ed.can().undo(),
        canRedo: ed.can().redo(),
      };
    },
  });

  if (!editor || previewOnly) {
    return (
      <div className="haim-toolbar flex h-9 shrink-0 items-center gap-1 border-b border-slate-300 bg-slate-50 px-2 shadow-[0_2px_6px_-1px_rgba(15,23,42,0.12)] dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.45)]">
        <span className="text-xs text-gray-500 dark:text-odp-muted">미리보기</span>
      </div>
    );
  }

  const s = state;

  const setMode = (mode: HaimViewMode) => {
    saveHaimViewMode(mode);
    onViewModeChange(mode);
  };

  const showScrollSync = viewMode === HAIM_VIEW_MODE_DOUBLE;

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <div className="haim-toolbar flex h-9 shrink-0 flex-wrap items-center gap-0.5 overflow-x-auto border-b border-slate-300 bg-slate-50 px-1 shadow-[0_2px_6px_-1px_rgba(15,23,42,0.12)] dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.45)]">
        <ToolBtn
          label="실행 취소"
          disabled={Boolean(s?.canUndo) === false}
          onClick={() => {
            editor.chain().focus().undo().run();
          }}
        >
          <Undo2 size={14} />
        </ToolBtn>
        <ToolBtn
          label="다시 실행"
          disabled={Boolean(s?.canRedo) === false}
          onClick={() => {
            editor.chain().focus().redo().run();
          }}
        >
          <Redo2 size={14} />
        </ToolBtn>
        <span className="mx-1 h-4 w-px bg-gray-200 dark:bg-odp-borderStrong" />
        <ToolBtn
          label="굵게"
          active={Boolean(s?.bold)}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold size={14} />
        </ToolBtn>
        <ToolBtn
          label="기울임"
          active={Boolean(s?.italic)}
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic size={14} />
        </ToolBtn>
        <ToolBtn
          label="밑줄"
          active={Boolean(s?.underline)}
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <UnderlineIcon size={14} />
        </ToolBtn>
        <ToolBtn
          label="취소선"
          active={Boolean(s?.strike)}
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough size={14} />
        </ToolBtn>
        <ToolBtn
          label="인라인 코드"
          active={Boolean(s?.code)}
          onClick={() => {
            editor.chain().focus().toggleCode().run();
          }}
        >
          <Code size={14} />
        </ToolBtn>
        <ToolBtn
          label="아래 첨자"
          active={Boolean(s?.sub)}
          onClick={() => {
            editor.chain().focus().toggleSubscript().run();
          }}
        >
          <Subscript size={14} />
        </ToolBtn>
        <ToolBtn
          label="위 첨자"
          active={Boolean(s?.sup)}
          onClick={() => {
            editor.chain().focus().toggleSuperscript().run();
          }}
        >
          <Superscript size={14} />
        </ToolBtn>
        <span className="mx-1 h-4 w-px bg-gray-200 dark:bg-odp-borderStrong" />
        <ToolBtn
          label="제목 1"
          active={Boolean(s?.h1)}
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <Heading1 size={14} />
        </ToolBtn>
        <ToolBtn
          label="제목 2"
          active={Boolean(s?.h2)}
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 size={14} />
        </ToolBtn>
        <ToolBtn
          label="제목 3"
          active={Boolean(s?.h3)}
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <Heading3 size={14} />
        </ToolBtn>
        <ToolBtn
          label="글머리"
          active={Boolean(s?.bullet)}
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List size={14} />
        </ToolBtn>
        <ToolBtn
          label="번호 목록"
          active={Boolean(s?.ordered)}
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered size={14} />
        </ToolBtn>
        <ToolBtn
          label="할 일"
          active={Boolean(s?.task)}
          onClick={() => {
            editor.chain().focus().toggleTaskList().run();
          }}
        >
          <ListTodo size={14} />
        </ToolBtn>
        <ToolBtn
          label="인용"
          active={Boolean(s?.quote)}
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote size={14} />
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
          <Link2 size={14} />
        </ToolBtn>
        <ToolBtn
          label="표"
          onClick={() => {
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run();
          }}
        >
          <Table size={14} />
        </ToolBtn>
        <ToolBtn
          label="페이지 나눔"
          onClick={() => {
            if (onInsertPageBreak) onInsertPageBreak();
            else editor.chain().focus().insertContent({ type: 'pageBreak' }).run();
          }}
        >
          <SeparatorHorizontal size={14} />
        </ToolBtn>
        <span className="mx-1 h-4 w-px bg-slate-300 dark:bg-odp-borderStrong" />
        {showScrollSync ? (
          <HaimScrollSyncSwitch
            checked={scrollSyncEnabled}
            onChange={(next) => onScrollSyncChange?.(next)}
          />
        ) : null}
        <div className="ml-auto mr-1">
          <HaimViewModeCycleButton viewMode={viewMode} onChange={setMode} />
        </div>
      </div>
    </Tooltip.Provider>
  );
}

function HaimScrollSyncSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <label
          className="inline-flex shrink-0 cursor-pointer select-none items-center gap-1 px-1"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <ArrowUpDown size={14} className="text-gray-500 dark:text-odp-muted" aria-hidden />
          <Switch.Root
            checked={checked}
            onCheckedChange={(next) => onChange(Boolean(next))}
            aria-label="double 스크롤 위치 동기화"
            className={[
              'relative h-4 w-7 rounded-full border-0 outline-none transition-colors',
              'focus-visible:ring-2 focus-visible:ring-blue-400',
              checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-odp-borderStrong',
            ].join(' ')}
          >
            <Switch.Thumb
              className={[
                'block h-3 w-3 translate-x-0.5 rounded-full bg-white shadow transition-transform',
                'data-[state=checked]:translate-x-3.5',
              ].join(' ')}
            />
          </Switch.Root>
        </label>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          sideOffset={6}
          className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
        >
          double 모드에서 소스·WYSIWYG 스크롤 위치를 맞춥니다
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const VIEW_MODE_CYCLE: readonly HaimViewMode[] = [
  HAIM_VIEW_MODE_WYSIWYG,
  HAIM_VIEW_MODE_DOUBLE,
  HAIM_VIEW_MODE_SOURCE,
];

const VIEW_MODE_ICONS: Record<HaimViewMode, typeof Eye> = {
  [HAIM_VIEW_MODE_WYSIWYG]: Eye,
  [HAIM_VIEW_MODE_DOUBLE]: Columns2,
  [HAIM_VIEW_MODE_SOURCE]: FileCode2,
};

function nextHaimViewMode(current: HaimViewMode): HaimViewMode {
  const i = VIEW_MODE_CYCLE.indexOf(current);
  const next = VIEW_MODE_CYCLE[(i < 0 ? 0 : i + 1) % VIEW_MODE_CYCLE.length];
  return next ?? HAIM_VIEW_MODE_WYSIWYG;
}

/** Icon-only control: each click cycles wysiwyg → double → source. */
function HaimViewModeCycleButton({
  viewMode,
  onChange,
}: {
  viewMode: HaimViewMode;
  onChange: (mode: HaimViewMode) => void;
}) {
  const Icon = VIEW_MODE_ICONS[viewMode] ?? Eye;
  const opt =
    HAIM_VIEW_MODE_OPTIONS.find((o) => o.value === viewMode) ??
    HAIM_VIEW_MODE_OPTIONS[0];
  const tip = opt
    ? `보기 모드: ${opt.label} — 클릭하여 전환`
    : '보기 모드 전환';

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={tip}
          onClick={() => onChange(nextHaimViewMode(viewMode))}
          className="inline-flex h-7 w-7 items-center justify-center rounded border border-transparent text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-bgSoft"
        >
          <Icon size={14} aria-hidden />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          sideOffset={6}
          className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
        >
          {opt?.description ?? tip}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
