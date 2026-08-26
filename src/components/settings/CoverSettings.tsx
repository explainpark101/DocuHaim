import { useEffect, useState } from 'react';
import { Switch } from 'radix-ui';
import SliderWithScrubInput from '@/components/SliderWithScrubInput';
import {
  COVER_SETTINGS_CHANGED_EVENT,
  COVER_SNAP_TOLERANCE_PX_DEFAULT,
  COVER_SNAP_TOLERANCE_PX_MAX,
  COVER_SNAP_TOLERANCE_PX_MIN,
  getCachedCoverSettings,
  type CoverAppSettings,
} from '@/utils/noteCover/coverSettingsStore';
import { setSettingsToggle } from '@/utils/advancedSearch/settingsToggles';
import {
  saveCoverCenterSnapTolerance,
  saveCoverObjectSnapTolerance,
} from '@/utils/noteCover/snapSettings';

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');
const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

function Row({
  label,
  description,
  checked,
  onCheckedChange,
  ariaLabel,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-xs font-semibold text-gray-700 dark:text-odp-fg">{label}</div>
        <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
          {description}
        </p>
      </div>
      <Switch.Root
        className={switchRootClass(checked)}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={ariaLabel}
      >
        <Switch.Thumb className={switchThumbClass} />
      </Switch.Root>
    </div>
  );
}

export default function CoverSettings() {
  const [settings, setSettings] = useState<CoverAppSettings>(() => getCachedCoverSettings());

  useEffect(() => {
    const sync = () => setSettings(getCachedCoverSettings());
    sync();
    window.addEventListener(COVER_SETTINGS_CHANGED_EVENT, sync);
    return () => window.removeEventListener(COVER_SETTINGS_CHANGED_EVENT, sync);
  }, []);

  return (
    <div
      id="settings-cover"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">표지 편집</h3>
      <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
        표지 편집기의 스냅·미리보기 옵션입니다. Haim vault의{' '}
        <code className="rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft">.settings/cover.json</code>
        에 동기화됩니다.
      </p>

      <div className="space-y-4">
        <div className="space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
          <Row
            label="가운데 스냅"
            description="드래그 시 페이지 가로·세로 중앙선에 맞춤"
            checked={settings.centerSnapEnabled}
            onCheckedChange={(checked) =>
              setSettingsToggle('settings-cover-center-snap', checked)
            }
            ariaLabel="가운데 스냅"
          />
          <label className="block space-y-1 pt-1">
            <span className="text-[10px] text-gray-400">허용 오차</span>
            <SliderWithScrubInput
              unit="css"
              suffix="px"
              min={COVER_SNAP_TOLERANCE_PX_MIN}
              max={COVER_SNAP_TOLERANCE_PX_MAX}
              step={0.1}
              value={settings.centerSnapTolerancePx}
              aria-label="가운데 스냅 허용 오차"
              onChange={(v) => saveCoverCenterSnapTolerance(v)}
            />
          </label>
        </div>

        <div className="space-y-2 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
          <Row
            label="개체 스냅"
            description="다른 개체의 테두리·가운데선에 맞춤 (그룹은 통째로)"
            checked={settings.objectSnapEnabled}
            onCheckedChange={(checked) =>
              setSettingsToggle('settings-cover-object-snap', checked)
            }
            ariaLabel="개체 스냅"
          />
          <label className="block space-y-1 pt-1">
            <span className="text-[10px] text-gray-400">허용 오차</span>
            <SliderWithScrubInput
              unit="css"
              suffix="px"
              min={COVER_SNAP_TOLERANCE_PX_MIN}
              max={COVER_SNAP_TOLERANCE_PX_MAX}
              step={0.1}
              value={settings.objectSnapTolerancePx}
              aria-label="개체 스냅 허용 오차"
              onChange={(v) => saveCoverObjectSnapTolerance(v)}
            />
          </label>
        </div>

        <div className="rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
          <Row
            label="텍스트 상자 표시"
            description="선택과 무관하게 모든 텍스트 상자를 옅은 붉은 실선으로 표시"
            checked={settings.textContainerOutlineEnabled}
            onCheckedChange={(checked) =>
              setSettingsToggle('settings-cover-text-outline', checked)
            }
            ariaLabel="텍스트 상자 표시"
          />
        </div>

        <div className="rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
          <Row
            label="삽입 미리보기"
            description="텍스트·이미지·도형 삽입 시 반투명 고스트 미리보기"
            checked={settings.placePreviewEnabled}
            onCheckedChange={(checked) =>
              setSettingsToggle('settings-cover-place-preview', checked)
            }
            ariaLabel="삽입 미리보기"
          />
        </div>

        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          스냅 허용 오차 기본값 {COVER_SNAP_TOLERANCE_PX_DEFAULT}px · 0.1px 단위
        </p>
      </div>
    </div>
  );
}
