"use client"

import { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { motion } from "framer-motion"
import { 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Download, 
  Package, 
  Plus, 
  Calendar as CalendarIcon, 
  Sparkles,
  LineChart,
  Zap,
  CloudRain,
  BarChart3,
  ArrowUpRight,
  ShieldCheck,
  DollarSign,
  ChevronRight,
  Tag,
  Shield,
  Users,
  Settings,
  LayoutGrid
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Import subscription components
import { PlanComparison } from "@/components/subscription/PlanComparison"
import { SubscriptionCheckout } from "@/components/subscription/SubscriptionCheckout"
import { SubscriptionProvider, useSubscription } from "@/components/subscription/SubscriptionProvider"
import { FeatureAccess, SubscriptionFeatures } from "@/components/subscription/FeatureAccess"
import { SubscriptionMetrics } from "@/components/subscription/SubscriptionMetrics"
import { PlanManagement } from "@/components/subscription/PlanManagement"

// Import API services
import subscriptionService, { Plan } from "@/lib/api/subscriptionService"
import stripeService from "@/lib/api/stripeService"
import { formatPrice, formatDate, calculateDiscountedPrice, isDatePast, getDaysRemaining, isSubscriptionExpiringSoon, getSubscriptionStatusDisplay } from "@/lib/api/subscriptionHelpers"
import { UIPlan, UISubscription } from "@/lib/api/subscriptionTypes"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

// Framer Motion variants
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
    transition: {
      duration: 0.5
    }
  }
}

function Building({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export default function SubscriptionsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedPlan, setSelectedPlan] = useState<UIPlan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userSubscriptions, setUserSubscriptions] = useState<UISubscription[]>([]);
  const [availablePlans, setAvailablePlans] = useState<UIPlan[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const { toast } = useToast();

  // Helper function to map API plan to UI format with icons
  const mapPlanToUIFormat = (plan: Plan): UIPlan => {
    let icon = <Zap className="h-5 w-5 text-blue-500" />;
    let color = "blue";
    
    if (plan.name.toLowerCase().includes('pro')) {
      icon = <Sparkles className="h-5 w-5 text-purple-500" />;
      color = "purple";
    } else if (plan.name.toLowerCase().includes('enterprise')) {
      icon = <Building className="h-5 w-5 text-amber-500" />;
      color = "amber";
    } else if (plan.name.toLowerCase().includes('financial')) {
      icon = <LineChart className="h-5 w-5 text-green-500" />;
      color = "green";
    } else if (plan.name.toLowerCase().includes('weather') || plan.name.toLowerCase().includes('forecast')) {
      icon = <CloudRain className="h-5 w-5 text-cyan-500" />;
      color = "cyan";
    }
    
    return {
      ...plan,
      icon,
      color,
      popular: plan.name.toLowerCase().includes('pro'),
    };
  };
  
  // Load data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's subscriptions
        const subscriptions = await subscriptionService.getUserSubscriptions();
        const enrichedSubscriptions: UISubscription[] = subscriptions.map(sub => {
          // Calculate usage percentage (would come from the API in a real app)
          const usagePercent = Math.floor(Math.random() * 80) + 10; // Random value between 10-90%
          const mappedPlan = mapPlanToUIFormat(sub.plan);
          
          // Map subscription to UI format
          return {
            ...sub,
            plan: sub.plan,
            usagePercent,
            icon: mappedPlan.icon,
            color: mappedPlan.color,
            nextBillingDate: sub.endDate,
            featuresFormatted: sub.plan.features.map(f => f.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')),
            recommendedAddons: [] // Could be populated based on the subscription type
          };
        });
        
        setUserSubscriptions(enrichedSubscriptions);
        
        // Get available plans
        const plans = await subscriptionService.getPlans();
        const enrichedPlans: UIPlan[] = plans
          .filter(plan => plan.status === 'active' && plan.isPublic)
          .map(plan => {
            const uiPlan = mapPlanToUIFormat(plan);
            // Add random discount to some plans for demo purposes
            const hasDiscount = Math.random() > 0.7;
            return {
              ...uiPlan,
              discount: hasDiscount 
                ? { 
                    percent: Math.floor(Math.random() * 15) + 5, // 5-20%
                    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString() // 30 days from now
                  } 
                : null
            };
          });
        
        setAvailablePlans(enrichedPlans);
        
        // Simulate fetching invoices - in a real app this would come from the backend
        const mockInvoices = [
          {
            id: "INV-001",
            date: "2025-04-15",
            amount: "$29.99",
            status: "paid",
            description: "Pro Plan - Monthly Subscription",
            downloadUrl: "#"
          },
          {
            id: "INV-002",
            date: "2025-03-15",
            amount: "$29.99",
            status: "paid",
            description: "Pro Plan - Monthly Subscription",
            downloadUrl: "#"
          },
          {
            id: "INV-003",
            date: "2025-02-15",
            amount: "$29.99",
            status: "paid",
            description: "Pro Plan - Monthly Subscription",
            downloadUrl: "#"
          },
          {
            id: "INV-004",
            date: "2025-01-15",
            amount: "$29.99",
            status: "paid",
            description: "Pro Plan - Monthly Subscription",
            downloadUrl: "#"
          },
          {
            id: "INV-005",
            date: "2024-12-15",
            amount: "$29.99",
            status: "paid",
            description: "Pro Plan - Monthly Subscription",
            downloadUrl: "#"
          }
        ];
        
        setInvoices(mockInvoices);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading your subscription information. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoaded(true);
      }
    };
    
    fetchData();
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['active', 'explore', 'features', 'analytics', 'billing'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [toast]);
  
  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without reload for better navigation
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url.toString());
  };

  // Handle plan selection
  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };
  
  // Handle checkout success
  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    toast({
      title: "Subscription activated!",
      description: `Your subscription to the ${selectedPlan?.name} plan has been activated successfully.`,
    });
    
    // Refresh subscriptions data after a short delay
    setTimeout(() => {
      window.location.href = '/dashboard/subscriptions?tab=active';
    }, 1500);
  };
  
  // Handle checkout cancel
  const handleCheckoutCancel = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
  };
  
  // Navigate to upgrade page
  const handleUpgrade = () => {
    setActiveTab('explore');
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'explore');
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="container py-6 space-y-8 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Subscriptions
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription plans, billing history, and add-ons
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md self-start md:self-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </motion.div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-slate-100/60 dark:bg-slate-900/40 p-1 rounded-xl overflow-hidden">
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            Current Plans
          </TabsTrigger>
          <TabsTrigger 
            value="explore" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            Explore Plans
          </TabsTrigger>
          <TabsTrigger 
            value="features" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            Features & Limits
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            Billing History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {!isLoaded ? (
            // Loading skeleton
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((item) => (
                <Card key={item} className="border-0 shadow-lg">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Skeleton className="h-7 w-40 mb-2" />
                        <Skeleton className="h-4 w-60" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map((feat) => (
                          <div key={feat} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex justify-between">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : userSubscriptions.length === 0 ? (
            <Card className="border-0 shadow-lg text-center p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Package className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold">No active subscriptions</h2>
                <p className="text-muted-foreground max-w-md">
                  You don't have any active subscriptions. Explore our plans and subscribe to access premium features.
                </p>
                <Button 
                  onClick={() => handleTabChange('explore')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-4"
                >
                  Explore Plans
                </Button>
              </div>
            </Card>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2"
            >
              {userSubscriptions.map((subscription) => (
                <motion.div key={subscription.id} variants={itemVariants}>
                  <Card className="border-0 shadow-lg overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-5 pb-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            {subscription.icon}
                          </div>
                          <div>
                            <CardTitle>{subscription.plan.name}</CardTitle>
                            <CardDescription className="mt-1">{subscription.plan.description}</CardDescription>
                          </div>
                        </div>
                        <Badge 
                          variant="default"
                          className={`bg-${subscription.status === 'active' ? 'green' : 'amber'}-500 flex items-center gap-1`}
                        >
                          <CheckCircle className="h-3 w-3" />
                          {subscription.status === 'active' ? 'Active' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-between items-center text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-medium flex items-center">
                            {formatPrice(subscription.price)} / {subscription.billingCycle}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-muted-foreground">Next Billing</span>
                          <span className="font-medium flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            {subscription.nextBillingDate ? formatDate(subscription.nextBillingDate) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 space-y-5">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <Zap className="h-4 w-4 text-amber-500" />
                            <span>Usage</span>
                          </div>
                          <span className={cn(
                            subscription.usagePercent > 80 ? "text-amber-500" : 
                            subscription.usagePercent > 50 ? "text-blue-500" : 
                            "text-green-500"
                          )}>{subscription.usagePercent}%</span>
                        </div>
                        <Progress 
                          value={subscription.usagePercent} 
                          className={cn(
                            "h-2",
                            subscription.usagePercent > 80 ? "bg-amber-100 dark:bg-amber-900/30" : 
                            subscription.usagePercent > 50 ? "bg-blue-100 dark:bg-blue-900/30" : 
                            "bg-green-100 dark:bg-green-900/30"
                          )}
                          indicatorClassName={cn(
                            subscription.usagePercent > 80 ? "bg-amber-500" : 
                            subscription.usagePercent > 50 ? "bg-blue-500" : 
                            "bg-green-500"
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          Features
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                          {subscription.featuresFormatted?.map((feature: string, index: number) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {subscription.recommendedAddons && subscription.recommendedAddons.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            Recommended Add-ons
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {subscription.recommendedAddons.map((addon: string, index: number) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 cursor-pointer dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
                              >
                                {addon}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Manage Plan</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Manage Subscription</DialogTitle>
                            <DialogDescription>Adjust your subscription settings and payment method</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between pb-4 border-b">
                                <div>
                                  <h3 className="font-medium">{subscription.plan.name}</h3>
                                  <p className="text-sm text-muted-foreground">Active until {formatDate(subscription.endDate)}</p>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">Active</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Monthly Price</span>
                                <span>{formatPrice(subscription.price)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Next Billing Date</span>
                                <span>{subscription.nextBillingDate ? formatDate(subscription.nextBillingDate) : 'N/A'}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Payment Method</span>
                                <span className="flex items-center gap-1.5">
                                  <CreditCard className="h-4 w-4" /> •••• 4242
                                </span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                            <Button variant="destructive">Cancel Subscription</Button>
                            <Button type="submit">Update Payment Method</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950"
                      >
                        View Usage
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="explore">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {availablePlans.map((plan) => (
              <motion.div key={plan.id} variants={itemVariants}>
                <Card className={cn(
                  "border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300",
                  plan.popular && "ring-2 ring-blue-500 dark:ring-blue-400"
                )}>
                  {plan.popular && (
                    <div className="bg-blue-500 text-white text-xs font-medium py-1 px-3 text-center">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader className="p-5 pb-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex gap-3 items-start">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        `bg-${plan.color}-100 text-${plan.color}-500 dark:bg-${plan.color}-900/30 dark:text-${plan.color}-400`
                      )}>
                        {plan.icon}
                      </div>
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription className="mt-1">{plan.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-5">
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">
                        {formatPrice(plan.price)}
                        <span className="text-sm font-normal text-muted-foreground ml-1.5">/monthly</span>
                      </div>
                      {plan.discount && (
                        <Badge variant="outline" className="ml-2 bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                          <Tag className="h-3 w-3 mr-1" />
                          {plan.discount.percent}% off
                        </Badge>
                      )}
                    </div>
                    
                    {plan.discount && (
                      <p className="text-xs text-muted-foreground">
                        Discount valid until {formatDate(plan.discount.endDate)}
                      </p>
                    )}
                    
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={cn(
                            "h-4 w-4 shrink-0",
                            `text-${plan.color}-500 dark:text-${plan.color}-400`
                          )} />
                          <span>{feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-5 flex justify-center border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <Button 
                      className={cn(
                        "w-full",
                        plan.popular ? 
                          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md" :
                          "bg-white dark:bg-slate-800"
                      )}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      Subscribe Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium">Custom Plan</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground max-w-[250px]">
                    Need a tailored solution? Contact our sales team for a custom plan
                  </p>
                  <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="features">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SubscriptionFeatures />
            </motion.div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SubscriptionMetrics />
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="billing">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Manage your payment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" size="sm">
                        Replace
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-500" />
                        Billing History
                      </CardTitle>
                      <CardDescription>View your recent invoices</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1.5">
                      <Download className="h-4 w-4" />
                      Export All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <motion.div 
                        key={invoice.id} 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="font-medium">{invoice.description}</p>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-muted-foreground">{invoice.date}</span>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                                Paid
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                          <p className="font-medium text-lg">{invoice.amount}</p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            onClick={() => {
                              // Download functionality would go here
                              toast({
                                title: "Invoice Downloaded",
                                description: `Invoice ${invoice.id} has been downloaded.`
                              });
                            }}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Download</span>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t">
                  <Button variant="link">
                    View All Invoices
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {showCheckout && selectedPlan && (
        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Subscribe to {selectedPlan.name}</DialogTitle>
              <DialogDescription>Complete your subscription to access premium features</DialogDescription>
            </DialogHeader>
            <Elements stripe={stripePromise}>
              <SubscriptionCheckout
                planId={selectedPlan.id}
                planName={selectedPlan.name}
                planDescription={selectedPlan.description}
                planPrice={selectedPlan.price}
                onSuccess={handleCheckoutSuccess}
                onCancel={handleCheckoutCancel}
              />
            </Elements>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
