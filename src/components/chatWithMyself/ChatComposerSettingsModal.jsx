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
 * Chat settings dialog (composer display + link behavior + motion performance).
 */
export default function ChatComposerSettingsModal({
  open = false,
  onOpenChange,
  showToolbar = true,
  onShowToolbarChange,
  showLineNumbers = false,
  onShowLineNumbersChange,
  openLinksInNewWindow = false,
  onOpenLinksInNewWindowChange,
  perfReduceLayoutAnim = false,
  onPerfReduceLayoutAnimChange,
  perfReduceBubblePressFx = false,
  onPerfReduceBubblePressFxChange,
  composerLightweight = false,
  onComposerLightweightChange,
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
              채팅 설정
            </Dialog.Title>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
              나와의 채팅 표시·입력 옵션
            </p>
          </div>

          <div className="space-y-2">
            <SettingsSwitchRow
              id="chat-composer-settings-toolbar"
              label="툴바"
              description={
                composerLightweight
                  ? '경량 입력창에서는 사용할 수 없습니다'
                  : '마크다운 서식 도구 표시'
              }
              checked={showToolbar}
              onCheckedChange={onShowToolbarChange}
            />
            <SettingsSwitchRow
              id="chat-composer-settings-line-numbers"
              label="줄번호"
              description={
                composerLightweight
                  ? '경량 입력창에서는 사용할 수 없습니다'
                  : '입력창 왼쪽 줄 번호 표시'
              }
              checked={showLineNumbers}
              onCheckedChange={onShowLineNumbersChange}
            />
            <SettingsSwitchRow
              id="chat-settings-open-links-new-window"
              label="링크를 새창으로 열기"
              description="메시지·미리보기의 http(s) 링크를 새 탭에서 엽니다"
              checked={openLinksInNewWindow}
              onCheckedChange={onOpenLinksInNewWindowChange}
            />
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-3 dark:border-odp-borderSoft">
            <p className="px-0.5 text-xs font-medium text-gray-500 dark:text-odp-muted">
              성능 (이 기기에만 저장 · 켜면 가벼워짐)
            </p>
            <SettingsSwitchRow
              id="chat-settings-perf-reduce-layout-anim"
              label="레이아웃 모션 줄이기"
              description="리스트 layout·popLayout·blur 애니메이션 끔 (Safari 기본 켬)"
              checked={perfReduceLayoutAnim}
              onCheckedChange={onPerfReduceLayoutAnimChange}
            />
            <SettingsSwitchRow
              id="chat-settings-perf-reduce-bubble-press-fx"
              label="말풍선 필터 줄이기"
              description="will-change·brightness 누름 효과 끔 (Safari 기본 켬)"
              checked={perfReduceBubblePressFx}
              onCheckedChange={onPerfReduceBubblePressFxChange}
            />
            <SettingsSwitchRow
              id="chat-settings-composer-lightweight"
              label="경량 입력창"
              description="CodeMirror 대신 textarea (Safari 기본 켬)"
              checked={composerLightweight}
              onCheckedChange={onComposerLightweightChange}
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
