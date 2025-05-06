"use client"

import React, { useState, useEffect } from "react"
import { 
  CheckCircle, 
  Download, 
  MoreHorizontal, 
  Plus, 
  Trash, 
  UserCog, 
  X, 
  UsersRound,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: string
  subscriptions: string[]
  lastActive: string
}

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    subscriptions: ["Pro Plan"],
    lastActive: "2023-05-01T12:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    subscriptions: ["Basic Plan", "Financial Data Add-on"],
    lastActive: "2023-05-02T10:30:00Z",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "admin",
    status: "active",
    subscriptions: ["Enterprise Plan"],
    lastActive: "2023-05-03T09:15:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    status: "inactive",
    subscriptions: [],
    lastActive: "2023-04-15T14:45:00Z",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "user",
    status: "active",
    subscriptions: ["Basic Plan"],
    lastActive: "2023-05-01T16:20:00Z",
  },
  {
    id: "6",
    name: "Sarah Thompson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    subscriptions: ["Pro Plan", "API Access"],
    lastActive: "2023-05-04T11:20:00Z",
  },
  {
    id: "7",
    name: "David Rodriguez",
    email: "david@example.com",
    role: "admin",
    status: "active",
    subscriptions: ["Enterprise Plan"],
    lastActive: "2023-05-01T09:30:00Z",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    email: "jennifer@example.com",
    role: "user",
    status: "inactive",
    subscriptions: [],
    lastActive: "2023-04-20T15:45:00Z",
  },
];

export default function UsersPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Check if the current user is an admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const stats = [
    { title: "Total Users", value: users.length, icon: <UsersRound className="h-6 w-6 text-blue-500" /> },
    { title: "Active Users", value: users.filter(u => u.status === "active").length, icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { title: "Admins", value: users.filter(u => u.role === "admin").length, icon: <UserCog className="h-6 w-6 text-purple-500" /> },
  ]

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              role === "admin"
                ? "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 dark:from-purple-900 dark:to-purple-800 dark:text-purple-200"
                : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900 dark:to-blue-800 dark:text-blue-200"
            }`}
          >
            {role}
          </span>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className="flex items-center gap-1">
            {status === "active" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-100 to-green-200 text-green-800 dark:from-green-900 dark:to-green-800 dark:text-green-200 px-2.5 py-0.5 text-xs font-medium">
                <CheckCircle className="h-3 w-3" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900 dark:to-red-800 dark:text-red-200 px-2.5 py-0.5 text-xs font-medium">
                <X className="h-3 w-3" />
                Inactive
              </span>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "subscriptions",
      header: "Subscriptions",
      cell: ({ row }) => {
        const subscriptions = row.getValue("subscriptions") as string[]
        return (
          <>
            {subscriptions.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {subscriptions.map((sub, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:from-gray-800 dark:to-gray-700 dark:text-gray-300"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">None</span>
            )}
          </>
        )
      }
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
      cell: ({ row }) => {
        return new Date(row.getValue("lastActive") as string).toLocaleDateString()
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
        
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Edit User</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Section with Stats */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">View and manage all user accounts in the system</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-center mb-4">
        <CardTitle className="text-xl font-semibold">Users List</CardTitle>
        <Button variant="outline" className="border-dashed">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={users}
        searchKey="name"
        searchPlaceholder="Search users..."
      />
    </div>
  )
}
