'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Import Chart component with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface LineAreaChartProps {
  chartData?: any[];
  chartOptions?: ApexOptions;
  // New props structure
  data?: { x: string; y: number; }[];
  color?: string;
  yAxisLabel?: string;
  tooltipFormat?: (value: number) => string;
}

const LineAreaChart = (props: LineAreaChartProps) => {
  const { chartData, chartOptions, data, color = '#8884d8', yAxisLabel, tooltipFormat } = props;

  // If using the new props structure, convert to ApexCharts format
  if (data) {
    const series = [{
      name: yAxisLabel || 'Value',
      data: data.map(item => item.y),
      color: color
    }];

    const options: ApexOptions = {
      chart: {
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      colors: [color],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      xaxis: {
        categories: data.map(item => item.x),
        labels: {
          style: {
            colors: '#888',
          },
        },
      },
      yaxis: {
        title: {
          text: yAxisLabel || '',
        },
        labels: {
          style: {
            colors: '#888',
          },
          formatter: function(value) {
            return tooltipFormat ? tooltipFormat(value) : value.toString();
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(value) {
            return tooltipFormat ? tooltipFormat(value) : value.toString();
          }
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5,
      },
    };

    return (
      <Chart
        options={options}
        type="area"
        width="100%"
        height="100%"
        series={series}
      />
    );
  }

  // If using the original props structure
  return (
    <Chart
      options={chartOptions || {}}
      type="area"
      width="100%"
      height="100%"
      series={chartData || []}
    />
  );
};

export default LineAreaChart;