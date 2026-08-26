import { useMemo, type CSSProperties } from 'react';
import CoverSlide from '@/components/noteCover/CoverSlide';
import type { NoteCover } from '@/utils/noteCover/types';
import { DEFAULT_COVER_PAGE_SIZE_ID } from '@/utils/noteCover/types';
import {
  buildPrintLayoutCssVars,
  getPrintPageSize,
  isPrintPageSizeId,
  loadPrintPageLayout,
  type PrintPageLayout,
} from '@/utils/print/printPageLayout';

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

type NoteCoverPreviewMountProps = {
  cover: NoteCover;
  getPresignedUrl?: GetPresignedUrl;
};

/**
 * md-editor-rt preview host: always light-mode paper for the cover surface.
 * Uses the page size saved on the cover so the preview matches Export PDF.
 * Body below the host keeps the editor theme.
 */
export default function NoteCoverPreviewMount({
  cover,
  getPresignedUrl,
}: NoteCoverPreviewMountProps) {
  const pageSizeId = isPrintPageSizeId(cover.pageSizeId)
    ? cover.pageSizeId
    : DEFAULT_COVER_PAGE_SIZE_ID;
  const layout = useMemo((): PrintPageLayout => {
    const base = loadPrintPageLayout();
    return { ...base, pageSizeId };
  }, [pageSizeId]);
  const page = useMemo(() => getPrintPageSize(pageSizeId), [pageSizeId]);
  const cssVars = useMemo(() => buildPrintLayoutCssVars(layout), [layout]);

  return (
    <div
      className="md-note-cover-preview-light w-full bg-white text-gray-900"
      data-note-cover-preview="1"
      data-color-mode="light"
      data-cover-page-size={pageSizeId}
      style={cssVars as CSSProperties}
    >
      <CoverSlide
        cover={cover}
        getPresignedUrl={getPresignedUrl}
        className="md-note-cover-preview-slide mx-auto max-w-full shadow-[0_4px_16px_rgba(15,23,42,0.1)]"
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: `${page.widthMm} / ${page.heightMm}`,
        }}
      />
    </div>
  );
}
