import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from 'react';
import { motion as Motion, type HTMLMotionProps } from 'motion/react';

const IMAGE_ENTER = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
};

export type ChatImageFadeProps = Omit<
  HTMLMotionProps<'img'>,
  'initial' | 'animate' | 'transition' | 'onLoad'
> & {
  /** Soft scale-up on reveal. Default true. */
  scaleIn?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
};

/**
 * Fade (and optional scale) in once the image bitmap has loaded.
 * Cached images that are already `complete` animate in immediately.
 */
export default function ChatImageFade({
  className = '',
  scaleIn = true,
  onLoad,
  src,
  alt = '',
  ...rest
}: ChatImageFadeProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(event);
    },
    [onLoad],
  );

  return (
    <Motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      initial={false}
      animate={{
        opacity: loaded ? 1 : 0,
        scale: scaleIn ? (loaded ? 1 : 0.98) : 1,
      }}
      transition={IMAGE_ENTER}
      onLoad={handleLoad}
      {...rest}
    />
  );
}
