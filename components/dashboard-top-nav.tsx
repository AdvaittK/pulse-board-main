"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Settings, 
  Bell, 
  Home, 
  LayoutDashboard, 
  User, 
  LogOut, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Server,
  Check,
  X
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    title: "System Update",
    message: "New dashboard features have been deployed",
    time: "10 minutes ago",
    icon: <Info className="h-4 w-4 text-blue-500" />,
    read: false,
    type: "info"
  },
  {
    id: 2,
    title: "Server Alert",
    message: "Database server load is high (82%)",
    time: "45 minutes ago",
    icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
    read: false,
    type: "warning"
  },
  {
    id: 3,
    title: "Task Completed",
    message: "Your data export has finished processing",
    time: "2 hours ago",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    read: false,
    type: "success"
  }
]

export function DashboardTopNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [notificationCount, setNotificationCount] = useState(notifications.filter(n => !n.read).length)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  
  // Handle scroll effect for enhanced top nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update notification count when notifications change
  useEffect(() => {
    setNotificationCount(notifications.filter(n => !n.read).length)
  }, [notifications])
  
  // Handle screen resize for search bar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSearchOpen(false); // Reset search open state on desktop
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }))
    setNotifications(updatedNotifications)
  }

  // Mark a single notification as read
  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    )
    setNotifications(updatedNotifications)
  }

  // Extract page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean)
    const lastSegment = segments[segments.length - 1] || "dashboard"
    
    // Check if we're on the main dashboard
    if (segments.length === 1 && segments[0] === "dashboard") {
      return "Demo Dashboard"
    }
    
    // Format the title (capitalize first letter, replace hyphens with spaces)
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const pageTitle = getPageTitle()

  return (
    <motion.div 
      className={cn(
        "sticky top-0 z-30 flex h-12 xs:h-14 sm:h-16 items-center justify-between gap-1 xs:gap-2 sm:gap-4 px-2 sm:px-4 transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800" 
          : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900"
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Sidebar Trigger */}
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <SidebarTrigger className="h-8 w-8 rounded-md bg-white dark:bg-slate-900 dark:hover:bg-slate-800 shadow-sm hover:bg-slate-100 border border-slate-200 dark:border-slate-800" />
        </motion.div>
        
        {/* Mobile Page Title */}
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <motion.h1
            className="text-base font-bold text-slate-800 dark:text-white flex items-center truncate max-w-[140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {pathname.includes('/dashboard') && (
              <LayoutDashboard className="mr-1.5 h-4 w-4 text-blue-500 flex-shrink-0" />
            )}
            <span className="truncate">{pageTitle}</span>
          </motion.h1>
        </motion.div>
        
        {/* Desktop Page Title */}
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pages</span>
            <span className="mx-2 text-slate-400 dark:text-slate-600">/</span>
            <motion.h1 
              className="text-xl font-bold text-slate-800 dark:text-white flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {pathname.includes('/dashboard') && (
                <LayoutDashboard className="mr-2 h-5 w-5 text-blue-500" />
              )}
              {pageTitle}
            </motion.h1>
          </div>
        </motion.div>
      </div>
      
      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
        {/* Search Icon for Mobile - Shows when search is collapsed */}
        <AnimatePresence>
          {!searchOpen && (
            <motion.button
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-md bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              onClick={() => setSearchOpen(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Expandable Search Bar */}
        <AnimatePresence>
          {(searchOpen || !searchOpen && typeof window !== 'undefined' && window.innerWidth >= 768) && (
            <motion.div 
              className={cn(
                "relative transition-all duration-300 ease-out",
                searchFocused 
                  ? "w-full max-w-full md:max-w-md" 
                  : searchOpen 
                    ? "w-full max-w-full" 
                    : "hidden md:block md:max-w-xs"
              )}
              initial={{ opacity: 0, width: 0, scale: 0.9 }}
              animate={{ opacity: 1, width: "auto", scale: 1 }}
              exit={{ opacity: 0, width: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search dashboard..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={cn(
                    "w-full transition-all duration-200 pl-9 pr-9 py-2 h-9",
                    "border border-slate-200 dark:border-slate-800",
                    "rounded-md bg-white dark:bg-slate-900 backdrop-blur-sm",
                    "hover:bg-white hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700",
                    "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                  )}
                  autoFocus={searchOpen}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400"
                  onClick={() => {
                    if (searchQuery) {
                      setSearchQuery("");
                    } else {
                      setSearchOpen(false);
                    }
                  }}
                >
                  {searchQuery ? "×" : <X className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
          {/* Home button - hidden on smallest screens */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  asChild 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-md h-8 w-8 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hidden xs:flex items-center justify-center"
                >
                  <Link href="/">
                    <Home className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    <span className="sr-only">Home</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Back to home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-md h-8 w-8 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 relative"
              >
                <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                {notificationCount > 0 && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-white">{notificationCount}</span>
                  </motion.div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[calc(100vw-1.5rem)] xs:w-[calc(100vw-2rem)] sm:w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                {notificationCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 sm:h-8 text-xs text-blue-600 hover:text-blue-700 px-2"
                    onClick={markAllAsRead}
                  >
                    <Check className="h-3 w-3 mr-1" /> Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {notifications.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No notifications
                </div>
              ) : (
                <div className="max-h-[300px] overflow-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id} 
                      className={cn("p-0", 
                        notification.read ? "opacity-70" : "bg-blue-50/50 dark:bg-blue-900/10"
                      )}
                      onSelect={(e) => {
                        e.preventDefault();
                        markAsRead(notification.id);
                      }}
                    >
                      <div className="flex items-start p-3 w-full gap-3 cursor-pointer">
                        <div className="flex-shrink-0 mt-0.5">
                          {notification.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <p className="font-medium text-sm">{notification.title}</p>
                            {!notification.read && (
                              <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none h-5">New</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-xs mt-0.5">{notification.message}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center focus:bg-transparent" asChild>
                <Link 
                  href="/dashboard"
                  className="text-center w-full text-blue-600 dark:text-blue-400 text-sm font-medium py-1 hover:underline"
                >
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md h-8 w-8 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 md:h-9 md:w-9 rounded-md sm:rounded-full border border-slate-200 dark:border-slate-800 p-0 overflow-hidden shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900"
              >
                <Avatar className="h-8 w-8 md:h-9 md:w-9">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-blue-600">
                    <User className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Demo User</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Badge variant="outline" className="ml-2 bg-blue-50/50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800 hidden md:flex">
            Demo Mode
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}