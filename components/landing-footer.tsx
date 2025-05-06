"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  Globe,
  Users,
  HeartHandshake,
  BadgeCheck,
  ArrowRight
} from "lucide-react"

interface FooterProps {
  className?: string
}

export function LandingFooter({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  // Footer sections data
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "#" },
        { label: "Analytics", href: "/#stats" },
        { label: "Roadmap", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Community", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ]
    }
  ]
  
  // Social links data
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/AdvaittK", icon: Github },
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Email", href: "mailto:contact@example.com", icon: Mail }
  ]
  
  // Main features/highlights  
  const companyHighlights = [
    { 
      title: "Global Scale", 
      icon: Globe,
      description: "Our platform is designed to scale with your business needs worldwide." 
    },
    { 
      title: "Community Driven", 
      icon: Users,
      description: "Join thousands of users building amazing dashboards with our tools." 
    },
    { 
      title: "Enterprise Ready", 
      icon: BadgeCheck,
      description: "Secure, compliant, and built for mission-critical applications." 
    },
    { 
      title: "Partner Program", 
      icon: HeartHandshake,
      description: "Work with us to build integrations and extend our platform." 
    }
  ]
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "w-full border-t py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background/60 to-muted/30 backdrop-blur-sm",
        className
      )}
    >
      <div className="w-full container px-4 sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-100/50 dark:border-blue-800/20 p-6 md:p-8 lg:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Stay in the loop</h3>
              <p className="text-muted-foreground max-w-md">
                Subscribe to our newsletter to receive updates about new features, data insights tips, and exclusive offers.
              </p>
            </div>
            <div className="lg:col-span-2 w-full">
              <div className="flex w-full max-w-md space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/90 dark:bg-slate-800/90 border-blue-200 dark:border-blue-800/50 focus-visible:ring-blue-500"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
        
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          <div className="space-y-6 lg:space-y-8">
            {/* Brand and description */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm shadow-sm">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-xl font-extrabold tracking-tight">
                  PulseBoard
                </span>
              </Link>
              
              <p className="text-muted-foreground text-sm max-w-xs">
                A professional dashboard showcase with interactive data visualization features and modern UI design. 
                Perfect for startups, analytics teams, and developers.
              </p>
            </div>
            
            {/* Social links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Connect with us</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-9 w-9 rounded-full bg-background hover:bg-muted/50 border-muted"
                    >
                      <Link href={link.href} aria-label={link.label}>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Quick links sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-blue-600 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-3 w-3 mr-1.5 text-muted-foreground/70 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {section.title === "Product" && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mt-2 h-8 text-blue-600 hover:bg-blue-50/50 hover:text-blue-700 dark:hover:bg-blue-950/50 -ml-2 px-2"
                >
                  <Link href="/dashboard" className="flex items-center gap-1">
                    <span>View Dashboard</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <Separator className="my-12 opacity-50" />
        
        {/* Company highlights section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {companyHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h5 className="font-medium mb-1">{item.title}</h5>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom footer section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-muted/70">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} PulseBoard</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Portfolio Project by Advait K</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.footer>
  )
}