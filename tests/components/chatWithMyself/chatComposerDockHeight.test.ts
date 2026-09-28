import { describe, expect, it } from 'vitest';
import {
  chromeHeightAboveEditorRow,
  COMPOSER_SINGLE_LINE_BOTTOM_PAD_PX,
  composerSingleLineBottomPad,
  paddingBoxFromComputedStyle,
  resolveComposerLineHeightPx,
  saneComposerPaddingY,
} from '@/components/chatWithMyself/composerFitMeasure';
import {
  COMPOSER_TOOLBAR_CHROME_H,
  resolveChatComposerDockFitHeight,
  resolveChatComposerDockTargetHeight,
} from '@/components/chatWithMyself/chatComposerDockHeight';

function fakePaddingStyle(
  top: number,
  bottom: number,
  left = 0,
  right = 0,
): CSSStyleDeclaration {
  return {
    paddingTop: `${top}px`,
    paddingBottom: `${bottom}px`,
    paddingLeft: `${left}px`,
    paddingRight: `${right}px`,
  } as CSSStyleDeclaration;
}

describe('paddingBoxFromComputedStyle', () => {
  it('sums vertical and horizontal padding', () => {
    expect(paddingBoxFromComputedStyle(fakePaddingStyle(4, 4, 8, 8))).toEqual({
      paddingY: 8,
      paddingX: 16,
    });
  });

  it('treats missing padding as 0', () => {
    expect(
      paddingBoxFromComputedStyle({
        paddingTop: '',
        paddingBottom: '0',
        paddingLeft: 'auto',
        paddingRight: '',
      } as CSSStyleDeclaration),
    ).toEqual({ paddingY: 0, paddingX: 0 });
  });
});

describe('saneComposerPaddingY', () => {
  it('passes through normal editor padding', () => {
    expect(saneComposerPaddingY(16)).toBe(16);
  });

  it('clamps note scroll-center padding (50vh-scale)', () => {
    expect(saneComposerPaddingY(400)).toBe(16);
  });

  it('floors invalid values', () => {
    expect(saneComposerPaddingY(Number.NaN)).toBe(0);
    expect(saneComposerPaddingY(-4)).toBe(0);
  });
});

describe('resolveComposerLineHeightPx', () => {
  it('uses px line-height when present', () => {
    expect(
      resolveComposerLineHeightPx({
        fontSize: '14px',
        lineHeight: '21px',
      } as CSSStyleDeclaration),
    ).toBe(21);
  });

  it('falls back to ~1.2× font-size for normal', () => {
    expect(
      resolveComposerLineHeightPx({
        fontSize: '14px',
        lineHeight: 'normal',
      } as CSSStyleDeclaration),
    ).toBeCloseTo(16.8);
  });
});

describe('composerSingleLineBottomPad', () => {
  it('adds pad only for single hard-line short measures', () => {
    expect(composerSingleLineBottomPad('hello', 36, 20)).toBe(
      COMPOSER_SINGLE_LINE_BOTTOM_PAD_PX,
    );
    expect(composerSingleLineBottomPad('a\nb', 36, 20)).toBe(0);
    // Soft-wrapped tall single hard line — skip boost.
    expect(composerSingleLineBottomPad('long…', 80, 20)).toBe(0);
  });
});

describe('chromeHeightAboveEditorRow', () => {
  it('uses top delta so same-row grid siblings are not double-counted', () => {
    // Toolbar grid: attach + group share y=100; editor row at y=146 (40 + 6 gap).
    expect(chromeHeightAboveEditorRow(100, 146)).toBe(46);
  });

  it('floors at 0 when editor is above controls (layout race)', () => {
    expect(chromeHeightAboveEditorRow(200, 180)).toBe(0);
  });

  it('ceils fractional subpixels', () => {
    expect(chromeHeightAboveEditorRow(10.2, 50.7)).toBe(41);
  });
});

describe('resolveChatComposerDockFitHeight', () => {
  it('prefers contentFloor so shorter content / helper off can shrink', () => {
    expect(
      resolveChatComposerDockFitHeight({
        maxHeight: 640,
        baseHeight: 280,
        fitPreviewHeight: 40,
        fitContentHeight: 200,
        toolbarChromeHeight: COMPOSER_TOOLBAR_CHROME_H,
      }),
    ).toBe(200);
  });

  it('falls back to base + preview + toolbar when contentFloor is absent', () => {
    expect(
      resolveChatComposerDockFitHeight({
        maxHeight: 640,
        baseHeight: 280,
        fitPreviewHeight: 40,
        fitContentHeight: null,
        toolbarChromeHeight: COMPOSER_TOOLBAR_CHROME_H,
      }),
    ).toBe(280 + 40 + COMPOSER_TOOLBAR_CHROME_H);
  });
});

describe('resolveChatComposerDockTargetHeight', () => {
  it('adds toolbar and helper chrome when not auto-fitting', () => {
    expect(
      resolveChatComposerDockTargetHeight({
        height: 280,
        maxHeight: 640,
        autoFit: false,
        fitHeight: null,
        isResizing: false,
        toolbarChromeHeight: COMPOSER_TOOLBAR_CHROME_H,
        helperChromeHeight: 18,
      }),
    ).toBe(280 + COMPOSER_TOOLBAR_CHROME_H + 18);
  });

  it('uses fitHeight during autoFit without re-adding chrome', () => {
    expect(
      resolveChatComposerDockTargetHeight({
        height: 280,
        maxHeight: 640,
        autoFit: true,
        fitHeight: 360,
        isResizing: false,
        toolbarChromeHeight: COMPOSER_TOOLBAR_CHROME_H,
        helperChromeHeight: 18,
      }),
    ).toBe(360);
  });
});
