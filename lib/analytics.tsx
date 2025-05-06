import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import React from 'react'

// Chart configurations
export const chartConfig = {
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  margin: { top: 5, right: 30, left: 20, bottom: 5 },
}

// Line chart configuration
export const lineChartConfig = {
  ...chartConfig,
  components: {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  },
}

// Bar chart configuration
export const barChartConfig = {
  ...chartConfig,
  components: {
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  },
}

// Pie chart configuration
export const pieChartConfig = {
  ...chartConfig,
  components: {
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
  },
}

// Data types
interface UserActivityData {
  date: string
  activeUsers: number
  newRegistrations: number
  returningUsers: number
}

interface UserDemographicsData {
  name: string
  value: number
}

interface UserLocationsData {
  name: string
  value: number
}

// Mock data generators
export const generateUserActivityData = (days: number = 30): UserActivityData[] => {
  const data: UserActivityData[] = []
  const today = new Date()
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      activeUsers: Math.floor(Math.random() * 1000) + 500,
      newRegistrations: Math.floor(Math.random() * 100) + 20,
      returningUsers: Math.floor(Math.random() * 800) + 200,
    })
  }
  
  return data
}

export const generateUserDemographics = (): UserDemographicsData[] => {
  return [
    { name: '18-24', value: 25 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 20 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 5 },
  ]
}

export const generateUserLocations = (): UserLocationsData[] => {
  return [
    { name: 'الولايات المتحدة', value: 40 },
    { name: 'المملكة المتحدة', value: 20 },
    { name: 'كندا', value: 15 },
    { name: 'أستراليا', value: 10 },
    { name: 'أخرى', value: 15 },
  ]
}

// Chart components
interface UserActivityChartProps {
  data: UserActivityData[]
}

export const UserActivityChart: React.FC<UserActivityChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={chartConfig.margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="activeUsers"
          stroke={chartConfig.colors.primary}
          name="المستخدمون النشطون"
        />
        <Line
          type="monotone"
          dataKey="newRegistrations"
          stroke={chartConfig.colors.success}
          name="التسجيلات الجديدة"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface UserDemographicsChartProps {
  data: UserDemographicsData[]
}

export const UserDemographicsChart: React.FC<UserDemographicsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={chartConfig.colors.primary}
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

interface UserLocationsChartProps {
  data: UserLocationsData[]
}

export const UserLocationsChart: React.FC<UserLocationsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={chartConfig.margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value"
          fill={chartConfig.colors.secondary}
          name="عدد المستخدمين"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 