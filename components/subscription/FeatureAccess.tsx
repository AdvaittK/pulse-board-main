"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Feature access component that can be used to check if a feature is available
export function FeatureAccess({ feature, fallback = null }: { feature: string; fallback?: React.ReactNode }) {
  const hasAccess = checkFeatureAccess(feature)
  
  if (hasAccess) {
    return <>{feature}</> // Render children if feature is accessible
  }
  
  return fallback // Render fallback if feature is not accessible
}

// Mock function to check feature access - in a real app, this would check against user's plan
function checkFeatureAccess(feature: string): boolean {
  const accessibleFeatures = [
    'dashboard_basic',
    'dashboard_pro',
    'analytics_basic',
    'reports_basic',
    'custom_charts',
    'api_access',
    'data_export',
    'team_sharing_basic'
  ]
  
  return accessibleFeatures.includes(feature)
}

// Component for displaying subscription features comparison
export function SubscriptionFeatures() {
  // Feature columns - would come from API in a real app
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: {
        'Dashboards': '2',
        'Data Sources': '3',
        'Reports': '5',
        'Team Members': '1',
        'Widgets': 'Basic',
        'Export Data': 'No',
        'API Access': 'No',
        'Custom Charts': 'No',
        'White Labeling': 'No',
        'Priority Support': 'No',
        'Data History': '30 days',
        'Scheduled Reports': 'No',
      }
    },
    {
      name: 'Pro',
      popular: true,
      price: 29.99,
      features: {
        'Dashboards': 'Unlimited',
        'Data Sources': '10',
        'Reports': 'Unlimited',
        'Team Members': '5',
        'Widgets': 'All',
        'Export Data': 'Yes',
        'API Access': 'Yes',
        'Custom Charts': 'Yes',
        'White Labeling': 'No',
        'Priority Support': 'Yes',
        'Data History': '1 year',
        'Scheduled Reports': 'Yes',
      }
    },
    {
      name: 'Business',
      price: 79.99,
      features: {
        'Dashboards': 'Unlimited',
        'Data Sources': 'Unlimited',
        'Reports': 'Unlimited',
        'Team Members': '20',
        'Widgets': 'All + Custom',
        'Export Data': 'Yes',
        'API Access': 'Yes',
        'Custom Charts': 'Yes',
        'White Labeling': 'Yes',
        'Priority Support': 'Yes',
        'Data History': 'Unlimited',
        'Scheduled Reports': 'Yes',
      }
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle>Compare Plans & Features</CardTitle>
        <CardDescription>
          Explore our plans and find the right fit for your needs
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-w-max"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-900">
                <TableHead className="w-[200px]">Feature</TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.name} className="text-center min-w-[150px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-bold text-lg">
                        {plan.name}
                        {plan.popular && (
                          <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Popular</Badge>
                        )}
                      </span>
                      <span className="text-2xl font-bold">${plan.price}</span>
                      <span className="text-xs text-muted-foreground">per month</span>
                      <Button 
                        className={cn(
                          "mt-2 w-full",
                          plan.popular ? 
                            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" : 
                            ""
                        )}
                      >
                        {plan.price === 0 ? "Sign Up" : "Subscribe"}
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(plans[0].features).map(([feature, _], index) => (
                <motion.tr key={feature} variants={rowVariants} className="border-b">
                  <TableCell className="font-medium">{feature}</TableCell>
                  {plans.map((plan) => {
                    const value = plan.features[feature as keyof typeof plan.features]
                    const isCheckmark = value === 'Yes'
                    const isCross = value === 'No'
                    
                    return (
                      <TableCell key={`${plan.name}-${feature}`} className="text-center">
                        {isCheckmark ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : isCross ? (
                          <XCircle className="h-5 w-5 text-slate-300 dark:text-slate-600 mx-auto" />
                        ) : (
                          <span className={plan.popular ? "font-semibold" : ""}>{value}</span>
                        )}
                      </TableCell>
                    )
                  })}
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </CardContent>
    </Card>
  )
}