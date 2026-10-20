import { Sparkles } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { useLlmAssistOpenOptional } from '@/contexts/LlmAssistSessionContext';

type Props = {
  onToggle?: () => void;
};

/** md-editor-rt defToolbars: toggles AI assist. Open state stays in its own context. */
export default function LlmAssistToolbar({ onToggle }: Props) {
  const assist = useLlmAssistOpenOptional();
  const active = Boolean(assist?.open);
  const label = active ? 'AI 도우미 닫기' : 'AI 도우미';
  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={[
              'md-editor-toolbar-item',
              active
                ? 'md-editor-toolbar-active bg-violet-200! hover:bg-violet-300! dark:bg-violet-800/85! dark:hover:bg-violet-700/90!'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onToggle?.()}
            aria-label={label}
            aria-pressed={active}
          >
            <Sparkles className="md-editor-icon" size={16} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50"
          >
            {label}
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
