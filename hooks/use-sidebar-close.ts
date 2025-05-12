"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useSidebar } from "@/components/ui/sidebar"

/**
 * Hook to automatically close the mobile sidebar when navigating between pages
 */
export function useSidebarClose() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  
  // Close the mobile sidebar when navigating to a new page
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [pathname, isMobile, setOpenMobile])
  
  /**
   * Helper function to close the mobile sidebar when a link is clicked
   */
  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  
  return {
    closeSidebar
  }
}
