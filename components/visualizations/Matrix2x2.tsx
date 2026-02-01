import React from 'react';

export interface Matrix2x2Data {
  title: string;
  xAxis: { label: string; low: string; high: string };
  yAxis: { label: string; low: string; high: string };
  quadrants: {
    topLeft: { label: string; color: string };
    topRight: { label: string; color: string };
    bottomLeft: { label: string; color: string };
    bottomRight: { label: string; color: string };
  };
  items: {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    color?: string;
  }[];
}

export const Matrix2x2: React.FC<{ data: Matrix2x2Data }> = ({ data }) => {
  return (
    <div className="relative w-full aspect-square max-w-xl">
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-[var(--text-tertiary)]">
        {data.xAxis.label}
      </div>
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-[var(--text-tertiary)]">
        {data.yAxis.label}
      </div>

      <div className="grid grid-cols-2 grid-rows-2 w-full h-full border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
        {Object.entries(data.quadrants).map(([key, quadrant]) => (
          <div
            key={key}
            className="relative flex items-center justify-center p-4"
            style={{ backgroundColor: `${quadrant.color}12` }}
          >
            <span className="text-xs font-medium text-[var(--text-tertiary)] absolute top-2 left-2">
              {quadrant.label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${item.x}%`, bottom: `${item.y}%` }}
          >
            <div
              className="rounded-full flex items-center justify-center text-[10px] font-semibold text-white shadow-soft"
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                backgroundColor: item.color || 'var(--accent-primary)'
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-3">
        <span>{data.xAxis.low}</span>
        <span>{data.xAxis.high}</span>
      </div>
    </div>
  );
};
