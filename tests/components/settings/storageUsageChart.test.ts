import { describe, expect, it } from 'vitest';
import {
  STORAGE_CHART_PALETTE,
  withChartColors,
} from '@/components/settings/StorageUsageChart';

describe('withChartColors', () => {
  it('assigns palette fills when fill is omitted', () => {
    const rows = withChartColors([
      { name: 'a', value: 10 },
      { name: 'b', value: 20 },
    ]);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.fill).toBe(STORAGE_CHART_PALETTE[0]);
    expect(rows[1]?.fill).toBe(STORAGE_CHART_PALETTE[1]);
  });

  it('preserves explicit fill', () => {
    const rows = withChartColors([{ name: 'x', value: 1, fill: '#111111' }]);
    expect(rows[0]?.fill).toBe('#111111');
  });

  it('cycles palette for long lists', () => {
    const rows = withChartColors(
      Array.from({ length: STORAGE_CHART_PALETTE.length + 2 }, (_, i) => ({
        name: `n${i}`,
        value: i + 1,
      })),
    );
    const last = rows[rows.length - 1];
    expect(last?.fill).toBe(STORAGE_CHART_PALETTE[1]);
  });
});
