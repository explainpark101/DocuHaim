const LOCAL_STORAGE_KEY = 's3haim_print_page_layout';

export const PRINT_PAGE_MARGIN_MM = 12;

export const PRINT_PAGE_SIZES = [
  { id: 'a4', label: 'A4', widthMm: 210, heightMm: 297 },
  { id: 'a4-landscape', label: 'A4 가로', widthMm: 297, heightMm: 210 },
  { id: 'a3', label: 'A3', widthMm: 297, heightMm: 420 },
  { id: 'a3-landscape', label: 'A3 가로', widthMm: 420, heightMm: 297 },
  { id: 'a5', label: 'A5', widthMm: 148, heightMm: 210 },
  { id: 'a5-landscape', label: 'A5 가로', widthMm: 210, heightMm: 148 },
  { id: 'b5', label: 'B5', widthMm: 176, heightMm: 250 },
  { id: 'b5-landscape', label: 'B5 가로', widthMm: 250, heightMm: 176 },
  { id: 'letter', label: 'Letter', widthMm: 215.9, heightMm: 279.4 },
  { id: 'letter-landscape', label: 'Letter 가로', widthMm: 279.4, heightMm: 215.9 },
  { id: 'legal', label: 'Legal', widthMm: 215.9, heightMm: 355.6 },
  { id: 'legal-landscape', label: 'Legal 가로', widthMm: 355.6, heightMm: 215.9 },
  { id: 'tabloid', label: 'Tabloid', widthMm: 279.4, heightMm: 431.8 },
  { id: 'tabloid-landscape', label: 'Tabloid 가로', widthMm: 431.8, heightMm: 279.4 },
] as const;

export type PrintPageSizeId = (typeof PRINT_PAGE_SIZES)[number]['id'];
export type PrintPageSize = (typeof PRINT_PAGE_SIZES)[number];

export type PrintPageLayout = {
  pageSizeId: PrintPageSizeId;
  imageMaxWidth: string;
  imageMaxHeight: string;
};

export const DEFAULT_PRINT_PAGE_LAYOUT: PrintPageLayout = {
  pageSizeId: 'a4',
  imageMaxWidth: '703px',
  imageMaxHeight: '1032px',
};

const PAGE_SIZE_IDS = new Set<string>(PRINT_PAGE_SIZES.map((size) => size.id));

export function isPrintPageSizeId(value: unknown): value is PrintPageSizeId {
  return typeof value === 'string' && PAGE_SIZE_IDS.has(value);
}

const FALLBACK_PAGE_SIZE: PrintPageSize = PRINT_PAGE_SIZES[0]!;

export function getPrintPageSize(id: PrintPageSizeId): PrintPageSize {
  return PRINT_PAGE_SIZES.find((size) => size.id === id) ?? FALLBACK_PAGE_SIZE;
}

/** Empty string clears the override. Invalid input returns null. */
export function normalizePrintSizeValue(raw: string): string | null {
  const value = String(raw ?? '').trim();
  if (!value) return '';
  if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`;
  const match = value.match(/^(\d+(?:\.\d+)?)(px|%|vh|vw|mm|cm|in)$/i);
  if (!match?.[1] || !match[2]) return null;
  return `${match[1]}${match[2].toLowerCase()}`;
}

export function mmToCssPx(mm: number): number {
  return (mm * 96) / 25.4;
}

export function getPrintPageInnerSizeMm(pageSizeId: PrintPageSizeId): {
  widthMm: number;
  heightMm: number;
} {
  const page = getPrintPageSize(pageSizeId);
  return {
    widthMm: Math.max(0, page.widthMm - PRINT_PAGE_MARGIN_MM * 2),
    heightMm: Math.max(0, page.heightMm - PRINT_PAGE_MARGIN_MM * 2),
  };
}

export function getPrintPageInnerSizePx(pageSizeId: PrintPageSizeId): {
  widthPx: number;
  heightPx: number;
} {
  const inner = getPrintPageInnerSizeMm(pageSizeId);
  return {
    widthPx: Math.max(1, Math.round(mmToCssPx(inner.widthMm))),
    heightPx: Math.max(1, Math.round(mmToCssPx(inner.heightMm))),
  };
}

const PRINT_IMAGE_MAX_PX_MIN = 1;
const PRINT_IMAGE_MAX_PX_MAX = 20000;

/** Print preview image max W/H: px only. Bare numbers become px. */
export function normalizePrintImageMaxPx(raw: string): string | null {
  const value = String(raw ?? '').trim();
  if (!value) return null;
  if (/^\d+$/.test(value)) {
    return formatPrintImageMaxPx(Number(value));
  }
  const match = value.match(/^(\d+(?:\.\d+)?)px$/i);
  if (!match?.[1]) return null;
  return formatPrintImageMaxPx(Number(match[1]));
}

export function coercePrintImageMaxToPx(
  raw: unknown,
  fallbackPx: number,
  percentBasePx: number,
): string {
  if (typeof raw !== 'string') return formatPrintImageMaxPx(fallbackPx);
  const value = raw.trim();
  if (!value) return formatPrintImageMaxPx(fallbackPx);
  if (/^\d+$/.test(value)) return formatPrintImageMaxPx(Number(value));
  const match = value.match(/^(\d+(?:\.\d+)?)(px|%|vh|vw|mm|cm|in)$/i);
  if (!match?.[1] || !match[2]) return formatPrintImageMaxPx(fallbackPx);
  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) return formatPrintImageMaxPx(fallbackPx);
  const unit = match[2].toLowerCase();
  let px = fallbackPx;
  if (unit === 'px') px = amount;
  else if (unit === '%') px = (amount / 100) * percentBasePx;
  else if (unit === 'mm') px = mmToCssPx(amount);
  else if (unit === 'cm') px = mmToCssPx(amount * 10);
  else if (unit === 'in') px = amount * 96;
  else if (unit === 'vh') {
    px = (amount / 100) * (typeof window === 'undefined' ? percentBasePx : window.innerHeight);
  } else if (unit === 'vw') {
    px = (amount / 100) * (typeof window === 'undefined' ? percentBasePx : window.innerWidth);
  }
  return formatPrintImageMaxPx(px);
}

function formatPrintImageMaxPx(value: number): string {
  const rounded = Math.round(value);
  const clamped = Math.min(
    PRINT_IMAGE_MAX_PX_MAX,
    Math.max(PRINT_IMAGE_MAX_PX_MIN, Number.isFinite(rounded) ? rounded : PRINT_IMAGE_MAX_PX_MIN),
  );
  return `${clamped}px`;
}

export function stepPrintImageMaxPx(
  raw: string,
  direction: 1 | -1,
  options?: { shiftKey?: boolean; altKey?: boolean; emptyFallback?: string },
): string | null {
  const source = String(raw ?? '').trim() || options?.emptyFallback || '';
  const normalized =
    normalizePrintImageMaxPx(source) ??
    (options?.emptyFallback ? normalizePrintImageMaxPx(options.emptyFallback) : null);
  if (!normalized) return null;
  const current = Number(normalized.slice(0, -2));
  if (!Number.isFinite(current)) return null;
  const step = options?.altKey ? 1 : options?.shiftKey ? 50 : 10;
  return formatPrintImageMaxPx(current + direction * step);
}

export function loadPrintPageLayout(): PrintPageLayout {
  if (typeof window === 'undefined') return { ...DEFAULT_PRINT_PAGE_LAYOUT };
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PRINT_PAGE_LAYOUT };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_PRINT_PAGE_LAYOUT };
    const record = parsed as Record<string, unknown>;
    const pageSizeId = isPrintPageSizeId(record.pageSizeId)
      ? record.pageSizeId
      : DEFAULT_PRINT_PAGE_LAYOUT.pageSizeId;
    const inner = getPrintPageInnerSizePx(pageSizeId);
    const imageMaxWidth = coercePrintImageMaxToPx(
      record.imageMaxWidth,
      inner.widthPx,
      inner.widthPx,
    );
    const imageMaxHeight = coercePrintImageMaxToPx(
      record.imageMaxHeight,
      inner.heightPx,
      inner.heightPx,
    );
    return { pageSizeId, imageMaxWidth, imageMaxHeight };
  } catch {
    return { ...DEFAULT_PRINT_PAGE_LAYOUT };
  }
}

export function savePrintPageLayout(layout: PrintPageLayout): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layout));
  } catch {
    /* ignore quota errors */
  }
}

export function buildPrintLayoutCssVars(layout: PrintPageLayout): Record<string, string> {
  const page = getPrintPageSize(layout.pageSizeId);
  const innerWidthMm = Math.max(0, page.widthMm - PRINT_PAGE_MARGIN_MM * 2);
  const innerHeightMm = Math.max(0, page.heightMm - PRINT_PAGE_MARGIN_MM * 2);
  const innerPx = getPrintPageInnerSizePx(layout.pageSizeId);
  const maxWidth = layout.imageMaxWidth.trim() || `${innerPx.widthPx}px`;
  const maxHeight = layout.imageMaxHeight.trim() || `${innerPx.heightPx}px`;
  // Fit full-page aspect into the printable (margin) box so cover images are not
  // stretched, without overflowing @page and forcing a custom paper size.
  const coverFitScale = Math.min(
    innerWidthMm / Math.max(page.widthMm, 1e-6),
    innerHeightMm / Math.max(page.heightMm, 1e-6),
  );
  const coverFitWidthMm = page.widthMm * coverFitScale;
  const coverFitHeightMm = page.heightMm * coverFitScale;
  return {
    '--print-page-width': `${page.widthMm}mm`,
    '--print-page-height': `${page.heightMm}mm`,
    '--print-page-margin': `${PRINT_PAGE_MARGIN_MM}mm`,
    '--print-page-inner-width': `${innerWidthMm}mm`,
    '--print-page-inner-height': `${innerHeightMm}mm`,
    '--print-cover-fit-width': `${coverFitWidthMm}mm`,
    '--print-cover-fit-height': `${coverFitHeightMm}mm`,
    '--print-img-max-width': maxWidth,
    '--print-img-max-height': maxHeight,
  };
}

/**
 * CSS `@page size` keyword (e.g. `A4`) so the print/PDF dialog selects the
 * named preset instead of a custom mm×mm size.
 */
export function getCssPageSizeDescriptor(pageSizeId: PrintPageSizeId): string {
  switch (pageSizeId) {
    case 'a4':
      return 'A4';
    case 'a4-landscape':
      return 'A4 landscape';
    case 'a3':
      return 'A3';
    case 'a3-landscape':
      return 'A3 landscape';
    case 'a5':
      return 'A5';
    case 'a5-landscape':
      return 'A5 landscape';
    case 'b5':
      return 'B5';
    case 'b5-landscape':
      return 'B5 landscape';
    case 'letter':
      return 'letter';
    case 'letter-landscape':
      return 'letter landscape';
    case 'legal':
      return 'legal';
    case 'legal-landscape':
      return 'legal landscape';
    case 'tabloid':
      return 'tabloid';
    case 'tabloid-landscape':
      return 'ledger';
    default: {
      const page = getPrintPageSize(pageSizeId);
      return `${page.widthMm}mm ${page.heightMm}mm`;
    }
  }
}

export function buildPrintPageAtRule(pageSizeId: PrintPageSizeId): string {
  return `
    @page {
      size: ${getCssPageSizeDescriptor(pageSizeId)};
      margin: ${PRINT_PAGE_MARGIN_MM}mm;
    }
  `;
}
