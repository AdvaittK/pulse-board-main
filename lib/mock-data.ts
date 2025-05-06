// Mock data for frontend showcase
// This file replaces backend API calls with static data

export const mockUsers = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
    role: "admin",
    createdAt: "2024-10-12T10:00:00Z"
  },
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder-user.jpg",
    role: "user",
    createdAt: "2024-11-05T14:30:00Z"
  }
];

export const mockSubscriptions = [
  {
    id: "sub_1",
    name: "Basic Plan",
    price: 9.99,
    interval: "month",
    features: ["Dashboard access", "Limited reports", "Email support"],
    isPopular: false
  },
  {
    id: "sub_2",
    name: "Pro Plan",
    price: 19.99,
    interval: "month",
    features: ["Full dashboard", "Unlimited reports", "Priority support", "API access"],
    isPopular: true
  },
  {
    id: "sub_3",
    name: "Enterprise",
    price: 49.99,
    interval: "month",
    features: ["Everything in Pro", "Dedicated support", "Custom integrations", "SSO"],
    isPopular: false
  }
];

export const mockEvents = [
  {
    id: "evt_1",
    title: "Product Launch",
    description: "New product release announcement",
    date: "2025-06-15T09:00:00Z",
    attendees: 120
  },
  {
    id: "evt_2",
    title: "Team Meeting",
    description: "Weekly sprint planning",
    date: "2025-05-10T14:00:00Z",
    attendees: 8
  }
];

export const mockAnalytics = {
  visitors: [
    { date: "Jan", count: 1200 },
    { date: "Feb", count: 1900 },
    { date: "Mar", count: 2100 },
    { date: "Apr", count: 2400 },
    { date: "May", count: 2800 },
  ],
  revenue: [
    { date: "Jan", amount: 12000 },
    { date: "Feb", amount: 19000 },
    { date: "Mar", amount: 21000 },
    { date: "Apr", amount: 24000 },
    { date: "May", amount: 28000 },
  ],
  conversions: [
    { date: "Jan", count: 120 },
    { date: "Feb", count: 190 },
    { date: "Mar", count: 210 },
    { date: "Apr", count: 240 },
    { date: "May", count: 280 },
  ]
};

export const mockMessages = [
  {
    id: "msg_1",
    sender: "John Doe",
    content: "Hi there! Just checking in on the project status.",
    timestamp: "2025-05-05T10:30:00Z",
    read: true
  },
  {
    id: "msg_2",
    sender: "Support Team",
    content: "Your ticket has been resolved. Please let us know if you have any further questions.",
    timestamp: "2025-05-04T16:45:00Z",
    read: false
  }
];

// Mock user session for auth
export const mockSession = {
  user: {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
    role: "admin"
  },
  expires: "2025-06-06T00:00:00.000Z"
};

// Mock feature flags
export const mockFeatures = {
  canAccessAdmin: true,
  canExportData: true,
  canInviteUsers: true,
  canCustomizeDashboard: true
};