import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

export interface RadarChartData {
  title: string;
  metrics: { label: string; value: number }[];
}

export const RadarChart: React.FC<{ data: RadarChartData }> = ({ data }) => {
  const formatted = data.metrics.map((metric) => ({
    subject: metric.label,
    value: metric.value
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={formatted} outerRadius="70%">
          <PolarGrid stroke="var(--border-default)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} />
          <PolarRadiusAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
          <Radar dataKey="value" stroke="var(--accent-primary)" fill="rgba(15,23,42,0.2)" />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
