import React from "react";
import { motion } from "framer-motion";
import CardMenu from "@/components/card/CardMenu";
import Checkbox from "@/components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "@/components/card";
import { cn } from "@/lib/utils";

const TaskCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full h-full"
    >
      <Card 
        extra={cn(
          "pb-7 p-[20px] rounded-2xl h-full border-none",
          "shadow-md hover:shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-white to-purple-50",
          "dark:from-slate-900 dark:to-purple-950/30"
        )}
      >
        {/* task header */}
        <div className="relative flex flex-row justify-between">
          <div className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <MdCheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="ml-4 text-xl font-bold text-slate-800 dark:text-white">
              Tasks
            </h4>
          </div>
          <CardMenu />
        </div>

        {/* task content */}
        <div className="h-full w-full mt-4">
          <div className="rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
            {[
              "Landing Page Design",
              "Mobile App Design",
              "Dashboard Builder",
              "User Research",
              "Backend Integration"
            ].map((task, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={cn(
                  "flex items-center justify-between p-3",
                  "hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors",
                  index !== 4 ? "border-b border-gray-200 dark:border-slate-700" : ""
                )}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center rounded-md p-0.5 bg-white dark:bg-slate-800 shadow-sm">
                    <Checkbox color="purple" />
                  </div>
                  <p className="text-base font-medium text-slate-700 dark:text-white">
                    {task}
                  </p>
                </div>
                <div className="cursor-move hover:bg-slate-200/70 dark:hover:bg-slate-700/70 rounded-lg p-1">
                  <MdDragIndicator className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center px-1">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              5 incomplete tasks
            </p>
            <button className={cn(
              "text-sm font-medium py-2 px-3 rounded-lg",
              "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
              "hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
            )}>
              View All
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;