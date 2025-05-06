"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Loader2, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Database, 
  PieChart,
  ShieldAlert,
  Grid3X3,
  ArrowUpRight
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (user === null) {
      // Wait for authentication to complete
      return;
    }
    
    // For frontend showcase, we'll keep this check to demonstrate role-based access
    if (user?.role !== "admin") {
      console.log("Redirecting non-admin user to dashboard");
      router.push("/dashboard");
      return;
    }
    
    // Show page after a slight delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [router, user]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }

  // Admin section cards data
  const adminSections = [
    { 
      title: "User Management", 
      description: "Manage users, permissions, and roles", 
      icon: <Users className="h-7 w-7 text-indigo-500" />,
      href: "/dashboard/admin/users",
      color: "from-indigo-500 to-blue-600",
      gradient: "bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-800/20",
      badge: "Core"
    },
    { 
      title: "Analytics", 
      description: "View usage statistics and reports", 
      icon: <BarChart3 className="h-7 w-7 text-purple-500" />,
      href: "/dashboard/admin/analytics",
      color: "from-purple-500 to-pink-600",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20",
      badge: "Insights"
    },
    { 
      title: "Settings", 
      description: "Configure system preferences", 
      icon: <Settings className="h-7 w-7 text-slate-500" />,
      href: "/dashboard/admin/settings",
      color: "from-slate-600 to-slate-800",
      gradient: "bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900/40 dark:to-slate-800/40",
      badge: "System"
    },
    { 
      title: "Logs", 
      description: "View system and user activity logs", 
      icon: <FileText className="h-7 w-7 text-amber-500" />,
      href: "/dashboard/admin/logs",
      color: "from-amber-500 to-orange-600",
      gradient: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20",
      badge: "Security"
    },
    { 
      title: "Data Sources", 
      description: "Configure data source connections", 
      icon: <Database className="h-7 w-7 text-cyan-500" />,
      href: "/dashboard/admin/sources",
      color: "from-cyan-500 to-blue-600",
      gradient: "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-800/20",
      badge: "Data"
    },
    { 
      title: "Visualization", 
      description: "Configure visualization settings", 
      icon: <PieChart className="h-7 w-7 text-rose-500" />,
      href: "/dashboard/admin/visualization",
      color: "from-rose-500 to-red-600",
      gradient: "bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-800/20",
      badge: "UI"
    },
    { 
      title: "Security", 
      description: "Manage security and access controls", 
      icon: <ShieldAlert className="h-7 w-7 text-red-500" />,
      href: "/dashboard/admin/security",
      color: "from-red-500 to-rose-600",
      gradient: "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-800/20",
      badge: "Critical"
    },
  ]

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-slate-600 dark:text-slate-300">Loading admin panel...</p>
      </div>
    )
  }

  // Mock data for showcase purposes
  const activeUsers = 1254;
  const systemStatus = "Operational";
  const lastLogin = "Today, 10:30 AM";
  const newUsers = 86;
  const apiCalls = "3.2M";

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your application settings, users, and system configuration
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 dark:text-blue-300">Admin Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Users</span>
                <span className="text-2xl font-bold">{activeUsers.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">System Status</span>
                <span className="flex items-center text-green-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  {systemStatus}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Last Login</span>
                <span className="text-sm">{lastLogin}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Your Role</span>
                <span className="text-sm">{user?.role === 'admin' ? 'Administrator' : 'Viewer'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-800 dark:text-purple-300">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">New Users</span>
                <span className="text-2xl font-bold">+{newUsers}</span>
                <span className="text-xs text-green-600">↑ 12% this week</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">API Calls</span>
                <span className="text-2xl font-bold">{apiCalls}</span>
                <span className="text-xs text-amber-600">↑ 5% this week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-800 md:col-span-2 xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 dark:text-amber-300">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                  Memory usage at 75%
                </span>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Database backup completed
                </span>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Grid3X3 className="h-5 w-5 mr-2 text-blue-500" />
        Admin Controls
      </h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {adminSections.map((section, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Link href={section.href} className="block h-full">
              <Card className={`h-full transition-all duration-200 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden ${section.gradient}`}>
                <CardHeader className="pb-2 relative">
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white/75 dark:bg-black/30 backdrop-blur-sm">
                      {section.badge}
                    </Badge>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-white/80 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center mb-3 shadow-sm">
                    {section.icon}
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-sm">{section.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 pb-3 flex justify-between items-center">
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${section.color} opacity-70`}></div>
                  <Button variant="ghost" className="rounded-full p-0 h-8 w-8 ml-2 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/80">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}