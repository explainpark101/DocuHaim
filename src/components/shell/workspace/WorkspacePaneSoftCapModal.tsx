import { useEffect, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import {
  clampWorkspacePaneSoftCap,
  loadWorkspacePaneSoftCap,
  saveWorkspacePaneSoftCap,
  WORKSPACE_PANE_SOFT_CAP_MAX,
  WORKSPACE_PANE_SOFT_CAP_MIN,
} from '@/utils/workspaceTabsSettings';

export type WorkspacePaneSoftCapPrompt = {
  leafCount: number;
  currentCap: number;
};

type Props = {
  prompt: WorkspacePaneSoftCapPrompt | null;
  onCancel: () => void;
  /** Called after the soft-cap value is saved; return whether the pending split retry succeeded. */
  onConfirm: (nextCap: number) => void;
};

export default function WorkspacePaneSoftCapModal({
  prompt,
  onCancel,
  onConfirm,
}: Props) {
  const open = prompt != null;
  const [draft, setDraft] = useState(() =>
    String(prompt?.currentCap ?? loadWorkspacePaneSoftCap()),
  );

  useEffect(() => {
    if (!prompt) return;
    // Suggest one above the current leaf count so the pending split can proceed.
    const suggested = clampWorkspacePaneSoftCap(
      Math.max(prompt.currentCap + 1, prompt.leafCount + 1),
    );
    setDraft(String(suggested));
  }, [prompt]);

  const parsed = clampWorkspacePaneSoftCap(draft);
  const invalid = !Number.isFinite(Number(draft)) || Number(draft) < WORKSPACE_PANE_SOFT_CAP_MIN;

  return (
    <ConfirmModal
      isOpen={open}
      title="분할 페인 개수 상한"
      message={
        prompt
          ? `분할 페인 상한(${prompt.currentCap}개)에 도달했습니다. 상한을 올리면 바로 분할을 계속할 수 있습니다.`
          : undefined
      }
      confirmLabel="상한 변경 후 분할"
      cancelLabel="취소"
      confirmDisabled={invalid || (prompt != null && parsed <= prompt.leafCount)}
      onCancel={onCancel}
      onConfirm={() => {
        if (invalid || !prompt) return;
        const next = saveWorkspacePaneSoftCap(parsed);
        onConfirm(next);
      }}
    >
      <label className="flex flex-col gap-1.5 text-sm text-gray-700 dark:text-odp-fg">
        <span className="font-medium">최대 분할 페인 수</span>
        <input
          type="number"
          inputMode="numeric"
          min={WORKSPACE_PANE_SOFT_CAP_MIN}
          max={WORKSPACE_PANE_SOFT_CAP_MAX}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fgStrong"
          aria-label="최대 분할 페인 수"
        />
        <span className="text-[11px] text-gray-500 dark:text-odp-muted">
          {WORKSPACE_PANE_SOFT_CAP_MIN}–{WORKSPACE_PANE_SOFT_CAP_MAX} (현재 페인 {prompt?.leafCount ?? 0}개)
        </span>
      </label>
    </ConfirmModal>
  );
}
