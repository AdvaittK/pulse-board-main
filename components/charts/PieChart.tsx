'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Import Chart component with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface PieChartProps {
  chartData: number[];
  chartOptions: ApexOptions;
}

const PieChart = (props: PieChartProps) => {
  const { chartData, chartOptions } = props;

  return (
    <Chart
      options={chartOptions}
      type="pie"
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default PieChart;