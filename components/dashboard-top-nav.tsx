"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Settings, Bell, Home, LayoutDashboard, User, LogOut, HelpCircle } from "lucide-react"
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

export function DashboardTopNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationCount, setNotificationCount] = useState(3)
  
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
        "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 px-4 transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800" 
          : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900"
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
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
      
      <div className="flex flex-1 items-center justify-end gap-3">
        <AnimatePresence>
          <motion.div 
            className={cn(
              "relative transition-all duration-300 ease-out",
              searchFocused ? "w-full max-w-md" : "w-full max-w-[200px] md:max-w-xs"
            )}
            initial={{ opacity: 0, width: 100 }}
            animate={{ opacity: 1, width: searchFocused ? 350 : 200 }}
            transition={{ duration: 0.3 }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <Input
              type="search"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "w-full transition-all duration-200 pl-9 pr-4 py-2 h-9",
                "border border-slate-200 dark:border-slate-800",
                "rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm",
                "hover:bg-white hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700",
                "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-600 dark:focus:ring-blue-600",
                "focus:bg-white dark:focus:bg-slate-900"
              )}
            />
            {searchQuery && (
              <motion.button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400"
                onClick={() => setSearchQuery("")}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="flex items-center gap-2 md:gap-3">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon" className="rounded-full">
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
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  {notificationCount > 0 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-white">{notificationCount}</span>
                    </motion.div>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="h-9 w-9 rounded-full">
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
                className="relative h-9 w-9 rounded-full border border-slate-200 dark:border-slate-800 p-0 overflow-hidden"
              >
                <Avatar className="h-9 w-9">
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