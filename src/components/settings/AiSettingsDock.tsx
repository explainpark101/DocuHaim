import AppRightDockShell from '@/components/shell/AppRightDockShell';
import LlmProviderProfilesSettings from '@/components/settings/LlmProviderProfilesSettings';
import LlamaCppSettings from '@/components/settings/LlamaCppSettings';
import MlxVlmSettings from '@/components/settings/MlxVlmSettings';
import QuizSettingsSection from '@/components/settings/QuizSettings';
import { useAiSettingsDock } from '@/contexts/AiSettingsDockContext';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';
import { X } from 'lucide-react';

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
          <LlmProviderProfilesSettings
            profiles={profiles}
            onSaveProfiles={onSaveProfiles}
            compact
          />
          <MlxVlmSettings />
          <LlamaCppSettings />
          <QuizSettingsSection llmProviderProfiles={profiles} />
        </div>
      </div>
    </AppRightDockShell>
  );
}
