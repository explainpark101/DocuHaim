/** Phases reported by usePagedJsPreview for the Export PDF loading UI. */
export type ExportPdfPagedStatus =
  | 'idle'
  | 'settling'
  | 'waiting-preview'
  | 'waiting-images'
  | 'loading-engine'
  | 'paginating'
  | 'error';

export const EXPORT_PDF_PAGED_STATUS_LABEL: Record<ExportPdfPagedStatus, string> = {
  idle: '',
  settling: '미리보기 준비 중…',
  'waiting-preview': '마크다운 렌더 대기 중…',
  'waiting-images': '이미지 로딩 중…',
  'loading-engine': '페이지 엔진 로딩 중…',
  paginating: '페이지 나누는 중…',
  error: '미리보기 생성 실패',
};

export function isExportPdfPagedBusy(status: ExportPdfPagedStatus): boolean {
  return status !== 'idle' && status !== 'error';
}
