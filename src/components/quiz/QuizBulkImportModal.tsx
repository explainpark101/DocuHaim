import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
} from 'react';
import { ClipboardPaste, ImagePlus, Loader2, Wand2, X } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { IconCheck, IconFile } from '@/components/icons';
import LlmAssistImageDropZone from '@/components/llm/LlmAssistImageDropZone';
import QuizLlmStreamPreview from '@/components/quiz/QuizLlmStreamPreview';
import type { QuizImageAttachment } from '@/components/quiz/QuizAddQuestionModal';
import { parseQuizDocument } from '@/utils/quiz/parseQuizDocument';
import { mergeQuizDocuments } from '@/utils/quiz/mergeQuizDocuments';
import type { QuizDocument } from '@/utils/quiz/quizTypes';
import {
  extractImageFilesFromClipboard,
  readImageFilesAsAttachments,
  readImageFilesFromClipboardApi,
} from '@/utils/llmAssistImages';

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
  choiceCount: number;
  onApply: (next: QuizDocument, mode: 'append' | 'replace') => void;
  onConvertImagesToMarkdown?: (params: {
    images: { mimeType: string; dataBase64: string }[];
    instructions: string;
    choiceCount: number;
  }) => Promise<string | null>;
  imageConvertStreamText?: string;
};

export default function QuizBulkImportModal({
  isOpen,
  onClose,
  current,
  choiceCount,
  onApply,
  onConvertImagesToMarkdown,
  imageConvertStreamText = '',
}: QuizBulkImportModalProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'append' | 'replace'>('append');
  const [error, setError] = useState('');
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [imagePanelOpen, setImagePanelOpen] = useState(false);
  const [imageAttachments, setImageAttachments] = useState<QuizImageAttachment[]>([]);
  const [imageInstructions, setImageInstructions] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const [addingImages, setAddingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setText('');
      setMode('append');
      setError('');
      setConfirmReplace(false);
      setImagePanelOpen(false);
      setImageAttachments([]);
      setImageInstructions('');
      setImageBusy(false);
      setAddingImages(false);
    }
  }, [isOpen]);

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

  const appendMarkdown = useCallback((markdown: string) => {
    const next = markdown.trim();
    if (!next) return;
    setText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `${next}\n`;
      return `${trimmed}\n\n---\n\n${next}\n`;
    });
    setError('');
  }, []);

  const applyImageAttachments = useCallback(async (files: FileList | File[]) => {
    const list = [...files].filter((f) => f.type.startsWith('image/'));
    if (!list.length) {
      setError('이미지 파일을 선택하세요.');
      return;
    }
    setAddingImages(true);
    setError('');
    try {
      const next = await readImageFilesAsAttachments(list);
      if (!next.length) return;
      setImageAttachments((prev) => [...prev, ...next]);
    } catch (err) {
      setError((err instanceof Error ? err.message : '') || '이미지를 불러올 수 없습니다.');
    } finally {
      setAddingImages(false);
    }
  }, []);

  const handlePasteImages = useCallback(async () => {
    setAddingImages(true);
    setError('');
    try {
      const files = await readImageFilesFromClipboardApi();
      if (!files.length) {
        setError('클립보드에 이미지가 없습니다.');
        return;
      }
      const next = await readImageFilesAsAttachments(files);
      if (!next.length) return;
      setImageAttachments((prev) => [...prev, ...next]);
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : '') || '클립보드에서 이미지를 읽을 수 없습니다.',
      );
    } finally {
      setAddingImages(false);
    }
  }, []);

  const handleModalPaste = useCallback(
    (event: ClipboardEvent) => {
      if (!imagePanelOpen || addingImages || imageBusy) return;
      const files = extractImageFilesFromClipboard(event.clipboardData);
      if (!files.length) return;
      event.preventDefault();
      void applyImageAttachments(files);
    },
    [addingImages, applyImageAttachments, imageBusy, imagePanelOpen],
  );

  const handleConvertImages = async () => {
    if (!onConvertImagesToMarkdown || imageBusy || !imageAttachments.length) return;
    setError('');
    setImageBusy(true);
    try {
      const markdown = await onConvertImagesToMarkdown({
        images: imageAttachments.map((img) => ({
          mimeType: img.mimeType,
          dataBase64: img.dataBase64,
        })),
        instructions: imageInstructions,
        choiceCount,
      });
      if (!markdown?.trim()) return;
      appendMarkdown(markdown);
      setImagePanelOpen(false);
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : '') || '이미지 마크다운 변환에 실패했습니다.',
      );
    } finally {
      setImageBusy(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} contentClassName="quiz-pane max-w-3xl max-h-[90vh]">
        <div
          className="flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm"
          onPaste={handleModalPaste}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
              마크다운 가져오기
            </h2>
            {onConvertImagesToMarkdown ? (
              <Button
                type="button"
                variant={imagePanelOpen ? 'primary' : 'secondary'}
                size="sm"
                aria-pressed={imagePanelOpen}
                disabled={imageBusy || addingImages}
                onClick={() => setImagePanelOpen((v) => !v)}
              >
                <ImagePlus size={14} />
                이미지로 변환
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-gray-600 dark:text-odp-muted">
            `.quiz.md` 본문을 붙여넣거나 파일을 불러오세요. 여러 문항을 한 번에 등록할 수
            있습니다. 시험지 이미지를 첨부하면 AI가 퀴즈 마크다운으로 변환해 아래 칸에 넣습니다.
          </p>

          {imagePanelOpen && onConvertImagesToMarkdown ? (
            <LlmAssistImageDropZone
              className="rounded-xl"
              disabled={imageBusy || addingImages}
              onFilesDrop={(files) => void applyImageAttachments(files)}
            >
              <div className="space-y-2 rounded-xl border border-sky-200 bg-sky-50/80 p-3 dark:border-sky-900/60 dark:bg-sky-950/25">
                <p className="text-xs text-sky-900 dark:text-sky-100">
                  시험지·문제집 이미지를 첨부하면 AI가 `.quiz.md` 형식 마크다운으로 변환합니다.
                  여러 장을 한 번에 넣을 수 있습니다.
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => void handlePasteImages()}
                    disabled={imageBusy || addingImages}
                    className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                  >
                    {addingImages ? (
                      <Loader2 size={12} className="animate-spin" aria-hidden />
                    ) : (
                      <ClipboardPaste size={12} aria-hidden />
                    )}
                    클립보드 붙여넣기
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageBusy || addingImages}
                    className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                  >
                    {addingImages ? (
                      <Loader2 size={12} className="animate-spin" aria-hidden />
                    ) : (
                      <ImagePlus size={12} aria-hidden />
                    )}
                    파일 선택
                  </button>
                  {imageAttachments.length ? (
                    <button
                      type="button"
                      onClick={() => setImageAttachments([])}
                      disabled={imageBusy || addingImages}
                      className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                    >
                      <X size={12} aria-hidden />
                      이미지 모두 제거
                    </button>
                  ) : null}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files?.length) void applyImageAttachments(files);
                    e.target.value = '';
                  }}
                />
                {imageAttachments.length ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {imageAttachments.map((img) => (
                      <div
                        key={img.id}
                        className="relative overflow-hidden rounded-lg border border-sky-200 bg-white dark:border-sky-800 dark:bg-odp-bgSoft"
                      >
                        <img
                          src={img.previewDataUrl}
                          alt=""
                          className="max-h-28 w-full object-contain"
                        />
                        <div className="flex items-center justify-between gap-1 px-2 py-1">
                          <span className="truncate text-[10px] text-gray-600 dark:text-odp-muted">
                            {img.name}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setImageAttachments((prev) =>
                                prev.filter((item) => item.id !== img.id),
                              )
                            }
                            disabled={imageBusy || addingImages}
                            className="shrink-0 rounded p-0.5 hover:bg-sky-100 disabled:opacity-50 dark:hover:bg-odp-bg"
                            aria-label="이미지 제거"
                          >
                            <X size={12} aria-hidden />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-sky-300 bg-white/70 px-3 py-6 text-center text-xs text-sky-800 dark:border-sky-800 dark:bg-odp-bgSoft/60 dark:text-sky-100">
                    이미지를 끌어다 놓거나, 붙여넣기·파일 선택을 사용하세요.
                  </div>
                )}
                <label className="block space-y-1">
                  <span className="text-xs font-semibold text-sky-900 dark:text-sky-100">
                    추가 지시 (선택)
                  </span>
                  <textarea
                    className="min-h-14 w-full rounded-lg border border-sky-200 bg-white p-2 text-xs dark:border-sky-800 dark:bg-odp-bgSoft"
                    placeholder="예: 객관식만 추출하고, 정답 표시를 *(정답)* 형식으로 맞춰 주세요."
                    value={imageInstructions}
                    onChange={(e) => setImageInstructions(e.target.value)}
                    disabled={imageBusy}
                  />
                </label>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    disabled={imageBusy || !imageAttachments.length}
                    onClick={() => void handleConvertImages()}
                  >
                    {imageBusy ? (
                      <Loader2 size={14} className="animate-spin" aria-hidden />
                    ) : (
                      <Wand2 size={14} />
                    )}
                    {imageBusy ? '변환 중…' : 'AI로 마크다운 변환'}
                  </Button>
                </div>
                {imageBusy ? (
                  <div className="rounded-lg border border-sky-200 bg-white/80 p-2 dark:border-sky-800 dark:bg-odp-bgSoft">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-200">
                      모델 응답
                    </p>
                    <QuizLlmStreamPreview
                      text={imageConvertStreamText}
                      previewId="quiz-bulk-image-convert-stream"
                      emptyLabel="이미지를 마크다운으로 변환하는 중…"
                    />
                  </div>
                ) : null}
              </div>
            </LlmAssistImageDropZone>
          ) : null}

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
            <Button type="button" variant="secondary" onClick={onClose} disabled={imageBusy}>
              취소
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => apply(false)}
              disabled={imageBusy}
            >
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
