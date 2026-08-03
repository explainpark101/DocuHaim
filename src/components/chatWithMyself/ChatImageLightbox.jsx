import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';

const ChatImageLightboxContext = createContext(null);

/**
 * Fullscreen in-app image viewer for chat surfaces.
 */
export function ChatImageLightbox({ src, alt = '', open, onClose }) {
  return (
    <Dialog.Root
      open={Boolean(open && src)}
      onOpenChange={(next) => {
        if (!next) onClose?.();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[300] bg-black/85" />
        <Dialog.Content
          className="fixed inset-0 z-[310] flex outline-none"
          aria-label="이미지 크게 보기"
          onOpenAutoFocus={(e) => e.preventDefault()}
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
              <img
                src={src}
                alt={alt || ''}
                className="pointer-events-auto max-h-full max-w-full object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            ) : null}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Provides `openChatImage(url, { alt })` to chat descendants.
 */
export function ChatImageLightboxProvider({ children }) {
  const [state, setState] = useState({ src: null, alt: '' });

  const openChatImage = useCallback((url, options = {}) => {
    const src = String(url || '').trim();
    if (!src) return;
    setState({ src, alt: String(options.alt || '') });
  }, []);

  const close = useCallback(() => {
    setState({ src: null, alt: '' });
  }, []);

  const value = useMemo(() => openChatImage, [openChatImage]);

  return (
    <ChatImageLightboxContext.Provider value={value}>
      {children}
      <ChatImageLightbox
        src={state.src}
        alt={state.alt}
        open={Boolean(state.src)}
        onClose={close}
      />
    </ChatImageLightboxContext.Provider>
  );
}

export function useChatImageLightbox() {
  return useContext(ChatImageLightboxContext);
}
