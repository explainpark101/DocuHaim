import { useEffect, useState } from 'react';
import { Switch } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconCheck, IconX } from '@/components/icons';
import { settingsSectionCardClass } from '@/utils/settingsSectionCard';
import {
  DEFAULT_KANBAN_BOARD_SETTINGS,
  KANBAN_LIMIT_CARDS_PER_CELL_CAP,
  KANBAN_LIMIT_COLUMNS_CAP,
  KANBAN_LIMIT_LANES_CAP,
  normalizeKanbanBoardSettings,
  type KanbanBoardSettings,
} from '@/utils/kanban/kanbanDocument';

type KanbanDocumentSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  settings: KanbanBoardSettings;
  onApply: (next: KanbanBoardSettings) => void;
};

const SWITCH_ROOT =
  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400';
const SWITCH_ON = 'border-blue-600 bg-blue-600';
const SWITCH_OFF =
  'border-gray-300 bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong';

function FeatureSwitch({
  checked,
  onCheckedChange,
  label,
  description,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-white/60 bg-white/80 px-2.5 py-2 dark:border-odp-borderSoft/60 dark:bg-odp-surface/80">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
          {label}
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
          {description}
        </p>
      </div>
      <Switch.Root
        className={`${SWITCH_ROOT} ${checked ? SWITCH_ON : SWITCH_OFF}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      >
        <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
      </Switch.Root>
    </div>
  );
}

function LimitField({
  id,
  label,
  description,
  value,
  cap,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  value: number | null;
  cap: number;
  onChange: (next: number | null) => void;
}) {
  return (
    <label className="block space-y-1 rounded-md border border-white/60 bg-white/80 px-2.5 py-2 dark:border-odp-borderSoft/60 dark:bg-odp-surface/80">
      <span className="text-xs font-semibold text-gray-800 dark:text-odp-fgStrong">
        {label}
      </span>
      <p className="text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
        {description}
      </p>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={1}
          max={cap}
          placeholder="무제한"
          value={value ?? ''}
          className="w-28 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm tabular-nums dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          onChange={(e) => {
            const raw = e.target.value.trim();
            if (!raw) {
              onChange(null);
              return;
            }
            const n = Number(raw);
            if (!Number.isFinite(n)) return;
            onChange(Math.min(cap, Math.max(1, Math.floor(n))));
          }}
        />
        <span className="text-[11px] text-gray-400">비우면 무제한 (최대 {cap})</span>
      </div>
    </label>
  );
}

/**
 * Kanban-specific document settings (feature toggles + capacity limits).
 */
export default function KanbanDocumentSettingsModal({
  isOpen,
  onClose,
  settings,
  onApply,
}: KanbanDocumentSettingsModalProps) {
  const [local, setLocal] = useState<KanbanBoardSettings>(() =>
    normalizeKanbanBoardSettings(settings),
  );

  useEffect(() => {
    if (isOpen) setLocal(normalizeKanbanBoardSettings(settings));
  }, [isOpen, settings]);

  const patch = (partial: Partial<KanbanBoardSettings>) => {
    setLocal((prev) => ({ ...prev, ...partial }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-lg max-h-[90vh]"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            칸반 문서 설정
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
            이 보드(`.kanban.json`)에만 저장됩니다
          </p>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          <section
            className={settingsSectionCardClass('sky')}
            aria-label="기능 스위치"
          >
            <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
              기능
            </h3>
            <div className="space-y-2">
              <FeatureSwitch
                label="스윔레인"
                description="레인(행)을 표시하고 카드가 레인×열 셀로 이동합니다. 끄면 첫 레인만 보입니다."
                checked={local.swimlanesEnabled}
                onCheckedChange={(v) => patch({ swimlanesEnabled: v })}
              />
              <FeatureSwitch
                label="열 아이콘"
                description="열 제목 앞 이모지 아이콘"
                checked={local.columnIconsEnabled}
                onCheckedChange={(v) => patch({ columnIconsEnabled: v })}
              />
              <FeatureSwitch
                label="커버 이미지"
                description="열·카드 커버 경로와 썸네일"
                checked={local.coversEnabled}
                onCheckedChange={(v) => patch({ coversEnabled: v })}
              />
              <FeatureSwitch
                label="열 폴더 / 노트 추가"
                description="열에 vault 폴더를 연결하고 노트를 빠르게 만듭니다"
                checked={local.columnFoldersEnabled}
                onCheckedChange={(v) => patch({ columnFoldersEnabled: v })}
              />
              <FeatureSwitch
                label="열 색상"
                description="열 헤더 액센트 색"
                checked={local.columnColorsEnabled}
                onCheckedChange={(v) => patch({ columnColorsEnabled: v })}
              />
              <FeatureSwitch
                label="카드 태그"
                description="카드 태그 편집·표시"
                checked={local.tagsEnabled}
                onCheckedChange={(v) => patch({ tagsEnabled: v })}
              />
              <FeatureSwitch
                label="카드 링크"
                description="vault 파일 링크(linkPaths)"
                checked={local.linksEnabled}
                onCheckedChange={(v) => patch({ linksEnabled: v })}
              />
            </div>
          </section>

          <section
            className={settingsSectionCardClass('violet')}
            aria-label="개수 제한"
          >
            <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
              개수 제한
            </h3>
            <div className="space-y-2">
              <LimitField
                id="kanban-max-lanes"
                label="최대 레인(행) 수"
                description="스윔레인 행 개수 상한"
                value={local.maxLanes}
                cap={KANBAN_LIMIT_LANES_CAP}
                onChange={(maxLanes) => patch({ maxLanes })}
              />
              <LimitField
                id="kanban-max-columns"
                label="최대 열(컬럼) 수"
                description="보드 가로 열 개수 상한"
                value={local.maxColumns}
                cap={KANBAN_LIMIT_COLUMNS_CAP}
                onChange={(maxColumns) => patch({ maxColumns })}
              />
              <LimitField
                id="kanban-max-cards-cell"
                label="셀당 최대 카드 수"
                description="각 열×레인 컨테이너에 둘 수 있는 카드 수"
                value={local.maxCardsPerCell}
                cap={KANBAN_LIMIT_CARDS_PER_CELL_CAP}
                onChange={(maxCardsPerCell) => patch({ maxCardsPerCell })}
              />
            </div>
          </section>
        </div>

        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setLocal({ ...DEFAULT_KANBAN_BOARD_SETTINGS })}
          >
            기본값
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              onApply(normalizeKanbanBoardSettings(local));
              onClose();
            }}
          >
            <IconCheck size={14} />
            적용
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
