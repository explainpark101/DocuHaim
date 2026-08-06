/**
 * Built-in app destinations for Advanced Search (command palette shortcuts).
 */

export type AppCommandId = 'home' | 'settings' | 'chat';

export type AppCommand = {
  id: AppCommandId;
  /** Primary label shown in results. */
  title: string;
  /** Short description under the title. */
  description: string;
  /** Route to navigate to. */
  path: string;
  /** KO/EN keywords for matching (lowercased at match time). */
  keywords: string[];
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
      's3',
      'webdav',
      '역색인',
      'index',
    ],
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
] as const;

function normalize(s: string): string {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/**
 * Match built-in commands by title/keyword substring.
 * Empty query returns all commands (palette suggestions).
 */
export function matchAppCommands(query: string): AppCommand[] {
  const q = normalize(query);
  if (!q) return [...APP_COMMANDS];

  return APP_COMMANDS.filter((cmd) => {
    const haystacks = [cmd.title, cmd.description, cmd.path, ...cmd.keywords].map(
      normalize,
    );
    return haystacks.some((h) => h.includes(q) || q.includes(h));
  });
}
