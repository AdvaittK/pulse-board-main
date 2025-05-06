"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Shield, 
  Lock, 
  Key, 
  UserX, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  History, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Save, 
  Server, 
  RefreshCcw, 
  FileWarning 
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

export default function AdminSecurityPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  
  // Security overview stats
  const [securityScore, setSecurityScore] = useState(78)
  const [threatLevel, setThreatLevel] = useState("low")
  const [activeSessions, setActiveSessions] = useState(18)
  const [pendingActions, setPendingActions] = useState(3)
  
  // Authentication settings
  const [mfaRequired, setMfaRequired] = useState(false)
  const [ssoEnabled, setSsoEnabled] = useState(true)
  const [passwordPolicy, setPasswordPolicy] = useState("strong")
  const [sessionTimeout, setSessionTimeout] = useState(60)
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5)
  const [allowedIpRanges, setAllowedIpRanges] = useState("*")
  
  // Suspicious activities data
  const suspiciousActivities = [
    {
      id: 1,
      user: "john.doe@example.com",
      activity: "Failed login attempts (6)",
      location: "Moscow, Russia",
      ip: "185.73.124.71",
      timestamp: "2025-05-06T08:17:23Z",
      status: "blocked",
    },
    {
      id: 2,
      user: "admin@dashboard.com",
      activity: "Admin action from unusual location",
      location: "Buenos Aires, Argentina",
      ip: "200.89.65.123",
      timestamp: "2025-05-05T22:41:09Z",
      status: "flagged",
    },
    {
      id: 3,
      user: "sarah.miller@example.com",
      activity: "Password reset from unrecognized device",
      location: "Beijing, China",
      ip: "123.45.67.89",
      timestamp: "2025-05-04T15:30:42Z",
      status: "flagged",
    },
    {
      id: 4,
      user: "dev.user@example.com",
      activity: "API key exposed in public repository",
      location: "San Francisco, USA",
      ip: "104.28.42.10",
      timestamp: "2025-05-02T19:22:15Z",
      status: "resolved",
    },
  ]
  
  // Recent access logs
  const recentLogs = [
    {
      id: "log1",
      user: "admin@dashboard.com",
      action: "Updated user permissions",
      resource: "User Management",
      timestamp: "2025-05-06T12:30:15Z",
      status: "success",
    },
    {
      id: "log2",
      user: "sarah.miller@example.com",
      action: "Exported user data",
      resource: "Data Export",
      timestamp: "2025-05-06T11:45:22Z",
      status: "success",
    },
    {
      id: "log3",
      user: "john.doe@example.com",
      action: "Modified system settings",
      resource: "System Settings",
      timestamp: "2025-05-06T10:17:08Z",
      status: "success",
    },
    {
      id: "log4",
      user: "alex.wong@example.com",
      action: "Attempted to access billing settings",
      resource: "Billing",
      timestamp: "2025-05-06T09:05:33Z",
      status: "denied",
    },
  ]
  
  // Security vulnerabilities
  const vulnerabilities = [
    {
      id: "vuln1",
      severity: "high",
      description: "Outdated NPM packages with known security vulnerabilities",
      affected: "Dashboard frontend",
      discovered: "2025-05-01T08:30:00Z",
      status: "open",
    },
    {
      id: "vuln2",
      severity: "medium",
      description: "Weak SSL cipher configuration on API server",
      affected: "API Gateway",
      discovered: "2025-04-28T14:15:00Z",
      status: "in_progress",
    },
    {
      id: "vuln3",
      severity: "medium",
      description: "Insecure cross-origin resource sharing (CORS) policy",
      affected: "Authentication Service",
      discovered: "2025-04-25T09:45:00Z",
      status: "in_progress",
    },
    {
      id: "vuln4",
      severity: "low",
      description: "Missing HTTP security headers",
      affected: "Dashboard frontend",
      discovered: "2025-04-22T11:20:00Z",
      status: "resolved",
    },
  ]
  
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

  const handleSaveSettings = () => {
    // In a real app, save settings to an API
    toast.success("Security settings saved successfully")
    setIsDirty(false)
  }

  const handleBlockUser = (userId: string) => {
    toast.success("User has been blocked")
    // In a real app, call API to block the user
  }

  const handleIgnoreAlert = (alertId: number) => {
    toast.success("Alert marked as resolved")
    // In a real app, update the alert status via API
  }

  const handleFixVulnerability = (vulnId: string) => {
    toast.success("Remediation process started")
    // In a real app, trigger remediation workflow
  }

  const handleRunSecurityScan = () => {
    toast.success("Security scan initiated")
    // In a real app, trigger a security scan
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked':
      case 'denied':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'flagged':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'resolved':
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'open':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Security Center
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage security settings, monitor threats, and review system activity
        </p>
      </div>

      {/* Security overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-800/20 border-indigo-200 dark:border-indigo-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <CardTitle className="text-sm font-medium text-indigo-900 dark:text-indigo-300">Security Score</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold">{securityScore}/100</span>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                  Good
                </Badge>
              </div>
              <Progress value={securityScore} className="h-2 bg-indigo-100 dark:bg-indigo-900/50" indicatorClassName="bg-indigo-600 dark:bg-indigo-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-800/20 border-rose-200 dark:border-rose-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <CardTitle className="text-sm font-medium text-rose-900 dark:text-rose-300">Threat Level</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold capitalize">{threatLevel}</span>
                <Badge variant="outline" className={`bg-${threatLevel === 'low' ? 'green' : threatLevel === 'medium' ? 'amber' : 'red'}-100 text-${threatLevel === 'low' ? 'green' : threatLevel === 'medium' ? 'amber' : 'red'}-800 dark:bg-${threatLevel === 'low' ? 'green' : threatLevel === 'medium' ? 'amber' : 'red'}-900/40 dark:text-${threatLevel === 'low' ? 'green' : threatLevel === 'medium' ? 'amber' : 'red'}-300`}>
                  {threatLevel === 'low' ? '1 active threat' : threatLevel === 'medium' ? '3 active threats' : '8+ active threats'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-800/20 border-cyan-200 dark:border-cyan-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <CardTitle className="text-sm font-medium text-cyan-900 dark:text-cyan-300">Active Sessions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{activeSessions}</span>
                <Badge variant="outline" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300">
                  5 locations
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-300">Pending Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{pendingActions}</span>
                <Button size="sm" variant="outline" className="text-xs h-7 px-2 border-amber-300 dark:border-amber-700 bg-white/80 dark:bg-black/30">
                  Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suspicious" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="suspicious">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Suspicious Activity
          </TabsTrigger>
          <TabsTrigger value="logs">
            <History className="h-4 w-4 mr-2" />
            Access Logs
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities">
            <FileWarning className="h-4 w-4 mr-2" />
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Lock className="h-4 w-4 mr-2" />
            Security Settings
          </TabsTrigger>
        </TabsList>

        {/* Suspicious Activity Tab */}
        <TabsContent value="suspicious">
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activity Monitor</CardTitle>
              <CardDescription>Review and respond to potentially malicious user activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-800 dark:text-amber-300">Attention Required</AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  You have 2 high-priority security alerts that require your immediate attention.
                </AlertDescription>
              </Alert>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden md:table-cell">IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suspiciousActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.user}</TableCell>
                        <TableCell>{activity.activity}</TableCell>
                        <TableCell className="hidden md:table-cell">{activity.location}</TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">{activity.ip}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleBlockUser(activity.user)}
                            >
                              <UserX className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleIgnoreAlert(activity.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Logs Tab */}
        <TabsContent value="logs">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Security Access Logs</CardTitle>
                <CardDescription>Recent user activity and system access records</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter logs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All activity</SelectItem>
                    <SelectItem value="login">Login attempts</SelectItem>
                    <SelectItem value="admin">Admin actions</SelectItem>
                    <SelectItem value="data">Data access</SelectItem>
                    <SelectItem value="settings">Settings changes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead className="hidden md:table-cell">Resource</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell className="hidden md:table-cell">{log.resource}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status === 'success' ? 'Success' : 'Denied'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm">Load more logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Security Vulnerabilities</CardTitle>
                <CardDescription>Detected system vulnerabilities that need remediation</CardDescription>
              </div>
              <Button onClick={handleRunSecurityScan}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Run Security Scan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Severity</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="hidden md:table-cell">Affected Component</TableHead>
                      <TableHead className="hidden md:table-cell">Discovered</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vulnerabilities.map((vuln) => (
                      <TableRow key={vuln.id}>
                        <TableCell>
                          <Badge className={getSeverityColor(vuln.severity)}>
                            {vuln.severity.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium max-w-[300px]">{vuln.description}</TableCell>
                        <TableCell className="hidden md:table-cell">{vuln.affected}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(vuln.discovered).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vuln.status)}>
                            {vuln.status === 'in_progress' ? 'In Progress' : 
                              vuln.status === 'open' ? 'Open' : 'Resolved'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={vuln.status === 'resolved'}
                            onClick={() => handleFixVulnerability(vuln.id)}
                          >
                            {vuln.status === 'open' ? 'Fix Now' : 
                              vuln.status === 'in_progress' ? 'View Progress' : 'View Details'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Manage authentication and authorization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Key className="h-4 w-4 mr-2 text-blue-500" />
                  Authentication Settings
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mfa-required">Multi-Factor Authentication</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="mfa-required" 
                        checked={mfaRequired} 
                        onCheckedChange={(checked) => {
                          setMfaRequired(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="mfa-required">Require MFA for all users</Label>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Enforce two-factor authentication for all user accounts
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sso-enabled">Single Sign-On</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="sso-enabled" 
                        checked={ssoEnabled}
                        onCheckedChange={(checked) => {
                          setSsoEnabled(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="sso-enabled">Enable SSO integration</Label>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Allow users to login with compatible identity providers
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select 
                      value={passwordPolicy} 
                      onValueChange={(value) => {
                        setPasswordPolicy(value)
                        setIsDirty(true)
                      }}
                    >
                      <SelectTrigger id="password-policy">
                        <SelectValue placeholder="Select password policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                        <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                        <SelectItem value="very-strong">Very Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                    <Select 
                      value={String(maxLoginAttempts)} 
                      onValueChange={(value) => {
                        setMaxLoginAttempts(parseInt(value))
                        setIsDirty(true)
                      }}
                    >
                      <SelectTrigger id="max-login-attempts">
                        <SelectValue placeholder="Select maximum login attempts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="session-timeout"
                        min={15}
                        max={240}
                        step={15}
                        value={[sessionTimeout]}
                        onValueChange={(value) => {
                          setSessionTimeout(value[0])
                          setIsDirty(true)
                        }}
                        className="w-[60%]"
                      />
                      <Input 
                        type="number" 
                        value={sessionTimeout}
                        onChange={(e) => {
                          const value = parseInt(e.target.value)
                          if (value >= 15 && value <= 240) {
                            setSessionTimeout(value)
                            setIsDirty(true)
                          }
                        }}
                        className="w-20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ip-ranges">Allowed IP Ranges</Label>
                    <Input 
                      id="ip-ranges"
                      value={allowedIpRanges}
                      onChange={(e) => {
                        setAllowedIpRanges(e.target.value)
                        setIsDirty(true)
                      }}
                      placeholder="e.g., 192.168.1.0/24, 10.0.0.0/8"
                    />
                    <p className="text-muted-foreground text-sm">
                      Use * for any IP or specify CIDR notation
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Server className="h-4 w-4 mr-2 text-amber-500" />
                  API Security
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>API Rate Limiting</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked onChange={() => setIsDirty(true)} />
                      <Label>Enable rate limiting</Label>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Limit API requests to prevent abuse
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>API Key Rotation</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked onChange={() => setIsDirty(true)} />
                      <Label>Auto-rotate API keys</Label>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Automatically rotate API keys every 90 days
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>JWT Token Lifetime</Label>
                    <Select defaultValue="3600">
                      <SelectTrigger>
                        <SelectValue placeholder="Select JWT token lifetime" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="900">15 minutes</SelectItem>
                        <SelectItem value="1800">30 minutes</SelectItem>
                        <SelectItem value="3600">1 hour</SelectItem>
                        <SelectItem value="86400">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>CORS Policy</Label>
                    <Select defaultValue="strict">
                      <SelectTrigger>
                        <SelectValue placeholder="Select CORS policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">Strict (specific origins only)</SelectItem>
                        <SelectItem value="relaxed">Relaxed (trusted origins)</SelectItem>
                        <SelectItem value="open">Open (any origin)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-indigo-500" />
                  Monitoring & Alerts
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Failed Login Alerts</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked onChange={() => setIsDirty(true)} />
                      <Label>Enable alerts</Label>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Send alerts for multiple failed login attempts
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Admin Action Logging</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked onChange={() => setIsDirty(true)} />
                      <Label>Enable enhanced logging</Label>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Detailed logging of all admin actions
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Geo-Location Verification</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked onChange={() => setIsDirty(true)} />
                      <Label>Flag unusual locations</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Real-time Threat Monitoring</Label>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked onChange={() => setIsDirty(true)} />
                      <Label>Enable monitoring</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}