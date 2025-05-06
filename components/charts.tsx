"use client"

import { useTheme } from "next-themes"
import {
  Line,
  Bar,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  AreaChart as RechartsAreaChart,
} from "recharts"

const data = [
  {
    name: "Jan",
    total: 2400,
    revenue: 1400,
    users: 240,
  },
  {
    name: "Feb",
    total: 1398,
    revenue: 980,
    users: 139,
  },
  {
    name: "Mar",
    total: 9800,
    revenue: 3908,
    users: 980,
  },
  {
    name: "Apr",
    total: 3908,
    revenue: 4800,
    users: 390,
  },
  {
    name: "May",
    total: 4800,
    revenue: 3800,
    users: 480,
  },
  {
    name: "Jun",
    total: 3800,
    revenue: 4300,
    users: 380,
  },
  {
    name: "Jul",
    total: 4300,
    revenue: 5300,
    users: 430,
  },
  {
    name: "Aug",
    total: 5300,
    revenue: 4300,
    users: 530,
  },
  {
    name: "Sep",
    total: 4300,
    revenue: 3800,
    users: 430,
  },
  {
    name: "Oct",
    total: 3800,
    revenue: 4800,
    users: 380,
  },
  {
    name: "Nov",
    total: 4800,
    revenue: 3908,
    users: 480,
  },
  {
    name: "Dec",
    total: 3908,
    revenue: 2400,
    users: 390,
  },
]

interface LineChartProps {
  dataPoints?: number[];
  color?: string;
}

export function LineChart({ dataPoints, color = '#8884d8' }: LineChartProps = {}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Convert dataPoints to expected format if provided
  const chartData = dataPoints 
    ? dataPoints.map((value, index) => ({
        name: `Point ${index + 1}`,
        value: value,
      }))
    : data;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsLineChart
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
        <XAxis dataKey="name" stroke={isDark ? "#888" : "#888"} />
        <YAxis stroke={isDark ? "#888" : "#888"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#333" : "#fff",
            border: `1px solid ${isDark ? "#444" : "#ddd"}`,
            color: isDark ? "#fff" : "#333",
          }}
        />
        <Legend />
        {dataPoints 
          ? <Line type="monotone" dataKey="value" stroke={color} activeDot={{ r: 8 }} /> 
          : (
            <>
              <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </>
          )
        }
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function BarChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
        <XAxis dataKey="name" stroke={isDark ? "#888" : "#888"} />
        <YAxis stroke={isDark ? "#888" : "#888"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#333" : "#fff",
            border: `1px solid ${isDark ? "#444" : "#ddd"}`,
            color: isDark ? "#fff" : "#333",
          }}
        />
        <Legend />
        <Bar dataKey="users" fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function AreaChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsAreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
        <XAxis dataKey="name" stroke={isDark ? "#888" : "#888"} />
        <YAxis stroke={isDark ? "#888" : "#888"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#333" : "#fff",
            border: `1px solid ${isDark ? "#444" : "#ddd"}`,
            color: isDark ? "#fff" : "#333",
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
