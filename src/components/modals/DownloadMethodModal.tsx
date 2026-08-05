import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { RadioGroup, Select } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import { IconDownload, IconFolder } from '@/components/icons';
import {
  type DownloadImageMode,
  isDownloadImageMode,
  loadDownloadImageMode,
  saveDownloadImageMode,
} from '@/utils/downloadImageModeSettings';
import {
  defaultExportHeadingMax,
  describeHeadingRemap,
  detectMaxHeadingLevel,
  EXPORT_HEADING_LEVELS,
  isExportHeadingLevel,
  type ExportHeadingLevel,
} from '@/utils/markdownHeadings';

const IMAGE_MODE_OPTIONS: {
  value: DownloadImageMode;
  title: string;
  description: string;
}[] = [
  {
    value: 'files',
    title: '파일로 분리',
    description: '문서와 .pictures 폴더로 저장',
  },
  {
    value: 'base64',
    title: '단일 MD에 포함',
    description: '이미지를 Base64로 인코딩',
  },
];

export type DownloadMethodChoice = {
  imageMode: DownloadImageMode;
  headingMax: ExportHeadingLevel;
};

type Props = {
  isOpen: boolean;
  title?: string;
  fileName?: string;
  markdownText?: string;
  showImageHandling?: boolean;
  showDeliveryMethods?: boolean;
  confirmLabel?: string;
  onSelectLegacy: (choice: DownloadMethodChoice) => void;
  onSelectStorageApi: (choice: DownloadMethodChoice) => void;
  onCancel: () => void;
  isDownloading?: boolean;
  downloadProgress?: number;
  downloadComplete?: boolean;
  onCloseComplete?: () => void;
};

export function DownloadMethodModal({
  isOpen,
  title = '다운로드 방식 선택',
  fileName,
  markdownText = '',
  showImageHandling = false,
  showDeliveryMethods = true,
  confirmLabel = '다운로드',
  onSelectLegacy,
  onSelectStorageApi,
  onCancel,
  isDownloading,
  downloadProgress = 0,
  downloadComplete,
  onCloseComplete,
}: Props) {
  const showProgress = Boolean(isDownloading || downloadComplete);
  const [imageMode, setImageMode] = useState<DownloadImageMode>(() => loadDownloadImageMode());
  const [headingMax, setHeadingMax] = useState<ExportHeadingLevel>(1);

  const sourceMax = useMemo(
    () => (showImageHandling ? detectMaxHeadingLevel(markdownText) : null),
    [markdownText, showImageHandling],
  );

  useEffect(() => {
    if (!isOpen) return;
    setImageMode(loadDownloadImageMode());
    if (showImageHandling) setHeadingMax(defaultExportHeadingMax(markdownText));
  }, [isOpen, markdownText, showImageHandling]);

  const handleImageModeChange = (next: string) => {
    if (!isDownloadImageMode(next)) return;
    setImageMode(next);
    saveDownloadImageMode(next);
  };

  const choice: DownloadMethodChoice = { imageMode, headingMax };
  const remapHint = showImageHandling ? describeHeadingRemap(sourceMax, headingMax) : '';

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong mb-2">
          {title}
        </h2>
        {fileName && (
          <p className="text-sm text-gray-500 dark:text-odp-muted mb-4 truncate" title={fileName}>
            {fileName}
          </p>
        )}

        {showProgress ? (
          <div className="space-y-4">
            {downloadComplete ? (
              <>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <span className="text-sm font-medium">저장 완료</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  선택한 폴더에 파일이 저장되었습니다. 파일 탐색기에서 해당 파일을 더블클릭하여 열어보세요.
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onCloseComplete}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded transition"
                  >
                    확인
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>다운로드 중...</span>
                  <span>{Math.round(downloadProgress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {showImageHandling ? (
              <div className="mb-4">
                <div className="mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted">
                  이미지 파일 처리 방식
                </div>
                <RadioGroup.Root
                  className="flex items-center gap-2"
                  value={imageMode}
                  onValueChange={handleImageModeChange}
                  aria-label="이미지 파일 처리 방식"
                >
                  {IMAGE_MODE_OPTIONS.map((option) => {
                    const selected = imageMode === option.value;
                    return (
                      <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        className={[
                          'flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200',
                          'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                          selected
                            ? 'scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30'
                            : 'scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400',
                        ].join(' ')}
                      >
                        <div className={selected ? '' : 'opacity-50'}>
                          <div className="font-medium text-sm text-gray-800 dark:text-odp-fgStrong">
                            {option.title}
                          </div>
                          <div className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                            {option.description}
                          </div>
                        </div>
                      </RadioGroup.Item>
                    );
                  })}
                </RadioGroup.Root>
              </div>
            ) : null}

            {showImageHandling ? (
              <div className="mb-4">
                <label
                  htmlFor="download-heading-max"
                  className="mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted"
                >
                  최대 heading
                </label>
                <Select.Root
                  value={String(headingMax)}
                  onValueChange={(next) => {
                    const parsed = Number(next);
                    if (isExportHeadingLevel(parsed)) setHeadingMax(parsed);
                  }}
                >
                  <Select.Trigger
                    id="download-heading-max"
                    aria-label="최대 heading"
                    className="inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
                  >
                    <Select.Value />
                    <Select.Icon className="text-gray-500">
                      <ChevronDown size={14} />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className="z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                      position="popper"
                      sideOffset={4}
                    >
                      <Select.Viewport className="p-1">
                        {EXPORT_HEADING_LEVELS.map((level) => (
                          <Select.Item
                            key={level}
                            value={String(level)}
                            className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg"
                          >
                            <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                              <Check size={12} />
                            </Select.ItemIndicator>
                            <Select.ItemText>{`h${level}`}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                <p className="mt-1.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                  다른 문서에 넣을 때 heading 단계를 조절합니다. 기본값은 이 문서의 최대 heading입니다.
                </p>
                {remapHint ? (
                  <p className="mt-1 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                    {remapHint}
                  </p>
                ) : null}
              </div>
            ) : null}

            {showDeliveryMethods ? (
            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() => onSelectLegacy(choice)}
                disabled={isDownloading}
                className="w-full px-4 py-3 text-left rounded-lg border border-gray-200 dark:border-odp-borderSoft hover:bg-gray-50 dark:hover:bg-odp-bgSoft transition flex items-center gap-3"
              >
                <IconDownload size={20} className="text-gray-500 shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-gray-800 dark:text-odp-fgStrong">
                    기존 다운로드 방식
                  </div>
                  <div className="text-xs text-gray-500 dark:text-odp-muted mt-0.5">
                    브라우저 기본 다운로드. ~100–200MB 권장
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onSelectStorageApi(choice)}
                disabled={isDownloading}
                className="w-full px-4 py-3 text-left rounded-lg border border-gray-200 dark:border-odp-borderSoft hover:bg-gray-50 dark:hover:bg-odp-bgSoft transition flex items-center gap-3"
              >
                <IconFolder size={20} className="text-gray-500 shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-gray-800 dark:text-odp-fgStrong">
                    Storage API를 이용한 방식
                  </div>
                  <div className="text-xs text-gray-500 dark:text-odp-muted mt-0.5">
                    폴더 선택 후 직접 저장. 대용량 파일 지원, 진행률 표시
                  </div>
                </div>
              </button>
            </div>
            ) : (
              <p className="mb-4 text-xs text-gray-500 dark:text-odp-muted">
                Base64 이미지는 파일로 분리해 ZIP으로, 파일 이미지는 단일 MD로 바꿀 수 있습니다.
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
              >
                취소
              </button>
              {!showDeliveryMethods ? (
                <button
                  type="button"
                  onClick={() => onSelectLegacy(choice)}
                  disabled={isDownloading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700 rounded transition"
                >
                  {confirmLabel}
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
