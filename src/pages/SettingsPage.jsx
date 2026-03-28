import { useEffect, useState } from 'react';
import { IconDownload, IconSettings, IconUpload } from '@/components/icons';
import SnippetSettings from '@/components/settings/SnippetSettings';
import { X } from 'lucide-react';
import { isWebAuthnAvailableForSave } from '@/utils/webauthn';
import {
  loadWikiImageCacheMode,
  saveWikiImageCacheMode,
  WIKI_IMAGE_CACHE_MODE_BLOB,
  WIKI_IMAGE_CACHE_MODE_URL,
} from '@/utils/wikiImageSettings';
import { setWikiImageCacheMode } from '@/utils/wikiImageRuntime';
import {
  EDITOR_TYPE_MD_EDITOR_RT,
  EDITOR_TYPE_NOVEL,
  loadEditorType,
  saveEditorType,
} from '@/utils/editorTypeSettings';

export default function SettingsPage({
  s3Creds,
  masterPassword,
  onSaveS3Creds,
  onExportCreds,
  onImportClick,
  showHiddenFolders,
  onToggleHiddenFolders,
  onRequestClose,
  webauthnSupported = false,
  webauthnEnabled = false,
  webauthnStorageOnly = false,
  onEnableWebAuthn,
  onDisableWebAuthn,
  snippetConfig,
  onChangeSnippetConfig,
  onSaveSnippetConfig,
  isSavingSnippets = false,
  snippetConfigLoaded = false,
  editorType: editorTypeProp,
  onEditorTypeChange,
}) {
  const [formCreds, setFormCreds] = useState(s3Creds);
  const [webauthnLoading, setWebauthnLoading] = useState(false);
  const [webauthnAvailable, setWebauthnAvailable] = useState(webauthnSupported);
  const [wikiImageCacheMode, setWikiImageCacheMode] = useState(() => loadWikiImageCacheMode());
  const [editorType, setEditorType] = useState(() => editorTypeProp ?? loadEditorType());

  useEffect(() => {
    setFormCreds(s3Creds);
  }, [s3Creds]);

  useEffect(() => {
    if (editorTypeProp !== undefined) setEditorType(editorTypeProp);
  }, [editorTypeProp]);

  useEffect(() => {
    let cancelled = false;
    isWebAuthnAvailableForSave().then((supported) => {
      if (!cancelled) setWebauthnAvailable(supported);
    });
    return () => { cancelled = true; };
  }, []);

  const showWebAuthnSection = webauthnAvailable && (masterPassword || webauthnStorageOnly);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-odp-bgSofter min-w-0 max-h-full">
      <div className="px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center bg-gray-50 dark:bg-odp-surface shrink-0">
        <h2 className="font-bold text-gray-700 dark:text-odp-fgStrong flex items-center gap-2">
          <IconSettings /> 설정 및 암호화
        </h2>
        <button
          type="button"
          onClick={() => onRequestClose?.(formCreds)}
          className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-6 flex-1">
        {/* S3 Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveS3Creds(formCreds);
          }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-sm font-bold text-gray-700 border-b pb-2 mb-3">S3 연결 정보</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Access Key ID
                </label>
                <input
                  type="text"
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formCreds.accessKeyId}
                  onChange={(e) => setFormCreds((p) => ({ ...p, accessKeyId: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Secret Access Key
                </label>
                <input
                  type="password"
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formCreds.secretAccessKey}
                  onChange={(e) => setFormCreds((p) => ({ ...p, secretAccessKey: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Region</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formCreds.region}
                  onChange={(e) => setFormCreds((p) => ({ ...p, region: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Bucket Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formCreds.bucket}
                  onChange={(e) => setFormCreds((p) => ({ ...p, bucket: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Endpoint URL (선택)
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formCreds.endpoint || ''}
                  onChange={(e) => setFormCreds((p) => ({ ...p, endpoint: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onRequestClose?.(formCreds)}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              저장
            </button>
          </div>
        </form>

        {/* Import / Export Section */}
        <div className="bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong">
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">데이터 백업/복원</h3>
          <div className="flex gap-2">
            <button
              onClick={onExportCreds}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition"
            >
              <IconDownload /> S3 연결정보 내보내기
            </button>
            <button
              onClick={onImportClick}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded transition"
            >
              <IconUpload /> S3 연결정보 불러오기
            </button>
          </div>
        </div>

        {/* WebAuthn: 지문/보안 키로 잠금 해제 또는 연결 정보 저장 */}
        {showWebAuthnSection && (
          <div className="bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong">
            <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">지문 / 보안 키</h3>
            <p className="text-xs text-gray-600 dark:text-odp-muted mb-2">
              {webauthnStorageOnly
                ? 'S3 연결 정보가 보안 키로만 암호화되어 있습니다. 데이터 백업/복원 시에는 비밀번호를 사용합니다.'
                : '지문, Windows Hello, Touch ID 등으로 앱 잠금 해제를 사용할 수 있습니다. 데이터 백업/복원 시에는 비밀번호를 사용합니다.'}
            </p>
            {webauthnStorageOnly ? (
              <p className="text-xs text-gray-600 dark:text-odp-muted">저장소: 보안 키로 보호됨</p>
            ) : webauthnEnabled ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-700 dark:text-odp-fg">지문/보안 키로 잠금 해제 사용 중</span>
                <button
                  type="button"
                  onClick={() => onDisableWebAuthn?.()}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  사용 해제
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  disabled={webauthnLoading}
                  onClick={async () => {
                    if (webauthnLoading || !onEnableWebAuthn) return;
                    let promise;
                    try {
                      promise = onEnableWebAuthn(masterPassword);
                    } catch (err) {
                      alert(err?.message || '보안 키 등록에 실패했습니다.');
                      return;
                    }
                    setWebauthnLoading(true);
                    try {
                      await promise;
                    } catch (err) {
                      alert(err?.message || '보안 키 등록에 실패했습니다.');
                    } finally {
                      setWebauthnLoading(false);
                    }
                  }}
                  className="text-left text-xs py-2 px-3 rounded border border-gray-300 dark:border-odp-borderStrong hover:bg-gray-100 dark:hover:bg-odp-surface transition"
                  aria-label="지문/보안 키로 잠금 해제 등록"
                >
                  {webauthnLoading ? '등록 중…' : '지문/보안 키로 잠금 해제 사용 (등록)'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Markdown 에디터 종류 */}
        <div className="bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong">
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">마크다운 에디터</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-2">
            .md 파일을 편집할 때 사용할 에디터를 고릅니다.
          </p>
          <div className="space-y-2 text-xs text-gray-700 dark:text-odp-fg">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="editorType"
                value={EDITOR_TYPE_MD_EDITOR_RT}
                checked={editorType === EDITOR_TYPE_MD_EDITOR_RT}
                onChange={() => {
                  setEditorType(EDITOR_TYPE_MD_EDITOR_RT);
                  saveEditorType(EDITOR_TYPE_MD_EDITOR_RT);
                  onEditorTypeChange?.(EDITOR_TYPE_MD_EDITOR_RT);
                }}
                className="mt-0.5 shrink-0"
              />
              <span>
                <span className="font-semibold">md-editor-rt</span>
                <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                  기본 에디터. 미리보기, 위키 이미지 <code className="px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft">![[path]]</code>, 스니펫 단축키 등이 이 구성에 맞춰져 있습니다.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="editorType"
                value={EDITOR_TYPE_NOVEL}
                checked={editorType === EDITOR_TYPE_NOVEL}
                onChange={() => {
                  setEditorType(EDITOR_TYPE_NOVEL);
                  saveEditorType(EDITOR_TYPE_NOVEL);
                  onEditorTypeChange?.(EDITOR_TYPE_NOVEL);
                }}
                className="mt-0.5 shrink-0"
              />
              <span>
                <span className="font-semibold">novel</span>
                <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                  Notion 스타일 리치 텍스트 편집기입니다. HTML을 거쳐 마크다운으로 변환하므로 문법·공백이 바뀔 수 있고, 위키 이미지 미리보기·스니펫·일부 단축키는 기대와 다르게 동작할 수 있습니다.
                </span>
              </span>
            </label>
          </div>
          {editorType === EDITOR_TYPE_NOVEL && (
            <p className="mt-3 text-[11px] text-amber-800 dark:text-amber-200/90 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded px-2 py-1.5">
              novel 선택 시:{' '}
              <span className="font-semibold">
                일부 동작이 의도와 다르게 보이거나 저장 결과가 달라질 수 있습니다.
              </span>{' '}
              중요한 노트는 md-editor-rt 사용을 권장합니다.
            </p>
          )}
        </div>

        {/* Hidden Folders Option */}
        <div className="bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong">
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">표시 옵션</h3>
          <label
            className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group"
          >
            <button
              type="button"
              onClick={onToggleHiddenFolders}
              className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${
                showHiddenFolders
                  ? 'bg-blue-500 border-blue-500 shadow-sm'
                  : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
              } group-hover:brightness-105 group-hover:border-blue-400`}
              aria-pressed={showHiddenFolders}
              aria-label="숨김 폴더 보기 토글"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  showHiddenFolders ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
              숨김 폴더 보기 (이름이 `.` 으로 시작하는 폴더)
            </span>
          </label>
        </div>

        {/* Wiki 이미지 캐싱 방식 */}
        <div className="bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong">
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">위키 이미지 캐싱 방식</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-2">
            md 문서의 <code className="px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">![[path]]</code>{' '}
            이미지에 대해 어떤 방식으로 캐싱할지 선택합니다.
          </p>
          <div className="space-y-1 text-xs text-gray-700 dark:text-odp-fg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wikiImageCacheMode"
                value={WIKI_IMAGE_CACHE_MODE_BLOB}
                checked={wikiImageCacheMode === WIKI_IMAGE_CACHE_MODE_BLOB}
                onChange={() => {
                  setWikiImageCacheMode(WIKI_IMAGE_CACHE_MODE_BLOB);
                  saveWikiImageCacheMode(WIKI_IMAGE_CACHE_MODE_BLOB);
                }}
              />
              <span className="font-semibold">Blob 캐시 (권장)</span>
              <span className="text-[11px] text-gray-500 dark:text-odp-muted">
                S3에서 이미지를 Blob으로 받아 IndexedDB에 저장합니다. 만료 후에도 로컬에서 바로 불러올 수 있어 트래픽이 줄어듭니다.
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wikiImageCacheMode"
                value={WIKI_IMAGE_CACHE_MODE_URL}
                checked={wikiImageCacheMode === WIKI_IMAGE_CACHE_MODE_URL}
                onChange={() => {
                  setWikiImageCacheMode(WIKI_IMAGE_CACHE_MODE_URL);
                  saveWikiImageCacheMode(WIKI_IMAGE_CACHE_MODE_URL);
                }}
              />
              <span className="font-semibold">Presigned URL 캐시</span>
              <span className="text-[11px] text-gray-500 dark:text-odp-muted">
                Presigned URL과 만료 시각만 저장합니다. Blob은 캐싱하지 않지만, URL이 유효한 동안에는 재요청 없이 빠르게 표시됩니다.
              </span>
            </label>
          </div>
        </div>

        {/* Snippet Settings */}
        <SnippetSettings
          value={snippetConfig}
          onChange={onChangeSnippetConfig}
          onSave={onSaveSnippetConfig}
          isSaving={isSavingSnippets}
          isLoaded={snippetConfigLoaded}
        />
      </div>
    </div>
  );
}

