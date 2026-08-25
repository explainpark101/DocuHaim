/**
 * Compose-only orchestration entry.
 * Handler bodies: use*Domain modules; shared state: useAppLogicSharedState.
 */
export {
  useAppLogicSharedState as useAppOrchestration,
  useAppLogicSharedState as useMainAppController,
} from '@/App/hooks/useAppLogicSharedState';
