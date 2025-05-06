'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Import Chart component with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface BarChartProps {
  chartData: any[];
  chartOptions: ApexOptions;
}

const BarChart = (props: BarChartProps) => {
  const { chartData, chartOptions } = props;

  return (
    <Chart
      options={chartOptions}
      type="bar"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default BarChart;