import { describe, expect, it } from 'vitest';
import {
  paddingBoxFromComputedStyle,
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
