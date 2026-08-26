import {
  getPrintPageSize,
  mmToCssPx,
  type PrintPageSizeId,
} from '@/utils/print/printPageLayout';

const LOCAL_STORAGE_KEY = 's3haim_print_preview_view';

export type PrintPreviewNavigation = 'scroll' | 'flip';
export type PrintPreviewPageCount = 1 | 2;

export type PrintPreviewViewState = {
  navigation: PrintPreviewNavigation;
  pages: PrintPreviewPageCount;
  firstPageSingle: boolean;
  zoomPercent: number;
};

export const PRINT_ZOOM_MIN = 25;
export const PRINT_ZOOM_MAX = 400;
export const PRINT_ZOOM_STEP = 5;
export const PRINT_SPREAD_GAP_PX = 16;

export const DEFAULT_PRINT_PREVIEW_VIEW: PrintPreviewViewState = {
  navigation: 'scroll',
  pages: 1,
  firstPageSingle: true,
  zoomPercent: 100,
};

/** One spread row. `centerSingle` = show the lone page centered (no blank sheet). */
export type PrintSpreadPair = {
  left: number | null;
  right: number | null;
  centerSingle?: boolean;
};

export function clampZoomPercent(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_PRINT_PREVIEW_VIEW.zoomPercent;
  const rounded = Math.round(value / PRINT_ZOOM_STEP) * PRINT_ZOOM_STEP;
  return Math.min(PRINT_ZOOM_MAX, Math.max(PRINT_ZOOM_MIN, rounded));
}

export function stepZoomPercent(current: number, direction: 1 | -1): number {
  return clampZoomPercent(current + direction * PRINT_ZOOM_STEP);
}

export function isPrintPreviewNavigation(value: unknown): value is PrintPreviewNavigation {
  return value === 'scroll' || value === 'flip';
}

export function isPrintPreviewPageCount(value: unknown): value is PrintPreviewPageCount {
  return value === 1 || value === 2;
}

/**
 * Build left/right page index pairs (0-based logical pages).
 * When firstPageSingle, page 0 is a centered solo spread (no blank companion page);
 * then (1|2), (3|4), …
 */
export function buildSpreadPairs(
  pageCount: number,
  firstPageSingle: boolean,
): PrintSpreadPair[] {
  const n = Math.max(0, Math.floor(pageCount));
  if (n === 0) return [{ left: null, right: null }];

  const pairs: PrintSpreadPair[] = [];
  let i = 0;
  if (firstPageSingle) {
    pairs.push({ left: 0, right: null, centerSingle: true });
    i = 1;
  }
  while (i < n) {
    const left = i;
    const right = i + 1 < n ? i + 1 : null;
    pairs.push({ left, right });
    i += 2;
  }
  return pairs;
}

export function spreadIndexForPage(
  pairs: readonly PrintSpreadPair[],
  pageIndex: number,
): number {
  for (let s = 0; s < pairs.length; s += 1) {
    const pair = pairs[s];
    if (!pair) continue;
    if (pair.left === pageIndex || pair.right === pageIndex) return s;
  }
  return 0;
}

export function pagesInSpread(pair: PrintSpreadPair): number[] {
  const out: number[] = [];
  if (pair.left != null) out.push(pair.left);
  if (pair.right != null) out.push(pair.right);
  return out;
}

/** Full page outer size in CSS px for a print page size id. */
export function getPrintPageOuterSizePx(pageSizeId: PrintPageSizeId): {
  widthPx: number;
  heightPx: number;
} {
  const page = getPrintPageSize(pageSizeId);
  return {
    widthPx: Math.max(1, Math.round(mmToCssPx(page.widthMm))),
    heightPx: Math.max(1, Math.round(mmToCssPx(page.heightMm))),
  };
}

/**
 * Fit zoom so `pageCols` pages side-by-side (+ gaps) fit in the viewport.
 * Returns a clamped percent (may be finer than 5% for fit; callers may keep as-is).
 */
export function computeFitZoomPercent(options: {
  viewportWidth: number;
  viewportHeight: number;
  pageWidthPx: number;
  pageHeightPx: number;
  pageCols: 1 | 2;
  gapPx?: number;
  paddingPx?: number;
}): number {
  const {
    viewportWidth,
    viewportHeight,
    pageWidthPx,
    pageHeightPx,
    pageCols,
    gapPx = PRINT_SPREAD_GAP_PX,
    paddingPx = 32,
  } = options;
  const availW = Math.max(1, viewportWidth - paddingPx * 2);
  const availH = Math.max(1, viewportHeight - paddingPx * 2);
  const contentW = pageWidthPx * pageCols + (pageCols > 1 ? gapPx : 0);
  const contentH = pageHeightPx;
  const scale = Math.min(availW / contentW, availH / contentH);
  const percent = Math.floor((scale * 100) / PRINT_ZOOM_STEP) * PRINT_ZOOM_STEP;
  return Math.min(PRINT_ZOOM_MAX, Math.max(PRINT_ZOOM_MIN, percent || PRINT_ZOOM_MIN));
}

export function loadPrintPreviewView(): PrintPreviewViewState {
  if (typeof window === 'undefined') return { ...DEFAULT_PRINT_PREVIEW_VIEW };
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PRINT_PREVIEW_VIEW };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_PRINT_PREVIEW_VIEW };
    const record = parsed as Record<string, unknown>;
    return {
      navigation: isPrintPreviewNavigation(record.navigation)
        ? record.navigation
        : DEFAULT_PRINT_PREVIEW_VIEW.navigation,
      pages: isPrintPreviewPageCount(record.pages)
        ? record.pages
        : DEFAULT_PRINT_PREVIEW_VIEW.pages,
      firstPageSingle:
        typeof record.firstPageSingle === 'boolean'
          ? record.firstPageSingle
          : DEFAULT_PRINT_PREVIEW_VIEW.firstPageSingle,
      zoomPercent: clampZoomPercent(
        typeof record.zoomPercent === 'number'
          ? record.zoomPercent
          : DEFAULT_PRINT_PREVIEW_VIEW.zoomPercent,
      ),
    };
  } catch {
    return { ...DEFAULT_PRINT_PREVIEW_VIEW };
  }
}

export function savePrintPreviewView(state: PrintPreviewViewState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}
