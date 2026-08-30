import { memo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '@/components/Button';

type QuizSourcesTopicGeneratePanelProps = {
  disabled?: boolean;
  onGenerate: (topic: string) => void | Promise<void>;
};

function QuizSourcesTopicGeneratePanel({
  disabled = false,
  onGenerate,
}: QuizSourcesTopicGeneratePanelProps) {
  const [topic, setTopic] = useState('');

  return (
    <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft">
      <label
        htmlFor="quiz-source-generate-topic"
        className="block text-xs font-semibold text-slate-700 dark:text-odp-fgStrong"
      >
        근거로 문제 생성
      </label>
      <input
        id="quiz-source-generate-topic"
        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
        placeholder="주제 (선택)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="w-full"
        disabled={disabled}
        onClick={() => void onGenerate(topic)}
      >
        <Sparkles size={14} />
        근거로 문제 추가
      </Button>
    </div>
  );
}

export default memo(QuizSourcesTopicGeneratePanel);
