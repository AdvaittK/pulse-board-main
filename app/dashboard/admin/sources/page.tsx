"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Database, Plus, Edit, Trash, RefreshCw, ExternalLink } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for data sources
const dataSources = [
  { 
    id: "1", 
    name: "Market Data API", 
    type: "rest-api",
    url: "https://api.marketdata.com/v1",
    status: "active",
    lastSync: "2023-05-01T10:30:00Z",
    frequency: "hourly",
  },
  { 
    id: "2", 
    name: "Customer Database", 
    type: "sql-database",
    url: "postgres://user:password@db.example.com:5432/customers",
    status: "active", 
    lastSync: "2023-05-06T08:15:00Z",
    frequency: "daily",
  },
  { 
    id: "3", 
    name: "Weather Service", 
    type: "rest-api",
    url: "https://api.weatherservice.com/data",
    status: "inactive", 
    lastSync: "2023-04-28T14:45:00Z",
    frequency: "hourly",
  },
  { 
    id: "4", 
    name: "Product Inventory", 
    type: "graphql",
    url: "https://inventory.example.com/graphql",
    status: "active", 
    lastSync: "2023-05-05T23:00:00Z",
    frequency: "realtime",
  },
  { 
    id: "5", 
    name: "Analytics Events", 
    type: "event-stream",
    url: "amqp://events.example.com",
    status: "error", 
    lastSync: "2023-05-04T18:20:00Z",
    frequency: "realtime",
  },
];

export default function AdminDataSourcesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCreatingSource, setIsCreatingSource] = useState(false)
  const [isEditingSource, setIsEditingSource] = useState(false)
  const [currentSource, setCurrentSource] = useState<any>(null)
  const [newSource, setNewSource] = useState({
    name: "",
    type: "rest-api",
    url: "",
    status: "active",
    frequency: "hourly"
  })
  const [selectedTab, setSelectedTab] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Check if user is admin
    if (user?.role !== "admin") {
      router.push("/dashboard")
      return
    }
    
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [router, user])

  const handleEditSource = (source: any) => {
    setCurrentSource({...source})
    setIsEditingSource(true)
  }

  const handleSaveEdit = () => {
    // In a real app, you would save changes to the API
    console.log("Saving changes to:", currentSource)
    setIsEditingSource(false)
  }

  const handleCreateSource = () => {
    // In a real app, you would create the source via API
    console.log("Creating new source:", newSource)
    setIsCreatingSource(false)
    setNewSource({
      name: "",
      type: "rest-api",
      url: "",
      status: "active",
      frequency: "hourly"
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const filteredSources = selectedTab === 'all' 
    ? dataSources 
    : dataSources.filter(source => source.status === selectedTab)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300'
    }
  }

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Data Sources
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage external data sources and integration points
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          <Dialog open={isCreatingSource} onOpenChange={setIsCreatingSource}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Data Source
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Data Source</DialogTitle>
                <DialogDescription>
                  Create a new data source connection for your application.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newSource.name}
                    onChange={(e) => setNewSource({...newSource, name: e.target.value})}
                    className="col-span-3"
                    placeholder="Market Data API"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={newSource.type}
                    onValueChange={(value) => setNewSource({...newSource, type: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select source type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rest-api">REST API</SelectItem>
                      <SelectItem value="graphql">GraphQL</SelectItem>
                      <SelectItem value="sql-database">SQL Database</SelectItem>
                      <SelectItem value="nosql-database">NoSQL Database</SelectItem>
                      <SelectItem value="event-stream">Event Stream</SelectItem>
                      <SelectItem value="sftp">SFTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL / Connection String
                  </Label>
                  <Input
                    id="url"
                    value={newSource.url}
                    onChange={(e) => setNewSource({...newSource, url: e.target.value})}
                    className="col-span-3"
                    placeholder="https://api.example.com/v1"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="frequency" className="text-right">
                    Sync Frequency
                  </Label>
                  <Select
                    value={newSource.frequency}
                    onValueChange={(value) => setNewSource({...newSource, frequency: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select sync frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch
                      id="status"
                      checked={newSource.status === 'active'}
                      onCheckedChange={(checked) => 
                        setNewSource({...newSource, status: checked ? 'active' : 'inactive'})
                      }
                    />
                    <Label htmlFor="status">Active</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreatingSource(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreateSource}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>URL / Connection</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No data sources found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {source.type === 'rest-api' ? 'REST API' :
                          source.type === 'graphql' ? 'GraphQL' :
                          source.type === 'sql-database' ? 'SQL Database' :
                          source.type === 'event-stream' ? 'Event Stream' :
                          source.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate font-mono text-xs">
                      {source.url}
                    </TableCell>
                    <TableCell>
                      {source.frequency === 'realtime' ? 'Real-time' :
                        source.frequency === 'hourly' ? 'Hourly' :
                        source.frequency === 'daily' ? 'Daily' :
                        source.frequency === 'weekly' ? 'Weekly' :
                        source.frequency === 'monthly' ? 'Monthly' :
                        source.frequency === 'manual' ? 'Manual Only' :
                        source.frequency}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(source.lastSync).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(source.status)}>
                        {source.status === 'active' ? 'Active' :
                          source.status === 'inactive' ? 'Inactive' :
                          source.status === 'error' ? 'Error' :
                          source.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSource(source)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Source Dialog */}
      <Dialog open={isEditingSource} onOpenChange={setIsEditingSource}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Data Source</DialogTitle>
            <DialogDescription>
              Modify the data source connection details.
            </DialogDescription>
          </DialogHeader>
          {currentSource && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentSource.name}
                  onChange={(e) => setCurrentSource({...currentSource, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={currentSource.type}
                  onValueChange={(value) => setCurrentSource({...currentSource, type: value})}
                >
                  <SelectTrigger id="edit-type" className="col-span-3">
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rest-api">REST API</SelectItem>
                    <SelectItem value="graphql">GraphQL</SelectItem>
                    <SelectItem value="sql-database">SQL Database</SelectItem>
                    <SelectItem value="nosql-database">NoSQL Database</SelectItem>
                    <SelectItem value="event-stream">Event Stream</SelectItem>
                    <SelectItem value="sftp">SFTP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-url" className="text-right">
                  URL / Connection String
                </Label>
                <Input
                  id="edit-url"
                  value={currentSource.url}
                  onChange={(e) => setCurrentSource({...currentSource, url: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-frequency" className="text-right">
                  Sync Frequency
                </Label>
                <Select
                  value={currentSource.frequency}
                  onValueChange={(value) => setCurrentSource({...currentSource, frequency: value})}
                >
                  <SelectTrigger id="edit-frequency" className="col-span-3">
                    <SelectValue placeholder="Select sync frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-status"
                    checked={currentSource.status === 'active'}
                    onCheckedChange={(checked) => 
                      setCurrentSource({...currentSource, status: checked ? 'active' : 'inactive'})
                    }
                  />
                  <Label htmlFor="edit-status">Active</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditingSource(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}