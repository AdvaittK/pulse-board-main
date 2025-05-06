"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

// Define plan types
interface PlanFeature {
  name: string
  description?: string
  free: boolean | string | number
  pro: boolean | string | number
  business: boolean | string | number
}

interface Plan {
  name: string
  description: string
  price: {
    monthly: number
    annual: number
  }
  popular?: boolean
  features: string[]
}

export function PlanComparison() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  
  // Plan data
  const plans: Plan[] = [
    {
      name: 'Free',
      description: 'For individuals getting started with basic dashboards',
      price: {
        monthly: 0,
        annual: 0
      },
      features: [
        'Up to 2 dashboards',
        'Basic data visualizations',
        'Limited data connections',
        'Community support',
        '30-day data history'
      ]
    },
    {
      name: 'Pro',
      description: 'For professionals needing advanced analytics',
      price: {
        monthly: 29.99,
        annual: 24.99
      },
      popular: true,
      features: [
        'Unlimited dashboards',
        'Advanced data visualizations',
        'Custom charts and widgets',
        'API access',
        '10 data connections',
        'Priority email support',
        'Team sharing (up to 5 users)',
        '1-year data history',
        'Scheduled reports',
        'Export capabilities'
      ]
    },
    {
      name: 'Business',
      description: 'For teams and organizations with advanced needs',
      price: {
        monthly: 79.99,
        annual: 69.99
      },
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Unlimited data connections',
        'Custom branding',
        'Advanced security features',
        'Single sign-on (SSO)',
        'Priority phone & email support',
        'Unlimited data history',
        'Dedicated account manager',
        'Custom integration support'
      ]
    }
  ]
  
  // Feature comparison data
  const features: PlanFeature[] = [
    {
      name: 'Dashboards',
      free: '2',
      pro: 'Unlimited',
      business: 'Unlimited'
    },
    {
      name: 'Data Sources',
      free: '3',
      pro: '10',
      business: 'Unlimited'
    },
    {
      name: 'Team Members',
      description: 'Number of users that can access your dashboards',
      free: '1',
      pro: '5',
      business: 'Unlimited'
    },
    {
      name: 'API Access',
      free: false,
      pro: true,
      business: true
    },
    {
      name: 'Custom Branding',
      free: false,
      pro: false,
      business: true
    },
    {
      name: 'Data History',
      free: '30 days',
      pro: '1 year',
      business: 'Unlimited'
    },
    {
      name: 'Support',
      free: 'Community',
      pro: 'Priority Email',
      business: 'Priority Phone & Email'
    },
    {
      name: 'Export Capabilities',
      free: false,
      pro: true,
      business: true
    },
    {
      name: 'Single Sign-On',
      free: false,
      pro: false,
      business: true
    }
  ]
  
  // Helper to format price
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free'
    return `$${price.toFixed(2)}`
  }
  
  // Helper to calculate annual discount
  const getAnnualDiscount = (monthly: number, annual: number) => {
    if (monthly === 0) return null
    const savings = ((monthly * 12) - (annual * 12)).toFixed(0)
    const percent = (((monthly - annual) / monthly) * 100).toFixed(0)
    return { savings, percent }
  }

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex justify-center mb-8">
        <Tabs 
          defaultValue="monthly" 
          value={billingPeriod} 
          onValueChange={(value) => setBillingPeriod(value as 'monthly' | 'annual')}
          className="bg-slate-100 dark:bg-slate-900 p-1 rounded-lg"
        >
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="annual" className="relative">
              Annual Billing
              <Badge className="absolute -top-3 -right-3 bg-green-600 text-[10px]">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Price cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        {plans.map((plan) => {
          const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.annual
          const annualDiscount = billingPeriod === 'annual' ? getAnnualDiscount(plan.price.monthly, plan.price.annual) : null
          
          return (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card className={cn(
                "h-full flex flex-col border shadow-lg rounded-xl overflow-hidden",
                plan.popular && "ring-2 ring-blue-500 relative"
              )}>
                {plan.popular && (
                  <div className="bg-blue-500 text-xs font-medium text-white py-1 px-3 text-center absolute top-0 right-0 left-0">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={cn(
                  "p-6",
                  plan.popular && "pt-8"
                )}>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold">{formatPrice(price)}</span>
                      {price > 0 && (
                        <span className="text-muted-foreground mb-1">/ mo</span>
                      )}
                    </div>
                    
                    {annualDiscount && (
                      <p className="text-sm text-green-600 dark:text-green-500 mt-1.5">
                        Save ${annualDiscount.savings} per year ({annualDiscount.percent}%)
                      </p>
                    )}
                    
                    {billingPeriod === 'annual' && price > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed as ${(price * 12).toFixed(2)} per year
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    className={cn(
                      "w-full",
                      plan.popular 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                        : ""
                    )}
                  >
                    {price === 0 ? 'Sign Up Free' : 'Subscribe Now'}
                  </Button>
                </div>
                
                <div className="border-t p-6 flex-grow bg-slate-50/50 dark:bg-slate-900/50">
                  <h4 className="font-medium mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Feature comparison */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center">Compare Features</h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">
          Detailed comparison of what's included in each plan
        </p>
        
        <div className="relative overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
              <tr className="border-b">
                <th className="px-6 py-4 text-left font-medium">Feature</th>
                <th className="px-6 py-4 text-center font-medium">Free</th>
                <th className="px-6 py-4 text-center font-medium bg-blue-50 dark:bg-blue-950/30 border-x">
                  Pro<span className="ml-2 inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">Popular</span>
                </th>
                <th className="px-6 py-4 text-center font-medium">Business</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium">Price</td>
                <td className="px-6 py-4 text-center">Free</td>
                <td className="px-6 py-4 text-center bg-blue-50 dark:bg-blue-950/30 border-x">
                  <div>${billingPeriod === 'monthly' ? '29.99' : '24.99'}/mo</div>
                  {billingPeriod === 'annual' && (
                    <div className="text-xs text-muted-foreground mt-1">Billed annually</div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <div>${billingPeriod === 'monthly' ? '79.99' : '69.99'}/mo</div>
                  {billingPeriod === 'annual' && (
                    <div className="text-xs text-muted-foreground mt-1">Billed annually</div>
                  )}
                </td>
              </tr>
              
              {features.map((feature, index) => (
                <tr key={index} className={cn("border-b", index % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50 dark:bg-slate-900/30")}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{feature.name}</span>
                      {feature.description && (
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{feature.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-slate-300 dark:text-slate-600 mx-auto" />
                    ) : (
                      <span>{feature.free}</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 text-center bg-blue-50 dark:bg-blue-950/30 border-x">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-slate-300 dark:text-slate-600 mx-auto" />
                    ) : (
                      <span className="font-medium">{feature.pro}</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    {typeof feature.business === 'boolean' ? (
                      feature.business ? 
                        <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <X className="h-5 w-5 text-slate-300 dark:text-slate-600 mx-auto" />
                    ) : (
                      <span>{feature.business}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold">Ready to get started?</h3>
        <p className="mt-2 mb-6 text-muted-foreground">
          Choose the plan that works best for you.
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
        >
          View All Plans
        </Button>
      </div>
    </div>
  )
}