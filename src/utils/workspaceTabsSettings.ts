/** Workspace tabs UI + global auto-save policy (localStorage). */

const TABS_ENABLED_KEY = 's3haim_workspace_tabs';
/** Legacy mode-only key. Read when the policy object is absent. */
const AUTO_SAVE_KEY = 's3haim_workspace_tabs_auto_save';
const AUTO_SAVE_POLICY_KEY = 's3haim_auto_save_policy';
const PANE_SOFT_CAP_KEY = 's3haim_workspace_pane_soft_cap';

/** Fired on `window` when auto-save mode or delay changes. */
export const WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT = 's3haim-workspace-tabs-auto-save';

/** Fired on `window` when pane soft-cap changes. */
export const WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT = 's3haim-workspace-pane-soft-cap';

/** Ask Settings UI to scroll/focus the soft-cap field. */
export const WORKSPACE_PANE_SOFT_CAP_FOCUS_EVENT = 's3haim-focus-workspace-pane-soft-cap';

/**
 * Global auto-save styles (VS Code files.autoSave, plus idle debounce):
 * - off — never auto-save
 * - onFocusChange — save when leaving the note (other file / chat / home)
 * - onWindowChange — save when the app or browser tab loses focus
 * - afterDelay — save a fixed time after the note first becomes dirty
 * - afterDebounce — save after typing has been idle for the delay
 */
export type WorkspaceTabsAutoSaveMode =
  | 'off'
  | 'onFocusChange'
  | 'onWindowChange'
  | 'afterDelay'
  | 'afterDebounce';

export type AutoSaveDelayUnit = 'ms' | 's';

export type AutoSavePolicy = {
  mode: WorkspaceTabsAutoSaveMode;
  /** Delay amount in `unit`. Used by afterDelay and afterDebounce. */
  amount: number;
  unit: AutoSaveDelayUnit;
};

export const WORKSPACE_TABS_AUTO_SAVE_MODES = [
  'off',
  'onFocusChange',
  'onWindowChange',
  'afterDelay',
  'afterDebounce',
] as const satisfies readonly WorkspaceTabsAutoSaveMode[];

/** Matches the previous hardcoded idle save (5 seconds). */
export const WORKSPACE_TABS_AUTO_SAVE_DEFAULT: WorkspaceTabsAutoSaveMode = 'afterDebounce';

export const AUTO_SAVE_DELAY_MS_MIN = 100;
export const AUTO_SAVE_DELAY_MS_MAX = 3_600_000;
export const AUTO_SAVE_DELAY_S_MIN = 1;
export const AUTO_SAVE_DELAY_S_MAX = 3_600;

export const AUTO_SAVE_POLICY_DEFAULT: AutoSavePolicy = {
  mode: 'afterDebounce',
  amount: 5,
  unit: 's',
};

/** Default / minimum / maximum leaf panes in a split layout. */
export const WORKSPACE_PANE_SOFT_CAP_DEFAULT = 4;
export const WORKSPACE_PANE_SOFT_CAP_MIN = 2;
export const WORKSPACE_PANE_SOFT_CAP_MAX = 16;

export type WorkspaceTabsAutoSaveModeOption = {
  value: WorkspaceTabsAutoSaveMode;
  label: string;
  description: string;
};

export const WORKSPACE_TABS_AUTO_SAVE_OPTIONS: readonly WorkspaceTabsAutoSaveModeOption[] = [
  {
    value: 'off',
    label: '자동 저장 안 함',
    description: '직접 저장할 때만 기록합니다. 저장하지 않고 닫으면 확인합니다.',
  },
  {
    value: 'onFocusChange',
    label: '포커스 변경',
    description: '다른 노트·탭·채팅·홈으로 이동할 때 저장합니다.',
  },
  {
    value: 'onWindowChange',
    label: '탭·창 변경',
    description: '브라우저나 앱 창이 비활성화될 때 저장합니다.',
  },
  {
    value: 'afterDelay',
    label: '일정 시간 경과',
    description: '내용이 바뀐 시점부터 설정한 시간이 지나면 저장합니다. 이어서 입력해도 그 시각에 저장합니다.',
  },
  {
    value: 'afterDebounce',
    label: '입력 멈춘 뒤',
    description: '마지막 입력 이후 설정한 시간 동안 추가 입력이 없으면 저장합니다.',
  },
];

export function isAutoSaveMode(value: unknown): value is WorkspaceTabsAutoSaveMode {
  return (
    value === 'off' ||
    value === 'onFocusChange' ||
    value === 'onWindowChange' ||
    value === 'afterDelay' ||
    value === 'afterDebounce'
  );
}

export function isTimedAutoSaveMode(
  mode: WorkspaceTabsAutoSaveMode,
): mode is 'afterDelay' | 'afterDebounce' {
  return mode === 'afterDelay' || mode === 'afterDebounce';
}

export function isAutoSaveDelayUnit(value: unknown): value is AutoSaveDelayUnit {
  return value === 'ms' || value === 's';
}

export function clampAutoSaveAmount(amount: unknown, unit: AutoSaveDelayUnit): number {
  const n = typeof amount === 'number' ? amount : Number(amount);
  if (unit === 's') {
    if (!Number.isFinite(n)) return AUTO_SAVE_POLICY_DEFAULT.amount;
    return Math.min(AUTO_SAVE_DELAY_S_MAX, Math.max(AUTO_SAVE_DELAY_S_MIN, Math.round(n)));
  }
  if (!Number.isFinite(n)) return AUTO_SAVE_DELAY_MS_MIN;
  return Math.min(AUTO_SAVE_DELAY_MS_MAX, Math.max(AUTO_SAVE_DELAY_MS_MIN, Math.round(n)));
}

/** Keep the same duration when the user switches ms ↔ s. */
export function convertAutoSaveAmount(
  amount: number,
  from: AutoSaveDelayUnit,
  to: AutoSaveDelayUnit,
): number {
  if (from === to) return clampAutoSaveAmount(amount, to);
  if (from === 's' && to === 'ms') return clampAutoSaveAmount(amount * 1000, 'ms');
  return clampAutoSaveAmount(Math.round(amount / 1000), 's');
}

export function autoSaveDelayToMs(policy: Pick<AutoSavePolicy, 'amount' | 'unit'>): number {
  const amount = clampAutoSaveAmount(policy.amount, policy.unit);
  const ms = policy.unit === 's' ? amount * 1000 : amount;
  return Math.min(AUTO_SAVE_DELAY_MS_MAX, Math.max(AUTO_SAVE_DELAY_MS_MIN, ms));
}

function normalizePolicy(policy: AutoSavePolicy): AutoSavePolicy {
  const unit = isAutoSaveDelayUnit(policy.unit) ? policy.unit : AUTO_SAVE_POLICY_DEFAULT.unit;
  return {
    mode: isAutoSaveMode(policy.mode) ? policy.mode : AUTO_SAVE_POLICY_DEFAULT.mode,
    unit,
    amount: clampAutoSaveAmount(policy.amount, unit),
  };
}

function readStoredPolicy(): AutoSavePolicy | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTO_SAVE_POLICY_KEY);
    if (raw) {
      const data = JSON.parse(raw) as {
        mode?: unknown;
        amount?: unknown;
        unit?: unknown;
      };
      if (isAutoSaveMode(data.mode)) {
        const unit = isAutoSaveDelayUnit(data.unit) ? data.unit : 's';
        return normalizePolicy({
          mode: data.mode,
          unit,
          amount: Number(data.amount),
        });
      }
    }
  } catch {
    // ignore
  }
  try {
    const legacy = window.localStorage.getItem(AUTO_SAVE_KEY);
    if (isAutoSaveMode(legacy) && !isTimedAutoSaveMode(legacy)) {
      return normalizePolicy({ ...AUTO_SAVE_POLICY_DEFAULT, mode: legacy });
    }
  } catch {
    // ignore
  }
  return null;
}

export function loadAutoSavePolicy(): AutoSavePolicy {
  return readStoredPolicy() ?? AUTO_SAVE_POLICY_DEFAULT;
}

export function saveAutoSavePolicy(policy: AutoSavePolicy): AutoSavePolicy {
  const next = normalizePolicy(policy);
  if (typeof window === 'undefined') return next;
  try {
    window.localStorage.setItem(
      AUTO_SAVE_POLICY_KEY,
      JSON.stringify({ version: 1, mode: next.mode, amount: next.amount, unit: next.unit }),
    );
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(
      new CustomEvent(WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT, {
        detail: {
          mode: next.mode,
          amount: next.amount,
          unit: next.unit,
          delayMs: autoSaveDelayToMs(next),
        },
      }),
    );
  } catch {
    // ignore
  }
  return next;
}

export function clampWorkspacePaneSoftCap(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return WORKSPACE_PANE_SOFT_CAP_DEFAULT;
  return Math.min(
    WORKSPACE_PANE_SOFT_CAP_MAX,
    Math.max(WORKSPACE_PANE_SOFT_CAP_MIN, Math.round(n)),
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
  return loadAutoSavePolicy().mode;
}

export function saveWorkspaceTabsAutoSaveMode(mode: WorkspaceTabsAutoSaveMode): void {
  const current = loadAutoSavePolicy();
  saveAutoSavePolicy({
    ...current,
    mode: isAutoSaveMode(mode) ? mode : current.mode,
  });
}

export function loadWorkspacePaneSoftCap(): number {
  if (typeof window === 'undefined') return WORKSPACE_PANE_SOFT_CAP_DEFAULT;
  try {
    const raw = window.localStorage.getItem(PANE_SOFT_CAP_KEY);
    if (raw == null || raw === '') return WORKSPACE_PANE_SOFT_CAP_DEFAULT;
    return clampWorkspacePaneSoftCap(Number(raw));
  } catch {
    return WORKSPACE_PANE_SOFT_CAP_DEFAULT;
  }
}

export function saveWorkspacePaneSoftCap(value: number): number {
  const next = clampWorkspacePaneSoftCap(value);
  if (typeof window === 'undefined') return next;
  try {
    window.localStorage.setItem(PANE_SOFT_CAP_KEY, String(next));
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(
      new CustomEvent(WORKSPACE_PANE_SOFT_CAP_CHANGED_EVENT, { detail: { softCap: next } }),
    );
  } catch {
    // ignore
  }
  return next;
}

export function requestFocusWorkspacePaneSoftCapSetting(): void {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent(WORKSPACE_PANE_SOFT_CAP_FOCUS_EVENT));
  } catch {
    // ignore
  }
}
