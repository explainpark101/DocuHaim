/** Workspace tabs UI + VS Code–like auto-save policy (localStorage). */

const TABS_ENABLED_KEY = 's3haim_workspace_tabs';
const AUTO_SAVE_KEY = 's3haim_workspace_tabs_auto_save';

/** Fired on `window` when auto-save mode changes. */
export const WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT = 's3haim-workspace-tabs-auto-save';

/**
 * VS Code Auto Save subset (no afterDelay):
 * - off — never auto-save on tab / window focus changes
 * - onFocusChange — save when leaving the editor tab (switch file / chat / home)
 * - onWindowChange — save when the browser window / tab loses focus
 */
export type WorkspaceTabsAutoSaveMode = 'off' | 'onFocusChange' | 'onWindowChange';

export const WORKSPACE_TABS_AUTO_SAVE_MODES = [
  'off',
  'onFocusChange',
  'onWindowChange',
] as const satisfies readonly WorkspaceTabsAutoSaveMode[];

/** Tab mode default auto-save (VS Code–like onFocusChange). */
export const WORKSPACE_TABS_AUTO_SAVE_DEFAULT: WorkspaceTabsAutoSaveMode = 'onFocusChange';

export type WorkspaceTabsAutoSaveModeOption = {
  value: WorkspaceTabsAutoSaveMode;
  label: string;
  description: string;
};

export const WORKSPACE_TABS_AUTO_SAVE_OPTIONS: readonly WorkspaceTabsAutoSaveModeOption[] = [
  {
    value: 'off',
    label: '끄기',
    description: '탭을 바꿔도 자동 저장하지 않습니다. 닫을 때 확인합니다.',
  },
  {
    value: 'onFocusChange',
    label: '포커스 변경 시',
    description: '다른 탭·채팅·홈으로 이동할 때 자동 저장합니다.',
  },
  {
    value: 'onWindowChange',
    label: '창 변경 시',
    description: '브라우저 창/탭이 비활성화될 때 자동 저장합니다.',
  },
];

function isAutoSaveMode(value: unknown): value is WorkspaceTabsAutoSaveMode {
  return (
    value === 'off' || value === 'onFocusChange' || value === 'onWindowChange'
  );
}

/** Default: off (legacy single-file / exclusive chat). Explicit `'1'` enables tab mode. */
export function loadWorkspaceTabsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(TABS_ENABLED_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveWorkspaceTabsEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(TABS_ENABLED_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

export function loadWorkspaceTabsAutoSaveMode(): WorkspaceTabsAutoSaveMode {
  if (typeof window === 'undefined') return WORKSPACE_TABS_AUTO_SAVE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(AUTO_SAVE_KEY);
    if (isAutoSaveMode(raw)) return raw;
  } catch {
    // ignore
  }
  return WORKSPACE_TABS_AUTO_SAVE_DEFAULT;
}

export function saveWorkspaceTabsAutoSaveMode(mode: WorkspaceTabsAutoSaveMode): void {
  if (typeof window === 'undefined') return;
  const next = isAutoSaveMode(mode) ? mode : WORKSPACE_TABS_AUTO_SAVE_DEFAULT;
  try {
    window.localStorage.setItem(AUTO_SAVE_KEY, next);
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(
      new CustomEvent(WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT, { detail: { mode: next } }),
    );
  } catch {
    // ignore
  }
}
