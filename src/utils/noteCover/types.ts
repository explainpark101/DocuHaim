import type { PrintPageSizeId } from '@/utils/printPageLayout';

export const NOTE_COVER_VERSION = 2 as const;

export type CoverAlign = 'left' | 'center' | 'right';
export type CoverTextAlign = 'left' | 'center' | 'right';
/** Vertical placement of in-shape text within the shape box. */
export type CoverTextVAlign = 'top' | 'middle' | 'bottom';
export type CoverShapeType = 'rect' | 'ellipse' | 'roundRect';
export type CoverBorderStyle = 'solid' | 'dashed' | 'dotted';

export type CoverLayout = {
  align: CoverAlign;
  containerWidthPct: number;
  /** Spacing for restack / 2-item distribute, in CSS pixels. */
  gapPx: number;
};

export type CoverBackground = {
  color: string;
  imagePath: string;
};

export type CoverGroup = {
  id: string;
  name: string;
  /** Parent group for nesting (omit at root). */
  parentGroupId?: string;
  /**
   * Child layer ids (element or nested group), front-first for the sidebar.
   * Empty groups have [].
   */
  childIds: string[];
  /** When true, group and descendants cannot be moved/resized/edited on canvas. */
  locked?: boolean;
};

export type CoverElementBase = {
  id: string;
  /** Optional layer label in the sidebar. */
  name?: string;
  /** Optional group membership (Photoshop-like folder). */
  groupId?: string;
  /** When true, element cannot be moved/resized/edited on canvas. */
  locked?: boolean;
  /** Position/size relative to content frame (0–100 %). */
  x: number;
  y: number;
  w: number;
  h: number;
};

export type CoverTextElement = CoverElementBase & {
  type: 'text';
  text: string;
  fontSize: number;
  textAlign: CoverTextAlign;
  color: string;
  /** CSS font-weight: keyword or 100–900. */
  fontWeight: number | 'normal' | 'bold';
  fontFamily?: string;
};

export type CoverImageElement = CoverElementBase & {
  type: 'image';
  path: string;
  /**
   * When true, resize keeps aspect (무조건 비율 유지).
   * Default false: box stretch freely and image fills (object-fill).
   */
  lockAspect?: boolean;
  /** naturalWidth / naturalHeight when known */
  naturalAspect?: number;
};

export type CoverShapeElement = CoverElementBase & {
  type: CoverShapeType;
  fill: string;
  borderColor: string;
  /** CSS px */
  borderWidth: number;
  borderStyle: CoverBorderStyle;
  /** roundRect only; % of the element box. */
  cornerRadiusPct?: number;
  /** Optional in-shape text. */
  text?: string;
  textAlign?: CoverTextAlign;
  textVAlign?: CoverTextVAlign;
  fontSize?: number;
  color?: string;
  fontWeight?: number | 'normal' | 'bold';
  fontFamily?: string;
  /** Padding as % of the shape box. */
  paddingPct?: number;
};

export type CoverElement = CoverTextElement | CoverImageElement | CoverShapeElement;

/** Portable webfont CSS bundled with the cover for export / offline preview. */
export type NoteCoverWebfont = {
  /** Primary font-family name (matches element `fontFamily` first token). */
  family: string;
  /** `@font-face` / `@import` CSS needed to render this family. */
  css: string;
  /** Where the CSS was resolved from when last synced. */
  source?: 'builtin' | 'user';
};

export function isCoverShapeType(type: unknown): type is CoverShapeType {
  return type === 'rect' || type === 'ellipse' || type === 'roundRect';
}

export function isCoverShapeElement(el: CoverElement): el is CoverShapeElement {
  return isCoverShapeType(el.type);
}

export type NoteCover = {
  v: typeof NOTE_COVER_VERSION;
  enabled: boolean;
  /**
   * Paper size used while designing the cover (Export PDF page size).
   * Preview / print should honor this aspect.
   */
  pageSizeId: PrintPageSizeId;
  layout: CoverLayout;
  bg: CoverBackground;
  /** Root layer stack (element or group ids), front-first. */
  rootLayerIds: string[];
  groups: CoverGroup[];
  elements: CoverElement[];
  /**
   * Webfonts used by cover text/shape elements (builtin + user).
   * Synced on serialize / markdown download so exported notes stay portable.
   */
  webfonts?: NoteCoverWebfont[];
};

export const DEFAULT_COVER_PAGE_SIZE_ID: PrintPageSizeId = 'a4';

export const DEFAULT_COVER_LAYOUT: CoverLayout = {
  align: 'center',
  containerWidthPct: 100,
  gapPx: 16,
};

export const DEFAULT_COVER_BG: CoverBackground = {
  color: '#ffffff',
  imagePath: '',
};

export function createDefaultNoteCover(
  options?: { pageSizeId?: PrintPageSizeId },
): NoteCover {
  return {
    v: NOTE_COVER_VERSION,
    enabled: true,
    pageSizeId: options?.pageSizeId ?? DEFAULT_COVER_PAGE_SIZE_ID,
    layout: { ...DEFAULT_COVER_LAYOUT },
    bg: { ...DEFAULT_COVER_BG },
    rootLayerIds: [],
    groups: [],
    elements: [],
  };
}

function withOptionalMeta<T extends CoverElementBase>(
  el: T,
  partial?: { name?: string; groupId?: string },
): T {
  const next = { ...el };
  if (partial?.name?.trim()) next.name = partial.name.trim();
  else delete next.name;
  if (partial?.groupId?.trim()) next.groupId = partial.groupId.trim();
  else delete next.groupId;
  return next;
}

export function createCoverTextElement(
  partial?: Partial<Omit<CoverTextElement, 'type' | 'id'>> & { id?: string },
): CoverTextElement {
  const base: CoverTextElement = {
    id: partial?.id ?? crypto.randomUUID(),
    type: 'text',
    x: partial?.x ?? 10,
    y: partial?.y ?? 20,
    w: partial?.w ?? 80,
    h: partial?.h ?? 12,
    text: partial?.text ?? '제목',
    fontSize: partial?.fontSize ?? 36,
    textAlign: partial?.textAlign ?? 'left',
    color: partial?.color ?? '#111111',
    fontWeight: partial?.fontWeight ?? 'bold',
    ...(partial?.fontFamily ? { fontFamily: partial.fontFamily } : {}),
  };
  return withOptionalMeta(base, {
    ...(partial?.name != null ? { name: partial.name } : {}),
    ...(partial?.groupId != null ? { groupId: partial.groupId } : {}),
  });
}

export function createCoverImageElement(
  path: string,
  partial?: Partial<Omit<CoverImageElement, 'type' | 'id' | 'path'>> & { id?: string },
): CoverImageElement {
  const base: CoverImageElement = {
    id: partial?.id ?? crypto.randomUUID(),
    type: 'image',
    path,
    x: partial?.x ?? 20,
    y: partial?.y ?? 40,
    w: partial?.w ?? 50,
    h: partial?.h ?? 35,
    ...(partial?.lockAspect === true ? { lockAspect: true } : {}),
    ...(typeof partial?.naturalAspect === 'number' && partial.naturalAspect > 0
      ? { naturalAspect: partial.naturalAspect }
      : {}),
  };
  return withOptionalMeta(base, {
    ...(partial?.name != null ? { name: partial.name } : {}),
    ...(partial?.groupId != null ? { groupId: partial.groupId } : {}),
  });
}

const SHAPE_TYPE_LABEL: Record<CoverShapeType, string> = {
  rect: '사각형',
  ellipse: '타원',
  roundRect: '둥근 사각형',
};

export function createCoverShapeElement(
  type: CoverShapeType,
  partial?: Partial<Omit<CoverShapeElement, 'type' | 'id'>> & { id?: string },
): CoverShapeElement {
  const base: CoverShapeElement = {
    id: partial?.id ?? crypto.randomUUID(),
    type,
    x: partial?.x ?? 10,
    y: partial?.y ?? 20,
    w: partial?.w ?? 80,
    h: partial?.h ?? 30,
    fill: partial?.fill ?? '#e0f2fe',
    borderColor: partial?.borderColor ?? '#0284c7',
    borderWidth: partial?.borderWidth ?? 2,
    borderStyle: partial?.borderStyle ?? 'solid',
    ...(type === 'roundRect'
      ? { cornerRadiusPct: partial?.cornerRadiusPct ?? 4 }
      : {}),
    ...(partial?.text != null ? { text: partial.text } : {}),
    ...(partial?.textAlign != null ? { textAlign: partial.textAlign } : {}),
    ...(partial?.textVAlign != null ? { textVAlign: partial.textVAlign } : {}),
    ...(partial?.fontSize != null ? { fontSize: partial.fontSize } : {}),
    ...(partial?.color != null ? { color: partial.color } : {}),
    ...(partial?.fontWeight != null ? { fontWeight: partial.fontWeight } : {}),
    ...(partial?.fontFamily ? { fontFamily: partial.fontFamily } : {}),
    ...(partial?.paddingPct != null ? { paddingPct: partial.paddingPct } : {}),
  };
  return withOptionalMeta(base, {
    ...(partial?.name != null ? { name: partial.name } : {}),
    ...(partial?.groupId != null ? { groupId: partial.groupId } : {}),
  });
}

function truncateCoverLabel(text: string, max = 24): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** Full fallback label (no ellipsis) — path leaf, text body, or shape type. */
export function coverElementFallbackLabelFull(el: CoverElement): string {
  if (el.type === 'text') {
    const t = el.text.trim().replace(/\s+/g, ' ');
    return t || '텍스트';
  }
  if (isCoverShapeElement(el)) {
    const t = (el.text ?? '').trim().replace(/\s+/g, ' ');
    return t || SHAPE_TYPE_LABEL[el.type];
  }
  const leaf = el.path.split('/').pop() || el.path;
  return leaf || '이미지';
}

export function coverElementFallbackLabel(el: CoverElement): string {
  return truncateCoverLabel(coverElementFallbackLabelFull(el));
}

/** Value to seed the layer rename input (full string, never ellipsis-truncated). */
export function coverElementEditName(el: CoverElement): string {
  if (el.name?.trim()) return el.name.trim();
  return coverElementFallbackLabelFull(el);
}

export function coverElementLabel(el: CoverElement): string {
  if (el.name?.trim()) return el.name.trim();
  return coverElementFallbackLabel(el);
}
