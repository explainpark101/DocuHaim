import { useEffect, useState } from 'react';
import { PenLine } from 'lucide-react';
import Button from '@/components/Button';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';

type QuizQuestionMemoPanelProps = {
  questionId: string;
  value: string;
  onSave: (next: string) => void;
};

export default function QuizQuestionMemoPanel({
  questionId,
  value,
  onSave,
}: QuizQuestionMemoPanelProps) {
  const savedMemo = String(value || '');
  const hasMemo = savedMemo.trim().length > 0;
  const previewId = `qmemo-${questionId}`;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!editing) setDraft(savedMemo);
  }, [savedMemo, editing]);

  const startCompose = () => {
    setDraft('');
    setEditing(true);
  };

  const startEdit = () => {
    setDraft(savedMemo);
    setEditing(true);
  };

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <div className="mt-3 border-t border-slate-200 pt-3 dark:border-odp-borderSoft">
      {editing ? (
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
              메모
              <span className="ml-1 font-normal text-slate-500 dark:text-odp-muted">
                (Markdown)
              </span>
            </span>
            <textarea
              className="quiz-body-field min-h-28 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              placeholder="문제에 대한 메모를 Markdown으로 작성하세요."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            <Button type="button" variant="primary" size="sm" onClick={handleSave}>
              저장하기
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setDraft(savedMemo);
                setEditing(false);
              }}
            >
              취소
            </Button>
          </div>
        </div>
      ) : (
        <>
          {hasMemo ? (
            <div className="mb-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm dark:border-odp-borderSoft dark:bg-odp-bg">
              <QuizMdPreview text={savedMemo} previewId={previewId} />
            </div>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={hasMemo ? startEdit : startCompose}
          >
            <PenLine size={14} />
            {hasMemo ? '메모수정' : '메모작성'}
          </Button>
        </>
      )}
    </div>
  );
}
