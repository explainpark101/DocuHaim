/**
 * Cross-domain orchestration entry.
 * Domain React state + public handlers live in Vault/File/Tree/Tabs providers;
 * this impl still holds large open/save/CRUD bodies registered into those providers.
 * Follow-up: move registered bodies into use*Domain until this file is obsolete.
 */
export {
  useMainAppController as useAppOrchestration,
  useMainAppController,
} from '@/App/providers/useAppOrchestrationImpl';
