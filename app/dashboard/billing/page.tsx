"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  Plus, 
  FileText, 
  Calendar as CalendarIcon, 
  CheckCircle,
  ChevronsUpDown,
  ExternalLink,
  AlertCircle,
  Receipt,
  Info,
  Clock,
  MoreHorizontal,
  Filter,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableFooter,
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import PieChart from "@/components/charts/PieChart"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for billing and payments
const paymentMethods = [
  {
    id: "pm_1",
    type: "card",
    provider: "visa",
    lastFour: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    cardholderName: "John Doe"
  },
  {
    id: "pm_2",
    type: "card",
    provider: "mastercard",
    lastFour: "5678",
    expiryMonth: 9,
    expiryYear: 2024,
    isDefault: false,
    cardholderName: "John Doe"
  }
]

const invoices = [
  {
    id: "INV-001",
    date: "2025-04-15",
    dueDate: "2025-04-15",
    amount: 39.98,
    currency: "USD",
    status: "paid",
    description: "Pro Plan + Financial Data Add-on - April",
    items: [
      { name: "Pro Plan", amount: 29.99, quantity: 1 },
      { name: "Financial Data Add-on", amount: 9.99, quantity: 1 }
    ],
    paidOn: "2025-04-15T09:30:00Z",
    paidWith: "Visa •••• 4242"
  },
  {
    id: "INV-002",
    date: "2025-03-15",
    dueDate: "2025-03-15",
    amount: 39.98,
    currency: "USD",
    status: "paid",
    description: "Pro Plan + Financial Data Add-on - March",
    items: [
      { name: "Pro Plan", amount: 29.99, quantity: 1 },
      { name: "Financial Data Add-on", amount: 9.99, quantity: 1 }
    ],
    paidOn: "2025-03-15T10:45:00Z",
    paidWith: "Visa •••• 4242"
  },
  {
    id: "INV-003",
    date: "2025-02-15",
    dueDate: "2025-02-15",
    amount: 39.98,
    currency: "USD",
    status: "paid",
    description: "Pro Plan + Financial Data Add-on - February",
    items: [
      { name: "Pro Plan", amount: 29.99, quantity: 1 },
      { name: "Financial Data Add-on", amount: 9.99, quantity: 1 }
    ],
    paidOn: "2025-02-16T11:20:00Z",
    paidWith: "Visa •••• 4242"
  },
  {
    id: "INV-004",
    date: "2025-01-15",
    dueDate: "2025-01-15",
    amount: 39.98,
    currency: "USD",
    status: "paid",
    description: "Pro Plan + Financial Data Add-on - January",
    items: [
      { name: "Pro Plan", amount: 29.99, quantity: 1 },
      { name: "Financial Data Add-on", amount: 9.99, quantity: 1 }
    ],
    paidOn: "2025-01-15T14:10:00Z",
    paidWith: "Visa •••• 4242"
  },
  {
    id: "INV-005",
    date: "2024-12-15",
    dueDate: "2024-12-15",
    amount: 29.99,
    currency: "USD",
    status: "paid",
    description: "Pro Plan - December",
    items: [
      { name: "Pro Plan", amount: 29.99, quantity: 1 }
    ],
    paidOn: "2024-12-15T16:45:00Z",
    paidWith: "Visa •••• 4242"
  }
]

const billingHistory = [
  {
    id: "tr_001",
    date: "2025-04-15T09:30:00Z",
    amount: 39.98,
    currency: "USD",
    type: "charge",
    description: "Payment for invoice INV-001",
    status: "succeeded",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: "tr_002",
    date: "2025-03-15T10:45:00Z",
    amount: 39.98,
    currency: "USD",
    type: "charge",
    description: "Payment for invoice INV-002",
    status: "succeeded",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: "tr_003",
    date: "2025-02-16T11:20:00Z",
    amount: 39.98,
    currency: "USD",
    type: "charge",
    description: "Payment for invoice INV-003",
    status: "succeeded",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: "tr_004",
    date: "2025-01-15T14:10:00Z",
    amount: 39.98,
    currency: "USD",
    type: "charge",
    description: "Payment for invoice INV-004",
    status: "succeeded",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: "tr_005",
    date: "2024-12-15T16:45:00Z",
    amount: 29.99,
    currency: "USD",
    type: "charge",
    description: "Payment for invoice INV-005",
    status: "succeeded",
    paymentMethod: "Visa •••• 4242"
  }
]

const upcomingCharges = [
  {
    id: "upcoming_1",
    date: "2025-05-15",
    amount: 39.98,
    currency: "USD",
    description: "Pro Plan + Financial Data Add-on - May",
    items: [
      { name: "Pro Plan", amount: 29.99, quantity: 1 },
      { name: "Financial Data Add-on", amount: 9.99, quantity: 1 }
    ]
  }
]

const billingAddresses = [
  {
    id: "addr_1",
    name: "John Doe",
    line1: "123 Main St",
    line2: "Suite 404",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "United States",
    isDefault: true,
    phone: "+1 (555) 123-4567",
    email: "john@example.com"
  }
]

// Chart data for spending analysis
const spendingByService = [
  { name: "Pro Plan", value: 149.95, color: "blue" },
  { name: "Financial Data Add-on", value: 39.96, color: "purple" },
]

// Motion variants
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
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null)
  const { toast } = useToast()

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded successfully.`
    })
  }
  
  const handleAddPaymentMethod = () => {
    setIsAddingPaymentMethod(false)
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully."
    })
  }

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
            Billing
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage payment methods, billing history, and download invoices
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md self-start md:self-auto"
              onClick={() => setIsAddingPaymentMethod(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Enter your card details to add a new payment method
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input id="cardholderName" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="defaultPayment" className="rounded text-blue-600" />
                <Label htmlFor="defaultPayment">Set as default payment method</Label>
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button variant="outline" onClick={() => setIsAddingPaymentMethod(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddPaymentMethod}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Add Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="overview" className="space-y-8" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="invoices" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Invoices
            </TabsTrigger>
            <TabsTrigger 
              value="payment-methods" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger 
              value="addresses" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              Billing Addresses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {!isLoaded ? (
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 border-0 shadow-lg">
                  <CardHeader>
                    <Skeleton className="h-6 w-36" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[300px] w-full rounded-md" />
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-3"
              >
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        Spending Analysis
                      </CardTitle>
                      <CardDescription>
                        Your subscription spending breakdown for the last 3 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <div className="flex h-[180px] justify-center">
                            <PieChart 
                              chartData={spendingByService.map(item => item.value)}
                              chartOptions={{
                                labels: spendingByService.map(item => item.name),
                                colors: spendingByService.map(item => item.color === 'blue' ? '#3b82f6' : '#9333ea'),
                                legend: {
                                  show: false
                                },
                                dataLabels: {
                                  enabled: false
                                },
                                stroke: {
                                  width: 0
                                },
                                tooltip: {
                                  enabled: true,
                                  y: {
                                    formatter: (value) => formatCurrency(value)
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="mt-4 space-y-3">
                            {spendingByService.map((item, i) => (
                              <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className={`h-3 w-3 rounded-full bg-${item.color}-500`} 
                                    style={{ backgroundColor: item.color === 'blue' ? '#3b82f6' : '#9333ea' }} 
                                  />
                                  <span>{item.name}</span>
                                </div>
                                <span className="font-medium">{formatCurrency(item.value)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between border-t pt-2 mt-2">
                              <span className="font-medium">Total</span>
                              <span className="font-bold">
                                {formatCurrency(spendingByService.reduce((acc, curr) => acc + curr.value, 0))}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <h3 className="font-medium">Recent Transactions</h3>
                          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
                            {billingHistory.slice(0, 5).map((transaction) => (
                              <div 
                                key={transaction.id}
                                className="flex items-center justify-between py-2 border-b last:border-0"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Payment for {transaction.description.split(' ').slice(-1)}</p>
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs text-muted-foreground">
                                        {formatDate(transaction.date)}
                                      </p>
                                      <Badge 
                                        variant="outline"
                                        className="text-[10px] px-1 py-0 rounded-sm h-4 bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                                      >
                                        Success
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                                  <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center pt-2">
                            <Button variant="link" size="sm" className="flex items-center gap-1">
                              View All Transactions <ArrowUpRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="border-b bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-blue-500" />
                        Upcoming Charges
                      </CardTitle>
                      <CardDescription>
                        Your scheduled payments for next billing cycle
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      {upcomingCharges.map((charge) => (
                        <div key={charge.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{charge.description}</h3>
                            <Badge 
                              variant="outline"
                              className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                            >
                              Upcoming
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span className="font-medium">{formatDate(charge.date)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-bold">{formatCurrency(charge.amount)}</span>
                          </div>
                          <div className="pt-2 space-y-2">
                            {charge.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-xs">
                                <span>{item.name}</span>
                                <span>{formatCurrency(item.amount)} × {item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Payment Method</h3>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Change
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="invoices">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Receipt className="h-5 w-5 text-amber-500" />
                          Invoices
                        </CardTitle>
                        <CardDescription>
                          View and download your past invoices
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Filter by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Invoices</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                          <Filter className="h-4 w-4" />
                          <span className="hidden sm:inline">Filter</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="hidden sm:table-cell">Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{formatDate(invoice.date)}</TableCell>
                            <TableCell className="hidden sm:table-cell line-clamp-1 max-w-[200px]">{invoice.description}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                              >
                                Paid
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(invoice.amount)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                    onClick={() => {
                                      setSelectedInvoice(invoice)
                                      document.getElementById("invoice-details-dialog-trigger")?.click()
                                    }}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice.id)}>
                                    Download PDF
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Email Invoice</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing {invoices.length} of {invoices.length} invoices
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
              
              {/* Hidden dialog trigger for invoice details */}
              <Dialog>
                <DialogTrigger asChild>
                  <button id="invoice-details-dialog-trigger" className="sr-only">
                    Open Invoice Details
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <span>Invoice {selectedInvoice?.id}</span>
                      <Badge 
                        variant="outline" 
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                      >
                        Paid
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Issued on {selectedInvoice && formatDate(selectedInvoice.date)}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Billing Details</h3>
                      <div className="text-sm">John Doe</div>
                      <div className="text-sm">123 Main Street, Suite 404</div>
                      <div className="text-sm">San Francisco, CA 94105</div>
                      <div className="text-sm">United States</div>
                    </div>
                    
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedInvoice?.items.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(item.amount)} × {item.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell className="text-right">
                              {selectedInvoice && formatCurrency(selectedInvoice.amount)}
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Payment Method:</span>
                        <span>{selectedInvoice?.paidWith}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payment Date:</span>
                        <span>
                          {selectedInvoice && formatDate(selectedInvoice.paidOn)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => handleDownloadInvoice(selectedInvoice?.id || '')}>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <ExternalLink className="h-4 w-4" />
                      View Full Invoice
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          </TabsContent>

          <TabsContent value="payment-methods">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      Payment Methods
                    </CardTitle>
                    <CardDescription>
                      Manage your saved payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 divide-y">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <CreditCard className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium capitalize">
                                  {method.provider} •••• {method.lastFour}
                                </p>
                                {method.isDefault && (
                                  <Badge className="bg-blue-500 text-white">Default</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Expires {method.expiryMonth}/{method.expiryYear}</span>
                                <span>•</span>
                                <span>{method.cardholderName}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            {!method.isDefault && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Default Payment Method Updated",
                                    description: `${method.provider} ending in ${method.lastFour} is now your default payment method.`
                                  })
                                }}
                              >
                                Make Default
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 dark:text-red-400"
                                  onClick={() => {
                                    toast({
                                      title: "Payment Method Removed",
                                      description: `${method.provider} ending in ${method.lastFour} has been removed.`,
                                      variant: "destructive"
                                    })
                                  }}
                                >
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-center border-t">
                    <Button 
                      onClick={() => setIsAddingPaymentMethod(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Payment Method
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Alert className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription className="flex items-center justify-between w-full">
                    <span>Your payment information is encrypted and securely stored.</span>
                    <Button variant="link" className="h-auto p-0 text-amber-800 dark:text-amber-300">
                      Learn more
                    </Button>
                  </AlertDescription>
                </Alert>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="addresses">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-500" />
                      Billing Addresses
                    </CardTitle>
                    <CardDescription>
                      Manage addresses used for billing purposes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 divide-y">
                    {billingAddresses.map((address) => (
                      <div key={address.id} className="py-4 first:pt-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{address.name}</h3>
                              {address.isDefault && (
                                <Badge className="bg-blue-500 text-white">Default</Badge>
                              )}
                            </div>
                            <div className="space-y-1 text-muted-foreground">
                              <p className="text-sm">{address.line1}</p>
                              {address.line2 && <p className="text-sm">{address.line2}</p>}
                              <p className="text-sm">
                                {address.city}, {address.state} {address.postalCode}
                              </p>
                              <p className="text-sm">{address.country}</p>
                              <div className="pt-1 flex flex-col sm:flex-row sm:gap-4">
                                <p className="text-sm flex items-center gap-1.5">
                                  <Phone className="h-3.5 w-3.5" />
                                  {address.phone}
                                </p>
                                <p className="text-sm flex items-center gap-1.5">
                                  <Mail className="h-3.5 w-3.5" />
                                  {address.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-start">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" disabled={address.isDefault}>
                              {address.isDefault ? 'Default Address' : 'Make Default'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-center border-t">
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => {
                        toast({
                          title: "Add Billing Address",
                          description: "This feature is coming soon."
                        })
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Billing Address
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

// Utility Components

function Phone({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Mail({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}