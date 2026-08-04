import { useEffect, useState } from 'react';
import { RadioGroup } from 'radix-ui';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import {
  type EmptyTrashMode,
  type EmptyTrashOptions,
  type EmptyTrashSizeUnit,
} from '@/utils/emptyTrash';

const DEFAULT_OPTIONS: EmptyTrashOptions = {
  mode: 'all',
  thresholdValue: 1,
  thresholdUnit: 'MB',
};

type Props = {
  isOpen: boolean;
  storageType?: string | null;
  isProcessing?: boolean;
  onCancel: () => void;
  onConfirm: (options: EmptyTrashOptions) => void;
};

const MODE_OPTIONS: { value: EmptyTrashMode; label: string }[] = [
  { value: 'zeroByte', label: '0 byte 파일 모두 지우기' },
  { value: 'largerThan', label: '특정 용량보다 큰 파일 모두 지우기' },
  { value: 'smallerThan', label: '특정 용량보다 작은 파일 모두 지우기' },
  { value: 'all', label: '휴지통 비우기' },
];

const UNIT_OPTIONS: EmptyTrashSizeUnit[] = ['B', 'KB', 'MB', 'GB'];

function needsThreshold(mode: EmptyTrashMode): boolean {
  return mode === 'largerThan' || mode === 'smallerThan';
}

export default function EmptyTrashConfirmModal({
  isOpen,
  storageType,
  isProcessing = false,
  onCancel,
  onConfirm,
}: Props) {
  const [options, setOptions] = useState<EmptyTrashOptions>(DEFAULT_OPTIONS);

  useEffect(() => {
    if (isOpen) setOptions(DEFAULT_OPTIONS);
  }, [isOpen, storageType]);

  const thresholdInvalid =
    needsThreshold(options.mode) &&
    !(typeof options.thresholdValue === 'number' && options.thresholdValue >= 0);

  const confirmLabel = isProcessing
    ? '비우는 중…'
    : options.mode === 'all'
      ? '휴지통 비우기'
      : '삭제';

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="쓰레기통 비우기"
      message="선택한 조건에 맞는 항목을 영구 삭제합니다. 이 작업은 되돌릴 수 없습니다."
      confirmLabel={confirmLabel}
      variant="danger"
      confirmDisabled={isProcessing || thresholdInvalid}
      onCancel={onCancel}
      onConfirm={() => {
        if (isProcessing || thresholdInvalid) return;
        onConfirm(options);
      }}
    >
      <RadioGroup.Root
        className="space-y-2"
        value={options.mode}
        onValueChange={(next) => {
          const mode = next as EmptyTrashMode;
          setOptions((prev) => ({ ...prev, mode }));
        }}
        aria-label="쓰레기통 비우기 옵션"
      >
        {MODE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-start gap-2 rounded-md border border-transparent px-1 py-1 text-sm text-gray-700 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-focusBg/40"
          >
            <RadioGroup.Item
              value={opt.value}
              className="mt-0.5 size-3.5 shrink-0 rounded-full border border-gray-400 bg-white data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            >
              <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" />
            </RadioGroup.Item>
            <span className="select-none leading-snug">{opt.label}</span>
          </label>
        ))}
      </RadioGroup.Root>

      {needsThreshold(options.mode) ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
          <span className="text-xs font-semibold text-gray-600 dark:text-odp-muted">
            {options.mode === 'largerThan' ? '이보다 큼' : '이보다 작음'}
          </span>
          <input
            type="number"
            min={0}
            step="any"
            value={options.thresholdValue ?? ''}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === '') {
                setOptions((prev) => {
                  const next = { ...prev };
                  delete next.thresholdValue;
                  return next;
                });
                return;
              }
              const next = Number(raw);
              if (!Number.isFinite(next)) return;
              setOptions((prev) => ({
                ...prev,
                thresholdValue: next,
              }));
            }}
            className="w-24 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSofter dark:text-odp-fg"
            aria-label="용량 임계값"
          />
          <RadioGroup.Root
            className="flex flex-wrap items-center gap-2"
            value={options.thresholdUnit ?? 'MB'}
            onValueChange={(next) => {
              const unit = next as EmptyTrashSizeUnit;
              if (!UNIT_OPTIONS.includes(unit)) return;
              setOptions((prev) => ({ ...prev, thresholdUnit: unit }));
            }}
            aria-label="용량 단위"
          >
            {UNIT_OPTIONS.map((unit) => (
              <label
                key={unit}
                className="flex cursor-pointer items-center gap-1 text-xs text-gray-700 dark:text-odp-fg"
              >
                <RadioGroup.Item
                  value={unit}
                  className="size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                >
                  <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <span>{unit}</span>
              </label>
            ))}
          </RadioGroup.Root>
        </div>
      ) : null}
    </ConfirmModal>
  );
}
