/**
 * 클립보드 이미지 → S3 업로드 → 에디터 삽입 → img src 하이드레이션 디버그.
 * false 로 두면 로그 비활성화.
 */
export const CLIPBOARD_IMAGE_DEBUG = true;

/**
 * @param {string} phase 짧은 단계 이름
 * @param {unknown} [data] 직렬화 가능한 객체나 문자열
 */
export function dbgClipboard(phase, data) {
  if (!CLIPBOARD_IMAGE_DEBUG) return;
  console.debug('[s3haim clipboard-image]', phase, data ?? '');
}

/**
 * @param {File[] | Iterable<File>} files
 * @returns {{ name: string, size: number, type: string }[]}
 */
export function fileSummaries(files) {
  if (!files) return [];
  const out = [];
  for (const f of files) {
    if (!f) continue;
    out.push({
      name: f.name || '(no name)',
      size: f.size,
      type: f.type || '(empty)',
    });
  }
  return out;
}
