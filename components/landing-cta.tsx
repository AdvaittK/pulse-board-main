"use client";

import Link from "next/link";
import { ArrowRight, Laptop, Code, Github, LineChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function LandingCTA() {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-gradient-to-b from-card via-card/95 to-card relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      {/* Floating icons animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute text-blue-500/10 dark:text-blue-400/5"
          animate={{ 
            y: [0, -18, 0],
            x: [0, 12, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          style={{ top: '20%', right: '20%' }}
        >
          <Laptop className="h-28 w-28" />
        </motion.div>
        <motion.div 
          className="absolute text-purple-500/10 dark:text-purple-400/5"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          style={{ bottom: '20%', left: '20%' }}
        >
          <Code className="h-24 w-24" />
        </motion.div>
        <motion.div 
          className="absolute text-amber-500/10 dark:text-amber-400/5"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -8, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          style={{ top: '25%', left: '10%' }}
        >
          <LineChart className="h-20 w-20" />
        </motion.div>
        <motion.div 
          className="absolute text-green-500/10 dark:text-green-400/5"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 5, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          style={{ bottom: '30%', right: '15%' }}
        >
          <Sparkles className="h-16 w-16" />
        </motion.div>
      </div>

      <div className="w-full container px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
              Ready to Explore?
            </h2>
            <p className="text-muted-foreground md:text-xl mb-8">
              Take a tour of our dashboard demo and experience the full range of features and capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all" asChild>
                <Link href="/dashboard">
                  Launch Dashboard <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/50" asChild>
                <Link href="https://github.com/AdvaittK" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-1" /> View on GitHub
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}