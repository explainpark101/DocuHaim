import Button from '@/components/Button';
import { vaultPathBasename } from '@/utils/vault/vaultPathBasename';
import { Check, X } from 'lucide-react';
import { Checkbox, Tooltip } from 'radix-ui';

export type QuizSourcePathsChipsLayout = 'chips' | 'dock';

type QuizSourcePathsChipsProps = {
  paths: string[];
  onRemove?: ((path: string) => void) | undefined;
  onOpenPicker?: (() => void) | undefined;
  onPreview?: ((path: string) => void) | undefined;
  isPathEnabled?: ((path: string) => boolean) | undefined;
  onToggleEnabled?: ((path: string, enabled: boolean) => void) | undefined;
  label?: string;
  emptyHint?: string;
  layout?: QuizSourcePathsChipsLayout;
};

const TOOLTIP_CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,420px)] break-all rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

const DOCK_ROW_CLASS =
  'flex w-full items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100';

const CHIP_CLASS =
  'inline-flex max-w-full items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100';

const SOURCE_CHECKBOX_CLASS =
  'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-violet-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600 dark:border-violet-600 dark:bg-odp-bgSoft dark:data-[state=checked]:border-violet-500 dark:data-[state=checked]:bg-violet-500';

function SourcePathLabel({
  path,
  isDock,
  onPreview,
  muted,
}: {
  path: string;
  isDock: boolean;
  onPreview?: ((path: string) => void) | undefined;
  muted?: boolean;
}) {
  const label = vaultPathBasename(path);
  const className = isDock
    ? `min-w-0 flex-1 truncate text-left hover:underline${muted ? ' opacity-60' : ''}`
    : `min-w-0 max-w-full truncate hover:underline${muted ? ' opacity-60' : ''}`;

  const inner = onPreview ? (
    <button type="button" className={className} onClick={() => onPreview(path)}>
      {label}
    </button>
  ) : (
    <span className={className}>{label}</span>
  );

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {inner}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
          {path}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function QuizSourcePathsChips({
  paths,
  onRemove,
  onOpenPicker,
  onPreview,
  isPathEnabled,
  onToggleEnabled,
  label = '근거 문서',
  emptyHint = '선택된 근거 문서 없음',
  layout = 'chips',
}: QuizSourcePathsChipsProps) {
  const isDock = layout === 'dock';
  const showEnableToggle = isDock && Boolean(onToggleEnabled);

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
            {label}
          </span>
          {onOpenPicker ? (
            <Button type="button" variant="secondary" size="sm" onClick={onOpenPicker}>
              선택
            </Button>
          ) : null}
        </div>
        {paths.length === 0 ? (
          <p className="text-[11px] text-gray-500 dark:text-odp-muted">{emptyHint}</p>
        ) : (
          <ul className={isDock ? 'flex flex-col gap-1.5' : 'flex flex-wrap gap-1.5'}>
            {paths.map((p) => {
              const enabled = isPathEnabled ? isPathEnabled(p) : true;
              const rowClass = isDock
                ? `${DOCK_ROW_CLASS}${enabled ? '' : ' opacity-70'}`
                : CHIP_CLASS;
              return (
                <li key={p} className={rowClass}>
                  {showEnableToggle ? (
                    <Checkbox.Root
                      className={SOURCE_CHECKBOX_CLASS}
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        onToggleEnabled?.(p, checked === true)
                      }
                      aria-label={`${p} ${enabled ? '사용 중' : '사용 안 함'}`}
                    >
                      <Checkbox.Indicator className="text-white">
                        <Check size={10} strokeWidth={3} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  ) : null}
                  <SourcePathLabel
                    path={p}
                    isDock={isDock}
                    onPreview={onPreview}
                    muted={showEnableToggle && !enabled}
                  />
                  {onRemove ? (
                    <button
                      type="button"
                      aria-label={`${p} 제거`}
                      className={
                        isDock
                          ? 'ml-auto shrink-0 rounded-md p-1.5 hover:bg-violet-200/80 dark:hover:bg-violet-900'
                          : 'shrink-0 rounded p-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-900'
                      }
                      onClick={() => onRemove(p)}
                    >
                      <X size={isDock ? 14 : 12} />
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Tooltip.Provider>
  );
}
