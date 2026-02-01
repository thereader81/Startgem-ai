import React from 'react';
import { Matrix2x2, type Matrix2x2Data } from './Matrix2x2';
import { RadarChart, type RadarChartData } from './RadarChart';
import { WaterfallChart, type WaterfallChartData } from './WaterfallChart';
import { Pyramid, type PyramidData } from './Pyramid';

export type ChartType = 'matrix-2x2' | 'radar' | 'waterfall' | 'pyramid';

export interface DynamicChartProps {
  chartType: ChartType;
  data: Matrix2x2Data | RadarChartData | WaterfallChartData | PyramidData;
}

export const DynamicChart: React.FC<DynamicChartProps> = ({ chartType, data }) => {
  switch (chartType) {
    case 'matrix-2x2':
      return <Matrix2x2 data={data as Matrix2x2Data} />;
    case 'radar':
      return <RadarChart data={data as RadarChartData} />;
    case 'waterfall':
      return <WaterfallChart data={data as WaterfallChartData} />;
    case 'pyramid':
      return <Pyramid data={data as PyramidData} />;
    default:
      return null;
  }
};
