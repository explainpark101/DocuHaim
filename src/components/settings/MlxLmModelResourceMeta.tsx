import {
  buildModelResourceSummary,
  feasibilityClassName,
  type MlxLmFeasibility,
} from '@/utils/llm/mlxLmModelSizing';
import type { HfModelSearchHit } from '@/utils/mlxLmHuggingFace';

type MlxLmModelResourceMetaProps = {
  hit: Pick<HfModelSearchHit, 'diskBytes' | 'estimatedRamBytes' | 'feasibility' | 'downloads'>;
  className?: string;
};

export default function MlxLmModelResourceMeta({ hit, className = '' }: MlxLmModelResourceMetaProps) {
  const summary = buildModelResourceSummary(hit);
  const feasibility = (hit.feasibility ?? 'unknown') as MlxLmFeasibility;
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
