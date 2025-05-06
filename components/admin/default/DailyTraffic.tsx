import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BarChart from '@/components/charts/BarChart';
import { barChartDataDailyTraffic, barChartOptionsDailyTraffic } from '@/variables/charts';
import { MdArrowDropUp, MdPeople, MdSchedule, MdDevices, MdTrendingUp } from 'react-icons/md';
import Card from '@/components/card';
import { cn } from "@/lib/utils";

// Traffic source data for the list
const trafficSources = [
  { source: "Direct", visits: 845, percentage: 32.8, trend: "+5.2%" },
  { source: "Organic Search", visits: 684, percentage: 26.5, trend: "+3.1%" },
  { source: "Referral", visits: 578, percentage: 22.4, trend: "+7.0%" },
  { source: "Social Media", visits: 472, percentage: 18.3, trend: "+2.5%" },
];

const DailyTraffic = () => {
  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Add observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkNow = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDarkNow);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full h-full"
    >
      <Card 
        extra={cn(
          "!p-[20px] rounded-2xl h-full border-none",
          "shadow-md hover:shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-white to-cyan-50",
          "dark:from-slate-900 dark:to-cyan-950/30",
          "flex flex-col"
        )}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
              <MdPeople className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Daily Traffic
              </p>
              <p className="text-[28px] font-bold text-slate-800 dark:text-white">
                2,579{' '}
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Visitors
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center justify-center px-2 py-1 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30">
              <MdArrowDropUp className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
              <p className="font-bold text-emerald-500 dark:text-emerald-400"> +2.45% </p>
            </div>
          </div>
        </div>

        <div className="h-[180px] w-full mt-4 relative">
          <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent dark:via-cyan-600/5"></div>
          <BarChart
            chartData={barChartDataDailyTraffic}
            chartOptions={{
              ...barChartOptionsDailyTraffic,
              theme: {
                mode: isDarkMode ? 'dark' : 'light'
              },
              chart: {
                ...barChartOptionsDailyTraffic.chart,
                toolbar: {
                  show: false,
                },
                background: 'transparent',
              },
              tooltip: {
                ...barChartOptionsDailyTraffic.tooltip,
                theme: isDarkMode ? 'dark' : 'light',
              }
            }}
          />
        </div>
        
        {/* Stats section */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-2 bg-cyan-50/70 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30 flex flex-col items-center"
          >
            <MdSchedule className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Avg. Time</p>
            <p className="font-semibold text-slate-800 dark:text-white">3:42</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-2 bg-cyan-50/70 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30 flex flex-col items-center"
          >
            <MdDevices className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Mobile</p>
            <p className="font-semibold text-slate-800 dark:text-white">64.8%</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-2 bg-cyan-50/70 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30 flex flex-col items-center"
          >
            <MdTrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Bounce</p>
            <p className="font-semibold text-slate-800 dark:text-white">27.4%</p>
          </motion.div>
        </div>

        {/* Traffic sources section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-xl p-3 bg-white/60 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/30"
        >
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Traffic Sources</p>
          <div className="space-y-2">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400">{source.source}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{source.visits}</span>
                  <span className="text-emerald-500 dark:text-emerald-400 text-[10px]">{source.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default DailyTraffic;