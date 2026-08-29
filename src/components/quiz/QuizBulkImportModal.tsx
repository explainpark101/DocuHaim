import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { IconCheck, IconFile } from '@/components/icons';
import { parseQuizDocument } from '@/utils/quiz/parseQuizDocument';
import { mergeQuizDocuments } from '@/utils/quiz/mergeQuizDocuments';
import type { QuizDocument } from '@/utils/quiz/quizTypes';

const SAMPLE = `### 1. 맵리듀스에 대한 설명으로 가장 적절한 것은?

1. Map 단계에서 키-값 변환 후 Reduce에서 집계한다. *(정답)*
2. 실시간 스트리밍 전용이다.
3. Reduce가 Map보다 먼저 수행된다.
4. 단일 서버에서만 실행된다.

> **💡 접근 Point!**
> Map → Shuffle → Reduce
>
> **📖 해설:**
> 맵리듀스는 분산 처리 프로그래밍 모델이다.
`;

type QuizBulkImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  current: QuizDocument;
  onApply: (next: QuizDocument, mode: 'append' | 'replace') => void;
};

export default function QuizBulkImportModal({
  isOpen,
  onClose,
  current,
  onApply,
}: QuizBulkImportModalProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'append' | 'replace'>('append');
  const [error, setError] = useState('');
  const [confirmReplace, setConfirmReplace] = useState(false);

  const apply = (forceReplace = false) => {
    const incoming = parseQuizDocument(text);
    if (!incoming.questions.length) {
      setError('파싱된 문제가 없습니다. 마크다운 형식을 확인하세요.');
      return;
    }
    if (mode === 'replace' && !forceReplace) {
      setConfirmReplace(true);
      return;
    }
    const merged = mergeQuizDocuments(current, incoming, {
      mode,
      mergeConfig: mode === 'replace',
    });
    onApply(merged, mode);
    onClose();
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setText(String(reader.result || ''));
      setError('');
    };
    reader.readAsText(file, 'UTF-8');
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} contentClassName="quiz-pane max-w-3xl max-h-[90vh]">
        <div className="flex max-h-[min(80vh,720px)] flex-col gap-3 p-4 text-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            마크다운 가져오기
          </h2>
          <p className="text-xs text-gray-600 dark:text-odp-muted">
            `.quiz.md` 본문을 붙여넣거나 파일을 불러오세요. 여러 문항을 한 번에 등록할 수
            있습니다.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Button
              type="button"
              variant="secondary"
              onClick={() => document.getElementById('quiz-bulk-file')?.click()}
            >
              <IconFile size={14} />
              파일 불러오기
            </Button>
            <input
              id="quiz-bulk-file"
              type="file"
              accept=".md,.quiz.md,.txt,.markdown"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
            <Button
              type="button"
              variant="tertiary"
              onClick={() => {
                setText(SAMPLE);
                setError('');
              }}
            >
              샘플 불러오기
            </Button>
            <div className="ml-auto flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-odp-bgSoft">
              <button
                type="button"
                className={`rounded-md px-2 py-1 font-semibold ${
                  mode === 'append'
                    ? 'bg-white shadow-sm dark:bg-odp-surface'
                    : 'text-gray-600 dark:text-odp-muted'
                }`}
                onClick={() => setMode('append')}
              >
                추가
              </button>
              <button
                type="button"
                className={`rounded-md px-2 py-1 font-semibold ${
                  mode === 'replace'
                    ? 'bg-white shadow-sm dark:bg-odp-surface'
                    : 'text-gray-600 dark:text-odp-muted'
                }`}
                onClick={() => setMode('replace')}
              >
                교체
              </button>
            </div>
          </div>
          <textarea
            className="min-h-64 w-full rounded-xl border border-gray-300 bg-slate-50 p-3 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="마크다운 문제 목록을 붙여넣으세요…"
          />
          {error ? (
            <p className="text-xs font-medium text-rose-600">{error}</p>
          ) : null}
          <div className="flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft">
            <Button type="button" variant="secondary" onClick={onClose}>
              취소
            </Button>
            <Button type="button" variant="primary" onClick={() => apply(false)}>
              <IconCheck size={14} />
              적용
            </Button>
          </div>
        </div>
      </Modal>
      <ConfirmModal
        isOpen={confirmReplace}
        variant="danger"
        title="문항 전체 교체"
        message="기존 문항을 모두 지우고 붙여넣은 내용으로 교체할까요? 풀이 진행 기록도 초기화됩니다."
        confirmLabel="교체"
        cancelLabel="취소"
        onConfirm={() => {
          setConfirmReplace(false);
          apply(true);
        }}
        onCancel={() => setConfirmReplace(false)}
      />
    </>
  );
}
