import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export interface WaterfallItem {
  label: string;
  value: number;
  type: 'start' | 'increase' | 'decrease' | 'total';
}

export interface WaterfallChartData {
  title: string;
  items: WaterfallItem[];
}

const colorMap = {
  start: 'var(--accent-primary)',
  increase: 'var(--success)',
  decrease: 'var(--danger)',
  total: 'var(--accent-gold)'
};

export const WaterfallChart: React.FC<{ data: WaterfallChartData }> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.items} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} />
          <Tooltip
            cursor={{ fill: 'rgba(15,23,42,0.04)' }}
            contentStyle={{
              borderRadius: 12,
              borderColor: 'var(--border-subtle)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.items.map((item, index) => (
              <Cell key={`cell-${index}`} fill={colorMap[item.type]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
