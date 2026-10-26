/**
 * Export PDF pagination mode (localStorage).
 * `flow` skips paged.js and shows a continuous paper preview.
 * `pagedjs` runs the paged.js Previewer.
 */

export type ExportPdfPaginationMode = 'flow' | 'pagedjs';

const LOCAL_STORAGE_KEY = 's3haim_export_pdf_pagination_mode';

/** Default: continuous preview, no paged.js. */
export const EXPORT_PDF_PAGINATION_MODE_DEFAULT: ExportPdfPaginationMode = 'flow';

/** Fired on `window` when the preference changes (same tab). */
export const EXPORT_PDF_PAGINATION_MODE_CHANGED_EVENT =
  's3haim-export-pdf-pagination-mode';

export type ExportPdfPaginationModeOption = {
  value: ExportPdfPaginationMode;
  label: string;
  shortLabel: string;
  description: string;
};

export const EXPORT_PDF_PAGINATION_MODE_OPTIONS: readonly ExportPdfPaginationModeOption[] =
  [
    {
      value: 'flow',
      label: '흐름 보기',
      shortLabel: '흐름',
      description:
        'Paged.js 없이 문서 흐름으로 봅니다. 인쇄는 브라우저 페이지 나누기를 사용합니다. 기본값입니다.',
    },
    {
      value: 'pagedjs',
      label: 'Paged.js',
      shortLabel: 'Paged.js',
      description:
        'Paged.js로 용지 크기에 맞춰 페이지를 나눈 미리보기를 만듭니다. 쪽번호 크롬은 이 모드에서 보입니다.',
    },
  ] as const;

export function isExportPdfPaginationMode(
  value: unknown,
): value is ExportPdfPaginationMode {
  return value === 'flow' || value === 'pagedjs';
}

export function loadExportPdfPaginationMode(): ExportPdfPaginationMode {
  if (typeof window === 'undefined') return EXPORT_PDF_PAGINATION_MODE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isExportPdfPaginationMode(raw)) return raw;
    if (raw != null) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        EXPORT_PDF_PAGINATION_MODE_DEFAULT,
      );
    }
  } catch {
    // ignore
  }
  return EXPORT_PDF_PAGINATION_MODE_DEFAULT;
}

export function saveExportPdfPaginationMode(mode: ExportPdfPaginationMode): void {
  if (typeof window === 'undefined') return;
  if (!isExportPdfPaginationMode(mode)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    window.dispatchEvent(
      new CustomEvent(EXPORT_PDF_PAGINATION_MODE_CHANGED_EVENT, {
        detail: { mode },
      }),
    );
  } catch {
    // ignore
  }
}
