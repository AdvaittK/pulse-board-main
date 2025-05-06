"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ShoppingBag, 
  Filter, 
  Search, 
  Tag, 
  Star, 
  Download, 
  Users, 
  Check, 
  Info, 
  ArrowUpRight, 
  Heart, 
  Clock, 
  ThumbsUp, 
  MessageSquare, 
  Plus
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

// Mock data for marketplace items
const dataFeeds = [
  {
    id: "feed-1",
    name: "Global Market Indicators",
    category: "Financial",
    provider: "MarketData Pro",
    price: 249,
    ratings: 4.8,
    reviewCount: 243,
    purchaseCount: 2789,
    description: "Real-time stream of 50+ global market indicators including major indices, forex rates, and commodity prices.",
    image: "/placeholder.jpg",
    tags: ["real-time", "financial", "global"],
    features: ["5-minute intervals", "Historical data (5 years)", "CSV exports"]
  },
  {
    id: "feed-2",
    name: "Social Media Sentiment",
    category: "Social",
    provider: "SocialMetric",
    price: 199,
    ratings: 4.5,
    reviewCount: 187,
    purchaseCount: 1456,
    description: "Aggregated sentiment analysis from Twitter, Reddit, and other social platforms for selected keywords and topics.",
    image: "/placeholder.jpg",
    tags: ["sentiment", "social", "analytics"],
    features: ["Hourly updates", "Historical trends", "Topic filtering"]
  },
  {
    id: "feed-3",
    name: "Weather Patterns API",
    category: "Environmental",
    provider: "ClimateData Inc.",
    price: 99,
    ratings: 4.7,
    reviewCount: 312,
    purchaseCount: 3567,
    description: "Comprehensive weather data with predictions, historical patterns and climate anomaly detection.",
    image: "/placeholder.jpg",
    tags: ["weather", "climate", "prediction"],
    features: ["Global coverage", "15-minute updates", "Anomaly alerts"]
  },
  {
    id: "feed-4",
    name: "E-commerce Sales Trends",
    category: "Retail",
    provider: "RetailInsights",
    price: 349,
    ratings: 4.6,
    reviewCount: 156,
    purchaseCount: 1243,
    description: "Aggregated sales data from major e-commerce platforms with category and regional breakdowns.",
    image: "/placeholder.jpg",
    tags: ["e-commerce", "sales", "trends"],
    features: ["Daily updates", "Category analysis", "Regional breakdown"]
  },
  {
    id: "feed-5",
    name: "Crypto Market Feed",
    category: "Cryptocurrency",
    provider: "BlockchainMetrics",
    price: 299,
    ratings: 4.9,
    reviewCount: 421,
    purchaseCount: 4532,
    description: "Real-time cryptocurrency market data, including prices, volumes, and on-chain metrics for 200+ tokens.",
    image: "/placeholder.jpg",
    tags: ["crypto", "blockchain", "real-time"],
    features: ["Second-by-second updates", "Whale transaction alerts", "Exchange inflows/outflows"]
  },
  {
    id: "feed-6",
    name: "Industry News Scanner",
    category: "News",
    provider: "NewsAnalytica",
    price: 149,
    ratings: 4.4,
    reviewCount: 98,
    purchaseCount: 876,
    description: "AI-curated industry news and press releases with sentiment analysis and topic categorization.",
    image: "/placeholder.jpg",
    tags: ["news", "ai", "industry"],
    features: ["Customizable topics", "Sentiment analysis", "Breaking news alerts"]
  },
];

const apps = [
  {
    id: "app-1",
    name: "Advanced Chart Analysis",
    category: "Analytics",
    provider: "ChartMaster",
    price: 149,
    ratings: 4.7,
    reviewCount: 187,
    purchaseCount: 2134,
    description: "Professional charting and technical analysis tool with 50+ indicators and drawing tools.",
    image: "/placeholder.jpg",
    tags: ["charts", "technical-analysis", "trading"],
    features: ["Custom indicators", "Multi-timeframe analysis", "Pattern recognition"]
  },
  {
    id: "app-2",
    name: "Dashboard Enhancer",
    category: "UI Tools",
    provider: "UX Solutions",
    price: 79,
    ratings: 4.5,
    reviewCount: 133,
    purchaseCount: 1876,
    description: "Enhance your dashboard with additional widgets, themes, and customization options.",
    image: "/placeholder.jpg",
    tags: ["UI", "widgets", "themes"],
    features: ["25+ widgets", "Custom themes", "Layout presets"]
  },
  {
    id: "app-3",
    name: "Data Export Suite",
    category: "Data",
    provider: "DataFlow Inc.",
    price: 99,
    ratings: 4.6,
    reviewCount: 207,
    purchaseCount: 2543,
    description: "Advanced data export tools with scheduling, templating and multiple format support.",
    image: "/placeholder.jpg",
    tags: ["export", "data", "automation"],
    features: ["CSV/JSON/XML", "Export scheduling", "Custom templates"]
  }
];

const services = [
  {
    id: "service-1",
    name: "Custom Dashboard Setup",
    category: "Consulting",
    provider: "DashPro Services",
    price: 499,
    ratings: 4.9,
    reviewCount: 87,
    purchaseCount: 435,
    description: "Professional setup and configuration of your dashboard with custom requirements and branding.",
    image: "/placeholder.jpg",
    tags: ["setup", "consulting", "custom"],
    features: ["2-hour consultation", "Custom implementation", "30-days support"]
  },
  {
    id: "service-2",
    name: "Data Integration",
    category: "Technical",
    provider: "IntegrateData",
    price: 349,
    ratings: 4.8,
    reviewCount: 134,
    purchaseCount: 789,
    description: "Connect your existing data sources to the dashboard with custom API integration services.",
    image: "/placeholder.jpg",
    tags: ["integration", "API", "data"],
    features: ["Custom connectors", "API development", "Documentation"]
  }
];

interface MarketplaceItemProps {
  item: any;
  type: 'feed' | 'app' | 'service';
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ item, type }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handlePurchase = () => {
    toast.success(`Added ${item.name} to your cart`);
  };
  
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? `Removed from favorites` : `Added to favorites`);
  };
  
  const getPriceLabel = () => {
    if (type === 'service') {
      return `$${item.price} (one-time)`;
    } else {
      return `$${item.price}/mo`;
    }
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription>by {item.provider}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center space-x-1 mb-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{item.ratings}</span>
          <span className="text-sm text-muted-foreground">({item.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center space-x-1 mb-3">
          <Download className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{item.purchaseCount.toLocaleString()} purchases</span>
        </div>
        <p className="text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center border-t">
        <div className="text-base font-semibold">
          {getPriceLabel()}
        </div>
        <Button size="sm" onClick={handlePurchase}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function MarketplacePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("default");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`Searching for "${searchTerm}"`);
  };
  
  const filteredDataFeeds = dataFeeds.filter(item => 
    (categoryFilter === "all" || item.category === categoryFilter) &&
    (searchTerm === "" || 
     item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredApps = apps.filter(item => 
    (categoryFilter === "all" || item.category === categoryFilter) &&
    (searchTerm === "" || 
     item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredServices = services.filter(item => 
    (categoryFilter === "all" || item.category === categoryFilter) &&
    (searchTerm === "" || 
     item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className={`container px-4 py-6 mx-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover data feeds, apps, and services to enhance your dashboard experience
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            className="pl-8 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
              <SelectItem value="Environmental">Environmental</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
              <SelectItem value="News">News</SelectItem>
              <SelectItem value="Analytics">Analytics</SelectItem>
              <SelectItem value="UI Tools">UI Tools</SelectItem>
              <SelectItem value="Data">Data Tools</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceSort} onValueChange={setPriceSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Featured</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Featured */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <Button variant="outline" className="gap-1">
            <Tag className="h-4 w-4" />
            <span>Explore all</span>
          </Button>
        </div>
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="col-span-1 lg:col-span-2 p-8">
              <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800">Featured</Badge>
              <h3 className="text-2xl font-bold mb-2">Advanced AI Data Analysis Suite</h3>
              <p className="text-muted-foreground mb-6">
                Transform your raw data into actionable insights with our AI-powered analysis suite. 
                Perfect for business intelligence and strategic decision-making.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Data Intelligence, Inc.</p>
                  <p className="text-xs text-muted-foreground">Premier Partner</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white/80 dark:bg-black/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">Process up to 50GB of data per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white/80 dark:bg-black/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">12 pre-built analysis models</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white/80 dark:bg-black/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">Custom dashboards and reports</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="gap-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700">
                  <ShoppingBag className="h-4 w-4" />
                  <span>$499/month</span>
                </Button>
                <Button size="lg" variant="outline" className="gap-1">
                  <Info className="h-4 w-4" />
                  <span>Learn more</span>
                </Button>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3 border-l-0 lg:border-l relative h-full bg-gray-100 dark:bg-gray-800">
              <img 
                src="/placeholder.svg" 
                alt="AI Data Analysis Suite" 
                className="w-full h-full object-cover"
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Marketplace tabs */}
      <Tabs defaultValue="data-feeds" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data-feeds">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Data Feeds
          </TabsTrigger>
          <TabsTrigger value="apps">
            <Download className="h-4 w-4 mr-2" />
            Apps
          </TabsTrigger>
          <TabsTrigger value="services">
            <Users className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
        </TabsList>
        
        {/* Data Feeds Tab */}
        <TabsContent value="data-feeds">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDataFeeds.map((feed) => (
              <MarketplaceItem key={feed.id} item={feed} type="feed" />
            ))}
          </div>
          {filteredDataFeeds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No data feeds found matching your criteria.</p>
              <Button variant="link" onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}>Clear filters</Button>
            </div>
          )}
        </TabsContent>
        
        {/* Apps Tab */}
        <TabsContent value="apps">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <MarketplaceItem key={app.id} item={app} type="app" />
            ))}
          </div>
          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No apps found matching your criteria.</p>
              <Button variant="link" onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}>Clear filters</Button>
            </div>
          )}
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <MarketplaceItem key={service.id} item={service} type="service" />
            ))}
          </div>
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services found matching your criteria.</p>
              <Button variant="link" onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}>Clear filters</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Recommended section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recommended for You</h2>
          <Button variant="outline" size="sm">View all</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img src="/placeholder.jpg" alt="Recommendation" className="w-full h-full object-cover" />
              <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Industry Research Reports</CardTitle>
              <CardDescription className="text-xs">by ResearchPro</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.9</span>
                <span className="text-sm text-muted-foreground">(78)</span>
              </div>
              <p className="text-sm line-clamp-2">Monthly industry reports with deep insights and forecasts across multiple sectors.</p>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center border-t mt-auto">
              <div className="font-semibold">$199/mo</div>
              <Button size="sm" variant="outline">Details</Button>
            </CardFooter>
          </Card>
          
          {/* More recommended items would go here */}
        </div>
      </div>
      
      {/* Add your own data feed section */}
      <div className="mt-12 mb-6">
        <Card className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800/80 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Have data to share? Become a provider</CardTitle>
            <CardDescription>List your own data feeds, apps or services in our marketplace</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 max-w-lg">
              <p>Join our partner program and reach thousands of data professionals looking for quality feeds and tools. We handle billing, distribution, and customer support.</p>
              <div className="flex items-center gap-4 mt-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="/placeholder.svg" alt="Become a Provider" className="max-w-[200px]" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Categories section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Financial Data", icon: "💹" },
            { name: "Social Analytics", icon: "👥" },
            { name: "Environmental", icon: "🌎" },
            { name: "Retail & E-commerce", icon: "🛍️" },
            { name: "Cryptocurrency", icon: "💰" },
            { name: "News & Media", icon: "📰" },
            { name: "Health & Wellness", icon: "🩺" },
            { name: "Transportation", icon: "🚗" },
            { name: "Real Estate", icon: "🏠" },
            { name: "Education", icon: "📚" },
            { name: "Technology", icon: "💻" },
            { name: "Entertainment", icon: "🎬" },
          ].map((category) => (
            <Card key={category.name} className="hover:shadow-md transition-all cursor-pointer hover:translate-y-[-2px]">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="font-medium text-sm">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Trending */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Trending this Week</h2>
          <Button variant="ghost" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            View all
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { name: "Renewable Energy Market Insights", provider: "EnergyData", category: "Environmental", popularity: 478 },
            { name: "Social Media Engagement Analytics", provider: "SocialMetric", category: "Social", popularity: 352 },
            { name: "Global Supply Chain Monitor", provider: "LogisticsPro", category: "Retail", popularity: 289 },
          ].map((item, i) => (
            <Card key={i} className="hover:bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.provider} • {item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item.popularity}</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Customer testimonials */}
      <div className="mt-12 mb-10">
        <h2 className="text-2xl font-semibold mb-6">What our users are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              quote: "The financial data feeds have transformed how our team analyzes market trends. Highly recommended for any financial institution.", 
              name: "Sarah Johnson",
              role: "Financial Analyst, Capital Investments",
              avatar: "/placeholder-user.jpg"
            },
            { 
              quote: "Setting up custom integrations was a breeze with their technical services team. They delivered everything on time and exceeded expectations.", 
              name: "Michael Chen",
              role: "CTO, TechSolutions Inc.",
              avatar: "/placeholder-user.jpg"
            },
            { 
              quote: "The social media sentiment analysis has given us incredible insights into our brand perception. Worth every penny.", 
              name: "David Miller",
              role: "Marketing Director, Consumer Brands",
              avatar: "/placeholder-user.jpg"
            },
          ].map((testimonial, i) => (
            <Card key={i} className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="inline-block h-4 w-4 fill-yellow-400 text-yellow-400 mr-0.5" />
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* FAQ section */}
      <div className="mt-12 mb-10">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              q: "How do I integrate purchased data feeds with my dashboard?", 
              a: "After purchasing, you'll find setup instructions in your account. Most data feeds support one-click integration with our dashboard system."
            },
            { 
              q: "Can I request custom data feeds?", 
              a: "Yes! Contact our marketplace team through the 'Request Custom Feed' button on any category page, and we'll connect you with relevant providers."
            },
            { 
              q: "What payment methods are accepted?", 
              a: "We accept all major credit cards, PayPal, and for enterprise customers, we offer invoicing options with net-30 terms."
            },
            { 
              q: "Is there a trial period for data feeds?", 
              a: "Many providers offer 7-day trials. Look for the 'Trial Available' badge on marketplace listings."
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            View all FAQs
          </Button>
        </div>
      </div>
    </div>
  );
}