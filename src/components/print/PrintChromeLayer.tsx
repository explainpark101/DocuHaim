import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { printFontCssVarValue } from '@/utils/fontFallback';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';
import type { PrintPageMarginsMm } from '@/utils/printPageLayout';
import {
  formatPrintChromePageLabel,
  printChromePageKey,
  resolvePrintChromePageNumber,
  resolvePrintChromePlacement,
  type PrintChromeDoc,
  type PrintChromePlacement,
  type PrintChromePosition,
  type PrintChromeTemplate,
} from '@/utils/printChrome';

const POSITION_STYLE: Record<PrintChromePosition, CSSProperties> = {
  'top-left': { top: 0, left: 0, justifyContent: 'flex-start', textAlign: 'left' },
  'top-center': {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    textAlign: 'center',
  },
  'top-right': { top: 0, right: 0, justifyContent: 'flex-end', textAlign: 'right' },
  'middle-left': {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  'middle-right': {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  'bottom-left': { bottom: 0, left: 0, justifyContent: 'flex-start', textAlign: 'left' },
  'bottom-center': {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    textAlign: 'center',
  },
  'bottom-right': { bottom: 0, right: 0, justifyContent: 'flex-end', textAlign: 'right' },
};

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

export type PrintChromePlacementDraft = {
  templateId: string;
  pageKey: string;
  placement: PrintChromePlacement;
};

type PrintChromeLayerProps = {
  chrome: PrintChromeDoc;
  /** 0-based body page index; omit / null for cover. */
  bodyIndex?: number | null;
  bodyPageCount: number;
  hasCover: boolean;
  isCover?: boolean;
  marginsMm: PrintPageMarginsMm;
  getPresignedUrl?: GetPresignedUrl;
  className?: string;
  /** Allow dragging page-number chrome in the preview (not during print). */
  editable?: boolean;
  draftPlacement?: PrintChromePlacementDraft | null;
  onPlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onPlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
};

function chromeInsetStyle(margins: PrintPageMarginsMm): CSSProperties {
  const band = (mm: number) => (mm > 0 ? `max(2px, calc(${mm}mm * 0.15))` : '6px');
  return {
    top: band(margins.top),
    right: band(margins.right),
    bottom: band(margins.bottom),
    left: band(margins.left),
    padding: 0,
  };
}

function placementStyle(placement: PrintChromePlacement): CSSProperties {
  return {
    top: `${placement.yPercent}%`,
    left: `${placement.xPercent}%`,
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    textAlign: 'center',
  };
}

function ChromeImage({
  path,
  widthPx,
  heightPx,
  getPresignedUrl,
}: {
  path: string;
  widthPx: number;
  heightPx: number;
  getPresignedUrl?: GetPresignedUrl;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const trimmed = path.trim();
    if (!trimmed) {
      setUrl(null);
      return undefined;
    }
    if (!getPresignedUrl) {
      setUrl(null);
      return undefined;
    }
    void getPresignedUrl(trimmed).then((next) => {
      if (!cancelled) setUrl(next);
    });
    return () => {
      cancelled = true;
    };
  }, [getPresignedUrl, path]);

  if (!url) return null;
  return (
    <img
      src={url}
      alt=""
      width={widthPx}
      height={heightPx}
      draggable={false}
      style={{
        width: widthPx,
        height: heightPx,
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'block',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      } as CSSProperties}
    />
  );
}

function percentFromPointer(
  layerEl: HTMLElement,
  clientX: number,
  clientY: number,
): PrintChromePlacement {
  const rect = layerEl.getBoundingClientRect();
  const w = Math.max(rect.width, 1);
  const h = Math.max(rect.height, 1);
  const xPercent = ((clientX - rect.left) / w) * 100;
  const yPercent = ((clientY - rect.top) / h) * 100;
  return {
    xPercent: Math.min(100, Math.max(0, Math.round(xPercent * 100) / 100)),
    yPercent: Math.min(100, Math.max(0, Math.round(yPercent * 100) / 100)),
  };
}

function ChromeItem({
  template,
  pageKey,
  page,
  total,
  showPageNumber,
  getPresignedUrl,
  editable,
  draftPlacement,
  layerRef,
  onPlacementDraftChange,
  onPlacementDraftCommit,
}: {
  template: PrintChromeTemplate;
  pageKey: string;
  page: number;
  total: number;
  showPageNumber: boolean;
  getPresignedUrl?: GetPresignedUrl;
  editable?: boolean;
  draftPlacement?: PrintChromePlacementDraft | null;
  layerRef: RefObject<HTMLDivElement | null>;
  onPlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onPlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
}) {
  const draggingRef = useRef(false);
  const movedRef = useRef(false);

  if (!template.enabled) return null;
  if (template.type === 'page-number' && !showPageNumber) return null;

  const draftForThis =
    draftPlacement &&
    draftPlacement.templateId === template.id &&
    draftPlacement.pageKey === pageKey
      ? draftPlacement.placement
      : null;
  const free = draftForThis ?? resolvePrintChromePlacement(template, pageKey);
  const pos = free ? placementStyle(free) : POSITION_STYLE[template.position];
  const fontFamily =
    template.type === 'image'
      ? undefined
      : printFontCssVarValue(template.fontFamily) ??
        'var(--print-font-body, var(--font-sans-builtin))';

  let content: ReactNode = null;
  if (template.type === 'page-number') {
    content = (
      <span
        style={{
          fontFamily,
          fontSize: `${template.fontSizePx}px`,
          color: '#111827',
          lineHeight: 1.2,
          whiteSpace: 'pre-wrap',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
        } as CSSProperties}
      >
        {formatPrintChromePageLabel(template.format, page, total)}
      </span>
    );
  } else if (template.type === 'text') {
    if (!template.text) return null;
    content = (
      <span
        style={{
          fontFamily,
          fontSize: `${template.fontSizePx}px`,
          color: '#111827',
          lineHeight: 1.2,
          whiteSpace: 'pre-wrap',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
        } as CSSProperties}
      >
        {template.text}
      </span>
    );
  } else if (template.type === 'image') {
    if (!template.path.trim()) return null;
    content = (
      <ChromeImage
        path={template.path}
        widthPx={template.widthPx}
        heightPx={template.heightPx}
        getPresignedUrl={getPresignedUrl}
      />
    );
  }

  if (!content) return null;

  const canDrag = Boolean(editable && template.type === 'page-number');

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canDrag || event.button !== 0) return;
    const layerEl = layerRef.current;
    if (!layerEl) return;
    event.preventDefault();
    event.stopPropagation();
    draggingRef.current = true;
    movedRef.current = false;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    const placement = percentFromPointer(layerEl, event.clientX, event.clientY);
    onPlacementDraftChange?.({ templateId: template.id, pageKey, placement });
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const layerEl = layerRef.current;
    if (!layerEl) return;
    movedRef.current = true;
    const placement = percentFromPointer(layerEl, event.clientX, event.clientY);
    onPlacementDraftChange?.({ templateId: template.id, pageKey, placement });
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    if (!movedRef.current) {
      onPlacementDraftChange?.(null);
      return;
    }
    const layerEl = layerRef.current;
    if (!layerEl) {
      onPlacementDraftChange?.(null);
      return;
    }
    const placement = percentFromPointer(layerEl, event.clientX, event.clientY);
    onPlacementDraftCommit?.({ templateId: template.id, pageKey, placement });
  };

  return (
    <div
      key={template.id}
      data-print-chrome-item={template.type}
      className={`absolute flex max-w-[90%] print:pointer-events-none ${
        canDrag
          ? 'pointer-events-auto cursor-grab touch-none select-none active:cursor-grabbing'
          : 'pointer-events-none'
      }`}
      style={pos}
      onPointerDown={canDrag ? onPointerDown : undefined}
      onPointerMove={canDrag ? onPointerMove : undefined}
      onPointerUp={canDrag ? endDrag : undefined}
      onPointerCancel={canDrag ? endDrag : undefined}
    >
      {content}
    </div>
  );
}

/**
 * Absolute chrome overlay for one page box (cover or .pagedjs_page).
 * Keep printable (no print:hidden).
 */
export function PrintChromeLayer({
  chrome,
  bodyIndex = null,
  bodyPageCount,
  hasCover,
  isCover = false,
  marginsMm,
  getPresignedUrl,
  className = '',
  editable = false,
  draftPlacement = null,
  onPlacementDraftChange,
  onPlacementDraftCommit,
}: PrintChromeLayerProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const pageKey = printChromePageKey({ isCover, bodyIndex });

  const numbering = useMemo(() => {
    return resolvePrintChromePageNumber({
      numbering: chrome.numbering,
      bodyIndex: bodyIndex ?? 0,
      bodyPageCount,
      hasCover,
      isCover,
    });
  }, [bodyIndex, bodyPageCount, chrome.numbering, hasCover, isCover]);

  const templates = chrome.templates.filter((t) => t.enabled);
  if (templates.length === 0) return null;
  if (isCover && !chrome.showOnCover) return null;

  return (
    <div
      ref={layerRef}
      data-print-chrome-layer={isCover ? 'cover' : 'body'}
      className={`absolute z-20 overflow-visible print:pointer-events-none ${
        editable ? 'pointer-events-none' : 'pointer-events-none'
      } ${className}`}
      style={chromeInsetStyle(marginsMm)}
      aria-hidden={!editable}
    >
      {templates.map((template) => (
        <ChromeItem
          key={template.id}
          template={template}
          pageKey={pageKey}
          page={numbering.page}
          total={numbering.total}
          showPageNumber={numbering.showPageNumber}
          getPresignedUrl={getPresignedUrl}
          editable={editable}
          draftPlacement={draftPlacement}
          layerRef={layerRef}
          onPlacementDraftChange={onPlacementDraftChange}
          onPlacementDraftCommit={onPlacementDraftCommit}
        />
      ))}
    </div>
  );
}

type PrintChromePagesMountProps = {
  pagesHostRef: RefObject<HTMLElement | null>;
  chrome: PrintChromeDoc | null;
  bodyPageCount: number;
  hasCover: boolean;
  marginsMm: PrintPageMarginsMm;
  getPresignedUrl?: GetPresignedUrl;
  /** Remount when paged.js regenerates pages. */
  layoutKey: string;
  editable?: boolean;
  draftPlacement?: PrintChromePlacementDraft | null;
  onPlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onPlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
};
export function PrintChromePagesMount({
  pagesHostRef,
  chrome,
  bodyPageCount,
  hasCover,
  marginsMm,
  getPresignedUrl,
  layoutKey,
  editable = false,
  draftPlacement = null,
  onPlacementDraftChange,
  onPlacementDraftCommit,
}: PrintChromePagesMountProps) {
  const [pages, setPages] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const pagesHost = pagesHostRef.current;
    if (!pagesHost || !chrome || chrome.templates.length === 0) {
      setPages([]);
      return undefined;
    }

    const collect = () => {
      const host = pagesHostRef.current;
      if (!host) {
        setPages([]);
        return;
      }
      const list = [
        ...host.querySelectorAll<HTMLElement>(`.pagedjs_page, [${PRINT_BODY_PAGE_ATTR}]`),
      ];
      const unique = [...new Set(list)];
      for (const page of unique) {
        const style = window.getComputedStyle(page);
        if (style.position === 'static') {
          page.style.position = 'relative';
        }
      }
      setPages(unique);
    };

    collect();
    const mo = new MutationObserver(() => collect());
    mo.observe(pagesHost, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [chrome, layoutKey, pagesHostRef]);

  if (!chrome || chrome.templates.length === 0 || pages.length === 0) {
    return null;
  }

  return (
    <>
      {pages.map((pageEl, index) => {
        const attr = pageEl.getAttribute(PRINT_BODY_PAGE_ATTR);
        const bodyIndex = attr != null && attr !== '' ? Number(attr) : index;
        return createPortal(
          <PrintChromeLayer
            key={`${layoutKey}-${bodyIndex}`}
            chrome={chrome}
            bodyIndex={Number.isFinite(bodyIndex) ? bodyIndex : index}
            bodyPageCount={bodyPageCount}
            hasCover={hasCover}
            marginsMm={marginsMm}
            getPresignedUrl={getPresignedUrl}
            editable={editable}
            draftPlacement={draftPlacement}
            onPlacementDraftChange={onPlacementDraftChange}
            onPlacementDraftCommit={onPlacementDraftCommit}
          />,
          pageEl,
        );
      })}
    </>
  );
}

export default PrintChromeLayer;
