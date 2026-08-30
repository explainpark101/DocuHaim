import QuizMdPreview from '@/components/quiz/QuizMdPreview';

type QuizLlmStreamPreviewProps = {
  text: string;
  previewId: string;
  emptyLabel?: string;
  className?: string;
};

export default function QuizLlmStreamPreview({
  text,
  previewId,
  emptyLabel = '응답 생성 중…',
  className = '',
}: QuizLlmStreamPreviewProps) {
  if (!text.trim()) {
    return (
      <p className={`text-[11px] italic opacity-80 ${className}`.trim()}>
        {emptyLabel}
      </p>
    );
  }

  return (
    <div
      className={`[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent ${className}`.trim()}
    >
      <QuizMdPreview text={text} previewId={previewId} />
    </div>
  );
}
