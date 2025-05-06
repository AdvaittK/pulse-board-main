// Simplified auth.ts for frontend showcase
import { mockSession } from './mock-data';

// User role type
export type UserRole = 'user' | 'admin';

// Session interface
export interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  };
  expires: string;
}

// Mock authentication functions for frontend showcase
export const getSession = async (): Promise<Session | null> => {
  // For frontend showcase, just return the mock session
  return mockSession as Session;
};

// Function to get token from localStorage
export const getToken = (): string | null => {
  // For frontend showcase, just return a fake token
  return 'mock-token-for-showcase';
};

// Function to set token in localStorage (no-op for showcase)
export const setToken = (): void => {
  // No-op for showcase
};

// Function to remove token from localStorage (no-op for showcase)
export const removeToken = (): void => {
  // No-op for showcase
};

// Function to check if a user is authenticated
export const isAuthenticated = (): boolean => {
  return true; // Always authenticated for showcase
};

// Function to logout the user (redirects to login page for showcase)
export const logout = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
    // For showcase, just redirect to login page
    window.location.href = '/login';
  }
};

// Simplified authenticated fetch for the frontend showcase
export const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  // This is just a mock implementation that returns fake data based on URL
  // In a real app, this would make actual fetch requests with auth headers
  
  // Wait for a simulated network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return a mock response
  return new Response(
    JSON.stringify({ success: true, message: "This is mock data for the frontend showcase" }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};