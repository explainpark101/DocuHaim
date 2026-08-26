import { CLIPBOARD_IMAGE_DEBUG, dbgClipboard, fileSummaries } from '@/utils/clipboardImageDebug';

/**
 * ClipboardEvent.clipboardData 에서 이미지 File 후보를 모은다.
 * Windows/Chrome 등에서 스크린샷 붙여넣기 시 MIME 이 비어 있는 경우가 있어 `type` 없이도 후보에 포함한다.
 * (실제 업로드 단계에서 시그니처로 이미지 여부를 다시 확인한다.)
 *
 * @param {DataTransfer | Clipboard} data
 * @returns {File[]}
 */
export function collectClipboardImageFiles(data: any) {
  if (CLIPBOARD_IMAGE_DEBUG) {
    dbgClipboard('collect:incoming', {
      hasData: Boolean(data),
      filesLength: data?.files?.length ?? 0,
      itemsLength: data?.items?.length ?? 0,
    });
  }
  if (!data) {
    dbgClipboard('collect:result', { count: 0, reason: 'no data' });
    return [];
  }
  const out: any = [];
  /** 동일 붙여넣기에서 `files`·`items`가 같은 이미지를 다른 File(이름·lastModified·MIME 불일치)로 줄 수 있음 */
  const seen = new Set();

  const push = (file: any) => {
    if (!file || !file.size) return;
    const key = String(file.size);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(file);
  };

  if (data.files?.length) {
    for (const f of data.files) {
      if (!f) continue;
      if (f.type?.startsWith('image/')) push(f);
      else if (!f.type && f.size > 0) push(f);
    }
  }

  if (data.items) {
    for (const item of data.items) {
      if (item.kind !== 'file') continue;
      const t = item.type || '';
      if (t.startsWith('image/') || t === '') {
        const file = item.getAsFile();
        if (file) push(file);
      }
    }
  }

  dbgClipboard('collect:result', {
    count: out.length,
    files: fileSummaries(out),
  });
  return out;
}
