/**
 * Cross-domain orchestration glue (open/save/CRUD handlers, URL sync).
 * Domain React state is owned by App*StateProvider / RecordingProvider / WorkspaceTabsProvider.
 * Prefer moving remaining handlers into domain modules until this file is obsolete.
 */
export {
  useMainAppController as useAppOrchestration,
  useMainAppController,
} from '@/App/providers/useMainAppController';
