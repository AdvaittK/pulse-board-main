"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoDocuments } from "react-icons/io5"
import { MdBarChart, MdDashboard } from "react-icons/md"
import { ClipboardList, Briefcase, ChevronRight } from "lucide-react"
import Widget from "@/components/widget/Widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Import Horizon Dashboard Components
import WeeklyRevenue from "@/components/admin/default/WeeklyRevenue"
import TotalSpent from "@/components/admin/default/TotalSpent"
import PieChartCard from "@/components/admin/default/PieChartCard"
import DailyTraffic from "@/components/admin/default/DailyTraffic"
import TaskCard from "@/components/admin/default/TaskCard"
import CheckTable from "@/components/admin/default/CheckTable"
import ComplexTable from "@/components/admin/default/ComplexTable"

// Import mock data for tables
import { tableDataCheck, tableDataComplex } from "@/variables/charts"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const tabContentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    x: 10,
    transition: {
      duration: 0.2
    }
  }
}

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 to-blue-50/70 dark:from-slate-900 dark:to-indigo-950/70 px-1 sm:px-2 md:px-3">
      <div className="container px-0 md:px-4 max-w-full py-6">
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div 
            variants={cardVariants}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <motion.h1 
                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Interactive Dashboard Demo
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-slate-500 dark:text-slate-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Explore data feeds, analytics, and visualization components
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Badge variant="outline" className="px-3 py-1.5 text-sm font-medium border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                  Demo Mode
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* Widget Cards - Enhanced with animations */}
          <motion.div 
            variants={cardVariants}
            className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6"
          >
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-all duration-200"
            >
              <Widget
                icon={<MdBarChart className="h-7 w-7" />}
                title={'Earnings'}
                subtitle={'$340.5'}
                bgColor="from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20"
                iconBg="bg-blue-500"
                growth="+14%"
                growthColor="text-emerald-500"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-all duration-200"
            >
              <Widget
                icon={<IoDocuments className="h-6 w-6" />}
                title={'Spend this month'}
                subtitle={'$642.39'}
                bgColor="from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20"
                iconBg="bg-purple-500"
                growth="+2.5%"
                growthColor="text-emerald-500"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-all duration-200"
            >
              <Widget
                icon={<MdBarChart className="h-7 w-7" />}
                title={'Sales'}
                subtitle={'$574.34'}
                bgColor="from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20"
                iconBg="bg-emerald-500"
                growth="+8.1%"
                growthColor="text-emerald-500"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-all duration-200"
            >
              <Widget
                icon={<MdDashboard className="h-6 w-6" />}
                title={'Your Balance'}
                subtitle={'$1,000'}
                bgColor="from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20"
                iconBg="bg-amber-500"
                growth="+3.2%"
                growthColor="text-emerald-500"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-all duration-200"
            >
              <Widget
                icon={<ClipboardList className="h-6 w-6" />}
                title={'New Tasks'}
                subtitle={'154'}
                bgColor="from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20"
                iconBg="bg-rose-500"
                growth="+12%"
                growthColor="text-emerald-500"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="transition-all duration-200"
            >
              <Widget
                icon={<Briefcase className="h-6 w-6" />}
                title={'Total Projects'}
                subtitle={'28'}
                bgColor="from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20"
                iconBg="bg-indigo-500"
                growth="+4%"
                growthColor="text-emerald-500"
              />
            </motion.div>
          </motion.div>

          {/* Tabs Section - Enhanced with better styling and animations */}
          <motion.div variants={cardVariants} className="mt-8">
            <Tabs 
              defaultValue="overview" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <TabsList className="bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl">
                  <TabsTrigger 
                    value="overview" 
                    className={cn(
                      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg",
                      "transition-all duration-300 data-[state=active]:shadow-md"
                    )}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className={cn(
                      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg",
                      "transition-all duration-300 data-[state=active]:shadow-md"
                    )}
                  >
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reports" 
                    className={cn(
                      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg",
                      "transition-all duration-300 data-[state=active]:shadow-md"
                    )}
                  >
                    Reports
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className={cn(
                      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg",
                      "transition-all duration-300 data-[state=active]:shadow-md"
                    )}
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                  View All
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-0 overflow-hidden">
                    {/* Horizon Dashboard Components - Row 1 */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                      <motion.div
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <TotalSpent />
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <WeeklyRevenue />
                      </motion.div>
                    </div>

                    {/* Horizon Dashboard Components - Row 2 */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
                      <motion.div
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="transition-all duration-200 shadow-sm hover:shadow-md overflow-x-auto"
                      >
                        <CheckTable tableData={tableDataCheck} />
                      </motion.div>
                      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6">
                        <motion.div
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <DailyTraffic />
                        </motion.div>
                        <motion.div
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <PieChartCard />
                        </motion.div>
                      </div>
                    </div>

                    {/* Horizon Dashboard Components - Row 3 */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                      <motion.div
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <ComplexTable tableData={tableDataComplex} />
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <TaskCard />
                      </motion.div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-6 mt-0">
                    <motion.div
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="transition-all duration-200"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">Data Feed Performance</CardTitle>
                              <CardDescription className="text-slate-500 dark:text-slate-400">Performance metrics for your active data feeds</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20 border-blue-200 dark:border-blue-800">Real-time</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="h-80 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="text-slate-500 dark:text-slate-400">Analytics chart will be displayed here</p>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
                          <div className="flex items-center justify-between w-full">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Updated 2 hours ago</p>
                            <Button variant="outline" size="sm" className="text-sm">Refresh data</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="reports" className="space-y-6 mt-0">
                    <motion.div
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="transition-all duration-200"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">Reports</CardTitle>
                              <CardDescription className="text-slate-500 dark:text-slate-400">View and download your reports</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20 border-amber-200 dark:border-amber-800">Weekly</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="h-80 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="text-slate-500 dark:text-slate-400">Reports content will be displayed here</p>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
                          <div className="flex items-center justify-between w-full">
                            <p className="text-sm text-slate-500 dark:text-slate-400">3 reports available</p>
                            <Button variant="outline" size="sm" className="text-sm">Download all</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-6 mt-0">
                    <motion.div
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="transition-all duration-200"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white dark:bg-slate-900">
                        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-900 dark:to-slate-900 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">Notifications</CardTitle>
                              <CardDescription className="text-slate-500 dark:text-slate-400">Manage your notification settings</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 dark:bg-rose-500/20 border-rose-200 dark:border-rose-800">5 Unread</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="h-80 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="text-slate-500 dark:text-slate-400">Notification settings will be displayed here</p>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
                          <div className="flex items-center justify-between w-full">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: Today</p>
                            <Button variant="outline" size="sm" className="text-sm">Mark all as read</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
