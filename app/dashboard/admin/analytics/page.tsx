"use client"

import React, { useEffect, useState } from "react"
import { MdAnalytics } from "react-icons/md"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays, subDays, startOfMonth, endOfMonth, subMonths, differenceInDays } from "date-fns"
import LineChart from "@/components/charts/LineChart"
import BarChart from "@/components/charts/BarChart"
import PieChart from "@/components/charts/PieChart"
import { BarChart3, Calendar as CalendarIcon, Clock, Filter, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Mock data for analytics
const userActivityData = [
  { date: "2023-01-01", activeUsers: 100, newRegistrations: 20 },
  { date: "2023-01-02", activeUsers: 120, newRegistrations: 25 },
  { date: "2023-01-03", activeUsers: 150, newRegistrations: 30 },
  { date: "2023-01-04", activeUsers: 180, newRegistrations: 35 },
  { date: "2023-01-05", activeUsers: 200, newRegistrations: 40 },
]

const conversionData = [
  { date: "2023-01-01", visitors: 500, conversions: 25, rate: 5 },
  { date: "2023-01-02", visitors: 550, conversions: 30, rate: 5.5 },
  { date: "2023-01-03", visitors: 600, conversions: 36, rate: 6 },
  { date: "2023-01-04", visitors: 700, conversions: 49, rate: 7 },
  { date: "2023-01-05", visitors: 800, conversions: 64, rate: 8 },
]

const usageByFeatureData = [
  { name: "Dashboard", value: 35 },
  { name: "Data Feeds", value: 25 },
  { name: "Reports", value: 20 },
  { name: "Settings", value: 15 },
  { name: "Profile", value: 5 },
]

export default function AdminAnalyticsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(), to: new Date() })
  const [timeframe, setTimeframe] = useState("week")
  const [activeComparison, setActiveComparison] = useState("previous")

  useEffect(() => {
    // Check if user is admin
    if (user?.role !== "admin") {
      router.push("/dashboard")
      return
    }
    
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [user, router])

  // Function to apply preset date ranges
  const applyPresetRange = (preset: string) => {
    const today = new Date()
    
    switch (preset) {
      case "today":
        setDateRange({ from: today, to: today })
        setTimeframe("day")
        break
      case "yesterday":
        const yesterday = subDays(today, 1)
        setDateRange({ from: yesterday, to: yesterday })
        setTimeframe("day")
        break
      case "last7":
        setDateRange({ from: subDays(today, 6), to: today })
        setTimeframe("week")
        break
      case "last30":
        setDateRange({ from: subDays(today, 29), to: today })
        setTimeframe("month")
        break
      case "thisMonth":
        setDateRange({ from: startOfMonth(today), to: today })
        setTimeframe("month")
        break
      case "lastMonth":
        const lastMonth = subMonths(today, 1)
        setDateRange({ 
          from: startOfMonth(lastMonth), 
          to: endOfMonth(lastMonth) 
        })
        setTimeframe("month")
        break
      default:
        break
    }
  }

  // Get formatted date range display
  const getDateRangeText = () => {
    if (!dateRange?.from) return "Select dates"
    
    if (!dateRange.to) {
      return format(dateRange.from, "MMM d, yyyy")
    }
    
    if (format(dateRange.from, "MMM yyyy") === format(dateRange.to, "MMM yyyy")) {
      return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "d, yyyy")}`
    }
    
    return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
  }
  
  // Get the number of days in the selected range
  const getDaysCount = () => {
    if (!dateRange?.from || !dateRange?.to) return 0
    return differenceInDays(dateRange.to, dateRange.from) + 1
  }

  // Configure chart options and data
  const lineChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: ["#4318FF", "#39B8FF"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      shape: "circle" as "circle",
      radius: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: "category" as "category",
      categories: userActivityData.map(item => item.date),
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
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
      show: true,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      borderColor: "#A3AED0",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      theme: "dark",
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
    legend: {
      show: true,
      position: "top" as "top",
    }
  }

  const lineChartData = [
    {
      name: "Active Users",
      data: userActivityData.map(item => item.activeUsers),
    },
    {
      name: "New Registrations",
      data: userActivityData.map(item => item.newRegistrations),
    },
  ]

  const barChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#6C5DD3", "#FFB547"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    xaxis: {
      type: "category" as "category",
      categories: conversionData.map(item => item.date),
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
      position: "top" as "top", // Ensure the value matches the expected type
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      theme: "dark",
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  }

  const barChartData = [
    {
      name: "Visitors",
      data: conversionData.map(item => item.visitors),
    },
    {
      name: "Conversions",
      data: conversionData.map(item => item.conversions),
    },
  ]

  const pieChartOptions = {
    labels: usageByFeatureData.map(item => item.name),
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB", "#de4e96", "#f6c845"],
    chart: {
      width: "100%",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom" as "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      theme: "dark",
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  }

  const pieChartData = usageByFeatureData.map(item => item.value)

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          User engagement, conversion rates, and system performance metrics
        </p>
      </div>

      {/* Date Range and Timeframe Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-card rounded-lg border shadow-sm p-4">
        <div className="md:col-span-1 flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Timeframe</h3>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2">
            <Button size="sm" variant="outline" className="w-full">Apply Filter</Button>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Compare with</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={activeComparison === "previous" ? "default" : "outline"}
                onClick={() => setActiveComparison("previous")}
                className="flex-1"
              >
                Previous Period
              </Button>
              <Button 
                size="sm" 
                variant={activeComparison === "year" ? "default" : "outline"}
                onClick={() => setActiveComparison("year")}
                className="flex-1"
              >
                Year Ago
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Date Range</h3>
            <div className="bg-background rounded-md p-2">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="mx-auto"
                numberOfMonths={1}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Presets</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" onClick={() => applyPresetRange("today")}>
                  Today
                </Button>
                <Button size="sm" variant="outline" onClick={() => applyPresetRange("yesterday")}>
                  Yesterday
                </Button>
                <Button size="sm" variant="outline" onClick={() => applyPresetRange("last7")}>
                  Last 7 Days
                </Button>
                <Button size="sm" variant="outline" onClick={() => applyPresetRange("last30")}>
                  Last 30 Days
                </Button>
                <Button size="sm" variant="outline" onClick={() => applyPresetRange("thisMonth")}>
                  This Month
                </Button>
                <Button size="sm" variant="outline" onClick={() => applyPresetRange("lastMonth")}>
                  Last Month
                </Button>
              </div>
            </div>
            
            <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-md p-3 border border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-1 mb-2">
                <CalendarIcon className="h-3.5 w-3.5" />
                Selected Range
              </h3>
              <div className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                {getDateRangeText()}
              </div>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {getDaysCount()} day{getDaysCount() !== 1 ? 's' : ''}
                </Badge>
                <Badge variant="outline" className="bg-white/80 dark:bg-gray-900/80 flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" /> {(12582 * getDaysCount() / 30).toFixed(0)} events
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 dark:text-blue-400 text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-300">12,583</div>
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">↑ 12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-700 dark:text-purple-400 text-lg">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-300">1,482</div>
            <p className="text-purple-600 dark:text-purple-400 text-sm mt-1">↑ 8% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700 dark:text-green-400 text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-300">7.4%</div>
            <p className="text-green-600 dark:text-green-400 text-sm mt-1">↑ 2.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-700 dark:text-amber-400 text-lg">Avg. Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-800 dark:text-amber-300">8m 42s</div>
            <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">↑ 0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users and new registrations over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LineChart 
              chartData={lineChartData} 
              chartOptions={lineChartOptions}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversion Analytics</CardTitle>
            <CardDescription>Visitor to conversion metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart
              chartData={barChartData}
              chartOptions={barChartOptions}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage by Feature</CardTitle>
            <CardDescription>Distribution of feature usage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PieChart
              chartData={pieChartData}
              chartOptions={pieChartOptions}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>User distribution by country</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MdAnalytics className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Geographic visualization will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}