export const NOTE_COVER_VERSION = 1 as const;

export type CoverAlign = 'left' | 'center' | 'right';
export type CoverTextAlign = 'left' | 'center' | 'right';

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
};

export type CoverElementBase = {
  id: string;
  /** Optional layer label in the sidebar. */
  name?: string;
  /** Optional group membership (Photoshop-like folder). */
  groupId?: string;
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

export type CoverElement = CoverTextElement | CoverImageElement;

export type NoteCover = {
  v: typeof NOTE_COVER_VERSION;
  enabled: boolean;
  layout: CoverLayout;
  bg: CoverBackground;
  /** Root layer stack (element or group ids), front-first. */
  rootLayerIds: string[];
  groups: CoverGroup[];
  elements: CoverElement[];
};

export const DEFAULT_COVER_LAYOUT: CoverLayout = {
  align: 'center',
  containerWidthPct: 100,
  gapPx: 16,
};

export const DEFAULT_COVER_BG: CoverBackground = {
  color: '#ffffff',
  imagePath: '',
};

export function createDefaultNoteCover(): NoteCover {
  return {
    v: NOTE_COVER_VERSION,
    enabled: true,
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

export function coverElementLabel(el: CoverElement): string {
  if (el.name?.trim()) return el.name.trim();
  if (el.type === 'text') {
    const t = el.text.trim().replace(/\s+/g, ' ');
    return t ? (t.length > 24 ? `${t.slice(0, 24)}…` : t) : '텍스트';
  }
  const leaf = el.path.split('/').pop() || el.path;
  return leaf.length > 24 ? `${leaf.slice(0, 24)}…` : leaf || '이미지';
}
