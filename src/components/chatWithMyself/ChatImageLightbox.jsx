import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';
import ChatImageFade from '@/components/chatWithMyself/ChatImageFade';
import ChatImageBackgroundPicker from '@/components/chatWithMyself/ChatImageBackgroundPicker';
import { normalizeCssHexColor } from '@/utils/cssColor';

const ChatImageLightboxContext = createContext(null);

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

/**
 * Fullscreen in-app image viewer for chat surfaces.
 */
export function ChatImageLightbox({
  src,
  alt = '',
  open,
  onClose,
  backgroundColor = null,
  onBackgroundColorChange,
  backgroundLabel = '보기 배경',
}) {
  const visible = Boolean(open && src);
  const color = normalizeCssHexColor(backgroundColor);

  return (
    <Dialog.Root
      open={visible}
      onOpenChange={(next) => {
        if (!next) onClose?.();
      }}
    >
      <AnimatePresence>
        {visible ? (
          <Dialog.Portal forceMount key="chat-image-lightbox">
            <Dialog.Overlay asChild forceMount>
              <Motion.div
                className="fixed inset-0 z-[300] bg-black/85"
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
                className="fixed inset-0 z-[310] flex outline-none"
                aria-label="이미지 크게 보기"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={PANEL_TRANSITION}
              >
                <Dialog.Title className="sr-only">이미지 크게 보기</Dialog.Title>
                <Dialog.Description className="sr-only">
                  이미지를 확대해 보는 화면입니다. Esc 또는 닫기로 종료할 수 있습니다.
                </Dialog.Description>
                <button
                  type="button"
                  className="absolute inset-0 cursor-zoom-out"
                  aria-label="닫기"
                  onClick={() => onClose?.()}
                />
                <div className="pointer-events-none relative z-[1] flex h-full w-full items-center justify-center p-4 sm:p-8">
                  {src ? (
                    <div
                      className="pointer-events-auto max-h-full max-w-full overflow-hidden shadow-2xl"
                      style={color ? { backgroundColor: color } : CHECKERBOARD_STYLE}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ChatImageFade
                        src={src}
                        alt={alt || ''}
                        className="max-h-[min(100vh-7rem,100%)] max-w-full object-contain"
                        draggable={false}
                      />
                    </div>
                  ) : null}
                </div>
                <div
                  className="pointer-events-auto absolute inset-x-0 bottom-0 z-[2] flex justify-center p-3 sm:p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="max-w-full rounded-xl bg-black/70 px-3 py-2 shadow-lg backdrop-blur-sm">
                    <ChatImageBackgroundPicker
                      value={color}
                      onChange={(next) => onBackgroundColorChange?.(next)}
                      compact
                      tone="dark"
                      label={backgroundLabel}
                    />
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-3 top-3 z-[2] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
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

/**
 * Provides `openChatImage(url, { alt, backgroundColor, onBackgroundColorChange })` to chat descendants.
 */
export function ChatImageLightboxProvider({ children }) {
  const [state, setState] = useState({
    src: null,
    alt: '',
    backgroundColor: null,
    backgroundLabel: '보기 배경',
  });
  const persistRef = useRef(null);

  const openChatImage = useCallback((url, options = {}) => {
    const src = String(url || '').trim();
    if (!src) return;
    persistRef.current =
      typeof options.onBackgroundColorChange === 'function'
        ? options.onBackgroundColorChange
        : null;
    setState({
      src,
      alt: String(options.alt || ''),
      backgroundColor: normalizeCssHexColor(options.backgroundColor),
      backgroundLabel: persistRef.current ? '표시 배경' : '보기 배경',
    });
  }, []);

  const close = useCallback(() => {
    persistRef.current = null;
    setState({ src: null, alt: '', backgroundColor: null, backgroundLabel: '보기 배경' });
  }, []);

  const handleBackgroundColorChange = useCallback((next) => {
    const color = normalizeCssHexColor(next);
    setState((prev) => ({ ...prev, backgroundColor: color }));
    persistRef.current?.(color);
  }, []);

  const value = useMemo(() => openChatImage, [openChatImage]);

  return (
    <ChatImageLightboxContext.Provider value={value}>
      {children}
      <ChatImageLightbox
        src={state.src}
        alt={state.alt}
        backgroundColor={state.backgroundColor}
        backgroundLabel={state.backgroundLabel}
        onBackgroundColorChange={handleBackgroundColorChange}
        open={Boolean(state.src)}
        onClose={close}
      />
    </ChatImageLightboxContext.Provider>
  );
}

export function useChatImageLightbox() {
  return useContext(ChatImageLightboxContext);
}
