import type { CSSProperties } from 'react';
import type { CoverShapeElement } from '@/utils/noteCover/types';

/** Outer shell styles for a shape element (fill + border + radius). */
export function coverShapeShellStyle(el: CoverShapeElement): CSSProperties {
  const borderRadius =
    el.type === 'ellipse'
      ? '50%'
      : el.type === 'roundRect'
        ? `${el.cornerRadiusPct ?? 4}%`
        : 0;
  return {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: el.fill || 'transparent',
    borderWidth: Math.max(0, el.borderWidth),
    borderStyle: el.borderStyle || 'solid',
    borderColor: el.borderColor || 'transparent',
    borderRadius,
  };
}

function shapeTextJustifyContent(
  vAlign: CoverShapeElement['textVAlign'],
): CSSProperties['justifyContent'] {
  if (vAlign === 'middle') return 'center';
  if (vAlign === 'bottom') return 'flex-end';
  return 'flex-start';
}

/**
 * Full-box flex wrapper that places in-shape text (H via textAlign on child,
 * V via justify-content).
 */
export function coverShapeTextBoxStyle(el: CoverShapeElement): CSSProperties {
  const paddingPct = el.paddingPct ?? 0;
  return {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: shapeTextJustifyContent(el.textVAlign),
    width: '100%',
    height: '100%',
    margin: 0,
    padding: `${paddingPct}%`,
    overflow: 'hidden',
  };
}

/** Typography for in-shape text / textarea (content-sized; parent places it). */
export function coverShapeTextContentStyle(el: CoverShapeElement): CSSProperties {
  return {
    boxSizing: 'border-box',
    width: '100%',
    margin: 0,
    padding: 0,
    border: 0,
    background: 'transparent',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    lineHeight: 1.25,
    color: el.color || '#0c4a6e',
    fontSize: `${el.fontSize ?? 24}px`,
    fontWeight: el.fontWeight ?? 'normal',
    textAlign: el.textAlign ?? 'center',
    fontFamily: el.fontFamily || undefined,
  };
}

/** @deprecated Prefer coverShapeTextBoxStyle + coverShapeTextContentStyle. */
export function coverShapeTextStyle(el: CoverShapeElement): CSSProperties {
  return {
    ...coverShapeTextBoxStyle(el),
    ...coverShapeTextContentStyle(el),
  };
}
