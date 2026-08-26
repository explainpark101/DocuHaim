/**
 * Settings-page toggle switches exposed to Advanced Search (enable/disable menus).
 */

import {
  loadAltVimNavigationEnabled,
  saveAltVimNavigationEnabled,
} from '@/utils/altVimNavigationSettings';
import {
  loadWorkspaceTabsAutoSaveMode,
  loadWorkspaceTabsEnabled,
  saveWorkspaceTabsAutoSaveMode,
  saveWorkspaceTabsEnabled,
  WORKSPACE_TABS_AUTO_SAVE_OPTIONS,
} from '@/utils/workspaceTabsSettings';
import {
  getComposerHelperTextVisible,
  writeComposerHelperTextPref,
} from '@/utils/chatWithMyself/composerPrefs.js';
import {
  loadHideRecordingCompanions,
  saveHideRecordingCompanions,
} from '@/utils/recording/recordingVisibilitySettings';
import {
  loadShowHiddenFolders,
  loadShowTrashFolder,
  saveShowHiddenFolders,
  saveShowTrashFolder,
} from '@/utils/treeVisibilitySettings';
import {
  loadTreeStickyFolderPathEnabled,
  saveTreeStickyFolderPathEnabled,
} from '@/utils/treeStickySettings';
import {
  loadTreeShowModifiedDateEnabled,
  saveTreeShowModifiedDateEnabled,
} from '@/utils/treeModifiedDateSettings';
import {
  loadCoverCenterSnapEnabled,
  loadCoverObjectSnapEnabled,
  loadCoverPlacePreviewEnabled,
  loadCoverTextContainerOutlineEnabled,
  saveCoverCenterSnapEnabled,
  saveCoverObjectSnapEnabled,
  saveCoverPlacePreviewEnabled,
  saveCoverTextContainerOutlineEnabled,
} from '@/utils/noteCover/snapSettings';
import {
  loadAdvancedSearchUiAnimationEnabled,
  saveAdvancedSearchUiAnimationEnabled,
} from '@/utils/advancedSearch/settings';
import {
  FOOTNOTE_DISPLAY_MODE_OPTIONS,
  loadFootnoteDisplayMode,
  setFootnoteDisplayMode,
  type FootnoteDisplayMode,
} from '@/utils/previewFootnotesSettings';
import {
  loadOrphanImageAutoDeleteEnabled,
  saveOrphanImageAutoDeleteEnabled,
} from '@/utils/orphanImageCleanupSettings';
import { advancedSearchEngine } from '@/utils/advancedSearch/engine';

export type SettingsToggleId =
  | 'settings-alt-vim'
  | 'settings-workspace-tabs'
  | 'settings-show-trash'
  | 'settings-show-hidden'
  | 'settings-hide-recording'
  | 'settings-tree-sticky'
  | 'settings-tree-modified-date'
  | 'settings-composer-helper'
  | 'settings-as-animation'
  | 'settings-as-index'
  | 'settings-as-include-other'
  | 'settings-cover-center-snap'
  | 'settings-cover-object-snap'
  | 'settings-cover-text-outline'
  | 'settings-cover-place-preview'
  | 'settings-orphan-image-auto';

export type SettingsToggleDef = {
  id: SettingsToggleId;
  /** Menu title when currently OFF → action enables. */
  enableTitle: string;
  /** Menu title when currently ON → action disables. */
  disableTitle: string;
  description: string;
  keywords: string[];
  load: () => boolean;
  save: (enabled: boolean) => void;
};

type Listener = (id: SettingsToggleId, enabled: boolean) => void;

const listeners = new Set<Listener>();

function notify(id: SettingsToggleId, enabled: boolean): void {
  for (const listener of listeners) {
    try {
      listener(id, enabled);
    } catch {
      // ignore
    }
  }
}

export const SETTINGS_TOGGLE_DEFS: readonly SettingsToggleDef[] = [
  {
    id: 'settings-alt-vim',
    enableTitle: 'Alt+Vim 커서 이동 켜기',
    disableTitle: 'Alt+Vim 커서 이동 끄기',
    description: 'md-editor-rt에서 Alt+H/J/K/L 커서 이동',
    keywords: ['alt', 'vim', 'hjkl', '커서', '네비게이션', 'navigation'],
    load: loadAltVimNavigationEnabled,
    save: saveAltVimNavigationEnabled,
  },
  {
    id: 'settings-workspace-tabs',
    enableTitle: '탭 기능 켜기',
    disableTitle: '탭 기능 끄기',
    description:
      '여러 파일과 나와의 채팅을 탭으로 동시에 열기 (Ctrl+W, Ctrl+Tab, Ctrl+Shift+T)',
    keywords: [
      'tab',
      'tabs',
      '탭',
      '워크스페이스',
      'workspace',
      '네비게이션',
      'navigation',
      '채팅',
      'auto save',
      '자동 저장',
    ],
    load: loadWorkspaceTabsEnabled,
    save: saveWorkspaceTabsEnabled,
  },
  {
    id: 'settings-show-trash',
    enableTitle: '쓰레기통 보기 켜기',
    disableTitle: '쓰레기통 보기 끄기',
    description: '사이드바에 .trash 폴더 표시',
    keywords: ['trash', '쓰레기통', '.trash', '휴지통', '표시'],
    load: loadShowTrashFolder,
    save: saveShowTrashFolder,
  },
  {
    id: 'settings-show-hidden',
    enableTitle: '숨김 폴더 보기 켜기',
    disableTitle: '숨김 폴더 보기 끄기',
    description: '사이드바에 숨김(점) 폴더 표시',
    keywords: ['hidden', '숨김', '폴더', 'dotfile', '표시'],
    load: loadShowHiddenFolders,
    save: saveShowHiddenFolders,
  },
  {
    id: 'settings-hide-recording',
    enableTitle: '녹음·필기 동반 파일 숨기기 켜기',
    disableTitle: '녹음·필기 동반 파일 숨기기 끄기',
    description: '녹음·필기 동기화 파일을 사이드바에서 숨김',
    keywords: ['recording', '녹음', '필기', '동반', '숨기기', 'companion'],
    load: loadHideRecordingCompanions,
    save: saveHideRecordingCompanions,
  },
  {
    id: 'settings-orphan-image-auto',
    enableTitle: '노트 삭제 시 이미지 자동 정리 켜기',
    disableTitle: '노트 삭제 시 이미지 자동 정리 끄기',
    description: '노트/폴더 삭제 시 companion .images 동반 trash',
    keywords: ['orphan', '이미지', '자동', '정리', '삭제', 'companion', '.images'],
    load: loadOrphanImageAutoDeleteEnabled,
    save: saveOrphanImageAutoDeleteEnabled,
  },
  {
    id: 'settings-tree-sticky',
    enableTitle: '트리 폴더 경로 sticky 켜기',
    disableTitle: '트리 폴더 경로 sticky 끄기',
    description: '사이드바 스크롤 시 열린 폴더 경로 고정',
    keywords: ['sticky', '트리', 'tree', '폴더 경로', '경로'],
    load: loadTreeStickyFolderPathEnabled,
    save: saveTreeStickyFolderPathEnabled,
  },
  {
    id: 'settings-tree-modified-date',
    enableTitle: '트리 수정 날짜 표시 켜기',
    disableTitle: '트리 수정 날짜 표시 끄기',
    description: '사이드바 파일명 아래 최근 수정 시각 표시',
    keywords: [
      'tree',
      '트리',
      'modified',
      '수정',
      '날짜',
      'date',
      'mtime',
      '사이드바',
      'sidebar',
    ],
    load: loadTreeShowModifiedDateEnabled,
    save: saveTreeShowModifiedDateEnabled,
  },
  {
    id: 'settings-composer-helper',
    enableTitle: '채팅 단축키 안내 표시 켜기',
    disableTitle: '채팅 단축키 안내 표시 끄기',
    description: '나와의 채팅 입력창 아래 helper text',
    keywords: ['chat', '채팅', 'helper', '단축키', '안내', 'composer'],
    load: getComposerHelperTextVisible,
    save: writeComposerHelperTextPref,
  },
  {
    id: 'settings-as-animation',
    enableTitle: 'Advanced Search 애니메이션 켜기',
    disableTitle: 'Advanced Search 애니메이션 끄기',
    description: 'Spotlight 열기/닫기 모션',
    keywords: ['animation', '애니메이션', 'advanced search', 'spotlight', '모션'],
    load: loadAdvancedSearchUiAnimationEnabled,
    save: saveAdvancedSearchUiAnimationEnabled,
  },
  {
    id: 'settings-as-index',
    enableTitle: 'Advanced Search 역색인 켜기',
    disableTitle: 'Advanced Search 역색인 끄기',
    description: '문서·채팅 내용 역색인 사용',
    keywords: ['index', '역색인', 'inverted', 'advanced search', '색인'],
    load: () => advancedSearchEngine.isEnabled(),
    save: (v) => {
      // Android Tauri: lucivy inverted index is unsupported — keep forced off.
      if (
        typeof window !== 'undefined' &&
        ('__TAURI_INTERNALS__' in window || '__TAURI__' in window) &&
        /Android/i.test(navigator.userAgent || '')
      ) {
        advancedSearchEngine.setEnabled(false);
        return;
      }
      advancedSearchEngine.setEnabled(v);
    },
  },
  {
    id: 'settings-as-include-other',
    enableTitle: '기타 파일 색인 포함 켜기',
    disableTitle: '기타 파일 색인 포함 끄기',
    description: 'txt/json/html 등도 Advanced Search 색인에 포함',
    keywords: ['include', 'other', '기타', '파일', 'txt', 'json', '색인'],
    load: () => advancedSearchEngine.getStatus().includeOtherFiles,
    save: (v) => {
      advancedSearchEngine.setIncludeOtherFiles(v);
    },
  },
  {
    id: 'settings-cover-center-snap',
    enableTitle: '표지 가운데 스냅 켜기',
    disableTitle: '표지 가운데 스냅 끄기',
    description: '표지 편집 드래그 시 페이지 중앙선 스냅',
    keywords: ['cover', '표지', 'snap', '스냅', 'center', '가운데', '중앙'],
    load: loadCoverCenterSnapEnabled,
    save: saveCoverCenterSnapEnabled,
  },
  {
    id: 'settings-cover-object-snap',
    enableTitle: '표지 개체 스냅 켜기',
    disableTitle: '표지 개체 스냅 끄기',
    description: '표지 편집 드래그 시 다른 개체 테두리·가운데선 스냅 (Shift+Tab)',
    keywords: ['cover', '표지', 'snap', '스냅', 'object', '개체', '정렬', 'shift', 'tab'],
    load: loadCoverObjectSnapEnabled,
    save: saveCoverObjectSnapEnabled,
  },
  {
    id: 'settings-cover-text-outline',
    enableTitle: '표지 텍스트 상자 표시 켜기',
    disableTitle: '표지 텍스트 상자 표시 끄기',
    description: '표지 편집에서 모든 텍스트 상자 테두리 표시',
    keywords: ['cover', '표지', 'text', '텍스트', 'outline', '상자', '테두리'],
    load: loadCoverTextContainerOutlineEnabled,
    save: saveCoverTextContainerOutlineEnabled,
  },
  {
    id: 'settings-cover-place-preview',
    enableTitle: '표지 삽입 미리보기 켜기',
    disableTitle: '표지 삽입 미리보기 끄기',
    description: '표지 삽입 모드 반투명 고스트 미리보기',
    keywords: ['cover', '표지', 'place', 'preview', '미리보기', '삽입', '고스트'],
    load: loadCoverPlacePreviewEnabled,
    save: saveCoverPlacePreviewEnabled,
  },
] as const;

const DEF_BY_ID = new Map(
  SETTINGS_TOGGLE_DEFS.map((d) => [d.id, d] as const),
);

export function isSettingsToggleId(id: string | undefined | null): id is SettingsToggleId {
  return Boolean(id && DEF_BY_ID.has(id as SettingsToggleId));
}

export function loadSettingsToggle(id: SettingsToggleId): boolean {
  return DEF_BY_ID.get(id)?.load() ?? false;
}

export function setSettingsToggle(id: SettingsToggleId, enabled: boolean): boolean {
  const def = DEF_BY_ID.get(id);
  if (!def) return false;
  const next = Boolean(enabled);
  def.save(next);
  notify(id, next);
  return true;
}

export function toggleSettingsToggle(id: SettingsToggleId): boolean {
  const next = !loadSettingsToggle(id);
  setSettingsToggle(id, next);
  return next;
}

export function subscribeSettingsToggles(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Snapshot of current on/off for ranking / dynamic titles. */
export function getSettingsToggleStates(): Record<SettingsToggleId, boolean> {
  const out = {} as Record<SettingsToggleId, boolean>;
  for (const def of SETTINGS_TOGGLE_DEFS) {
    out[def.id] = def.load();
  }
  return out;
}

export type WorkspaceTabsAutoSaveCommandId =
  | 'settings-tabs-autosave-off'
  | 'settings-tabs-autosave-onFocusChange'
  | 'settings-tabs-autosave-onWindowChange';

const AUTO_SAVE_COMMAND_BY_MODE = {
  off: 'settings-tabs-autosave-off',
  onFocusChange: 'settings-tabs-autosave-onFocusChange',
  onWindowChange: 'settings-tabs-autosave-onWindowChange',
} as const;

export function isWorkspaceTabsAutoSaveCommandId(
  id: string | undefined | null,
): id is WorkspaceTabsAutoSaveCommandId {
  return (
    id === 'settings-tabs-autosave-off' ||
    id === 'settings-tabs-autosave-onFocusChange' ||
    id === 'settings-tabs-autosave-onWindowChange'
  );
}

export function workspaceTabsAutoSaveModeFromCommandId(
  id: WorkspaceTabsAutoSaveCommandId,
): 'off' | 'onFocusChange' | 'onWindowChange' {
  if (id === 'settings-tabs-autosave-off') return 'off';
  if (id === 'settings-tabs-autosave-onWindowChange') return 'onWindowChange';
  return 'onFocusChange';
}

/** Situational: only modes other than the current one (when tabs are enabled). */
export function getWorkspaceTabsAutoSaveCommands(): Array<{
  id: WorkspaceTabsAutoSaveCommandId;
  title: string;
  description: string;
  keywords: string[];
}> {
  if (!loadWorkspaceTabsEnabled()) return [];
  const current = loadWorkspaceTabsAutoSaveMode();
  return WORKSPACE_TABS_AUTO_SAVE_OPTIONS.filter((opt) => opt.value !== current).map((opt) => ({
    id: AUTO_SAVE_COMMAND_BY_MODE[opt.value],
    title: `탭 자동 저장: ${opt.label}`,
    description: opt.description,
    keywords: [
      'tab',
      'tabs',
      '탭',
      'auto save',
      'autosave',
      '자동 저장',
      '저장',
      'vscode',
      'onFocusChange',
      'onWindowChange',
      'off',
      opt.value,
      opt.label,
    ],
  }));
}

export function applyWorkspaceTabsAutoSaveCommand(
  id: WorkspaceTabsAutoSaveCommandId,
): void {
  saveWorkspaceTabsAutoSaveMode(workspaceTabsAutoSaveModeFromCommandId(id));
}

export type FootnoteDisplayModeCommandId =
  | 'settings-footnote-display-sup'
  | 'settings-footnote-display-sub'
  | 'settings-footnote-display-rawText';

const FOOTNOTE_DISPLAY_COMMAND_BY_MODE = {
  sup: 'settings-footnote-display-sup',
  sub: 'settings-footnote-display-sub',
  rawText: 'settings-footnote-display-rawText',
} as const;

export function isFootnoteDisplayModeCommandId(
  id: string | undefined | null,
): id is FootnoteDisplayModeCommandId {
  return (
    id === 'settings-footnote-display-sup' ||
    id === 'settings-footnote-display-sub' ||
    id === 'settings-footnote-display-rawText'
  );
}

export function footnoteDisplayModeFromCommandId(
  id: FootnoteDisplayModeCommandId,
): FootnoteDisplayMode {
  if (id === 'settings-footnote-display-sub') return 'sub';
  if (id === 'settings-footnote-display-rawText') return 'rawText';
  return 'sup';
}

/** Situational: only modes other than the current one. */
export function getFootnoteDisplayModeCommands(): Array<{
  id: FootnoteDisplayModeCommandId;
  title: string;
  description: string;
  keywords: string[];
}> {
  const current = loadFootnoteDisplayMode();
  return FOOTNOTE_DISPLAY_MODE_OPTIONS.filter((opt) => opt.value !== current).map((opt) => ({
    id: FOOTNOTE_DISPLAY_COMMAND_BY_MODE[opt.value],
    title: `각주 표기: ${opt.label}`,
    description: opt.description,
    keywords: [
      'footnote',
      'footnotes',
      '각주',
      '표기',
      'display',
      'sup',
      'sub',
      'raw',
      '윗첨자',
      '아랫첨자',
      opt.value,
      opt.label,
    ],
  }));
}

export function applyFootnoteDisplayModeCommand(
  id: FootnoteDisplayModeCommandId,
): void {
  setFootnoteDisplayMode(footnoteDisplayModeFromCommandId(id));
}
