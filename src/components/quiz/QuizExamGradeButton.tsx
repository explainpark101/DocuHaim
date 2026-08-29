import Button from '@/components/Button';
import { Tooltip } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';

const TOOLTIP_CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

const EXAM_GRADE_BLOCKED_TOOLTIP = '시험이 끝난 뒤에 전체 채점을 해주세요';

type QuizExamGradeButtonProps = {
  examInProgress: boolean;
  children: ReactNode;
} & ComponentProps<typeof Button>;

export default function QuizExamGradeButton({
  examInProgress,
  disabled,
  children,
  ...buttonProps
}: QuizExamGradeButtonProps) {
  const isDisabled = Boolean(disabled) || examInProgress;
  const button = (
    <Button type="button" {...buttonProps} disabled={isDisabled}>
      {children}
    </Button>
  );

  if (!examInProgress) return button;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="inline-flex">{button}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
          {EXAM_GRADE_BLOCKED_TOOLTIP}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
