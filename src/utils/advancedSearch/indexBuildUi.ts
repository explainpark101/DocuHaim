import type { EngineStatus } from '@/utils/advancedSearch/engine';

/** True while file/chat workers are still running (stop is meaningful). */
export function isIndexBuildIndexing(status: EngineStatus): boolean {
  return status.building && status.indexBuildCancellable;
}

/** True during final vault persist after progress reached 100%. */
export function isIndexBuildSaving(status: EngineStatus): boolean {
  return status.building && !status.indexBuildCancellable;
}

export function canStopIndexBuild(status: EngineStatus): boolean {
  return isIndexBuildIndexing(status);
}

export function canStartIndexRebuild(
  status: EngineStatus,
  localBusy = false,
): boolean {
  if (localBusy) return false;
  if (!status.enabled) return false;
  if (!status.isolationReady) return false;
  return !isIndexBuildIndexing(status);
}

export function indexRebuildButtonLabel(status: EngineStatus): string {
  if (isIndexBuildIndexing(status) || isIndexBuildSaving(status)) {
    if (typeof status.buildProgress === 'number') {
      return `색인 중 ${Math.round(status.buildProgress * 100)}%`;
    }
    return '색인 중…';
  }
  if (status.hasCheckpoint) return '색인 재개/다시 시작';
  if (status.hasIndex) return '다시 색인';
  return '색인';
}
