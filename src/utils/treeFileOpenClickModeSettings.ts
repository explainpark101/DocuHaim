/**
 * Sidebar TreeNode: open file on single click vs double click (mouse/pen).
 * Touch keeps single-tap open unless the user chooses double-click mode.
 */

export const TREE_FILE_OPEN_CLICK = 'click' as const;
export const TREE_FILE_OPEN_DBLCLICK = 'dblclick' as const;

export type TreeFileOpenClickMode =
  | typeof TREE_FILE_OPEN_CLICK
  | typeof TREE_FILE_OPEN_DBLCLICK;

const LOCAL_STORAGE_KEY = 's3haim_tree_file_open_click_mode';

/** Default: double-click (preserves classic desktop sidebar behavior). */
export const TREE_FILE_OPEN_CLICK_MODE_DEFAULT: TreeFileOpenClickMode =
  TREE_FILE_OPEN_DBLCLICK;

export type TreeFileOpenClickModeOption = {
  value: TreeFileOpenClickMode;
  label: string;
  description: string;
};

export const TREE_FILE_OPEN_CLICK_MODE_OPTIONS: readonly TreeFileOpenClickModeOption[] =
  [
    {
      value: TREE_FILE_OPEN_CLICK,
      label: '클릭으로 열기',
      description: '파일을 한 번 클릭(또는 탭)하면 탭으로 엽니다.',
    },
    {
      value: TREE_FILE_OPEN_DBLCLICK,
      label: '더블클릭으로 열기',
      description: '파일을 더블클릭(또는 더블탭)해야 탭으로 엽니다. 한 번 클릭은 선택만 합니다.',
    },
  ] as const;

export function isTreeFileOpenClickMode(value: unknown): value is TreeFileOpenClickMode {
  return value === TREE_FILE_OPEN_CLICK || value === TREE_FILE_OPEN_DBLCLICK;
}

export function loadTreeFileOpenClickMode(): TreeFileOpenClickMode {
  if (typeof window === 'undefined') return TREE_FILE_OPEN_CLICK_MODE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isTreeFileOpenClickMode(raw)) return raw;
  } catch {
    // ignore
  }
  return TREE_FILE_OPEN_CLICK_MODE_DEFAULT;
}

/** Fired on `window` when the preference changes (same tab). */
export const TREE_FILE_OPEN_CLICK_MODE_CHANGED_EVENT =
  's3haim-tree-file-open-click-mode';

export function saveTreeFileOpenClickMode(mode: string): void {
  if (typeof window === 'undefined') return;
  if (!isTreeFileOpenClickMode(mode)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    window.dispatchEvent(
      new CustomEvent(TREE_FILE_OPEN_CLICK_MODE_CHANGED_EVENT, {
        detail: { mode },
      }),
    );
  } catch {
    // ignore
  }
}

/** Advanced Search toggle: enabled = open on single click. */
export function loadTreeFileOpenOnClickEnabled(): boolean {
  return loadTreeFileOpenClickMode() === TREE_FILE_OPEN_CLICK;
}

export function saveTreeFileOpenOnClickEnabled(enabled: boolean): void {
  saveTreeFileOpenClickMode(enabled ? TREE_FILE_OPEN_CLICK : TREE_FILE_OPEN_DBLCLICK);
}
