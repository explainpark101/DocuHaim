import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { IconDownload, IconMenu, IconRefresh, IconSettings, IconSquare, IconUpload } from '@/components/icons';
import SnippetSettings from '@/components/settings/SnippetSettings';
import WebfontSettings from '@/components/settings/WebfontSettings';
import TableStyleSettings from '@/components/settings/TableStyleSettings';
import CoverSettings from '@/components/settings/CoverSettings';
import OgWorkerSettings from '@/components/settings/OgWorkerSettings';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { isWebAuthnAvailableForSave } from '@/utils/webauthn';
import {
  loadWikiImageCacheMode,
  saveWikiImageCacheMode,
  WIKI_IMAGE_CACHE_MODE_BLOB,
  WIKI_IMAGE_CACHE_MODE_URL,
} from '@/utils/wikiImageSettings';
import {
  EDITOR_TYPE_MD_EDITOR_RT,
  EDITOR_TYPE_NOVEL,
  loadEditorType,
  saveEditorType,
} from '@/utils/editorTypeSettings';
import {
  loadAltVimNavigationEnabled,
} from '@/utils/altVimNavigationSettings';
import {
  getComposerHelperTextVisible,
} from '@/utils/chatWithMyself';
import {
  setSettingsToggle,
  subscribeSettingsToggles,
} from '@/utils/advancedSearch/settingsToggles';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import {
  DEFAULT_TREE_HOVER_EXPAND,
  convertTreeHoverExpandValue,
  treeHoverExpandSettingsToMs,
} from '@/utils/treeHoverExpandSettings';
import GeminiModelSelect, { useGeminiModelState } from '@/components/GeminiModelSelect';
import StorageUsageAnalysis from '@/components/settings/StorageUsageAnalysis';
import { getLocalAppBuildId } from '@/utils/pwaUpdate';
import { RadioGroup } from 'radix-ui';
import {
  advancedSearchEngine,
  loadAdvancedSearchUiAnimationEnabled,
} from '@/utils/advancedSearch';
import AdvancedSearchBuildLog from '@/components/advancedSearch/AdvancedSearchBuildLog';
import RebuildCheckpointChoiceModal from '@/components/advancedSearch/RebuildCheckpointChoiceModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';

export default function SettingsPage({
  s3Creds,
  masterPassword,
  onSaveS3Creds,
  onExportCreds,
  onImportClick,
  showHiddenFolders,
  onToggleHiddenFolders,
  showTrashFolder = false,
  onToggleTrashFolder,
  hideRecordingCompanions = false,
  onToggleHideRecordingCompanions,
  treeStickyFolderPathEnabled = true,
  onToggleTreeStickyFolderPath,
  treeHoverExpandSettings = DEFAULT_TREE_HOVER_EXPAND,
  onTreeHoverExpandSettingsChange,
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
  storageMode = STORAGE_MODE_S3,
  onStorageModeChange,
  webdavConfig,
  onSaveWebdavConfig,
  isMobileLayout = false,
  sidebarOpen = true,
  sidebarCollapsed = false,
  onOpenSidebar,
  getGeminiApiKey,
  onCheckAppUpdate,
  isCheckingAppUpdate = false,
  latestAppBuildId = '',
  onScanStorageUsage,
  canScanStorageUsage = false,
  onOpenStorageUsageFile,
}) {
  const [formCreds, setFormCreds] = useState(s3Creds);
  const [googleAiKeyInput, setGoogleAiKeyInput] = useState('');
  const [webdavForm, setWebdavForm] = useState(webdavConfig ?? {
    endpoint: '',
    username: '',
    password: '',
    basePath: '',
  });
  const [webauthnLoading, setWebauthnLoading] = useState(false);
  const [webauthnAvailable, setWebauthnAvailable] = useState(webauthnSupported);
  const [wikiImageCacheMode, setWikiImageCacheMode] = useState(() => loadWikiImageCacheMode());
  const [editorType, setEditorType] = useState(() => editorTypeProp ?? loadEditorType());
  const [altVimNavigationEnabled, setAltVimNavigationEnabled] = useState(() =>
    loadAltVimNavigationEnabled(),
  );
  const [composerHelperTextVisible, setComposerHelperTextVisible] = useState(() =>
    getComposerHelperTextVisible(),
  );
  const [advancedSearchStatus, setAdvancedSearchStatus] = useState(() =>
    advancedSearchEngine.getStatus(),
  );
  const [advancedSearchUiAnimation, setAdvancedSearchUiAnimation] = useState(() =>
    loadAdvancedSearchUiAnimationEnabled(),
  );
  const [advancedSearchBusy, setAdvancedSearchBusy] = useState(false);
  const [checkpointChoiceOpen, setCheckpointChoiceOpen] = useState(false);
  const [checkpointInfo, setCheckpointInfo] = useState(
    /** @type {import('@/utils/advancedSearch/engine').RebuildCheckpointInfo | null} */ (null),
  );
  const [rebuildConfirmOpen, setRebuildConfirmOpen] = useState(false);
  const [geminiModel, setGeminiModel, syncGeminiModel] = useGeminiModelState();
  const [s3ConnOpen, setS3ConnOpen] = useState(true);
  const [webdavConnOpen, setWebdavConnOpen] = useState(false);
  const [geminiConnOpen, setGeminiConnOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    syncGeminiModel();
  }, [syncGeminiModel]);

  useEffect(() => {
    return subscribeSettingsToggles((id, enabled) => {
      if (id === 'settings-alt-vim') setAltVimNavigationEnabled(enabled);
      else if (id === 'settings-composer-helper') setComposerHelperTextVisible(enabled);
      else if (id === 'settings-as-animation') setAdvancedSearchUiAnimation(enabled);
      else if (id === 'settings-as-index' || id === 'settings-as-include-other') {
        setAdvancedSearchStatus(advancedSearchEngine.getStatus());
      }
    });
  }, []);

  useEffect(() => {
    const hash = String(location.hash || '').replace(/^#/, '');
    if (!hash.startsWith('settings-')) return undefined;
    if (hash === 'settings-s3') setS3ConnOpen(true);
    if (hash === 'settings-webdav') setWebdavConnOpen(true);
    if (hash === 'settings-gemini') setGeminiConnOpen(true);
    const timer = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        el.focus?.({ preventScroll: true });
      } catch {
        // ignore
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    return advancedSearchEngine.subscribe(() => {
      setAdvancedSearchStatus(advancedSearchEngine.getStatus());
    });
  }, []);

  useEffect(() => {
    setFormCreds(s3Creds);
    setGoogleAiKeyInput('');
  }, [s3Creds]);

  const hasStoredGoogleAiKey = Boolean((s3Creds?.googleAiStudioApiKey || '').trim());

  const buildCredsForSave = () => {
    const trimmedKey = googleAiKeyInput.trim();
    const nextKey = trimmedKey || (hasStoredGoogleAiKey ? s3Creds.googleAiStudioApiKey : '');
    return { ...formCreds, googleAiStudioApiKey: nextKey };
  };
  useEffect(() => {
    setWebdavForm(webdavConfig ?? {
      endpoint: '',
      username: '',
      password: '',
      basePath: '',
    });
  }, [webdavConfig]);

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

  const desktopCollapsedTopBarPaddingClass =
    !isMobileLayout && sidebarCollapsed ? 'md:pl-14' : '';

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-odp-bgSofter min-w-0 max-h-full">
      <div className={`px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-odp-surface flex justify-between items-center gap-3 bg-gray-50 dark:bg-odp-surface shrink-0 transition-[padding] duration-300 ease-in-out ${desktopCollapsedTopBarPaddingClass}`}>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {isMobileLayout && !sidebarOpen && typeof onOpenSidebar === 'function' && (
            <button
              type="button"
              aria-label="사이드바 열기"
              onClick={onOpenSidebar}
              className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            >
              <IconMenu size={22} />
            </button>
          )}
          <h2 className="font-bold text-gray-700 dark:text-odp-fgStrong flex min-w-0 items-center gap-2">
            <IconSettings /> 설정 및 암호화
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onRequestClose?.(buildCredsForSave())}
          className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded transition"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-6 flex-1">
        <div
          id="settings-storage"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">기본 저장소 선택 (3중 택1)</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-3">
            앱에서 기본으로 동작할 저장소를 선택합니다. 선택은 저장되어 다음 접속 시 자동 복원됩니다.
          </p>
          <div className="space-y-2 text-xs text-gray-700 dark:text-odp-fg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="storageMode"
                value={STORAGE_MODE_S3}
                checked={storageMode === STORAGE_MODE_S3}
                onChange={() => onStorageModeChange?.(STORAGE_MODE_S3)}
              />
              <span className="font-semibold">S3 Haim</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="storageMode"
                value={STORAGE_MODE_LOCAL}
                checked={storageMode === STORAGE_MODE_LOCAL}
                onChange={() => onStorageModeChange?.(STORAGE_MODE_LOCAL)}
              />
              <span className="font-semibold">Local Haim</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="storageMode"
                value={STORAGE_MODE_WEBDAV}
                checked={storageMode === STORAGE_MODE_WEBDAV}
                onChange={() => onStorageModeChange?.(STORAGE_MODE_WEBDAV)}
              />
              <span className="font-semibold">WebDAV Haim</span>
            </label>
          </div>
        </div>

        {canScanStorageUsage && (
          <div id="settings-storage-usage" tabIndex={-1} className="scroll-mt-4">
            <StorageUsageAnalysis
              storageMode={storageMode}
              onScanTree={onScanStorageUsage}
              canScan={canScanStorageUsage}
              onOpenFile={onOpenStorageUsageFile}
            />
          </div>
        )}

        {/* S3 Form */}
        <form
          id="settings-s3"
          tabIndex={-1}
          onSubmit={(e) => {
            e.preventDefault();
            onSaveS3Creds(buildCredsForSave());
          }}
          className="scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
        >
          <button
            type="button"
            onClick={() => setS3ConnOpen((v) => !v)}
            className="flex w-full items-center gap-2 text-left"
            aria-expanded={s3ConnOpen}
          >
            {s3ConnOpen ? (
              <ChevronDown size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
            ) : (
              <ChevronRight size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
            )}
            <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
              S3 연결 정보
            </h3>
          </button>
          {s3ConnOpen ? (
            <>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Access Key ID
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={formCreds.accessKeyId}
                    onChange={(e) => setFormCreds((p) => ({ ...p, accessKeyId: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Secret Access Key
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={formCreds.secretAccessKey}
                    onChange={(e) =>
                      setFormCreds((p) => ({ ...p, secretAccessKey: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Region
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={formCreds.region}
                    onChange={(e) => setFormCreds((p) => ({ ...p, region: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Bucket Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={formCreds.bucket}
                    onChange={(e) => setFormCreds((p) => ({ ...p, bucket: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Endpoint URL (선택)
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={formCreds.endpoint || ''}
                    onChange={(e) => setFormCreds((p) => ({ ...p, endpoint: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onRequestClose?.(buildCredsForSave())}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition dark:text-odp-muted dark:hover:bg-odp-focusBg"
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
            </>
          ) : null}
        </form>

        {/* Import / Export Section */}
        <div
          id="settings-backup"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
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

        <form
          id="settings-webdav"
          tabIndex={-1}
          onSubmit={(e) => {
            e.preventDefault();
            onSaveWebdavConfig?.(webdavForm);
          }}
          className="scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
        >
          <button
            type="button"
            onClick={() => setWebdavConnOpen((v) => !v)}
            className="flex w-full items-center gap-2 text-left"
            aria-expanded={webdavConnOpen}
          >
            {webdavConnOpen ? (
              <ChevronDown size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
            ) : (
              <ChevronRight size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
            )}
            <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
              WebDAV 연결 정보
            </h3>
            {!webdavConnOpen ? (
              <span className="ml-auto text-[11px] font-normal text-gray-400 dark:text-odp-muted">
                접힘
              </span>
            ) : null}
          </button>
          {webdavConnOpen ? (
            <>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Endpoint URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://webdav.example.com"
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={webdavForm.endpoint}
                    onChange={(e) => setWebdavForm((p) => ({ ...p, endpoint: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={webdavForm.username}
                    onChange={(e) => setWebdavForm((p) => ({ ...p, username: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={webdavForm.password}
                    onChange={(e) => setWebdavForm((p) => ({ ...p, password: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                    Base Path (선택)
                  </label>
                  <input
                    type="text"
                    placeholder="/remote.php/dav/files/username/"
                    className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    value={webdavForm.basePath}
                    onChange={(e) => setWebdavForm((p) => ({ ...p, basePath: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition dark:border-odp-borderStrong dark:hover:bg-odp-focusBg"
                  onClick={async () => {
                    try {
                      const { createWebdavBackend } = await import(
                        '@/utils/storage/webdavBackend.js'
                      );
                      const backend = createWebdavBackend(webdavForm);
                      if (!backend.isReady()) {
                        alert('Endpoint와 Username을 입력하세요.');
                        return;
                      }
                      await backend.testConnection();
                      alert('WebDAV 연결에 성공했습니다.');
                    } catch (e) {
                      alert(
                        'WebDAV 연결 실패: ' +
                          (e?.message || e) +
                          '\n\n브라우저에서 사용하려면 서버 CORS가 허용되어야 합니다.',
                      );
                    }
                  }}
                >
                  연결 테스트
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  WebDAV 저장
                </button>
              </div>
            </>
          ) : null}
        </form>

        <form
          id="settings-gemini"
          tabIndex={-1}
          onSubmit={(e) => {
            e.preventDefault();
            const trimmedKey = googleAiKeyInput.trim();
            if (!trimmedKey && !hasStoredGoogleAiKey) {
              alert('API 키를 입력하세요.');
              return;
            }
            onSaveS3Creds(buildCredsForSave());
          }}
          className="scroll-mt-4 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
        >
          <button
            type="button"
            onClick={() => setGeminiConnOpen((v) => !v)}
            className="flex w-full items-center gap-2 text-left"
            aria-expanded={geminiConnOpen}
          >
            {geminiConnOpen ? (
              <ChevronDown size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
            ) : (
              <ChevronRight size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
            )}
            <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
              Google AI Studio (Gemini)
            </h3>
          </button>
          {geminiConnOpen ? (
            <>
              <p className="text-xs text-gray-600 dark:text-odp-muted">
                Gemini API 키는 연결 정보와 함께 암호화되어 저장됩니다. 저장된 키는 이 화면에서 다시
                표시되지 않습니다.
              </p>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  className="w-full border rounded px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  value={googleAiKeyInput}
                  onChange={(e) => setGoogleAiKeyInput(e.target.value)}
                  placeholder={
                    hasStoredGoogleAiKey ? '저장됨 — 변경 시 새 키 입력' : 'AI Studio API 키 입력'
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted mb-1">
                  기본 모델
                </label>
                <GeminiModelSelect
                  getGeminiApiKey={getGeminiApiKey}
                  value={geminiModel}
                  onChange={setGeminiModel}
                  autoLoad={hasStoredGoogleAiKey || Boolean(googleAiKeyInput.trim())}
                />
                <p className="mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted">
                  마지막으로 사용한 모델이 저장되며, 다음에 AI 도우미를 열 때 자동으로 선택됩니다.
                </p>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  API 키 저장
                </button>
              </div>
            </>
          ) : null}
        </form>

        {/* WebAuthn: 지문/보안 키로 잠금 해제 또는 연결 정보 저장 */}
        {showWebAuthnSection && (
          <div
          id="settings-webauthn"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
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
        <div
          id="settings-editor"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
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
                  기본 에디터. 미리보기, 위키 이미지 <code className="px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft">![[path]]</code> / <code className="px-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft">![[path|w=50%]]</code>, 스니펫 단축키 등이 이 구성에 맞춰져 있습니다.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-not-allowed opacity-60">
              <input
                type="radio"
                name="editorType"
                value={EDITOR_TYPE_NOVEL}
                checked={false}
                disabled
                className="mt-0.5 shrink-0"
              />
              <span>
                <span className="font-semibold">novel</span>
                <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                  준비중입니다.
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Navigation */}
        <div
          id="settings-navigation"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">네비게이션</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-4">
            키보드로 에디터 안의 커서 위치를 조절하거나, 열린 파일 사이를 이동하는 옵션입니다.
            앞으로 여러 파일을 탭으로 동시에 열어 두고 빠르게 전환할 수 있는 기능이 추가될 예정이며,
            아래 설정은 그 흐름에 맞춰 정리됩니다.
          </p>
          <div className="space-y-4">
            <label className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group">
              <button
                type="button"
                onClick={() => {
                  setSettingsToggle('settings-alt-vim', !altVimNavigationEnabled);
                }}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${
                  altVimNavigationEnabled
                    ? 'bg-blue-500 border-blue-500 shadow-sm'
                    : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
                } group-hover:brightness-105 group-hover:border-blue-400`}
                aria-pressed={altVimNavigationEnabled}
                aria-label="Alt+Vim 커서 이동"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    altVimNavigationEnabled ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
                Alt + H/J/K/L Vim 커서 이동
                <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                  md-editor-rt 편집 중 H·L은 한 글자씩, J·K는 위·아래 줄로 커서만 이동합니다.
                  줄 단위 선택·이동(Alt+화살표)과는 다릅니다.
                </span>
              </span>
            </label>
            <label className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-not-allowed opacity-60">
              <button
                type="button"
                disabled
                className="relative inline-flex h-5 w-9 shrink-0 cursor-not-allowed items-center rounded-full border border-gray-300 bg-gray-300 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                aria-pressed={false}
                aria-disabled="true"
                aria-label="탭 기능 (준비 중)"
              >
                <span className="inline-block h-4 w-4 translate-x-0.5 transform rounded-full bg-white shadow" />
              </button>
              <span className="select-none">
                탭 기능 (개발중)
                <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                  여러 파일을 탭으로 동시에 열어 둘 수 있습니다.{' '}
                  <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">Ctrl+Tab</kbd>
                  {' / '}
                  <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">Ctrl+Shift+Tab</kbd>
                  으로 다음·이전 탭으로 이동하고,{' '}
                  <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">Ctrl+W</kbd>
                  (Mac:{' '}
                  <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">Cmd+W</kbd>
                  )로 현재 탭을 닫을 수 있습니다.
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Display Options */}
        <div
          id="settings-display"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">표시 옵션</h3>
          <label
            className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group"
          >
            <button
              type="button"
              onClick={onToggleTrashFolder}
              className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${
                showTrashFolder
                  ? 'bg-blue-500 border-blue-500 shadow-sm'
                  : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
              } group-hover:brightness-105 group-hover:border-blue-400`}
              aria-pressed={showTrashFolder}
              aria-label="쓰레기통 보기 토글"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  showTrashFolder ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
              쓰레기통 보기 (`.trash` 폴더)
            </span>
          </label>
          <label
            className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4"
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
              숨김 폴더 보기 (이름이 `.` 으로 시작하는 폴더, `.trash` 제외)
            </span>
          </label>
          {typeof onToggleHideRecordingCompanions === 'function' && (
            <label
              className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4"
            >
              <button
                type="button"
                onClick={onToggleHideRecordingCompanions}
                className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${
                  hideRecordingCompanions
                    ? 'bg-blue-500 border-blue-500 shadow-sm'
                    : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
                } group-hover:brightness-105 group-hover:border-blue-400`}
                aria-pressed={hideRecordingCompanions}
                aria-label="녹음·필기 동반 파일 숨기기"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    hideRecordingCompanions ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
                녹음·필기 동기화 파일 숨기기 (사이드바 목록·녹음 UI·동기화 보기에서 제외)
              </span>
            </label>
          )}
          {typeof onToggleTreeStickyFolderPath === 'function' && (
            <label
              className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group mt-4"
            >
              <button
                type="button"
                onClick={onToggleTreeStickyFolderPath}
                className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${
                  treeStickyFolderPathEnabled
                    ? 'bg-blue-500 border-blue-500 shadow-sm'
                    : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
                } group-hover:brightness-105 group-hover:border-blue-400`}
                aria-pressed={treeStickyFolderPathEnabled}
                aria-label="트리 폴더 경로 sticky 표시"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    treeStickyFolderPathEnabled ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
                트리에서 열린 폴더 경로 sticky 표시 (스크롤 시 현재 경로 고정)
              </span>
            </label>
          )}
          {typeof onTreeHoverExpandSettingsChange === 'function' && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-odp-borderSoft">
              <p className="text-xs font-semibold text-gray-700 dark:text-odp-fg mb-1">
                사이드바 파일 이동 드래그 시 폴더 자동 펼침 대기 시간
              </p>
              <p className="text-[11px] text-gray-500 dark:text-odp-muted mb-3">
                파일을 드래그한 채로 접힌 폴더 위에 올려두면, 설정한 시간 후 해당 폴더가 펼쳐집니다.
                기본 단위는 초(s)입니다.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-odp-fg">
                  <span className="sr-only">대기 시간</span>
                  <input
                    type="number"
                    min={0}
                    step={treeHoverExpandSettings.unit === 'ms' ? 1 : 0.1}
                    value={treeHoverExpandSettings.value}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      onTreeHoverExpandSettingsChange({
                        ...treeHoverExpandSettings,
                        value: Number.isFinite(next) && next >= 0 ? next : 0,
                      });
                    }}
                    className="w-24 border border-gray-300 dark:border-odp-borderSoft rounded px-2 py-1.5 text-sm bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg"
                    aria-label="폴더 자동 펼침 대기 시간"
                  />
                </label>
                <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg">
                  <RadioGroup.Root
                    className="flex items-center gap-3"
                    value={treeHoverExpandSettings.unit}
                    onValueChange={(nextUnit) => {
                      if (nextUnit !== 's' && nextUnit !== 'ms') return;
                      if (treeHoverExpandSettings.unit === nextUnit) return;
                      onTreeHoverExpandSettingsChange({
                        unit: nextUnit,
                        value: convertTreeHoverExpandValue(
                          treeHoverExpandSettings.value,
                          treeHoverExpandSettings.unit,
                          nextUnit,
                        ),
                      });
                    }}
                    aria-label="대기 시간 단위"
                  >
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <RadioGroup.Item
                        value="s"
                        className="size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                      >
                        <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" />
                      </RadioGroup.Item>
                      <span>초 (s)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <RadioGroup.Item
                        value="ms"
                        className="size-3.5 rounded-full border border-gray-400 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                      >
                        <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" />
                      </RadioGroup.Item>
                      <span>밀리초 (ms)</span>
                    </label>
                  </RadioGroup.Root>
                </div>
                <span className="text-[11px] text-gray-500 dark:text-odp-muted">
                  = {treeHoverExpandSettingsToMs(treeHoverExpandSettings)} ms
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Chat with myself */}
        <div
          id="settings-chat"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">나와의 채팅</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-4">
            채팅 입력창 아래 단축키 안내 문구 표시 여부를 설정합니다.
          </p>
          <label className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group">
            <button
              type="button"
              onClick={() => {
                setSettingsToggle('settings-composer-helper', !composerHelperTextVisible);
              }}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-200 ${
                composerHelperTextVisible
                  ? 'bg-blue-500 border-blue-500 shadow-sm'
                  : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
              } group-hover:brightness-105 group-hover:border-blue-400`}
              aria-pressed={composerHelperTextVisible}
              aria-label="입력창 단축키 안내 표시"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  composerHelperTextVisible ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
              입력창 단축키 안내 표시
              <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                끄면 입력창 아래 helper text가 숨겨집니다. 채팅에서 X로 닫은 뒤에도 여기서 다시 켤 수 있습니다.
              </span>
            </span>
          </label>
        </div>

        <OgWorkerSettings />

        {/* Advanced Search */}
        <div
          id="settings-advanced-search"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">
            Advanced Search
          </h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-3">
            <kbd className="px-1 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">⌘K</kbd>
            {' / '}
            <kbd className="px-1 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">Ctrl+K</kbd>
            로 Spotlight 검색을 엽니다. 역색인이 켜져 있으면 문서·채팅 저장 시 해당 항목만 증분
            색인합니다. 전체 볼트 색인은 아래 버튼으로 백그라운드에서 만듭니다.
          </p>
          <label className="flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group">
            <button
              type="button"
              onClick={() => {
                setSettingsToggle('settings-as-animation', !advancedSearchUiAnimation);
              }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${
                advancedSearchUiAnimation
                  ? 'bg-blue-500 border-blue-500 shadow-sm'
                  : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
              } group-hover:brightness-105 group-hover:border-blue-400`}
              aria-pressed={advancedSearchUiAnimation}
              aria-label="열기/닫기 애니메이션"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  advancedSearchUiAnimation ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
              열기/닫기 애니메이션 (기본 켜짐)
              <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                Spotlight 패널이 부드럽게 나타나고 사라집니다. 끄면 즉시 전환됩니다.
              </span>
            </span>
          </label>
          <label className="mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group">
            <button
              type="button"
              onClick={() => {
                setSettingsToggle(
                  'settings-as-index',
                  !advancedSearchStatus.enabled,
                );
              }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 ${
                advancedSearchStatus.enabled
                  ? 'bg-blue-500 border-blue-500 shadow-sm'
                  : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
              } group-hover:brightness-105 group-hover:border-blue-400`}
              aria-pressed={advancedSearchStatus.enabled}
              aria-label="역색인 사용"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  advancedSearchStatus.enabled ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
              역색인 사용 (기본 켜짐)
              <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                끄면 파일명·경로만 검색합니다. 켜져 있으면 저장 시 항상 증분 색인합니다.
                폴더 경로(예: notes/회의)로도 찾을 수 있습니다.
              </span>
            </span>
          </label>
          <label className="mt-3 flex items-center gap-3 text-xs text-gray-700 dark:text-odp-fg cursor-pointer group">
            <button
              type="button"
              onClick={() => {
                setSettingsToggle(
                  'settings-as-include-other',
                  !advancedSearchStatus.includeOtherFiles,
                );
              }}
              disabled={!advancedSearchStatus.enabled}
              className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-all duration-200 disabled:opacity-50 ${
                advancedSearchStatus.includeOtherFiles
                  ? 'bg-blue-500 border-blue-500 shadow-sm'
                  : 'bg-gray-300 border-gray-300 dark:bg-odp-bgSoft dark:border-odp-borderSoft'
              } group-hover:brightness-105 group-hover:border-blue-400`}
              aria-pressed={advancedSearchStatus.includeOtherFiles}
              aria-label="기타 파일 색인 포함"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  advancedSearchStatus.includeOtherFiles
                    ? 'translate-x-4'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className="select-none group-hover:text-gray-900 dark:group-hover:text-odp-fgStrong">
              기타 파일 색인 포함
              <span className="text-[11px] text-gray-500 dark:text-odp-muted block mt-0.5">
                기본은 Markdown만입니다. 켜면 txt · json · html · svg · csv 등도 본문 색인에
                넣습니다. 변경 후 「다시 색인」이 필요합니다.
              </span>
            </span>
          </label>
          <div
            className={`mt-3 rounded-md border px-3 py-2 text-xs ${
              advancedSearchStatus.building
                ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200'
                : advancedSearchStatus.hasIndex
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200'
                  : 'border-gray-200 bg-white text-gray-600 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-muted'
            }`}
          >
            {advancedSearchStatus.building ? (
              <>
                백그라운드 색인 중
                {typeof advancedSearchStatus.buildProgress === 'number'
                  ? ` · ${Math.round(advancedSearchStatus.buildProgress * 100)}%`
                  : '…'}
              </>
            ) : advancedSearchStatus.hasIndex ? (
              <>
                색인 있음 · 파일 {advancedSearchStatus.fileCount} · 채팅{' '}
                {advancedSearchStatus.chatCount}
                {advancedSearchStatus.builtAt &&
                advancedSearchStatus.builtAt !== new Date(0).toISOString()
                  ? ` · 갱신 ${new Date(advancedSearchStatus.builtAt).toLocaleString()}`
                  : ''}
              </>
            ) : (
              <>
                전체 색인 없음 — 저장한 문서·채팅은 증분 색인됩니다. 아래 「색인」으로 볼트
                전체를 백그라운드에서 만들 수 있습니다.
              </>
            )}
            {advancedSearchStatus.lastError
              ? ` · 오류: ${advancedSearchStatus.lastError}`
              : ''}
            {advancedSearchStatus.hasCheckpoint && !advancedSearchStatus.building
              ? ` · 중지된 체크포인트 ${advancedSearchStatus.checkpointProcessedCount}개`
              : ''}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={
                advancedSearchBusy ||
                !advancedSearchStatus.enabled ||
                advancedSearchStatus.building
              }
              onClick={() => {
                void (async () => {
                  const info = await advancedSearchEngine.getRebuildCheckpointInfo();
                  if (info) {
                    setCheckpointInfo(info);
                    setCheckpointChoiceOpen(true);
                    return;
                  }
                  if (advancedSearchStatus.hasIndex) {
                    setRebuildConfirmOpen(true);
                    return;
                  }
                  setAdvancedSearchBusy(true);
                  void advancedSearchEngine
                    .rebuild({ resume: false })
                    .finally(() => setAdvancedSearchBusy(false));
                })();
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60"
            >
              <IconRefresh size={14} />
              {advancedSearchStatus.hasCheckpoint
                ? '색인 재개/다시 시작'
                : advancedSearchStatus.hasIndex
                  ? '다시 색인'
                  : '색인'}
            </button>
            {advancedSearchStatus.building ? (
              <button
                type="button"
                onClick={() => advancedSearchEngine.cancelRebuild()}
                className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60"
                title="색인을 중지합니다. 체크포인트는 유지되어 이어서 재개할 수 있습니다."
              >
                <IconSquare size={14} />
                중지
              </button>
            ) : null}
            <button
              type="button"
              disabled={
                advancedSearchBusy ||
                advancedSearchStatus.building ||
                !advancedSearchStatus.hasIndex
              }
              onClick={() => {
                if (
                  !window.confirm(
                    '역색인 캐시(.advanced-search/)를 삭제할까요? 삭제 후에는 「색인」으로 다시 생성해야 합니다.',
                  )
                ) {
                  return;
                }
                setAdvancedSearchBusy(true);
                void advancedSearchEngine
                  .clearCache()
                  .finally(() => setAdvancedSearchBusy(false));
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-odp-bgSoft dark:text-red-300 dark:hover:bg-red-950/30"
            >
              역색인 캐시 삭제
            </button>
          </div>
          <RebuildCheckpointChoiceModal
            isOpen={checkpointChoiceOpen}
            info={checkpointInfo}
            onCancel={() => {
              setCheckpointChoiceOpen(false);
              setCheckpointInfo(null);
            }}
            onResume={() => {
              setCheckpointChoiceOpen(false);
              setCheckpointInfo(null);
              setAdvancedSearchBusy(true);
              void advancedSearchEngine
                .rebuild({ resume: true })
                .finally(() => setAdvancedSearchBusy(false));
            }}
            onStartFresh={() => {
              setCheckpointChoiceOpen(false);
              setCheckpointInfo(null);
              setAdvancedSearchBusy(true);
              void advancedSearchEngine
                .rebuild({ resume: false })
                .finally(() => setAdvancedSearchBusy(false));
            }}
          />
          <ConfirmModal
            isOpen={rebuildConfirmOpen}
            title="역색인 다시 생성"
            message="기존 역색인을 지우고 전체 볼트를 다시 색인할까요? 백그라운드에서 진행됩니다."
            confirmLabel="다시 생성"
            cancelLabel="취소"
            onConfirm={() => {
              setRebuildConfirmOpen(false);
              setAdvancedSearchBusy(true);
              void advancedSearchEngine
                .rebuild({ resume: false })
                .finally(() => setAdvancedSearchBusy(false));
            }}
            onCancel={() => setRebuildConfirmOpen(false)}
          />
          <AdvancedSearchBuildLog
            className="mt-3"
            logs={advancedSearchStatus.buildLogs || []}
            building={advancedSearchStatus.building}
            progress={advancedSearchStatus.buildProgress}
          />
        </div>

        {/* Wiki 이미지 캐싱 방식 */}
        <div
          id="settings-wiki-image"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">위키 이미지 캐싱 방식</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-2">
            md 문서의 <code className="px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">![[path]]</code>{' '}
            / <code className="px-1 mx-0.5 rounded bg-gray-100 dark:bg-odp-bgSoft text-[10px]">![[path|320x200]]</code> 이미지에 대해 어떤 방식으로 캐싱할지 선택합니다.
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

        <div id="settings-snippets" tabIndex={-1} className="scroll-mt-4">
          <SnippetSettings
            value={snippetConfig}
            onChange={onChangeSnippetConfig}
            onSave={onSaveSnippetConfig}
            isSaving={isSavingSnippets}
            isLoaded={snippetConfigLoaded}
          />
        </div>

        <WebfontSettings />

        <TableStyleSettings />

        <CoverSettings />

        {/* App update */}
        <div
          id="settings-app-update"
          tabIndex={-1}
          className="scroll-mt-4 bg-gray-50 dark:bg-odp-surface p-4 rounded-lg border border-gray-200 dark:border-odp-borderStrong"
        >
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong mb-2">앱 업데이트</h3>
          <p className="text-xs text-gray-600 dark:text-odp-muted mb-3">
            배포 빌드 해시와 서비스 워커(PWA) 캐시를 확인해 최신 버전이 있는지 확인하고, 바로 적용할 수 있습니다.
          </p>
          <dl className="mb-3 space-y-1 text-xs text-gray-600 dark:text-odp-muted">
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              <dt className="shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong">현재 버전</dt>
              <dd className="min-w-0 break-all font-mono">{getLocalAppBuildId() || '알 수 없음'}</dd>
            </div>
            {latestAppBuildId ? (
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <dt className="shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong">최신 버전</dt>
                <dd className="min-w-0 break-all font-mono">{latestAppBuildId}</dd>
              </div>
            ) : null}
          </dl>
          <button
            type="button"
            onClick={() => onCheckAppUpdate?.()}
            disabled={isCheckingAppUpdate || typeof onCheckAppUpdate !== 'function'}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconRefresh size={16} />
            {isCheckingAppUpdate ? '최신 버전 확인 중...' : '최신 버전 확인 및 즉시 업데이트'}
          </button>
        </div>
      </div>
    </div>
  );
}

