import { describe, expect, it } from 'vitest';
import {
  clampLlmModalLayout,
  LLM_MODAL_HEADER_ESTIMATE,
  LLM_MODAL_MIN_HEIGHT,
  LLM_MODAL_MIN_WIDTH,
} from '@/utils/llm/llmModalLayout';

describe('clampLlmModalLayout drag bounds', () => {
  const bounds = {
    left: 100,
    top: 80,
    right: 900,
    bottom: 700,
    width: 800,
    height: 620,
  };

  it('does not allow top above the navbar bottom (bounds.top)', () => {
    const next = clampLlmModalLayout(
      {
        leftPx: 200,
        topPx: 10,
        widthPx: 400,
        heightPx: 300,
      },
      bounds,
    );
    expect(next.topPx).toBe(80);
  });

  it('allows top down to where the purple header stays visible', () => {
    const next = clampLlmModalLayout(
      {
        leftPx: 200,
        topPx: 9999,
        widthPx: 400,
        heightPx: 400,
      },
      bounds,
    );
    expect(next.topPx).toBe(bounds.bottom - LLM_MODAL_HEADER_ESTIMATE);
    // Full panel need not stay inside bounds — only the header strip.
    expect(next.topPx + next.heightPx).toBeGreaterThan(bounds.bottom);
  });

  it('keeps minimum size', () => {
    const next = clampLlmModalLayout(
      {
        leftPx: 200,
        topPx: 100,
        widthPx: 10,
        heightPx: 10,
      },
      bounds,
    );
    expect(next.widthPx).toBe(LLM_MODAL_MIN_WIDTH);
    expect(next.heightPx).toBe(LLM_MODAL_MIN_HEIGHT);
  });
});
