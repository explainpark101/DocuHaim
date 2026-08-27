import { isTauriMacOS } from '@/utils/tauriPlatform';

export type SettingsPageCatalogContext = {
  isDesktopApp: boolean;
  showWebAuthnSection: boolean;
  canScanStorageUsage: boolean;
};

export type SettingsPageSectionDef = {
  id: string;
  label: string;
  visible?: (ctx: SettingsPageCatalogContext) => boolean;
};

export type SettingsPageGroupDef = {
  id: string;
  title: string;
  sections: SettingsPageSectionDef[];
};

export const SETTINGS_PAGE_GROUPS: SettingsPageGroupDef[] = [
  {
    id: 'storage-connection',
    title: '저장소 및 연결',
    sections: [
      { id: 'settings-desktop-entry-lock', label: '앱 입장 잠금', visible: (ctx) => ctx.isDesktopApp },
      { id: 'settings-storage', label: '기본 저장소 선택' },
      { id: 'settings-s3', label: 'S3 연결 정보' },
      { id: 'settings-webdav', label: 'WebDAV 연결 정보' },
      { id: 'settings-local', label: 'Local 연결 정보' },
      { id: 'settings-backup', label: '데이터 백업/복원' },
      { id: 'settings-webauthn', label: '지문 / 보안 키', visible: (ctx) => ctx.showWebAuthnSection },
      { id: 'settings-storage-usage', label: '저장소 사용량', visible: (ctx) => ctx.canScanStorageUsage },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    sections: [
      { id: 'settings-llm-providers', label: 'AI 도우미 제공자' },
      { id: 'settings-mlx-lm', label: 'MLX-LM', visible: () => isTauriMacOS() },
    ],
  },
  {
    id: 'integrations',
    title: '외부 연동',
    sections: [
      { id: 'settings-unused-images', label: '미사용 / 중복 이미지' },
      { id: 'settings-imgbb', label: 'ImgBB' },
      { id: 'settings-og', label: 'Open Graph Worker' },
    ],
  },
  {
    id: 'editor-content',
    title: '에디터 및 콘텐츠',
    sections: [
      { id: 'settings-editor', label: '마크다운 에디터' },
      { id: 'settings-snippets', label: '스니펫 단축키' },
      { id: 'settings-table-styles', label: '표 스타일' },
      { id: 'settings-cover', label: '커버' },
      { id: 'settings-webfonts', label: '웹폰트' },
    ],
  },
  {
    id: 'search',
    title: '검색',
    sections: [{ id: 'settings-advanced-search', label: 'Advanced Search' }],
  },
  {
    id: 'ui-navigation',
    title: 'UI 및 네비게이션',
    sections: [
      { id: 'settings-navigation', label: '네비게이션' },
      { id: 'settings-display', label: '표시 옵션' },
      { id: 'settings-wiki-image', label: '위키 이미지 캐싱' },
    ],
  },
  {
    id: 'chat',
    title: '채팅',
    sections: [{ id: 'settings-chat', label: '나와의 채팅' }],
  },
  {
    id: 'app',
    title: '앱',
    sections: [{ id: 'settings-app-update', label: '앱 업데이트' }],
  },
];

const LLM_SECTION_HASHES = new Set([
  'settings-llm-providers',
  'settings-llm-provider',
  'settings-gemini',
  'settings-openai-compat',
  'settings-mlx-lm',
]);

export function buildVisibleSettingsPageGroups(ctx: SettingsPageCatalogContext) {
  return SETTINGS_PAGE_GROUPS.map((group) => ({
    ...group,
    sections: group.sections.filter((section) => section.visible?.(ctx) !== false),
  })).filter((group) => group.sections.length > 0);
}

export function findSettingsGroupIdForSection(sectionId: string): string | null {
  for (const group of SETTINGS_PAGE_GROUPS) {
    if (group.sections.some((section) => section.id === sectionId)) {
      return group.id;
    }
  }
  return null;
}

export const SETTINGS_SECTION_OPEN_EVENT = 's3haim-settings-section-open';

export function dispatchSettingsSectionOpen(sectionId: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(SETTINGS_SECTION_OPEN_EVENT, { detail: { sectionId } }),
  );
}

export function resolveSettingsScrollTarget(hash: string): string {
  const id = String(hash || '').replace(/^#/, '');
  if (LLM_SECTION_HASHES.has(id) && id !== 'settings-mlx-lm') {
    return 'settings-llm-providers';
  }
  return id;
}

export function createDefaultSettingsGroupOpenState(defaultOpen = true): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const group of SETTINGS_PAGE_GROUPS) {
    out[group.id] = defaultOpen;
  }
  return out;
}

/** Filter TOC groups/sections by group title or section label (case-insensitive). */
export function filterSettingsPageGroups(
  groups: SettingsPageGroupDef[],
  query: string,
): SettingsPageGroupDef[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return groups;

  const filtered: SettingsPageGroupDef[] = [];
  for (const group of groups) {
    const groupMatches = group.title.toLowerCase().includes(normalized);
    const sections = groupMatches
      ? group.sections
      : group.sections.filter((section) => section.label.toLowerCase().includes(normalized));
    if (sections.length === 0) continue;
    filtered.push({ ...group, sections });
  }
  return filtered;
}
