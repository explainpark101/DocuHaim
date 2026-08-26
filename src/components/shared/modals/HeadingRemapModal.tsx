import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { RadioGroup, Select, Switch, Tooltip } from 'radix-ui';
import Button from '@/components/Button';
import { IconBack, IconCheck } from '@/components/icons';
import Modal from '@/components/shared/modals/Modal';
import {
  APP_HEADING_LEVELS,
  MAX_APP_HEADING_LEVEL,
  defaultAppHeadingMax,
  isAppHeadingLevel,
  planHeadingRemapRows,
  remapMarkdownHeadingLevels,
  type AppHeadingLevel,
  type OutlineNumberStyle,
  type OutlineStartNumber,
} from '@/utils/markdownHeadings';

export type HeadingRemapScope = 'selection' | 'document';

const SCOPE_OPTIONS: {
  value: HeadingRemapScope;
  title: string;
  description: string;
}[] = [
  {
    value: 'selection',
    title: '선택 영역',
    description: '현재 선택된 텍스트만 변경',
  },
  {
    value: 'document',
    title: '전체 문서',
    description: '문서 전체 heading을 변경',
  },
];

const OUTLINE_STYLE_OPTIONS: {
  value: OutlineNumberStyle;
  title: string;
  description: string;
}[] = [
  {
    value: 'flat',
    title: '1. 형식',
    description: '최대 heading을 한 자리 번호로 시작',
  },
  {
    value: 'nested',
    title: '2.1. 형식',
    description: 'heading 수준만큼 번호를 붙임',
  },
];

const OUTLINE_START_OPTIONS: {
  value: OutlineStartNumber;
  title: string;
  description: string;
}[] = [
  {
    value: 1,
    title: '1부터',
    description: '최대 heading이 1. / 1.1. …',
  },
  {
    value: 2,
    title: '2부터',
    description: '최대 heading이 2. / 2.1. …',
  },
];

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

const tooltipContentClass =
  'z-100010 max-w-[min(92vw,320px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

type Props = {
  isOpen: boolean;
  markdown: string;
  /** Selected markdown snapshot when the modal opened (empty if none). */
  selectedMarkdown?: string;
  onClose: () => void;
  onApply: (nextMarkdown: string, scope: HeadingRemapScope) => void;
};

export default function HeadingRemapModal({
  isOpen,
  markdown,
  selectedMarkdown = '',
  onClose,
  onApply,
}: Props) {
  const hasSelection = selectedMarkdown.length > 0;
  const [scope, setScope] = useState<HeadingRemapScope>('document');
  const [headingMax, setHeadingMax] = useState<AppHeadingLevel>(1);
  const [renumberOutline, setRenumberOutline] = useState(false);
  const [outlineStyle, setOutlineStyle] = useState<OutlineNumberStyle>('nested');
  const [outlineStart, setOutlineStart] = useState<OutlineStartNumber>(1);

  const sourceMarkdown = scope === 'selection' ? selectedMarkdown : markdown;

  useEffect(() => {
    if (!isOpen) return;
    const nextScope: HeadingRemapScope = hasSelection ? 'selection' : 'document';
    setScope(nextScope);
    const initialSource = nextScope === 'selection' ? selectedMarkdown : markdown;
    setHeadingMax(defaultAppHeadingMax(initialSource));
    setRenumberOutline(false);
    setOutlineStyle('nested');
    setOutlineStart(1);
  }, [isOpen, markdown, selectedMarkdown, hasSelection]);

  // Digits 1-9 set max heading; block editor key input while this modal is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const isEditorTarget = (target: EventTarget | null): boolean => {
      const el = target as HTMLElement | null;
      if (!el?.closest) return false;
      return Boolean(
        el.closest(
          '.cm-editor, .cm-content, .monaco-editor, .ProseMirror, [contenteditable="true"]',
        ),
      );
    };

    const blurEditorIfFocused = () => {
      const active = document.activeElement as HTMLElement | null;
      if (active && isEditorTarget(active) && typeof active.blur === 'function') {
        active.blur();
      }
    };

    blurEditorIfFocused();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const digit = event.key;
      if (digit >= '1' && digit <= '9') {
        const level = Number(digit);
        if (isAppHeadingLevel(level)) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          setHeadingMax(level);
        }
        return;
      }

      // Keep editors from receiving keystrokes; leave Esc/Enter for modal layer.
      if (event.key === 'Escape' || event.key === 'Enter') return;
      if (isEditorTarget(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        blurEditorIfFocused();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen]);

  const preview = useMemo(
    () =>
      planHeadingRemapRows(sourceMarkdown, headingMax, {
        maxLevel: MAX_APP_HEADING_LEVEL,
        renumberOutline,
        outlineStyle,
        outlineStart,
      }),
    [sourceMarkdown, headingMax, renumberOutline, outlineStyle, outlineStart],
  );

  const handleScopeChange = (next: string) => {
    if (next !== 'selection' && next !== 'document') return;
    if (next === 'selection' && !hasSelection) return;
    setScope(next);
    const nextSource = next === 'selection' ? selectedMarkdown : markdown;
    setHeadingMax(defaultAppHeadingMax(nextSource));
  };

  const handleApply = () => {
    if (!preview.sourceMax) return;
    const next = remapMarkdownHeadingLevels(sourceMarkdown, headingMax, {
      maxLevel: MAX_APP_HEADING_LEVEL,
      renumberOutline,
      outlineStyle,
      outlineStart,
    });
    if (next !== sourceMarkdown) onApply(next, scope);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleApply} contentClassName="max-w-3xl">
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <div className="flex min-h-0 flex-1 flex-col p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            최대 heading 변경
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-odp-muted">
            감지된 최대 heading을 선택한 단계로 바꾸고, 하위 heading도 같은 간격으로 이동합니다.
            {' '}
            숫자 키 1–9로 최대 heading을 바꿀 수 있습니다.
          </p>

          <div className="mt-4">
            <div className="mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted">
              적용 범위
            </div>
            <RadioGroup.Root
              className="flex items-center gap-2"
              value={scope}
              onValueChange={handleScopeChange}
              aria-label="최대 heading 적용 범위"
            >
              {SCOPE_OPTIONS.map((option) => {
                const selected = scope === option.value;
                const disabled = option.value === 'selection' && !hasSelection;
                return (
                  <RadioGroup.Item
                    key={option.value}
                    value={option.value}
                    disabled={disabled}
                    className={[
                      'flex-1 rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200',
                      'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                      'disabled:cursor-not-allowed disabled:opacity-40',
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
                        {option.value === 'selection' && !hasSelection
                          ? '선택된 텍스트가 없습니다'
                          : option.description}
                      </div>
                    </div>
                  </RadioGroup.Item>
                );
              })}
            </RadioGroup.Root>
          </div>

          <div className="mt-4">
            <label
              htmlFor="editor-heading-max"
              className="mb-2 block text-xs font-medium text-gray-500 dark:text-odp-muted"
            >
              최대 heading
            </label>
            <Select.Root
              value={String(headingMax)}
              onValueChange={(next: any) => {
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

          <div className="mt-4 rounded-lg border border-gray-200 p-3 dark:border-odp-borderSoft">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                  outline 번호 맞추기
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                  제목 앞의 1. / 2.1. 같은 번호를 현재 heading 수준에 맞게 다시 붙입니다.
                </p>
              </div>
              <Switch.Root
                className={switchRootClass(renumberOutline)}
                checked={renumberOutline}
                onCheckedChange={setRenumberOutline}
                aria-label="outline 번호 맞추기"
              >
                <Switch.Thumb className={switchThumbClass} />
              </Switch.Root>
            </div>

            {renumberOutline ? (
              <div className="mt-3 space-y-3 border-t border-gray-100 pt-3 dark:border-odp-borderSoft/60">
                <div>
                  <div className="mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted">
                    최대 heading 번호 형식
                  </div>
                  <RadioGroup.Root
                    className="flex items-center gap-2"
                    value={outlineStyle}
                    onValueChange={(next: any) => {
                      if (next === 'flat' || next === 'nested') setOutlineStyle(next);
                    }}
                    aria-label="최대 heading 번호 형식"
                  >
                    {OUTLINE_STYLE_OPTIONS.map((option) => {
                      const selected = outlineStyle === option.value;
                      return (
                        <RadioGroup.Item
                          key={option.value}
                          value={option.value}
                          className={[
                            'flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200',
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

                <div>
                  <div className="mb-2 text-xs font-medium text-gray-500 dark:text-odp-muted">
                    시작 번호
                  </div>
                  <RadioGroup.Root
                    className="flex items-center gap-2"
                    value={String(outlineStart)}
                    onValueChange={(next: any) => {
                      if (next === '1') setOutlineStart(1);
                      if (next === '2') setOutlineStart(2);
                    }}
                    aria-label="최대 heading 시작 번호"
                  >
                    {OUTLINE_START_OPTIONS.map((option) => {
                      const selected = outlineStart === option.value;
                      return (
                        <RadioGroup.Item
                          key={option.value}
                          value={String(option.value)}
                          className={[
                            'flex-1 rounded-lg border-2 px-3 py-2 text-left outline-none transition-all duration-200',
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
              </div>
            ) : null}
          </div>

          <div className="mt-4 min-h-0">
            {preview.rows.length ? (
              <div className="max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-odp-borderSoft">
                <table className="w-full table-fixed border-collapse text-left text-sm">
                  <thead className="sticky top-0 z-1 bg-gray-50 dark:bg-odp-bgSoft">
                    <tr className="border-b border-gray-200 dark:border-odp-borderSoft">
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">
                        기존 제목
                      </th>
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">
                        변경될 제목
                      </th>
                      <th className="w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">
                        기존
                      </th>
                      <th className="w-24 px-3 py-2 font-medium text-gray-600 dark:text-odp-muted">
                        변경
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((row, index) => (
                      <tr
                        key={`${row.from}-${index}-${row.text}`}
                        className="border-b border-gray-100 last:border-b-0 dark:border-odp-borderSoft/60"
                      >
                        <td className="max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong">
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <span className="block truncate">
                                {row.text || '(제목 없음)'}
                              </span>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={6}
                                className={tooltipContentClass}
                              >
                                {row.text || '(제목 없음)'}
                                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </td>
                        <td className="max-w-0 truncate px-3 py-2 text-gray-800 dark:text-odp-fgStrong">
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <span className="block truncate">
                                {row.nextText || '(제목 없음)'}
                              </span>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={6}
                                className={tooltipContentClass}
                              >
                                {row.nextText || '(제목 없음)'}
                                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
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
                {scope === 'selection'
                  ? '선택 영역에 heading이 없습니다.'
                  : '문서에 heading이 없습니다.'}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="secondary" size="md" onClick={onClose}>
              <IconBack size={16} />
              취소
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleApply}
              disabled={!preview.sourceMax}
            >
              <IconCheck size={16} />
              적용
            </Button>
          </div>
        </div>
      </Tooltip.Provider>
    </Modal>
  );
}
