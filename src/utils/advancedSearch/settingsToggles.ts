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
  loadWorkspacePaneFreezeMode,
  saveWorkspacePaneFreezeMode,
  WORKSPACE_PANE_FREEZE_OPTIONS,
  type WorkspacePaneFreezeMode,
} from '@/utils/workspacePaneFreezeSettings';
import {
  getComposerHelperTextVisible,
  writeComposerHelperTextPref,
} from '@/utils/chatWithMyself/composerPrefs.js';
import {
  loadChatComposerAutocompleteEnabled,
  setChatComposerAutocompleteEnabled,
} from '@/utils/chatWithMyself/composerAutocompleteSettings';

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
  loadTreeShowModifiedDateEnabled,
  saveTreeShowModifiedDateEnabled,
} from '@/utils/treeModifiedDateSettings';
import {
  loadTreeRevealOnOpenEnabled,
  saveTreeRevealOnOpenEnabled,
} from '@/utils/treeRevealOnOpenSettings';
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
  loadAdvancedSearchBuildLogAutoScroll,
  saveAdvancedSearchBuildLogAutoScroll,
} from '@/utils/advancedSearch/settings';
import {
  FOOTNOTE_DISPLAY_MODE_OPTIONS,
  loadFootnoteDisplayMode,
  setFootnoteDisplayMode,
  type FootnoteDisplayMode,
} from '@/utils/previewFootnotesSettings';
import {
  EXPORT_PDF_PREVIEW_ENGINE_OPTIONS,
  loadExportPdfPreviewEngine,
  saveExportPdfPreviewEngine,
  type ExportPdfPreviewEngineId,
} from '@/utils/exportPdf/exportPdfPreviewEngineSettings';
import {
  EDITOR_IMAGE_ALIGN_OPTIONS,
  loadEditorImageAlign,
  setEditorImageAlign,
  type EditorImageAlign,
} from '@/utils/editorImageAlignSettings';
import {
  loadOrphanImageAutoDeleteEnabled,
  saveOrphanImageAutoDeleteEnabled,
} from '@/utils/orphanImageCleanupSettings';
import {
  loadTauriDownloadSaveDialogEnabled,
  saveTauriDownloadSaveDialogEnabled,
} from '@/utils/tauriDownloadSettings';
import {
  loadStatusBarClockEnabled,
  saveStatusBarClockEnabled,
  loadStatusBarClockFormat,
  setStatusBarClockFormat,
  loadStatusBarClockShowDate,
  setStatusBarClockShowDate,
  STATUS_BAR_CLOCK_FORMAT_OPTIONS,
  type StatusBarClockFormat,
} from '@/utils/statusBarClockSettings';
import {
  loadQuizSettings,
  saveQuizSettings,
} from '@/utils/quiz/quizSettingsStore';
import { advancedSearchEngine } from '@/utils/advancedSearch/engine';
import {
  HAIM_VIEW_MODE_DOUBLE,
  HAIM_VIEW_MODE_WYSIWYG,
  loadHaimViewMode,
  saveHaimViewMode,
} from '@/utils/haimViewModeSettings';
import {
  loadHaimDoubleScrollSyncEnabled,
  saveHaimDoubleScrollSyncEnabled,
} from '@/utils/haimDoubleScrollSyncSettings';
import {
  loadHaimFocusOutlineEnabled,
  saveHaimFocusOutlineEnabled,
} from '@/utils/haimFocusOutlineSettings';
import {
  loadHaimProseWidthClampEnabled,
  saveHaimProseWidthClampEnabled,
} from '@/utils/haimProseWidthSettings';
import {
  loadHaimDocuhaimLinkIconEnabled,
  saveHaimDocuhaimLinkIconEnabled,
} from '@/utils/haimDocuhaimLinkIconSettings';
import {
  loadHaimProseLineNumbersEnabled,
  loadHaimCodeLineNumbersEnabled,
  loadHaimRawLineNumbersEnabled,
  saveHaimProseLineNumbersEnabled,
  saveHaimCodeLineNumbersEnabled,
  saveHaimRawLineNumbersEnabled,
} from '@/utils/haimWysiwygLineNumberSettings';
import {
  loadHaimCodeWrapEnabled,
  saveHaimCodeWrapEnabled,
} from '@/utils/haimCodeWrapSettings';
import {
  loadHaimTocDockEnabled,
  saveHaimTocDockEnabled,
} from '@/utils/haimTocLayoutSettings';
import {
  HAIM_TYPOGRAPHY_RULE_DEFS,
  loadHaimTypographyGlobal,
  saveHaimTypographyGlobalRule,
  type HaimTypographyRuleId,
} from '@/utils/haimTypographySettings';
import {
  loadBase64ImageFoldEnabled,
  saveBase64ImageFoldEnabled,
} from '@/utils/base64ImageFoldSettings';

export type SettingsToggleId =
  | 'settings-alt-vim'
  | 'settings-workspace-tabs'
  | 'settings-show-trash'
  | 'settings-show-hidden'
  | 'settings-hide-recording'
  | 'settings-tree-sticky'
  | 'settings-tree-modified-date'
  | 'settings-tree-reveal-on-open'
  | 'settings-status-bar-clock'
  | 'settings-status-bar-clock-date'
  | 'settings-composer-helper'
  | 'settings-composer-autocomplete'
  | 'settings-as-animation'
  | 'settings-as-build-log-auto-scroll'
  | 'settings-as-index'
  | 'settings-as-include-other'
  | 'settings-cover-center-snap'
  | 'settings-cover-object-snap'
  | 'settings-cover-text-outline'
  | 'settings-cover-place-preview'
  | 'settings-orphan-image-auto'
  | 'settings-tauri-download-save-dialog'
  | 'settings-quiz-dock-width-spring'
  | 'settings-haim-double'
  | 'settings-haim-double-scroll-sync'
  | 'settings-haim-toc-dock'
  | 'settings-haim-focus-outline'
  | 'settings-haim-prose-width-clamp'
  | 'settings-haim-docuhaim-link-icon'
  | 'settings-haim-prose-line-numbers'
  | 'settings-haim-code-line-numbers'
  | 'settings-haim-raw-line-numbers'
  | 'settings-haim-code-wrap'
  | 'settings-base64-image-fold'
  | `settings-haim-typography-${HaimTypographyRuleId}`;

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
    id: 'settings-haim-double',
    enableTitle: 'Haim double(소스+WYSIWYG) 켜기',
    disableTitle: 'Haim double(소스+WYSIWYG) 끄기',
    description:
      'Haim Editor에서 마크다운 소스와 TipTap을 나란히 양방향 동기화 (비용 큼)',
    keywords: [
      'haim',
      'tiptap',
      'double',
      'dual',
      '듀얼',
      '소스',
      'wysiwyg',
      'source',
      '동시',
      'markdown',
    ],
    load: () => loadHaimViewMode() === HAIM_VIEW_MODE_DOUBLE,
    save: (enabled) =>
      saveHaimViewMode(enabled ? HAIM_VIEW_MODE_DOUBLE : HAIM_VIEW_MODE_WYSIWYG),
  },
  {
    id: 'settings-haim-double-scroll-sync',
    enableTitle: 'Haim double 스크롤 동기화 켜기',
    disableTitle: 'Haim double 스크롤 동기화 끄기',
    description: 'double 모드에서 소스·WYSIWYG를 data-line(소스 줄) 기준으로 맞춤',
    keywords: [
      'haim',
      'scroll',
      '스크롤',
      '동기화',
      'sync',
      'double',
      'follow',
    ],
    load: loadHaimDoubleScrollSyncEnabled,
    save: saveHaimDoubleScrollSyncEnabled,
  },
  {
    id: 'settings-haim-toc-dock',
    enableTitle: 'Haim 목차 사이드 패널(공간 차지) 켜기',
    disableTitle: 'Haim 목차 오버레이(덮기)로 전환',
    description:
      '켜면 목차가 편집 영역 옆 자리를 차지합니다. 끄면 위에 덮는 오버레이(기본)입니다.',
    keywords: [
      'haim',
      'toc',
      'catalog',
      '목차',
      '오버레이',
      'overlay',
      'dock',
      '사이드',
      '패널',
      '공간',
    ],
    load: loadHaimTocDockEnabled,
    save: saveHaimTocDockEnabled,
  },
  {
    id: 'settings-haim-focus-outline',
    enableTitle: 'Haim 편집 블록 점선 테두리 켜기',
    disableTitle: 'Haim 편집 블록 점선 테두리 끄기',
    description:
      'WYSIWYG에서 현재 편집 중인 블록을 dashed border로 표시합니다',
    keywords: [
      'haim',
      'focus',
      'outline',
      'border',
      'dash',
      'dashed',
      '점선',
      '테두리',
      '편집',
      '블록',
      'wysiwyg',
    ],
    load: loadHaimFocusOutlineEnabled,
    save: saveHaimFocusOutlineEnabled,
  },
  {
    id: 'settings-haim-prose-width-clamp',
    enableTitle: 'Haim WYSIWYG 본문 너비 제한 켜기',
    disableTitle: 'Haim WYSIWYG 본문 너비 제한 끄기',
    description:
      '노트 Haim Editor WYSIWYG 본문을 설정한 max-width(px)로 가운데 정렬합니다',
    keywords: [
      'haim',
      'prose',
      'width',
      'max-width',
      'clamp',
      'container',
      '본문',
      '너비',
      '폭',
      'reading',
      'reading width',
      'wysiwyg',
    ],
    load: loadHaimProseWidthClampEnabled,
    save: saveHaimProseWidthClampEnabled,
  },
  {
    id: 'settings-haim-docuhaim-link-icon',
    enableTitle: '노트 링크 아이콘 켜기',
    disableTitle: '노트 링크 아이콘 끄기',
    description:
      'docuhaim:// 노트 링크 앞에 노트 아이콘을 표시합니다 (기본 켜짐)',
    keywords: [
      'haim',
      'docuhaim',
      '노트 링크',
      'note link',
      '아이콘',
      'icon',
      '링크',
      'link',
      'wysiwyg',
    ],
    load: loadHaimDocuhaimLinkIconEnabled,
    save: saveHaimDocuhaimLinkIconEnabled,
  },
  {
    id: 'settings-haim-prose-line-numbers',
    enableTitle: 'Haim WYSIWYG 줄 번호 켜기',
    disableTitle: 'Haim WYSIWYG 줄 번호 끄기',
    description:
      'WYSIWYG 문서 왼쪽에 줄 번호를 표시합니다 (기본 켜짐)',
    keywords: [
      'haim',
      'prose',
      'wysiwyg',
      '문서',
      '줄번호',
      '줄 번호',
      'line',
      'number',
      'linenumber',
      'gutter',
    ],
    load: loadHaimProseLineNumbersEnabled,
    save: saveHaimProseLineNumbersEnabled,
  },
  {
    id: 'settings-haim-code-line-numbers',
    enableTitle: 'Haim 코드 블록 줄 번호 켜기',
    disableTitle: 'Haim 코드 블록 줄 번호 끄기',
    description:
      'WYSIWYG lowlight 코드 블록에 줄 번호를 표시합니다 (기본 켜짐)',
    keywords: [
      'haim',
      'code',
      'codeblock',
      '코드',
      '줄번호',
      '줄 번호',
      'line',
      'number',
      'linenumber',
      'lowlight',
      'hljs',
      'wysiwyg',
    ],
    load: loadHaimCodeLineNumbersEnabled,
    save: saveHaimCodeLineNumbersEnabled,
  },
  {
    id: 'settings-haim-raw-line-numbers',
    enableTitle: 'Haim raw 블록 줄 번호 켜기',
    disableTitle: 'Haim raw 블록 줄 번호 끄기',
    description:
      'WYSIWYG raw markdown 블록에 줄 번호를 표시합니다 (기본 켜짐)',
    keywords: [
      'haim',
      'raw',
      'rawblock',
      '로우',
      '줄번호',
      '줄 번호',
      'line',
      'number',
      'linenumber',
      'markdown',
      'wysiwyg',
    ],
    load: loadHaimRawLineNumbersEnabled,
    save: saveHaimRawLineNumbersEnabled,
  },
  {
    id: 'settings-haim-code-wrap',
    enableTitle: 'Haim 코드 줄 바꿈 켜기',
    disableTitle: 'Haim 코드 줄 바꿈 끄기',
    description:
      'WYSIWYG 코드·raw 블록에서 긴 줄을 soft-wrap합니다. 끄면 pre(가로 스크롤). Export PDF는 항상 wrap',
    keywords: [
      'haim',
      'code',
      'codeblock',
      '코드',
      '줄바꿈',
      '줄 바꿈',
      'wrap',
      'softwrap',
      'pre',
      'pre-wrap',
      'raw',
      'wysiwyg',
    ],
    load: loadHaimCodeWrapEnabled,
    save: saveHaimCodeWrapEnabled,
  },
  {
    id: 'settings-base64-image-fold',
    enableTitle: 'base64 이미지 소스 접기 켜기',
    disableTitle: 'base64 이미지 소스 접기 끄기',
    description:
      '마크다운 소스에서 긴 data:image base64를 접습니다. 칩을 클릭하면 개별 펼침',
    keywords: [
      'base64',
      'image',
      'fold',
      'collapse',
      '접기',
      '이미지',
      '소스',
      'data-uri',
      'mermaid',
    ],
    load: loadBase64ImageFoldEnabled,
    save: saveBase64ImageFoldEnabled,
  },
  ...HAIM_TYPOGRAPHY_RULE_DEFS.map(
    (def): SettingsToggleDef => ({
      id: `settings-haim-typography-${def.id}`,
      enableTitle: `Haim Typography ${def.label} 켜기`,
      disableTitle: `Haim Typography ${def.label} 끄기`,
      description: `WYSIWYG 입력 편의: ${def.hint} (저장 마크다운에 반영)`,
      keywords: [
        'haim',
        'typography',
        '타이포',
        '입력',
        '편의',
        def.id,
        def.label,
        def.hint,
      ],
      load: () => loadHaimTypographyGlobal()[def.id],
      save: (enabled) => saveHaimTypographyGlobalRule(def.id, enabled),
    }),
  ),
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
    id: 'settings-tree-reveal-on-open',
    enableTitle: '검색으로 연 파일 트리 스크롤 켜기',
    disableTitle: '검색으로 연 파일 트리 스크롤 끄기',
    description: '고급 검색에서 파일을 열면 사이드바 트리를 해당 위치로 스크롤',
    keywords: [
      'tree',
      '트리',
      'reveal',
      'scroll',
      '스크롤',
      'advanced search',
      '고급 검색',
      '검색',
      '사이드바',
      'sidebar',
      '열기',
      'open',
    ],
    load: loadTreeRevealOnOpenEnabled,
    save: saveTreeRevealOnOpenEnabled,
  },
  {
    id: 'settings-status-bar-clock',
    enableTitle: '상태바 현재 시각 켜기',
    disableTitle: '상태바 현재 시각 끄기',
    description: '앱 하단 상태바 오른쪽에 현재 시각(시:분:초) 표시',
    keywords: [
      'clock',
      'time',
      '시각',
      '현재시각',
      '시계',
      'status bar',
      '상태바',
      'statusbar',
    ],
    load: loadStatusBarClockEnabled,
    save: saveStatusBarClockEnabled,
  },
  {
    id: 'settings-status-bar-clock-date',
    enableTitle: '상태바 시계 날짜 표시 켜기',
    disableTitle: '상태바 시계 날짜 표시 끄기',
    description: '상태바 시계에 날짜(yyyy-MM-dd)도 함께 표시',
    keywords: [
      'clock',
      'date',
      '날짜',
      '시각',
      '시계',
      'status bar',
      '상태바',
      'yyyy',
    ],
    load: loadStatusBarClockShowDate,
    save: setStatusBarClockShowDate,
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
    id: 'settings-composer-autocomplete',
    enableTitle: '채팅 입력 자동완성 켜기',
    disableTitle: '채팅 입력 자동완성 끄기',
    description: '나와의 채팅 md-editor-rt 자동완성 추천',
    keywords: [
      'chat',
      '채팅',
      'composer',
      'autocomplete',
      'completion',
      'suggestion',
      '자동완성',
      '추천',
      'md-editor',
      'codemirror',
    ],
    load: loadChatComposerAutocompleteEnabled,
    save: setChatComposerAutocompleteEnabled,
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
    id: 'settings-as-build-log-auto-scroll',
    enableTitle: '색인 로그 자동 스크롤 켜기',
    disableTitle: '색인 로그 자동 스크롤 끄기',
    description: '역색인 로그가 최신 줄로 따라가기',
    keywords: [
      'auto scroll',
      'autoscroll',
      '자동 스크롤',
      '로그',
      'log',
      '색인',
      'build log',
      'advanced search',
    ],
    load: loadAdvancedSearchBuildLogAutoScroll,
    save: saveAdvancedSearchBuildLogAutoScroll,
  },
  {
    id: 'settings-as-index',
    enableTitle: 'Advanced Search 역색인 켜기',
    disableTitle: 'Advanced Search 역색인 끄기',
    description: '문서·채팅 내용 역색인 사용',
    keywords: ['index', '역색인', 'inverted', '색인', 'live scan'],
    load: () => advancedSearchEngine.isEnabled(),
    save: (v) => {
      advancedSearchEngine.setEnabled(v);
    },
  },
  {
    id: 'settings-as-include-other',
    enableTitle: '기타 파일 색인 포함 켜기',
    disableTitle: '기타 파일 색인 포함 끄기',
    description: 'txt/json/html 등도 역색인에 포함',
    keywords: ['include', 'other', '기타', '파일', 'txt', 'json', '색인', '역색인'],
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
  {
    id: 'settings-tauri-download-save-dialog',
    enableTitle: '다운로드 위치 사전 확인 켜기',
    disableTitle: '다운로드 위치 사전 확인 끄기',
    description: 'Tauri 데스크톱에서 파일 저장 대화상자 표시',
    keywords: ['download', '다운로드', 'save', '저장', 'tauri', 'desktop', '데스크톱', 'dialog'],
    load: loadTauriDownloadSaveDialogEnabled,
    save: saveTauriDownloadSaveDialogEnabled,
  },
  {
    id: 'settings-quiz-dock-width-spring',
    enableTitle: '퀴즈 패널 width spring 켜기',
    disableTitle: '퀴즈 패널 width spring 끄기',
    description:
      '퀴즈 사이드 패널을 너비 spring으로 열기 (Safari·WebView에서 무거울 수 있음)',
    keywords: [
      'quiz',
      '퀴즈',
      'dock',
      '패널',
      'panel',
      'width',
      'spring',
      'animation',
      '애니메이션',
      'motion',
    ],
    load: () => loadQuizSettings().dockWidthSpringAnim,
    save: (enabled) => {
      saveQuizSettings({ dockWidthSpringAnim: enabled });
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

export type WorkspacePaneFreezeCommandId =
  | 'settings-pane-freeze-off'
  | 'settings-pane-freeze-hover-or-focus'
  | 'settings-pane-freeze-focus';

const PANE_FREEZE_COMMAND_BY_MODE = {
  off: 'settings-pane-freeze-off',
  'hover-or-focus': 'settings-pane-freeze-hover-or-focus',
  focus: 'settings-pane-freeze-focus',
} as const;

export function isWorkspacePaneFreezeCommandId(
  id: string | undefined | null,
): id is WorkspacePaneFreezeCommandId {
  return (
    id === 'settings-pane-freeze-off' ||
    id === 'settings-pane-freeze-hover-or-focus' ||
    id === 'settings-pane-freeze-focus'
  );
}

export function workspacePaneFreezeModeFromCommandId(
  id: WorkspacePaneFreezeCommandId,
): WorkspacePaneFreezeMode {
  if (id === 'settings-pane-freeze-off') return 'off';
  if (id === 'settings-pane-freeze-focus') return 'focus';
  return 'hover-or-focus';
}

/** Situational: only modes other than the current one (when tabs are enabled). */
export function getWorkspacePaneFreezeCommands(): Array<{
  id: WorkspacePaneFreezeCommandId;
  title: string;
  description: string;
  keywords: string[];
}> {
  if (!loadWorkspaceTabsEnabled()) return [];
  const current = loadWorkspacePaneFreezeMode();
  return WORKSPACE_PANE_FREEZE_OPTIONS.filter((opt) => opt.value !== current).map((opt) => ({
    id: PANE_FREEZE_COMMAND_BY_MODE[opt.value],
    title: `스플릿 페인 프리징: ${opt.label}`,
    description: opt.description,
    keywords: [
      'freeze',
      '프리징',
      '스플릿',
      'split',
      '페인',
      'pane',
      'isSurfaceLive',
      'md-editor',
      '성능',
      'performance',
      'hover',
      '호버',
      'focus',
      '포커스',
      'keyboard',
      '미리보기',
      'preview',
      'demote',
      opt.value,
      opt.label,
    ],
  }));
}

export function applyWorkspacePaneFreezeCommand(
  id: WorkspacePaneFreezeCommandId,
): void {
  saveWorkspacePaneFreezeMode(workspacePaneFreezeModeFromCommandId(id));
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

export type ExportPdfPreviewEngineCommandId =
  | 'settings-export-pdf-preview-auto'
  | 'settings-export-pdf-preview-legacy'
  | 'settings-export-pdf-preview-haim';

const EXPORT_PDF_PREVIEW_ENGINE_COMMAND_BY_MODE = {
  auto: 'settings-export-pdf-preview-auto',
  legacy: 'settings-export-pdf-preview-legacy',
  haim: 'settings-export-pdf-preview-haim',
} as const;

export function isExportPdfPreviewEngineCommandId(
  id: string | undefined | null,
): id is ExportPdfPreviewEngineCommandId {
  return (
    id === 'settings-export-pdf-preview-auto' ||
    id === 'settings-export-pdf-preview-legacy' ||
    id === 'settings-export-pdf-preview-haim'
  );
}

export function exportPdfPreviewEngineFromCommandId(
  id: ExportPdfPreviewEngineCommandId,
): ExportPdfPreviewEngineId {
  if (id === 'settings-export-pdf-preview-legacy') return 'legacy';
  if (id === 'settings-export-pdf-preview-haim') return 'haim';
  return 'auto';
}

/** Situational: only engines other than the current preference. */
export function getExportPdfPreviewEngineCommands(): Array<{
  id: ExportPdfPreviewEngineCommandId;
  title: string;
  description: string;
  keywords: string[];
}> {
  const current = loadExportPdfPreviewEngine();
  return EXPORT_PDF_PREVIEW_ENGINE_OPTIONS.filter((opt) => opt.value !== current).map(
    (opt) => ({
      id: EXPORT_PDF_PREVIEW_ENGINE_COMMAND_BY_MODE[opt.value],
      title: `Export PDF 미리보기: ${opt.label}`,
      description: opt.description,
      keywords: [
        'export pdf',
        'export-pdf',
        'pdf',
        '인쇄',
        'print',
        '미리보기',
        'preview',
        'engine',
        '엔진',
        '에디터 따라가기',
        'md-editor-rt',
        'haim',
        'tiptap',
        opt.value,
        opt.label,
      ],
    }),
  );
}

export function applyExportPdfPreviewEngineCommand(
  id: ExportPdfPreviewEngineCommandId,
): void {
  saveExportPdfPreviewEngine(exportPdfPreviewEngineFromCommandId(id));
}

export type EditorImageAlignCommandId =
  | 'settings-image-align-left'
  | 'settings-image-align-center'
  | 'settings-image-align-right';

const EDITOR_IMAGE_ALIGN_COMMAND_BY_MODE = {
  left: 'settings-image-align-left',
  center: 'settings-image-align-center',
  right: 'settings-image-align-right',
} as const;

export function isEditorImageAlignCommandId(
  id: string | undefined | null,
): id is EditorImageAlignCommandId {
  return (
    id === 'settings-image-align-left' ||
    id === 'settings-image-align-center' ||
    id === 'settings-image-align-right'
  );
}

export function editorImageAlignFromCommandId(
  id: EditorImageAlignCommandId,
): EditorImageAlign {
  if (id === 'settings-image-align-left') return 'left';
  if (id === 'settings-image-align-right') return 'right';
  return 'center';
}

/** Situational: only alignments other than the current one. */
export function getEditorImageAlignCommands(): Array<{
  id: EditorImageAlignCommandId;
  title: string;
  description: string;
  keywords: string[];
}> {
  const current = loadEditorImageAlign();
  return EDITOR_IMAGE_ALIGN_OPTIONS.filter((opt) => opt.value !== current).map(
    (opt) => ({
      id: EDITOR_IMAGE_ALIGN_COMMAND_BY_MODE[opt.value],
      title: `이미지 정렬: ${opt.label}`,
      description: opt.description,
      keywords: [
        'image',
        'align',
        'alignment',
        '이미지',
        '정렬',
        '가운데',
        '왼쪽',
        '오른쪽',
        'center',
        'left',
        'right',
        'wiki',
        opt.value,
        opt.label,
      ],
    }),
  );
}

export function applyEditorImageAlignCommand(
  id: EditorImageAlignCommandId,
): void {
  setEditorImageAlign(editorImageAlignFromCommandId(id));
}

export type StatusBarClockFormatCommandId =
  | 'settings-status-bar-clock-24h'
  | 'settings-status-bar-clock-12h'
  | 'settings-status-bar-clock-custom';

const STATUS_BAR_CLOCK_FORMAT_COMMAND_BY_MODE = {
  '24h': 'settings-status-bar-clock-24h',
  '12h': 'settings-status-bar-clock-12h',
  custom: 'settings-status-bar-clock-custom',
} as const;

export function isStatusBarClockFormatCommandId(
  id: string | undefined | null,
): id is StatusBarClockFormatCommandId {
  return (
    id === 'settings-status-bar-clock-24h' ||
    id === 'settings-status-bar-clock-12h' ||
    id === 'settings-status-bar-clock-custom'
  );
}

export function statusBarClockFormatFromCommandId(
  id: StatusBarClockFormatCommandId,
): StatusBarClockFormat {
  if (id === 'settings-status-bar-clock-12h') return '12h';
  if (id === 'settings-status-bar-clock-custom') return 'custom';
  return '24h';
}

/** Situational: only modes other than the current one (when clock is enabled). */
export function getStatusBarClockFormatCommands(): Array<{
  id: StatusBarClockFormatCommandId;
  title: string;
  description: string;
  keywords: string[];
}> {
  if (!loadStatusBarClockEnabled()) return [];
  const current = loadStatusBarClockFormat();
  return STATUS_BAR_CLOCK_FORMAT_OPTIONS.filter((opt) => opt.value !== current).map((opt) => ({
    id: STATUS_BAR_CLOCK_FORMAT_COMMAND_BY_MODE[opt.value],
    title: `상태바 시계: ${opt.label}`,
    description: opt.description,
    keywords: [
      'clock',
      'time',
      '시각',
      '시계',
      'status bar',
      '상태바',
      '24h',
      '12h',
      'ampm',
      'am/pm',
      'custom',
      '직접',
      'format',
      '형식',
      'pattern',
      '패턴',
      opt.value,
      opt.label,
    ],
  }));
}

export function applyStatusBarClockFormatCommand(
  id: StatusBarClockFormatCommandId,
): void {
  setStatusBarClockFormat(statusBarClockFormatFromCommandId(id));
}
