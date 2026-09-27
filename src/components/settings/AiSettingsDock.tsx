import { lazy, Suspense } from 'react';
import AppRightDockShell from '@/components/shell/AppRightDockShell';
import { useAiSettingsDock } from '@/contexts/AiSettingsDockContext';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';
import { X } from 'lucide-react';

const LlmProviderProfilesSettings = lazy(
  () => import('@/components/settings/LlmProviderProfilesSettings'),
);
const LlamaCppSettings = lazy(() => import('@/components/settings/LlamaCppSettings'));
const MlxVlmSettings = lazy(() => import('@/components/settings/MlxVlmSettings'));
const QuizSettingsSection = lazy(() => import('@/components/settings/QuizSettings'));

type AiSettingsDockProps = {
  profiles: LlmProviderProfile[];
  onSaveProfiles: (next: LlmProviderProfile[]) => void;
};

export default function AiSettingsDock({ profiles, onSaveProfiles }: AiSettingsDockProps) {
  const { open, closeDock } = useAiSettingsDock();

  return (
    <AppRightDockShell
      open={open}
      onClose={closeDock}
      storageKey="s3haim_ai_settings_dock_width"
      defaultWidth={420}
      resizeLabel="AI 설정 너비 조절"
      className="border-slate-200 dark:border-odp-borderSoft"
    >
      <div
        role="complementary"
        aria-label="AI 설정"
        className="flex h-full min-h-0 flex-col"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-3 py-2.5 dark:border-odp-borderSoft">
          <div className="text-sm font-bold text-slate-900 dark:text-odp-fgStrong">AI 설정</div>
          <button
            type="button"
            aria-label="AI 설정 닫기"
            className="rounded p-1 hover:bg-slate-100 dark:hover:bg-odp-focusBg"
            onClick={closeDock}
          >
            <X size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
          {open ? (
            <Suspense
              fallback={
                <div className="py-6 text-center text-sm text-slate-500 dark:text-odp-muted">
                  로딩 중…
                </div>
              }
            >
              <LlmProviderProfilesSettings
                profiles={profiles}
                onSaveProfiles={onSaveProfiles}
                compact
              />
              <MlxVlmSettings />
              <LlamaCppSettings />
              <QuizSettingsSection llmProviderProfiles={profiles} />
            </Suspense>
          ) : null}
        </div>
      </div>
    </AppRightDockShell>
  );
}
