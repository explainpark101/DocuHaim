import { useEffect, useMemo, useState } from 'react';
import { Plus, Save, Type, X } from 'lucide-react';
import { Form } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import { CssCodeMirrorEditor } from '@/components/CssCodeMirrorEditor';
import { formInputClassName } from '@/components/ui/RadixSelectField';
import {
  extractFontFamilyNamesFromCss,
  saveWebfontFile,
  type WebfontFileEntry,
} from '@/utils/webfontSettingsStore';

const EXAMPLE_CSS = ``;

type Props = {
  isOpen: boolean;
  /** When set, edit that file; otherwise create a new one. */
  initialFile?: WebfontFileEntry | null;
  onClose: () => void;
  onSaved?: (families: string[]) => void;
};

export function WebfontCssEditorModal({
  isOpen,
  initialFile = null,
  onClose,
  onSaved,
}: Props) {
  const [css, setCss] = useState('');
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setCss(initialFile?.css ?? '');
    setName(initialFile?.name ?? '');
    setError(null);
    setSaving(false);
  }, [isOpen, initialFile]);

  const families = useMemo(() => extractFontFamilyNamesFromCss(css), [css]);
  const isEdit = Boolean(initialFile?.id);

  const handleSave = async () => {
    if (!css.trim()) {
      setError('CSS를 입력하세요.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: { id?: string; name?: string; css: string } = { css };
      if (initialFile?.id) payload.id = initialFile.id;
      const trimmedName = name.trim();
      if (trimmedName) payload.name = trimmedName;
      await saveWebfontFile(payload);
      onSaved?.(families);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="max-w-2xl w-[min(96vw,40rem)]">
      <Form.Root
        className="flex max-h-[85vh] flex-col gap-3 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSave();
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 dark:text-odp-fgStrong">
              {isEdit ? <Type className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
              {isEdit ? '웹폰트 편집' : '웹폰트 추가'}
            </h2>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
              `@font-face` / `@import` CSS를 저장하면 vault의{' '}
              <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">.settings/webfonts/</code>
              에 개별 파일로 추가됩니다.{' '}
              <a
                href="https://noonnu.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400"
              >
                noonnu.cc
              </a>
              {' '}또는{' '}
              <a
                href="https://fonts.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400"
              >
                google fonts
              </a>
              에서 찾을 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-odp-focusBg"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <Form.Field name="display-name" className="flex flex-col gap-0.5 text-[11px] text-gray-600 dark:text-odp-muted">
          <Form.Label>표시 이름 (비우면 감지된 font-family 사용)</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={families[0] ?? 'MyFont'}
              className={formInputClassName}
            />
          </Form.Control>
        </Form.Field>

        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <span className="text-[11px] font-medium text-gray-600 dark:text-odp-muted">CSS</span>
          <CssCodeMirrorEditor
            value={css}
            onChange={setCss}
            className="h-[min(50vh,22rem)]"
          />
          {!css.trim() && !isEdit ? (
            <p className="whitespace-pre-wrap font-mono text-[10px] text-gray-400">{EXAMPLE_CSS}</p>
          ) : null}
        </div>

        <div className="rounded border border-gray-100 bg-gray-50 px-2 py-1.5 dark:border-odp-border dark:bg-odp-bgSoft/50">
          <div className="mb-1 text-[10px] font-semibold text-gray-500 dark:text-odp-muted">
            감지된 font-family
          </div>
          {families.length === 0 ? (
            <p className="text-[10px] text-gray-400">`@font-face`의 font-family가 여기에 표시됩니다.</p>
          ) : (
            <ul className="flex flex-wrap gap-1">
              {families.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] dark:border-odp-borderStrong dark:bg-odp-bg"
                  style={{ fontFamily: f }}
                >
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex justify-end gap-2 border-t border-gray-100 pt-2 dark:border-odp-border">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted"
          >
            <X className="h-3 w-3" aria-hidden />
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              '저장 중…'
            ) : (
              <>
                <Save className="h-3 w-3" aria-hidden />
                저장
              </>
            )}
          </button>
        </div>
      </Form.Root>
    </Modal>
  );
}
