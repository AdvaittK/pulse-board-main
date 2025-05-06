// Mock subscription helpers for frontend showcase
import { mockSubscriptions } from '../mock-data';

// Simple mock exports for the frontend showcase
export const getSubscriptionPlans = async () => {
  return mockSubscriptions;
};

export const getUserSubscription = async () => {
  return {
    id: 'mock-subscription-id',
    userId: 'user_1',
    planId: 'sub_2',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false,
  };
};

export default {
  getSubscriptionPlans,
  getUserSubscription
};