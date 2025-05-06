// Mock Plan Change service for frontend showcase
import { mockSubscriptions } from '../mock-data';

/**
 * This is a mock implementation of the plan change service for frontend showcase.
 * In a real application, this would handle upgrading/downgrading subscription plans,
 * proration calculations, and other subscription change operations.
 */

export interface PlanChangeOptions {
  userId: string;
  currentPlanId: string;
  newPlanId: string;
  immediate?: boolean;
}

export interface PlanChangePreview {
  currentPlan: any;
  newPlan: any;
  proratedAmount: number;
  nextBillingDate: string;
  changeDate: string;
}

// Mock function to get a preview of a plan change
export const getPlanChangePreview = async (options: PlanChangeOptions): Promise<PlanChangePreview> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const currentPlan = mockSubscriptions.find(sub => sub.id === options.currentPlanId) || mockSubscriptions[0];
  const newPlan = mockSubscriptions.find(sub => sub.id === options.newPlanId) || mockSubscriptions[1];
  
  // Calculate a mock prorated amount based on the price difference
  const proratedAmount = Math.max(0, (newPlan.price - currentPlan.price) * 0.7).toFixed(2);
  
  // Future dates for the mock preview
  const nextBillingDate = new Date();
  nextBillingDate.setDate(nextBillingDate.getDate() + 30);
  
  const changeDate = options.immediate ? 
    new Date().toISOString() : 
    nextBillingDate.toISOString();
  
  return {
    currentPlan,
    newPlan,
    proratedAmount: parseFloat(proratedAmount),
    nextBillingDate: nextBillingDate.toISOString(),
    changeDate
  };
};

// Mock function to execute a plan change
export const changePlan = async (options: PlanChangeOptions): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Always return success for the frontend showcase
  return true;
};

export default {
  getPlanChangePreview,
  changePlan
};