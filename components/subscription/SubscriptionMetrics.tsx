"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  DollarSign, 
  Users, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  BadgePercent,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for subscription metrics
const subscriptionData = {
  monthlyCosts: [2100, 2400, 2800, 2750, 3100, 3400, 3200, 3800, 3900, 3700, 4100, 4200],
  monthlyUsers: [24, 28, 32, 36, 42, 45, 50, 55, 62, 68, 74, 80],
  monthlyRetention: [98, 97, 96, 97, 95, 96, 97, 98, 96, 97, 98, 99],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export function SubscriptionMetrics() {
  const [timeRange, setTimeRange] = useState("12-months")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Subscription Analytics</h2>
          <p className="text-muted-foreground">Track usage, costs, and metrics over time</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30-days">Last 30 days</SelectItem>
              <SelectItem value="90-days">Last 90 days</SelectItem>
              <SelectItem value="6-months">Last 6 months</SelectItem>
              <SelectItem value="12-months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric Card: Current MRR */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Monthly Recurring Revenue</CardDescription>
                <div className="flex justify-between items-baseline">
                  <CardTitle className="text-2xl">$4,200</CardTitle>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +2.4%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-green-600 dark:text-green-400">↑ $100</span> from last month
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-[40px] mt-2">
                  {/* Area chart would go here */}
                  <div className="h-full w-full flex items-end">
                    {subscriptionData.monthlyCosts.map((value, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-blue-500 dark:bg-blue-600 mx-0.5 rounded-t-sm"
                        style={{ height: `${(value / 5000) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Metric Card: Active Users */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Active Users</CardDescription>
                <div className="flex justify-between items-baseline">
                  <CardTitle className="text-2xl">80</CardTitle>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +8.1%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-green-600 dark:text-green-400">↑ 6</span> from last month
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-[40px] mt-2">
                  <div className="h-full w-full flex items-end">
                    {subscriptionData.monthlyUsers.map((value, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-purple-500 dark:bg-purple-600 mx-0.5 rounded-t-sm"
                        style={{ height: `${(value / 100) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Metric Card: Retention Rate */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>User Retention</CardDescription>
                <div className="flex justify-between items-baseline">
                  <CardTitle className="text-2xl">99%</CardTitle>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +1.0%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-green-600 dark:text-green-400">↑ 1.0%</span> from last month
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full h-[40px] mt-2">
                  <div className="h-full w-full flex items-end">
                    {subscriptionData.monthlyRetention.map((value, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-green-500 dark:bg-green-600 mx-0.5 rounded-t-sm"
                        style={{ height: `${value}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Metric Card: Average MRR per User */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Avg. MRR per User</CardDescription>
                <div className="flex justify-between items-baseline">
                  <CardTitle className="text-2xl">$52.50</CardTitle>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    -5.4%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-amber-600 dark:text-amber-400">↓ $3.00</span> from last month
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Progress value={52.5} max={100} className="h-2" />
                <div className="w-full flex justify-between mt-2 text-xs text-muted-foreground">
                  <div>$0</div>
                  <div>$100</div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Subscription Plan Distribution</CardTitle>
            <CardDescription>Current distribution of users across subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <svg className="w-32 h-32">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="8" 
                      strokeDasharray="377" 
                      strokeDashoffset={(377 * (100 - 20)) / 100} 
                      className="transform -rotate-90 origin-center" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">20%</span>
                    <span className="text-xs text-muted-foreground">Free Plan</span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-medium">Free Plan</h4>
                  <p className="text-sm text-muted-foreground">16 Users</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <svg className="w-32 h-32">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      fill="none" 
                      stroke="#8b5cf6" 
                      strokeWidth="8" 
                      strokeDasharray="377" 
                      strokeDashoffset={(377 * (100 - 50)) / 100} 
                      className="transform -rotate-90 origin-center" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">50%</span>
                    <span className="text-xs text-muted-foreground">Pro Plan</span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-medium">Pro Plan</h4>
                  <p className="text-sm text-muted-foreground">40 Users</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <svg className="w-32 h-32">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      fill="none" 
                      stroke="#ec4899" 
                      strokeWidth="8" 
                      strokeDasharray="377" 
                      strokeDashoffset={(377 * (100 - 30)) / 100} 
                      className="transform -rotate-90 origin-center" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">30%</span>
                    <span className="text-xs text-muted-foreground">Business Plan</span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-medium">Business Plan</h4>
                  <p className="text-sm text-muted-foreground">24 Users</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-0 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Growth Forecast</CardTitle>
                <CardDescription className="mt-1">Projected subscription growth over next 6 months</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex gap-1">
                <ArrowUpRight className="h-4 w-4" />
                Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end gap-2 pt-10 pb-1">
              {Array(12).fill(0).map((_, i) => {
                const currentHeight = 40 + (i * 5) + (Math.random() * 10)
                const projectedHeight = currentHeight + (10 + (i * 2) + (Math.random() * 15))
                
                return (
                  <div key={i} className="group relative flex-1 flex flex-col gap-1">
                    <div 
                      className="w-full bg-blue-500/20 dark:bg-blue-800/20 rounded-t-sm"
                      style={{ height: `${projectedHeight - currentHeight}%` }}
                    ></div>
                    <div 
                      className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm transition-all group-hover:opacity-80"
                      style={{ height: `${currentHeight}%` }}
                    ></div>
                    
                    <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-muted-foreground">
                      {i + 1}
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs py-1 px-2 rounded transition-opacity">
                      {Math.round(currentHeight)} → {Math.round(projectedHeight)}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between items-center mt-10 pt-4 border-t">
              <div className="text-sm">
                <span className="text-muted-foreground">Current Users:</span> <span className="font-medium">80</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Projected in 6 months:</span> <span className="font-medium text-blue-600 dark:text-blue-400">~120</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Upcoming Renewals</CardTitle>
            <CardDescription>Monitor subscription renewals over the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  name: 'Team Acme', 
                  plan: 'Business', 
                  value: '$239.97', 
                  date: 'May 12, 2025',
                  color: 'bg-pink-500',
                  icon: <Users className="h-4 w-4" />
                },
                { 
                  name: 'Tech Solutions Ltd', 
                  plan: 'Pro', 
                  value: '$149.95', 
                  date: 'May 15, 2025',
                  color: 'bg-purple-500',
                  icon: <BadgePercent className="h-4 w-4" />
                },
                { 
                  name: 'Digital Agency Inc', 
                  plan: 'Pro', 
                  value: '$89.97', 
                  date: 'May 22, 2025',
                  color: 'bg-purple-500',
                  icon: <Users className="h-4 w-4" />
                },
                { 
                  name: 'Startup Alpha', 
                  plan: 'Business', 
                  value: '$239.97', 
                  date: 'May 28, 2025',
                  color: 'bg-pink-500',
                  icon: <Users className="h-4 w-4" />
                },
              ].map((renewal, index) => (
                <div key={index} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className={`${renewal.color} text-white h-10 w-10 rounded-full flex items-center justify-center`}>
                      {renewal.icon}
                    </div>
                    <div>
                      <p className="font-medium">{renewal.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                          {renewal.plan}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{renewal.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{renewal.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}