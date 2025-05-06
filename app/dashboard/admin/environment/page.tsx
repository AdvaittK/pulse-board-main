"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Leaf, Save, Plus, Trash, Edit, Eye, EyeOff, Search } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock data for environment variables
const envVariables = [
  { id: "1", key: "API_URL", value: "https://api.example.com/v1", environment: "production", isSecret: false },
  { id: "2", key: "DB_HOST", value: "db.example.com", environment: "production", isSecret: false },
  { id: "3", key: "DB_USER", value: "admin", environment: "production", isSecret: false },
  { id: "4", key: "DB_PASSWORD", value: "********", environment: "production", isSecret: true },
  { id: "5", key: "REDIS_URL", value: "redis://redis.example.com:6379", environment: "production", isSecret: false },
  { id: "6", key: "API_KEY", value: "********", environment: "production", isSecret: true },
  { id: "7", key: "API_URL", value: "https://staging-api.example.com/v1", environment: "staging", isSecret: false },
  { id: "8", key: "DB_HOST", value: "staging-db.example.com", environment: "staging", isSecret: false },
  { id: "9", key: "DEBUG", value: "true", environment: "development", isSecret: false },
  { id: "10", key: "LOG_LEVEL", value: "debug", environment: "development", isSecret: false },
];

export default function AdminEnvironmentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("production")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [currentVariable, setCurrentVariable] = useState<{ id: string, key: string, value: string, environment: string, isSecret: boolean } | null>(null)
  const [newVariable, setNewVariable] = useState({ key: "", value: "", environment: "production", isSecret: false })

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

  // Filter environment variables based on search and selected environment
  const filteredVariables = envVariables.filter(variable => {
    const matchesSearch = variable.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (!variable.isSecret && variable.value.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEnvironment = selectedEnvironment === 'all' || variable.environment === selectedEnvironment;
    return matchesSearch && matchesEnvironment;
  });

  const handleToggleSecret = (id: string) => {
    setShowSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEditVariable = (variable: typeof envVariables[0]) => {
    setCurrentVariable(variable);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // In a real app, you would save changes to the API
    console.log("Saving changes to:", currentVariable);
    setIsEditDialogOpen(false);
  };

  const handleCreateVariable = () => {
    // In a real app, you would create a new variable via API
    console.log("Creating new variable:", newVariable);
    setIsNewDialogOpen(false);
    setNewVariable({ key: "", value: "", environment: selectedEnvironment, isSecret: false });
  };

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Environment Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure and manage environment variables and settings
        </p>
      </div>

      <Tabs 
        defaultValue="production" 
        className="space-y-4"
        value={selectedEnvironment}
        onValueChange={setSelectedEnvironment}
      >
        <div className="flex justify-between flex-col sm:flex-row gap-2">
          <TabsList className="bg-card border">
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="staging">Staging</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="all">All Environments</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search variables..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  New Variable
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Environment Variable</DialogTitle>
                  <DialogDescription>
                    Add a new environment variable to the {selectedEnvironment} environment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-key" className="text-right">
                      Key
                    </Label>
                    <Input
                      id="new-key"
                      value={newVariable.key}
                      onChange={(e) => setNewVariable({...newVariable, key: e.target.value})}
                      className="col-span-3"
                      placeholder="API_KEY"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-value" className="text-right">
                      Value
                    </Label>
                    <Input
                      id="new-value"
                      value={newVariable.value}
                      onChange={(e) => setNewVariable({...newVariable, value: e.target.value})}
                      className="col-span-3"
                      placeholder="your-api-key-value"
                      type={newVariable.isSecret ? "password" : "text"}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-environment" className="text-right">
                      Environment
                    </Label>
                    <select
                      id="new-environment"
                      value={newVariable.environment}
                      onChange={(e) => setNewVariable({...newVariable, environment: e.target.value})}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-secret" className="text-right">
                      Secret
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch
                        id="new-secret"
                        checked={newVariable.isSecret}
                        onCheckedChange={(checked) => setNewVariable({...newVariable, isSecret: checked})}
                      />
                      <Label htmlFor="new-secret">Mark as secret</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCreateVariable}>
                    Create Variable
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="rounded-lg border shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable</TableHead>
                  <TableHead>Value</TableHead>
                  {selectedEnvironment === 'all' && <TableHead>Environment</TableHead>}
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVariables.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={selectedEnvironment === 'all' ? 4 : 3} className="text-center py-8 text-muted-foreground">
                      No environment variables found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVariables.map((variable) => (
                    <TableRow key={variable.id}>
                      <TableCell className="font-mono">
                        {variable.key}
                      </TableCell>
                      <TableCell className="font-mono">
                        {variable.isSecret ? (
                          <div className="flex items-center gap-2">
                            <span>{showSecrets[variable.id] ? variable.value : "••••••••"}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleSecret(variable.id)}
                              className="h-6 w-6"
                            >
                              {showSecrets[variable.id] ? (
                                <EyeOff className="h-3.5 w-3.5" />
                              ) : (
                                <Eye className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                        ) : (
                          variable.value
                        )}
                      </TableCell>
                      {selectedEnvironment === 'all' && (
                        <TableCell>
                          <Badge variant="outline" className={
                            variable.environment === 'production' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            variable.environment === 'staging' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                          }>
                            {variable.environment}
                          </Badge>
                        </TableCell>
                      )}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditVariable(variable)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
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
      </Tabs>

      {/* Edit Variable Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Environment Variable</DialogTitle>
            <DialogDescription>
              Make changes to the environment variable.
            </DialogDescription>
          </DialogHeader>
          {currentVariable && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-key" className="text-right">
                  Key
                </Label>
                <Input
                  id="edit-key"
                  value={currentVariable.key}
                  onChange={(e) => setCurrentVariable({...currentVariable, key: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Value
                </Label>
                <Input
                  id="edit-value"
                  value={currentVariable.value}
                  onChange={(e) => setCurrentVariable({...currentVariable, value: e.target.value})}
                  className="col-span-3"
                  type={currentVariable.isSecret && !showSecrets[currentVariable.id] ? "password" : "text"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-environment" className="text-right">
                  Environment
                </Label>
                <select
                  id="edit-environment"
                  value={currentVariable.environment}
                  onChange={(e) => setCurrentVariable({...currentVariable, environment: e.target.value})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-secret" className="text-right">
                  Secret
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-secret"
                    checked={currentVariable.isSecret}
                    onCheckedChange={(checked) => setCurrentVariable({...currentVariable, isSecret: checked})}
                  />
                  <Label htmlFor="edit-secret">Mark as secret</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
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