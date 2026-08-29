import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { isDataImageUri, prepareMarkdownImageForWikiConvert } from '@/utils/markdownImageExport';
import { resolveImgbbFetchSrc, uploadImageToImgbb } from '@/utils/imgbbUpload';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { uploadPrintEditorImage } from '@/utils/printEditorImageUpload';
import { upsertRemoteImageComment } from '@/utils/remoteImageComment';
import {
  getMarkdownImageOccurrenceInContainer,
  getResizableImageAttrsFromElement,
  getWikiImageOccurrenceInContainer,
  replaceMarkdownImageWithWikiPath,
  updateMarkdownImageSizeInMarkdown,
  updateWikiImagePathInMarkdown,
  updateWikiImageSizeInMarkdown,
} from '@/utils/wikiImageSyntax';
import type { ExportPdfDocumentState } from '@/pages/exportPdf/hooks/useExportPdfDocument';
import type { ExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';
import type {
  ExportPdfFreeTransformState,
  ExportPdfOverlayRect,
  ExportPdfWikiImageModalState,
} from '@/pages/exportPdf/exportPdfTypes';
import type {
  WikiImageSizeApplyPayload,
  WikiImageSizeConvertToImgbbPayload,
  WikiImageSizeConvertToWikiPayload,
} from '@/components/modals/WikiImageSizeModal';

type UseExportPdfImageInteractionsArgs = Pick<
  ExportPdfDocumentState,
  | 'previewValue'
  | 'setPreviewValue'
  | 'currentFile'
  | 'currentFileRef'
  | 'previewValueRef'
> & {
  refs: Pick<
    ExportPdfPreviewRefs,
    'previewContainerRef' | 'pagesHostRef' | 'paperContentRef'
  >;
};

export function useExportPdfImageInteractions({
  previewValue,
  setPreviewValue,
  currentFile,
  previewValueRef: _previewValueRef,
  refs,
}: UseExportPdfImageInteractionsArgs) {
  const { previewContainerRef, pagesHostRef, paperContentRef } = refs;
  const { s3Creds } = useAuth();
  const getImgbbApiKey = useCallback(
    () => (s3Creds?.imgbbApiKey || '').trim(),
    [s3Creds?.imgbbApiKey],
  );

  const [wikiImageModalState, setWikiImageModalState] =
    useState<ExportPdfWikiImageModalState>(null);
  const [freeTransformState, setFreeTransformState] =
    useState<ExportPdfFreeTransformState>(null);
  const [freeTransformConfirmOpen, setFreeTransformConfirmOpen] = useState(false);
  const [freeTransformOverlayRect, setFreeTransformOverlayRect] =
    useState<ExportPdfOverlayRect>(null);
  const activeTransformRef = useRef<ExportPdfFreeTransformState>(null);

  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return undefined;

    const COVER_SEL = '.export-pdf-cover, [data-note-cover="1"]';

    const isCoverContextMenu = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(COVER_SEL)) return true;
      if (typeof event.composedPath === 'function') {
        for (const node of event.composedPath()) {
          if (node instanceof Element && node.matches?.(COVER_SEL)) return true;
        }
      }
      const top = document.elementFromPoint(event.clientX, event.clientY);
      if (top?.closest?.(COVER_SEL)) return true;
      for (const cover of root.querySelectorAll(COVER_SEL)) {
        const rect = cover.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          return true;
        }
      }
      return false;
    };

    const onContextMenu = (event: MouseEvent) => {
      if (isCoverContextMenu(event)) return;
      if (event.ctrlKey) return;

      const target = event.target;
      const contentRoot =
        pagesHostRef.current && target instanceof Element && target.closest?.('[data-export-pdf-pages]')
          ? pagesHostRef.current
          : paperContentRef.current;
      if (!contentRoot) return;

      const img =
        target instanceof Element
          ? (target.closest?.('img[data-wiki-path], img[data-md-src]') as HTMLImageElement | null)
          : null;
      if (img && contentRoot.contains(img)) {
        const attrs = getResizableImageAttrsFromElement(img);
        if (attrs.kind !== 'wiki' && attrs.kind !== 'markdown') return;
        if (!attrs.key) return;
        event.preventDefault();
        const occurrence =
          attrs.kind === 'wiki'
            ? getWikiImageOccurrenceInContainer(contentRoot, img, attrs.key)
            : getMarkdownImageOccurrenceInContainer(contentRoot, img, attrs.key);
        setWikiImageModalState({
          kind: attrs.kind,
          key: attrs.key,
          width: attrs.width ?? '',
          height: attrs.height ?? '',
          occurrence,
          imageSrc: img.currentSrc || img.src || '',
        });
      }
    };
    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, [pagesHostRef, paperContentRef, previewContainerRef]);

  const handleApplyWikiImageSize = useCallback(
    ({ width, height }: WikiImageSizeApplyPayload) => {
      const modal = wikiImageModalState;
      if (!modal?.key) return;
      const w = width ?? '';
      const h = height ?? '';
      const next =
        modal.kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(previewValue, {
              path: modal.key,
              occurrence: modal.occurrence ?? 0,
              width: w,
              height: h,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
            } as any)
          : updateMarkdownImageSizeInMarkdown(previewValue, {
              src: modal.key,
              occurrence: modal.occurrence ?? 0,
              width: w,
              height: h,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
            } as any);
      if (!next.updated || next.markdown === previewValue) return;
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next.markdown,
      });
    },
    [currentFile, previewValue, setPreviewValue, wikiImageModalState],
  );

  const handleCropWikiImage = useCallback(
    async ({ file }: { file: File }) => {
      const modal = wikiImageModalState;
      if (!modal?.key) {
        throw new Error('자를 이미지를 찾을 수 없습니다.');
      }
      const nextPath = await uploadPrintEditorImage(file, currentFile);
      const next =
        modal.kind === 'wiki'
          ? updateWikiImagePathInMarkdown(previewValue, {
              path: modal.key,
              occurrence: modal.occurrence ?? 0,
              nextPath,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
            } as any)
          : replaceMarkdownImageWithWikiPath(previewValue, {
              src: modal.key,
              occurrence: modal.occurrence ?? 0,
              nextPath,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
            } as any);
      if (!next.updated || next.markdown === previewValue) return;
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next.markdown,
      });
    },
    [currentFile, previewValue, setPreviewValue, wikiImageModalState],
  );

  const handleConvertMarkdownToWiki = useCallback(
    async ({ width, height }: WikiImageSizeConvertToWikiPayload) => {
      const modal = wikiImageModalState;
      if (!modal?.key || modal.kind !== 'markdown') {
        throw new Error('변환할 이미지를 찾을 수 없습니다.');
      }
      const prepared = await prepareMarkdownImageForWikiConvert({
        markdownSrc: modal.key,
        displaySrc: modal.imageSrc,
        currentNotePath: currentFile?.id ?? null,
      });
      let nextPath = '';
      if (prepared.mode === 'path') {
        nextPath = prepared.path;
      } else {
        nextPath = await uploadPrintEditorImage(prepared.file, currentFile);
        if (!nextPath) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }
      }
      const next = replaceMarkdownImageWithWikiPath(previewValue, {
        src: modal.key,
        occurrence: modal.occurrence ?? 0,
        nextPath,
        width: width ?? '',
        height: height ?? '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
      } as any);
      if (!next.updated || next.markdown === previewValue) {
        throw new Error('마크다운에서 해당 이미지를 찾지 못했습니다.');
      }
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next.markdown,
      });
    },
    [currentFile, previewValue, setPreviewValue, wikiImageModalState],
  );

  const handleConvertToImgbb = useCallback(
    async ({ width, height }: WikiImageSizeConvertToImgbbPayload) => {
      const modal = wikiImageModalState;
      if (!modal?.key || !modal?.kind) {
        throw new Error('변환할 이미지를 찾을 수 없습니다.');
      }
      const apiKey = getImgbbApiKey();
      if (!apiKey) {
        throw new Error('ImgBB API 키가 없습니다. 설정에서 키를 저장하세요.');
      }
      const fetchSrc = resolveImgbbFetchSrc({
        path: modal.key,
        imageSrc: modal.imageSrc,
      });
      if (!fetchSrc) {
        throw new Error('업로드할 이미지 소스를 찾지 못했습니다.');
      }
      const uploaded = await uploadImageToImgbb(
        isDataImageUri(modal.key)
          ? { apiKey, image: fetchSrc, name: 'image' }
          : { apiKey, image: fetchSrc },
      );
      const nextUrl = uploaded.url;
      const occurrence = modal.occurrence ?? 0;
      const w = width ?? '';
      const h = height ?? '';
      let nextMarkdown = previewValue;
      const sized =
        modal.kind === 'wiki'
          ? updateWikiImageSizeInMarkdown(nextMarkdown, {
              path: modal.key,
              occurrence,
              width: w,
              height: h,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
            } as any)
          : updateMarkdownImageSizeInMarkdown(nextMarkdown, {
              src: modal.key,
              occurrence,
              width: w,
              height: h,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
            } as any);
      if (sized.updated) nextMarkdown = sized.markdown;
      const sidecar = await upsertRemoteImageComment(
        nextMarkdown,
        {
          kind: modal.kind === 'wiki' ? 'wiki' : 'markdown',
          key: modal.key,
          occurrence,
        },
        nextUrl,
      );
      if (!sidecar.updated && nextMarkdown === previewValue) {
        throw new Error('마크다운에서 해당 이미지를 찾지 못했습니다.');
      }
      setPreviewValue(sidecar.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: sidecar.markdown,
      });
    },
    [currentFile, getImgbbApiKey, previewValue, setPreviewValue, wikiImageModalState],
  );

  const findResizableImageElement = useCallback(
    (target: ExportPdfFreeTransformState | ExportPdfWikiImageModalState) => {
      const root = previewContainerRef.current;
      if (!root || !target?.kind || !target?.key) return null;
      const selector =
        target.kind === 'wiki' ? 'img[data-wiki-path]' : 'img[data-md-src]';
      const images = [...root.querySelectorAll<HTMLImageElement>(selector)];
      const matched = images.filter((img) => {
        const key =
          target.kind === 'wiki'
            ? img.getAttribute('data-wiki-path')
            : img.getAttribute('data-md-src');
        return key === target.key;
      });
      return matched[target.occurrence ?? 0] ?? null;
    },
    [previewContainerRef],
  );

  const startFreeTransform = useCallback(() => {
    const modal = wikiImageModalState;
    if (!modal?.kind || !modal?.key) return;
    const img = findResizableImageElement(modal);
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const widthPx = Math.max(24, Math.round(rect.width));
    const heightPx = Math.max(24, Math.round(rect.height));
    const next: ExportPdfFreeTransformState = {
      kind: modal.kind,
      key: modal.key,
      occurrence: modal.occurrence ?? 0,
      widthPx,
      heightPx,
      originalWidthPx: widthPx,
      originalHeightPx: heightPx,
    };
    img.style.width = `${widthPx}px`;
    img.style.height = `${heightPx}px`;
    img.setAttribute('data-print-free-transform', '1');
    activeTransformRef.current = next;
    setFreeTransformState(next);
    setFreeTransformConfirmOpen(false);
  }, [findResizableImageElement, wikiImageModalState]);

  useEffect(() => {
    if (!freeTransformState) {
      setFreeTransformOverlayRect(null);
      return undefined;
    }
    const img = findResizableImageElement(freeTransformState);
    if (!img) {
      setFreeTransformState(null);
      setFreeTransformOverlayRect(null);
      return undefined;
    }
    let rafId = 0;
    const updateRect = () => {
      const rect = img.getBoundingClientRect();
      setFreeTransformOverlayRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
      rafId = requestAnimationFrame(updateRect);
    };
    rafId = requestAnimationFrame(updateRect);
    return () => cancelAnimationFrame(rafId);
  }, [findResizableImageElement, freeTransformState]);

  useEffect(() => {
    if (!freeTransformState) return undefined;
    const target = findResizableImageElement(freeTransformState);
    if (!target) return undefined;

    const onHandleDown = (event: PointerEvent) => {
      const handle =
        event.target instanceof Element
          ? event.target.closest?.('[data-transform-handle]')
          : null;
      if (!handle) return;
      event.preventDefault();
      const dir = handle.getAttribute('data-transform-handle');
      if (!dir) return;
      const isTouchResize = event.pointerType === 'touch';
      const start = activeTransformRef.current || freeTransformState;
      const startX = event.clientX;
      const startY = event.clientY;
      const baseRatio = start.heightPx > 0 ? start.widthPx / start.heightPx : 1;

      const onMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        let width = start.widthPx;
        let height = start.heightPx;
        if (dir.includes('e')) width = start.widthPx + dx;
        if (dir.includes('w')) width = start.widthPx - dx;
        if (dir.includes('s')) height = start.heightPx + dy;
        if (dir.includes('n')) height = start.heightPx - dy;
        width = Math.max(24, width);
        height = Math.max(24, height);

        const keepAspect = isTouchResize || moveEvent.shiftKey;
        if (keepAspect) {
          const widthChangeRate = Math.abs((width - start.widthPx) / Math.max(1, start.widthPx));
          const heightChangeRate = Math.abs(
            (height - start.heightPx) / Math.max(1, start.heightPx),
          );
          if (widthChangeRate >= heightChangeRate) {
            height = Math.max(24, width / Math.max(0.0001, baseRatio));
          } else {
            width = Math.max(24, height * baseRatio);
          }
        }

        width = Math.max(24, Math.round(width));
        height = Math.max(24, Math.round(height));
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        const next = {
          ...(activeTransformRef.current || start),
          widthPx: width,
          heightPx: height,
        };
        activeTransformRef.current = next;
        setFreeTransformState(next);
      };
      const onUp = () => {
        document.removeEventListener('pointermove', onMove, true);
        document.removeEventListener('pointerup', onUp, true);
      };
      document.addEventListener('pointermove', onMove, true);
      document.addEventListener('pointerup', onUp, true);
    };

    const onOutsidePointerDown = (event: PointerEvent) => {
      const clickedHandle =
        event.target instanceof Element
          ? event.target.closest?.('[data-transform-handle]')
          : null;
      const clickedImage =
        event.target instanceof Element
          ? event.target.closest?.('img[data-wiki-path], img[data-md-src]')
          : null;
      if (clickedHandle || clickedImage === target) return;
      setFreeTransformConfirmOpen(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      const t = event.target;
      if (
        t instanceof Element &&
        t.closest('[data-advanced-search], [role="dialog"], [role="combobox"], input, textarea')
      ) {
        return;
      }
      event.preventDefault();
      setFreeTransformConfirmOpen(true);
    };
    document.addEventListener('pointerdown', onHandleDown, true);
    document.addEventListener('pointerdown', onOutsidePointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onHandleDown, true);
      document.removeEventListener('pointerdown', onOutsidePointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [findResizableImageElement, freeTransformState]);

  const handleConfirmTransformApply = useCallback(() => {
    const active = activeTransformRef.current || freeTransformState;
    if (!active?.key) return;
    const width = `${Math.round(active.widthPx)}px`;
    const height = `${Math.round(active.heightPx)}px`;
    const next =
      active.kind === 'wiki'
        ? updateWikiImageSizeInMarkdown(previewValue, {
            path: active.key,
            occurrence: active.occurrence ?? 0,
            width,
            height,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
          } as any)
        : updateMarkdownImageSizeInMarkdown(previewValue, {
            src: active.key,
            occurrence: active.occurrence ?? 0,
            width,
            height,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JS util infers null-only width/height
          } as any);
    if (next.updated && next.markdown !== previewValue) {
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile,
        editorContent: next.markdown,
      });
    }
    const img = findResizableImageElement(active);
    img?.removeAttribute('data-print-free-transform');
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [currentFile, findResizableImageElement, freeTransformState, previewValue, setPreviewValue]);

  const handleConfirmTransformReset = useCallback(() => {
    const active = activeTransformRef.current || freeTransformState;
    if (!active) return;
    const img = findResizableImageElement(active);
    if (img) {
      img.style.width = `${active.originalWidthPx}px`;
      img.style.height = `${active.originalHeightPx}px`;
      img.removeAttribute('data-print-free-transform');
    }
    setFreeTransformState(null);
    activeTransformRef.current = null;
    setFreeTransformConfirmOpen(false);
  }, [findResizableImageElement, freeTransformState]);

  return {
    wikiImageModalState,
    setWikiImageModalState,
    freeTransformState,
    freeTransformConfirmOpen,
    setFreeTransformConfirmOpen,
    freeTransformOverlayRect,
    handleApplyWikiImageSize,
    handleCropWikiImage,
    handleConvertMarkdownToWiki,
    handleConvertToImgbb,
    startFreeTransform,
    handleConfirmTransformApply,
    handleConfirmTransformReset,
  };
}

export type ExportPdfImageInteractionsState = ReturnType<typeof useExportPdfImageInteractions>;
