import { useEffect, useState } from 'react';

/** 저장 시 단축키 정규화: Windows Ctrl / Mac Cmd → mod 로 통일 */
function normalizeShortcutForStorage(shortcut) {
  if (!shortcut || typeof shortcut !== 'string') return '';
  return shortcut
    .toLowerCase()
    .replace(/\bctrl\b/g, 'mod')
    .replace(/\bmeta\b/g, 'mod')
    .trim();
}

/** keydown 이벤트에서 mod(Windows Ctrl / Mac Cmd) 포함 조합 문자열 생성 */
function getKeyComboFromEvent(e) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const parts = [];
  if (isMac ? e.metaKey : e.ctrlKey) parts.push('mod');
  if (e.altKey) parts.push('alt');
  if (e.shiftKey) parts.push('shift');
  const key = (e.key || '').toLowerCase();
  if (!key || key === 'shift' || key === 'control' || key === 'alt' || key === 'meta') return null;
  parts.push(key);
  if (parts.length <= 1) return null;
  return parts.join('+');
}

/** 표시용: mod → Ctrl / Cmd 로 변환 */
function formatKeyComboDisplay(combo) {
  if (!combo || typeof combo !== 'string') return '';
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const modLabel = isMac ? 'Cmd' : 'Ctrl';
  return combo
    .toLowerCase()
    .replace(/\bmod\b/g, modLabel)
    .split('+')
    .map((p) => p.trim().charAt(0).toUpperCase() + p.trim().slice(1))
    .join(' + ');
}

function createEmptySnippet() {
  return {
    id: String(Date.now()) + '-' + Math.random().toString(36).slice(2),
    name: '',
    prefix: '',
    body: '',
    description: '',
  };
}

export default function SnippetSettings({
  value,
  onChange,
  onSave,
  isSaving = false,
  isLoaded = true,
}) {
  const [localConfig, setLocalConfig] = useState(() => value || { snippets: [] });
  const [recordForSnippetId, setRecordForSnippetId] = useState(null);
  const [capturedCombo, setCapturedCombo] = useState(null);

  useEffect(() => {
    setLocalConfig(value || { snippets: [] });
  }, [value]);

  useEffect(() => {
    if (!recordForSnippetId) return;
    const onKeyDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const combo = getKeyComboFromEvent(e);
      if (combo) setCapturedCombo(combo);
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [recordForSnippetId]);

  const updateSnippets = (nextSnippets) => {
    const next = { snippets: nextSnippets };
    setLocalConfig(next);
    onChange?.(next);
  };

  const handleAdd = () => {
    updateSnippets([...(localConfig.snippets || []), createEmptySnippet()]);
  };

  const handleChangeField = (id, field, fieldValue) => {
    const next = (localConfig.snippets || []).map((s) =>
      s.id === id ? { ...s, [field]: fieldValue } : s,
    );
    updateSnippets(next);
  };

  const handleRemove = (id) => {
    const next = (localConfig.snippets || []).filter((s) => s.id !== id);
    updateSnippets(next);
  };

  const openRecordModal = (snippetId) => {
    setRecordForSnippetId(snippetId);
    setCapturedCombo(null);
  };

  const closeRecordModal = () => {
    setRecordForSnippetId(null);
    setCapturedCombo(null);
  };

  const confirmCapturedShortcut = () => {
    if (!recordForSnippetId || !capturedCombo) return;
    handleChangeField(recordForSnippetId, 'prefix', capturedCombo);
    closeRecordModal();
  };

  const handleSaveClick = () => {
    const snippets = localConfig.snippets || [];
    const trimmed = snippets.map((s) => {
      const rawPrefix = (s.prefix || '').trim();
      const normalizedPrefix = normalizeShortcutForStorage(rawPrefix) || rawPrefix;
      return {
        ...s,
        name: (s.name || '').trim(),
        prefix: normalizedPrefix,
        body: (s.body || '').replace(/\r\n/g, '\n'),
        description: (s.description || '').trim(),
      };
    });

    const invalid = trimmed.find((s) => !s.prefix || !s.body);
    if (invalid) {
      alert('각 스니펫에는 단축키(shortcut)와 body가 모두 필요합니다.');
      return;
    }

    const seen = new Set();
    for (const s of trimmed) {
      if (seen.has(s.prefix)) {
        alert(`중복된 단축키 "${s.prefix}" 이(가) 있습니다. 각 단축키는 고유해야 합니다.`);
        return;
      }
      seen.add(s.prefix);
    }

    const next = { snippets: trimmed };
    setLocalConfig(next);
    onChange?.(next);
    onSave?.(next);
  };

  const snippets = localConfig.snippets || [];

  return (
    <section className="bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-1">
          스니펫 단축키 설정
        </h3>
        <p className="text-xs text-gray-600 dark:text-odp-muted">
          단축키를 누르면 해당 코드 조각(body)이 에디터에 삽입됩니다. 단축키는 설정에서만 등록·수정할 수 있습니다.
          <span className="block mt-1">
            <strong>mod</strong> = Windows에서는 Ctrl, Mac에서는 Cmd로 자동 인식됩니다. 예: mod+shift+k, mod+shift+s
            <span className="block mt-1 text-amber-700 dark:text-amber-400">
              <code className="px-1 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">mod+k</code>는 Advanced Search(전역 검색)에 예약되어 있습니다.
            </span>
          </span>
          설정은
          <code className="px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">.settings/snippets.json</code>
          에 저장됩니다.
        </p>
      </div>

      <div className="space-y-2">
        {!isLoaded && (
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            스니펫 설정을 불러오는 중입니다…
          </p>
        )}
        {isLoaded && snippets.length === 0 && (
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            아직 등록된 스니펫이 없습니다. 아래 &quot;스니펫 추가&quot; 버튼을 눌러 새 스니펫을 만들어 보세요.
          </p>
        )}
        {snippets.map((s) => (
          <div
            key={s.id}
            className="border border-gray-200 dark:border-odp-borderSoft rounded-md p-3 bg-white dark:bg-odp-bgSoft space-y-2"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5">
                  이름 (선택)
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-xs bg-white dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-800 dark:text-odp-fgStrong"
                  value={s.name || ''}
                  onChange={(e) => handleChangeField(s.id, 'name', e.target.value)}
                  placeholder="예: TODO 블록"
                />
              </div>
              <div className="w-full sm:w-48">
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5">
                  단축키
                </label>
                <div className="flex items-center gap-1.5">
                  <span
                    className="flex-1 min-w-0 border rounded px-2 py-1 text-xs bg-gray-50 dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong truncate"
                    title={s.prefix ? formatKeyComboDisplay(s.prefix) : ''}
                  >
                    {s.prefix ? formatKeyComboDisplay(s.prefix) : '미설정'}
                  </span>
                  <button
                    type="button"
                    className="shrink-0 px-2 py-1 text-[11px] rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition"
                    onClick={() => openRecordModal(s.id)}
                  >
                    키 입력
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5">
                body (삽입될 코드 조각)
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 text-xs bg-white dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-800 dark:text-odp-fgStrong resize-y min-h-[60px]"
                value={s.body || ''}
                onChange={(e) => handleChangeField(s.id, 'body', e.target.value)}
                placeholder="예: - [ ] ${1:작업 내용}"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-0.5">
                  설명 (선택)
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-xs bg-white dark:bg-odp-bgSofter border-gray-300 dark:border-odp-borderStrong text-gray-800 dark:text-odp-fgStrong"
                  value={s.description || ''}
                  onChange={(e) => handleChangeField(s.id, 'description', e.target.value)}
                  placeholder="예: TODO 체크리스트 스니펫"
                />
              </div>
              <button
                type="button"
                className="mt-4 sm:mt-6 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/40 rounded hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap"
                onClick={() => {
                  if (window.confirm('이 스니펫을 삭제할까요?')) {
                    handleRemove(s.id);
                  }
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition"
        >
          스니펫 추가
        </button>
        <button
          type="button"
          onClick={handleSaveClick}
          disabled={isSaving}
          className="px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isSaving ? '저장 중...' : '스니펫 JSON 저장'}
        </button>
      </div>

      {recordForSnippetId != null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="snippet-shortcut-modal-title"
          onClick={closeRecordModal}
        >
          <div
            className="bg-white dark:bg-odp-surface rounded-lg shadow-xl border border-gray-200 dark:border-odp-borderStrong p-5 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h4 id="snippet-shortcut-modal-title" className="text-sm font-bold text-gray-800 dark:text-odp-fgStrong mb-2">
              단축키 입력
            </h4>
            <p className="text-xs text-gray-600 dark:text-odp-muted mb-3">
              사용할 조합을 키보드로 눌러주세요. (Ctrl/Cmd + 다른 키 등)
            </p>
            <div className="mb-4 py-3 px-3 rounded bg-gray-100 dark:bg-odp-bgSoft border border-gray-200 dark:border-odp-borderSoft min-h-10 flex items-center justify-center">
              {capturedCombo ? (
                <span className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                  {formatKeyComboDisplay(capturedCombo)}
                </span>
              ) : (
                <span className="text-xs text-gray-500 dark:text-odp-muted">키를 눌러주세요</span>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeRecordModal}
                className="px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-odp-borderStrong text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-focusBg transition"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmCapturedShortcut}
                disabled={!capturedCombo}
                className="px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

