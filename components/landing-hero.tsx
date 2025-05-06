"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  PieChart,
  LineChart, 
  TrendingUp, 
  Activity, 
  BarChart4,
  Sparkles,
  Gauge,
  CircleDollarSign,
  Users,
  BellRing,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Enhanced dashboard demo component with improved animations and visual effects
const DashboardDemo = () => {
  return (
    <motion.div 
      className="relative w-full h-full rounded-lg bg-white dark:bg-slate-900 overflow-hidden shadow-2xl"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Dashboard Header */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 z-10">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.2 }} className="h-2 w-2 bg-red-500 rounded-full"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="h-2 w-2 bg-yellow-500 rounded-full"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="h-2 w-2 bg-green-500 rounded-full"></motion.div>
        </div>
        <div className="flex-1 flex justify-center">
          <motion.div 
            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs flex items-center gap-2"
            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Clock className="h-3 w-3" />
            <span>Last updated: May 6, 2025</span>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Sidebar */}
      <div className="absolute top-12 left-0 bottom-0 w-14 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-4 gap-6">
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.15, y: -2 }} 
          whileTap={{ scale: 0.95 }}
          className="h-7 w-7 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10"
        >
          <PieChart className="h-4 w-4" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.15, y: -2 }} 
          whileTap={{ scale: 0.95 }}
          className="h-7 w-7 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 shadow-md shadow-green-500/10"
        >
          <BarChart3 className="h-4 w-4" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.15, y: -2 }} 
          whileTap={{ scale: 0.95 }}
          className="h-7 w-7 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-md shadow-purple-500/10"
        >
          <LineChart className="h-4 w-4" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.15, y: -2 }} 
          whileTap={{ scale: 0.95 }}
          className="h-7 w-7 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-md shadow-amber-500/10"
        >
          <Users className="h-4 w-4" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }} 
          className="h-7 w-7 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 shadow-md shadow-red-500/10"
        >
          <BellRing className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Dashboard Main Area */}
      <div className="absolute top-12 left-14 right-0 bottom-0 p-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-3 h-full">
          {/* Main chart */}
          <div className="col-span-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 h-[40%] relative shadow-lg shadow-blue-500/5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-semibold">Revenue Overview</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[8px] py-0 h-4">Daily</Badge>
                <Badge variant="outline" className="text-[8px] py-0 h-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">Weekly</Badge>
                <Badge variant="outline" className="text-[8px] py-0 h-4">Monthly</Badge>
              </div>
            </div>
            
            <div className="relative w-full h-[70%]">
              {/* Chart visualization with improved animation and separation */}
              <div className="flex items-end h-full gap-1.5 px-3 relative z-10">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '60%' }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '65%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '45%' }}
                  transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '50%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '75%' }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '80%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '50%' }}
                  transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '55%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '65%' }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '70%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '40%' }}
                  transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '45%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '80%' }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '85%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '60%' }}
                  transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '65%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '70%' }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-blue-600/90 to-blue-400/90 rounded-t-md shadow-lg shadow-blue-500/20"
                  whileHover={{ height: '75%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '85%' }}
                  transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-purple-600/90 to-purple-400/90 rounded-t-md shadow-lg shadow-purple-500/20"
                  whileHover={{ height: '90%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '90%' }}
                  transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-purple-600/90 to-purple-400/90 rounded-t-md shadow-lg shadow-purple-500/20"
                  whileHover={{ height: '95%' }}
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '95%' }}
                  transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
                  className="w-[5%] bg-gradient-to-t from-purple-600/90 to-purple-400/90 rounded-t-md shadow-lg shadow-purple-500/20"
                  whileHover={{ height: '100%' }}
                />
              </div>
              
              {/* Line overlay with improved animation and fixed position */}
              
            </div>
          </div>

          {/* Stats card */}
          <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 h-[40%] flex flex-col shadow-lg shadow-blue-500/5">
            <h3 className="text-xs font-semibold mb-2">Key Metrics</h3>
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 2 }}
                className="flex items-center justify-between p-1.5 border-b border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    whileHover={{ rotate: 15 }} 
                    className="p-1 bg-green-100 dark:bg-green-900/30 rounded text-green-600 dark:text-green-400 shadow-md shadow-green-500/10"
                  >
                    <TrendingUp className="h-3 w-3" />
                  </motion.div>
                  <span className="text-[9px] font-medium">Conversion Rate</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold">4.28%</span>
                  <motion.span 
                    whileHover={{ y: -2 }}
                    className="text-[7px] text-green-600"
                  >
                    <ChevronUp className="h-2 w-2 inline" /> 12%
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 2 }}
                className="flex items-center justify-between p-1.5 border-b border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    whileHover={{ rotate: 15 }} 
                    className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10"
                  >
                    <Users className="h-3 w-3" />
                  </motion.div>
                  <span className="text-[9px] font-medium">Active Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold">14.8k</span>
                  <motion.span 
                    whileHover={{ y: -2 }}
                    className="text-[7px] text-green-600"
                  >
                    <ChevronUp className="h-2 w-2 inline" /> 8%
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 2 }}
                className="flex items-center justify-between p-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <motion.div 
                    whileHover={{ rotate: 15 }} 
                    className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded text-amber-600 dark:text-amber-400 shadow-md shadow-amber-500/10"
                  >
                    <CircleDollarSign className="h-3 w-3" />
                  </motion.div>
                  <span className="text-[9px] font-medium">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold">$24.5k</span>
                  <motion.span 
                    whileHover={{ y: 2 }}
                    className="text-[7px] text-red-600"
                  >
                    <ChevronDown className="h-2 w-2 inline" /> 3%
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Performance card with enhanced chart */}
          <div className="col-span-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 h-[56%] relative shadow-lg shadow-blue-500/5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-semibold">Performance Analytics</h3>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/40"></div>
                <span className="text-[8px] text-muted-foreground">This Week</span>
                <div className="h-2 w-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/40"></div>
                <span className="text-[8px] text-muted-foreground">Last Week</span>
              </div>
            </div>
            
            {/* Line chart visualization with improved animation and effects */}
            <div className="h-[80%] w-full relative pt-3">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 450 180">
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="shadow1" x="-2" y="-2" width="110%" height="110%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#3B82F6" floodOpacity="0.3"/>
                  </filter>
                  <filter id="shadow2" x="-2" y="-2" width="110%" height="110%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#8B5CF6" floodOpacity="0.3"/>
                  </filter>
                </defs>
                
                {/* Background grid lines */}
                <g className="grid-lines" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="3,3">
                  <line x1="0" y1="45" x2="450" y2="45" />
                  <line x1="0" y1="90" x2="450" y2="90" />
                  <line x1="0" y1="135" x2="450" y2="135" />
                  <line x1="90" y1="0" x2="90" y2="180" />
                  <line x1="180" y1="0" x2="180" y2="180" />
                  <line x1="270" y1="0" x2="270" y2="180" />
                  <line x1="360" y1="0" x2="360" y2="180" />
                </g>

                {/* Fill areas under paths */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  d="M0,60 C50,45 100,30 150,45 C200,60 250,15 300,30 C350,45 400,25 450,15 L450,180 L0,180 Z"
                  fill="url(#blueGradient)"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  d="M0,90 C50,75 100,60 150,75 C200,90 250,45 300,60 C350,75 400,55 450,45 L450,180 L0,180 Z"
                  fill="url(#purpleGradient)"
                />
                
                {/* Main path lines */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                  d="M0,60 C50,45 100,30 150,45 C200,60 250,15 300,30 C350,45 400,25 450,15"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#shadow1)"
                />
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
                  d="M0,90 C50,75 100,60 150,75 C200,90 250,45 300,60 C350,75 400,55 450,45"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="4,4"
                  filter="url(#shadow2)"
                />
                
                {/* Data points */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}>
                  <circle cx="0" cy="60" r="3" fill="white" stroke="#3B82F6" strokeWidth="1.5" />
                  <circle cx="150" cy="45" r="3" fill="white" stroke="#3B82F6" strokeWidth="1.5" />
                  <circle cx="300" cy="30" r="3" fill="white" stroke="#3B82F6" strokeWidth="1.5" />
                  <circle cx="450" cy="15" r="3" fill="white" stroke="#3B82F6" strokeWidth="1.5" />
                </motion.g>
              </svg>
            </div>
          </div>
          
          {/* Status card with improved visuals */}
          <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 h-[56%] flex flex-col shadow-lg shadow-blue-500/5">
            <h3 className="text-xs font-semibold mb-2">System Status</h3>
            <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileHover={{ scale: 1.03, x: 2 }}
                className="flex items-center justify-between p-1.5 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-[9px] text-green-800 dark:text-green-300">API</span>
                </div>
                <span className="text-[8px] font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/30 px-1.5 py-0.5 rounded-full">Operational</span>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                whileHover={{ scale: 1.03, x: 2 }}
                className="flex items-center justify-between p-1.5 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  <span className="text-[9px] text-amber-800 dark:text-amber-300">Database</span>
                </div>
                <span className="text-[8px] font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-800/30 px-1.5 py-0.5 rounded-full">Degraded</span>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                whileHover={{ scale: 1.03, x: 2 }}
                className="flex items-center justify-between p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-[9px] text-blue-800 dark:text-blue-300">CDN</span>
                </div>
                <span className="text-[8px] font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/30 px-1.5 py-0.5 rounded-full">Operational</span>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.3 }}
                whileHover={{ scale: 1.03, x: 2 }}
                className="flex items-center justify-between p-1.5 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-[9px] text-green-800 dark:text-green-300">Storage</span>
                </div>
                <span className="text-[8px] font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/30 px-1.5 py-0.5 rounded-full">Operational</span>
              </motion.div>
              
              <div className="mt-auto border-t border-slate-100 dark:border-slate-700 pt-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-purple-500" />
                  <span className="text-[8px] text-muted-foreground">Next Update:</span>
                </div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-[9px] font-semibold"
                >
                  May 8, 2025
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced landing hero section
export function LandingHero() {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-gradient-to-b from-background to-muted/30 via-muted/20 pt-0 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Floating icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute text-blue-500/10 dark:text-blue-400/5"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          style={{ top: '20%', right: '15%' }}
        >
          <BarChart3 className="h-36 w-36" />
        </motion.div>
        <motion.div 
          className="absolute text-purple-500/10 dark:text-purple-400/5"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -10, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          style={{ bottom: '15%', left: '10%' }}
        >
          <PieChart className="h-28 w-28" />
        </motion.div>
        <motion.div 
          className="absolute text-green-500/10 dark:text-green-400/5"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          style={{ top: '60%', right: '25%' }}
        >
          <LineChart className="h-24 w-24" />
        </motion.div>
      </div>

      <div className="w-full container px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition-colors border-blue-200 dark:border-blue-800">
                Portfolio Project
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
              variants={fadeIn}
            >
              Interactive <br className="hidden lg:block" />Dashboard Suite
            </motion.h1>
            <motion.p 
              className="max-w-[600px] text-muted-foreground md:text-xl"
              variants={fadeIn}
            >
              A professional dashboard showcase with interactive charts, analytics, and data visualization components designed by Advait K.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={fadeIn}
            >
              <Button size="lg" className="gap-2 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all" asChild>
                <Link href="/dashboard">
                  Explore Dashboard <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg border-blue-300 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/50" asChild>
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative h-[400px] lg:h-[550px] rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 dark:from-blue-500/10 dark:to-purple-500/10 z-10 mix-blend-overlay rounded-lg" />
            <DashboardDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}