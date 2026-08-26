import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import { WebfontCssEditorModal } from '@/components/settings/WebfontCssEditorModal';
import {
  BUILTIN_WEBFONT_ENTRIES,
  deleteWebfontFile,
  extractFontFamilyNamesFromCss,
  loadWebfontsFromStorage,
  type WebfontFileEntry,
} from '@/utils/webfontSettingsStore';

export default function WebfontSettings() {
  const [files, setFiles] = useState<WebfontFileEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<WebfontFileEntry | null>(null);
  const [pendingDelete, setPendingDelete] = useState<WebfontFileEntry | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const next = await loadWebfontsFromStorage();
      setFiles(next.files);
      setLoaded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const openEdit = (file: WebfontFileEntry) => {
    setEditing(file);
    setEditorOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    setError(null);
    try {
      const next = await deleteWebfontFile(pendingDelete.id);
      setFiles(next.files);
      setPendingDelete(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      id="settings-webfonts"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">웹폰트</h3>
      <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
        웹폰트는 vault의{' '}
        <code className="rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft">.settings/webfonts/</code>
        아래 <strong>개별 CSS 파일</strong>로 관리됩니다. 앱 기본 글꼴(Paperozi · A2z · D2Coding · KoPub Dotum · KoPub Batang · JoseonShinmyeongjo)은
        번들에 포함되어 항상 사용할 수 있고, 사용자 웹폰트는 추가·편집·삭제할 수 있습니다. 한글
        웹폰트는{' '}
        <a
          href="https://noonnu.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          noonnu.cc
        </a>
        {' '}또는{' '}
        <a
          href="https://fonts.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          google fonts
        </a>
        에서 찾을 수 있습니다.
      </p>

      {error ? (
        <p className="mb-2 text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mb-4">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted">
          앱 기본 글꼴
        </div>
        <ul className="space-y-1.5">
          {BUILTIN_WEBFONT_ENTRIES.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            >
              <div>
                <div className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong" style={{ fontFamily: b.name }}>
                  {b.name}
                </div>
                <div className="text-[10px] text-gray-400 dark:text-odp-muted">번들 내장 · 삭제 불가</div>
              </div>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 dark:bg-odp-bg dark:text-odp-muted">
                built-in
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted">
          사용자 웹폰트 파일
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            disabled={!loaded || busy}
            onClick={openCreate}
            className="inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            웹폰트 추가
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void reload()}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            새로고침
          </button>
        </div>
      </div>

      {!loaded ? (
        <p className="text-xs text-gray-500 dark:text-odp-muted">불러오는 중…</p>
      ) : files.length === 0 ? (
        <p className="rounded border border-dashed border-gray-200 px-3 py-4 text-center text-xs text-gray-400 dark:border-odp-borderStrong dark:text-odp-muted">
          아직 추가된 웹폰트 파일이 없습니다. 「웹폰트 추가」로 CSS를 저장하세요.
        </p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => {
            const families = extractFontFamilyNamesFromCss(file.css);
            return (
              <li
                key={file.id}
                className="flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                    {file.name}
                  </div>
                  <div className="truncate text-[10px] text-gray-400 dark:text-odp-muted">
                    {file.filename}
                    {families.length ? ` · ${families.join(', ')}` : ''}
                  </div>
                  {families.length > 0 ? (
                    <ul className="mt-1 flex flex-wrap gap-1">
                      {families.map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[10px] dark:border-odp-border dark:bg-odp-bg"
                          style={{ fontFamily: f }}
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => openEdit(file)}
                  className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-focusBg"
                >
                  <Pencil className="h-3 w-3" aria-hidden />
                  편집
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setPendingDelete(file)}
                  className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-3 w-3" aria-hidden />
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <WebfontCssEditorModal
        isOpen={editorOpen}
        initialFile={editing}
        onClose={() => {
          setEditorOpen(false);
          setEditing(null);
        }}
        onSaved={() => {
          void reload();
        }}
      />

      <ConfirmModal
        isOpen={Boolean(pendingDelete)}
        title="웹폰트 삭제"
        message={
          pendingDelete
            ? `"${pendingDelete.name}" (${pendingDelete.filename}) 파일을 삭제할까요까요?`
            : ''
        }
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="danger"
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
