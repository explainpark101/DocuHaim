import { useState } from 'react';
import { Tooltip } from 'radix-ui';
import { Download } from 'lucide-react';
import { downloadImageSrc } from '@/utils/downloadImageSrc';

type ImageLightboxDownloadButtonProps = {
  src: string;
  className?: string;
};

/**
 * Round download control for fullscreen image viewers.
 * Place it immediately to the left of the copy button.
 */
export default function ImageLightboxDownloadButton({
  src,
  className = '',
}: ImageLightboxDownloadButtonProps) {
  const [busy, setBusy] = useState(false);

  const download = () => {
    if (!src || busy) return;
    setBusy(true);
    void downloadImageSrc(src)
      .catch((error) => {
        console.error('Image download failed:', error);
      })
      .finally(() => setBusy(false));
  };

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={`${className} inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 disabled:opacity-50`}
            aria-label="이미지 다운로드"
            disabled={busy}
            onClick={(event) => {
              event.stopPropagation();
              download();
            }}
          >
            <Download size={18} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="z-100070 max-w-[min(92vw,240px)] rounded-md border border-white/20 bg-neutral-900 px-2 py-1 text-xs text-white shadow"
          >
            이미지 다운로드
            <Tooltip.Arrow className="fill-neutral-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
