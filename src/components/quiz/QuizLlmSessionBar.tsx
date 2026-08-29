import QuizLlmModelPicker from '@/components/quiz/QuizLlmModelPicker';
import type { LlmProviderProfile } from '@/utils/llmProviderProfiles';
import { Bot } from 'lucide-react';

type QuizLlmSessionBarProps = {
  profiles: LlmProviderProfile[];
  profileId: string;
  model: string;
  onProfileIdChange: (profileId: string) => void;
  onModelChange: (model: string) => void;
  busy?: boolean;
};

export default function QuizLlmSessionBar({
  profiles,
  profileId,
  model,
  onProfileIdChange,
  onModelChange,
  busy = false,
}: QuizLlmSessionBarProps) {
  return (
    <section
      aria-label="퀴즈 AI 제공자"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-odp-borderSoft dark:bg-odp-surface"
    >
      <div className="mb-3 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-odp-fgStrong">
        <Bot size={14} className="shrink-0 text-violet-600 dark:text-violet-400" aria-hidden />
        AI 제공자
      </div>
      <QuizLlmModelPicker
        profiles={profiles}
        profileId={profileId}
        model={model}
        onProfileIdChange={onProfileIdChange}
        onModelChange={onModelChange}
        disabled={busy}
      />
    </section>
  );
}
