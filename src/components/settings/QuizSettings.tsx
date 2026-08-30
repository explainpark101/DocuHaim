import { useCallback, useEffect, useMemo, useState } from 'react';
import { Switch } from 'radix-ui';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';
import Button from '@/components/Button';
import QuizLlmModelPicker from '@/components/quiz/QuizLlmModelPicker';
import PretextAutoHeightTextarea from '@/components/shared/ui/PretextAutoHeightTextarea';
import { RotateCcw } from 'lucide-react';
import {
  DEFAULT_QUIZ_SETTINGS,
  DEFAULT_QUIZ_SYSTEM_PROMPT,
  loadQuizSettings,
  saveQuizSettings,
  QUIZ_SETTINGS_CHANGED_EVENT,
  type QuizSettings,
} from '@/utils/quiz/quizSettingsStore';
import {
  defaultModelForKind,
  loadLastLlmProfileId,
  loadLastUsedModelForProfile,
  resolveSelectedLlmProfile,
  saveLastLlmProfileId,
  saveLastUsedModelForProfile,
  type LlmProviderProfile,
} from '@/utils/llmProviderProfiles';

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

  const resolvedProfileId = useMemo(() => {
    const profile = resolveSelectedLlmProfile(
      llmProviderProfiles,
      settings.profileId || loadLastLlmProfileId(),
    );
    return profile?.id ?? '';
  }, [llmProviderProfiles, settings.profileId]);

  const displayModel = useMemo(() => {
    const fromSettings = String(settings.modelId || '').trim();
    if (fromSettings) return fromSettings;
    const profile = resolveSelectedLlmProfile(llmProviderProfiles, resolvedProfileId);
    if (!profile) return '';
    return (
      loadLastUsedModelForProfile(profile.id, profile.kind) ||
      defaultModelForKind(profile.kind)
    );
  }, [llmProviderProfiles, resolvedProfileId, settings.modelId]);

  const handleProfileChange = useCallback(
    (nextProfileId: string) => {
      const trimmedId = nextProfileId.trim();
      saveLastLlmProfileId(trimmedId);
      const profile = resolveSelectedLlmProfile(llmProviderProfiles, trimmedId);
      const nextModel = profile
        ? loadLastUsedModelForProfile(profile.id, profile.kind) ||
          defaultModelForKind(profile.kind)
        : '';
      patch({
        profileId: trimmedId || null,
        modelId: nextModel.trim() || null,
      });
    },
    [llmProviderProfiles, patch],
  );

  const handleModelChange = useCallback(
    (nextModel: string) => {
      const trimmedModel = nextModel.trim();
      const profile = resolveSelectedLlmProfile(llmProviderProfiles, resolvedProfileId);
      if (profile) saveLastUsedModelForProfile(profile.id, trimmedModel);
      patch({ modelId: trimmedModel || null });
    },
    [llmProviderProfiles, resolvedProfileId, patch],
  );

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

          <div className="mb-4 space-y-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
              AI 제공자
            </span>
            <QuizLlmModelPicker
              profiles={llmProviderProfiles}
              profileId={resolvedProfileId}
              model={displayModel}
              onProfileIdChange={handleProfileChange}
              onModelChange={handleModelChange}
            />
            <p className="text-[11px] text-gray-500 dark:text-odp-muted">
              퀴즈 모드 출제·채점·보기 분석에 사용할 기본 제공자와 모델입니다.
            </p>
          </div>

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

          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                패널 width spring 애니메이션
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
                켜면 사이드 패널이 너비 spring으로 열립니다. Safari·WebView에서 무거우면 끄고
                슬라이드(translate) 방식으로 사용하세요.
              </p>
            </div>
            <Switch.Root
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 ${
                settings.dockWidthSpringAnim
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300 bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong'
              }`}
              checked={settings.dockWidthSpringAnim}
              onCheckedChange={(checked) => patch({ dockWidthSpringAnim: checked })}
              aria-label="패널 width spring 애니메이션"
            >
              <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
            </Switch.Root>
          </div>

          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                AI 생성 완료 시 자동 저장
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
                유사문제·근거 출제·보기 분석·파생문제 생성 등 AI 생성이 끝나면 퀴즈 파일을 즉시 저장합니다.
              </p>
            </div>
            <Switch.Root
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 ${
                settings.autoSaveOnAiGenerate
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300 bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong'
              }`}
              checked={settings.autoSaveOnAiGenerate}
              onCheckedChange={(checked) => patch({ autoSaveOnAiGenerate: checked })}
              aria-label="AI 생성 완료 시 자동 저장"
            >
              <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
            </Switch.Root>
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
            <PretextAutoHeightTextarea
              layoutKey={open}
              minHeight={112}
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
