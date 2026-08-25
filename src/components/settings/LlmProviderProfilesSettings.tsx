import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { RadioGroup } from 'radix-ui';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import OpenAiCompatibleModelSelect from '@/components/OpenAiCompatibleModelSelect';
import {
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  createLlmProviderProfileId,
  defaultModelForKind,
  loadLastUsedModelForProfile,
  saveLastUsedModelForProfile,
  validateLlmProviderProfileDraft,
  type LlmProviderKind,
  type LlmProviderProfile,
} from '@/utils/llmProviderProfiles';
import { normalizeOpenAiCompatibleBaseUrl } from '@/utils/openaiCompatibleSettings';

type Draft = {
  id: string;
  name: string;
  kind: LlmProviderKind;
  baseUrl: string;
  keyInput: string;
  hasStoredKey: boolean;
};

const RADIO_ITEM_CLASS =
  'size-3.5 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft';
const RADIO_INDICATOR_CLASS =
  'relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white';

function kindLabel(kind: LlmProviderKind): string {
  return kind === LLM_PROVIDER_GEMINI ? 'Google Gemini' : 'OpenAI 호환';
}

function emptyDraft(): Draft {
  return {
    id: createLlmProviderProfileId(),
    name: '',
    kind: LLM_PROVIDER_OPENAI_COMPATIBLE,
    baseUrl: '',
    keyInput: '',
    hasStoredKey: false,
  };
}

function draftFromProfile(profile: LlmProviderProfile): Draft {
  return {
    id: profile.id,
    name: profile.name,
    kind: profile.kind,
    baseUrl: profile.baseUrl,
    keyInput: '',
    hasStoredKey: Boolean(profile.apiKey.trim()),
  };
}

type LlmProviderProfilesSettingsProps = {
  profiles: LlmProviderProfile[];
  onSaveProfiles: (next: LlmProviderProfile[]) => void;
};

export default function LlmProviderProfilesSettings({
  profiles,
  onSaveProfiles,
}: LlmProviderProfilesSettingsProps) {
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<LlmProviderProfile | null>(null);
  const [modelTick, setModelTick] = useState(0);
  const [draftModel, setDraftModel] = useState('');

  const editingProfile = useMemo(
    () => (editingId ? profiles.find((p) => p.id === editingId) ?? null : null),
    [editingId, profiles],
  );

  useEffect(() => {
    if (!draft) {
      setDraftModel('');
      return;
    }
    setDraftModel(
      loadLastUsedModelForProfile(draft.id, draft.kind) || defaultModelForKind(draft.kind),
    );
  }, [draft?.id, draft?.kind]);

  const handleDraftModelChange = useCallback(
    (next: string) => {
      if (!draft) return;
      setDraftModel(next);
      saveLastUsedModelForProfile(draft.id, next);
    },
    [draft],
  );

  const startCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft());
  };

  const startEdit = (profile: LlmProviderProfile) => {
    setEditingId(profile.id);
    setDraft(draftFromProfile(profile));
  };

  const cancelDraft = () => {
    setDraft(null);
    setEditingId(null);
  };

  const handleSaveDraft = () => {
    if (!draft) return;
    const error = validateLlmProviderProfileDraft({
      name: draft.name,
      kind: draft.kind,
      baseUrl: draft.baseUrl,
      apiKey: draft.keyInput,
      hasStoredKey: draft.hasStoredKey,
    });
    if (error) {
      alert(error);
      return;
    }
    const apiKey =
      draft.keyInput.trim() || (editingProfile?.id === draft.id ? editingProfile.apiKey : '');
    const nextProfile: LlmProviderProfile = {
      id: draft.id,
      name: draft.name.trim(),
      kind: draft.kind,
      baseUrl:
        draft.kind === LLM_PROVIDER_OPENAI_COMPATIBLE
          ? normalizeOpenAiCompatibleBaseUrl(draft.baseUrl)
          : '',
      apiKey,
    };
    const exists = profiles.some((p) => p.id === nextProfile.id);
    const next = exists
      ? profiles.map((p) => (p.id === nextProfile.id ? nextProfile : p))
      : [...profiles, nextProfile];
    onSaveProfiles(next);
    cancelDraft();
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const next = profiles.filter((p) => p.id !== pendingDelete.id);
    onSaveProfiles(next);
    if (draft?.id === pendingDelete.id) cancelDraft();
    setPendingDelete(null);
  };

  return (
    <div
      id="settings-llm-providers"
      tabIndex={-1}
      className="scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 text-left"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
        ) : (
          <ChevronRight size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
        )}
        <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
          AI 도우미 제공자
        </h3>
      </button>
      {open ? (
        <>
          <p className="text-xs text-gray-600 dark:text-odp-muted">
            Gemini와 OpenAI 호환 endpoint를 여러 개 저장할 수 있습니다. 실제 사용할 제공자는
            에디터 AI 도우미에서 고릅니다. API 키는 연결 정보와 함께 암호화되며, 이 화면에서 다시
            표시되지 않습니다. 웹에서는 Gemini 요청이 Google AI Studio(
            <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">
              generativelanguage.googleapis.com
            </code>
            )로 직접 전송됩니다. Tauri 앱은 네이티브 HTTP를 사용합니다. OpenAI 호환
            endpoint는 CORS가 허용되어야 합니다.
          </p>

          {profiles.length === 0 ? (
            <p className="text-xs text-gray-500 dark:text-odp-muted">
              저장된 제공자가 없습니다. 아래 버튼으로 추가하세요.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {profiles.map((profile) => (
                <li
                  key={profile.id}
                  className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                      {profile.name}
                    </div>
                    <div className="truncate text-[11px] text-gray-500 dark:text-odp-muted">
                      {kindLabel(profile.kind)}
                      {profile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE && profile.baseUrl
                        ? ` · ${profile.baseUrl}`
                        : ''}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(profile)}
                      className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg"
                    >
                      <Pencil className="h-3 w-3" aria-hidden />
                      편집
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(profile)}
                      className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="h-3 w-3" aria-hidden />
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {draft ? (
            <div className="space-y-3 rounded border border-gray-200 bg-white p-3 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
              <p className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
                {editingId ? '제공자 편집' : '제공자 추가'}
              </p>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                  이름
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg"
                  value={draft.name}
                  onChange={(e) => setDraft((p) => (p ? { ...p, name: e.target.value } : p))}
                  placeholder="예: OpenRouter, 로컬 Ollama"
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-gray-600 dark:text-odp-muted">
                  종류
                </p>
                <RadioGroup.Root
                  className="flex flex-wrap items-center gap-4"
                  value={draft.kind}
                  onValueChange={(next) => {
                    if (next !== LLM_PROVIDER_GEMINI && next !== LLM_PROVIDER_OPENAI_COMPATIBLE) {
                      return;
                    }
                    const nextKind = next as LlmProviderKind;
                    const nextDefaultModel = defaultModelForKind(nextKind);
                    setDraft((p) => {
                      if (!p) return p;
                      saveLastUsedModelForProfile(p.id, nextDefaultModel);
                      return {
                        ...p,
                        kind: nextKind,
                        keyInput: '',
                        hasStoredKey:
                          editingProfile?.kind === nextKind &&
                          Boolean(editingProfile.apiKey.trim()),
                      };
                    });
                    setDraftModel(nextDefaultModel);
                    setModelTick((n) => n + 1);
                  }}
                  aria-label="제공자 종류"
                >
                  <label className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg">
                    <RadioGroup.Item value={LLM_PROVIDER_GEMINI} className={RADIO_ITEM_CLASS}>
                      <RadioGroup.Indicator className={RADIO_INDICATOR_CLASS} />
                    </RadioGroup.Item>
                    <span>Google Gemini</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-700 dark:text-odp-fg">
                    <RadioGroup.Item
                      value={LLM_PROVIDER_OPENAI_COMPATIBLE}
                      className={RADIO_ITEM_CLASS}
                    >
                      <RadioGroup.Indicator className={RADIO_INDICATOR_CLASS} />
                    </RadioGroup.Item>
                    <span>OpenAI 호환</span>
                  </label>
                </RadioGroup.Root>
              </div>
              {draft.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ? (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                    Endpoint URL
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg"
                    value={draft.baseUrl}
                    onChange={(e) => setDraft((p) => (p ? { ...p, baseUrl: e.target.value } : p))}
                    placeholder="https://api.openai.com/v1"
                  />
                  <p className="mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted">
                    예: https://api.openai.com/v1 , https://openrouter.ai/api/v1 ,
                    http://localhost:11434/v1
                  </p>
                </div>
              ) : null}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                  API Key{draft.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ? ' (선택)' : ''}
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bg"
                  value={draft.keyInput}
                  onChange={(e) => setDraft((p) => (p ? { ...p, keyInput: e.target.value } : p))}
                  placeholder={
                    draft.hasStoredKey
                      ? '저장됨 — 변경 시 새 키 입력'
                      : draft.kind === LLM_PROVIDER_GEMINI
                        ? 'AI Studio API 키 입력'
                        : 'Bearer 토큰 (로컬 서버는 비워 두세요)'
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                  기본 모델
                </label>
                {draft.kind === LLM_PROVIDER_GEMINI ? (
                  <GeminiModelSelect
                    key={`${draft.id}-${modelTick}`}
                    getGeminiApiKey={() =>
                      draft.keyInput.trim() ||
                      (editingProfile?.kind === LLM_PROVIDER_GEMINI ? editingProfile.apiKey : '')
                    }
                    profileId={draft.id}
                    value={draftModel}
                    onChange={handleDraftModelChange}
                    autoLoad={draft.hasStoredKey || Boolean(draft.keyInput.trim())}
                  />
                ) : (
                  <OpenAiCompatibleModelSelect
                    key={`${draft.id}-${modelTick}`}
                    getBaseUrl={() => draft.baseUrl}
                    getApiKey={() =>
                      draft.keyInput.trim() ||
                      (editingProfile?.kind === LLM_PROVIDER_OPENAI_COMPATIBLE
                        ? editingProfile.apiKey
                        : '')
                    }
                    value={draftModel}
                    onChange={handleDraftModelChange}
                    autoLoad={Boolean(normalizeOpenAiCompatibleBaseUrl(draft.baseUrl))}
                  />
                )}
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={cancelDraft}
                  className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  제공자 저장
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:hover:bg-odp-focusBg"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              제공자 추가
            </button>
          )}
        </>
      ) : (
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          {profiles.length}개 저장됨
        </p>
      )}

      <ConfirmModal
        isOpen={Boolean(pendingDelete)}
        title="제공자 삭제"
        message={
          pendingDelete ? `"${pendingDelete.name}" 제공자를 삭제할까요?` : ''
        }
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
