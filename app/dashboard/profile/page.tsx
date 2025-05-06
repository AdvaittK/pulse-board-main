'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { 
  CheckCircle, 
  Loader2, 
  User, 
  Upload, 
  Shield, 
  Key, 
  Bell, 
  Trash2, 
  Camera, 
  MapPin, 
  Building, 
  Briefcase,
  Mail,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

// Demo profile data
const demoUser = {
  id: 'user-demo-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: null,
  role: 'admin',
  company: 'PulseBoard Inc.',
  title: 'Product Manager',
  location: 'San Francisco, CA',
  bio: 'Passionate about data visualization and analytics. Working on improving dashboard experiences for our users.'
}

// Additional profile data for security and notifications tabs
const securitySettings = {
  twoFactorEnabled: false,
  lastPasswordChange: '2023-12-10T09:15:00Z',
  activeDevices: [
    { id: 1, name: 'Windows PC - Chrome', lastActive: '2025-05-01T18:30:00Z', current: true },
    { id: 2, name: 'iPhone 15 - Safari', lastActive: '2025-04-28T13:45:00Z', current: false },
  ]
}

const notificationSettings = {
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: true,
  securityAlerts: true,
  productUpdates: true
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [isUploading, setIsUploading] = useState(false)
  const [user] = useState(demoUser)
  const [formData, setFormData] = useState({
    firstName: demoUser.firstName,
    lastName: demoUser.lastName,
    email: demoUser.email,
    phone: demoUser.phone || '',
    company: demoUser.company || '',
    title: demoUser.title || '',
    location: demoUser.location || '',
    bio: demoUser.bio || ''
  })
  
  const handleUploadAvatar = () => {
    setIsUploading(true);
    
    // Mock file upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully."
      });
    }, 2000);
  };

  // Handle form submission
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setUpdateSuccess(false);
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsLoading(false);
      setUpdateSuccess(true);
      
      // Show toast notification
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully',
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1500);
  }

  // Handle notification setting changes
  const handleNotificationChange = (key: string, value: boolean) => {
    toast({
      title: 'Notification setting updated',
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  }

  // Handle form field changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal account information, notifications and security settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-indigo-950/30 sticky top-20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-lg">
                      <AvatarImage src={user?.avatar || '/placeholder-user.jpg'} alt={user?.firstName} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <button 
                      onClick={handleUploadAvatar}
                      className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-200"
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  <h3 className="mt-4 font-semibold text-lg">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  
                  <div className="mt-2">
                    {user?.role === 'admin' ? (
                      <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 dark:from-purple-900 dark:to-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Administrator
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100/50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        User
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-4 w-full flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span className="truncate">{user?.email}</span>
                    </div>
                    
                    {user?.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span>{user?.phone}</span>
                      </div>
                    )}
                    
                    {user?.company && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="h-4 w-4 text-purple-500" />
                        <span>{user?.company}</span>
                      </div>
                    )}
                    
                    {user?.title && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4 text-amber-500" />
                        <span>{user?.title}</span>
                      </div>
                    )}
                    
                    {user?.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        <span>{user?.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="w-full">
                    <Button variant="outline" className="w-full">
                      Reset Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Profile content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl">
              <TabsTrigger 
                value="general" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="general">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                      >
                        <motion.div variants={itemVariants}>
                          <h3 className="text-lg font-medium">Personal Information</h3>
                          <p className="text-sm text-muted-foreground mb-4">Update your personal contact information</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                              <Input 
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First name" 
                                className="bg-background" 
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                              <Input 
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last name" 
                                className="bg-background" 
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                              <Input 
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email} 
                                onChange={handleInputChange}
                                placeholder="Email address" 
                                className="bg-background" 
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                              <Input 
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone number (optional)" 
                                className="bg-background" 
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Format: +1 5551234567 or 5551234567
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        <Separator />

                        <motion.div variants={itemVariants}>
                          <h3 className="text-lg font-medium">Professional Information</h3>
                          <p className="text-sm text-muted-foreground mb-4">Share details about your professional background</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                              <Input 
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Your company" 
                                className="bg-background" 
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="title" className="block text-sm font-medium mb-1">Job Title</label>
                              <Input 
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Your job title" 
                                className="bg-background" 
                              />
                            </div>

                            <div>
                              <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                              <Input 
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="City, Country" 
                                className="bg-background" 
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                              <Textarea 
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us a little bit about yourself" 
                                className="bg-background resize-none min-h-[100px]" 
                              />
                              <div className="flex justify-end mt-1">
                                <p className="text-xs text-muted-foreground">
                                  {formData.bio?.length || 0}/200 characters
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {updateSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-900 dark:text-green-200">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <AlertDescription>
                                Your profile has been updated successfully!
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        )}
                      </motion.div>
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving Changes...
                            </span>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
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
                          <Key className="h-5 w-5 text-blue-500" />
                          Password
                        </CardTitle>
                        <CardDescription>
                          Change your password and manage your account security
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
                          <div>
                            <h4 className="font-medium">Password</h4>
                            <p className="text-sm text-muted-foreground">
                              Last changed: {new Date(securitySettings.lastPasswordChange).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline">Change Password</Button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch 
                            checked={securitySettings.twoFactorEnabled}
                            onCheckedChange={(checked) => {
                              toast({
                                title: checked ? "2FA Enabled" : "2FA Disabled",
                                description: checked 
                                  ? "Two-factor authentication has been enabled." 
                                  : "Two-factor authentication has been disabled."
                              });
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-500" />
                          Active Sessions
                        </CardTitle>
                        <CardDescription>
                          Manage your active devices and sessions
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {securitySettings.activeDevices.map((device) => (
                          <div key={device.id} className="flex items-center justify-between border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "h-2 w-2 mt-2 rounded-full",
                                device.current ? "bg-green-500" : "bg-blue-400"
                              )} />
                              <div>
                                <h4 className="font-medium flex items-center">
                                  {device.name}
                                  {device.current && (
                                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                      Current
                                    </Badge>
                                  )}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Last active: {new Date(device.lastActive).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {!device.current && (
                              <Button variant="outline" size="sm">
                                Sign Out
                              </Button>
                            )}
                          </div>
                        ))}
                      </CardContent>
                      <CardFooter>
                        <Button variant="destructive" className="w-full">
                          <Shield className="mr-2 h-4 w-4" /> Sign Out From All Devices
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 shadow-lg border-red-200 dark:border-red-900/50">
                      <CardHeader className="text-red-600 dark:text-red-400">
                        <CardTitle className="flex items-center gap-2">
                          <Trash2 className="h-5 w-5" />
                          Delete Account
                        </CardTitle>
                        <CardDescription className="text-red-600/80 dark:text-red-400/80">
                          Permanently delete your account and all of your data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-amber-500" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Manage how and when you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch 
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('Email notifications', checked)} 
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <h4 className="font-medium">Push Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications on your device
                            </p>
                          </div>
                          <Switch 
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('Push notifications', checked)}
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <h4 className="font-medium">Marketing Emails</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new features and promotions
                            </p>
                          </div>
                          <Switch 
                            checked={notificationSettings.marketingEmails}
                            onCheckedChange={(checked) => handleNotificationChange('Marketing emails', checked)}
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between pb-4 border-b">
                          <div>
                            <h4 className="font-medium">Security Alerts</h4>
                            <p className="text-sm text-muted-foreground">
                              Get notified about important security events
                            </p>
                          </div>
                          <Switch 
                            checked={notificationSettings.securityAlerts}
                            onCheckedChange={(checked) => handleNotificationChange('Security alerts', checked)}
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Product Updates</h4>
                            <p className="text-sm text-muted-foreground">
                              Get notifications about product updates and new features
                            </p>
                          </div>
                          <Switch 
                            checked={notificationSettings.productUpdates}
                            onCheckedChange={(checked) => handleNotificationChange('Product updates', checked)}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t">
                    <Button variant="ghost">
                      Restore Defaults
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}