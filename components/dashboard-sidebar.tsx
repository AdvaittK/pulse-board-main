"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Package, 
  LayoutDashboard,
  LineChart,
  ShoppingCart,
  Calendar,
  MessageSquare,
  CreditCard,
  Sparkles,
  Shield,
  Home,
  User,
  Receipt,
  ListChecks,
  BarChart
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define motion component for menu items
const MotionDiv = motion.div
const MotionButton = motion(Button)

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  }

  // Button click animation props
  const buttonTapAnimation = {
    scale: 0.95,
    transition: { duration: 0.1 }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SidebarProvider defaultOpen={!isCollapsed} onOpenChange={setIsCollapsed}>
        <Sidebar 
          variant="floating" 
          collapsible="icon"
          className="border-r border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950 rounded-tr-xl rounded-br-xl overflow-hidden"
        >
          <SidebarHeader>
            <div className="flex items-center gap-3 px-4 py-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="block">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl"
                >
                  PulseBoard
                </motion.span>
              )}
            </div>
          </SidebarHeader>
          
          <SidebarSeparator />
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mx-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  DASHBOARDS
                </motion.div>
              </SidebarGroupLabel>
              
              <div className="space-y-1 px-3 py-2">
                <MotionDiv
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-md">
                        <LayoutDashboard className="h-5 w-5 text-blue-500" />
                      </motion.div>
                      <span>Main Dashboard</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
                
                <MotionDiv
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/data-feeds" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/data-feeds">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-green-50 dark:bg-green-950/30 p-2 rounded-md">
                        <LineChart className="h-5 w-5 text-green-500" />
                      </motion.div>
                      <span>Data Feeds</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
                
                <MotionDiv
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/marketplace" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/marketplace">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-md">
                        <ShoppingCart className="h-5 w-5 text-purple-500" />
                      </motion.div>
                      <span>Marketplace</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
              </div>
            </SidebarGroup>
            
            <SidebarSeparator className="my-3" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mx-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  FEATURES
                </motion.div>
              </SidebarGroupLabel>
              
              <div className="space-y-1 px-3 py-2">
                <MotionDiv
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/calendar" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/calendar">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-cyan-50 dark:bg-cyan-950/30 p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-cyan-500" />
                      </motion.div>
                      <span>Calendar</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
                
                <MotionDiv
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/messages" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/messages">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-teal-50 dark:bg-teal-950/30 p-2 rounded-md">
                        <MessageSquare className="h-5 w-5 text-teal-500" />
                      </motion.div>
                      <span>Messages</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
              </div>
            </SidebarGroup>
            
            <SidebarSeparator className="my-3" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mx-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  ADMIN
                </motion.div>
              </SidebarGroupLabel>
              
              <div className="space-y-1 px-3 py-2">
                <MotionDiv
                  custom={5}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname.startsWith("/dashboard/admin") ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/admin">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-red-50 dark:bg-red-950/30 p-2 rounded-md">
                        <Shield className="h-5 w-5 text-red-500" />
                      </motion.div>
                      <span>Admin Panel</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
              </div>
            </SidebarGroup>

            <SidebarSeparator className="my-3" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mx-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  ACCOUNT
                </motion.div>
              </SidebarGroupLabel>
              
              <div className="space-y-1 px-3 py-2">
                <MotionDiv
                  custom={6}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/profile" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/profile">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-indigo-50 dark:bg-indigo-950/30 p-2 rounded-md">
                        <User className="h-5 w-5 text-indigo-500" />
                      </motion.div>
                      <span>Profile</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>

                <MotionDiv
                  custom={7}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/billing" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/billing">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-md">
                        <Receipt className="h-5 w-5 text-amber-500" />
                      </motion.div>
                      <span>Billing</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>

                <MotionDiv
                  custom={8}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <MotionButton
                    asChild
                    variant={pathname === "/dashboard/subscriptions" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    whileTap={buttonTapAnimation}
                  >
                    <Link href="/dashboard/subscriptions">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-pink-50 dark:bg-pink-950/30 p-2 rounded-md">
                        <ListChecks className="h-5 w-5 text-pink-500" />
                      </motion.div>
                      <span>Subscriptions</span>
                    </Link>
                  </MotionButton>
                </MotionDiv>
              </div>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="px-4 py-4">
              <MotionButton
                asChild
                variant="ghost"
                className="w-full justify-start border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={buttonTapAnimation}
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </MotionButton>
            </div>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </motion.div>
  )
}
