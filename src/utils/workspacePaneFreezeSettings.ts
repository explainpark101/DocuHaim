/**
 * Split-pane freeze (isSurfaceLive=false) for md-editor-rt / editor panes.
 *
 * Modes:
 * - off — never freeze (not recommended; heavier when many splits are open)
 * - hover-or-focus — live while hovered or keyboard focus-within
 * - focus — live only while keyboard focus-within
 */

const LOCAL_STORAGE_KEY = 's3haim_workspace_pane_freeze';

/** Fired on `window` when the freeze preference changes. */
export const WORKSPACE_PANE_FREEZE_CHANGED_EVENT = 's3haim-workspace-pane-freeze';

export type WorkspacePaneFreezeMode = 'off' | 'hover-or-focus' | 'focus';

export const WORKSPACE_PANE_FREEZE_MODES = [
  'off',
  'hover-or-focus',
  'focus',
] as const satisfies readonly WorkspacePaneFreezeMode[];

/** Default: unfreeze on hover or keyboard focus. */
export const WORKSPACE_PANE_FREEZE_DEFAULT: WorkspacePaneFreezeMode = 'hover-or-focus';

export type WorkspacePaneFreezeModeOption = {
  value: WorkspacePaneFreezeMode;
  label: string;
  description: string;
};

export const WORKSPACE_PANE_FREEZE_OPTIONS: readonly WorkspacePaneFreezeModeOption[] = [
  {
    value: 'off',
    label: '프리징 없음 (비권장)',
    description:
      '모든 분할 페인을 항상 활성으로 둡니다. 분할이 많을 때 성능이 떨어질 수 있습니다.',
  },
  {
    value: 'hover-or-focus',
    label: '호버 또는 키보드 포커스 시 해제',
    description:
      '마우스가 올라가 있거나 키보드 포커스가 있을 때만 무거운 작업을 재개합니다.',
  },
  {
    value: 'focus',
    label: '키보드 포커스 시에만 해제',
    description:
      '키보드 포커스가 있는 페인만 활성입니다. 호버만으로는 풀리지 않습니다.',
  },
];

function isFreezeMode(value: unknown): value is WorkspacePaneFreezeMode {
  return value === 'off' || value === 'hover-or-focus' || value === 'focus';
}

/** Migrate legacy boolean storage (`'0'` / `'1'`) to mode strings. */
function migrateLegacyFreezeValue(raw: string | null): WorkspacePaneFreezeMode | null {
  if (raw == null || raw === '') return null;
  if (isFreezeMode(raw)) return raw;
  if (raw === '0') return 'off';
  if (raw === '1') return 'hover-or-focus';
  return null;
}

export function loadWorkspacePaneFreezeMode(): WorkspacePaneFreezeMode {
  if (typeof window === 'undefined') return WORKSPACE_PANE_FREEZE_DEFAULT;
  try {
    const migrated = migrateLegacyFreezeValue(
      window.localStorage.getItem(LOCAL_STORAGE_KEY),
    );
    if (migrated) return migrated;
  } catch {
    // ignore
  }
  return WORKSPACE_PANE_FREEZE_DEFAULT;
}

export function saveWorkspacePaneFreezeMode(mode: WorkspacePaneFreezeMode): void {
  if (typeof window === 'undefined') return;
  const next = isFreezeMode(mode) ? mode : WORKSPACE_PANE_FREEZE_DEFAULT;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, next);
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(
      new CustomEvent(WORKSPACE_PANE_FREEZE_CHANGED_EVENT, {
        detail: { mode: next },
      }),
    );
  } catch {
    // ignore
  }
}

/** Whether a visible split pane should keep its editor surface live. */
export function isWorkspacePaneSurfaceLive(
  mode: WorkspacePaneFreezeMode,
  state: { hovered: boolean; focusWithin: boolean },
): boolean {
  if (mode === 'off') return true;
  if (mode === 'hover-or-focus') return state.hovered || state.focusWithin;
  return state.focusWithin;
}
