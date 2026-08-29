import {
  useCallback,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefCallback,
} from 'react';
import { createPretextMeasurer, fontShorthandFromElement } from '@/utils/pretextMeasure';

type Options = {
  /** Padding, icons, chevron, gaps beyond measured text. */
  extraPx?: number;
  minPx?: number;
  maxPx?: number;
};

/**
 * Fit an input/select trigger width to its current label via canvas pretext.
 * Attach `ref` to the element whose font should be sampled.
 */
export function usePretextFitWidth(
  text: string,
  options: Options = {},
): { ref: RefCallback<HTMLElement | null>; style: CSSProperties; widthPx: number } {
  const { extraPx = 0, minPx = 32, maxPx } = options;
  const [widthPx, setWidthPx] = useState(minPx);
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback<RefCallback<HTMLElement | null>>((el) => {
    setNode(el);
  }, []);

  useLayoutEffect(() => {
    if (!node) return;
    const measure = createPretextMeasurer(fontShorthandFromElement(node));
    let next = Math.ceil(measure(String(text ?? '')) + extraPx);
    if (Number.isFinite(minPx)) next = Math.max(minPx, next);
    if (maxPx != null && Number.isFinite(maxPx)) next = Math.min(maxPx, next);
    setWidthPx((prev) => (prev === next ? prev : next));
  }, [extraPx, maxPx, minPx, node, text]);

  return {
    ref,
    style: { width: widthPx },
    widthPx,
  };
}
