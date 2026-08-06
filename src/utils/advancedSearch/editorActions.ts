/**
 * Bridge: active MarkdownEditor registers toolbar actions for Advanced Search.
 */

export type EditorActionId =
  | 'editor-bold'
  | 'editor-italic'
  | 'editor-underline'
  | 'editor-strikeThrough'
  | 'editor-quote'
  | 'editor-unorderedList'
  | 'editor-orderedList'
  | 'editor-task'
  | 'editor-codeRow'
  | 'editor-code'
  | 'editor-link'
  | 'editor-table'
  | 'editor-table-edit'
  | 'editor-h1'
  | 'editor-h2'
  | 'editor-h3'
  | 'editor-h4'
  | 'editor-sub'
  | 'editor-sup'
  | 'editor-revoke'
  | 'editor-next'
  | 'editor-llm-assist'
  | 'editor-export-pdf'
  | 'editor-pgbr'
  | 'editor-heading-remap'
  | 'editor-checklist-progress';

export type EditorActionHandler = () => void | Promise<void>;

type Listener = () => void;

const handlers = new Map<EditorActionId, EditorActionHandler>();
const listeners = new Set<Listener>();

function notify(): void {
  for (const l of listeners) {
    try {
      l();
    } catch {
      // ignore
    }
  }
}

/** Register (or replace) editor toolbar actions while an editor is mounted. */
export function registerEditorActions(
  next: Partial<Record<EditorActionId, EditorActionHandler>>,
): () => void {
  const keys = Object.keys(next) as EditorActionId[];
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn === 'function') handlers.set(key, fn);
  }
  notify();
  return () => {
    for (const key of keys) handlers.delete(key);
    notify();
  };
}

export function hasEditorActions(): boolean {
  return handlers.size > 0;
}

export function isEditorActionId(id: string | undefined | null): id is EditorActionId {
  return Boolean(id && handlers.has(id as EditorActionId));
}

export function runEditorAction(id: string): boolean {
  const fn = handlers.get(id as EditorActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] editor action failed', id, err);
    return false;
  }
}

export function subscribeEditorActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export type EditorActionCommandDef = {
  id: EditorActionId;
  title: string;
  description: string;
  keywords: string[];
  /** md-editor-rt ToolDirective, if applicable */
  directive?: string;
};

/** Commands shown in Advanced Search only while an editor has registered actions. */
export const EDITOR_ACTION_COMMANDS: readonly EditorActionCommandDef[] = [
  {
    id: 'editor-bold',
    title: '굵게 (Bold)',
    description: '선택 영역을 굵게',
    keywords: ['bold', '굵게', '볼드', '강조'],
    directive: 'bold',
  },
  {
    id: 'editor-italic',
    title: '기울임 (Italic)',
    description: '선택 영역을 기울임',
    keywords: ['italic', '기울임', '이탤릭'],
    directive: 'italic',
  },
  {
    id: 'editor-underline',
    title: '밑줄 (Underline)',
    description: '선택 영역에 밑줄',
    keywords: ['underline', '밑줄'],
    directive: 'underline',
  },
  {
    id: 'editor-strikeThrough',
    title: '취소선',
    description: '선택 영역에 취소선',
    keywords: ['strike', 'strikethrough', '취소선'],
    directive: 'strikeThrough',
  },
  {
    id: 'editor-quote',
    title: '인용',
    description: '인용 블록',
    keywords: ['quote', '인용', 'blockquote'],
    directive: 'quote',
  },
  {
    id: 'editor-unorderedList',
    title: '글머리 기호 목록',
    description: '순서 없는 목록',
    keywords: ['ul', 'unordered', '목록', '리스트', 'bullet'],
    directive: 'unorderedList',
  },
  {
    id: 'editor-orderedList',
    title: '번호 목록',
    description: '순서 있는 목록',
    keywords: ['ol', 'ordered', '번호', 'numbered'],
    directive: 'orderedList',
  },
  {
    id: 'editor-task',
    title: '할 일 목록',
    description: '체크박스 작업 목록',
    keywords: ['task', 'todo', '체크리스트', 'checkbox'],
    directive: 'task',
  },
  {
    id: 'editor-codeRow',
    title: '인라인 코드',
    description: '인라인 코드로 감싸기',
    keywords: ['code', '인라인 코드', 'codeRow'],
    directive: 'codeRow',
  },
  {
    id: 'editor-code',
    title: '코드 블록',
    description: '코드 펜스 삽입',
    keywords: ['code block', '코드 블록', 'fence'],
    directive: 'code',
  },
  {
    id: 'editor-link',
    title: '링크',
    description: '마크다운 링크 삽입',
    keywords: ['link', '링크', 'url'],
    directive: 'link',
  },
  {
    id: 'editor-table',
    title: '표',
    description: '마크다운 표 삽입',
    keywords: ['table', '표', '테이블'],
    directive: 'table',
  },
  {
    id: 'editor-table-edit',
    title: '표 편집',
    description: '선택/커서 위치의 haim-table 병합·스타일 편집',
    keywords: [
      'table edit',
      '표 편집',
      '셀 병합',
      'colspan',
      'rowspan',
      'haim-table',
      '테이블 편집',
    ],
  },
  {
    id: 'editor-h1',
    title: '제목 1',
    description: 'H1 제목',
    keywords: ['h1', 'heading', '제목1', 'heading 1'],
    directive: 'h1',
  },
  {
    id: 'editor-h2',
    title: '제목 2',
    description: 'H2 제목',
    keywords: ['h2', '제목2', 'heading 2'],
    directive: 'h2',
  },
  {
    id: 'editor-h3',
    title: '제목 3',
    description: 'H3 제목',
    keywords: ['h3', '제목3', 'heading 3'],
    directive: 'h3',
  },
  {
    id: 'editor-h4',
    title: '제목 4',
    description: 'H4 제목',
    keywords: ['h4', '제목4', 'heading 4'],
    directive: 'h4',
  },
  {
    id: 'editor-sub',
    title: '아래 첨자',
    description: '아래 첨자',
    keywords: ['sub', 'subscript', '아래첨자'],
    directive: 'sub',
  },
  {
    id: 'editor-sup',
    title: '위 첨자',
    description: '위 첨자',
    keywords: ['sup', 'superscript', '위첨자'],
    directive: 'sup',
  },
  {
    id: 'editor-revoke',
    title: '실행 취소',
    description: '에디터 실행 취소 (Undo)',
    keywords: ['undo', 'revoke', '실행취소', '되돌리기'],
  },
  {
    id: 'editor-next',
    title: '다시 실행',
    description: '에디터 다시 실행 (Redo)',
    keywords: ['redo', 'next', '다시실행'],
  },
  {
    id: 'editor-llm-assist',
    title: 'AI 도우미 열기',
    description: 'Gemini AI 도우미 모달',
    keywords: ['ai', 'llm', 'gemini', '인공지능', '도우미', 'assist'],
  },
  {
    id: 'editor-export-pdf',
    title: 'PDF 내보내기 (현재 에디터)',
    description: '열린 에디터 내용을 인쇄 페이지로',
    keywords: ['export', 'pdf', '인쇄', 'print', '내보내기'],
  },
  {
    id: 'editor-pgbr',
    title: '인쇄 페이지 나눔 삽입',
    description: '<pgbr/> 삽입',
    keywords: ['pgbr', 'page break', '페이지 나눔', '인쇄'],
  },
  {
    id: 'editor-heading-remap',
    title: '제목 단계 일괄 변경',
    description: '헤딩 리맵 도구 열기',
    keywords: ['heading remap', '제목 변경', '헤딩'],
  },
  {
    id: 'editor-checklist-progress',
    title: '체크리스트 진행률',
    description: '체크리스트 진행률 도구 열기',
    keywords: ['checklist', 'progress', '진행률', '체크리스트'],
  },
] as const;
