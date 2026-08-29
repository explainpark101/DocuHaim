import { useCallback, useEffect, useState } from 'react';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';
import Button from '@/components/Button';
import { RotateCcw } from 'lucide-react';
import {
  DEFAULT_QUIZ_SETTINGS,
  DEFAULT_QUIZ_SYSTEM_PROMPT,
  loadQuizSettings,
  saveQuizSettings,
  QUIZ_SETTINGS_CHANGED_EVENT,
  type QuizSettings,
} from '@/utils/quiz/quizSettingsStore';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';

type QuizSettingsProps = {
  llmProviderProfiles?: LlmProviderProfile[];
};

export default function QuizSettingsSection({
  llmProviderProfiles = [],
}: QuizSettingsProps) {
  const [open, setOpen] = useState(true);
  const [settings, setSettings] = useState<QuizSettings>(() => loadQuizSettings());

  useEffect(() => {
    const sync = () => setSettings(loadQuizSettings());
    window.addEventListener(QUIZ_SETTINGS_CHANGED_EVENT, sync);
    return () => window.removeEventListener(QUIZ_SETTINGS_CHANGED_EVENT, sync);
  }, []);

  const patch = useCallback((partial: Partial<QuizSettings>) => {
    setSettings(saveQuizSettings(partial));
  }, []);

  return (
    <div
      id="settings-quiz"
      tabIndex={-1}
      className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
    >
      <SettingsCollapsibleContainer open={open} onOpenChange={setOpen}>
        <SettingsCollapsibleHeading>퀴즈 (quiz.md)</SettingsCollapsibleHeading>
        <SettingsCollapsibleContent>
          <p className="mb-4 text-xs text-gray-600 dark:text-odp-muted">
            AI 출제·주관식 채점·근거 문서(RAG)에 사용하는 전역 기본값입니다. 보기 개수와
            근거 파일 목록은 각 `.quiz.md` 파일에 저장됩니다.
          </p>

          <label className="mb-4 block space-y-1.5">
            <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
              LLM 프로필
            </span>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              value={settings.profileId || ''}
              onChange={(e) =>
                patch({ profileId: e.target.value.trim() || null })
              }
            >
              <option value="">(앱 기본 / 마지막 사용 프로필)</option>
              {llmProviderProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.kind})
                </option>
              ))}
            </select>
          </label>

          <label className="mb-4 block space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                출제 Temperature
              </span>
              <span className="font-mono text-xs text-blue-600">
                {settings.temperature.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={settings.temperature}
              onChange={(e) => patch({ temperature: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </label>

          <label className="mb-4 block space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                주관식 채점 Temperature
              </span>
              <span className="font-mono text-xs text-blue-600">
                {settings.gradeTemperature.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.gradeTemperature}
              onChange={(e) => patch({ gradeTemperature: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </label>

          <div className="mb-4 space-y-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
              계산 문제 난이도
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  settings.calcComplexity === 'hand'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft'
                }`}
                onClick={() => patch({ calcComplexity: 'hand' })}
              >
                손으로 계산 가능
              </button>
              <button
                type="button"
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  settings.calcComplexity === 'calculator'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft'
                }`}
                onClick={() => patch({ calcComplexity: 'calculator' })}
              >
                계산기 필수
              </button>
            </div>
          </div>

          <label className="mb-4 block space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                출제 시스템 프롬프트
              </span>
              <Button
                type="button"
                variant="tertiary"
                size="sm"
                onClick={() => patch({ systemPrompt: DEFAULT_QUIZ_SYSTEM_PROMPT })}
              >
                <RotateCcw size={12} />
                기본값
              </Button>
            </div>
            <textarea
              className="min-h-28 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              value={settings.systemPrompt}
              onChange={(e) => patch({ systemPrompt: e.target.value })}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                RAG topK
              </span>
              <input
                type="number"
                min={1}
                max={64}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                value={settings.ragTopK}
                onChange={(e) => patch({ ragTopK: Number(e.target.value) || DEFAULT_QUIZ_SETTINGS.ragTopK })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                RAG maxChars
              </span>
              <input
                type="number"
                min={2000}
                max={500000}
                step={1000}
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                value={settings.ragMaxChars}
                onChange={(e) =>
                  patch({
                    ragMaxChars: Number(e.target.value) || DEFAULT_QUIZ_SETTINGS.ragMaxChars,
                  })
                }
              />
            </label>
          </div>
        </SettingsCollapsibleContent>
      </SettingsCollapsibleContainer>
    </div>
  );
}
