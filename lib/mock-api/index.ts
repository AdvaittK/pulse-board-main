// Mock API for frontend showcase
import { mockUsers, mockSubscriptions, mockEvents, mockAnalytics, mockMessages } from '../mock-data';

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic mock API response type
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Simulate a GET request
async function mockGet<T>(data: T, errorChance = 0): Promise<ApiResponse<T>> {
  await delay(300 + Math.random() * 300); // Random delay between 300-600ms
  
  // Simulate occasional errors (for realism)
  if (Math.random() < errorChance) {
    throw new Error('Simulated API error');
  }
  
  return {
    data,
    success: true,
  };
}

// Mock API endpoints
export const mockApi = {
  // User related endpoints
  users: {
    getAll: () => mockGet(mockUsers),
    getById: (id: string) => mockGet(mockUsers.find(user => user.id === id)),
    getCurrent: () => mockGet(mockUsers[0]),
  },
  
  // Subscription related endpoints
  subscriptions: {
    getAll: () => mockGet(mockSubscriptions),
    getById: (id: string) => mockGet(mockSubscriptions.find(sub => sub.id === id)),
    getUserSubscription: () => mockGet(mockSubscriptions[1]), // Default to Pro plan for showcase
  },
  
  // Event related endpoints
  events: {
    getAll: () => mockGet(mockEvents),
    getById: (id: string) => mockGet(mockEvents.find(event => event.id === id)),
  },
  
  // Analytics related endpoints
  analytics: {
    getDashboard: () => mockGet(mockAnalytics),
    getVisitors: () => mockGet(mockAnalytics.visitors),
    getRevenue: () => mockGet(mockAnalytics.revenue),
  },
  
  // Messages related endpoints
  messages: {
    getAll: () => mockGet(mockMessages),
    getById: (id: string) => mockGet(mockMessages.find(msg => msg.id === id)),
  }
};

export default mockApi;