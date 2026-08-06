/**
 * Built-in app destinations for Advanced Search (command palette shortcuts).
 */

import {
  EDITOR_ACTION_COMMANDS,
  type EditorActionId,
} from './editorActions';
import {
  PRINT_ACTION_COMMANDS,
  PRINT_PAPER_SIZE_COMMANDS,
  type PrintActionId,
} from './printActions';

export type AppCommandId =
  | 'home'
  | 'settings'
  | 'settings-storage'
  | 'settings-storage-usage'
  | 'settings-s3'
  | 'settings-backup'
  | 'settings-webdav'
  | 'settings-gemini'
  | 'settings-webauthn'
  | 'settings-editor'
  | 'settings-navigation'
  | 'settings-display'
  | 'settings-chat'
  | 'settings-advanced-search'
  | 'settings-wiki-image'
  | 'settings-snippets'
  | 'settings-app-update'
  | 'chat'
  | 'chat-settings'
  | 'chat-groups'
  | 'chat-dates'
  | 'chat-search'
  | 'chat-pinned'
  | 'export-pdf'
  | 'export-current'
  | EditorActionId
  | PrintActionId;

export type AppCommand = {
  id: AppCommandId;
  /** Primary label shown in results. */
  title: string;
  /** Short description under the title. */
  description: string;
  /** Route to navigate to (may include hash). Empty for editor/print actions. */
  path: string;
  /** KO/EN keywords for matching (lowercased at match time). */
  keywords: string[];
};

export type AppCommandContext = {
  /** Currently open editor file, if any. */
  currentFile?: {
    id?: string | null;
    name?: string | null;
    viewer?: string | null;
    type?: string | null;
  } | null;
  /** True when MarkdownEditor has registered toolbar actions. */
  editorActionsAvailable?: boolean;
  /** True when ExportPDFPage has registered print actions. */
  printActionsAvailable?: boolean;
  /** Nested picker: only paper size commands. */
  printPaperPickerMode?: boolean;
};

export const APP_COMMANDS: readonly AppCommand[] = [
  {
    id: 'home',
    title: '홈',
    description: '파일 트리·에디터 홈으로 이동',
    path: '/',
    keywords: ['home', '홈', '메인', 'main', 'start', '시작'],
  },
  {
    id: 'settings',
    title: '설정',
    description: '저장소·표시·Advanced Search 등 앱 설정',
    path: '/settings',
    keywords: [
      'settings',
      'setting',
      '설정',
      '환경설정',
      'preferences',
      'preference',
      'prefs',
      '옵션',
      'options',
      'config',
    ],
  },
  {
    id: 'settings-storage',
    title: '설정 · 기본 저장소',
    description: 'S3 / Local / WebDAV 기본 저장소 선택',
    path: '/settings#settings-storage',
    keywords: [
      '저장소',
      'storage',
      '기본 저장소',
      's3 haim',
      'local haim',
      'webdav haim',
    ],
  },
  {
    id: 'settings-storage-usage',
    title: '설정 · 용량 분석',
    description: '저장소 용량·역색인 생성',
    path: '/settings#settings-storage-usage',
    keywords: ['용량', 'usage', '분석', '역색인 생성', 'storage usage'],
  },
  {
    id: 'settings-s3',
    title: '설정 · S3 연결',
    description: 'S3 Access Key·Bucket 등 연결 정보',
    path: '/settings#settings-s3',
    keywords: ['s3', 'bucket', 'access key', '시크릿', 'aws'],
  },
  {
    id: 'settings-backup',
    title: '설정 · 데이터 백업/복원',
    description: 'S3 연결정보 내보내기·불러오기',
    path: '/settings#settings-backup',
    keywords: ['백업', '복원', 'export', 'import', 'backup', 'restore'],
  },
  {
    id: 'settings-webdav',
    title: '설정 · WebDAV 연결',
    description: 'WebDAV endpoint·계정 설정',
    path: '/settings#settings-webdav',
    keywords: ['webdav', '웹dav', 'endpoint'],
  },
  {
    id: 'settings-gemini',
    title: '설정 · Gemini / Google AI',
    description: 'Gemini API 키·모델 설정',
    path: '/settings#settings-gemini',
    keywords: ['gemini', 'google ai', 'api key', 'llm', '지미니'],
  },
  {
    id: 'settings-webauthn',
    title: '설정 · 지문 / 보안 키',
    description: 'WebAuthn 잠금·암호화',
    path: '/settings#settings-webauthn',
    keywords: ['지문', 'webauthn', '보안 키', 'passkey', '생체'],
  },
  {
    id: 'settings-editor',
    title: '설정 · 마크다운 에디터',
    description: 'md-editor-rt / Novel 에디터 선택',
    path: '/settings#settings-editor',
    keywords: ['에디터', 'editor', 'novel', 'markdown', '마크다운'],
  },
  {
    id: 'settings-navigation',
    title: '설정 · 네비게이션',
    description: 'Alt+Vim·파일 전환 키보드 옵션',
    path: '/settings#settings-navigation',
    keywords: ['네비게이션', 'navigation', 'vim', 'alt+vim', '키보드'],
  },
  {
    id: 'settings-display',
    title: '설정 · 표시 옵션',
    description: '숨김 폴더·트리 호버 펼침 등',
    path: '/settings#settings-display',
    keywords: ['표시', 'display', '숨김', '트리', 'hover', '다크'],
  },
  {
    id: 'settings-chat',
    title: '설정 · 나와의 채팅',
    description: '채팅 입력창 helper text 표시',
    path: '/settings#settings-chat',
    keywords: ['채팅 설정', 'helper', '단축키 안내'],
  },
  {
    id: 'settings-advanced-search',
    title: '설정 · Advanced Search',
    description: '역색인 on/off·다시 색인',
    path: '/settings#settings-advanced-search',
    keywords: [
      'advanced search',
      '역색인',
      'index',
      '색인',
      'spotlight',
      '검색 설정',
    ],
  },
  {
    id: 'settings-wiki-image',
    title: '설정 · 위키 이미지 캐시',
    description: 'Blob / Presigned URL 캐싱 방식',
    path: '/settings#settings-wiki-image',
    keywords: ['위키', 'wiki', '이미지 캐시', 'blob', 'presigned'],
  },
  {
    id: 'settings-snippets',
    title: '설정 · 스니펫 단축키',
    description: '에디터 스니펫 등록·수정',
    path: '/settings#settings-snippets',
    keywords: ['스니펫', 'snippet', '단축키', 'snippet shortcut'],
  },
  {
    id: 'settings-app-update',
    title: '설정 · 앱 업데이트',
    description: '빌드 해시·PWA 캐시 확인',
    path: '/settings#settings-app-update',
    keywords: ['업데이트', 'update', 'pwa', '버전', 'version'],
  },
  {
    id: 'chat',
    title: '나와의 채팅',
    description: 'Chat with Myself 열기',
    path: '/chat',
    keywords: [
      'chat',
      '채팅',
      '나와의 채팅',
      '나와의채팅',
      'messenger',
      '메시지',
      'message',
      'dm',
      '대화',
    ],
  },
  {
    id: 'chat-settings',
    title: '나와의 채팅 · 설정',
    description: '채팅 입력창·링크·성능 설정 모달',
    path: '/chat#settings',
    keywords: [
      '채팅 설정',
      'chat settings',
      'composer settings',
      '입력창 설정',
    ],
  },
  {
    id: 'chat-groups',
    title: '나와의 채팅 · 그룹 사이드바',
    description: '그룹 패널 열기',
    path: '/chat#groups',
    keywords: ['그룹', 'group', '그룹 사이드바', 'chat groups'],
  },
  {
    id: 'chat-dates',
    title: '나와의 채팅 · 날짜 사이드바',
    description: '날짜 점프 패널 열기',
    path: '/chat#dates',
    keywords: ['날짜', 'date', '날짜 사이드바', 'calendar'],
  },
  {
    id: 'chat-search',
    title: '나와의 채팅 · 검색 사이드바',
    description: '채팅 검색 패널 열기',
    path: '/chat#search',
    keywords: ['채팅 검색', 'chat search', '검색 사이드바'],
  },
  {
    id: 'chat-pinned',
    title: '나와의 채팅 · 모아보기',
    description: '핀·모아보기 패널 열기',
    path: '/chat#pinned',
    keywords: ['모아보기', 'pinned', '핀', 'pin'],
  },
  {
    id: 'export-pdf',
    title: 'PDF 내보내기 / 인쇄',
    description: '인쇄·Export PDF 페이지 열기',
    path: '/export-pdf',
    keywords: [
      'export',
      'pdf',
      '인쇄',
      'print',
      '내보내기',
      'export pdf',
      '인쇄 미리보기',
    ],
  },
] as const;

function normalize(s: string): string {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function isOpenMarkdownFile(
  file: AppCommandContext['currentFile'],
): file is NonNullable<AppCommandContext['currentFile']> {
  if (!file?.id) return false;
  const viewer = String(file.viewer || '').toLowerCase();
  if (viewer === 'markdown') return true;
  const name = String(file.name || file.id || '');
  return /\.(md|markdown)$/i.test(name);
}

/** Static + contextual commands (e.g. export open document, editor/print toolbar). */
export function getAppCommands(context?: AppCommandContext): AppCommand[] {
  if (context?.printPaperPickerMode) {
    return PRINT_PAPER_SIZE_COMMANDS.map((cmd) => ({
      id: cmd.id,
      title: cmd.title,
      description: cmd.description,
      path: '',
      keywords: [...cmd.keywords],
    }));
  }

  const list: AppCommand[] = [...APP_COMMANDS];
  if (context?.editorActionsAvailable) {
    for (const cmd of EDITOR_ACTION_COMMANDS) {
      list.push({
        id: cmd.id,
        title: cmd.title,
        description: cmd.description,
        path: '',
        keywords: cmd.keywords,
      });
    }
  }
  if (context?.printActionsAvailable) {
    for (const cmd of PRINT_ACTION_COMMANDS) {
      list.push({
        id: cmd.id,
        title: cmd.title,
        description: cmd.description,
        path: '',
        keywords: [...cmd.keywords],
      });
    }
  }
  if (isOpenMarkdownFile(context?.currentFile)) {
    const name =
      String(context.currentFile.name || '').trim() ||
      String(context.currentFile.id || '')
        .split('/')
        .filter(Boolean)
        .pop() ||
      '현재 문서';
    list.push({
      id: 'export-current',
      title: `PDF 내보내기 · ${name}`,
      description: '열린 문서를 인쇄(Export PDF) 페이지로 열기',
      path: '/export-pdf',
      keywords: [
        'export',
        'pdf',
        '인쇄',
        'print',
        '현재 문서',
        'open',
        'this file',
        '이 문서',
        name.toLowerCase(),
      ],
    });
  }
  return list;
}

/**
 * Match built-in commands by title/keyword substring.
 * Empty query returns all commands (palette suggestions).
 */
export function matchAppCommands(
  query: string,
  context?: AppCommandContext,
): AppCommand[] {
  const commands = getAppCommands(context);
  const q = normalize(query);
  if (!q) return commands;

  return commands.filter((cmd) => {
    const haystacks = [cmd.title, cmd.description, cmd.path, ...cmd.keywords].map(
      normalize,
    );
    return haystacks.some((h) => h.includes(q) || q.includes(h));
  });
}
