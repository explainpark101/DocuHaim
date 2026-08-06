import { useMemo, type CSSProperties } from 'react';
import CoverSlide from '@/components/noteCover/CoverSlide';
import type { NoteCover } from '@/utils/noteCover/types';
import {
  buildPrintLayoutCssVars,
  getPrintPageSize,
  loadPrintPageLayout,
} from '@/utils/printPageLayout';

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

type NoteCoverPreviewMountProps = {
  cover: NoteCover;
  getPresignedUrl?: GetPresignedUrl;
};

/**
 * md-editor-rt preview host: always light-mode paper for the cover surface.
 * Body below the host keeps the editor theme.
 */
export default function NoteCoverPreviewMount({
  cover,
  getPresignedUrl,
}: NoteCoverPreviewMountProps) {
  const layout = useMemo(() => loadPrintPageLayout(), []);
  const page = useMemo(() => getPrintPageSize(layout.pageSizeId), [layout.pageSizeId]);
  const cssVars = useMemo(() => buildPrintLayoutCssVars(layout), [layout]);

  return (
    <div
      className="md-note-cover-preview-light w-full bg-white text-gray-900"
      data-note-cover-preview="1"
      data-color-mode="light"
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
