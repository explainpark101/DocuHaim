import { useCallback, useEffect, useState } from 'react';
import Modal from '@/components/shared/modals/Modal';
import { HaimTableStyleFields } from '@/components/haimTable/HaimTableStyleFields';
import type {
  HaimTableSectionKey,
  HaimTableStyle,
  HaimTableTemplate,
  HaimTableTemplateRule,
} from '@/utils/haimTable/types';
import {
  parseTableStyleYaml,
  serializeTableStyleYaml,
} from '@/utils/tableStyleSettingsStore';

type Props = {
  isOpen: boolean;
  template: HaimTableTemplate | null;
  /** When creating, pass a draft with id/name. */
  onClose: () => void;
  onSave: (template: HaimTableTemplate) => void;
};

const SECTION_KEYS: HaimTableSectionKey[] = ['thead', 'tbody', 'tfoot'];

function newRule(): HaimTableTemplateRule {
  return { rows: 'odd' };
}

/**
 * Edit one table style template via GUI or YAML.
 */
export function TableStyleTemplateEditor({ isOpen, template, onClose, onSave }: Props) {
  const [mode, setMode] = useState<'gui' | 'yaml'>('gui');
  const [draft, setDraft] = useState<HaimTableTemplate | null>(null);
  const [yamlText, setYamlText] = useState('');
  const [yamlError, setYamlError] = useState<string | null>(null);
  const [sectionTab, setSectionTab] = useState<HaimTableSectionKey>('thead');

  useEffect(() => {
    if (!isOpen || !template) return;
    setDraft({ ...template, sections: { ...template.sections }, rules: [...(template.rules ?? [])] });
    setYamlText(
      serializeTableStyleYaml({
        version: 1,
        templates: [template],
      }),
    );
    setYamlError(null);
    setMode('gui');
  }, [isOpen, template]);

  const syncYamlFromDraft = useCallback((next: HaimTableTemplate) => {
    setYamlText(
      serializeTableStyleYaml({
        version: 1,
        templates: [next],
      }),
    );
  }, []);

  const updateDraft = useCallback(
    (updater: (prev: HaimTableTemplate) => HaimTableTemplate) => {
      setDraft((prev) => {
        if (!prev) return prev;
        const next = updater(prev);
        syncYamlFromDraft(next);
        return next;
      });
    },
    [syncYamlFromDraft],
  );

  const applyYaml = () => {
    try {
      const parsed = parseTableStyleYaml(yamlText);
      const t = parsed.templates[0];
      if (!t) {
        setYamlError('YAML must contain at least one template');
        return;
      }
      // Keep editing id if single-template dump used different structure
      const merged: HaimTableTemplate = {
        ...t,
        id: draft?.id || t.id,
        name: t.name || draft?.name || t.id,
      };
      setDraft(merged);
      setYamlError(null);
      setMode('gui');
    } catch (e) {
      setYamlError(e instanceof Error ? e.message : String(e));
    }
  };

  if (!draft) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="max-w-2xl w-[min(96vw,42rem)]">
      <div className="flex max-h-[85vh] flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-gray-800 dark:text-odp-fgStrong">표 스타일 템플릿</h2>
          <div className="flex gap-1 text-xs">
            <button
              type="button"
              className={`rounded px-2 py-1 ${mode === 'gui' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-odp-bgSoft'}`}
              onClick={() => setMode('gui')}
            >
              GUI
            </button>
            <button
              type="button"
              className={`rounded px-2 py-1 ${mode === 'yaml' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-odp-bgSoft'}`}
              onClick={() => {
                syncYamlFromDraft(draft);
                setMode('yaml');
              }}
            >
              YAML
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="text-[10px] text-gray-500">
            id
            <input
              value={draft.id}
              onChange={(e) => updateDraft((p) => ({ ...p, id: e.target.value.trim() }))}
              className="mt-0.5 w-full rounded border border-gray-200 px-2 py-1 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            />
          </label>
          <label className="text-[10px] text-gray-500">
            name
            <input
              value={draft.name}
              onChange={(e) => updateDraft((p) => ({ ...p, name: e.target.value }))}
              className="mt-0.5 w-full rounded border border-gray-200 px-2 py-1 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            />
          </label>
        </div>

        {mode === 'yaml' ? (
          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <textarea
              value={yamlText}
              onChange={(e) => setYamlText(e.target.value)}
              className="min-h-[280px] flex-1 rounded border border-gray-200 bg-white p-2 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg"
              spellCheck={false}
            />
            {yamlError ? <p className="text-xs text-red-600">{yamlError}</p> : null}
            <button
              type="button"
              onClick={applyYaml}
              className="self-start rounded bg-gray-800 px-3 py-1.5 text-xs text-white dark:bg-odp-fgStrong dark:text-odp-bg"
            >
              YAML 적용
            </button>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto space-y-4">
            <div>
              <div className="mb-2 flex gap-1">
                {SECTION_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSectionTab(key)}
                    className={`rounded px-2 py-1 text-[11px] ${
                      sectionTab === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-odp-bgSoft'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <HaimTableStyleFields
                idPrefix={`tpl-section-${sectionTab}`}
                value={draft.sections?.[sectionTab] ?? {}}
                onChange={(style: HaimTableStyle) =>
                  updateDraft((p) => ({
                    ...p,
                    sections: { ...p.sections, [sectionTab]: style },
                  }))
                }
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-700 dark:text-odp-fg">Rules (nth)</h3>
                <button
                  type="button"
                  className="rounded bg-gray-100 px-2 py-0.5 text-[11px] dark:bg-odp-bgSoft"
                  onClick={() =>
                    updateDraft((p) => ({
                      ...p,
                      rules: [...(p.rules ?? []), newRule()],
                    }))
                  }
                >
                  + rule
                </button>
              </div>
              <div className="space-y-3">
                {(draft.rules ?? []).map((rule, idx) => (
                  <div
                    key={idx}
                    className="rounded border border-gray-200 p-2 dark:border-odp-borderStrong"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <label className="text-[10px] text-gray-500">
                        rows
                        <input
                          value={rule.rows ?? ''}
                          onChange={(e) =>
                            updateDraft((p) => {
                              const rules = [...(p.rules ?? [])];
                              const prev = { ...rules[idx]! };
                              const v = e.target.value.trim();
                              if (v) prev.rows = v;
                              else delete prev.rows;
                              rules[idx] = prev;
                              return { ...p, rules };
                            })
                          }
                          placeholder="odd / 2n+1"
                          className="ml-1 w-24 rounded border border-gray-200 px-1 py-0.5 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                        />
                      </label>
                      <label className="text-[10px] text-gray-500">
                        cols
                        <input
                          value={rule.cols ?? ''}
                          onChange={(e) =>
                            updateDraft((p) => {
                              const rules = [...(p.rules ?? [])];
                              const prev = { ...rules[idx]! };
                              const v = e.target.value.trim();
                              if (v) prev.cols = v;
                              else delete prev.cols;
                              rules[idx] = prev;
                              return { ...p, rules };
                            })
                          }
                          placeholder="1"
                          className="ml-1 w-16 rounded border border-gray-200 px-1 py-0.5 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                        />
                      </label>
                      <button
                        type="button"
                        className="ml-auto text-[10px] text-red-500"
                        onClick={() =>
                          updateDraft((p) => ({
                            ...p,
                            rules: (p.rules ?? []).filter((_, i) => i !== idx),
                          }))
                        }
                      >
                        삭제
                      </button>
                    </div>
                    <HaimTableStyleFields
                      compact
                      idPrefix={`tpl-rule-${idx}`}
                      value={rule}
                      onChange={(style) =>
                        updateDraft((p) => {
                          const rules = [...(p.rules ?? [])];
                          const prev = rules[idx]!;
                          const next: HaimTableTemplateRule = { ...style };
                          if (prev.rows) next.rows = prev.rows;
                          if (prev.cols) next.cols = prev.cols;
                          rules[idx] = next;
                          return { ...p, rules };
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 border-t border-gray-100 pt-2 dark:border-odp-border">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              if (!draft.id.trim()) return;
              onSave({ ...draft, id: draft.id.trim(), name: draft.name.trim() || draft.id });
            }}
            className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}
