"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PieChart, LineChart, BarChart, Sliders, Save, RefreshCw, Check, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// This is a mock component for the color picker if you don't have one
const FallbackColorPicker = ({ value, onChange }: { value: string, onChange: (color: string) => void }) => (
  <Input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
)

export default function AdminVisualizationPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  
  // Chart settings
  const [chartTheme, setChartTheme] = useState("system")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")
  const [secondaryColor, setSecondaryColor] = useState("#6366f1")
  const [accentColor, setAccentColor] = useState("#8b5cf6")
  const [negativeColor, setNegativeColor] = useState("#ef4444")
  const [positiveColor, setPositiveColor] = useState("#22c55e")
  const [fontFamily, setFontFamily] = useState("Inter, system-ui")
  const [animations, setAnimations] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [tooltips, setTooltips] = useState(true)
  const [responsiveLayout, setResponsiveLayout] = useState(true)
  const [enableGridLines, setEnableGridLines] = useState(true)
  const [enableLegends, setEnableLegends] = useState(true)
  const [axisLabelSize, setAxisLabelSize] = useState(12)
  const [titleSize, setTitleSize] = useState(16)

  // Dashboard settings
  const [dashboardLayout, setDashboardLayout] = useState("grid")
  const [widgetGap, setWidgetGap] = useState(16)
  const [defaultWidgetHeight, setDefaultWidgetHeight] = useState(300)
  const [showWidgetBorders, setShowWidgetBorders] = useState(true)
  const [allowWidgetResize, setAllowWidgetResize] = useState(true)
  const [allowWidgetDrag, setAllowWidgetDrag] = useState(true)
  
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
    toast.success("Visualization settings saved successfully")
    setIsDirty(false)
  }

  const handleResetToDefaults = () => {
    // Reset all settings to defaults
    setChartTheme("system")
    setPrimaryColor("#3b82f6")
    setSecondaryColor("#6366f1")
    setAccentColor("#8b5cf6")
    setNegativeColor("#ef4444")
    setPositiveColor("#22c55e")
    setFontFamily("Inter, system-ui")
    setAnimations(true)
    setDarkMode(true)
    setTooltips(true)
    setResponsiveLayout(true)
    setEnableGridLines(true)
    setEnableLegends(true)
    setAxisLabelSize(12)
    setTitleSize(16)
    setDashboardLayout("grid")
    setWidgetGap(16)
    setDefaultWidgetHeight(300)
    setShowWidgetBorders(true)
    setAllowWidgetResize(true)
    setAllowWidgetDrag(true)
    
    toast.info("Settings reset to defaults")
    setIsDirty(false)
  }

  return (
    <div className={`container px-4 py-6 mx-auto max-w-7xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Visualization Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure chart appearance, colors, and dashboard layout
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Tabs defaultValue="charts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="charts" onClick={() => setIsDirty(true)}>
              <LineChart className="h-4 w-4 mr-2" />
              Chart Settings
            </TabsTrigger>
            <TabsTrigger value="dashboard" onClick={() => setIsDirty(true)}>
              <BarChart className="h-4 w-4 mr-2" />
              Dashboard Layout
            </TabsTrigger>
          </TabsList>
          
          {/* Chart Settings */}
          <TabsContent value="charts" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Chart Appearance</CardTitle>
                <CardDescription>Configure the visual appearance of charts across the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="chart-theme">Chart Theme</Label>
                    <Select
                      value={chartTheme}
                      onValueChange={(value) => {
                        setChartTheme(value)
                        setIsDirty(true)
                      }}
                    >
                      <SelectTrigger id="chart-theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System (Follow App Theme)</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="vibrant">Vibrant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select
                      value={fontFamily}
                      onValueChange={(value) => {
                        setFontFamily(value)
                        setIsDirty(true)
                      }}
                    >
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter, system-ui">Inter (Default)</SelectItem>
                        <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                        <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                        <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
                        <SelectItem value="'Lato', sans-serif">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block mb-3">Chart Colors</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <Badge variant="outline" style={{ backgroundColor: primaryColor }}>
                          <span className="text-white drop-shadow-sm">{primaryColor}</span>
                        </Badge>
                      </div>
                      <FallbackColorPicker
                        value={primaryColor}
                        onChange={(color) => {
                          setPrimaryColor(color)
                          setIsDirty(true)
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <Badge variant="outline" style={{ backgroundColor: secondaryColor }}>
                          <span className="text-white drop-shadow-sm">{secondaryColor}</span>
                        </Badge>
                      </div>
                      <FallbackColorPicker
                        value={secondaryColor}
                        onChange={(color) => {
                          setSecondaryColor(color)
                          setIsDirty(true)
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <Badge variant="outline" style={{ backgroundColor: accentColor }}>
                          <span className="text-white drop-shadow-sm">{accentColor}</span>
                        </Badge>
                      </div>
                      <FallbackColorPicker
                        value={accentColor}
                        onChange={(color) => {
                          setAccentColor(color)
                          setIsDirty(true)
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="positive-color">Positive Color</Label>
                        <Badge variant="outline" style={{ backgroundColor: positiveColor }}>
                          <span className="text-white drop-shadow-sm">{positiveColor}</span>
                        </Badge>
                      </div>
                      <FallbackColorPicker
                        value={positiveColor}
                        onChange={(color) => {
                          setPositiveColor(color)
                          setIsDirty(true)
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="negative-color">Negative Color</Label>
                        <Badge variant="outline" style={{ backgroundColor: negativeColor }}>
                          <span className="text-white drop-shadow-sm">{negativeColor}</span>
                        </Badge>
                      </div>
                      <FallbackColorPicker
                        value={negativeColor}
                        onChange={(color) => {
                          setNegativeColor(color)
                          setIsDirty(true)
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block mb-3">Chart Features</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="animations"
                        checked={animations}
                        onCheckedChange={(checked) => {
                          setAnimations(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="animations">Enable animations</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={(checked) => {
                          setDarkMode(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="dark-mode">Support dark mode</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="tooltips"
                        checked={tooltips}
                        onCheckedChange={(checked) => {
                          setTooltips(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="tooltips">Show tooltips</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="responsive"
                        checked={responsiveLayout}
                        onCheckedChange={(checked) => {
                          setResponsiveLayout(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="responsive">Responsive layout</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="gridlines"
                        checked={enableGridLines}
                        onCheckedChange={(checked) => {
                          setEnableGridLines(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="gridlines">Show grid lines</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="legends"
                        checked={enableLegends}
                        onCheckedChange={(checked) => {
                          setEnableLegends(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="legends">Show legends</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block mb-3">Text Sizes</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="axis-label-size">Axis Label Size</Label>
                        <span>{axisLabelSize}px</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider 
                          id="axis-label-size"
                          min={8}
                          max={20}
                          step={1}
                          value={[axisLabelSize]}
                          onValueChange={(value) => {
                            setAxisLabelSize(value[0])
                            setIsDirty(true)
                          }}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="title-size">Chart Title Size</Label>
                        <span>{titleSize}px</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider 
                          id="title-size"
                          min={12}
                          max={28}
                          step={1}
                          value={[titleSize]}
                          onValueChange={(value) => {
                            setTitleSize(value[0])
                            setIsDirty(true)
                          }}
                          className="flex-grow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Dashboard Layout Settings */}
          <TabsContent value="dashboard" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout</CardTitle>
                <CardDescription>Configure how dashboards and widgets are displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dashboard-layout">Default Layout Type</Label>
                    <Select
                      value={dashboardLayout}
                      onValueChange={(value) => {
                        setDashboardLayout(value)
                        setIsDirty(true)
                      }}
                    >
                      <SelectTrigger id="dashboard-layout">
                        <SelectValue placeholder="Select layout type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid Layout</SelectItem>
                        <SelectItem value="masonry">Masonry Layout</SelectItem>
                        <SelectItem value="fixed">Fixed Layout</SelectItem>
                        <SelectItem value="auto">Auto-arrange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="widget-gap">Widget Gap (px)</Label>
                      <span>{widgetGap}px</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="widget-gap"
                        min={0}
                        max={32}
                        step={2}
                        value={[widgetGap]}
                        onValueChange={(value) => {
                          setWidgetGap(value[0])
                          setIsDirty(true)
                        }}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="default-height">Default Widget Height (px)</Label>
                      <span>{defaultWidgetHeight}px</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="default-height"
                        min={150}
                        max={600}
                        step={10}
                        value={[defaultWidgetHeight]}
                        onValueChange={(value) => {
                          setDefaultWidgetHeight(value[0])
                          setIsDirty(true)
                        }}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="block mb-3">Widget Options</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="widget-borders"
                        checked={showWidgetBorders}
                        onCheckedChange={(checked) => {
                          setShowWidgetBorders(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="widget-borders">Show widget borders</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="widget-resize"
                        checked={allowWidgetResize}
                        onCheckedChange={(checked) => {
                          setAllowWidgetResize(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="widget-resize">Allow widget resize</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="widget-drag"
                        checked={allowWidgetDrag}
                        onCheckedChange={(checked) => {
                          setAllowWidgetDrag(checked)
                          setIsDirty(true)
                        }}
                      />
                      <Label htmlFor="widget-drag">Allow widget drag</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Preview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Chart Preview</CardTitle>
          <CardDescription>Sample preview of chart settings</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Chart preview will be displayed here</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleResetToDefaults}>
          <X className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveSettings} disabled={!isDirty}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}