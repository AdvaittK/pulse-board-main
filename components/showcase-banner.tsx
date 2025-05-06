"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function ShowcaseBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  
  // Only show banner on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    
    // Check if the banner was previously dismissed
    const bannerDismissed = localStorage.getItem("showcase_banner_dismissed")
    if (bannerDismissed) {
      setIsVisible(false)
    }
  }, [])
  
  const dismissBanner = () => {
    setIsVisible(false)
    localStorage.setItem("showcase_banner_dismissed", "true")
  }
  
  if (!isMounted || !isVisible) {
    return null
  }
  
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center relative">
      <p className="text-sm font-medium">
        📱 <span className="font-semibold">Frontend Showcase Mode</span> - All data is simulated for demonstration purposes
      </p>
      <button 
        onClick={dismissBanner} 
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary-foreground/20"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}