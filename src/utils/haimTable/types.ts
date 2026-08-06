/** Shared cell / section / template-rule style (JSON camelCase). */
export type HaimTableStyle = {
  bg?: string;
  borderInner?: string;
  borderOuter?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
};

export type HaimTableSectionKey = 'thead' | 'tbody' | 'tfoot';

/** Table box width: full page width vs content-sized (fit). */
export type HaimTableWidth = 'full' | 'fit';

/** Horizontal alignment when `width` is `fit` (or when box size is set). Ignored for bare `full`. */
export type HaimTableAlign = 'left' | 'right';

export type HaimTableSections = Partial<Record<HaimTableSectionKey, HaimTableStyle>>;

export type HaimTableMerge = {
  r: number;
  c: number;
  colspan: number;
  rowspan: number;
};

/** Cell key `"row,col"` → style override. */
export type HaimTableCells = Record<string, HaimTableStyle>;

export type HaimTableMeta = {
  v: 1;
  headerRows: number;
  footerRows: number;
  /** `full` = 100% page width; `fit` = shrink to content. Default `full`. */
  width: HaimTableWidth;
  /** Horizontal align for `fit` / boxed tables. Default `left`. */
  align: HaimTableAlign;
  /**
   * Explicit table box size (e.g. `"320px"`, `"50%"`).
   * When set, overrides the `full`/`fit` width CSS for that axis.
   */
  boxWidth?: string;
  boxHeight?: string;
  /**
   * Per-column widths / per-row heights (CSS lengths, e.g. `"120px"`).
   * Index aligns with grid columns / data rows. Empty string = auto.
   */
  colWidths?: string[];
  rowHeights?: string[];
  merges: HaimTableMerge[];
  /**
   * Whole-table default style (e.g. fontFamily).
   * Priority: cell > section > style > template …
   */
  style: HaimTableStyle;
  sections: HaimTableSections;
  cells: HaimTableCells;
  templateId?: string;
  templateOverrides?: Partial<HaimTableMeta>;
};

/** YAML template rule (snake_case in file; normalized to camelCase in memory). */
export type HaimTableTemplateRule = HaimTableStyle & {
  rows?: string;
  cols?: string;
};

export type HaimTableTemplate = {
  id: string;
  name: string;
  sections?: HaimTableSections;
  rules?: HaimTableTemplateRule[];
};

export type HaimTableStyleSettings = {
  version: 1;
  templates: HaimTableTemplate[];
};

export type HaimTableGrid = {
  /** Row-major cell text (including separator-free body rows). */
  rows: string[][];
  /** Column alignments from separator row: 'left' | 'center' | 'right' | null */
  aligns: Array<'left' | 'center' | 'right' | null>;
};

export type HaimTableBlock = {
  /** Absolute start offset of comment (or table if no comment). */
  start: number;
  /** Absolute end offset (exclusive) of table. */
  end: number;
  commentStart: number | null;
  commentEnd: number | null;
  tableStart: number;
  tableEnd: number;
  meta: HaimTableMeta | null;
  grid: HaimTableGrid;
  rawComment: string | null;
  rawTable: string;
};

export const HAIM_TABLE_VERSION = 1 as const;

export const STYLE_KEYS = [
  'bg',
  'borderInner',
  'borderOuter',
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
] as const satisfies ReadonlyArray<keyof HaimTableStyle>;

export function cellKey(r: number, c: number): string {
  return `${r},${c}`;
}

export function parseCellKey(key: string): { r: number; c: number } | null {
  const m = /^(\d+),(\d+)$/.exec(key);
  if (!m) return null;
  return { r: Number(m[1]), c: Number(m[2]) };
}

export function createDefaultHaimTableMeta(): HaimTableMeta {
  return {
    v: 1,
    headerRows: 1,
    footerRows: 0,
    width: 'full',
    align: 'left',
    merges: [],
    style: {},
    sections: {},
    cells: {},
  };
}
