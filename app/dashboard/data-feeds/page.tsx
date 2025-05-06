"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart3, 
  Filter, 
  Plus, 
  Search, 
  Activity, 
  Zap, 
  TrendingUp, 
  Droplets, 
  Share2, 
  RefreshCw, 
  CheckCircle, 
  ChevronRight, 
  AlertCircle,
  Settings,
  Code,
  ExternalLink,
  XCircle,
  MoreHorizontal,
  LineChart,
  Trash2,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LineChart as LineChartComponent } from "@/components/charts"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts"
import { format } from "date-fns"

const dataFeeds = [
  {
    id: "1",
    name: "Stock Market Data",
    description: "Real-time stock market data from major exchanges",
    status: "active",
    type: "financial",
    updatedAt: "2023-05-01T12:00:00Z",
    refreshRate: "1 min",
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    chartColor: "blue",
    dataPoints: [25, 36, 47, 29, 35, 50, 42, 36, 42, 45],
    apiEndpoint: "/api/feeds/stock-market",
    apiKey: "sk_**********",
    requestCount: 25430,
    requestLimit: 50000
  },
  {
    id: "2",
    name: "Weather Forecast",
    description: "Global weather forecasts with hourly updates",
    status: "active",
    type: "weather",
    updatedAt: "2023-05-02T10:30:00Z",
    refreshRate: "1 hour",
    icon: <Droplets className="h-5 w-5 text-cyan-500" />,
    chartColor: "cyan",
    dataPoints: [32, 38, 35, 40, 45, 48, 43, 40, 35, 30],
    apiEndpoint: "/api/feeds/weather",
    apiKey: "wth_**********",
    requestCount: 8760,
    requestLimit: 10000
  },
  {
    id: "3",
    name: "Social Media Trends",
    description: "Trending topics and hashtags from major social platforms",
    status: "active",
    type: "social",
    updatedAt: "2023-05-03T09:15:00Z",
    refreshRate: "5 min",
    icon: <Share2 className="h-5 w-5 text-purple-500" />,
    chartColor: "purple",
    dataPoints: [15, 25, 20, 30, 45, 40, 50, 45, 60, 55],
    apiEndpoint: "/api/feeds/social-trends",
    apiKey: "sm_**********",
    requestCount: 12560,
    requestLimit: 30000
  },
  {
    id: "4",
    name: "Cryptocurrency Prices",
    description: "Real-time cryptocurrency prices and market data",
    status: "active",
    type: "financial",
    updatedAt: "2023-05-01T14:45:00Z",
    refreshRate: "30 sec",
    icon: <Zap className="h-5 w-5 text-amber-500" />,
    chartColor: "amber",
    dataPoints: [45, 30, 35, 42, 36, 29, 35, 42, 38, 40],
    apiEndpoint: "/api/feeds/crypto",
    apiKey: "cpt_**********",
    requestCount: 42560,
    requestLimit: 100000
  },
  {
    id: "5",
    name: "E-commerce Sales",
    description: "Sales data from major e-commerce platforms",
    status: "inactive",
    type: "retail",
    updatedAt: "2023-04-28T16:20:00Z",
    refreshRate: "1 day",
    icon: <Activity className="h-5 w-5 text-rose-500" />,
    chartColor: "rose",
    dataPoints: [40, 38, 42, 45, 43, 40, 38, 35, 37, 39],
    apiEndpoint: "/api/feeds/ecommerce",
    apiKey: "ec_**********",
    requestCount: 28,
    requestLimit: 100,
    error: "API key expired"
  },
]

const availableFeeds = [
  {
    id: "new-1",
    name: "Customer Analytics",
    description: "Customer behavior data, session analysis, and conversion metrics",
    type: "analytics",
    refreshRate: "15 min",
    icon: <BarChart3 className="h-5 w-5 text-indigo-500" />,
    pricingTier: "premium",
    price: "$49/month"
  },
  {
    id: "new-2",
    name: "IoT Device Telemetry",
    description: "Real-time data from connected IoT devices and sensors",
    type: "iot",
    refreshRate: "10 sec",
    icon: <Activity className="h-5 w-5 text-emerald-500" />,
    pricingTier: "enterprise",
    price: "$199/month"
  },
  {
    id: "new-3",
    name: "News API",
    description: "Latest headlines and articles from global news sources",
    type: "content",
    refreshRate: "30 min",
    icon: <LineChart className="h-5 w-5 text-sky-500" />,
    pricingTier: "standard",
    price: "$29/month"
  }
]

const DataFeedVisualization = ({ feed }: { feed: typeof dataFeeds[0] }) => {
  const [timeRange, setTimeRange] = useState("7d")
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const chartData = feed.dataPoints.map((value, index) => ({
    time: `Point ${index + 1}`,
    value
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "line" ? (
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <RechartsTooltip 
              contentStyle={{ 
                borderRadius: '6px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: 'none',
                padding: '8px 12px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={feed.chartColor === "blue" ? "#4F46E5" : 
                     feed.chartColor === "cyan" ? "#06B6D4" :
                     feed.chartColor === "purple" ? "#9333EA" :
                     feed.chartColor === "amber" ? "#D97706" :
                     feed.chartColor === "rose" ? "#E11D48" : "#4F46E5"}
              name={feed.name}
              strokeWidth={2}
              dot={{ strokeWidth: 0, r: 1 }}
              activeDot={{ r: 5, stroke: 'white', strokeWidth: 2 }}
            />
          </RechartsLineChart>
        ) : (
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <RechartsTooltip 
              contentStyle={{ 
                borderRadius: '6px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: 'none',
                padding: '8px 12px'
              }}
            />
            <Bar 
              dataKey="value" 
              fill={feed.chartColor === "blue" ? "#4F46E5" : 
                    feed.chartColor === "cyan" ? "#06B6D4" :
                    feed.chartColor === "purple" ? "#9333EA" :
                    feed.chartColor === "amber" ? "#D97706" :
                    feed.chartColor === "rose" ? "#E11D48" : "#4F46E5"}
              name={feed.name}
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default function DataFeedsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)
  const [refreshingFeed, setRefreshingFeed] = useState<string | null>(null)
  const [selectedFeed, setSelectedFeed] = useState<typeof dataFeeds[0] | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddingFeed, setIsAddingFeed] = useState(false)
  const [pendingAction, setPendingAction] = useState<{id: string, action: string} | null>(null)
  
  // Ref for feed detail scroll
  const detailsRef = useRef<HTMLDivElement | null>(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Scroll detail view to top when selected feed changes
  useEffect(() => {
    if (selectedFeed && detailsRef.current) {
      detailsRef.current.scrollTop = 0
    }
  }, [selectedFeed])

  // Handle refresh feed action
  const handleRefreshFeed = (id: string) => {
    setRefreshingFeed(id)
    setTimeout(() => {
      setRefreshingFeed(null)
      toast({
        title: "Feed refreshed",
        description: "The data feed has been refreshed successfully",
      })
    }, 1500)
  }

  // Handle updating feed settings
  const handleUpdateFeedSettings = () => {
    setIsSettingsOpen(false)
    toast({
      title: "Settings updated",
      description: "The feed settings have been updated successfully",
    })
  }

  // Handle adding a new feed
  const handleAddNewFeed = () => {
    setIsAddingFeed(false)
    toast({
      title: "Feed added",
      description: "The new data feed has been added to your dashboard",
      action: (
        <Button 
          variant="outline" 
          className="bg-white dark:bg-slate-900" 
          onClick={() => toast({
            title: "Configuration required",
            description: "Please check your email for API credentials and setup instructions"
          })}
        >
          Configure
        </Button>
      ),
    })
  }

  // Filter data feeds based on search and tab
  const filteredDataFeeds = dataFeeds.filter((feed) => {
    const matchesSearch =
      feed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feed.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && feed.status === "active"
    if (activeTab === "inactive") return matchesSearch && feed.status === "inactive"

    return matchesSearch && feed.type === activeTab
  })

  return (
    <div className="container max-w-7xl py-10 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Data Feeds
          </h1>
          <p className="text-muted-foreground">
            Browse and manage your real-time data feed subscriptions
          </p>
        </div>

        <Dialog open={isAddingFeed} onOpenChange={setIsAddingFeed}>
          <DialogTrigger asChild>
            <Button size="lg" className="shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Add New Feed
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Feed</DialogTitle>
              <DialogDescription>Connect a new data source to your dashboard.</DialogDescription>
            </DialogHeader>
            {/* Dialog content remains the same */}
            {/* ...existing code... */}
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col gap-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column: Controls + Feed list */}
          <div className={cn(
            "col-span-1", 
            selectedFeed ? "lg:col-span-7" : "lg:col-span-12"
          )}>
            {/* Search and filter section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search data feeds..."
                  className="pl-10 h-12 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Feed Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("all")}>All Feeds</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("active")}>Active Feeds</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("inactive")}>Inactive Feeds</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("financial")}>Financial</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("weather")}>Weather</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("social")}>Social</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("retail")}>Retail</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tabs section */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="w-full md:w-auto flex overflow-x-auto p-1 h-auto gap-1 bg-transparent">
                <TabsTrigger value="all" className="flex-1 md:flex-none h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow">
                  All Feeds
                </TabsTrigger>
                <TabsTrigger value="active" className="flex-1 md:flex-none h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow">
                  Active
                </TabsTrigger>
                <TabsTrigger value="inactive" className="flex-1 md:flex-none h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow">
                  Inactive
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex-1 md:flex-none h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow">
                  Financial
                </TabsTrigger>
                <TabsTrigger value="weather" className="hidden md:block h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow">
                  Weather
                </TabsTrigger>
                <TabsTrigger value="social" className="hidden md:block h-10 px-4 data-[state=active]:bg-background data-[state=active]:shadow">
                  Social
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {!isLoaded ? (
                  // Loading skeleton
                  <div className="grid gap-6 md:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                      <Card key={item} className="overflow-hidden border shadow">
                        <div className="p-6">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                              <Skeleton className="h-5 w-[140px]" />
                              <Skeleton className="h-4 w-[180px]" />
                            </div>
                          </div>
                          <div className="mt-4">
                            <Skeleton className="h-[140px] w-full rounded-md" />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-9 w-28" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : filteredDataFeeds.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-[300px] items-center justify-center rounded-lg border border-dashed"
                  >
                    <div className="flex flex-col items-center gap-2 text-center px-4">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium">No data feeds found</h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Try adjusting your search or filter to find what you're looking for, or add a new data feed.
                      </p>
                      <Button 
                        className="mt-6"
                        onClick={() => setIsAddingFeed(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Feed
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-6 md:grid-cols-2"
                  >
                    {filteredDataFeeds.map((feed) => (
                      <motion.div 
                        key={feed.id} 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { type: "spring", stiffness: 100 }
                          }
                        }}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Card 
                          className={cn(
                            "h-full overflow-hidden hover:shadow-md transition-all cursor-pointer",
                            selectedFeed?.id === feed.id && "ring-2 ring-primary"
                          )}
                          onClick={() => setSelectedFeed(feed)}
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex gap-4">
                                <div className={cn(
                                  "h-12 w-12 rounded-full flex items-center justify-center",
                                  feed.status === "active" ? "bg-primary/10" : "bg-muted"
                                )}>
                                  {feed.icon}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{feed.name}</h3>
                                  <p className="text-muted-foreground text-sm line-clamp-1 mt-0.5">
                                    {feed.description}
                                  </p>
                                </div>
                              </div>
                              <Badge 
                                variant={feed.status === "active" ? "default" : "secondary"}
                                className={cn(
                                  "ml-auto mt-1",
                                  feed.status === "active" ? "bg-green-500" : "bg-muted text-muted-foreground"
                                )}
                              >
                                {feed.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            
                            <div className="mt-6">
                              <DataFeedVisualization feed={feed} />
                            </div>
                            
                            <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
                              <div className="space-y-1">
                                <p className="text-muted-foreground">Refresh Rate</p>
                                <p className="font-medium">{feed.refreshRate}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-muted-foreground">Type</p>
                                <p className="font-medium capitalize">{feed.type}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-muted-foreground">Updated</p>
                                <p className="font-medium">{format(new Date(feed.updatedAt), "MMM d")}</p>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex gap-3 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9"
                                disabled={refreshingFeed === feed.id || feed.status !== "active"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRefreshFeed(feed.id);
                                }}
                              >
                                {refreshingFeed === feed.id ? (
                                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                )}
                                Refresh
                              </Button>
                              <Button 
                                size="sm"
                                className="h-9"
                              >
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column: Feed details panel */}
          {selectedFeed && (
            <motion.div 
              key={selectedFeed.id}
              className="col-span-1 lg:col-span-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Card className="sticky top-6 overflow-hidden border shadow-lg">
                <CardHeader className="pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Feed Details</CardTitle>
                    <CardDescription>Configuration and metrics</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedFeed(null)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="px-0">
                  <ScrollArea className="h-[calc(100vh-280px)]" ref={detailsRef}>
                    <div className="px-6 py-2">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn(
                          "h-14 w-14 rounded-full flex items-center justify-center",
                          selectedFeed.status === "active" ? "bg-primary/10" : "bg-muted"
                        )}>
                          {selectedFeed.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium">{selectedFeed.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={selectedFeed.status === "active" ? "default" : "secondary"}
                              className={selectedFeed.status === "active" ? "bg-green-500" : "bg-muted text-muted-foreground"}
                            >
                              {selectedFeed.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{selectedFeed.type} data</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        {/* Description section */}
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">About</h4>
                          <p>{selectedFeed.description}</p>
                        </div>
                        
                        {/* Usage statistics section */}
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">Usage Statistics</h4>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">API Requests</span>
                              <span className="text-sm font-medium">
                                {selectedFeed.requestCount} / {selectedFeed.requestLimit}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full",
                                  selectedFeed.requestCount / selectedFeed.requestLimit > 0.9 
                                    ? "bg-destructive" 
                                    : selectedFeed.requestCount / selectedFeed.requestLimit > 0.7 
                                    ? "bg-amber-500" 
                                    : "bg-green-500"
                                )}
                                style={{ width: `${(selectedFeed.requestCount / selectedFeed.requestLimit) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-muted/30 rounded-lg p-4">
                              <p className="text-sm text-muted-foreground">Refresh Rate</p>
                              <p className="text-lg font-medium mt-1">{selectedFeed.refreshRate}</p>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4">
                              <p className="text-sm text-muted-foreground">Last Updated</p>
                              <p className="text-lg font-medium mt-1">
                                {format(new Date(selectedFeed.updatedAt), "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* API Configuration section */}
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">API Configuration</h4>
                          <div className="space-y-4">
                            <div className="rounded-lg border overflow-hidden">
                              <div className="bg-muted/30 px-4 py-2 border-b">
                                <p className="text-sm font-medium">API Endpoint</p>
                              </div>
                              <div className="px-4 py-3 flex items-center justify-between">
                                <code className="text-sm font-mono bg-muted/30 px-2 py-1 rounded">
                                  {selectedFeed.apiEndpoint}
                                </code>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Code className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Copy endpoint</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            
                            <div className="rounded-lg border overflow-hidden">
                              <div className="bg-muted/30 px-4 py-2 border-b">
                                <p className="text-sm font-medium">API Key</p>
                              </div>
                              <div className="px-4 py-3 flex items-center justify-between">
                                <code className="text-sm font-mono bg-muted/30 px-2 py-1 rounded">
                                  {showApiKey ? selectedFeed.apiKey : selectedFeed.apiKey.substring(0, 5) + "••••••••••"}
                                </code>
                                <div className="flex items-center">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={() => setShowApiKey(!showApiKey)}
                                        >
                                          {showApiKey ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{showApiKey ? "Hide API key" : "Show API key"}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Copy API key</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between py-4 border-t px-6">
                  <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Feed Settings</DialogTitle>
                        <DialogDescription>Adjust the configuration for this data feed.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-5 py-4">
                        <div className="grid grid-cols-5 items-center gap-3">
                          <Label htmlFor="feed-name" className="col-span-1">Name</Label>
                          <Input 
                            id="feed-name" 
                            defaultValue={selectedFeed.name}
                            className="col-span-4" 
                          />
                        </div>
                        
                        <div className="grid grid-cols-5 items-center gap-3">
                          <Label htmlFor="refresh-rate" className="col-span-1">Refresh Rate</Label>
                          <Select defaultValue={selectedFeed.refreshRate}>
                            <SelectTrigger className="col-span-4">
                              <SelectValue placeholder="Select refresh rate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10 sec">10 seconds</SelectItem>
                              <SelectItem value="30 sec">30 seconds</SelectItem>
                              <SelectItem value="1 min">1 minute</SelectItem>
                              <SelectItem value="5 min">5 minutes</SelectItem>
                              <SelectItem value="15 min">15 minutes</SelectItem>
                              <SelectItem value="1 hour">1 hour</SelectItem>
                              <SelectItem value="1 day">1 day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-5 items-center gap-3">
                          <Label htmlFor="api-key" className="col-span-1">API Key</Label>
                          <div className="col-span-4 flex gap-2">
                            <Input 
                              id="api-key" 
                              defaultValue={selectedFeed.apiKey}
                              className="flex-1"
                              type={showApiKey ? "text" : "password"}
                            />
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-5 items-center gap-3">
                          <Label htmlFor="status" className="col-span-1">Status</Label>
                          <div className="flex items-center gap-3 col-span-4">
                            <Switch 
                              id="status" 
                              checked={selectedFeed.status === "active"} 
                            />
                            <Label htmlFor="status" className="font-normal">
                              {selectedFeed.status === "active" ? "Active" : "Inactive"}
                            </Label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description" 
                            defaultValue={selectedFeed.description}
                            className="resize-none" 
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdateFeedSettings}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleRefreshFeed(selectedFeed.id)}
                        disabled={selectedFeed.status !== "active"}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" /> Refresh Now
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" /> Open API Docs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => setPendingAction({ id: selectedFeed.id, action: "delete" })}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Feed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Dialog open={pendingAction?.action === "delete" && pendingAction?.id === selectedFeed.id} onOpenChange={(open) => !open && setPendingAction(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete Feed</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this data feed?</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center",
                            selectedFeed?.status === "active" ? "bg-primary/10" : "bg-muted"
                          )}>
                            {selectedFeed?.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{selectedFeed?.name}</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              This action cannot be undone. 
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4 inline-block mr-1" />
                          <span>
                            All data, settings, and API configurations for this feed will be permanently removed.
                          </span>
                        </div>
                      </div>
                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                          variant="outline"
                          onClick={() => setPendingAction(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setPendingAction(null);
                            setSelectedFeed(null);
                            toast({
                              title: "Feed deleted",
                              description: "The data feed has been permanently deleted",
                            });
                          }}
                        >
                          Delete Feed
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Chart section, only visible when a feed is selected */}
        {selectedFeed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Data Visualization</CardTitle>
                    <CardDescription>Analyze your feed data</CardDescription>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Select defaultValue="7d">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="line">
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={selectedFeed.dataPoints.map((value, index) => ({
                      date: `Day ${index + 1}`,
                      value
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                          border: 'none' 
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dot={{ strokeWidth: 3, r: 4, strokeDasharray: '' }}
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#4F46E5' }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
