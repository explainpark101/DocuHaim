/**
 * Compose-only orchestration entry.
 * Handler bodies: use*Domain modules; shared state: useAppLogicSharedState.
 */
export { useAppLogicSharedState as useAppOrchestration } from '@/App/hooks/useAppLogicSharedState';
