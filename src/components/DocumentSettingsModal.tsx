import { useEffect, useMemo, useState } from 'react';
import { RadioGroup } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import FontFamilyInput from '@/components/FontFamilyInput';
import { IconBack, IconCheck, IconRefresh } from '@/components/icons';
import {
  DEFAULT_DOCUMENT_SETTINGS_META,
  DEFAULT_SOURCE_LIST_TITLE,
  type DocumentSettingsMeta,
} from '@/utils/documentSettingsMeta';
import { buildFontFamilyOptions } from '@/utils/fontOptions';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';
import {
  HAIM_TYPOGRAPHY_RULE_DEFS,
  loadHaimTypographyGlobal,
  normalizeHaimTypographyOverrides,
  type HaimTypographyOverrides,
  type HaimTypographyRuleId,
} from '@/utils/haimTypographySettings';
import {
  HaimTypographyStatusDot,
  haimTypographyStatusTone,
} from '@/components/settings/HaimTypographyStatusDot';

export type DocumentSettingsModalProps = {
  isOpen: boolean;
  onClose?: (() => void) | undefined;
  settings?: DocumentSettingsMeta | null | undefined;
  onApply?: ((settings: DocumentSettingsMeta) => void) | undefined;
};

const FONT_FIELDS = [
  ['body', '본문', '예: Noto Sans KR, serif'],
  ['heading', '제목', '예: Noto Serif KR, Georgia'],
  ['bold', '굵은 글씨', '예: Noto Sans KR, sans-serif'],
  ['code', '코드', '예: JetBrains Mono, monospace'],
] as const;

type TypographyMode = 'inherit' | 'on' | 'off';

function modeFromOverride(
  overrides: HaimTypographyOverrides | undefined,
  id: HaimTypographyRuleId,
): TypographyMode {
  if (!overrides || !(id in overrides)) return 'inherit';
  return overrides[id] ? 'on' : 'off';
}

function setOverrideMode(
  overrides: HaimTypographyOverrides | undefined,
  id: HaimTypographyRuleId,
  mode: TypographyMode,
): HaimTypographyOverrides | undefined {
  const next: HaimTypographyOverrides = { ...(overrides ?? {}) };
  if (mode === 'inherit') {
    delete next[id];
  } else {
    next[id] = mode === 'on';
  }
  return normalizeHaimTypographyOverrides(next);
}

const TYPOGRAPHY_MODE_OPTIONS: ReadonlyArray<{
  value: TypographyMode;
  label: string;
}> = [
  { value: 'inherit', label: '전역' },
  { value: 'on', label: '켜기' },
  { value: 'off', label: '끄기' },
];

/**
 * Per-document footnote / font / Haim typography settings. Uses max-w (not bare w-[min]) so
 * Modal's w-full does not expand to the viewport and kill corner-resize room.
 */
export default function DocumentSettingsModal({
  isOpen,
  onClose,
  settings,
  onApply,
}: DocumentSettingsModalProps) {
  const [local, setLocal] = useState<DocumentSettingsMeta>(
    () => settings ?? DEFAULT_DOCUMENT_SETTINGS_META,
  );
  const [fontOptionsTick, setFontOptionsTick] = useState(0);
  const [globalTypography, setGlobalTypography] = useState(() =>
    loadHaimTypographyGlobal(),
  );

  useEffect(() => {
    if (isOpen) {
      setLocal(settings ?? DEFAULT_DOCUMENT_SETTINGS_META);
      setGlobalTypography(loadHaimTypographyGlobal());
    }
  }, [isOpen, settings]);

  useEffect(() => {
    const onWebfonts = () => setFontOptionsTick((n) => n + 1);
    window.addEventListener(WEBFONTS_CHANGED_EVENT, onWebfonts);
    return () => window.removeEventListener(WEBFONTS_CHANGED_EVENT, onWebfonts);
  }, []);

  const fontOptions = useMemo(
    () => buildFontFamilyOptions(),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick refreshes webfont families
    [fontOptionsTick],
  );

  const updateSourceList = (patch: Partial<DocumentSettingsMeta['sourceList']>) => {
    setLocal((prev) => ({
      ...prev,
      sourceList: { ...prev.sourceList, ...patch },
    }));
  };

  const updateFont = (key: keyof DocumentSettingsMeta['fonts'], value: string) => {
    setLocal((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, [key]: value },
    }));
  };

  const handleResetFonts = () => {
    setLocal((prev) => ({
      ...prev,
      fonts: { ...DEFAULT_DOCUMENT_SETTINGS_META.fonts },
      webfontCss: '',
    }));
  };

  const handleResetTypography = () => {
    setLocal((prev) => {
      const next = { ...prev };
      delete next.haimTypography;
      return next;
    });
  };

  const handleTypographyMode = (id: HaimTypographyRuleId, mode: TypographyMode) => {
    setLocal((prev) => {
      const haimTypography = setOverrideMode(prev.haimTypography, id, mode);
      const next: DocumentSettingsMeta = { ...prev };
      if (haimTypography) next.haimTypography = haimTypography;
      else delete next.haimTypography;
      return next;
    });
  };

  const handleApply = () => {
    const haimTypography = normalizeHaimTypographyOverrides(local.haimTypography);
    const next: DocumentSettingsMeta = {
      ...local,
      v: 1,
      sourceList: {
        show: local.sourceList?.show !== false,
        title: local.sourceList?.title?.trim() || DEFAULT_SOURCE_LIST_TITLE,
      },
      fonts: { ...DEFAULT_DOCUMENT_SETTINGS_META.fonts, ...local.fonts },
      webfontCss: local.webfontCss ?? '',
    };
    if (haimTypography) next.haimTypography = haimTypography;
    else delete next.haimTypography;
    onApply?.(next);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleApply}
      ignoreEnterInFields
      contentClassName="max-w-[min(92vw,720px)] max-h-[90vh]"
    >
      <div className="flex max-h-[90vh] flex-col gap-5 overflow-y-auto p-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            문서 설정
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            이 설정은 현재 마크다운 문서에만 저장됩니다.
          </p>
        </div>

        <section className="grid gap-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            각주 Source List
          </h3>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-odp-fgStrong">
            <input
              type="checkbox"
              checked={local.sourceList?.show !== false}
              onChange={(e) => updateSourceList({ show: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            문서 아래쪽에 source list 표시
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
              표시 이름
            </span>
            <input
              type="text"
              value={local.sourceList?.title ?? DEFAULT_SOURCE_LIST_TITLE}
              onChange={(e) => updateSourceList({ title: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fgStrong"
              placeholder={DEFAULT_SOURCE_LIST_TITLE}
            />
          </label>
        </section>

        <section className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
            <h3 className="shrink-0 text-sm font-semibold whitespace-nowrap text-gray-800 dark:text-odp-fgStrong">
              문서 폰트
            </h3>
            <Button type="button" variant="tertiary" size="sm" onClick={handleResetFonts}>
              <IconRefresh size={14} />
              폰트 초기화
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {FONT_FIELDS.map(([key, label, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                  {label}
                </span>
                <FontFamilyInput
                  id={`document-font-${key}`}
                  value={local.fonts?.[key] ?? ''}
                  onChange={(v) => updateFont(key, v)}
                  options={fontOptions}
                  placeholder={placeholder}
                />
              </label>
            ))}
          </div>
        </section>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            이 문서 전용 Webfont CSS
          </span>
          <textarea
            value={local.webfontCss ?? ''}
            onChange={(e) => setLocal((prev) => ({ ...prev, webfontCss: e.target.value }))}
            rows={7}
            className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-800 outline-none focus:border-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fgStrong"
            placeholder="@import url('https://...');&#10;@font-face { font-family: 'My Font'; src: url('...'); }"
            spellCheck={false}
          />
        </label>

        <section className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                Haim Typography 입력 편의
              </h3>
              <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                이 문서만 전역 설정을 덮어씁니다. 「전역 따름」은 설정의 값을
                사용합니다.
              </p>
            </div>
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              onClick={handleResetTypography}
            >
              <IconRefresh size={14} />
              전부 전역 따름
            </Button>
          </div>
          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200 dark:divide-odp-borderStrong dark:border-odp-borderStrong">
            {HAIM_TYPOGRAPHY_RULE_DEFS.map((def) => {
              const mode = modeFromOverride(local.haimTypography, def.id);
              const globalOn = globalTypography[def.id];
              const globalTone = haimTypographyStatusTone(globalOn);
              const effectiveTone =
                mode === 'inherit'
                  ? globalTone
                  : haimTypographyStatusTone(mode === 'on');
              return (
                <li
                  key={def.id}
                  className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-odp-fg">
                      <HaimTypographyStatusDot tone={effectiveTone} />
                      {def.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-gray-500 dark:text-odp-muted">
                      {def.hint}
                    </p>
                  </div>
                  <RadioGroup.Root
                    className="inline-flex shrink-0 overflow-hidden rounded-md border border-gray-300 dark:border-odp-borderStrong"
                    value={mode}
                    onValueChange={(v) =>
                      handleTypographyMode(def.id, v as TypographyMode)
                    }
                    aria-label={`${def.label} 문서 Typography`}
                  >
                    {TYPOGRAPHY_MODE_OPTIONS.map((opt) => {
                      const selected = mode === opt.value;
                      const optionTone =
                        opt.value === 'inherit'
                          ? globalTone
                          : haimTypographyStatusTone(opt.value === 'on');
                      return (
                        <RadioGroup.Item
                          key={opt.value}
                          value={opt.value}
                          className={[
                            'inline-flex items-center gap-1 px-2 py-1.5 text-[11px] outline-none transition-colors',
                            'focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-blue-400',
                            'border-r border-gray-300 last:border-r-0 dark:border-odp-borderStrong',
                            selected
                              ? 'bg-blue-50 font-semibold text-blue-800 dark:bg-blue-950/40 dark:text-blue-200'
                              : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-odp-bg dark:text-odp-fgMuted dark:hover:bg-odp-bgSoft',
                          ].join(' ')}
                        >
                          <HaimTypographyStatusDot tone={optionTone} />
                          {opt.label}
                        </RadioGroup.Item>
                      );
                    })}
                  </RadioGroup.Root>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            <IconBack size={16} />
            취소
          </Button>
          <Button type="button" variant="primary" size="md" onClick={handleApply}>
            <IconCheck size={16} />
            적용
          </Button>
        </div>
      </div>
    </Modal>
  );
}
