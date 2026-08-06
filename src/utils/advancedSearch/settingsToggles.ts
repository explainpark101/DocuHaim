/**
 * Settings-page toggle switches exposed to Advanced Search (enable/disable menus).
 */

import {
  loadAltVimNavigationEnabled,
  saveAltVimNavigationEnabled,
} from '@/utils/altVimNavigationSettings';
import {
  getComposerHelperTextVisible,
  writeComposerHelperTextPref,
} from '@/utils/chatWithMyself/composerPrefs.js';
import {
  loadHideRecordingCompanions,
  saveHideRecordingCompanions,
} from '@/utils/recordingVisibilitySettings';
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
  loadAdvancedSearchUiAnimationEnabled,
  saveAdvancedSearchUiAnimationEnabled,
} from './settings';
import { advancedSearchEngine } from './engine';

export type SettingsToggleId =
  | 'settings-alt-vim'
  | 'settings-show-trash'
  | 'settings-show-hidden'
  | 'settings-hide-recording'
  | 'settings-tree-sticky'
  | 'settings-composer-helper'
  | 'settings-as-animation'
  | 'settings-as-index'
  | 'settings-as-include-other';

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
    id: 'settings-tree-sticky',
    enableTitle: '트리 폴더 경로 sticky 켜기',
    disableTitle: '트리 폴더 경로 sticky 끄기',
    description: '사이드바 스크롤 시 열린 폴더 경로 고정',
    keywords: ['sticky', '트리', 'tree', '폴더 경로', '경로'],
    load: loadTreeStickyFolderPathEnabled,
    save: saveTreeStickyFolderPathEnabled,
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
