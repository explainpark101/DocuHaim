import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from 'react';
import {
  fontShorthandFromElement,
  measurePretextBlockHeight,
} from '@/utils/pretextMeasure';

export type PretextAutoHeightTextareaHandle = {
  remeasure: () => void;
};

export type UsePretextTextareaHeightOptions = {
  minHeight?: number;
  maxHeight?: number;
};

/** Canvas pretext measurement for auto-growing textarea height. */
export function usePretextTextareaHeight(
  value: string,
  options: UsePretextTextareaHeightOptions = {},
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { minHeight = 112, maxHeight } = options;
  const [height, setHeight] = useState(minHeight);

  const remeasure = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const cs = window.getComputedStyle(el);
    const paddingY =
      (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
    const paddingX =
      (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    const lineHeightPx =
      parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) || 12) * 1.2;
    const contentWidth = Math.max(0, el.clientWidth - paddingX);
    const font = fontShorthandFromElement(el);
    setHeight(
      measurePretextBlockHeight(value, {
        font,
        contentWidth,
        lineHeightPx,
        paddingY,
        minHeight,
        ...(typeof maxHeight === 'number' ? { maxHeight } : {}),
      }),
    );
  }, [value, minHeight, maxHeight]);

  useLayoutEffect(() => {
    remeasure();
  }, [remeasure]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => remeasure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [remeasure]);

  return { textareaRef, height, remeasure };
}

export type PretextAutoHeightTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'style'
> & {
  minHeight?: number;
  maxHeight?: number;
  /** Re-run pretext height when this changes (e.g. parent panel open). */
  layoutKey?: string | number | boolean;
  style?: React.CSSProperties;
};

const DEFAULT_CLASS =
  'w-full resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-2 text-xs leading-relaxed dark:border-odp-borderSoft dark:bg-odp-bgSoft';

const PretextAutoHeightTextarea = forwardRef<
  PretextAutoHeightTextareaHandle,
  PretextAutoHeightTextareaProps
>(function PretextAutoHeightTextarea(
  {
    value = '',
    minHeight = 112,
    maxHeight,
    layoutKey,
    className = '',
    style,
    ...rest
  },
  ref,
) {
  const text = String(value ?? '');
  const { textareaRef, height, remeasure } = usePretextTextareaHeight(text, {
    minHeight,
    ...(typeof maxHeight === 'number' ? { maxHeight } : {}),
  });

  useImperativeHandle(ref, () => ({ remeasure }), [remeasure]);

  useLayoutEffect(() => {
    if (layoutKey === undefined) return;
    remeasure();
  }, [layoutKey, remeasure]);

  return (
    <textarea
      {...rest}
      ref={textareaRef}
      value={value}
      className={className ? `${DEFAULT_CLASS} ${className}` : DEFAULT_CLASS}
      style={{ ...style, height }}
    />
  );
});

export default PretextAutoHeightTextarea;
