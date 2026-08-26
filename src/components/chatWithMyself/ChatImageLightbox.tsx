import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';
import ChatImageFade from '@/components/chatWithMyself/ChatImageFade';
import ChatImageBackgroundPicker, {
  CHAT_COLOR_PICKER_ATTR,
} from '@/components/chatWithMyself/ChatImageBackgroundPicker';
import { useAppStatusBarInset } from '@/hooks/useAppStatusBarInset';
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
  backgroundLabel = '보기 배경'
}: any) {
  const visible = Boolean(open && src);
  const color = normalizeCssHexColor(backgroundColor);
  const statusBarInset = useAppStatusBarInset(visible);
  const [frameEl, setFrameEl] = useState(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const stageStyle = { bottom: statusBarInset };

  useLayoutEffect(() => {
    if (!visible || !frameEl) return undefined;
    const update = () => {
      // @ts-expect-error TS(2339) FIXME: Property 'clientWidth' does not exist on type 'nev... Remove this comment to see the full error message
      setFrameSize({ width: frameEl.clientWidth, height: frameEl.clientHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(frameEl);
    return () => ro.disconnect();
  }, [visible, statusBarInset, src, frameEl]);

  return (
    <Dialog.Root
      open={visible}
      onOpenChange={(next: any) => {
        if (!next) onClose?.();
      }}
    >
      <AnimatePresence>
        {visible ? (
          <Dialog.Portal forceMount key="chat-image-lightbox">
            <Dialog.Overlay asChild forceMount>
              <Motion.div
                className="fixed inset-x-0 top-0 z-[300] bg-black/85"
                style={stageStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={OVERLAY_TRANSITION}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(e: any) => e.preventDefault()}
              onPointerDownOutside={(event: any) => {
                if (
                  event.target instanceof Element &&
                  event.target.closest(`[${CHAT_COLOR_PICKER_ATTR}]`)
                ) {
                  event.preventDefault();
                }
              }}
              onInteractOutside={(event: any) => {
                if (
                  event.target instanceof Element &&
                  event.target.closest(`[${CHAT_COLOR_PICKER_ATTR}]`)
                ) {
                  event.preventDefault();
                }
              }}
            >
              <Motion.div
                className="fixed inset-x-0 top-0 z-[310] flex flex-col outline-none"
                style={stageStyle}
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
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                <button
                  type="button"
                  className="absolute inset-0 cursor-zoom-out"
                  aria-label="닫기"
                  onClick={() => onClose?.()}
                />
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                <div className="pointer-events-none relative z-[1] flex min-h-0 min-w-0 flex-1 p-4 sm:p-8">
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  <div
                    ref={setFrameEl}
                    className="flex min-h-0 min-w-0 flex-1 items-center justify-center"
                  >
                    {src ? (
                      <div
                        className="pointer-events-auto max-h-full max-w-full overflow-hidden shadow-2xl"
                        style={color ? { backgroundColor: color } : CHECKERBOARD_STYLE}
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        <ChatImageFade
                          src={src}
                          alt={alt || ''}
                          className="block h-auto w-auto max-h-full max-w-full object-contain"
                          style={{
                            maxWidth: frameSize.width || undefined,
                            maxHeight: frameSize.height || undefined,
                          }}
                          draggable={false}
                        />
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                      </div>
                    ) : null}
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  </div>
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                <div
                  className="pointer-events-auto relative z-[2] flex shrink-0 justify-center p-3 sm:p-4"
                  onClick={(e: any) => e.stopPropagation()}
                >
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  <div className="max-w-full rounded-xl bg-black/70 px-3 py-2 shadow-lg backdrop-blur-sm">
                    <ChatImageBackgroundPicker
                      value={color}
                      onChange={(next: any) => onBackgroundColorChange?.(next)}
                      compact
                      tone="dark"
                      label={backgroundLabel}
                    />
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  </div>
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
                <Dialog.Close asChild>
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <button
                    type="button"
                    className="absolute right-3 top-3 z-[2] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="닫기"
                  >
                    <X size={20} />
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
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
export function ChatImageLightboxProvider({
  children
}: any) {
  const [state, setState] = useState({
    src: null,
    alt: '',
    backgroundColor: null,
    backgroundLabel: '보기 배경',
  });
  const persistRef = useRef(null);

  const openChatImage = useCallback((url: any, options = {}) => {
    const src = String(url || '').trim();
    if (!src) return;
    persistRef.current =
      // @ts-expect-error TS(2339) FIXME: Property 'onBackgroundColorChange' does not exist ... Remove this comment to see the full error message
      typeof options.onBackgroundColorChange === 'function'
        // @ts-expect-error TS(2339) FIXME: Property 'onBackgroundColorChange' does not exist ... Remove this comment to see the full error message
        ? options.onBackgroundColorChange
        : null;
    setState({
      // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'null'.
      src,
      // @ts-expect-error TS(2339) FIXME: Property 'alt' does not exist on type '{}'.
      alt: String(options.alt || ''),
      // @ts-expect-error TS(2322) FIXME: Type 'string | null' is not assignable to type 'nu... Remove this comment to see the full error message
      backgroundColor: normalizeCssHexColor(options.backgroundColor),
      backgroundLabel: persistRef.current ? '표시 배경' : '보기 배경',
    });
  }, []);

  const close = useCallback(() => {
    persistRef.current = null;
    setState({ src: null, alt: '', backgroundColor: null, backgroundLabel: '보기 배경' });
  }, []);

  const handleBackgroundColorChange = useCallback((next: any) => {
    const color = normalizeCssHexColor(next);
    // @ts-expect-error TS(2345) FIXME: Argument of type '(prev: { src: null; alt: string;... Remove this comment to see the full error message
    setState((prev) => ({ ...prev, backgroundColor: color }));
    // @ts-expect-error TS(2349) FIXME: This expression is not callable.
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
