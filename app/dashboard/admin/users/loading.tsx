"use client"

import React from "react"
import { 
  CheckCircle, 
  Download, 
  Filter,
  Plus, 
  Search, 
  UserCog, 
  UsersRound
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
  // Mockup stats for the skeleton
  const stats = [
    { title: "Total Users", icon: <UsersRound className="h-6 w-6 text-blue-500/40" /> },
    { title: "Active Users", icon: <CheckCircle className="h-6 w-6 text-green-500/40" /> },
    { title: "Admins", icon: <UserCog className="h-6 w-6 text-purple-500/40" /> },
  ]

  // Generate dummy rows for the skeleton table
  const dummyRows = Array(4).fill(null)

  return (
    <div className="animate-pulse">
      {/* Header Section with Stats */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-80 mt-2" />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" disabled>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button disabled className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white opacity-70">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900/50 dark:to-gray-800/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground/70">{stat.title}</p>
                  <Skeleton className="h-7 w-12 mt-1" />
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-sm">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/70 dark:to-gray-800/70 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold"><Skeleton className="h-6 w-32" /></CardTitle>
              <CardDescription><Skeleton className="h-4 w-56 mt-1" /></CardDescription>
            </div>
            <Button variant="outline" className="border-dashed opacity-70" disabled>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
              <Input
                type="search"
                placeholder="Loading..."
                className="pl-8 bg-white/50 dark:bg-gray-800/50"
                disabled
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/70 dark:bg-gray-800/70">
                <TableRow>
                  <TableHead className="py-3"><Skeleton className="h-4 w-16" /></TableHead>
                  <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead><Skeleton className="h-4 w-14" /></TableHead>
                  <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                  <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                  <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                  <TableHead className="w-[80px] text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyRows.map((_, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? 'bg-white/70 dark:bg-gray-900/70' : 'bg-gray-50/70 dark:bg-gray-800/40'}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        {/* Pagination Footer */}
        <CardFooter className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
