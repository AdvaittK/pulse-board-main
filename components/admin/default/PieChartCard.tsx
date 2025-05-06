import React from "react";
import { motion } from "framer-motion";
import PieChart from '@/components/charts/PieChart';
import { pieChartData, pieChartOptions } from '@/variables/charts';
import Card from '@/components/card';
import { cn } from "@/lib/utils";
import { MdPieChart, MdMemory, MdStorage, MdCloud } from "react-icons/md";

const PieChartCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full h-full"
    >
      <Card 
        extra={cn(
          "rounded-2xl p-3 h-full border-none overflow-hidden",
          "shadow-md hover:shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-white to-purple-50",
          "dark:from-slate-900 dark:to-purple-950/30"
        )}
      >
        <div className="flex flex-row justify-between px-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <MdPieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              Resource Usage
            </h4>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <select className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium",
              "text-slate-700 dark:text-slate-300",
              "border border-slate-200 dark:border-slate-700",
              "bg-white dark:bg-slate-800",
              "hover:bg-slate-50 dark:hover:bg-slate-700",
              "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-500/30",
              "outline-none transition-all duration-200"
            )}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {/* Resource Usage Section */}
        <div className="mb-3 px-3 bg-white/50 dark:bg-slate-800/50 p-2 rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <MdMemory className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">CPU Usage</span>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">78%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <MdStorage className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Memory</span>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">65%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-purple-600 dark:bg-purple-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <MdCloud className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Cloud Storage</span>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">42%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-amber-600 dark:bg-amber-500 h-1.5 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-auto flex h-[180px] w-full items-center justify-center p-2">
          <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-b from-transparent via-purple-400/5 to-transparent dark:via-purple-600/5"></div>
          <div className="chart-container rounded-lg overflow-hidden filter drop-shadow-lg">
            <PieChart chartOptions={pieChartOptions} chartData={pieChartData} />
          </div>
        </div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={cn(
            "flex flex-row !justify-between rounded-xl px-6 py-3 mt-2",
            "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
            "shadow-md dark:shadow-slate-900/30"
          )}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <p className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">Your Files</p>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
              63%
            </p>
          </div>

          <div className="h-14 w-px bg-slate-200 dark:bg-slate-700" />

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-cyan-500" />
              <p className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">System</p>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
              25%
            </p>
          </div>
          
          <div className="h-14 w-px bg-slate-200 dark:bg-slate-700" />
          
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <p className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">Other</p>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
              12%
            </p>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default PieChartCard;