"use client";

import { 
  BarChart3, 
  LineChart, 
  Cpu, 
  Shield, 
  Gauge,
  Dices,
  Layers,
  PanelLeft,
  Sparkles,
  Notebook,
  ArrowRightLeft,
  Radar,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const iconColors = {
  dashboard: ["from-blue-500 to-blue-600", "bg-blue-50 dark:bg-blue-950/30", "text-blue-600 dark:text-blue-400"],
  analytics: ["from-green-500 to-emerald-600", "bg-green-50 dark:bg-green-950/30", "text-green-600 dark:text-green-400"],
  ai: ["from-purple-500 to-violet-600", "bg-purple-50 dark:bg-purple-950/30", "text-purple-600 dark:text-purple-400"],
  security: ["from-red-500 to-rose-600", "bg-red-50 dark:bg-red-950/30", "text-red-600 dark:text-red-400"],
  performance: ["from-amber-500 to-orange-600", "bg-amber-50 dark:bg-amber-950/30", "text-amber-600 dark:text-amber-400"],
  customization: ["from-indigo-500 to-indigo-600", "bg-indigo-50 dark:bg-indigo-950/30", "text-indigo-600 dark:text-indigo-400"],
  integration: ["from-cyan-500 to-sky-600", "bg-cyan-50 dark:bg-cyan-950/30", "text-cyan-600 dark:text-cyan-400"],
  responsive: ["from-teal-500 to-teal-600", "bg-teal-50 dark:bg-teal-950/30", "text-teal-600 dark:text-teal-400"],
};

// Enhanced features with more icons and better descriptions
const features = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    colors: iconColors.dashboard,
    title: "Intuitive Dashboard",
    description: "Clean modern UI with customizable widgets and drag-and-drop layouts for maximum productivity and data visibility."
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    colors: iconColors.analytics,
    title: "Advanced Analytics",
    description: "Interactive data visualization with real-time updates, trend analysis, and comprehensive reporting features."
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    colors: iconColors.ai,
    title: "AI-Powered Insights",
    description: "Machine learning algorithms analyze patterns in your data to provide actionable recommendations and predictive analytics."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    colors: iconColors.security,
    title: "Enterprise Security",
    description: "Role-based access control, data encryption, and compliance features to keep sensitive information secure at all times."
  },
  {
    icon: <Gauge className="h-8 w-8" />,
    colors: iconColors.performance,
    title: "Optimized Performance",
    description: "Lightning-fast data processing and visualization with optimized queries and efficient rendering techniques."
  },
  {
    icon: <Layers className="h-8 w-8" />,
    colors: iconColors.customization,
    title: "Theming & Styling",
    description: "Fully customizable themes with light/dark mode support and design system integration for a consistent look and feel."
  },
  {
    icon: <ArrowRightLeft className="h-8 w-8" />,
    colors: iconColors.integration,
    title: "API Integration",
    description: "Connect to any data source with our flexible API connectors and data transformation pipeline for seamless integration."
  },
  {
    icon: <PanelLeft className="h-8 w-8" />,
    colors: iconColors.responsive,
    title: "Responsive Design",
    description: "Perfectly optimized for all device sizes from mobile to desktop with adaptive layouts and touch interactions."
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-16 md:py-20 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      {/* Floating icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute text-blue-500/10 dark:text-blue-400/5"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          style={{ top: '15%', left: '10%' }}
        >
          <Sparkles className="h-24 w-24" />
        </motion.div>
        <motion.div 
          className="absolute text-purple-500/10 dark:text-purple-400/5"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          style={{ top: '60%', right: '10%' }}
        >
          <Notebook className="h-32 w-32" />
        </motion.div>
        <motion.div 
          className="absolute text-green-500/10 dark:text-green-400/5"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -5, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          style={{ bottom: '20%', left: '15%' }}
        >
          <Radar className="h-20 w-20" />
        </motion.div>
      </div>
      
      <div className="w-full container px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
              <span className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">Capabilities</span>
              <span className="h-1 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
              Powerful Features
            </h2>
          </motion.div>
          <motion.p 
            className="text-muted-foreground md:text-xl max-w-[800px] mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our dashboard combines beautiful design with powerful functionality to help you visualize,
            analyze, and extract insights from your data efficiently.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 } 
                }
              }}
            >
              <Card className="h-full transition-all border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-800">
                <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                  <div className={`mb-5 p-3 rounded-xl bg-gradient-to-br ${feature.colors[1]} group-hover:bg-opacity-70 transition-colors`}>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.colors[0]} text-white`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Central divider with animation */}
        <motion.div 
          className="flex items-center justify-center my-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-600"></span>
          <div className="mx-4 p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-purple-600"></span>
        </motion.div>
        
        {/* Feature highlight */}
        <motion.div 
          className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="p-4 rounded-2xl bg-blue-500 flex items-center justify-center">
                <Dices className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Beyond The Basics</h3>
              <p className="text-muted-foreground">
                PulseBoard doesn't just display your data - it transforms it into actionable intelligence with our advanced AI analysis engine, 
                providing recommendations and highlighting trends you might otherwise miss. Say goodbye to manual data exploration and 
                hello to automated insights that drive business decisions.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Machine Learning</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">Trend Detection</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Smart Alerts</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">Predictive Analysis</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}