/**
 * Built-in app destinations for Advanced Search (command palette shortcuts).
 */

import {
  EDITOR_ACTION_COMMANDS,
  type EditorActionId,
} from '@/utils/advancedSearch/editorActions';
import {
  PRINT_ACTION_COMMANDS,
  PRINT_PAPER_SIZE_COMMANDS,
  type PrintActionId,
} from '@/utils/advancedSearch/printActions';
import {
  CHAT_ACTION_COMMANDS,
  type ChatActionId,
} from '@/utils/advancedSearch/chatActions';
import {
  MLX_VLM_ACTION_COMMANDS,
  type MlxVlmActionId,
} from '@/utils/advancedSearch/mlxVlmActions';
import {
  LLAMA_CPP_ACTION_COMMANDS,
  type LlamaCppActionId,
} from '@/utils/advancedSearch/llamaCppActions';
import {
  SETTINGS_TOGGLE_DEFS,
  getWorkspaceTabsAutoSaveCommands,
  getFootnoteDisplayModeCommands,
  type SettingsToggleId,
  type WorkspaceTabsAutoSaveCommandId,
  type FootnoteDisplayModeCommandId,
} from '@/utils/advancedSearch/settingsToggles';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  FOOTNOTE_INSERT_COMMAND_ID,
  isFootnoteRelatedCommandId,
  type FootnoteInsertCommandId,
} from '@/utils/advancedSearch/footnoteInsert';
import {
  CIRCLE_NUMBER_INSERT_COMMAND_ID,
  isCircleNumberInsertCommandId,
  type CircleNumberInsertCommandId,
} from '@/utils/advancedSearch/circleNumberInsert';
import {
  APP_LOCK_COMMAND,
  hasAppLockAction,
  type AppLockActionId,
} from '@/utils/advancedSearch/appLockActions';
import { hasDesktopAppEntryLock } from '@/utils/desktopAppEntryLock';
import { scoreFuzzyFields, scoreFuzzyRelevance } from '@/utils/advancedSearch/fuzzyMatch';
import { isSafariBrowser } from '@/utils/isSafariBrowser';

/** Dynamic snippet command (created from snippetConfig). */
export type SnippetActionId = `snippet-insert-${string}`;

export type AppCommandId =
  | 'home'
  | 'settings'
  | 'settings-storage'
  | 'settings-storage-usage'
  | 'settings-unused-images'
  | 'settings-s3'
  | 'settings-local'
  | 'settings-backup'
  | 'settings-webdav'
  | 'settings-gemini'
  | 'settings-llm-provider'
  | 'settings-openai-compat'
  | 'settings-mlx-vlm'
  | 'settings-llama-cpp'
  | 'settings-imgbb'
  | 'settings-webauthn'
  | 'settings-editor'
  | 'settings-navigation'
  | 'settings-display'
  | 'settings-chat'
  | 'settings-og'
  | 'settings-advanced-search'
  | 'settings-inverted-index'
  | 'settings-wiki-image'
  | 'settings-snippets'
  | 'settings-webfonts'
  | 'settings-cover'
  | 'settings-table-styles'
  | 'settings-app-update'
  | 'chat'
  | 'content-search'
  | 'chat-settings'
  | 'chat-groups'
  | 'chat-select-group'
  | 'chat-select-group-item'
  | 'chat-clear-group'
  | 'chat-dates'
  | 'chat-search'
  | 'chat-pinned'
  | 'export-pdf'
  | 'export-current'
  | 'editor-autocomplete-toggle'
  | 'editor-mirror-edit-toggle'
  | 'browse-directory'
  | 'browse-new-file'
  | 'browse-new-folder'
  | 'create-file'
  | 'create-temp-file'
  | 'create-folder'
  | EditorActionId
  | PrintActionId
  | ChatActionId
  | MlxVlmActionId
  | LlamaCppActionId
  | SettingsToggleId
  | WorkspaceTabsAutoSaveCommandId
  | FootnoteDisplayModeCommandId
  | FootnoteInsertCommandId
  | CircleNumberInsertCommandId
  | SnippetActionId
  | AppLockActionId;

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
  /** True when chat composer has registered actions (on /chat). */
  chatActionsAvailable?: boolean;
  /** True when the Chat with Myself tab/surface is active. */
  chatTabActive?: boolean;
  /** True when MLX-VLM settings registered actions (Tauri macOS). */
  mlxVlmActionsAvailable?: boolean;
  /** True when llama.cpp settings registered actions (Tauri desktop). */
  llamaCppActionsAvailable?: boolean;
  /** Nested picker: only paper size commands. */
  printPaperPickerMode?: boolean;
  /** Current editor autocomplete suggestion preference (localStorage). */
  editorAutocompleteEnabled?: boolean;
  /** Current Mirror Edit preference (localStorage). */
  editorMirrorEditEnabled?: boolean;
  /**
   * Snippet configuration from `.settings/snippets.json`.
   * Used to expose snippet commands in Advanced Search.
   */
  snippetConfig?: {
    snippets: Array<{
      id: string;
      name?: string;
      prefix?: string;
      body?: string;
      description?: string;
    }>;
  };
  /**
   * When true, getAppCommands also includes editor/print toolbar actions.
   * Prefer matchAppCommands which attaches page actions only for non-empty queries.
   */
  includePageActions?: boolean;
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
    id: 'content-search',
    title: '본문 검색',
    description: '역색인·본문 단위 검색 페이지 열기',
    path: '/search',
    keywords: [
      'search',
      '검색',
      '본문',
      'content',
      'find',
      '찾기',
      'grep',
      '역색인',
      'inverted index',
      'full text',
      '풀텍스트',
    ],
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
    id: 'settings-unused-images',
    title: '설정 · 미사용 / 중복 이미지',
    description: 'orphan·중복 이미지 스캔 및 삭제',
    path: '/settings#settings-unused-images',
    keywords: ['미사용', 'orphan', '중복', '이미지', '정리', 'unused', 'duplicate', 'cleanup'],
  },
  {
    id: 'settings-s3',
    title: '설정 · S3 연결',
    description: 'S3 Access Key·Bucket 등 연결 정보',
    path: '/settings#settings-s3',
    keywords: ['s3', 'bucket', 'access key', '시크릿', 'aws'],
  },
  {
    id: 'settings-local',
    title: '설정 · Local 연결',
    description: 'Local Haim 폴더 확인·다른 폴더 열기',
    path: '/settings#settings-local',
    keywords: [
      'local',
      '로컬',
      '폴더',
      'folder',
      'local haim',
      '다른 폴더',
      '폴더 선택',
      '경로',
    ],
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
    id: 'settings-llm-provider',
    title: '설정 · AI 도우미 제공자',
    description: 'Gemini·OpenAI 호환 프로필 추가·편집',
    path: '/settings#settings-llm-providers',
    keywords: ['ai', 'llm', '제공자', 'provider', 'gemini', 'openai', '프로필', 'profile'],
  },
  {
    id: 'settings-gemini',
    title: '설정 · Gemini / Google AI',
    description: 'Gemini API 키·모델을 제공자 프로필로 저장',
    path: '/settings#settings-llm-providers',
    keywords: ['gemini', 'google ai', 'api key', 'llm', '지미니'],
  },
  {
    id: 'settings-openai-compat',
    title: '설정 · OpenAI 호환 LLM',
    description: '커스텀 endpoint·API 키를 제공자 프로필로 저장',
    path: '/settings#settings-llm-providers',
    keywords: [
      'openai',
      'open ai',
      'compatible',
      '호환',
      'endpoint',
      'base url',
      'api key',
      'llm',
      'openrouter',
      'ollama',
      'vllm',
      'lm studio',
      'chat completions',
    ],
  },
  {
    id: 'settings-mlx-vlm',
    title: '설정 · MLX-VLM (Tauri macOS)',
    description: 'Apple Silicon 로컬 MLX 모델 설치·서버',
    path: '/settings#settings-mlx-vlm',
    keywords: ['mlx', 'mlx-vlm', 'apple silicon', 'local llm', 'huggingface', 'mac'],
  },
  {
    id: 'settings-llama-cpp',
    title: '설정 · llama.cpp (Tauri desktop)',
    description: '로컬 llama-server GGUF 모델 설치·서버',
    path: '/settings#settings-llama-cpp',
    keywords: ['llama', 'llama.cpp', 'gguf', 'local llm', 'huggingface', 'llama-server'],
  },
  {
    id: 'settings-imgbb',
    title: '설정 · ImgBB',
    description: 'ImgBB API 키 (이미지 외부 업로드)',
    path: '/settings#settings-imgbb',
    keywords: ['imgbb', '이미지 업로드', 'image host', 'api key', 'ibb'],
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
    description: '마크다운 에디터 종류 (Novel 준비중)',
    path: '/settings#settings-editor',
    keywords: ['에디터', 'editor', 'novel', 'markdown', '마크다운', 'tiptap'],
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
    keywords: ['표시', 'display', '숨김', '트리', 'hover', '다크', '글꼴', '폰트', 'font', 'ui font'],
  },
  {
    id: 'settings-chat',
    title: '설정 · 나와의 채팅',
    description: '채팅 입력창 helper text 표시',
    path: '/settings#settings-chat',
    keywords: ['채팅 설정', 'helper', '단축키 안내'],
  },
  {
    id: 'settings-og',
    title: '설정 · Open Graph Worker',
    description: 'Social Preview Inspector Worker (우선 사용)',
    path: '/settings#settings-og',
    keywords: [
      'opengraph',
      'og',
      'worker',
      'cloudflare',
      'social preview',
      'inspect',
      '링크 미리보기',
      'microlink',
      '메타데이터',
    ],
  },
  {
    id: 'settings-advanced-search',
    title: '설정 · Advanced Search',
    description: 'Spotlight 애니메이션 등 UI',
    path: '/settings#settings-advanced-search',
    keywords: [
      'advanced search',
      'spotlight',
      '검색 설정',
      '애니메이션',
      'animation',
    ],
  },
  {
    id: 'settings-inverted-index',
    title: '설정 · 역색인',
    description: '역색인 on/off·제외 폴더·체크포인트·Live Scan·다시 색인·커버리지',
    path: '/settings#settings-inverted-index',
    keywords: [
      '역색인',
      'inverted index',
      '색인',
      'index',
      'live scan',
      '라이브 스캔',
      '폴더',
      '제외',
      'exclude',
      '체크포인트',
      'checkpoint',
      '커버리지',
      'coverage',
      'advanced search',
      'spotlight',
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
    id: 'settings-webfonts',
    title: '설정 · 웹폰트 (CSS)',
    description: '@font-face CSS 등록·동기화',
    path: '/settings#settings-webfonts',
    keywords: [
      '웹폰트',
      'webfont',
      'font-face',
      'font-family',
      'css',
      '폰트',
      '표지 폰트',
    ],
  },
  {
    id: 'settings-cover',
    title: '설정 · 표지 편집',
    description: '표지 스냅·미리보기 옵션',
    path: '/settings#settings-cover',
    keywords: [
      '표지',
      'cover',
      '스냅',
      'snap',
      'tolerance',
      '허용 오차',
      '개체 스냅',
      '가운데 스냅',
    ],
  },
  {
    id: 'settings-table-styles',
    title: '설정 · 표 스타일 템플릿',
    description: 'haim-table 구역/행·열 스타일 YAML 템플릿',
    path: '/settings#settings-table-styles',
    keywords: [
      '표 스타일',
      'table style',
      'haim-table',
      '셀 병합',
      'thead',
      'tbody',
      '테이블 템플릿',
    ],
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
      '나에게 채팅',
      '나에게채팅',
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
    id: 'chat-select-group',
    title: '나와의 채팅 · 그룹 선택',
    description: '보낼 그룹·보기 필터를 Advanced Search에서 고릅니다',
    path: '',
    keywords: [
      '그룹 선택',
      'select group',
      'chat group',
      '그룹 고르기',
      '채팅 그룹',
      '나',
      'view group',
    ],
  },
  {
    id: 'chat-clear-group',
    title: '나와의 채팅 · 그룹 선택 해제',
    description: '그룹 보기 필터를 끄고 전체 메시지를 표시합니다',
    path: '/chat#group-clear',
    keywords: [
      '그룹 선택 해제',
      '그룹 해제',
      'clear group',
      'deselect group',
      '전체 보기',
      '필터 해제',
      '그룹 필터',
      'ungroup',
    ],
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
      '프린트',
      '내보내기',
      'export pdf',
      '인쇄 미리보기',
    ],
  },
  {
    id: 'browse-directory',
    title: '디렉토리 탐색',
    description: 'Browse Directory · 폴더를 탐색하고 파일을 엽니다',
    path: '',
    keywords: [
      'browse',
      'directory',
      'folder',
      'browse directory',
      '디렉토리',
      '탐색',
      '폴더',
      '디렉토리 탐색',
      '파일 탐색',
    ],
  },
  {
    id: 'create-file',
    title: '새 파일',
    description: '마크다운 파일 만들기 (상대 경로 · ../ 가능)',
    path: '',
    keywords: [
      '새 파일',
      'new file',
      'create file',
      '파일 만들기',
      '파일 생성',
      'md',
      'markdown',
      '만들기',
      'ctrl+n',
      'cmd+n',
    ],
  },
  {
    id: 'create-temp-file',
    title: '새 임시 파일',
    description: '이름·경로 없이 메모리 문서(untitled) 열기 · 저장 시 위치 지정',
    path: '',
    keywords: [
      '새 임시 파일',
      '임시 파일',
      'temp file',
      'untitled',
      '메모리',
      'session',
      'ctrl+shift+n',
      'cmd+shift+n',
      '임시',
    ],
  },
  {
    id: 'create-folder',
    title: '새 폴더',
    description: '폴더 만들기 (상대 경로 · ../ 가능)',
    path: '',
    keywords: [
      '새 폴더',
      'new folder',
      'create folder',
      '폴더 만들기',
      '폴더 생성',
      '디렉토리',
      'mkdir',
      '만들기',
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
  const openMdFile = isOpenMarkdownFile(context?.currentFile)
    ? context?.currentFile
    : null;

  if (openMdFile) {
    // Exactly one of enable/disable, matching current localStorage preference.
    const autocompleteOn = context?.editorAutocompleteEnabled !== false;
    list.push(
      autocompleteOn
        ? {
            id: 'editor-autocomplete-toggle',
            title: '자동완성 추천 끄기',
            description: '에디터 자동완성 추천을 이 기기에서 끕니다',
            path: '',
            keywords: [
              'autocomplete',
              'completion',
              'suggestion',
              '자동완성',
              '추천',
              '끄기',
              'off',
              'disable',
            ],
          }
        : {
            id: 'editor-autocomplete-toggle',
            title: '자동완성 추천 켜기',
            description: '에디터 자동완성 추천을 이 기기에서 켭니다',
            path: '',
            keywords: [
              'autocomplete',
              'completion',
              'suggestion',
              '자동완성',
              '추천',
              '켜기',
              'on',
              'enable',
            ],
          },
    );

    const mirrorEditOn = context?.editorMirrorEditEnabled === true;
    // Safari: Mirror Edit UI and sync are disabled — omit the AS toggle too.
    if (!isSafariBrowser()) {
      list.push(
        mirrorEditOn
          ? {
              id: 'editor-mirror-edit-toggle',
              title: 'Mirror Edit 끄기',
              description: '양쪽 커서·즉시 프리뷰 동기화를 끕니다',
              path: '',
              keywords: [
                'mirror edit',
                'mirror',
                'preview edit',
                'contenteditable',
                '더블클릭',
                '프리뷰 편집',
                '끄기',
                'off',
                'disable',
              ],
            }
          : {
              id: 'editor-mirror-edit-toggle',
              title: 'Mirror Edit 켜기',
              description: '프리뷰·마크다운에 커서를 함께 두고 즉시 동기화합니다',
              path: '',
              keywords: [
                'mirror edit',
                'mirror',
                'preview edit',
                'contenteditable',
                '더블클릭',
                '프리뷰 편집',
                '켜기',
                'on',
                'enable',
              ],
            },
      );
    }

    const name =
      String(openMdFile.name || '').trim() ||
      String(openMdFile.id || '')
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
        '프린트',
        '현재 문서',
        'open',
        'this file',
        '이 문서',
        name.toLowerCase(),
      ],
    });
  }

  if (context?.editorActionsAvailable) {
    const insertCmd = EDITOR_ACTION_COMMANDS.find(
      (cmd) => cmd.id === FOOTNOTE_INSERT_COMMAND_ID,
    );
    if (insertCmd) {
      list.push({
        id: insertCmd.id,
        title: insertCmd.title,
        description: insertCmd.description,
        path: '',
        keywords: insertCmd.keywords,
      });
    }
    const circleCmd = EDITOR_ACTION_COMMANDS.find(
      (cmd) => cmd.id === CIRCLE_NUMBER_INSERT_COMMAND_ID,
    );
    if (circleCmd) {
      list.push({
        id: circleCmd.id,
        title: circleCmd.title,
        description: circleCmd.description,
        path: '',
        keywords: circleCmd.keywords,
      });
    }
  }

  // Page-specific toolbar actions: only attached when a query is present (see matchAppCommands).
  // Callers that need the full list can pass includePageActions.
  if (context?.includePageActions) {
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
    if (context?.chatActionsAvailable) {
      for (const cmd of CHAT_ACTION_COMMANDS) {
        list.push({
          id: cmd.id,
          title: cmd.title,
          description: cmd.description,
          path: '',
          keywords: [...cmd.keywords],
        });
      }
    }
    if (context?.mlxVlmActionsAvailable) {
      for (const cmd of MLX_VLM_ACTION_COMMANDS) {
        list.push({
          id: cmd.id,
          title: cmd.title,
          description: cmd.description,
          path: '',
          keywords: [...cmd.keywords],
        });
      }
    }
    if (context?.llamaCppActionsAvailable) {
      for (const cmd of LLAMA_CPP_ACTION_COMMANDS) {
        list.push({
          id: cmd.id,
          title: cmd.title,
          description: cmd.description,
          path: '',
          keywords: [...cmd.keywords],
        });
      }
    }
  }

  return list;
}

function getPageActionCommands(context?: AppCommandContext): AppCommand[] {
  const list: AppCommand[] = [];
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
  if (context?.chatActionsAvailable) {
    for (const cmd of CHAT_ACTION_COMMANDS) {
      list.push({
        id: cmd.id,
        title: cmd.title,
        description: cmd.description,
        path: '',
        keywords: [...cmd.keywords],
      });
    }
  }
  if (context?.mlxVlmActionsAvailable) {
    for (const cmd of MLX_VLM_ACTION_COMMANDS) {
      list.push({
        id: cmd.id,
        title: cmd.title,
        description: cmd.description,
        path: '',
        keywords: [...cmd.keywords],
      });
    }
  }
  if (context?.llamaCppActionsAvailable) {
    for (const cmd of LLAMA_CPP_ACTION_COMMANDS) {
      list.push({
        id: cmd.id,
        title: cmd.title,
        description: cmd.description,
        path: '',
        keywords: [...cmd.keywords],
      });
    }
  }
  if (hasAppLockAction() && hasDesktopAppEntryLock()) {
    list.push({
      id: APP_LOCK_COMMAND.id,
      title: APP_LOCK_COMMAND.title,
      description: APP_LOCK_COMMAND.description,
      path: '',
      keywords: [...APP_LOCK_COMMAND.keywords],
    });
  }

  // Snippets: only show when query is non-empty (page actions path),
  // and only when an editor is mounted (so insertion can succeed).
  if (context?.editorActionsAvailable && context.snippetConfig?.snippets?.length) {
    const snippets = context.snippetConfig.snippets || [];
    const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const modLabelDisplay = isMac ? 'Cmd' : 'Ctrl';
    const modLabelLower = isMac ? 'cmd' : 'ctrl';

    const formatKeyCombo = (combo: string): string => {
      return String(combo || '')
        .toLowerCase()
        .replace(/\bmod\b/g, modLabelDisplay)
        .split('+')
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' + ');
    };

    for (const s of snippets) {
      const id = String(s?.id || '').trim();
      const prefix = String(s?.prefix || '').trim();
      const body = String(s?.body || '').trim();
      if (!id || !prefix || !body) continue;

      const name = String(s?.name || '').trim();
      const description = String(s?.description || '').trim();

      const firstLine = body.split(/\r?\n/)[0]?.trim() || '';
      const bodyPreview = firstLine.length > 80 ? `${firstLine.slice(0, 80)}...` : firstLine;

      const prefixLower = prefix.toLowerCase();
      const prefixCmd = prefixLower.replace(/mod/g, 'cmd');
      const prefixCtrl = prefixLower.replace(/mod/g, 'ctrl');

      const prefixWithSpaces = prefixLower.replace(/\+/g, ' ');
      const prefixCmdWithSpaces = prefixCmd.replace(/\+/g, ' ');
      const prefixCtrlWithSpaces = prefixCtrl.replace(/\+/g, ' ');

      const title = name ? `스니펫 · ${name}` : `스니펫 · ${formatKeyCombo(prefix)}`;
      const cmdDescription = `${description ? `${description} · ` : ''}단축키: ${formatKeyCombo(prefix)} · ${bodyPreview}`;

      list.push({
        id: (`snippet-insert-${id}` as SnippetActionId),
        title,
        description: cmdDescription,
        // Store snippet id here (hit.path) so host can resolve body.
        path: id,
        keywords: [
          '스니펫',
          'snippet',
          name,
          description,
          prefixLower,
          prefixWithSpaces,
          prefixCmd,
          prefixCmdWithSpaces,
          prefixCtrl,
          prefixCtrlWithSpaces,
          modLabelLower, // helps matching "cmd/ctrl" too
          bodyPreview,
        ].filter(Boolean),
      });
    }
  }
  return list;
}

/** Settings toggle switches: one enable OR disable command per option. */
function getSettingsToggleCommands(): AppCommand[] {
  return SETTINGS_TOGGLE_DEFS.filter((def) => {
    if (def.id === 'settings-tauri-download-save-dialog') {
      return isTauriDesktopPlatform();
    }
    return true;
  }).map((def) => {
    const on = def.load();
    return {
      id: def.id,
      title: on ? def.disableTitle : def.enableTitle,
      description: def.description,
      path: '',
      keywords: [
        ...def.keywords,
        '설정',
        'settings',
        'toggle',
        '토글',
        on ? '끄기' : '켜기',
        on ? 'off' : 'on',
        on ? 'disable' : 'enable',
      ],
    };
  });
}

function getWorkspaceTabsAutoSaveAppCommands(): AppCommand[] {
  return getWorkspaceTabsAutoSaveCommands().map((cmd) => ({
    id: cmd.id,
    title: cmd.title,
    description: cmd.description,
    path: '',
    keywords: cmd.keywords,
  }));
}

function getFootnoteDisplayModeAppCommands(): AppCommand[] {
  return getFootnoteDisplayModeCommands().map((cmd) => ({
    id: cmd.id,
    title: cmd.title,
    description: cmd.description,
    path: '',
    keywords: cmd.keywords,
  }));
}

/**
 * Relevance of a command to query. 0 = no useful match.
 * Uses chat-style fuzzy / partial matching (subsequence + substring).
 */
export function scoreCommandRelevance(cmd: AppCommand, query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(cmd.title);
  const description = normalize(cmd.description);
  const path = normalize(cmd.path);
  const keywords = (cmd.keywords || []).map(normalize).filter(Boolean);

  const titleScore = scoreFuzzyRelevance(title, q);
  const keywordScore = Math.max(
    0,
    ...keywords.map((k) => {
      const s = scoreFuzzyRelevance(k, q);
      // Keyword hits slightly below an equal title hit.
      return s > 0 ? Math.max(1, s - 40) : 0;
    }),
  );
  const descScore = (() => {
    const s = scoreFuzzyRelevance(description, q);
    return s > 0 ? Math.min(s, 420) : 0;
  })();
  const pathScore = path
    ? (() => {
        const s = scoreFuzzyRelevance(path, q);
        return s > 0 ? Math.min(s, 360) : 0;
      })()
    : 0;

  // Also allow query tokens to hit across title + keywords + description.
  const cross = scoreFuzzyFields([title, description, ...keywords], q);

  return Math.max(titleScore, keywordScore, descScore, pathScore, cross);
}

export type RankedAppCommand = {
  command: AppCommand;
  score: number;
};

function isSettingsSectionCommand(id: AppCommandId): boolean {
  return id.startsWith('settings-');
}

function isChatSectionCommand(id: AppCommandId): boolean {
  return id.startsWith('chat-');
}

/** Core palette visibility: settings sections need a query; chat sections need an active chat tab. */
function isCoreCommandVisible(
  command: AppCommand,
  query: string,
  context?: AppCommandContext,
): boolean {
  if (command.id === 'export-pdf') {
    return isOpenMarkdownFile(context?.currentFile);
  }
  if (isSettingsSectionCommand(command.id)) {
    return normalize(query).length > 0;
  }
  if (isChatSectionCommand(command.id)) {
    return context?.chatTabActive === true;
  }
  return true;
}

/**
 * Match built-in commands by relevance.
 * - Empty query: core app shortcuts only (no editor/print toolbar dump).
 * - Non-empty: core + page actions, filtered and sorted by relevance score.
 */
export function matchAppCommands(
  query: string,
  context?: AppCommandContext,
): AppCommand[] {
  return matchAppCommandsRanked(query, context).map((r) => r.command);
}

/** Same as matchAppCommands but keeps relevance scores for hit ranking. */
export function matchAppCommandsRanked(
  query: string,
  context?: AppCommandContext,
): RankedAppCommand[] {
  if (context?.printPaperPickerMode) {
    const paper = getAppCommands({ printPaperPickerMode: true });
    const q = normalize(query);
    if (!q) {
      return paper.map((command, index) => ({
        command,
        score: 1000 - index,
      }));
    }
    return paper
      .map((command) => ({
        command,
        score: scoreCommandRelevance(command, q),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.command.title.localeCompare(b.command.title, 'ko'));
  }

  const q = normalize(query);
  const core = getAppCommands(context);

  if (!q) {
    // Palette: core destinations only — page toolbar actions require a query.
    return core
      .filter((command) => isCoreCommandVisible(command, query, context))
      .map((command, index) => ({
        command,
        score: 1000 - index,
      }));
  }

  const page = getPageActionCommands(context);
  const settingsToggles = getSettingsToggleCommands();
  const tabsAutoSave = getWorkspaceTabsAutoSaveAppCommands();
  const footnoteDisplay = getFootnoteDisplayModeAppCommands();
  const seen = new Set<string>();
  const ranked: RankedAppCommand[] = [];

  for (const command of [...core, ...page, ...settingsToggles, ...tabsAutoSave, ...footnoteDisplay]) {
    if (seen.has(command.id)) continue;
    if (!isCoreCommandVisible(command, query, context)) continue;
    seen.add(command.id);
    const score = scoreCommandRelevance(command, q);
    if (score <= 0) continue;
    ranked.push({ command, score });
  }

  ranked.sort((a, b) => {
    const aInsert = a.command.id === FOOTNOTE_INSERT_COMMAND_ID;
    const bInsert = b.command.id === FOOTNOTE_INSERT_COMMAND_ID;
    if (aInsert && isFootnoteRelatedCommandId(b.command.id) && !bInsert) return -1;
    if (bInsert && isFootnoteRelatedCommandId(a.command.id) && !aInsert) return 1;
    const aCircle = a.command.id === CIRCLE_NUMBER_INSERT_COMMAND_ID;
    const bCircle = b.command.id === CIRCLE_NUMBER_INSERT_COMMAND_ID;
    if (aCircle && isCircleNumberInsertCommandId(b.command.id) && !bCircle) return -1;
    if (bCircle && isCircleNumberInsertCommandId(a.command.id) && !aCircle) return 1;
    return b.score - a.score || a.command.title.localeCompare(b.command.title, 'ko');
  });
  return ranked;
}
