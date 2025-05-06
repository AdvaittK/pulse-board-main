// Static data for dashboard components
export const userData = {
  totalUsers: 12548,
  activeUsers: 8721,
  newUsers: {
    count: 487,
    percentChange: 12.4
  },
  usersByCountry: [
    { id: "USA", label: "USA", value: 4235 },
    { id: "UK", label: "UK", value: 2112 },
    { id: "Canada", label: "Canada", value: 1865 },
    { id: "Australia", label: "Australia", value: 987 },
    { id: "Germany", label: "Germany", value: 854 }
  ]
};

export const revenueData = {
  totalRevenue: 528943.21,
  monthlyRevenue: 48721.45,
  percentChange: 8.7,
  byMonth: [
    { date: "2025-01", amount: 42652.31 },
    { date: "2025-02", amount: 43721.89 },
    { date: "2025-03", amount: 47568.21 },
    { date: "2025-04", amount: 48721.45 },
    { date: "2025-05", amount: 0 } // Current month (partial)
  ]
};

export const subscriptionData = {
  totalSubscriptions: 8452,
  activeSubscriptions: 7865,
  churnRate: 3.2,
  plans: [
    { name: "Basic", count: 3241, revenue: 32410 },
    { name: "Pro", count: 2984, revenue: 149200 },
    { name: "Enterprise", count: 1640, revenue: 328000 }
  ],
  byMonth: [
    { date: "2025-01", count: 8012 },
    { date: "2025-02", count: 8145 },
    { date: "2025-03", count: 8321 },
    { date: "2025-04", count: 8452 }
  ]
};

export const activityData = {
  dailyActiveUsers: 6532,
  weeklyActiveUsers: 8124,
  monthlyActiveUsers: 9847,
  activityByHour: [
    { hour: "00:00", users: 1254 },
    { hour: "02:00", users: 842 },
    { hour: "04:00", users: 421 },
    { hour: "06:00", users: 985 },
    { hour: "08:00", users: 2541 },
    { hour: "10:00", users: 3854 },
    { hour: "12:00", users: 4125 },
    { hour: "14:00", users: 3987 },
    { hour: "16:00", users: 3541 },
    { hour: "18:00", users: 2854 },
    { hour: "20:00", users: 2541 },
    { hour: "22:00", users: 1854 }
  ]
};

export const performanceData = {
  averageLoadTime: 1.24,
  serverUptime: 99.98,
  errorRate: 0.12,
  apiCalls: 1458752,
  byEndpoint: [
    { name: "/api/users", calls: 452145, avgTime: 0.87 },
    { name: "/api/products", calls: 321456, avgTime: 1.12 },
    { name: "/api/orders", calls: 245123, avgTime: 1.34 },
    { name: "/api/subscriptions", calls: 198745, avgTime: 1.05 },
    { name: "/api/analytics", calls: 184521, avgTime: 1.42 }
  ]
};

// Dashboard card data
export const dashboardCards = [
  { 
    title: "Total Users", 
    value: userData.totalUsers.toLocaleString(), 
    change: "+12.4%",
    trend: "up" 
  },
  { 
    title: "Revenue", 
    value: `$${revenueData.totalRevenue.toLocaleString()}`, 
    change: "+8.7%",
    trend: "up" 
  },
  { 
    title: "Active Subscriptions", 
    value: subscriptionData.activeSubscriptions.toLocaleString(), 
    change: "+5.2%",
    trend: "up" 
  },
  { 
    title: "Avg. Load Time", 
    value: `${performanceData.averageLoadTime}s`, 
    change: "-0.12s",
    trend: "down" 
  },
];

// Sample line chart data
export const lineChartData = [
  {
    id: "Users",
    data: [
      { x: "Jan", y: 10250 },
      { x: "Feb", y: 10825 },
      { x: "Mar", y: 11402 },
      { x: "Apr", y: 12100 },
      { x: "May", y: 12548 }
    ]
  },
  {
    id: "Revenue",
    data: [
      { x: "Jan", y: 42652 },
      { x: "Feb", y: 43721 },
      { x: "Mar", y: 47568 },
      { x: "Apr", y: 48721 },
      { x: "May", y: 46823 }
    ]
  }
];

// Sample bar chart data
export const barChartData = [
  { name: "Basic", value: 3241 },
  { name: "Pro", value: 2984 },
  { name: "Enterprise", value: 1640 },
  { name: "Custom", value: 587 }
];

// Sample pie chart data
export const pieChartData = [
  { id: "USA", label: "USA", value: 45 },
  { id: "UK", label: "UK", value: 20 },
  { id: "Canada", label: "Canada", value: 15 },
  { id: "Australia", label: "Australia", value: 10 },
  { id: "Other", label: "Other", value: 10 }
];