const LOCAL_STORAGE_KEY = 's3haim_print_page_layout';

/** Chromium `PrintSettings` default margin per side (1.0 cm). */
export const PRINT_PAGE_MARGIN_MM = 10;

export type PrintPageMarginsMm = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const DEFAULT_PRINT_PAGE_MARGINS_MM: PrintPageMarginsMm = {
  top: PRINT_PAGE_MARGIN_MM,
  right: PRINT_PAGE_MARGIN_MM,
  bottom: PRINT_PAGE_MARGIN_MM,
  left: PRINT_PAGE_MARGIN_MM,
};

export const ZERO_PRINT_PAGE_MARGINS_MM: PrintPageMarginsMm = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const PRINT_PAGE_MARGIN_PRESETS = [
  {
    id: 'default',
    label: '기본 (10mm)',
    margins: { ...DEFAULT_PRINT_PAGE_MARGINS_MM },
  },
  {
    id: 'none',
    label: '없음 (0)',
    margins: { ...ZERO_PRINT_PAGE_MARGINS_MM },
  },
  {
    id: 'narrow',
    label: '좁게 (5mm)',
    margins: { top: 5, right: 5, bottom: 5, left: 5 },
  },
  {
    id: 'wide',
    label: '넓게 (20mm)',
    margins: { top: 20, right: 20, bottom: 20, left: 20 },
  },
  {
    id: 'binding',
    label: '제본 (안쪽 넓게)',
    margins: { top: 15, right: 12, bottom: 15, left: 25 },
  },
] as const;

export type PrintPageMarginPresetId = (typeof PRINT_PAGE_MARGIN_PRESETS)[number]['id'];

const MARGIN_MM_MIN = 0;
const MARGIN_MM_MAX = 80;

export function clampPrintPageMarginMm(value: unknown, fallback = PRINT_PAGE_MARGIN_MM): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(MARGIN_MM_MAX, Math.max(MARGIN_MM_MIN, Math.round(n * 100) / 100));
}

export function normalizePrintPageMarginsMm(
  raw: unknown,
  fallback: PrintPageMarginsMm = DEFAULT_PRINT_PAGE_MARGINS_MM,
): PrintPageMarginsMm {
  if (!raw || typeof raw !== 'object') {
    return { ...fallback };
  }
  const o = raw as Record<string, unknown>;
  return {
    top: clampPrintPageMarginMm(o.top, fallback.top),
    right: clampPrintPageMarginMm(o.right, fallback.right),
    bottom: clampPrintPageMarginMm(o.bottom, fallback.bottom),
    left: clampPrintPageMarginMm(o.left, fallback.left),
  };
}

export function arePrintPageMarginsZero(margins: PrintPageMarginsMm | null | undefined): boolean {
  if (!margins) return false;
  return (
    margins.top === 0 &&
    margins.right === 0 &&
    margins.bottom === 0 &&
    margins.left === 0
  );
}

export function isUniformPrintPageMargins(margins: PrintPageMarginsMm): boolean {
  return (
    margins.top === margins.right &&
    margins.right === margins.bottom &&
    margins.bottom === margins.left
  );
}

export function matchPrintPageMarginPresetId(
  margins: PrintPageMarginsMm,
): PrintPageMarginPresetId | 'custom' {
  for (const preset of PRINT_PAGE_MARGIN_PRESETS) {
    const m = preset.margins;
    if (
      m.top === margins.top &&
      m.right === margins.right &&
      m.bottom === margins.bottom &&
      m.left === margins.left
    ) {
      return preset.id;
    }
  }
  return 'custom';
}

/**
 * Uniform page margin used by legacy call sites.
 * Prefer `getPrintPageMarginsMm` when sides may differ.
 */
export function getPrintPageMarginMm(zeroPageMargin = false): number {
  return zeroPageMargin ? 0 : PRINT_PAGE_MARGIN_MM;
}

export function formatPrintPageMarginsCss(margins: PrintPageMarginsMm): string {
  const t = Math.max(0, margins.top);
  const r = Math.max(0, margins.right);
  const b = Math.max(0, margins.bottom);
  const l = Math.max(0, margins.left);
  if (t === r && r === b && b === l) {
    return `${t}mm`;
  }
  return `${t}mm ${r}mm ${b}mm ${l}mm`;
}

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
  /** No @page / paged.js page margin — fill the sheet (print dialog: None). */
  zeroPageMargin: boolean;
  /** Per-side margins in mm when zeroPageMargin is false. */
  marginsMm: PrintPageMarginsMm;
};

export const DEFAULT_PRINT_PAGE_LAYOUT: PrintPageLayout = {
  pageSizeId: 'a4',
  imageMaxWidth: '718px',
  imageMaxHeight: '1047px',
  zeroPageMargin: false,
  marginsMm: { ...DEFAULT_PRINT_PAGE_MARGINS_MM },
};

/** Effective per-side margins for a layout (zeroPageMargin forces all 0). */
export function getPrintPageMarginsMm(
  layout: Pick<PrintPageLayout, 'zeroPageMargin' | 'marginsMm'>,
): PrintPageMarginsMm {
  if (layout.zeroPageMargin) return { ...ZERO_PRINT_PAGE_MARGINS_MM };
  return normalizePrintPageMarginsMm(layout.marginsMm);
}

/**
 * Apply margin edits: syncs `zeroPageMargin` when all sides are 0.
 */
export function withPrintPageMargins(
  layout: PrintPageLayout,
  marginsRaw: Partial<PrintPageMarginsMm> | PrintPageMarginsMm,
): PrintPageLayout {
  const marginsMm = normalizePrintPageMarginsMm({
    ...layout.marginsMm,
    ...marginsRaw,
  });
  const zero = arePrintPageMarginsZero(marginsMm);
  return {
    ...layout,
    marginsMm,
    zeroPageMargin: zero,
  };
}

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

function coerceMarginsArg(
  marginMm: number | PrintPageMarginsMm = PRINT_PAGE_MARGIN_MM,
): PrintPageMarginsMm {
  if (typeof marginMm === 'number') {
    const n = Math.max(0, marginMm);
    return { top: n, right: n, bottom: n, left: n };
  }
  return normalizePrintPageMarginsMm(marginMm);
}

export function getPrintPageInnerSizeMm(
  pageSizeId: PrintPageSizeId,
  marginMm: number | PrintPageMarginsMm = PRINT_PAGE_MARGIN_MM,
): {
  widthMm: number;
  heightMm: number;
} {
  const page = getPrintPageSize(pageSizeId);
  const margins = coerceMarginsArg(marginMm);
  return {
    widthMm: Math.max(0, page.widthMm - margins.left - margins.right),
    heightMm: Math.max(0, page.heightMm - margins.top - margins.bottom),
  };
}

export function getPrintPageInnerSizePx(
  pageSizeId: PrintPageSizeId,
  marginMm: number | PrintPageMarginsMm = PRINT_PAGE_MARGIN_MM,
): {
  widthPx: number;
  heightPx: number;
} {
  const inner = getPrintPageInnerSizeMm(pageSizeId, marginMm);
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
  options?: {
    shiftKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    emptyFallback?: string;
  },
): string | null {
  const source = String(raw ?? '').trim() || options?.emptyFallback || '';
  const normalized =
    normalizePrintImageMaxPx(source) ??
    (options?.emptyFallback ? normalizePrintImageMaxPx(options.emptyFallback) : null);
  if (!normalized) return null;
  const current = Number(normalized.slice(0, -2));
  if (!Number.isFinite(current)) return null;
  const mod = Boolean(options?.ctrlKey || options?.metaKey);
  const shift = Boolean(options?.shiftKey);
  // Arrow/wheel: 1px · Shift 10 · Ctrl/Cmd 50 · Ctrl/Cmd+Shift 100
  const step = mod && shift ? 100 : mod ? 50 : shift ? 10 : 1;
  return formatPrintImageMaxPx(current + direction * step);
}

export function loadPrintPageLayout(): PrintPageLayout {
  if (typeof window === 'undefined') return { ...DEFAULT_PRINT_PAGE_LAYOUT, marginsMm: { ...DEFAULT_PRINT_PAGE_MARGINS_MM } };
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return {
        ...DEFAULT_PRINT_PAGE_LAYOUT,
        marginsMm: { ...DEFAULT_PRINT_PAGE_MARGINS_MM },
      };
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return {
        ...DEFAULT_PRINT_PAGE_LAYOUT,
        marginsMm: { ...DEFAULT_PRINT_PAGE_MARGINS_MM },
      };
    }
    const record = parsed as Record<string, unknown>;
    const pageSizeId = isPrintPageSizeId(record.pageSizeId)
      ? record.pageSizeId
      : DEFAULT_PRINT_PAGE_LAYOUT.pageSizeId;
    let marginsMm = normalizePrintPageMarginsMm(
      record.marginsMm,
      DEFAULT_PRINT_PAGE_MARGINS_MM,
    );
    let zeroPageMargin = record.zeroPageMargin === true;
    if (zeroPageMargin) {
      marginsMm = { ...ZERO_PRINT_PAGE_MARGINS_MM };
    } else if (arePrintPageMarginsZero(marginsMm) && record.marginsMm == null) {
      // Legacy: only zeroPageMargin flag existed; keep default sides when false.
      marginsMm = { ...DEFAULT_PRINT_PAGE_MARGINS_MM };
    } else if (arePrintPageMarginsZero(marginsMm)) {
      zeroPageMargin = true;
    }
    const marginsForInner = zeroPageMargin ? ZERO_PRINT_PAGE_MARGINS_MM : marginsMm;
    const inner = getPrintPageInnerSizePx(pageSizeId, marginsForInner);
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
    return { pageSizeId, imageMaxWidth, imageMaxHeight, zeroPageMargin, marginsMm };
  } catch {
    return {
      ...DEFAULT_PRINT_PAGE_LAYOUT,
      marginsMm: { ...DEFAULT_PRINT_PAGE_MARGINS_MM },
    };
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
  const margins = getPrintPageMarginsMm(layout);
  const innerWidthMm = Math.max(0, page.widthMm - margins.left - margins.right);
  const innerHeightMm = Math.max(0, page.heightMm - margins.top - margins.bottom);
  const innerPx = getPrintPageInnerSizePx(layout.pageSizeId, margins);
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
  const uniform =
    isUniformPrintPageMargins(margins) ? margins.top : Math.min(margins.top, margins.right, margins.bottom, margins.left);
  return {
    '--print-page-width': `${page.widthMm}mm`,
    '--print-page-height': `${page.heightMm}mm`,
    '--print-page-margin': `${uniform}mm`,
    '--print-page-margin-top': `${margins.top}mm`,
    '--print-page-margin-right': `${margins.right}mm`,
    '--print-page-margin-bottom': `${margins.bottom}mm`,
    '--print-page-margin-left': `${margins.left}mm`,
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
 *
 * Default margins match Chromium print dialog "Default" (1.0 cm per side).
 * With `zeroPageMargin`, margin is 0 — pair with print dialog "None".
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

export function buildPrintPageAtRule(
  pageSizeId: PrintPageSizeId,
  marginMm: number | PrintPageMarginsMm = PRINT_PAGE_MARGIN_MM,
): string {
  const margins = coerceMarginsArg(marginMm);
  return `
    @page {
      size: ${getCssPageSizeDescriptor(pageSizeId)};
      margin: ${formatPrintPageMarginsCss(margins)};
    }
  `;
}
