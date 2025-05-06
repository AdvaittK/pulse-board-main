"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { 
  AreaChart, 
  BarChart3, 
  HeartHandshake, 
  Users, 
  ChartBar, 
  TrendingUp,
  Award,
  Activity
} from "lucide-react";

// Animatable counter component
function Counter({ from, to, duration = 2, className = "" }: { from: number; to: number; duration?: number; className?: string }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, latest => Math.round(latest));
  
  useEffect(() => {
    const animation = animate(count, to, { 
      duration,
      ease: "easeOut", 
    });
    return animation.stop;
  }, [count, to, duration]);
  
  return <motion.span className={className}>{rounded}</motion.span>;
}

export function LandingStats() {
  return (
    <section className="w-full py-16 md:py-20 overflow-hidden relative bg-gradient-to-b from-muted/30 via-muted/40 to-muted/30">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
      
      {/* Floating icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute text-green-500/10 dark:text-green-400/5"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          style={{ top: '15%', right: '10%' }}
        >
          <TrendingUp className="h-28 w-28" />
        </motion.div>
        <motion.div 
          className="absolute text-blue-500/10 dark:text-blue-400/5"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -8, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          style={{ bottom: '10%', right: '15%' }}
        >
          <AreaChart className="h-32 w-32" />
        </motion.div>
        <motion.div 
          className="absolute text-amber-500/10 dark:text-amber-400/5"
          animate={{ 
            y: [0, 12, 0],
            x: [0, -5, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          style={{ top: '40%', left: '10%' }}
        >
          <ChartBar className="h-24 w-24" />
        </motion.div>
      </div>
      
      <div className="w-full container px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center space-y-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></span>
            <span className="text-sm font-medium uppercase tracking-wider text-green-600 dark:text-green-400">Analytics</span>
            <span className="h-1 w-12 bg-gradient-to-r from-emerald-600 to-green-500 rounded-full"></span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600">
            Dashboard Impact
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
            See how organizations are leveraging our dashboard to transform their data into actionable insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {/* Data Visualization stat */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
              <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <AreaChart className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-5xl font-bold mb-2 flex items-baseline">
              <Counter from={0} to={500} />
              <span className="text-lg ml-1">+</span>
            </h3>
            <p className="text-muted-foreground text-center mt-2">Data visualizations available</p>
          </motion.div>

          {/* Happy Clients stat */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
              <div className="p-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <HeartHandshake className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-5xl font-bold mb-2 flex items-baseline">
              <Counter from={0} to={98} />
              <span className="text-lg ml-1">%</span>
            </h3>
            <p className="text-muted-foreground text-center mt-2">Customer satisfaction rate</p>
          </motion.div>

          {/* Active Users stat */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="mb-4 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
              <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                <Users className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-5xl font-bold mb-2 flex items-baseline">
              <Counter from={0} to={180} />
              <span className="text-lg ml-1">K</span>
            </h3>
            <p className="text-muted-foreground text-center mt-2">Active users worldwide</p>
          </motion.div>

          {/* Performance Increase stat */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30">
              <div className="p-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <TrendingUp className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-5xl font-bold mb-2 flex items-baseline">
              <Counter from={0} to={42} />
              <span className="text-lg ml-1">%</span>
            </h3>
            <p className="text-muted-foreground text-center mt-2">Average performance increase</p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Achievement Card 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <ChartBar className="h-32 w-32 transform translate-x-8 -translate-y-8" />
            </div>
            <div className="relative z-10">
              <div className="p-2 mb-4 w-fit rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Industry Recognition</h3>
              <p className="text-muted-foreground">
                PulseBoard ranked in the top 5 analytics dashboards by Enterprise Analytics Monthly for three consecutive years.
              </p>
            </div>
          </div>
          
          {/* Achievement Card 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity className="h-32 w-32 transform translate-x-8 -translate-y-8" />
            </div>
            <div className="relative z-10">
              <div className="p-2 mb-4 w-fit rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Productivity Boost</h3>
              <p className="text-muted-foreground">
                Users report an average 37% reduction in time spent analyzing data after implementing our visualization tools.
              </p>
            </div>
          </div>
          
          {/* Achievement Card 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart3 className="h-32 w-32 transform translate-x-8 -translate-y-8" />
            </div>
            <div className="relative z-10">
              <div className="p-2 mb-4 w-fit rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Adoption</h3>
              <p className="text-muted-foreground">
                Over 500 enterprise customers across 32 countries trust PulseBoard for their mission-critical data visualization needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}