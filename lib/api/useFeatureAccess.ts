// Mock feature access for frontend showcase
import { useState, useEffect } from 'react';
import { mockFeatures } from '../mock-data';

/**
 * This is a mock implementation of feature access hooks for the frontend showcase.
 * In a real application, this would check user permissions against their subscription plan.
 */

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  limit?: number | null;
}

// Hook to check if a user has access to a specific feature
export function useFeatureAccess(featureName: string): { 
  hasAccess: boolean; 
  isLoading: boolean;
  limit?: number | null;
} {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [limit, setLimit] = useState<number | null>(null);
  
  useEffect(() => {
    const checkFeatureAccess = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // For frontend showcase, check against our mock features
      const featureKey = `can${featureName.charAt(0).toUpperCase() + featureName.slice(1)}` as keyof typeof mockFeatures;
      
      // If the feature exists in our mock data, use that, otherwise default to true
      const hasFeatureAccess = featureKey in mockFeatures ? 
        Boolean(mockFeatures[featureKey]) : 
        true;
      
      setHasAccess(hasFeatureAccess);
      setIsLoading(false);
    };
    
    checkFeatureAccess();
  }, [featureName]);
  
  return { hasAccess, isLoading, limit };
}

// Hook to get all available features for the current user
export function useAllFeatures(): {
  features: FeatureFlag[];
  isLoading: boolean;
} {
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeatures = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Convert our mock features object to an array of feature flags
      const featureList = Object.entries(mockFeatures).map(([key, value]) => {
        // Remove the 'can' prefix and lowercase first letter for the name
        const name = key.replace(/^can/, '');
        const formattedName = name.charAt(0).toLowerCase() + name.slice(1);
        
        return {
          name: formattedName,
          enabled: Boolean(value),
          limit: typeof value === 'number' ? value : null
        };
      });
      
      setFeatures(featureList);
      setIsLoading(false);
    };
    
    fetchFeatures();
  }, []);
  
  return { features, isLoading };
}

export default {
  useFeatureAccess,
  useAllFeatures
};