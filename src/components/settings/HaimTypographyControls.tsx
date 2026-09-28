import { useState } from 'react';
import { Switch } from 'radix-ui';
import {
  filterHaimTypographyRuleDefs,
  type HaimTypographyRuleId,
  type HaimTypographyRules,
} from '@/utils/haimTypographySettings';
import {
  HaimTypographyStatusDot,
  haimTypographyStatusTone,
} from '@/components/settings/HaimTypographyStatusDot';
import HaimTypographySearchField from '@/components/settings/HaimTypographySearchField';

const switchOnClass =
  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-blue-500 bg-blue-500 shadow-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400';
const switchOffClass =
  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-gray-300 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-borderStrong';

type HaimTypographyControlsProps = {
  rules: HaimTypographyRules;
  onChange: (id: HaimTypographyRuleId, enabled: boolean) => void;
  compact?: boolean;
};

/**
 * Global Haim Typography input-rule toggles (each rule on/off).
 */
export default function HaimTypographyControls({
  rules,
  onChange,
  compact = false,
}: HaimTypographyControlsProps) {
  const [query, setQuery] = useState('');
  const filtered = filterHaimTypographyRuleDefs(query);

  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      <p className="text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
        WYSIWYG 입력 편의 치환입니다. 변환된 문자는 마크다운 저장본에 그대로
        들어갑니다. 문서 설정에서 문서별 덮어쓰기를 할 수 있습니다.
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1">
            <HaimTypographyStatusDot tone="on" />
            켜짐
          </span>
          <span className="inline-flex items-center gap-1">
            <HaimTypographyStatusDot tone="off" />
            꺼짐
          </span>
        </span>
      </p>
      <HaimTypographySearchField
        id="haim-typography-global-search"
        value={query}
        onChange={setQuery}
      />
      <ul className="max-h-72 divide-y divide-gray-200 overflow-y-auto dark:divide-odp-borderStrong">
        {filtered.length === 0 ? (
          <li className="py-3 text-center text-[11px] text-gray-500 dark:text-odp-muted">
            일치하는 규칙이 없습니다.
          </li>
        ) : (
          filtered.map((def) => {
            const enabled = rules[def.id];
            const tone = haimTypographyStatusTone(enabled);
            return (
              <li
                key={def.id}
                className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-odp-fg">
                    <HaimTypographyStatusDot tone={tone} />
                    {def.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                    {def.hint}
                  </p>
                </div>
                <Switch.Root
                  className={enabled ? switchOnClass : switchOffClass}
                  checked={enabled}
                  onCheckedChange={(next) => onChange(def.id, next)}
                  aria-label={def.label}
                >
                  <Switch.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]" />
                </Switch.Root>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
