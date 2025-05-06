// Mock Stripe service for frontend showcase

/**
 * This is a simplified mock implementation of Stripe-related services
 * for the frontend showcase. No actual payment processing is performed.
 */

export interface PaymentMethod {
  id: string;
  type: 'card';
  card: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

export interface StripeCustomer {
  id: string;
  email: string;
  name: string;
  defaultPaymentMethod?: string;
}

// Mock payment methods
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_mock_visa',
    type: 'card',
    card: {
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025
    }
  },
  {
    id: 'pm_mock_mastercard',
    type: 'card',
    card: {
      brand: 'mastercard',
      last4: '5555',
      expMonth: 10,
      expYear: 2025
    }
  }
];

// Mock function to get payment methods
export const getPaymentMethods = async (customerId: string): Promise<PaymentMethod[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockPaymentMethods;
};

// Mock function to add a payment method
export const addPaymentMethod = async (
  customerId: string, 
  paymentMethodId: string
): Promise<PaymentMethod> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a mock payment method
  return {
    id: paymentMethodId || `pm_mock_new_${Date.now()}`,
    type: 'card',
    card: {
      brand: 'visa',
      last4: '1234',
      expMonth: 11,
      expYear: 2026
    }
  };
};

// Mock function to create checkout session
export const createCheckoutSession = async (
  customerId: string,
  planId: string,
  successUrl: string,
  cancelUrl: string
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a mock checkout session URL
  // For frontend showcase, we'll just return the success URL directly
  return { url: successUrl };
};

export default {
  getPaymentMethods,
  addPaymentMethod,
  createCheckoutSession
};