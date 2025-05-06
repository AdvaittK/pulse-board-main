"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { addDays, format, startOfWeek, endOfWeek, eachDayOfInterval, 
  isSameMonth, isSameDay, addMonths, subMonths, getDaysInMonth, getDay } from "date-fns"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Clock,
  Plus,
  Search,
  User,
  Users,
  MapPin,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Tag,
  Eye,
  Video,
  MessageSquare,
  ArrowRight,
  Filter,
  Trash2,
  Edit
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Sample event data
const events = [
  {
    id: "1",
    title: "Team Standup Meeting",
    date: new Date(2025, 4, 2, 9, 0),
    endDate: new Date(2025, 4, 2, 10, 0),
    location: "Conference Room 3",
    description: "Daily standup meeting to discuss project progress and blockers",
    category: "meeting",
    attendees: [
      {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user2",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatar: null
      },
      {
        id: "user3",
        name: "David Wilson",
        email: "david@example.com",
        avatar: null
      }
    ],
    isRecurring: true,
    recurringPattern: "daily"
  },
  {
    id: "2",
    title: "Product Roadmap Review",
    date: new Date(2025, 4, 2, 11, 0),
    endDate: new Date(2025, 4, 2, 12, 30),
    location: "Virtual - Zoom",
    description: "Review Q2 product roadmap with stakeholders",
    category: "planning",
    attendees: [
      {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user4",
        name: "Emma Davis",
        email: "emma@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user5",
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: null
      }
    ],
    isRecurring: false
  },
  {
    id: "3",
    title: "Design Review",
    date: new Date(2025, 4, 2, 14, 0),
    endDate: new Date(2025, 4, 2, 15, 0),
    location: "Design Lab",
    description: "Review new dashboard designs with the UX team",
    category: "design",
    attendees: [
      {
        id: "user2",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatar: null
      },
      {
        id: "user4",
        name: "Emma Davis",
        email: "emma@example.com",
        avatar: "/placeholder-user.jpg"
      }
    ],
    isRecurring: false
  },
  {
    id: "4",
    title: "Client Presentation",
    date: new Date(2025, 4, 3, 10, 0),
    endDate: new Date(2025, 4, 3, 11, 30),
    location: "Main Conference Room",
    description: "Present new features to client stakeholders",
    category: "client",
    attendees: [
      {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user3",
        name: "David Wilson",
        email: "david@example.com",
        avatar: null
      },
      {
        id: "user5",
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: null
      }
    ],
    isRecurring: false
  },
  {
    id: "5",
    title: "Team Building Event",
    date: new Date(2025, 4, 5, 15, 0),
    endDate: new Date(2025, 4, 5, 18, 0),
    location: "Downtown Escape Room",
    description: "Team building activity at the escape room followed by dinner",
    category: "social",
    attendees: [
      {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user2",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatar: null
      },
      {
        id: "user3",
        name: "David Wilson",
        email: "david@example.com",
        avatar: null
      },
      {
        id: "user4",
        name: "Emma Davis",
        email: "emma@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user5",
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: null
      }
    ],
    isRecurring: false
  },
  {
    id: "6",
    title: "Sprint Planning",
    date: new Date(2025, 4, 6, 9, 0),
    endDate: new Date(2025, 4, 6, 11, 0),
    location: "Conference Room 2",
    description: "Plan the upcoming sprint and assign tasks",
    category: "planning",
    attendees: [
      {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: "user2",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatar: null
      },
      {
        id: "user3",
        name: "David Wilson",
        email: "david@example.com",
        avatar: null
      },
      {
        id: "user5",
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: null
      }
    ],
    isRecurring: true,
    recurringPattern: "biweekly"
  },
  {
    id: "7",
    title: "1:1 with Manager",
    date: new Date(2025, 4, 7, 13, 0),
    endDate: new Date(2025, 4, 7, 13, 30),
    location: "Manager's Office",
    description: "Weekly one-on-one meeting with manager",
    category: "meeting",
    attendees: [
      {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder-user.jpg"
      }
    ],
    isRecurring: true,
    recurringPattern: "weekly"
  }
]

// Category colors & icons
const categoryConfig = {
  meeting: {
    color: "bg-blue-500",
    icon: <MessageSquare className="h-4 w-4" />,
    label: "Meeting"
  },
  planning: {
    color: "bg-purple-500",
    icon: <CalendarIcon className="h-4 w-4" />,
    label: "Planning"
  },
  design: {
    color: "bg-amber-500",
    icon: <Eye className="h-4 w-4" />,
    label: "Design"
  },
  client: {
    color: "bg-green-500",
    icon: <User className="h-4 w-4" />,
    label: "Client"
  },
  social: {
    color: "bg-rose-500",
    icon: <Users className="h-4 w-4" />,
    label: "Social"
  },
  default: {
    color: "bg-slate-500",
    icon: <CalendarIcon className="h-4 w-4" />,
    label: "Other"
  }
}

export default function CalendarPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("week")
  const [viewMode, setViewMode] = useState("calendar")
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Get days for the week view
  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate),
    end: endOfWeek(selectedDate)
  })

  // Get the events for the selected day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day))
  }

  // Get all events for the week
  const weekEvents = weekDays.flatMap(day => getEventsForDay(day))

  // Get hours for day view (8AM to 7PM)
  const dayHours = Array.from({ length: 12 }, (_, i) => i + 8)

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1))
  }

  // Handle today button
  const handleToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Handle event selection
  const handleSelectEvent = (event: typeof events[0]) => {
    setSelectedEvent(event)
    setShowEventDialog(true)
  }

  // Handle creating new event
  const handleCreateEvent = () => {
    setIsCreatingEvent(true)
    setShowEventDialog(true)
    setSelectedEvent(null)
  }

  // Handle saving event
  const handleSaveEvent = () => {
    setShowEventDialog(false)
    toast({
      title: isCreatingEvent ? "Event created" : "Event updated",
      description: isCreatingEvent ? "Your event has been created" : "Your event has been updated",
    })
    setIsCreatingEvent(false)
  }

  return (
    <div className="container max-w-7xl py-6">
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your schedule and events
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleToday}
            >
              Today
            </Button>
            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-l-md rounded-r-none border-r border-slate-200 dark:border-slate-800"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="px-3 py-2 text-sm font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-r-md rounded-l-none border-l border-slate-200 dark:border-slate-800"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="View Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>View Mode</SelectLabel>
                  <SelectItem value="calendar">Calendar</SelectItem>
                  <SelectItem value="agenda">Agenda</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={handleCreateEvent}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={cn("space-y-6", viewMode === "agenda" && "hidden")}
        >
          <Tabs defaultValue="week" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex items-center justify-between mb-2">
              <TabsList className="bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl">
                <TabsTrigger value="month" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
                  Month
                </TabsTrigger>
                <TabsTrigger value="week" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
                  Week
                </TabsTrigger>
                <TabsTrigger value="day" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
                  Day
                </TabsTrigger>
              </TabsList>

              <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter Events</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.entries(categoryConfig).map(([key, value]) => (
                      <DropdownMenuItem key={key} className="flex items-center gap-2">
                        <div className={cn("h-3 w-3 rounded-full", value.color)} />
                        {value.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Team Members
                </Button>
              </div>
            </div>

            {!isLoaded ? (
              // Loading skeleton
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="px-1">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="border rounded-md p-2 h-28">
                      <Skeleton className="h-5 w-10 mb-2" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <TabsContent value="month" className="space-y-4">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-7 border-b dark:border-slate-800">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div 
                            key={day}
                            className="px-2 py-3 text-center text-sm font-medium text-muted-foreground bg-slate-50 dark:bg-slate-900"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 auto-rows-fr">
                        {Array.from({ length: 35 }).map((_, index) => {
                          const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
                          const dayOffset = getDay(firstDayOfMonth)
                          const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), index - dayOffset + 1)
                          const dateEvents = getEventsForDay(day)
                          
                          return (
                            <div 
                              key={index}
                              className={cn(
                                "min-h-28 p-2 border-r border-b dark:border-slate-800 transition-colors last:border-r-0",
                                !isSameMonth(day, currentDate) 
                                  ? "bg-slate-50/50 dark:bg-slate-900/50 text-slate-400" 
                                  : "hover:bg-slate-50 dark:hover:bg-slate-900/60",
                                isSameDay(day, new Date()) && "bg-blue-50 dark:bg-blue-900/10",
                              )}
                              onClick={() => {
                                setSelectedDate(day)
                                setActiveTab("day")
                              }}
                            >
                              <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={cn(
                                    "text-sm font-medium inline-flex items-center justify-center rounded-full",
                                    isSameDay(day, new Date()) && "h-6 w-6 bg-blue-600 text-white"
                                  )}>
                                    {format(day, 'd')}
                                  </span>
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                  {dateEvents.length > 0 ? (
                                    dateEvents.slice(0, 3).map((event) => (
                                      <div 
                                        key={event.id}
                                        className={cn(
                                          "text-xs px-2 py-1 rounded-md truncate cursor-pointer",
                                          categoryConfig[event.category as keyof typeof categoryConfig]?.color || categoryConfig.default.color,
                                          "text-white"
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleSelectEvent(event)
                                        }}
                                      >
                                        {format(event.date, 'HH:mm')} {event.title}
                                      </div>
                                    ))
                                  ) : null}
                                  
                                  {dateEvents.length > 3 && (
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                                      +{dateEvents.length - 3}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="week" className="space-y-4">
                  <Card className="border-0 shadow-md overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-8 border-b dark:border-slate-800">
                        <div className="border-r dark:border-slate-800 p-3">
                          <span className="text-sm font-medium text-muted-foreground">Time</span>
                        </div>
                        {weekDays.map((day) => (
                          <div 
                            key={day.toString()}
                            className={cn(
                              "p-3 text-center border-r last:border-r-0 dark:border-slate-800",
                              isSameDay(day, new Date()) && "bg-blue-50 dark:bg-blue-900/10",
                            )}
                          >
                            <div className="text-sm font-medium">
                              {format(day, 'EEE')}
                            </div>
                            <div className={cn(
                              "text-2xl font-semibold mt-1 inline-flex items-center justify-center",
                              isSameDay(day, new Date()) && "h-8 w-8 bg-blue-600 text-white rounded-full"
                            )}>
                              {format(day, 'd')}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="h-[600px] overflow-y-auto">
                        {dayHours.map((hour) => (
                          <div key={hour} className="grid grid-cols-8">
                            <div className="border-r dark:border-slate-800 p-2 text-xs text-center text-muted-foreground">
                              {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                            </div>
                            
                            {weekDays.map((day, dayIndex) => {
                              const hourEvents = events.filter(event => 
                                isSameDay(event.date, day) && 
                                event.date.getHours() === hour
                              )
                              
                              return (
                                <div 
                                  key={`${day}-${hour}`}
                                  className="border-r dark:border-slate-800 border-b dark:border-slate-800 p-1 relative last:border-r-0 min-h-[60px]"
                                >
                                  {hourEvents.map((event) => (
                                    <div
                                      key={event.id}
                                      className={cn(
                                        "absolute inset-x-1 rounded-md p-1 text-xs text-white",
                                        categoryConfig[event.category as keyof typeof categoryConfig]?.color || categoryConfig.default.color,
                                        "cursor-pointer hover:opacity-90"
                                      )}
                                      style={{ 
                                        top: `${event.date.getMinutes() / 60 * 100}%`,
                                        height: `${(event.endDate.getHours() - event.date.getHours()) * 60 + 
                                          (event.endDate.getMinutes() - event.date.getMinutes())}px`
                                      }}
                                      onClick={() => handleSelectEvent(event)}
                                    >
                                      <div className="font-medium truncate">{event.title}</div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(event.date, 'HH:mm')} - {format(event.endDate, 'HH:mm')}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="day" className="space-y-4">
                  <Card className="border-0 shadow-md overflow-hidden">
                    <CardHeader className="p-4 border-b dark:border-slate-800 flex flex-row items-center justify-between bg-slate-50 dark:bg-slate-900">
                      <div>
                        <CardTitle className="text-xl">
                          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {getEventsForDay(selectedDate).length} events scheduled
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setSelectedDate(prev => addDays(prev, -1))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setSelectedDate(prev => addDays(prev, 1))}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-16 border-r dark:border-slate-800 shrink-0">
                          {dayHours.map((hour) => (
                            <div key={hour} className="h-20 border-b dark:border-slate-800 p-1 text-xs text-center text-muted-foreground">
                              {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex-1 relative">
                          {dayHours.map((hour) => (
                            <div key={hour} className="h-20 border-b dark:border-slate-800"></div>
                          ))}
                          
                          {getEventsForDay(selectedDate).map((event) => (
                            <div
                              key={event.id}
                              className={cn(
                                "absolute left-2 right-2 rounded-md p-2 text-white",
                                categoryConfig[event.category as keyof typeof categoryConfig]?.color || categoryConfig.default.color,
                                "cursor-pointer hover:opacity-90 shadow-md"
                              )}
                              style={{ 
                                top: `${(event.date.getHours() - 8) * 80 + (event.date.getMinutes() / 60 * 80)}px`,
                                height: `${(event.endDate.getHours() - event.date.getHours()) * 80 + 
                                  ((event.endDate.getMinutes() - event.date.getMinutes()) / 60 * 80)}px`
                              }}
                              onClick={() => handleSelectEvent(event)}
                            >
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm mt-1 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(event.date, 'HH:mm')} - {format(event.endDate, 'HH:mm')}
                              </div>
                              {event.location && (
                                <div className="text-xs mt-1 flex items-center gap-1 opacity-90">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={cn("space-y-6", viewMode === "calendar" && "hidden")}
        >
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="p-4 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Agenda View</CardTitle>
                  <CardDescription>
                    Your upcoming events
                  </CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="pl-10 h-9 w-[200px] sm:w-[300px] bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y dark:divide-slate-800">
                {[...events]
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div 
                      key={event.id}
                      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer"
                      onClick={() => handleSelectEvent(event)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="min-w-28 text-sm">
                          <p className="font-medium">{format(event.date, 'EEE, MMM d')}</p>
                          <p className="text-muted-foreground mt-1">
                            {format(event.date, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{event.title}</h3>
                              {event.location && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {event.location}
                                </p>
                              )}
                            </div>
                            <Badge 
                              variant="outline"
                              className={cn(
                                "border-0 flex items-center gap-1",
                                categoryConfig[event.category as keyof typeof categoryConfig]?.color || categoryConfig.default.color,
                                "text-white"
                              )}
                            >
                              {categoryConfig[event.category as keyof typeof categoryConfig]?.icon || categoryConfig.default.icon}
                              {categoryConfig[event.category as keyof typeof categoryConfig]?.label || categoryConfig.default.label}
                            </Badge>
                          </div>
                          
                          {event.description && (
                            <p className="text-sm mt-2">{event.description}</p>
                          )}
                          
                          {event.attendees.length > 0 && (
                            <div className="mt-3">
                              <div className="text-xs text-muted-foreground mb-1">Attendees ({event.attendees.length})</div>
                              <div className="flex -space-x-2">
                                {event.attendees.slice(0, 5).map((attendee) => (
                                  <Avatar key={attendee.id} className="h-6 w-6 border-2 border-white dark:border-slate-900">
                                    <AvatarImage src={attendee.avatar || undefined} alt={attendee.name} />
                                    <AvatarFallback>
                                      {attendee.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {event.attendees.length > 5 && (
                                  <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs border-2 border-white dark:border-slate-900">
                                    +{event.attendees.length - 5}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {event.isRecurring && (
                            <div className="mt-2 text-xs flex items-center gap-1 text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l3 3"></path></svg>
                              Recurring {event.recurringPattern}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Event dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isCreatingEvent ? "Create New Event" : "Event Details"}</DialogTitle>
            <DialogDescription>
              {isCreatingEvent 
                ? "Add a new event to your calendar" 
                : `View or edit event details for ${selectedEvent?.title}`}
            </DialogDescription>
          </DialogHeader>
          
          {!isCreatingEvent && selectedEvent ? (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                <Badge 
                  variant="outline"
                  className={cn(
                    "border-0 flex items-center gap-1 w-fit",
                    categoryConfig[selectedEvent.category as keyof typeof categoryConfig]?.color || categoryConfig.default.color,
                    "text-white"
                  )}
                >
                  {categoryConfig[selectedEvent.category as keyof typeof categoryConfig]?.icon || categoryConfig.default.icon}
                  {categoryConfig[selectedEvent.category as keyof typeof categoryConfig]?.label || categoryConfig.default.label}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Start Time</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {format(selectedEvent.date, 'EEEE, MMMM d, yyyy h:mm a')}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium">End Time</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {format(selectedEvent.endDate, 'EEEE, MMMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
              
              {selectedEvent.location && (
                <div className="space-y-1">
                  <div className="text-sm font-medium">Location</div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {selectedEvent.location}
                  </div>
                </div>
              )}
              
              {selectedEvent.description && (
                <div className="space-y-1">
                  <div className="text-sm font-medium">Description</div>
                  <p className="text-sm">{selectedEvent.description}</p>
                </div>
              )}
              
              {selectedEvent.attendees.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Attendees ({selectedEvent.attendees.length})</div>
                  <div className="border rounded-md dark:border-slate-800 divide-y dark:divide-slate-800">
                    {selectedEvent.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center gap-3 p-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={attendee.avatar || undefined} alt={attendee.name} />
                          <AvatarFallback>
                            {attendee.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{attendee.name}</div>
                          <div className="text-xs text-muted-foreground">{attendee.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEvent.isRecurring && (
                <div className="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l3 3"></path></svg>
                  <span>This is a recurring event ({selectedEvent.recurringPattern})</span>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="title" placeholder="Event title" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start-date" className="text-sm font-medium">
                    Start Date & Time
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(new Date(), "PPP p")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="end-date" className="text-sm font-medium">
                    End Date & Time
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(new Date(), "PPP p")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input id="location" placeholder="Event location" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea id="description" placeholder="Add a description" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select defaultValue="meeting">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Cancel
            </Button>
            {isCreatingEvent ? (
              <Button onClick={handleSaveEvent}>
                Create Event
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={handleSaveEvent}>
                  Save Changes
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}