"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart, 
  ExternalLink, 
  HelpCircle,
  Headphones,
  FileText,
  LifeBuoy
} from "lucide-react"

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function DashboardFooter({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Changelog", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Community", href: "#" },
        { name: "Support", href: "#" },
        { name: "API", href: "#" },
      ]
    },
    
  ]

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Email", icon: Mail, href: "mailto:demo@example.com" }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 mt-auto",
        className
      )}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.footer>)}
    >
      <div className="container mx-auto p-6 md:p-8">
        {/* Quick help section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">Help Center</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">Find answers to common questions and issues</p>
            <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 font-medium" asChild>
              <Link href="#" className="inline-flex items-center">
                Browse articles
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-medium text-emerald-800 dark:text-emerald-300">Documentation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">Comprehensive guides and API references</p>
            <Button variant="link" className="p-0 h-auto text-emerald-600 dark:text-emerald-400 font-medium" asChild>
              <Link href="#" className="inline-flex items-center">
                Read docs
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-2 p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Headphones className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium text-purple-800 dark:text-purple-300">Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">Get personalized help from our support team</p>
            <Button variant="link" className="p-0 h-auto text-purple-600 dark:text-purple-400 font-medium" asChild>
              <Link href="#" className="inline-flex items-center">
                Contact us
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mr-2">
                  <span className="text-white font-bold">PB</span>
                </div>
                <span className="font-bold text-xl">PulseBoard</span>
                <span className="ml-2 text-xs rounded-full px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Demo</span>
              </Link>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
                A professional dashboard template for modern web applications with beautiful UI components.
              </p>
              
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Button 
                      key={link.name}
                      variant="ghost" 
                      size="icon" 
                      asChild 
                      className="rounded-full h-9 w-9 hover:bg-slate-200/70 dark:hover:bg-slate-800/70"
                    >
                      <Link href={link.href}>
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{link.name}</span>
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
          
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-200">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Button variant="link" className="p-0 h-auto text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" asChild>
                      <Link href={link.href}>{link.name}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        {/* Copyright section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} PulseBoard Demo. All rights reserved.
          </p>
          
          
          <div className="flex items-center space-x-4">
            <Button variant="link" className="p-0 h-auto text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" asChild>
              <Link href="#">Terms</Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" asChild>
              <Link href="#">Privacy</Link>
            </Button>
            <Button variant="link" className="p-0 h-auto text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" asChild>
              <Link href="#">Cookies</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs rounded-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-1"
          >
            <LifeBuoy className="h-3 w-3" />
            <span>Status: All systems operational</span>
          </Button>
        </div>
      </div>
    </motion.footer>
  )
}