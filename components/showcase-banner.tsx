"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function ShowcaseBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if mobile viewport and hide banner appropriately
  useEffect(() => {
    // Check if on mobile view
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3">
      <div className="flex-1">
        <h3 className="font-medium text-sm">Portfolio Project</h3>
        <p className="text-xs text-muted-foreground">A showcase dashboard by Advait K.</p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}