const LOCAL_STORAGE_KEY = 's3haim_tree_hover_expand';

export type TreeHoverExpandUnit = 's' | 'ms';

export type TreeHoverExpandSettings = {
  value: number;
  unit: TreeHoverExpandUnit;
};

export const DEFAULT_TREE_HOVER_EXPAND: TreeHoverExpandSettings = {
  value: 2,
  unit: 's',
};

export function normalizeTreeHoverExpandSettings(raw: unknown): TreeHoverExpandSettings {
  const obj =
    raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
  const unit: TreeHoverExpandUnit = obj?.unit === 'ms' ? 'ms' : 's';
  const parsed =
    typeof obj?.value === 'number'
      ? obj.value
      : typeof obj?.value === 'string'
        ? Number(obj.value)
        : Number.NaN;
  const value =
    Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_TREE_HOVER_EXPAND.value;
  return { value, unit };
}

export function loadTreeHoverExpandSettings(): TreeHoverExpandSettings {
  if (typeof window === 'undefined') return { ...DEFAULT_TREE_HOVER_EXPAND };
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_TREE_HOVER_EXPAND };
    return normalizeTreeHoverExpandSettings(JSON.parse(raw) as unknown);
  } catch {
    return { ...DEFAULT_TREE_HOVER_EXPAND };
  }
}

export function saveTreeHoverExpandSettings(settings: TreeHoverExpandSettings): void {
  if (typeof window === 'undefined') return;
  try {
    const normalized = normalizeTreeHoverExpandSettings(settings);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // ignore
  }
}

export function treeHoverExpandSettingsToMs(settings: TreeHoverExpandSettings): number {
  const { value, unit } = normalizeTreeHoverExpandSettings(settings);
  if (unit === 'ms') return Math.round(value);
  return Math.round(value * 1000);
}

/** Convert displayed value when switching unit (keep the same real delay). */
export function convertTreeHoverExpandValue(
  value: number,
  fromUnit: TreeHoverExpandUnit,
  toUnit: TreeHoverExpandUnit,
): number {
  if (fromUnit === toUnit) return value;
  const n =
    Number.isFinite(value) && value >= 0 ? value : DEFAULT_TREE_HOVER_EXPAND.value;
  if (fromUnit === 's' && toUnit === 'ms') return Math.round(n * 1000);
  // Avoid floating noise for common ms→s conversions (e.g. 3000 → 3).
  return Math.round((Math.round(n) / 1000) * 1000) / 1000;
}
