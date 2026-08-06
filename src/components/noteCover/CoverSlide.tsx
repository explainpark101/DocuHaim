import type { CSSProperties, ReactNode } from 'react';
import { getCoverFrameRect } from '@/utils/noteCover/layout';
import {
  coverShapeShellStyle,
  coverShapeTextBoxStyle,
  coverShapeTextContentStyle,
} from '@/utils/noteCover/shapeStyle';
import {
  isCoverShapeElement,
  type CoverElement,
  type CoverShapeElement,
  type NoteCover,
} from '@/utils/noteCover/types';
import { useCoverImageUrl } from '@/hooks/useCoverImageUrl';

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

type CoverSlideProps = {
  cover: NoteCover;
  getPresignedUrl?: GetPresignedUrl;
  className?: string;
  style?: CSSProperties;
  /** When true, show a dashed content-frame outline (edit mode). */
  showFrameOutline?: boolean;
  /** When false, only bg + frame shell (editor draws elements). Default true. */
  renderElements?: boolean;
  children?: ReactNode;
};

function CoverBgImage({
  path,
  getPresignedUrl,
}: {
  path: string;
  getPresignedUrl?: GetPresignedUrl;
}) {
  const url = useCoverImageUrl(path, getPresignedUrl);
  if (!url) return null;
  return (
    <img
      src={url}
      alt=""
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
  );
}

function CoverImageEl({
  path,
  getPresignedUrl,
}: {
  path: string;
  getPresignedUrl?: GetPresignedUrl;
}) {
  const url = useCoverImageUrl(path, getPresignedUrl);
  if (!url) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400">
        이미지
      </div>
    );
  }
  return (
    <img
      src={url}
      alt=""
      className="h-full w-full object-fill"
      draggable={false}
    />
  );
}

function elementStyle(el: CoverElement): CSSProperties {
  return {
    position: 'absolute',
    left: `${el.x}%`,
    top: `${el.y}%`,
    width: `${el.w}%`,
    height: `${el.h}%`,
  };
}

/** Read-only shape body (fill/border + optional in-shape text). */
export function CoverShapeBody({ el }: { el: CoverShapeElement }) {
  const text = el.text ?? '';
  return (
    <div className="h-full w-full" style={coverShapeShellStyle(el)} data-cover-shape={el.type}>
      {text ? (
        <div style={coverShapeTextBoxStyle(el)}>
          <div style={coverShapeTextContentStyle(el)}>{text}</div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Read-only cover page renderer (preview + print).
 * Element coordinates are frame-local (% of content frame).
 */
export default function CoverSlide({
  cover,
  getPresignedUrl,
  className = '',
  style,
  showFrameOutline = false,
  renderElements = true,
  children,
}: CoverSlideProps) {
  const frame = getCoverFrameRect(cover.layout);
  const bgColor = cover.bg.color || '#ffffff';

  return (
    <div
      className={`export-pdf-cover relative z-2 overflow-hidden bg-white text-gray-900 ${className}`}
      style={{
        width: 'var(--print-page-width)',
        height: 'var(--print-page-height)',
        backgroundColor: bgColor,
        ...style,
      }}
      data-note-cover="1"
      // Keep paper pgbr/heading context handlers from stealing cover right-clicks
      // (e.g. when paper content overlaps or hit-testing falls through).
      onContextMenu={(event) => {
        event.stopPropagation();
      }}
    >
      {cover.bg.imagePath ? (
        <CoverBgImage path={cover.bg.imagePath} getPresignedUrl={getPresignedUrl} />
      ) : null}
      <div
        className={`absolute top-0 bottom-0 ${showFrameOutline ? 'outline outline-1 outline-dashed outline-blue-400/70' : ''}`}
        style={{
          left: `${frame.leftPct}%`,
          width: `${frame.widthPct}%`,
        }}
        data-cover-frame="1"
      >
        {renderElements
          ? cover.elements.map((el) => {
              if (el.type === 'text') {
                return (
                  <div
                    key={el.id}
                    data-cover-el={el.id}
                    style={{
                      ...elementStyle(el),
                      color: el.color,
                      fontSize: `${el.fontSize}px`,
                      fontWeight: el.fontWeight,
                      textAlign: el.textAlign,
                      fontFamily: el.fontFamily || undefined,
                      overflow: 'hidden',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      lineHeight: 1.25,
                    }}
                  >
                    {el.text}
                  </div>
                );
              }
              if (isCoverShapeElement(el)) {
                return (
                  <div key={el.id} data-cover-el={el.id} style={elementStyle(el)}>
                    <CoverShapeBody el={el} />
                  </div>
                );
              }
              return (
                <div key={el.id} data-cover-el={el.id} style={elementStyle(el)}>
                  <CoverImageEl path={el.path} getPresignedUrl={getPresignedUrl} />
                </div>
              );
            })
          : null}
        {children}
      </div>
    </div>
  );
}
