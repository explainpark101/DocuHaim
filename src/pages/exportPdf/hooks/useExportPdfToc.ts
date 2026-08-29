import { useCallback, useEffect, useRef, useState } from 'react';
import {
  logicalPageIndexForHeading,
  spreadIndexForLogicalPage,
} from '@/components/print/PrintPreviewStage';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { useTocTitleWrap } from '@/hooks/useTocTitleWrap';
import { insertPgbrBeforeHeadingByText } from '@/utils/printPgbrInsert';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import {
  EDITOR_ID,
  getActiveHeadingId,
  headingId,
  PRINT_TOC_DEFAULT_WIDTH,
  PRINT_TOC_WIDTH_KEY,
} from '@/pages/exportPdf/exportPdfPrintStyles';
import type { ExportPdfDocumentState } from '@/pages/exportPdf/hooks/useExportPdfDocument';
import type { ExportPdfPrintLayoutState } from '@/pages/exportPdf/hooks/useExportPdfPrintLayout';
import type { ExportPdfPreviewRefs } from '@/pages/exportPdf/hooks/useExportPdfPreviewRefs';
import type {
  ExportPdfHeadingPgbrModalState,
  ExportPdfTocItem,
} from '@/pages/exportPdf/exportPdfTypes';

type UseExportPdfTocArgs = Pick<
  ExportPdfDocumentState,
  'bodyMarkdown' | 'setPreviewValue' | 'currentFileRef' | 'previewValueRef' | 'activeCover'
> &
  Pick<
    ExportPdfPrintLayoutState,
    | 'bodyPageCount'
    | 'effectivePages'
    | 'isLiveScroll1'
    | 'previewView'
    | 'setFlipIndex'
  > & {
    refs: Pick<
      ExportPdfPreviewRefs,
      'headerRef' | 'previewContainerRef' | 'pagesHostRef'
    >;
  };

export function useExportPdfToc({
  bodyMarkdown,
  setPreviewValue,
  currentFileRef,
  previewValueRef,
  activeCover,
  bodyPageCount,
  effectivePages,
  isLiveScroll1,
  previewView,
  setFlipIndex,
  refs,
}: UseExportPdfTocArgs) {
  const { headerRef, previewContainerRef, pagesHostRef } = refs;

  const [tocVisible, setTocVisible] = useState(true);
  const [tocTopPx, setTocTopPx] = useState(0);
  const [tocItems, setTocItems] = useState<ExportPdfTocItem[]>([]);
  const tocTitleWrap = useTocTitleWrap();
  const wrapTitles = tocTitleWrap[0] as boolean;
  const setWrapTitles = tocTitleWrap[1] as (value: boolean) => void;
  const [visibleHeadingIds, setVisibleHeadingIds] = useState<string[]>([]);
  const [headingPgbrModalState, setHeadingPgbrModalState] =
    useState<ExportPdfHeadingPgbrModalState>(null);

  const tocListRef = useRef<HTMLUListElement | null>(null);
  const tocProgrammaticScrollRef = useRef(false);
  const tocProgrammaticResetTimerRef = useRef<number | null>(null);
  const tocAutoFollowPausedUntilRef = useRef(0);

  const {
    width: tocWidth,
    isResizing: tocResizing,
    handleProps: tocResizeHandleProps,
  } = useResizablePanelWidth({
    storageKey: PRINT_TOC_WIDTH_KEY,
    defaultWidth: PRINT_TOC_DEFAULT_WIDTH,
    minWidth: 180,
    collapseBelowWidth: 90,
    maxWidth: 640,
    edge: 'right',
    onCollapseBelowMin: () => setTocVisible(false),
  });

  const navigatePreviewToHeading = useCallback(
    (targetHeadingId: string) => {
      if (!targetHeadingId) return;
      const pagesHost = pagesHostRef.current;
      const el =
        (pagesHost?.querySelector(
          `#${CSS.escape(targetHeadingId)}`,
        ) as HTMLElement | null) ?? document.getElementById(targetHeadingId);
      if (!el) return;

      if (isLiveScroll1) {
        el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        return;
      }

      if (!pagesHost) {
        el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        return;
      }
      const logical = logicalPageIndexForHeading(
        el,
        pagesHost,
        Boolean(activeCover?.enabled),
      );
      const totalLogical = (activeCover?.enabled ? 1 : 0) + Math.max(1, bodyPageCount);
      const nextFlip = spreadIndexForLogicalPage(
        logical,
        totalLogical,
        effectivePages,
        previewView.firstPageSingle,
      );
      setFlipIndex(nextFlip);
    },
    [
      activeCover?.enabled,
      bodyPageCount,
      effectivePages,
      isLiveScroll1,
      pagesHostRef,
      previewView.firstPageSingle,
      setFlipIndex,
    ],
  );

  const handleTocItemClick = useCallback(
    (id: string) => {
      navigatePreviewToHeading(id);
    },
    [navigatePreviewToHeading],
  );

  const handleInsertPgbrBeforeHeading = useCallback(() => {
    const state = headingPgbrModalState;
    if (!state) return;
    const md = previewValueRef.current ?? '';
    const next = insertPgbrBeforeHeadingByText(
      md,
      state.headingText || '',
      0,
      state.headingIndex,
    );
    if (next.updated && next.markdown !== md) {
      setPreviewValue(next.markdown);
      setPendingPrintReturnState({
        currentFile: currentFileRef.current,
        editorContent: next.markdown,
      });
    }
    setHeadingPgbrModalState(null);
  }, [currentFileRef, headingPgbrModalState, previewValueRef, setPreviewValue]);

  const openHeadingPgbrModal = useCallback(
    (headingIndex: number, headingText: string) => {
      setHeadingPgbrModalState({ headingIndex, headingText });
    },
    [],
  );

  useEffect(() => {
    const updateTocTop = () => {
      const el = headerRef.current;
      if (!el) {
        setTocTopPx(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      setTocTopPx(Math.max(0, Math.round(rect.bottom)));
    };
    updateTocTop();
    window.addEventListener('resize', updateTocTop);
    window.addEventListener('scroll', updateTocTop, true);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      ro = new ResizeObserver(updateTocTop);
      ro.observe(headerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateTocTop);
      window.removeEventListener('scroll', updateTocTop, true);
      ro?.disconnect();
    };
  }, [headerRef]);

  useEffect(() => {
    const root = previewContainerRef.current;
    if (!root) return undefined;
    const collectItems = () => {
      const pagesHost = pagesHostRef.current;
      const headingSelector = [
        `[data-export-pdf-pages] h1`,
        `[data-export-pdf-pages] h2`,
        `[data-export-pdf-pages] h3`,
        `[data-export-pdf-pages] h4`,
        `[data-export-pdf-pages] h5`,
        `[data-export-pdf-pages] h6`,
        `[data-export-pdf-pages] .print-pack-line[id]`,
      ].join(', ');
      const stagingSelector = `#${EDITOR_ID} .md-editor-preview h1, #${EDITOR_ID} .md-editor-preview h2, #${EDITOR_ID} .md-editor-preview h3, #${EDITOR_ID} .md-editor-preview h4, #${EDITOR_ID} .md-editor-preview h5, #${EDITOR_ID} .md-editor-preview h6`;
      const packed = pagesHost ? [...pagesHost.querySelectorAll(headingSelector)] : [];
      const headings = packed.length
        ? packed
        : [...root.querySelectorAll(stagingSelector)];
      const seen = new Set<string>();
      const next: ExportPdfTocItem[] = [];
      headings.forEach((el, index) => {
        const headingEl = el as HTMLElement;
        const id = headingEl.id || headingId({ index });
        if (!id || seen.has(id)) return;
        seen.add(id);
        const sourceTag = (
          headingEl.dataset.printPackSource || headingEl.tagName || 'h1'
        ).toUpperCase();
        const level = Number(sourceTag.replace(/^H/, '')) || 1;
        next.push({
          id,
          level,
          text: (el.textContent || '').trim() || '(빈 제목)',
        });
      });
      setTocItems(next);
    };
    const timers = [60, 180, 420].map((delay) => window.setTimeout(collectItems, delay));
    const observer = new MutationObserver(() => collectItems());
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      observer.disconnect();
    };
  }, [bodyMarkdown, bodyPageCount, pagesHostRef, previewContainerRef]);

  useEffect(() => {
    if (!tocItems.length) {
      setVisibleHeadingIds([]);
      return undefined;
    }

    const headingEls = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headingEls.length) {
      setVisibleHeadingIds([]);
      return undefined;
    }

    const scrollRoot = previewContainerRef.current;
    let rafId = 0;

    const applyActiveHeading = () => {
      const activeId = getActiveHeadingId(headingEls);
      const nextIds = activeId ? [activeId] : [];
      setVisibleHeadingIds((prev) =>
        prev.length === nextIds.length && prev.every((id, index) => id === nextIds[index])
          ? prev
          : nextIds,
      );
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyActiveHeading();
      });
    };

    applyActiveHeading();
    scrollRoot?.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
    window.addEventListener('resize', scheduleUpdate);

    let resizeObserver: ResizeObserver | null = null;
    const resizeTarget = scrollRoot?.querySelector(`#${EDITOR_ID}`) ?? scrollRoot;
    if (typeof ResizeObserver !== 'undefined' && resizeTarget) {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(resizeTarget);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      scrollRoot?.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate, { capture: true });
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, [tocItems, bodyMarkdown, previewContainerRef]);

  useEffect(() => {
    if (!tocVisible || !visibleHeadingIds.length) return;
    if (Date.now() < tocAutoFollowPausedUntilRef.current) return;

    const tocList = tocListRef.current;
    if (!tocList) return;

    const firstVisibleId = tocItems.find((item) => visibleHeadingIds.includes(item.id))?.id;
    if (!firstVisibleId) return;

    const target = tocList.querySelector(`button[data-toc-id="${firstVisibleId}"]`);
    if (!target) return;

    const listRect = tocList.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const isWithinViewport =
      targetRect.top >= listRect.top + 8 && targetRect.bottom <= listRect.bottom - 8;
    if (isWithinViewport) return;

    tocProgrammaticScrollRef.current = true;
    target.scrollIntoView({ block: 'nearest' });
    if (tocProgrammaticResetTimerRef.current) {
      window.clearTimeout(tocProgrammaticResetTimerRef.current);
    }
    tocProgrammaticResetTimerRef.current = window.setTimeout(() => {
      tocProgrammaticScrollRef.current = false;
    }, 120);
  }, [tocItems, tocVisible, visibleHeadingIds]);

  useEffect(
    () => () => {
      if (tocProgrammaticResetTimerRef.current) {
        window.clearTimeout(tocProgrammaticResetTimerRef.current);
      }
    },
    [],
  );

  const pauseTocAutoFollow = useCallback(() => {
    tocAutoFollowPausedUntilRef.current = Date.now() + 900;
  }, []);

  return {
    tocVisible,
    setTocVisible,
    tocTopPx,
    tocItems,
    wrapTitles,
    setWrapTitles,
    visibleHeadingIds,
    headingPgbrModalState,
    setHeadingPgbrModalState,
    tocListRef,
    tocProgrammaticScrollRef,
    tocAutoFollowPausedUntilRef,
    tocWidth,
    tocResizing,
    tocResizeHandleProps,
    navigatePreviewToHeading,
    handleTocItemClick,
    handleInsertPgbrBeforeHeading,
    openHeadingPgbrModal,
    pauseTocAutoFollow,
  };
}

export type ExportPdfTocState = ReturnType<typeof useExportPdfToc>;
