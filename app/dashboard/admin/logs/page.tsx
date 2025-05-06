"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Download, RefreshCw, Filter, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for system logs
const systemLogs = [
  { id: 1, timestamp: "2023-05-05T12:00:00Z", level: "info", service: "auth", message: "User login successful", details: "User ID: 123" },
  { id: 2, timestamp: "2023-05-05T12:01:30Z", level: "warn", service: "api", message: "Rate limit approaching", details: "Client IP: 192.168.1.1" },
  { id: 3, timestamp: "2023-05-05T12:15:45Z", level: "error", service: "database", message: "Connection timeout", details: "Database server not responding" },
  { id: 4, timestamp: "2023-05-05T12:30:21Z", level: "info", service: "email", message: "Email sent successfully", details: "Template: password reset" },
  { id: 5, timestamp: "2023-05-05T12:45:12Z", level: "debug", service: "scheduler", message: "Job scheduled", details: "Job ID: cleanup-345" },
  { id: 6, timestamp: "2023-05-05T13:00:00Z", level: "info", service: "auth", message: "User logout", details: "User ID: 456" },
  { id: 7, timestamp: "2023-05-05T13:15:10Z", level: "error", service: "storage", message: "File upload failed", details: "Insufficient permissions" },
  { id: 8, timestamp: "2023-05-05T13:30:05Z", level: "warn", service: "cache", message: "Cache miss rate high", details: "Consider increasing cache size" },
]

// Mock data for audit logs
const auditLogs = [
  { id: 1, timestamp: "2023-05-05T12:00:00Z", user: "admin@example.com", action: "user.create", resource: "User", resourceId: "user-789", details: "Created new user account" },
  { id: 2, timestamp: "2023-05-05T12:30:00Z", user: "admin@example.com", action: "role.update", resource: "User", resourceId: "user-456", details: "Changed role from user to admin" },
  { id: 3, timestamp: "2023-05-05T13:00:00Z", user: "john@example.com", action: "data.access", resource: "Report", resourceId: "report-123", details: "Downloaded financial report" },
  { id: 4, timestamp: "2023-05-05T13:15:00Z", user: "system", action: "system.update", resource: "System", resourceId: "settings", details: "Updated system settings" },
  { id: 5, timestamp: "2023-05-05T13:45:00Z", user: "admin@example.com", action: "user.delete", resource: "User", resourceId: "user-234", details: "Deleted user account" },
  { id: 6, timestamp: "2023-05-05T14:00:00Z", user: "sarah@example.com", action: "data.create", resource: "Feed", resourceId: "feed-567", details: "Created new data feed" },
]

// Error logs
const errorLogs = systemLogs.filter(log => log.level === "error")

export default function AdminLogsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(), to: new Date() })
  const [logLevel, setLogLevel] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

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
  }, [router, user])

  // System Log columns
  const systemLogColumns: ColumnDef<typeof systemLogs[0]>[] = [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => {
        return format(new Date(row.getValue("timestamp")), "PPp")
      }
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => {
        const level = row.getValue("level") as string
        const colors: Record<string, string> = {
          info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          warn: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
          error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
          debug: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
        }
        
        return (
          <Badge variant="outline" className={`${colors[level]} font-medium`}>
            {level.toUpperCase()}
          </Badge>
        )
      }
    },
    {
      accessorKey: "service",
      header: "Service",
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "details",
      header: "Details",
    }
  ]

  // Audit Log columns
  const auditLogColumns: ColumnDef<typeof auditLogs[0]>[] = [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => {
        return format(new Date(row.getValue("timestamp")), "PPp")
      }
    },
    {
      accessorKey: "user",
      header: "User",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.getValue("action") as string
        let color = "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"
        
        if (action.includes("create")) {
          color = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        } else if (action.includes("update")) {
          color = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        } else if (action.includes("delete")) {
          color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        } else if (action.includes("access")) {
          color = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        }
        
        return (
          <Badge variant="outline" className={`${color} font-medium`}>
            {action}
          </Badge>
        )
      }
    },
    {
      accessorKey: "resource",
      header: "Resource",
    },
    {
      accessorKey: "resourceId",
      header: "Resource ID",
    },
    {
      accessorKey: "details",
      header: "Details",
    }
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refreshing logs
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const filteredSystemLogs = logLevel === "all" 
    ? systemLogs 
    : systemLogs.filter(log => log.level === logLevel)

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          System Logs
        </h1>
        <p className="text-muted-foreground mt-1">
          View and analyze system and user activity logs
        </p>
      </div>

      <Tabs defaultValue="system" className="space-y-4">
        <TabsList className="bg-card border">
          <TabsTrigger value="system">
            <FileText className="h-4 w-4 mr-2" />
            System Logs
          </TabsTrigger>
          <TabsTrigger value="audit">
            <AlertCircle className="h-4 w-4 mr-2" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="errors">
            <AlertCircle className="h-4 w-4 mr-2" />
            Errors
          </TabsTrigger>
        </TabsList>

        {/* System Logs */}
        <TabsContent value="system" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>System-generated logs from all services</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Select value={logLevel} onValueChange={setLogLevel}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Log Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={systemLogColumns}
                data={filteredSystemLogs}
                searchKey="message"
                searchPlaceholder="Search logs..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs */}
        <TabsContent value="audit" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Audit Trail</CardTitle>
                  <CardDescription>User and system action audit logs</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={auditLogColumns}
                data={auditLogs}
                searchKey="action"
                searchPlaceholder="Search audit logs..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Error Logs */}
        <TabsContent value="errors" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle>Error Logs</CardTitle>
                  <CardDescription>System errors and exceptions</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={systemLogColumns}
                data={errorLogs}
                searchKey="message"
                searchPlaceholder="Search error logs..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}