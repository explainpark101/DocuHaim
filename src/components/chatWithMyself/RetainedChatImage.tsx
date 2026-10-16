import { useLayoutEffect, useRef } from 'react';
import {
  acquireRetainedChatImage,
  parkRetainedChatImage,
  type RetainedChatImageOptions,
} from '@/utils/chatWithMyself/retainedChatImage';

type RetainedChatImageProps = {
  src: string;
  alt?: string;
  className?: string;
  backgroundColor?: string;
  referrerPolicy?: ReferrerPolicy;
  draggable?: boolean;
};

/**
 * Renders a chat image by moving a retained <img> into place.
 * Unmount parks that element so the bitmap survives virtua row recycling.
 */
export default function RetainedChatImage({
  src,
  alt = '',
  className = '',
  backgroundColor,
  referrerPolicy,
  draggable = false,
}: RetainedChatImageProps) {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const backgroundColorRef = useRef(backgroundColor);
  const referrerPolicyRef = useRef(referrerPolicy);
  backgroundColorRef.current = backgroundColor;
  referrerPolicyRef.current = referrerPolicy;

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || !src) return undefined;
    const opts: RetainedChatImageOptions = {
      src,
      alt,
      className,
      draggable,
      ...(backgroundColorRef.current
        ? { backgroundColor: backgroundColorRef.current }
        : {}),
      ...(referrerPolicyRef.current
        ? { referrerPolicy: referrerPolicyRef.current }
        : {}),
    };
    const img = acquireRetainedChatImage(opts);
    host.appendChild(img);
    return () => {
      parkRetainedChatImage(img);
    };
  }, [src, alt, className, draggable]);

  useLayoutEffect(() => {
    const img = hostRef.current?.querySelector('img');
    if (!(img instanceof HTMLImageElement)) return;
    img.style.backgroundColor = backgroundColor ?? '';
  }, [backgroundColor, src]);

  return <span ref={hostRef} className="contents" />;
}
