/**
 * Collect image File candidates from ClipboardEvent.clipboardData.
 * Some paste paths (e.g. Windows screenshot) omit MIME — include empty-type files;
 * upload stage re-checks via signature.
 */

type ClipboardImageSource = {
  files?: FileList | null;
  items?: DataTransferItemList | null;
};

export function collectClipboardImageFiles(
  data: ClipboardImageSource | null | undefined,
): File[] {
  if (!data) return [];

  const out: File[] = [];
  /** Same paste may expose the same image via both `files` and `items`. */
  const seen = new Set<string>();

  const push = (file: File | null | undefined) => {
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
        push(item.getAsFile());
      }
    }
  }

  return out;
}
