/**
 * Markdown editor engine preference (localStorage).
 * IDs are stable; display labels are Korean/product names for Settings UI.
 */

export const EDITOR_TYPE_MD_EDITOR_RT = 'md-editor-rt';
export const EDITOR_TYPE_HAIM = 'haim';

export type EditorTypeId =
  | typeof EDITOR_TYPE_MD_EDITOR_RT
  | typeof EDITOR_TYPE_HAIM;

const LOCAL_STORAGE_KEY = 's3haim_editor_type';

/** Default remains the legacy engine until Haim reaches full parity. */
export const EDITOR_TYPE_DEFAULT: EditorTypeId = EDITOR_TYPE_MD_EDITOR_RT;

export type EditorTypeOption = {
  value: EditorTypeId;
  label: string;
  description: string;
};

export const EDITOR_TYPE_OPTIONS: readonly EditorTypeOption[] = [
  {
    value: EDITOR_TYPE_MD_EDITOR_RT,
    label: '기존 에디터',
    description:
      'md-editor-rt 기반 마크다운 소스 편집기입니다. 미리보기·위키 이미지·미러 편집 등 기존 기능 전체.',
  },
  {
    value: EDITOR_TYPE_HAIM,
    label: 'Haim Editor',
    description:
      'TipTap 기반 WYSIWYG 에디터입니다. 설정에서 소스+WYSIWYG 동시 편집(듀얼)로 전환할 수 있습니다.',
  },
] as const;

export function isEditorTypeId(value: unknown): value is EditorTypeId {
  return value === EDITOR_TYPE_MD_EDITOR_RT || value === EDITOR_TYPE_HAIM;
}

export function editorTypeLabel(type: EditorTypeId): string {
  const hit = EDITOR_TYPE_OPTIONS.find((o) => o.value === type);
  return hit?.label ?? type;
}

/** Load preference; migrates unknown / legacy `novel` to the default engine. */
export function loadEditorType(): EditorTypeId {
  if (typeof window === 'undefined') return EDITOR_TYPE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isEditorTypeId(raw)) return raw;
    if (raw != null) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, EDITOR_TYPE_DEFAULT);
    }
  } catch {
    // ignore
  }
  return EDITOR_TYPE_DEFAULT;
}

/** Fired on `window` when the editor engine preference changes (same tab). */
export const EDITOR_TYPE_CHANGED_EVENT = 's3haim-editor-type';

export function saveEditorType(type: string): void {
  if (typeof window === 'undefined') return;
  if (!isEditorTypeId(type)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, type);
    window.dispatchEvent(
      new CustomEvent(EDITOR_TYPE_CHANGED_EVENT, { detail: { type } }),
    );
  } catch {
    // ignore
  }
}
