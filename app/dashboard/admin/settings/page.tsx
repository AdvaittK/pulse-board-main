"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, Save, Lock, Globe, Bell, Shield, Mail, Clock, Database, Upload } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Security Settings
  const [mfaRequired, setMfaRequired] = useState(false)
  const [passwordPolicy, setPasswordPolicy] = useState("strong")
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5)
  
  // General Settings
  const [appName, setAppName] = useState("PulseBoard")
  const [appLogo, setAppLogo] = useState("/placeholder-logo.svg")
  const [defaultTheme, setDefaultTheme] = useState("system")
  const [defaultLanguage, setDefaultLanguage] = useState("en")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [timeFormat, setTimeFormat] = useState("12h")
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [smsNotifications, setSmsNotifications] = useState(false)
  
  // Storage Settings
  const [maxUploadSize, setMaxUploadSize] = useState(10)
  const [allowedFileTypes, setAllowedFileTypes] = useState("image/*,application/pdf,video/*")
  const [storageProvider, setStorageProvider] = useState("local")

  // Indicates if form has been modified
  const [isDirty, setIsDirty] = useState(false)

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
    toast.success("Settings saved successfully")
    setIsDirty(false)
  }

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure global application settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-card border">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Database className="h-4 w-4 mr-2" />
            Storage
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input 
                    id="app-name" 
                    value={appName} 
                    onChange={(e) => {
                      setAppName(e.target.value)
                      setIsDirty(true)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Application Logo</Label>
                  <div className="flex items-center gap-4">
                    <img 
                      src={appLogo} 
                      alt="App Logo" 
                      className="h-10 w-10 object-contain border rounded" 
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-theme">Default Theme</Label>
                  <Select 
                    value={defaultTheme} 
                    onValueChange={(value) => {
                      setDefaultTheme(value)
                      setIsDirty(true)
                    }}
                  >
                    <SelectTrigger id="default-theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select 
                    value={defaultLanguage} 
                    onValueChange={(value) => {
                      setDefaultLanguage(value)
                      setIsDirty(true)
                    }}
                  >
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select 
                    value={dateFormat} 
                    onValueChange={(value) => {
                      setDateFormat(value)
                      setIsDirty(true)
                    }}
                  >
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select 
                    value={timeFormat} 
                    onValueChange={(value) => {
                      setTimeFormat(value)
                      setIsDirty(true)
                    }}
                  >
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>RTL Support</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="rtl-support" />
                  <Label htmlFor="rtl-support">Enable right-to-left (RTL) language support</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure application security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
              </div>

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
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="session-timeout"
                    min={5}
                    max={60}
                    step={5}
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
                      if (value >= 5 && value <= 60) {
                        setSessionTimeout(value)
                        setIsDirty(true)
                      }
                    }}
                    className="w-20"
                  />
                </div>
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
              
              <Alert variant="destructive">
                <Shield className="h-4 w-4" />
                <AlertTitle>Security Warning</AlertTitle>
                <AlertDescription>
                  Making changes to security settings may affect all users. Review carefully before saving.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system and user notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={(checked) => {
                      setEmailNotifications(checked)
                      setIsDirty(true)
                    }}
                  />
                  <Label htmlFor="email-notifications">Send system notifications via email</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-notifications">System Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="system-notifications"
                    checked={systemNotifications}
                    onCheckedChange={(checked) => {
                      setSystemNotifications(checked)
                      setIsDirty(true)
                    }}
                  />
                  <Label htmlFor="system-notifications">Show in-app notifications</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketing-emails">Marketing Communications</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="marketing-emails"
                    checked={marketingEmails}
                    onCheckedChange={(checked) => {
                      setMarketingEmails(checked)
                      setIsDirty(true)
                    }}
                  />
                  <Label htmlFor="marketing-emails">Send marketing emails to users</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={(checked) => {
                      setSmsNotifications(checked)
                      setIsDirty(true)
                    }}
                  />
                  <Label htmlFor="sms-notifications">Enable SMS notifications for critical alerts</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-template">System Email Template</Label>
                <Textarea 
                  id="email-template" 
                  placeholder="Enter email template HTML" 
                  className="font-mono text-sm h-32" 
                  onChange={() => setIsDirty(true)}
                  defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>{{subject}}</title>
</head>
<body>
  <h1>{{title}}</h1>
  <div>{{content}}</div>
  <footer>© PulseBoard {{year}}</footer>
</body>
</html>`}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Storage Settings */}
        <TabsContent value="storage" className="space-y-4">
          <Card className="rounded-lg border shadow-sm">
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>Configure file storage and upload preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storage-provider">Storage Provider</Label>
                <Select 
                  value={storageProvider}
                  onValueChange={(value) => {
                    setStorageProvider(value)
                    setIsDirty(true)
                  }}
                >
                  <SelectTrigger id="storage-provider">
                    <SelectValue placeholder="Select storage provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-upload-size">Maximum Upload Size (MB)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="max-upload-size"
                    min={1}
                    max={100}
                    step={1}
                    value={[maxUploadSize]}
                    onValueChange={(value) => {
                      setMaxUploadSize(value[0])
                      setIsDirty(true)
                    }}
                    className="w-[60%]"
                  />
                  <Input 
                    type="number" 
                    value={maxUploadSize}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (value >= 1 && value <= 100) {
                        setMaxUploadSize(value)
                        setIsDirty(true)
                      }
                    }}
                    className="w-20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allowed-file-types">Allowed File Types</Label>
                <Input 
                  id="allowed-file-types"
                  value={allowedFileTypes}
                  onChange={(e) => {
                    setAllowedFileTypes(e.target.value)
                    setIsDirty(true)
                  }}
                  placeholder="E.g., image/*,application/pdf"
                />
                <p className="text-sm text-muted-foreground">
                  Enter comma-separated MIME types or patterns (e.g., image/*,application/pdf)
                </p>
              </div>
              
              {storageProvider !== "local" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storage-access-key">Access Key/ID</Label>
                    <Input 
                      id="storage-access-key"
                      type="password"
                      placeholder="Enter access key"
                      onChange={() => setIsDirty(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage-secret-key">Secret Key</Label>
                    <Input 
                      id="storage-secret-key"
                      type="password"
                      placeholder="Enter secret key"
                      onChange={() => setIsDirty(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage-bucket">Bucket/Container Name</Label>
                    <Input 
                      id="storage-bucket"
                      placeholder="Enter bucket name"
                      onChange={() => setIsDirty(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage-region">Region</Label>
                    <Input 
                      id="storage-region"
                      placeholder="Enter region (e.g., us-west-2)"
                      onChange={() => setIsDirty(true)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}