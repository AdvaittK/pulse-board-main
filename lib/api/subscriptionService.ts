// Mock Subscription Service for frontend showcase
import { mockSubscriptions } from '../mock-data';

/**
 * This is a mock implementation of the subscription service for frontend showcase.
 * In a real application, this would interact with a backend API for subscription management.
 */

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock function to get a user's subscription
export const getUserSubscription = async (userId: string): Promise<Subscription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return a mock subscription
  return {
    id: `sub_${Date.now().toString().substring(7)}`,
    userId,
    planId: 'sub_2', // Pro plan from mock data
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Mock function to cancel subscription
export const cancelSubscription = async (subscriptionId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Always return success for frontend showcase
  return true;
};

// Mock function to reactivate a canceled subscription
export const reactivateSubscription = async (subscriptionId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Always return success for frontend showcase
  return true;
};

// Mock function to get subscription plan details
export const getSubscriptionPlans = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockSubscriptions;
};

export default {
  getUserSubscription,
  cancelSubscription,
  reactivateSubscription,
  getSubscriptionPlans
};