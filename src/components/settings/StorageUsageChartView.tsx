/**
 * Recharts view for storage usage (lazy chunk).
 */

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { StorageUsageChartDatum, StorageUsageChartKind } from './StorageUsageChart';
import { formatStorageBytes } from '@/utils/storageUsageAnalysis';

type Colored = StorageUsageChartDatum & { fill: string };

type Props = {
  kind: StorageUsageChartKind;
  data: Colored[];
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; payload?: Colored }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0];
  const name = row?.name ?? row?.payload?.name ?? '';
  const value = Number(row?.value ?? 0);
  return (
    <div className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg">
      <div className="font-semibold">{name}</div>
      <div className="tabular-nums text-gray-600 dark:text-odp-muted">
        {formatStorageBytes(value)}
      </div>
    </div>
  );
}

export default function StorageUsageChartView({ kind, data }: Props) {
  // Explicit height: percentage + flex parents often collapse on Android WebView.
  const chartHeight = 176;

  if (kind === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={48}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            width={44}
            tickFormatter={(v) => formatStorageBytes(Number(v))}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {data.map((entry) => (
              <Cell key={`bar-${entry.name}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  const innerRadius = kind === 'donut' ? '52%' : 0;
  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius="78%"
          paddingAngle={1}
          stroke="transparent"
        >
          {data.map((entry) => (
            <Cell key={`slice-${entry.name}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={28}
          wrapperStyle={{ fontSize: 10 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
