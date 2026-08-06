import { useCallback, useEffect, useState } from 'react';
import { TableStyleTemplateEditor } from '@/components/settings/TableStyleTemplateEditor';
import type { HaimTableTemplate } from '@/utils/haimTable/types';
import {
  DEFAULT_TABLE_STYLE_SETTINGS,
  getCachedTableStyleSettings,
  loadTableStylesFromStorage,
  saveTableStylesToStorage,
} from '@/utils/tableStyleSettingsStore';

export default function TableStyleSettings() {
  const [templates, setTemplates] = useState<HaimTableTemplate[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<HaimTableTemplate | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const next = await loadTableStylesFromStorage();
      setTemplates(next.templates);
      setLoaded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setTemplates(getCachedTableStyleSettings().templates);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const persist = async (nextTemplates: HaimTableTemplate[]) => {
    setSaving(true);
    setError(null);
    try {
      await saveTableStylesToStorage({
        ...DEFAULT_TABLE_STYLE_SETTINGS,
        templates: nextTemplates,
      });
      setTemplates(nextTemplates);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      id="settings-table-styles"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">표 스타일 템플릿</h3>
      <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
        haim-table 구역/행·열 규칙 템플릿입니다. vault의{' '}
        <code className="rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft">
          .settings/table-styles.yaml
        </code>
        에 동기화됩니다.
      </p>

      {error ? <p className="mb-2 text-xs text-red-600">{error}</p> : null}

      <div className="mb-3 flex gap-2">
        <button
          type="button"
          disabled={!loaded || saving}
          onClick={() => {
            const id = `template-${Date.now().toString(36)}`;
            setEditing({
              id,
              name: '새 템플릿',
              sections: {},
              rules: [{ rows: 'odd', bg: '#f5f5f5' }],
            });
            setEditorOpen(true);
          }}
          className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          새 템플릿
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => void reload()}
          className="rounded bg-gray-100 px-3 py-1.5 text-xs dark:bg-odp-bgSoft"
        >
          새로고침
        </button>
      </div>

      <ul className="space-y-2">
        {templates.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          >
            <div className="min-w-0">
              <div className="truncate font-medium text-gray-800 dark:text-odp-fg">{t.name}</div>
              <div className="truncate text-[10px] text-gray-400">{t.id}</div>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                className="rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-odp-surface"
                onClick={() => {
                  setEditing(t);
                  setEditorOpen(true);
                }}
              >
                편집
              </button>
              <button
                type="button"
                className="rounded px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                onClick={() => void persist(templates.filter((x) => x.id !== t.id))}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
        {loaded && templates.length === 0 ? (
          <li className="text-xs text-gray-400">등록된 템플릿이 없습니다.</li>
        ) : null}
      </ul>

      <TableStyleTemplateEditor
        isOpen={editorOpen}
        template={editing}
        onClose={() => {
          setEditorOpen(false);
          setEditing(null);
        }}
        onSave={(tpl) => {
          const without = templates.filter((x) => x.id !== editing?.id && x.id !== tpl.id);
          void persist([...without, tpl]).then(() => {
            setEditorOpen(false);
            setEditing(null);
          });
        }}
      />
    </div>
  );
}
