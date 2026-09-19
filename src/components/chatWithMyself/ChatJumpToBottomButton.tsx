import { ChevronsDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Tooltip } from 'radix-ui';
import Button from '@/components/Button';

type ChatJumpToBottomButtonProps = {
  visible: boolean;
  onClick: () => void;
  busy?: boolean;
};

/**
 * Floating control to jump to the absolute latest messages (viewport + day window).
 */
export default function ChatJumpToBottomButton({
  visible,
  onClick,
  busy = false,
}: ChatJumpToBottomButtonProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="chat-jump-to-bottom"
          className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.16 }}
        >
          <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="pointer-events-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={busy}
                    aria-label="가장 밑으로"
                    onClick={onClick}
                    className="rounded-full border border-gray-200/90 bg-white/95 px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur-sm dark:border-odp-borderSoft dark:bg-odp-surface/95"
                  >
                    <ChevronsDown size={14} aria-hidden />
                    가장 밑으로
                  </Button>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  sideOffset={6}
                  className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong"
                >
                  최신 메시지로 이동
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
