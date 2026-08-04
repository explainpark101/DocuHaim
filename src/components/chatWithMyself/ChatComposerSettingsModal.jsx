import { Dialog, Switch } from 'radix-ui';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

const switchRootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

function SettingsSwitchRow({ id, label, description, checked, onCheckedChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 dark:border-odp-borderSoft dark:bg-odp-bg/40"
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-odp-muted">
            {description}
          </span>
        ) : null}
      </span>
      <Switch.Root
        id={id}
        className={switchRootClass}
        checked={Boolean(checked)}
        onCheckedChange={(next) => onCheckedChange?.(Boolean(next))}
        aria-label={label}
      >
        <Switch.Thumb className={switchThumbClass} />
      </Switch.Root>
    </label>
  );
}

/**
 * Mobile settings dialog for composer toolbar / line-number visibility.
 */
export default function ChatComposerSettingsModal({
  open = false,
  onOpenChange,
  showToolbar = true,
  onShowToolbarChange,
  showLineNumbers = false,
  onShowLineNumbersChange,
}) {
  return (
    <Dialog.Root open={Boolean(open)} onOpenChange={(next) => onOpenChange?.(next)}>
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className={`${chatDialogContentClass} space-y-3`}
          aria-describedby={undefined}
        >
          <div>
            <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
              입력창 설정
            </Dialog.Title>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
              메시지 입력란 표시 옵션
            </p>
          </div>

          <div className="space-y-2">
            <SettingsSwitchRow
              id="chat-composer-settings-toolbar"
              label="툴바"
              description="마크다운 서식 도구 표시"
              checked={showToolbar}
              onCheckedChange={onShowToolbarChange}
            />
            <SettingsSwitchRow
              id="chat-composer-settings-line-numbers"
              label="줄번호"
              description="입력창 왼쪽 줄 번호 표시"
              checked={showLineNumbers}
              onCheckedChange={onShowLineNumbersChange}
            />
          </div>

          <div className="flex justify-end pt-1">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-odp-bg dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
              >
                닫기
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
