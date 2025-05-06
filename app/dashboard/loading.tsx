"use client"

import React from "react"
import { IoDocuments } from "react-icons/io5"
import { MdBarChart, MdDashboard } from "react-icons/md"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/20">
      <div className="container px-0 md:px-4 max-w-full py-6">
        <div className="animate-pulse space-y-8">
          <div className="mb-8">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-80 mt-2" />
          </div>

          {/* Widget Cards - Skeleton */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card 
                key={item} 
                className={cn(
                  "flex flex-row items-center rounded-2xl shadow-md h-[90px]",
                  "bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-none"
                )}
              >
                <CardContent className="flex flex-row items-center p-4">
                  <div className={cn(
                    "rounded-full p-3",
                    item % 6 === 1 ? "bg-blue-100/40 dark:bg-blue-900/20" :
                    item % 6 === 2 ? "bg-purple-100/40 dark:bg-purple-900/20" :
                    item % 6 === 3 ? "bg-emerald-100/40 dark:bg-emerald-900/20" :
                    item % 6 === 4 ? "bg-amber-100/40 dark:bg-amber-900/20" :
                    item % 6 === 5 ? "bg-rose-100/40 dark:bg-rose-900/20" :
                    "bg-indigo-100/40 dark:bg-indigo-900/20"
                  )}>
                    <div className={cn(
                      "h-7 w-7 rounded",
                      item % 6 === 1 ? "bg-blue-500/20" :
                      item % 6 === 2 ? "bg-purple-500/20" :
                      item % 6 === 3 ? "bg-emerald-500/20" :
                      item % 6 === 4 ? "bg-amber-500/20" :
                      item % 6 === 5 ? "bg-rose-500/20" :
                      "bg-indigo-500/20"
                    )} />
                  </div>
                  <div className="ml-4 flex flex-col justify-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16 mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6 mt-8">
            <div className="flex justify-between items-center">
              <TabsList className="bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl">
                <TabsTrigger value="overview" disabled className="rounded-lg">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled className="rounded-lg">Analytics</TabsTrigger>
                <TabsTrigger value="reports" disabled className="rounded-lg">Reports</TabsTrigger>
                <TabsTrigger value="notifications" disabled className="rounded-lg">Notifications</TabsTrigger>
              </TabsList>
              <Skeleton className="h-9 w-24 hidden md:block" />
            </div>
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Charts - Skeleton - Row 1 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="rounded-2xl border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <Skeleton className="h-8 w-40 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                    <div className="flex flex-row justify-between sm:flex-wrap lg:flex-nowrap">
                      <div className="flex flex-col">
                        <Skeleton className="h-8 w-24 mt-4" />
                        <div className="flex flex-col items-start">
                          <Skeleton className="h-4 w-20 mt-2" />
                          <div className="flex flex-row items-center justify-center mt-1">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="ml-1 h-4 w-16" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-[220px] flex-grow relative mt-4">
                        <Skeleton className="h-full w-full rounded-lg" />
                      </div>
                    </div>
                    
                    {/* Stats section skeleton */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[1, 2, 3].map((item) => (
                        <div 
                          key={item}
                          className={cn(
                            "rounded-xl p-3",
                            "bg-slate-100/50 dark:bg-slate-800/50",
                            "border border-slate-200 dark:border-slate-700/50"
                          )}
                        >
                          <div className="flex items-center">
                            <div className="rounded-full p-2 mr-3 bg-slate-200/80 dark:bg-slate-700/80">
                              <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                            <div className="text-left">
                              <Skeleton className="h-3 w-16" />
                              <Skeleton className="h-5 w-12 mt-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Breakdown section skeleton */}
                    <div className="mt-4 rounded-xl p-4 bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="rounded-full p-2 mr-2 bg-slate-100 dark:bg-slate-700">
                            <Skeleton className="h-4 w-4 rounded-full" />
                          </div>
                          <Skeleton className="h-5 w-32" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                      </div>
                      
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <Skeleton className="h-3 w-20" />
                              <Skeleton className="h-3 w-8" />
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-slate-300 dark:bg-slate-600" style={{ width: `${25 * item}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="rounded-2xl border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <Skeleton className="h-8 w-40 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                    <div className="flex flex-row justify-between sm:flex-wrap lg:flex-nowrap">
                      <div className="flex flex-col">
                        <Skeleton className="h-8 w-24 mt-4" />
                        <div className="flex flex-col items-start">
                          <Skeleton className="h-4 w-20 mt-2" />
                          <div className="flex flex-row items-center justify-center mt-1">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="ml-1 h-4 w-16" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-[220px] flex-grow relative mt-4">
                        <Skeleton className="h-full w-full rounded-lg" />
                      </div>
                    </div>
                    
                    {/* Stats section skeleton */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[1, 2, 3].map((item) => (
                        <div 
                          key={item}
                          className={cn(
                            "rounded-xl p-3",
                            "bg-slate-100/50 dark:bg-slate-800/50",
                            "border border-slate-200 dark:border-slate-700/50"
                          )}
                        >
                          <div className="flex items-center">
                            <div className="rounded-full p-2 mr-3 bg-slate-200/80 dark:bg-slate-700/80">
                              <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                            <div className="text-left">
                              <Skeleton className="h-3 w-16" />
                              <Skeleton className="h-5 w-12 mt-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Daily breakdown skeleton */}
                    <div className="mt-4 rounded-xl p-4 bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="rounded-full p-2 mr-2 bg-slate-100 dark:bg-slate-700">
                            <Skeleton className="h-4 w-4 rounded-full" />
                          </div>
                          <Skeleton className="h-5 w-32" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                      </div>
                      
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <Skeleton className="h-3 w-20" />
                              <Skeleton className="h-3 w-8" />
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-slate-300 dark:bg-slate-600" style={{ width: `${20 * item}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional skeletons for other components can go here */}
              {/* We can omit them for brevity if the loading state doesn't need to be perfect */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}