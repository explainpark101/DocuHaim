import { isDataImageUri } from '@/utils/markdownImageExport';
import { isPublicHttpImageUrl } from '@/utils/imgbbUpload';
import {
  getMermaidSourceFromElement,
  isLazyMermaidPlaceholder,
  renderLazyMermaidElement,
} from '@/utils/lazyMermaid';
import type { RemoteImageKind } from '@/utils/remoteImageComment';

const COPY_ROOT_SELECTORS = [
  '.novel-editor-surface',
  '.md-editor-preview',
];

export type ImgbbCopyCandidate = {
  id: string;
  kind: 'wiki' | 'base64' | 'markdown' | 'mermaid';
  /** Key used to remap the cloned <img> / mermaid host after upload. */
  replaceKey: string;
  label: string;
  previewSrc: string;
  fetchSrc: string;
  /** Target for remote-image sidecar upsert / lookup. */
  remoteKind: RemoteImageKind;
  remoteKey: string;
  occurrence: number;
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

function occurrenceForKey(
  counts: Map<string, number>,
  key: string,
): number {
  const n = counts.get(key) ?? 0;
  counts.set(key, n + 1);
  return n;
}

/**
 * Collect wiki / markdown / base64 images and Mermaid charts that need a public
 * HTTPS URL for formatted HTML copy (skip already-https wiki/md paths).
 */
export function collectImgbbCopyCandidates(scope: ParentNode = document): ImgbbCopyCandidate[] {
  const root = findCopyRoot(scope);
  if (!root) return [];

  const out: ImgbbCopyCandidate[] = [];
  const seenReplace = new Set<string>();
  const wikiOcc = new Map<string, number>();
  const mdOcc = new Map<string, number>();
  const mermaidOcc = new Map<string, number>();

  const push = (candidate: Omit<ImgbbCopyCandidate, 'id'>) => {
    if (!candidate.replaceKey || !candidate.fetchSrc) return;
    if (seenReplace.has(candidate.replaceKey)) return;
    seenReplace.add(candidate.replaceKey);
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
        const occurrence = occurrenceForKey(wikiOcc, wikiPath);
        push({
          kind: 'base64',
          replaceKey: wikiPath,
          label: 'base64 (wiki)',
          previewSrc: previewSrc || wikiPath,
          fetchSrc: wikiPath,
          remoteKind: 'wiki',
          remoteKey: wikiPath,
          occurrence,
        });
        continue;
      }
      if (!isPublicHttpImageUrl(wikiPath)) {
        const occurrence = occurrenceForKey(wikiOcc, wikiPath);
        push({
          kind: 'wiki',
          replaceKey: wikiPath,
          label: wikiPath,
          previewSrc,
          fetchSrc: previewSrc || wikiPath,
          remoteKind: 'wiki',
          remoteKey: wikiPath,
          occurrence,
        });
      }
      continue;
    }

    if (mdSrc) {
      if (isDataImageUri(mdSrc)) {
        const occurrence = occurrenceForKey(mdOcc, mdSrc);
        push({
          kind: 'base64',
          replaceKey: mdSrc,
          label: 'base64',
          previewSrc: previewSrc || mdSrc,
          fetchSrc: mdSrc,
          remoteKind: 'markdown',
          remoteKey: mdSrc,
          occurrence,
        });
        continue;
      }
      if (!isPublicHttpImageUrl(mdSrc)) {
        const occurrence = occurrenceForKey(mdOcc, mdSrc);
        push({
          kind: 'markdown',
          replaceKey: mdSrc,
          label: mdSrc.slice(0, 64),
          previewSrc,
          fetchSrc: previewSrc || mdSrc,
          remoteKind: 'markdown',
          remoteKey: mdSrc,
          occurrence,
        });
      }
      continue;
    }

    const dataSrc = isDataImageUri(src) ? src : '';
    if (dataSrc) {
      const occurrence = occurrenceForKey(mdOcc, dataSrc);
      push({
        kind: 'base64',
        replaceKey: dataSrc,
        label: 'base64',
        previewSrc: previewSrc || dataSrc,
        fetchSrc: dataSrc,
        remoteKind: 'markdown',
        remoteKey: dataSrc,
        occurrence,
      });
    }
  }

  for (const node of root.querySelectorAll('.md-editor-mermaid')) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.getAttribute('data-haim-mermaid-image') === '1') continue;
    const source = (
      (node.getAttribute('data-content') || '').trim()
      || getMermaidSourceFromElement(node)
    ).replace(/\s+$/, '');
    if (!source) continue;
    const occurrence = occurrenceForKey(mermaidOcc, source);
    const replaceKey = `mermaid:${occurrence}:${source.slice(0, 80)}`;
    push({
      kind: 'mermaid',
      replaceKey,
      label: `Mermaid #${occurrence + 1}`,
      previewSrc: '',
      fetchSrc: source,
      remoteKind: 'mermaid',
      remoteKey: source,
      occurrence,
    });
    node.setAttribute('data-haim-imgbb-replace-key', replaceKey);
  }

  return out;
}

/** Ensure a mermaid host is rendered to SVG, then return outer SVG markup. */
export async function ensureMermaidSvgMarkup(host: HTMLElement): Promise<string> {
  let el = host;
  if (isLazyMermaidPlaceholder(el)) {
    const rendered = await renderLazyMermaidElement(el);
    if (rendered) el = rendered;
  }
  const svg = el.querySelector('svg');
  if (!svg) throw new Error('Mermaid SVG를 찾지 못했습니다.');
  return new XMLSerializer().serializeToString(svg);
}

export function findMermaidHostByReplaceKey(
  scope: ParentNode,
  replaceKey: string,
): HTMLElement | null {
  for (const el of scope.querySelectorAll('.md-editor-mermaid')) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.getAttribute('data-haim-imgbb-replace-key') === replaceKey) return el;
  }
  return null;
}
