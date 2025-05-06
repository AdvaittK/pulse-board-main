"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart3, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  ExternalLink, 
  Github
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface NavMenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ElementType;
  external?: boolean;
}

export function LandingHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // Navigation data structure
  const mainNavItems = [
    { label: "Features", href: "/#features" },
    { label: "Analytics", href: "/#stats" },
    { label: "Get Started", href: "/#cta" }
  ]

  const resourcesItems: NavMenuItem[] = [
    { 
      label: "Documentation", 
      href: "#", 
      description: "Learn how to integrate our APIs and use our tools",
      icon: ExternalLink
    },
    { 
      label: "API Reference", 
      href: "#", 
      description: "Detailed API documentation for developers",
      icon: ExternalLink
    },
    { 
      label: "GitHub", 
      href: "https://github.com/AdvaittK", 
      description: "Check out our code repositories",
      icon: Github,
      external: true
    }
  ]
  
  // Handle scroll effect for enhanced header
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800/80" 
          : "bg-background/70 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="w-full container px-4 sm:px-6 lg:px-8 flex h-16 md:h-18 items-center justify-between">
        <motion.div 
          className="flex items-center gap-2 font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm shadow-sm">
            <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-xl md:text-2xl font-extrabold tracking-tight">PulseBoard</span>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {mainNavItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link 
                href={item.href} 
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1"
                >
                  Resources
                  <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground/70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
                <div className="grid gap-1 p-2">
                  {resourcesItems.map((item) => {
                    const Icon = item.icon || ExternalLink;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="flex items-start space-x-2 rounded-md p-2 hover:bg-muted transition-colors"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-muted bg-background">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </motion.div>
        </nav>
        
        <motion.div 
          className="flex items-center gap-3 md:gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="hidden md:inline-flex border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
          >
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button 
            size="sm" 
            asChild 
            className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/dashboard" className="flex items-center gap-1">
              Dashboard
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
          
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-lg font-bold">PulseBoard</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-col space-y-4 mt-4">
                <AnimatePresence>
                  {mainNavItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link 
                        href={item.href} 
                        className="flex items-center justify-between py-2 text-base font-medium hover:text-blue-600 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <Separator className="my-2" />
                
                <div className="space-y-1 py-2">
                  <p className="text-xs uppercase font-medium text-muted-foreground tracking-wider mb-2 pl-1">Resources</p>
                  {resourcesItems.map((item, index) => {
                    const Icon = item.icon || ExternalLink;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + 0.05 * index }}
                      >
                        <Link 
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="flex items-center py-2 text-sm hover:text-blue-600 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {item.label}
                          {item.external && <ExternalLink className="h-3 w-3 ml-1 text-muted-foreground/50" />}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
                
                <Separator className="my-2" />
                
                <div className="space-y-3 pt-4">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link 
                      href="/dashboard" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center"
                    >
                      Dashboard
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link 
                      href="/dashboard" 
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  )
}