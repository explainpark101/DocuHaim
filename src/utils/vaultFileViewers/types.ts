/**
 * Registry for vault text viewers and composite formats
 * (e.g. `.kanban.json`, future `.slide.md`).
 *
 * Generic extension fallbacks (`.json` → json, `.md` → markdown) stay outside;
 * register only formats that override those defaults or need custom seed/icon.
 */

export type VaultViewerFamily = 'json' | 'markdown';

export type VaultTreeIconId = 'kanban' | 'quiz' | 'default';

export type SpecialVaultFormat = {
  /** Stable id (often matches CREATE_FILE_FORMATS id). */
  id: string;
  /** Full extension including leading dot; longest match wins. */
  extension: string;
  /** Which generic family this composite belongs to. */
  family: VaultViewerFamily;
  /** EditorPane / file-session viewer id. */
  viewer: string;
  /** MIME used on create/save. */
  contentType: string;
  /** Participates in dirty/save pipeline. */
  editable: boolean;
  /** Pretty-print JSON on open when body is small enough. */
  prettyJsonOnOpen?: boolean;
  /** Sidebar / tab icon hint. */
  treeIcon?: VaultTreeIconId;
  /** Optional seed body when creating via CreateItemModal. */
  createSeed?: () => string;
};

/** Built-in editable viewers (non-composite + specials add more via registry). */
export const BASE_EDITABLE_VIEWERS = [
  'markdown',
  'json',
  'raw',
  'html',
  'svg',
] as const;

export type BaseEditableViewer = (typeof BASE_EDITABLE_VIEWERS)[number];
