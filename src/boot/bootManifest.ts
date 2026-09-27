/**
 * Shared labels + types for boot splash progress (build manifest + runtime).
 */

export type BootManifestAsset = {
  /** Path relative to Vite base, e.g. `assets/index-xxxx.js` */
  file: string;
  bytes: number;
  label: string;
};

export type BootManifest = {
  version: 1;
  /** ISO timestamp when the manifest was generated */
  generatedAt: string;
  totalBytes: number;
  assets: BootManifestAsset[];
};

export const BOOT_MANIFEST_SCRIPT_ID = 'boot-manifest';

const LABEL_RULES: Array<{ re: RegExp; label: string }> = [
  { re: /earlyBoot/i, label: '시작 화면' },
  { re: /bootSplash/i, label: '진행률 UI' },
  { re: /vendor-react/i, label: 'React 런타임' },
  { re: /vendor-lucide/i, label: '아이콘' },
  { re: /vendor-aws/i, label: '스토리지 SDK' },
  { re: /vendor-motion/i, label: '애니메이션' },
  { re: /vendor-radix/i, label: 'UI 컴포넌트' },
  { re: /vendor-zip/i, label: '압축 유틸' },
  { re: /vendor-markdown-it/i, label: 'Markdown 엔진' },
  { re: /vendor-md-editor/i, label: '마크다운 에디터' },
  { re: /vendor-codemirror/i, label: '코드 에디터' },
  { re: /vendor-tiptap/i, label: 'Haim 에디터' },
  { re: /vendor-katex/i, label: '수식 렌더러' },
  { re: /vendor-mermaid/i, label: '다이어그램' },
  { re: /vendor-google-genai/i, label: 'AI SDK' },
  { re: /vendor-react-aria/i, label: '접근성 UI' },
  { re: /vendor-emoji/i, label: '이모지' },
  { re: /mdEditorConfig/i, label: '에디터 설정' },
  { re: /clipboardImageFiles/i, label: '에디터 확장' },
  { re: /index-.*\.css/i, label: '스타일시트' },
  { re: /assets\/index-[^/]+\.js/i, label: '앱 코어' },
  { re: /\/src\/main\./i, label: '앱 코어' },
  { re: /\/src\/boot\/earlyBoot/i, label: '시작 화면' },
  { re: /\.css$/i, label: '스타일시트' },
  { re: /\.js$/i, label: '스크립트' },
];

export function labelForBootFile(fileOrUrl: string): string {
  const path = (fileOrUrl.split('?')[0] || fileOrUrl).replace(/\\/g, '/');
  for (const { re, label } of LABEL_RULES) {
    if (re.test(path)) return label;
  }
  const name = path.split('/').pop() || path;
  return name.length > 36 ? `${name.slice(0, 34)}…` : name;
}

export function formatBootBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
