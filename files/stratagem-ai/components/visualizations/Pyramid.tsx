import React from 'react';

export interface PyramidData {
  title: string;
  levels: { label: string; value?: string; color?: string }[];
}

export const Pyramid: React.FC<{ data: PyramidData }> = ({ data }) => {
  return (
    <div className="space-y-3">
      {data.levels.map((level, index) => (
        <div
          key={`${level.label}-${index}`}
          className="rounded-xl px-4 py-3 text-sm font-medium"
          style={{
            backgroundColor: level.color || 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
        >
          <div className="flex items-center justify-between">
            <span>{level.label}</span>
            {level.value ? <span className="text-xs text-[var(--text-tertiary)]">{level.value}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
};
