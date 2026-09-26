/**
 * Export PDF staging preview engine preference (localStorage).
 * Independent of the note editor type, but defaults to following it.
 */

import type { PreviewEngineHint } from '@/utils/previewEngine';

export type ExportPdfPreviewEngineId = PreviewEngineHint;

const LOCAL_STORAGE_KEY = 's3haim_export_pdf_preview_engine';

/** Default: follow Settings → markdown editor type. */
export const EXPORT_PDF_PREVIEW_ENGINE_DEFAULT: ExportPdfPreviewEngineId =
  'auto';

/** Fired on `window` when the preference changes (same tab). */
export const EXPORT_PDF_PREVIEW_ENGINE_CHANGED_EVENT =
  's3haim-export-pdf-preview-engine';

export type ExportPdfPreviewEngineOption = {
  value: ExportPdfPreviewEngineId;
  label: string;
  description: string;
};

export const EXPORT_PDF_PREVIEW_ENGINE_OPTIONS: readonly ExportPdfPreviewEngineOption[] =
  [
    {
      value: 'auto',
      label: '에디터 따라가기',
      description:
        '설정에서 고른 마크다운 에디터(기존 에디터 / Haim Editor)와 같은 엔진으로 Export PDF를 렌더링합니다.',
    },
    {
      value: 'legacy',
      label: 'md-editor-rt 기반',
      description: 'Export PDF만 md-editor-rt MdPreview로 렌더링합니다.',
    },
    {
      value: 'haim',
      label: 'Haim Editor 기반',
      description: 'Export PDF만 Haim TipTap 미리보기로 렌더링합니다.',
    },
  ] as const;

export function isExportPdfPreviewEngineId(
  value: unknown,
): value is ExportPdfPreviewEngineId {
  return value === 'auto' || value === 'legacy' || value === 'haim';
}

export function loadExportPdfPreviewEngine(): ExportPdfPreviewEngineId {
  if (typeof window === 'undefined') return EXPORT_PDF_PREVIEW_ENGINE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isExportPdfPreviewEngineId(raw)) return raw;
    if (raw != null) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        EXPORT_PDF_PREVIEW_ENGINE_DEFAULT,
      );
    }
  } catch {
    // ignore
  }
  return EXPORT_PDF_PREVIEW_ENGINE_DEFAULT;
}

export function saveExportPdfPreviewEngine(
  engine: ExportPdfPreviewEngineId,
): void {
  if (typeof window === 'undefined') return;
  if (!isExportPdfPreviewEngineId(engine)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, engine);
    window.dispatchEvent(
      new CustomEvent(EXPORT_PDF_PREVIEW_ENGINE_CHANGED_EVENT, {
        detail: { engine },
      }),
    );
  } catch {
    // ignore
  }
}
