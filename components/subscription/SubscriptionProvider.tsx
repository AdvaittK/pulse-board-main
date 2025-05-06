"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "../auth-provider"

// Subscription plan types
export type Plan = "free" | "basic" | "pro" | "enterprise"

export type Feature = {
  id: string
  name: string
  description: string
  included: { [key in Plan]: boolean }
  limits?: { [key in Plan]: number | string | null }
}

export type PlanDetails = {
  id: Plan
  name: string
  description: string
  price: number
  billingPeriod: "monthly" | "yearly"
  features: string[] // IDs of features included
  popular?: boolean
  cta?: string
}

export type SubscriptionStatus = "active" | "past_due" | "canceled" | "trialing" | "inactive"

export type Subscription = {
  id: string
  plan: Plan
  status: SubscriptionStatus
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

type SubscriptionContextType = {
  subscription: Subscription | null
  isLoading: boolean
  plans: PlanDetails[]
  features: Feature[]
  upgradeSubscription: (planId: Plan) => Promise<boolean>
  cancelSubscription: () => Promise<boolean>
}

// Mock data for frontend showcase
const MOCK_FEATURES: Feature[] = [
  {
    id: "dashboard-access",
    name: "Dashboard Access",
    description: "Access to the main dashboard with analytics",
    included: {
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
  },
  {
    id: "data-exports",
    name: "Data Exports",
    description: "Export your data in various formats",
    included: {
      free: false,
      basic: true,
      pro: true,
      enterprise: true,
    },
    limits: {
      free: null,
      basic: "CSV only",
      pro: "CSV, Excel, PDF",
      enterprise: "All formats",
    },
  },
  {
    id: "api-calls",
    name: "API Calls",
    description: "Number of API calls per month",
    included: {
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
    limits: {
      free: "1,000",
      basic: "10,000",
      pro: "100,000",
      enterprise: "Unlimited",
    },
  },
  {
    id: "storage",
    name: "Storage",
    description: "Cloud storage for your uploads",
    included: {
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
    limits: {
      free: "500 MB",
      basic: "10 GB",
      pro: "100 GB",
      enterprise: "1 TB+",
    },
  },
  {
    id: "team-members",
    name: "Team Members",
    description: "Number of team members allowed",
    included: {
      free: true,
      basic: true,
      pro: true,
      enterprise: true,
    },
    limits: {
      free: "1",
      basic: "5",
      pro: "20",
      enterprise: "Unlimited",
    },
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    description: "Detailed insights and reporting",
    included: {
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Get faster responses from our support team",
    included: {
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
  },
  {
    id: "custom-domain",
    name: "Custom Domain",
    description: "Use your own domain for your dashboard",
    included: {
      free: false,
      basic: false,
      pro: true,
      enterprise: true,
    },
  },
  {
    id: "white-labeling",
    name: "White Labeling",
    description: "Remove our branding and use your own",
    included: {
      free: false,
      basic: false,
      pro: false,
      enterprise: true,
    },
  },
  {
    id: "dedicated-server",
    name: "Dedicated Infrastructure",
    description: "Your own dedicated server instance",
    included: {
      free: false,
      basic: false,
      pro: false,
      enterprise: true,
    },
  },
]

const MOCK_PLANS: PlanDetails[] = [
  {
    id: "free",
    name: "Free",
    description: "For personal projects and learning",
    price: 0,
    billingPeriod: "monthly",
    features: [
      "dashboard-access",
      "api-calls",
      "storage",
      "team-members",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description: "For small teams getting started",
    price: 19,
    billingPeriod: "monthly",
    features: [
      "dashboard-access",
      "data-exports",
      "api-calls",
      "storage",
      "team-members",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    description: "For growing businesses",
    price: 49,
    billingPeriod: "monthly",
    popular: true,
    cta: "Most Popular",
    features: [
      "dashboard-access",
      "data-exports",
      "api-calls",
      "storage",
      "team-members",
      "advanced-analytics",
      "priority-support",
      "custom-domain",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: 199,
    billingPeriod: "monthly",
    features: [
      "dashboard-access",
      "data-exports",
      "api-calls",
      "storage",
      "team-members",
      "advanced-analytics",
      "priority-support",
      "custom-domain",
      "white-labeling",
      "dedicated-server",
    ],
  },
]

// Default mock subscription for regular users
const MOCK_FREE_SUBSCRIPTION: Subscription = {
  id: "sub_free_123",
  plan: "free",
  status: "active",
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  cancelAtPeriodEnd: false,
}

// Mock premium subscription for admin users
const MOCK_PRO_SUBSCRIPTION: Subscription = {
  id: "sub_pro_456",
  plan: "pro",
  status: "active",
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  cancelAtPeriodEnd: false,
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [plans] = useState<PlanDetails[]>(MOCK_PLANS)
  const [features] = useState<Feature[]>(MOCK_FEATURES)

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(r => setTimeout(r, 800))
      
      // For frontend showcase, we'll give admins a pro subscription and regular users a free subscription
      if (user?.role === 'admin') {
        setSubscription(MOCK_PRO_SUBSCRIPTION)
      } else if (user) {
        setSubscription(MOCK_FREE_SUBSCRIPTION)
      } else {
        setSubscription(null)
      }
      
      setIsLoading(false)
    }

    if (user) {
      fetchSubscription()
    } else {
      setSubscription(null)
      setIsLoading(false)
    }
  }, [user])

  const upgradeSubscription = async (planId: Plan) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1500))
    
    // For demo purposes, just update the subscription to the new plan
    const newSubscription: Subscription = {
      id: `sub_${planId}_${Date.now().toString().substr(-6)}`,
      plan: planId,
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
    }
    
    setSubscription(newSubscription)
    setIsLoading(false)
    return true
  }
  
  const cancelSubscription = async () => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1000))
    
    // Update the current subscription to be canceled at period end
    if (subscription) {
      const updatedSubscription = {
        ...subscription,
        cancelAtPeriodEnd: true
      }
      
      setSubscription(updatedSubscription)
    }
    
    setIsLoading(false)
    return true
  }

  return (
    <SubscriptionContext.Provider 
      value={{ 
        subscription, 
        isLoading, 
        plans,
        features,
        upgradeSubscription,
        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}