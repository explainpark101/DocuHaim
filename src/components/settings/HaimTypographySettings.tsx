import { useEffect, useState } from 'react';
import HaimTypographyControls from '@/components/settings/HaimTypographyControls';
import {
  HAIM_TYPOGRAPHY_CHANGED_EVENT,
  loadHaimTypographyGlobal,
  saveHaimTypographyGlobalRule,
  type HaimTypographyRules,
} from '@/utils/haimTypographySettings';

/**
 * Settings page block: global Haim Typography input-rule preferences.
 */
export default function HaimTypographySettings() {
  const [rules, setRules] = useState<HaimTypographyRules>(() =>
    loadHaimTypographyGlobal(),
  );

  useEffect(() => {
    const sync = () => setRules(loadHaimTypographyGlobal());
    window.addEventListener(HAIM_TYPOGRAPHY_CHANGED_EVENT, sync);
    return () => window.removeEventListener(HAIM_TYPOGRAPHY_CHANGED_EVENT, sync);
  }, []);

  return (
    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-odp-borderStrong">
      <p className="mb-2 text-xs font-medium text-gray-700 dark:text-odp-fg">
        Haim Typography 입력 편의
      </p>
      <HaimTypographyControls
        rules={rules}
        onChange={(id, enabled) => {
          saveHaimTypographyGlobalRule(id, enabled);
          setRules(loadHaimTypographyGlobal());
        }}
      />
    </div>
  );
}
