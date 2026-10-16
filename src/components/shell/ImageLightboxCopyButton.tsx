import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'radix-ui';
import { Check, Copy } from 'lucide-react';
import { getModKeyLabel } from '@/components/Kbd';
import {
  copyImageSrcToClipboard,
  isLightboxImageCopyShortcut,
} from '@/utils/copyImageToClipboard';

type CopyStatus = 'idle' | 'done' | 'error';

type ImageLightboxCopyButtonProps = {
  src: string;
  className?: string;
};

/**
 * Round copy control for fullscreen image viewers, plus Ctrl/Cmd+C
 * while the viewer is mounted.
 */
export default function ImageLightboxCopyButton({
  src,
  className = 'absolute right-14 top-3 z-2',
}: ImageLightboxCopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const srcRef = useRef(src);
  srcRef.current = src;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = () => {
    const current = srcRef.current;
    if (!current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus('idle');
    void copyImageSrcToClipboard(current)
      .then(() => {
        setStatus('done');
        timerRef.current = setTimeout(() => setStatus('idle'), 1600);
      })
      .catch(() => {
        setStatus('error');
        timerRef.current = setTimeout(() => setStatus('idle'), 2000);
      });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isLightboxImageCopyShortcut(event)) return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || target.isContentEditable) return;
      }
      event.preventDefault();
      event.stopPropagation();
      copy();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const label =
    status === 'done'
      ? '복사됨'
      : status === 'error'
        ? '복사 실패'
        : `이미지 복사 (${getModKeyLabel()}+C)`;

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={`${className} inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80`}
            aria-label={label}
            onClick={(event) => {
              event.stopPropagation();
              copy();
            }}
          >
            {status === 'done' ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow"
          >
            {label}
            <Tooltip.Arrow className="fill-neutral-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
