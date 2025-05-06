import { ApexOptions } from 'apexcharts';

type ApexGeneric = ApexOptions & any;

export const barChartDataDailyTraffic = [
  {
    name: 'Daily Traffic',
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

export const barChartOptionsDailyTraffic: ApexGeneric = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['00', '04', '08', '12', '14', '16', '18'],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: '#4318FF',
            opacity: 1,
          },
          {
            offset: 100,
            color: 'rgba(67, 24, 255, 1)',
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '40px',
    },
  },
};

export const pieChartOptions: ApexGeneric = {
  labels: ['Your files', 'System', 'Empty'],
  colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  chart: {
    width: '50px',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
  },
};

export const pieChartData = [63, 25, 12];

export const barChartDataWeeklyRevenue = [
  {
    name: 'PRODUCT A',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    color: '#6AD2Fa',
  },
  {
    name: 'PRODUCT B',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    color: '#4318FF',
  },
  {
    name: 'PRODUCT C',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    color: '#EFF4FB',
  },
];

export const barChartOptionsWeeklyRevenue: ApexGeneric = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    theme: 'dark',
    onDatasetHover: {
      highlightDataSeries: true,
    },
  },
  xaxis: {
    categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: false,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
  },

  grid: {
    borderColor: 'rgba(163, 174, 208, 0.3)',
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
  },
  legend: {
    show: false,
  },
  colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '20px',
    },
  },
};

export const lineChartDataTotalSpent = [
  {
    name: 'Revenue',
    data: [50, 64, 48, 66, 49, 68],
    color: '#4318FF',
  },
  {
    name: 'Profit',
    data: [30, 40, 24, 46, 20, 46],
    color: '#6AD2FF',
  },
];

export const lineChartOptionsTotalSpent = {
  legend: {
    show: false,
  },

  theme: {
    mode: 'light',
  },
  chart: {
    type: 'line',

    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },

  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    theme: 'dark',
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
        fontWeight: '500',
      },
    },
    type: 'text',
    range: undefined,
    categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
  },

  yaxis: {
    show: false,
  },
};

// Table Data
export const tableDataCheck = [
  {
    name: ['Marketplace', true],
    progress: '75.5%',
    quantity: 2458,
    date: '12 Jan 2025',
  },
  {
    name: ['Venus DB PRO', true],
    progress: '35.4%',
    quantity: 1485,
    date: '21 Feb 2025',
  },
  {
    name: ['Venus DS', false],
    progress: '25%',
    quantity: 1024,
    date: '13 Mar 2025',
  },
  {
    name: ['Venus 3D Asset', true],
    progress: '100%',
    quantity: 858,
    date: '24 Jan 2025',
  },
  {
    name: ['Horizon UI Dashboard', false],
    progress: '87.5%',
    quantity: 258,
    date: '17 Apr 2025',
  },
];

export const tableDataComplex = [
  {
    name: 'Horizon UI Dashboard',
    status: 'Approved',
    date: '18 Apr 2025',
    progress: 75.5,
  },
  {
    name: 'Venus Design System',
    status: 'Error',
    date: '12 Feb 2025',
    progress: 35.4,
  },
  {
    name: 'Marketplace Templates',
    status: 'Approved',
    date: '3 Mar 2025',
    progress: 85,
  },
  {
    name: 'Admin Dashboard',
    status: 'Disable',
    date: '25 Apr 2025',
    progress: 20,
  },
  {
    name: 'Venus 3D Asset',
    status: 'Approved',
    date: '19 Apr 2025',
    progress: 100,
  },
];