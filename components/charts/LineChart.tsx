'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React from 'react';

// Import Chart component with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface LineChartProps {
  chartData: any[];
  chartOptions: ApexOptions;
}

const LineChart = (props: LineChartProps) => {
  const { chartData, chartOptions } = props;

  return (
    <Chart
      options={chartOptions}
      type="line"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default LineChart;