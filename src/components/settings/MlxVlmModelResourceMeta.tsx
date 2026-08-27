import {
  buildModelResourceSummary,
  feasibilityClassName,
  type MlxVlmFeasibility,
} from '@/utils/llm/mlxVlmModelSizing';
import type { HfModelSearchHit } from '@/utils/mlxVlmHuggingFace';

type MlxVlmModelResourceMetaProps = {
  hit: Pick<HfModelSearchHit, 'diskBytes' | 'estimatedRamBytes' | 'feasibility' | 'downloads'>;
  className?: string;
};

export default function MlxVlmModelResourceMeta({ hit, className = '' }: MlxVlmModelResourceMetaProps) {
  const summary = buildModelResourceSummary(hit);
  const feasibility = (hit.feasibility ?? 'unknown') as MlxVlmFeasibility;
  const downloadLine =
    hit.downloads != null ? `${hit.downloads.toLocaleString()} downloads` : null;

  return (
    <div className={`space-y-0.5 text-[10px] leading-snug ${className}`.trim()}>
      {downloadLine ? (
        <div className="text-gray-500 dark:text-odp-muted">{downloadLine}</div>
      ) : null}
      {summary ? (
        <div className={feasibilityClassName(feasibility)}>{summary}</div>
      ) : (
        <div className="text-gray-500 dark:text-odp-muted">용량 정보 불러오는 중…</div>
      )}
    </div>
  );
}
