"use client"

import React, { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardTopNav } from "@/components/dashboard-top-nav"
import { DashboardFooter } from "@/components/dashboard-footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ShowcaseBanner } from "@/components/showcase-banner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <>
      <ShowcaseBanner />
      <SidebarProvider defaultOpen={!isCollapsed} onOpenChange={setIsCollapsed}>
        <DashboardSidebar />
        <SidebarInset className="w-full max-w-full flex flex-col min-h-screen">
          <DashboardTopNav />
          <div className="p-3 sm:p-4 md:p-6 w-full max-w-full flex-1 overflow-x-hidden">{children}</div>
          <DashboardFooter />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
