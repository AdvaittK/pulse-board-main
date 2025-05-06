"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface WidgetProps {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  bgColor?: string;
  iconBg?: string;
  growth?: string;
  growthColor?: string;
}

const Widget = (props: WidgetProps) => {
  const { 
    icon, 
    title, 
    subtitle, 
    bgColor = "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    iconBg = "bg-blue-500",
    growth,
    growthColor = "text-emerald-500"
  } = props;
  
  // Determine if growth is positive
  const isPositiveGrowth = growth && !growth.includes("-");
  
  return (
    <Card className="border-0 overflow-hidden shadow-md rounded-2xl h-auto">
      <CardContent className="p-0">
        <div className={cn(
          "bg-gradient-to-br p-5 h-full flex flex-row items-center justify-between",
          bgColor
        )}>
          <div className="flex items-center gap-4">
            <div className={cn(
              "rounded-xl p-3 flex items-center justify-center text-white shadow-sm",
              iconBg
            )}>
              {icon}
            </div>
            
            <div className="flex flex-col">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {title}
              </p>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mt-0.5">
                {subtitle}
              </h4>
              
              {growth && (
                <div className={cn(
                  "flex items-center mt-1.5 text-xs font-medium",
                  growthColor
                )}>
                  {isPositiveGrowth ? (
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 mr-1" />
                  )}
                  <span>{growth} from last month</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="opacity-10">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: [0.9, 1.1, 0.9], 
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-slate-800 dark:text-white"
            >
              {icon}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Widget;