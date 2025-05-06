"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Send, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Image, 
  Mic, 
  Check, 
  CheckCheck,
  Filter,
  Star,
  Clock,
  Trash2,
  Archive,
  PinIcon,
  FileIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Sample messages data
const chatContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder-user.jpg",
    status: "online",
    lastMessage: "Let's review the dashboard design tomorrow",
    timestamp: "10:32 AM",
    unreadCount: 2,
    isTyping: false,
    pinned: true
  },
  {
    id: "2",
    name: "Alex Thompson",
    avatar: null,
    status: "online",
    lastMessage: "The client presentation went well!",
    timestamp: "9:15 AM",
    unreadCount: 0,
    isTyping: true,
    pinned: true
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: null,
    status: "offline",
    lastMessage: "I've fixed the bug in the analytics component",
    timestamp: "Yesterday",
    unreadCount: 0,
    isTyping: false,
    pinned: false
  },
  {
    id: "4",
    name: "Emma Davis",
    avatar: "/placeholder-user.jpg",
    status: "offline",
    lastMessage: "Can you send me the latest mockups?",
    timestamp: "Yesterday",
    unreadCount: 0,
    isTyping: false,
    pinned: false
  },
  {
    id: "5",
    name: "Product Team",
    avatar: null,
    status: "online",
    lastMessage: "David: Let's finalize the roadmap for Q3",
    timestamp: "Monday",
    unreadCount: 3,
    isTyping: false,
    pinned: false,
    isGroup: true,
    members: ["Sarah Johnson", "Alex Thompson", "Michael Chen", "David Wilson", "You"]
  },
  {
    id: "6",
    name: "UX Research Group",
    avatar: null,
    status: "offline",
    lastMessage: "Emma: I've shared the user testing results",
    timestamp: "May 1",
    unreadCount: 0,
    isTyping: false,
    pinned: false,
    isGroup: true,
    members: ["Emma Davis", "Brian Miller", "You", "Jessica Lee"]
  },
  {
    id: "7",
    name: "Jessica Lee",
    avatar: null,
    status: "offline",
    lastMessage: "Thanks for your help with the onboarding flow",
    timestamp: "Apr 29",
    unreadCount: 0,
    isTyping: false,
    pinned: false
  },
  {
    id: "8",
    name: "Robert Garcia",
    avatar: null,
    status: "busy",
    lastMessage: "Let's schedule the budget review meeting",
    timestamp: "Apr 28",
    unreadCount: 0,
    isTyping: false,
    pinned: false
  },
];

// Sample messages for the active conversation
const messages = [
  {
    id: "m1",
    senderId: "1", // Sarah Johnson
    text: "Hi! How's the dashboard project coming along?",
    timestamp: "10:15 AM",
    status: "read"
  },
  {
    id: "m2",
    senderId: "self",
    text: "It's going well! I've finished the analytics module and I'm working on the reports section now.",
    timestamp: "10:17 AM",
    status: "read"
  },
  {
    id: "m3",
    senderId: "1",
    text: "That sounds great! Do you think we can present a demo to the client by the end of the week?",
    timestamp: "10:20 AM",
    status: "read"
  },
  {
    id: "m4",
    senderId: "self",
    text: "I think so. I just need to fix a few visualization issues and add the export functionality.",
    timestamp: "10:25 AM",
    status: "read"
  },
  {
    id: "m5",
    senderId: "1",
    text: "Perfect! Let's review the dashboard design tomorrow to make sure everything is in order before the client presentation.",
    timestamp: "10:32 AM",
    status: "delivered"
  },
  {
    id: "m6",
    senderId: "1",
    text: "Also, can you make sure the real-time data updates are working correctly? The client specifically mentioned that feature.",
    timestamp: "10:32 AM",
    status: "delivered"
  }
];

// Animation variants
const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const chatVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function MessagesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeContact, setActiveContact] = useState(chatContacts[0])
  const [currentMessage, setCurrentMessage] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showSidebar, setShowSidebar] = useState(true)
  const [conversationMessages, setConversationMessages] = useState(messages)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversationMessages])

  // Filter contacts based on search query and active tab
  const filteredContacts = chatContacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && contact.unreadCount > 0
    if (activeTab === "pinned") return matchesSearch && contact.pinned

    return matchesSearch
  })

  // Handle sending a message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return
    
    const newMessage = {
      id: `m${conversationMessages.length + 1}`,
      senderId: "self",
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending"
    }
    
    setConversationMessages([...conversationMessages, newMessage])
    setCurrentMessage("")
    
    // Simulate message being sent and delivered
    setTimeout(() => {
      setConversationMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      )
    }, 1000)
  }

  return (
    <div className="container max-w-7xl h-[calc(100vh-10rem)] py-6">
      <div className="flex flex-col h-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-muted-foreground mt-1">
              Chat with team members and clients
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></svg>
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md">
          {/* Sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div 
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col"
              >
                {/* Search and filters */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search messages..."
                      className="pl-10 h-10 bg-slate-50 dark:bg-slate-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="mt-2">
                    <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
                      <TabsList className="grid grid-cols-3 h-9">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread" className="flex items-center gap-1">
                          Unread
                          {chatContacts.reduce((count, contact) => count + contact.unreadCount, 0) > 0 && (
                            <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                              {chatContacts.reduce((count, contact) => count + contact.unreadCount, 0)}
                            </Badge>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="pinned">Pinned</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                {/* Contact list */}
                <ScrollArea className="flex-1">
                  {!isLoaded ? (
                    <div className="space-y-1 p-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <div className="h-full flex flex-col items-end gap-2">
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <Search className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No messages found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filters
                      </p>
                    </div>
                  ) : (
                    <div>
                      {/* Pinned contacts if in "all" or "pinned" tabs */}
                      {["all", "pinned"].includes(activeTab) && (
                        <>
                          <div className="p-2">
                            {filteredContacts
                              .filter(contact => contact.pinned)
                              .map((contact) => (
                                <div
                                  key={contact.id}
                                  onClick={() => setActiveContact(contact)}
                                  className={cn(
                                    "flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors",
                                    contact.id === activeContact?.id && "bg-slate-100 dark:bg-slate-800"
                                  )}
                                >
                                  <div className="relative">
                                    <Avatar>
                                      <AvatarImage src={contact.avatar || undefined} alt={contact.name} />
                                      <AvatarFallback>
                                        {contact.isGroup ? contact.name.substring(0, 2) : contact.name.split(" ").map(n => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className={cn(
                                      "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-950",
                                      contact.status === "online" && "bg-green-500",
                                      contact.status === "offline" && "bg-slate-400",
                                      contact.status === "busy" && "bg-rose-500"
                                    )}></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium truncate pr-2">{contact.name}</div>
                                      <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground truncate">
                                      {contact.isTyping ? (
                                        <span className="text-blue-600 dark:text-blue-400 font-medium">typing...</span>
                                      ) : (
                                        contact.lastMessage
                                      )}
                                    </div>
                                  </div>
                                  <div className="self-start flex flex-col items-center">
                                    {contact.unreadCount > 0 && (
                                      <Badge className="bg-blue-600">{contact.unreadCount}</Badge>
                                    )}
                                    <PinIcon className="h-3 w-3 text-blue-500 dark:text-blue-400 mt-1" />
                                  </div>
                                </div>
                              ))}
                          </div>
                          {filteredContacts.some(contact => contact.pinned) && filteredContacts.some(contact => !contact.pinned) && (
                            <div className="px-4 py-1">
                              <Separator />
                            </div>
                          )}
                        </>
                      )}

                      {/* Regular (unpinned) contacts */}
                      <div className="p-2">
                        {filteredContacts
                          .filter(contact => activeTab === "pinned" ? contact.pinned : !contact.pinned)
                          .map((contact) => (
                            <div
                              key={contact.id}
                              onClick={() => setActiveContact(contact)}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors",
                                contact.id === activeContact?.id && "bg-slate-100 dark:bg-slate-800"
                              )}
                            >
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={contact.avatar || undefined} alt={contact.name} />
                                  <AvatarFallback className={cn(contact.isGroup && "bg-gradient-to-br from-blue-500 to-purple-600 text-white")}>
                                    {contact.isGroup ? contact.name.substring(0, 2) : contact.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={cn(
                                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-950",
                                  contact.status === "online" && "bg-green-500",
                                  contact.status === "offline" && "bg-slate-400",
                                  contact.status === "busy" && "bg-rose-500"
                                )}></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium truncate pr-2">{contact.name}</div>
                                  <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                                </div>
                                <div className="text-sm text-muted-foreground truncate">
                                  {contact.isTyping ? (
                                    <span className="text-blue-600 dark:text-blue-400 font-medium">typing...</span>
                                  ) : (
                                    contact.lastMessage
                                  )}
                                </div>
                              </div>
                              {contact.unreadCount > 0 && (
                                <Badge className="bg-blue-600">{contact.unreadCount}</Badge>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat window */}
          {activeContact && (
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {!showSidebar && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="md:hidden mr-1"
                        onClick={() => setShowSidebar(true)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></svg>
                      </Button>
                    )}
                    <Avatar>
                      <AvatarImage src={activeContact.avatar || undefined} alt={activeContact.name} />
                      <AvatarFallback className={cn(activeContact.isGroup && "bg-gradient-to-br from-blue-500 to-purple-600 text-white")}>
                        {activeContact.isGroup ? activeContact.name.substring(0, 2) : activeContact.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {activeContact.name}
                        {activeContact.isGroup && (
                          <Badge variant="outline" className="text-xs font-normal">
                            {activeContact.members?.length} members
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          activeContact.status === "online" && "bg-green-500",
                          activeContact.status === "offline" && "bg-slate-400",
                          activeContact.status === "busy" && "bg-rose-500"
                        )}></div>
                        <span>
                          {activeContact.status === "online" 
                            ? "Online" 
                            : activeContact.status === "busy"
                            ? "Busy"
                            : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400">
                            <Phone className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Call</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400">
                            <Video className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Video Call</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Search className="h-4 w-4" /> Search in conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Star className="h-4 w-4" /> Add to favorites
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <PinIcon className="h-4 w-4" /> Pin conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Archive className="h-4 w-4" /> Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-rose-500 dark:text-rose-400">
                          <Trash2 className="h-4 w-4" /> Delete conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              
              {/* Messages content */}
              {!isLoaded ? (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[80%] ${i % 2 === 0 ? "items-start" : "items-end"} space-y-2`}>
                        <div className="flex items-start gap-3">
                          {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                          <div>
                            <Skeleton className={`h-12 ${i % 2 === 0 ? "w-48" : "w-40"} rounded-xl`} />
                          </div>
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ScrollArea className="flex-1 p-4">
                  <motion.div
                    variants={chatVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <div className="flex justify-center">
                      <Card className="inline-flex items-center px-3 py-1">
                        <span className="text-xs text-muted-foreground">Today</span>
                      </Card>
                    </div>
                    
                    {conversationMessages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        variants={messageVariants}
                        className={`flex ${msg.senderId === "self" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] flex flex-col ${msg.senderId === "self" ? "items-end" : "items-start"}`}>
                          <div className="flex items-start gap-2">
                            {msg.senderId !== "self" && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={activeContact.avatar || undefined} alt={activeContact.name} />
                                <AvatarFallback>
                                  {activeContact.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div 
                              className={cn(
                                "p-3 rounded-2xl text-sm",
                                msg.senderId === "self" 
                                  ? "bg-blue-600 text-white rounded-br-none" 
                                  : "bg-slate-100 dark:bg-slate-800 rounded-bl-none"
                              )}
                            >
                              {msg.text}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                            {msg.senderId === "self" && (
                              msg.status === "read" ? (
                                <CheckCheck className="h-3 w-3 text-blue-500" />
                              ) : msg.status === "delivered" ? (
                                <CheckCheck className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <Check className="h-3 w-3 text-muted-foreground" />
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </motion.div>
                </ScrollArea>
              )}
              
              {/* Message input */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      className="pr-12 py-6 bg-slate-50 dark:bg-slate-900"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Attach file</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                              <Image className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Send image</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                              <Smile className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Emoji</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    className={cn(
                      "rounded-full h-12 w-12 p-0 shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                      !currentMessage.trim() && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!currentMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}