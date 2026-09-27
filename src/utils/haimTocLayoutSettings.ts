/**
 * Haim Editor TOC layout:
 * - overlay: absolute over the editor (no layout width) — default
 * - dock: flex side panel that pushes content
 */

export const HAIM_TOC_LAYOUT_OVERLAY = 'overlay';
export const HAIM_TOC_LAYOUT_DOCK = 'dock';

export type HaimTocLayout =
  | typeof HAIM_TOC_LAYOUT_OVERLAY
  | typeof HAIM_TOC_LAYOUT_DOCK;

const LOCAL_STORAGE_KEY = 's3haim_haim_toc_layout';

export const HAIM_TOC_LAYOUT_DEFAULT: HaimTocLayout = HAIM_TOC_LAYOUT_OVERLAY;

/** Fired on `window` when the preference changes. */
export const HAIM_TOC_LAYOUT_CHANGED_EVENT = 's3haim-haim-toc-layout';

export type HaimTocLayoutOption = {
  value: HaimTocLayout;
  label: string;
  description: string;
};

export const HAIM_TOC_LAYOUT_OPTIONS: readonly HaimTocLayoutOption[] = [
  {
    value: HAIM_TOC_LAYOUT_OVERLAY,
    label: '오버레이',
    description: '편집 영역 위에 덮습니다. 본문 너비를 줄이지 않습니다. (기본)',
  },
  {
    value: HAIM_TOC_LAYOUT_DOCK,
    label: '사이드 패널',
    description: '편집 영역 옆에 자리를 차지하는 목차입니다.',
  },
] as const;

export function isHaimTocLayout(value: unknown): value is HaimTocLayout {
  return value === HAIM_TOC_LAYOUT_OVERLAY || value === HAIM_TOC_LAYOUT_DOCK;
}

export function loadHaimTocLayout(): HaimTocLayout {
  if (typeof window === 'undefined') return HAIM_TOC_LAYOUT_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isHaimTocLayout(raw)) return raw;
  } catch {
    // ignore
  }
  return HAIM_TOC_LAYOUT_DEFAULT;
}

export function saveHaimTocLayout(layout: HaimTocLayout): void {
  if (typeof window === 'undefined') return;
  if (!isHaimTocLayout(layout)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, layout);
    window.dispatchEvent(
      new CustomEvent(HAIM_TOC_LAYOUT_CHANGED_EVENT, { detail: { layout } }),
    );
  } catch {
    // ignore
  }
}

export function loadHaimTocDockEnabled(): boolean {
  return loadHaimTocLayout() === HAIM_TOC_LAYOUT_DOCK;
}

export function saveHaimTocDockEnabled(enabled: boolean): void {
  saveHaimTocLayout(enabled ? HAIM_TOC_LAYOUT_DOCK : HAIM_TOC_LAYOUT_OVERLAY);
}
