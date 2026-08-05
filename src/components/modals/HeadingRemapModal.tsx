import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import {
  APP_HEADING_LEVELS,
  MAX_APP_HEADING_LEVEL,
  defaultAppHeadingMax,
  isAppHeadingLevel,
  planHeadingRemapRows,
  remapMarkdownHeadingLevels,
  type AppHeadingLevel,
} from '@/utils/markdownHeadings';

type Props = {
  isOpen: boolean;
  markdown: string;
  onClose: () => void;
  onApply: (nextMarkdown: string) => void;
};

export default function HeadingRemapModal({ isOpen, markdown, onClose, onApply }: Props) {
  const [headingMax, setHeadingMax] = useState<AppHeadingLevel>(1);

  useEffect(() => {
    if (!isOpen) return;
    setHeadingMax(defaultAppHeadingMax(markdown));
  }, [isOpen, markdown]);

  const preview = useMemo(
    () => planHeadingRemapRows(markdown, headingMax, { maxLevel: MAX_APP_HEADING_LEVEL }),
    [markdown, headingMax],
  );

  const handleApply = () => {
    if (!preview.sourceMax) return;
    const next = remapMarkdownHeadingLevels(markdown, headingMax, {
      maxLevel: MAX_APP_HEADING_LEVEL,
    });
    if (next !== markdown) onApply(next);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleApply} contentClassName="max-w-2xl">
      <div className="flex min-h-0 flex-1 flex-col p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          최대 heading 변경
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-odp-muted">
          감지된 최대 heading을 선택한 단계로 바꾸고, 하위 heading도 같은 간격으로 이동합니다.
        </p>

        <div className="mt-4">
          <label
            htmlFor="editor-heading-max"
            className="mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted"
          >
            최대 heading
          </label>
          <Select.Root
            value={String(headingMax)}
            onValueChange={(next) => {
              const parsed = Number(next);
              if (isAppHeadingLevel(parsed)) setHeadingMax(parsed);
            }}
          >
            <Select.Trigger
              id="editor-heading-max"
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
                  {APP_HEADING_LEVELS.map((level) => (
                    <Select.Item
                      key={level}
                      value={String(level)}
                      className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
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
        </div>

        <div className="mt-4 min-h-0">
          {preview.rows.length ? (
            <div className="max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <thead className="sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft">
                  <tr className="border-b border-gray-200 dark:border-odp-borderSoft">
                    <th className="px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">내용</th>
                    <th className="w-28 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">
                      기존 heading 크기
                    </th>
                    <th className="w-32 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">
                      변경될 heading 크기
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, index) => (
                    <tr
                      key={`${row.from}-${index}-${row.text}`}
                      className="border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60"
                    >
                      <td className="max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong" title={row.text}>
                        {row.text || '(제목 없음)'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-600 dark:text-odp-muted">
                        h{row.from}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-800 dark:text-odp-fgStrong">
                        h{row.to}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-md border border-dashed border-gray-200 px-3 py-6 text-center text-sm text-gray-500 dark:border-odp-borderSoft dark:text-odp-muted">
              문서에 heading이 없습니다.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!preview.sourceMax}
            className="rounded px-4 py-2 text-sm font-medium text-white transition bg-blue-600 hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            적용
          </button>
        </div>
      </div>
    </Modal>
  );
}
