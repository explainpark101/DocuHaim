import { isDataImageUri } from '@/utils/markdownImageExport';
import { isPublicHttpImageUrl } from '@/utils/imgbbUpload';

const COPY_ROOT_SELECTORS = [
  '.novel-editor-surface',
  '.md-editor-preview',
];

export type ImgbbCopyCandidate = {
  id: string;
  kind: 'wiki' | 'base64';
  /** Key used to remap the cloned <img> after upload (wiki path or data URI). */
  replaceKey: string;
  label: string;
  previewSrc: string;
  fetchSrc: string;
};

function findCopyRoot(scope: ParentNode = document): Element | null {
  for (const selector of COPY_ROOT_SELECTORS) {
    const roots = [...scope.querySelectorAll(selector)];
    const visible = roots.find((el) => {
      if (!(el instanceof HTMLElement)) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    if (visible) return visible;
  }
  return null;
}

/**
 * Collect wiki images that are not already public https paths, and base64 images,
 * from the same preview root used by formatted HTML copy.
 */
export function collectImgbbCopyCandidates(scope: ParentNode = document): ImgbbCopyCandidate[] {
  const root = findCopyRoot(scope);
  if (!root) return [];

  const out: ImgbbCopyCandidate[] = [];
  const seen = new Set<string>();

  const push = (candidate: Omit<ImgbbCopyCandidate, 'id'>) => {
    if (!candidate.replaceKey || !candidate.fetchSrc) return;
    if (seen.has(candidate.replaceKey)) return;
    seen.add(candidate.replaceKey);
    out.push({
      ...candidate,
      id: `${candidate.kind}:${out.length}:${candidate.replaceKey.slice(0, 48)}`,
    });
  };

  for (const node of root.querySelectorAll('img')) {
    if (!(node instanceof HTMLImageElement)) continue;
    const wikiPath = (node.getAttribute('data-wiki-path') || '').trim();
    const mdSrc = (node.getAttribute('data-md-src') || '').trim();
    const src = (node.getAttribute('src') || node.currentSrc || node.src || '').trim();
    const previewSrc = src || mdSrc || wikiPath;

    if (wikiPath) {
      if (isDataImageUri(wikiPath)) {
        push({
          kind: 'base64',
          replaceKey: wikiPath,
          label: 'base64 (wiki)',
          previewSrc: previewSrc || wikiPath,
          fetchSrc: wikiPath,
        });
        continue;
      }
      if (!isPublicHttpImageUrl(wikiPath)) {
        push({
          kind: 'wiki',
          replaceKey: wikiPath,
          label: wikiPath,
          previewSrc,
          fetchSrc: previewSrc || wikiPath,
        });
      }
      continue;
    }

    const dataSrc = isDataImageUri(mdSrc) ? mdSrc : isDataImageUri(src) ? src : '';
    if (dataSrc) {
      push({
        kind: 'base64',
        replaceKey: dataSrc,
        label: 'base64',
        previewSrc: previewSrc || dataSrc,
        fetchSrc: dataSrc,
      });
    }
  }

  return out;
}
