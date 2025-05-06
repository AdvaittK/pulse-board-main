import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/card";
import BarChart from "@/components/charts/BarChart";
import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "@/variables/charts";
import { 
  MdBarChart, 
  MdOutlineCalendarToday,
  MdTrendingUp,
  MdAttachMoney,
  MdPieChart
} from "react-icons/md";
import { cn } from "@/lib/utils";

// Weekly performance data for the progress cards
const weeklyPerformance = [
  { day: "Monday", revenue: 6.4, percentage: 65, color: "bg-indigo-500 dark:bg-indigo-600" },
  { day: "Tuesday", revenue: 7.8, percentage: 78, color: "bg-blue-500 dark:bg-blue-600" },
  { day: "Wednesday", revenue: 9.2, percentage: 92, color: "bg-emerald-500 dark:bg-emerald-600" },
  { day: "Thursday", revenue: 8.4, percentage: 84, color: "bg-amber-500 dark:bg-amber-600" },
];

const WeeklyRevenue = () => {
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
          "!p-[20px] text-center rounded-2xl border-none",
          "shadow-md hover:shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-white to-slate-50",
          "dark:from-slate-900 dark:to-slate-800",
          "flex flex-col h-full"
        )}
      >
        <div className="flex justify-between">
          <button className={cn(
            "linear mt-1 flex items-center justify-center gap-2 rounded-lg p-2",
            "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
            "transition duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800/40",
            "hover:shadow-sm hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/20"
          )}>
            <MdOutlineCalendarToday />
            <span className="text-sm font-medium">This week</span>
          </button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className={cn(
              "!linear z-[1] flex items-center justify-center rounded-lg p-2",
              "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300",
              "!transition !duration-200 hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30",
              "shadow-sm hover:shadow"
            )}
          >
            <MdBarChart className="h-6 w-6" />
          </motion.button>
        </div>

        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row justify-between sm:flex-wrap lg:flex-nowrap">
            <div className="flex flex-col">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mt-[20px] text-3xl font-bold text-slate-800 dark:text-white"
              >
                $57.4K
              </motion.p>
              <div className="flex flex-col items-start">
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Weekly Revenue</p>
                <div className="flex flex-row items-center justify-center">
                  <span className="flex items-center justify-center rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 p-1">
                    <MdTrendingUp className="text-emerald-500 dark:text-emerald-400" />
                  </span>
                  <p className="ml-1 text-sm font-bold text-emerald-500 dark:text-emerald-400"> +12.6% </p>
                </div>
              </div>
            </div>
            
            <div className="h-[220px] flex-grow relative">
              <div className="absolute inset-0">
                <BarChart
                  chartData={barChartDataWeeklyRevenue}
                  chartOptions={{
                    ...barChartOptionsWeeklyRevenue,
                    theme: {
                      mode: isDarkMode ? 'dark' : 'light'
                    },
                    chart: {
                      ...barChartOptionsWeeklyRevenue.chart,
                      toolbar: {
                        show: false,
                      },
                      background: 'transparent',
                    },
                    tooltip: {
                      ...barChartOptionsWeeklyRevenue.tooltip,
                      theme: isDarkMode ? 'dark' : 'light',
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Revenue stats section */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "rounded-xl p-3",
                "bg-indigo-50/50 dark:bg-indigo-900/20",
                "border border-indigo-100 dark:border-indigo-800/30"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "rounded-full p-2 mr-3",
                  "bg-indigo-100 dark:bg-indigo-800/30"
                )}>
                  <MdAttachMoney className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Average Sale</p>
                  <p className="font-semibold text-slate-800 dark:text-white">$1.2K</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "rounded-xl p-3",
                "bg-blue-50/50 dark:bg-blue-900/20",
                "border border-blue-100 dark:border-blue-800/30"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "rounded-full p-2 mr-3",
                  "bg-blue-100 dark:bg-blue-800/30"
                )}>
                  <MdPieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Gross Profit</p>
                  <p className="font-semibold text-slate-800 dark:text-white">$23.9K</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={cn(
                "rounded-xl p-3",
                "bg-emerald-50/50 dark:bg-emerald-900/20",
                "border border-emerald-100 dark:border-emerald-800/30"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "rounded-full p-2 mr-3",
                  "bg-emerald-100 dark:bg-emerald-800/30"
                )}>
                  <MdTrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Conversion</p>
                  <p className="font-semibold text-slate-800 dark:text-white">4.3%</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Daily breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 rounded-xl p-4 bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="rounded-full p-2 mr-2 bg-slate-100 dark:bg-slate-700">
                  <MdBarChart className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Daily Performance</h3>
              </div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
                Weekly Report
              </span>
            </div>
            
            <div className="space-y-3">
              {weeklyPerformance.map((day, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 dark:text-slate-300">{day.day}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">${day.revenue}K</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${day.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                      className={`h-full rounded-full ${day.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
              <span>Last updated: May 1, 2025</span>
              <span className="cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                Compare to Last Week →
              </span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeeklyRevenue;