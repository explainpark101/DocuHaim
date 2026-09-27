/**
 * Editor image horizontal alignment (wiki + markdown images in preview / WYSIWYG).
 * Default: center.
 */

export type EditorImageAlign = 'left' | 'center' | 'right';

const LOCAL_STORAGE_KEY = 's3haim_editor_image_align';
const DOM_ATTR = 'data-editor-image-align';

export const EDITOR_IMAGE_ALIGN_DEFAULT: EditorImageAlign = 'center';

export const EDITOR_IMAGE_ALIGN_CHANGED_EVENT = 's3haim-editor-image-align';

export type EditorImageAlignOption = {
  value: EditorImageAlign;
  label: string;
  description: string;
};

export const EDITOR_IMAGE_ALIGN_OPTIONS: readonly EditorImageAlignOption[] = [
  {
    value: 'left',
    label: '왼쪽',
    description: '이미지를 왼쪽에 붙입니다.',
  },
  {
    value: 'center',
    label: '가운데',
    description: '이미지를 가운데 정렬합니다. (기본값)',
  },
  {
    value: 'right',
    label: '오른쪽',
    description: '이미지를 오른쪽에 붙입니다.',
  },
] as const;

export function isEditorImageAlign(value: unknown): value is EditorImageAlign {
  return value === 'left' || value === 'center' || value === 'right';
}

export function applyEditorImageAlignDom(align: EditorImageAlign): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(DOM_ATTR, align);
}

export function loadEditorImageAlign(): EditorImageAlign {
  if (typeof window === 'undefined') return EDITOR_IMAGE_ALIGN_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isEditorImageAlign(raw)) return raw;
  } catch {
    // ignore
  }
  return EDITOR_IMAGE_ALIGN_DEFAULT;
}

export function saveEditorImageAlign(align: EditorImageAlign): void {
  if (typeof window === 'undefined') return;
  if (!isEditorImageAlign(align)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, align);
  } catch {
    // ignore
  }
}

export function setEditorImageAlign(align: EditorImageAlign): void {
  if (!isEditorImageAlign(align)) return;
  saveEditorImageAlign(align);
  applyEditorImageAlignDom(align);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EDITOR_IMAGE_ALIGN_CHANGED_EVENT, {
        detail: { align },
      }),
    );
  }
}

/** Call once at app boot. */
export function initEditorImageAlignDom(): void {
  applyEditorImageAlignDom(loadEditorImageAlign());
}
