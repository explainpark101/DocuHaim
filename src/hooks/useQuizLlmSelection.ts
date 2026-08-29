import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  defaultModelForKind,
  loadLastLlmProfileId,
  loadLastUsedModelForProfile,
  resolveSelectedLlmProfile,
  saveLastLlmProfileId,
  saveLastUsedModelForProfile,
  type LlmProviderProfile,
} from '@/utils/llmProviderProfiles';
import {
  loadQuizSettings,
  QUIZ_SETTINGS_CHANGED_EVENT,
  saveQuizSettings,
} from '@/utils/quiz/quizSettingsStore';

export type QuizLlmSelectionOpts = {
  profileId?: string;
  model?: string;
};

function resolveQuizLlmModel(
  profiles: LlmProviderProfile[],
  profileId: string,
  settingsModelId: string | null | undefined,
): string {
  const profile = resolveSelectedLlmProfile(profiles, profileId);
  if (!profile) return '';
  const fromSettings = String(settingsModelId || '').trim();
  if (fromSettings) return fromSettings;
  const lastUsed = loadLastUsedModelForProfile(profile.id, profile.kind).trim();
  if (lastUsed) return lastUsed;
  return defaultModelForKind(profile.kind);
}

export function useQuizLlmSelection(profiles: LlmProviderProfile[]) {
  const [profileId, setProfileId] = useState('');
  const [model, setModel] = useState('');

  const syncFromSettings = useCallback(() => {
    const settings = loadQuizSettings();
    const profile = resolveSelectedLlmProfile(
      profiles,
      settings.profileId || loadLastLlmProfileId(),
    );
    const nextProfileId = profile?.id ?? '';
    setProfileId(nextProfileId);
    setModel(resolveQuizLlmModel(profiles, nextProfileId, settings.modelId));
  }, [profiles]);

  useEffect(() => {
    syncFromSettings();
    const onChange = () => syncFromSettings();
    window.addEventListener(QUIZ_SETTINGS_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(QUIZ_SETTINGS_CHANGED_EVENT, onChange);
  }, [syncFromSettings]);

  const onProfileIdChange = useCallback(
    (nextProfileId: string) => {
      const trimmedId = nextProfileId.trim();
      setProfileId(trimmedId);
      saveLastLlmProfileId(trimmedId);
      const profile = resolveSelectedLlmProfile(profiles, trimmedId);
      const nextModel = profile
        ? resolveQuizLlmModel(profiles, profile.id, null)
        : '';
      setModel(nextModel);
      saveQuizSettings({
        profileId: trimmedId || null,
        modelId: nextModel || null,
      });
    },
    [profiles],
  );

  const onModelChange = useCallback(
    (nextModel: string) => {
      const trimmedModel = nextModel.trim();
      setModel(trimmedModel);
      saveQuizSettings({ modelId: trimmedModel || null });
      const profile = resolveSelectedLlmProfile(profiles, profileId);
      if (profile) saveLastUsedModelForProfile(profile.id, trimmedModel);
    },
    [profiles, profileId],
  );

  const llmOpts = useMemo((): QuizLlmSelectionOpts => {
    const out: QuizLlmSelectionOpts = {};
    const pid = profileId.trim();
    const mid = model.trim();
    if (pid) out.profileId = pid;
    if (mid) out.model = mid;
    return out;
  }, [profileId, model]);

  return {
    profileId,
    model,
    onProfileIdChange,
    onModelChange,
    llmOpts,
    syncFromSettings,
  };
}
