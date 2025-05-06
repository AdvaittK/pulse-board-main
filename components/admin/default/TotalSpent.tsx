import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
  MdInfoOutline,
  MdTrendingUp,
  MdHistory,
  MdLightbulbOutline,
} from "react-icons/md";
import Card from "@/components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "@/variables/charts";
import LineChart from "@/components/charts/LineChart";
import { cn } from "@/lib/utils";

// Add this spending data for the progress bars
const spendingCategories = [
  { name: "Marketing", percentage: 42, color: "bg-blue-500 dark:bg-blue-600" },
  { name: "Development", percentage: 28, color: "bg-purple-500 dark:bg-purple-600" },
  { name: "Infrastructure", percentage: 18, color: "bg-emerald-500 dark:bg-emerald-600" },
  { name: "Operations", percentage: 12, color: "bg-amber-500 dark:bg-amber-600" },
];

const TotalSpent = () => {
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
            "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
            "transition duration-200 hover:bg-blue-100 dark:hover:bg-blue-800/40",
            "hover:shadow-sm hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20"
          )}>
            <MdOutlineCalendarToday />
            <span className="text-sm font-medium">This month</span>
          </button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className={cn(
              "!linear z-[1] flex items-center justify-center rounded-lg p-2",
              "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
              "!transition !duration-200 hover:bg-blue-500/20 dark:hover:bg-blue-500/30",
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
                $37.5K
              </motion.p>
              <div className="flex flex-col items-start">
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Total Spent</p>
                <div className="flex flex-row items-center justify-center">
                  <span className="flex items-center justify-center rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 p-1">
                    <MdArrowDropUp className="text-emerald-500 dark:text-emerald-400" />
                  </span>
                  <p className="ml-1 text-sm font-bold text-emerald-500 dark:text-emerald-400"> +2.45% </p>
                </div>
              </div>
            </div>
            
            <div className="h-[220px] flex-grow relative">
              <div className="absolute inset-0">
                <LineChart
                  chartOptions={{
                    ...lineChartOptionsTotalSpent,
                    theme: {
                      mode: isDarkMode ? 'dark' : 'light'
                    },
                    chart: {
                      ...lineChartOptionsTotalSpent.chart,
                      background: 'transparent',
                      toolbar: {
                        show: false,
                      },
                      type: 'line',
                    },
                    stroke: {
                      curve: 'smooth',
                    },
                    tooltip: {
                      ...lineChartOptionsTotalSpent.tooltip,
                      theme: isDarkMode ? 'dark' : 'light',
                    },
                    xaxis: {
                      ...lineChartOptionsTotalSpent.xaxis,
                      type: 'category',
                    }
                  }}
                  chartData={lineChartDataTotalSpent}
                />
              </div>
            </div>
          </div>
          
          {/* Spending stats section */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
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
                  <MdTrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Monthly Average</p>
                  <p className="font-semibold text-slate-800 dark:text-white">$12.5K</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "rounded-xl p-3",
                "bg-purple-50/50 dark:bg-purple-900/20",
                "border border-purple-100 dark:border-purple-800/30"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "rounded-full p-2 mr-3",
                  "bg-purple-100 dark:bg-purple-800/30"
                )}>
                  <MdHistory className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Year To Date</p>
                  <p className="font-semibold text-slate-800 dark:text-white">$142.8K</p>
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
                  <MdInfoOutline className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Projected Q2</p>
                  <p className="font-semibold text-slate-800 dark:text-white">$45.2K</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* New spending breakdown section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 rounded-xl p-4 bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="rounded-full p-2 mr-2 bg-slate-100 dark:bg-slate-700">
                  <MdLightbulbOutline className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Spending Breakdown</h3>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                View Report
              </span>
            </div>
            
            <div className="space-y-3">
              {spendingCategories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 dark:text-slate-300">{category.name}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{category.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                      className={`h-full rounded-full ${category.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
              <span>Last updated: May 1, 2025</span>
              <span className="cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                Compare to Previous Month →
              </span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TotalSpent;