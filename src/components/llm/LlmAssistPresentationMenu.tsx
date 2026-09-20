import { Check, ChevronDown, Columns2, PanelRight, PanelTop } from 'lucide-react';
import { DropdownMenu, Tooltip } from 'radix-ui';
import type { LlmAssistPresentation } from '@/utils/llm/llmAssistPresentation';

const TRIGGER_CLASS =
  'inline-flex items-center gap-0.5 rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50';

const ITEM_CLASS =
  'flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-violet-100 dark:data-highlighted:bg-violet-900/50';

const CONTENT_CLASS =
  'z-100050 min-w-[11rem] rounded-md border border-violet-200/80 bg-white p-1 text-violet-950 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50';

type ModeOption = {
  value: LlmAssistPresentation;
  label: string;
  icon: typeof PanelTop;
  disabled?: boolean;
};

type Props = {
  presentation: LlmAssistPresentation;
  onChange: (next: LlmAssistPresentation) => void;
  /** When false, the split option is disabled. */
  splitEnabled?: boolean;
};

function modeIcon(presentation: LlmAssistPresentation) {
  if (presentation === 'docked') return PanelRight;
  if (presentation === 'split') return Columns2;
  return PanelTop;
}

export default function LlmAssistPresentationMenu({
  presentation,
  onChange,
  splitEnabled = true,
}: Props) {
  const Icon = modeIcon(presentation);
  const options: ModeOption[] = [
    { value: 'floating', label: '플로팅 창', icon: PanelTop },
    { value: 'docked', label: '우측에 고정', icon: PanelRight },
    {
      value: 'split',
      label: '스플릿 창',
      icon: Columns2,
      disabled: !splitEnabled,
    },
  ];

  return (
    <DropdownMenu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={TRIGGER_CLASS}
              aria-label="표시 방식"
            >
              <Icon size={15} aria-hidden />
              <ChevronDown size={12} aria-hidden className="opacity-70" />
            </button>
          </DropdownMenu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={6}
            className="z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50"
          >
            표시 방식
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={4}
          className={CONTENT_CLASS}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {options.map((opt) => {
            const OptIcon = opt.icon;
            const selected = presentation === opt.value;
            return (
              <DropdownMenu.Item
                key={opt.value}
                disabled={Boolean(opt.disabled)}
                className={`${ITEM_CLASS} ${opt.disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                onSelect={() => {
                  if (opt.disabled || opt.value === presentation) return;
                  onChange(opt.value);
                }}
              >
                <OptIcon size={14} className="shrink-0 opacity-80" aria-hidden />
                <span className="min-w-0 flex-1">{opt.label}</span>
                {selected ? <Check size={14} className="shrink-0 text-violet-600 dark:text-violet-300" aria-hidden /> : null}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
