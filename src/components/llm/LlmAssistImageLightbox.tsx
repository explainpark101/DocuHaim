import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';

const OVERLAY_TRANSITION = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };
const PANEL_TRANSITION = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

const CHECKERBOARD_STYLE = {
  backgroundColor: '#ffffff',
  backgroundImage: [
    'linear-gradient(45deg, #d4d4d4 25%, transparent 25%)',
    'linear-gradient(-45deg, #d4d4d4 25%, transparent 25%)',
    'linear-gradient(45deg, transparent 75%, #d4d4d4 75%)',
    'linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)',
  ].join(','),
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
};

export type LlmAssistImageLightboxProps = {
  src: string | null;
  alt?: string;
  open: boolean;
  onClose: () => void;
};

/**
 * Fullscreen viewer for LLM Assist input images. Stacks above LlmAssistModal (z-10050).
 */
export default function LlmAssistImageLightbox({
  src,
  alt = '',
  open,
  onClose,
}: LlmAssistImageLightboxProps) {
  const visible = Boolean(open && src);

  return (
    <Dialog.Root
      open={visible}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <AnimatePresence>
        {visible ? (
          <Dialog.Portal forceMount key="llm-assist-image-lightbox">
            <Dialog.Overlay asChild forceMount>
              <Motion.div
                className="fixed inset-0 z-100060 bg-black/85"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={OVERLAY_TRANSITION}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Motion.div
                className="fixed inset-0 z-100061 flex flex-col outline-none"
                aria-label="이미지 크게 보기"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={PANEL_TRANSITION}
              >
                <Dialog.Title className="sr-only">이미지 크게 보기</Dialog.Title>
                <Dialog.Description className="sr-only">
                  입력 이미지를 확대해 보는 화면입니다. Esc 또는 닫기로 종료할 수 있습니다.
                </Dialog.Description>
                <button
                  type="button"
                  className="absolute inset-0 cursor-zoom-out"
                  aria-label="닫기"
                  onClick={() => onClose()}
                />
                <div className="pointer-events-none relative z-1 flex min-h-0 min-w-0 flex-1 items-center justify-center p-4 sm:p-8">
                  {src ? (
                    <div
                      className="pointer-events-auto max-h-full max-w-full overflow-hidden shadow-2xl"
                      style={CHECKERBOARD_STYLE}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={src}
                        alt={alt || ''}
                        className="block h-auto w-auto max-h-[min(88vh,100%)] max-w-full object-contain"
                        draggable={false}
                      />
                    </div>
                  ) : null}
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-3 top-3 z-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="닫기"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </Motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
