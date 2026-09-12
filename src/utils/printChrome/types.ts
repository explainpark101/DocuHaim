export type PrintChromePosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type PrintChromeNumbering = 'document' | 'body';

/** Free placement inside the chrome layer box (item center as %). */
export type PrintChromePlacement = {
  xPercent: number;
  yPercent: number;
};

export type PrintChromeTemplateBase = {
  id: string;
  enabled: boolean;
  position: PrintChromePosition;
  /** Default free placement for all pages (overrides named `position` when set). */
  placement?: PrintChromePlacement | null;
  /**
   * Per-page overrides. Keys: `cover` or `body:{0-based index}`.
   * Wins over `placement` / `position` for that page.
   */
  pagePlacements?: Record<string, PrintChromePlacement>;
};

export type PrintChromePageNumberTemplate = PrintChromeTemplateBase & {
  type: 'page-number';
  fontFamily: string;
  fontSizePx: number;
  format: string;
};

export type PrintChromeTextTemplate = PrintChromeTemplateBase & {
  type: 'text';
  fontFamily: string;
  fontSizePx: number;
  text: string;
};

export type PrintChromeImageTemplate = PrintChromeTemplateBase & {
  type: 'image';
  path: string;
  widthPx: number;
  heightPx: number;
};

export type PrintChromeTemplate =
  | PrintChromePageNumberTemplate
  | PrintChromeTextTemplate
  | PrintChromeImageTemplate;

export type PrintChromeDoc = {
  v: 1;
  showOnCover: boolean;
  numbering: PrintChromeNumbering;
  templates: PrintChromeTemplate[];
};

export const PRINT_CHROME_POSITIONS: readonly PrintChromePosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

export const PRINT_CHROME_POSITION_LABELS: Record<PrintChromePosition, string> = {
  'top-left': '좌상',
  'top-center': '중상',
  'top-right': '우상',
  'middle-left': '중좌',
  'middle-right': '중우',
  'bottom-left': '좌하',
  'bottom-center': '중하',
  'bottom-right': '우하',
};

export const DEFAULT_PRINT_CHROME_DOC: PrintChromeDoc = {
  v: 1,
  showOnCover: false,
  numbering: 'body',
  templates: [],
};

export const DEFAULT_PRINT_CHROME_PAGE_NUMBER_FORMAT = '{page}/{total}';

export const PRINT_CHROME_FONT_SIZE_MIN = 8;
export const PRINT_CHROME_FONT_SIZE_MAX = 72;
export const PRINT_CHROME_IMAGE_SIZE_MIN = 8;
export const PRINT_CHROME_IMAGE_SIZE_MAX = 800;

export function createPrintChromeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `pc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function printChromePageKey(opts: {
  isCover?: boolean;
  bodyIndex?: number | null;
}): string {
  if (opts.isCover) return 'cover';
  const idx = typeof opts.bodyIndex === 'number' && Number.isFinite(opts.bodyIndex)
    ? Math.max(0, Math.floor(opts.bodyIndex))
    : 0;
  return `body:${idx}`;
}

export function clampPrintChromePlacement(raw: unknown): PrintChromePlacement | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const x = typeof o.xPercent === 'number' ? o.xPercent : Number(o.xPercent);
  const y = typeof o.yPercent === 'number' ? o.yPercent : Number(o.yPercent);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {
    xPercent: Math.min(100, Math.max(0, Math.round(x * 100) / 100)),
    yPercent: Math.min(100, Math.max(0, Math.round(y * 100) / 100)),
  };
}

export function resolvePrintChromePlacement(
  template: PrintChromeTemplateBase,
  pageKey: string,
): PrintChromePlacement | null {
  const pageHit = template.pagePlacements?.[pageKey];
  if (pageHit) return pageHit;
  if (template.placement) return template.placement;
  return null;
}

export function applyPrintChromePlacementToAll(
  template: PrintChromeTemplate,
  placement: PrintChromePlacement,
): PrintChromeTemplate {
  const next = { ...template, placement };
  delete next.pagePlacements;
  return next;
}

export function applyPrintChromePlacementToPage(
  template: PrintChromeTemplate,
  pageKey: string,
  placement: PrintChromePlacement,
): PrintChromeTemplate {
  return {
    ...template,
    pagePlacements: {
      ...(template.pagePlacements ?? {}),
      [pageKey]: placement,
    },
  };
}

export function createDefaultPageNumberTemplate(
  partial?: Partial<PrintChromePageNumberTemplate>,
): PrintChromePageNumberTemplate {
  return {
    id: createPrintChromeId(),
    enabled: true,
    position: 'bottom-center',
    type: 'page-number',
    fontFamily: '',
    fontSizePx: 10,
    format: DEFAULT_PRINT_CHROME_PAGE_NUMBER_FORMAT,
    ...partial,
  };
}

export function createDefaultTextTemplate(
  partial?: Partial<PrintChromeTextTemplate>,
): PrintChromeTextTemplate {
  return {
    id: createPrintChromeId(),
    enabled: true,
    position: 'top-center',
    type: 'text',
    fontFamily: '',
    fontSizePx: 10,
    text: '',
    ...partial,
  };
}

export function createDefaultImageTemplate(
  partial?: Partial<PrintChromeImageTemplate>,
): PrintChromeImageTemplate {
  return {
    id: createPrintChromeId(),
    enabled: true,
    position: 'top-right',
    type: 'image',
    path: '',
    widthPx: 48,
    heightPx: 48,
    ...partial,
  };
}
