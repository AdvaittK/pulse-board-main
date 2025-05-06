"use client"

import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, LockIcon, CreditCard } from 'lucide-react'

interface SubscriptionCheckoutProps {
  planId: string
  planName: string
  planDescription: string
  planPrice: number
  onSuccess: () => void
  onCancel: () => void
}

export function SubscriptionCheckout({
  planId,
  planName,
  planDescription,
  planPrice,
  onSuccess,
  onCancel
}: SubscriptionCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }
    
    setIsProcessing(true)
    setError(null)
    
    // In a real implementation, this would call your backend to create a subscription
    // For demo purposes, we'll simulate a successful payment after a short delay
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess()
    }, 2000)
    
    // Real implementation example:
    // try {
    //   const cardElement = elements.getElement(CardElement);
    //   if (!cardElement) return;
    //
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: cardElement,
    //   });
    //
    //   if (error) {
    //     setError(error.message);
    //     setIsProcessing(false);
    //     return;
    //   }
    //
    //   // Send paymentMethod.id to your server
    //   const response = await fetch('/api/subscriptions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       paymentMethodId: paymentMethod.id,
    //       planId,
    //     }),
    //   });
    //
    //   const subscription = await response.json();
    //   
    //   if (subscription.error) {
    //     setError(subscription.error);
    //   } else {
    //     onSuccess();
    //   }
    // } catch (err) {
    //   setError('An unexpected error occurred.');
    //   console.error(err);
    // }
    // 
    // setIsProcessing(false);
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{planName}</h3>
          <span className="font-bold">${planPrice.toFixed(2)}/mo</span>
        </div>
        <p className="text-sm text-muted-foreground">{planDescription}</p>
      </div>
      
      <div className="border-t border-b py-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name on Card</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="card-element">Card Details</Label>
            <div className="border rounded-md p-3 bg-background">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-500 mt-2">
              {error}
            </div>
          )}
          
          <div className="flex items-center text-xs text-muted-foreground gap-2 mt-4">
            <LockIcon className="h-3 w-3" />
            <span>Payments are secure and encrypted</span>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!stripe || isProcessing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}