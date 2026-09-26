/**
 * Engine-agnostic helpers for Advanced Search editor action registration.
 * Engines call registerEditorActions directly; this module documents the contract.
 */

export {
  registerEditorActions,
  runEditorAction,
  hasEditorActions,
  type EditorActionId,
  type EditorActionHandler,
} from '@/utils/advancedSearch/editorActions';
