'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useCartStore } from '../lib/cartStore'; // adjust path if needed
import { validateCartForCheckout, calculateTotalInKobo } from '../lib/validators';

// Define proper types
interface CartItem {
  id: string | number;
  name: string;
  price: number; // in Naira
  quantity: number;
  image?: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function Home() {
  const { cart, clearCart, removeFromCart, updateQuantity } = useCartStore();
  const [toast, setToast] = useState<Toast | null>(null);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const handlePaystackPayment = useCallback(() => {
    const validation = validateCartForCheckout(cart);

    if (!validation.isValid) {
      setToast({ 
        message: validation.error || "Cart validation failed", 
        type: "error" 
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      setToast({ message: "Payment key is missing", type: "error" });
      return;
    }

    setIsProcessing(true);

    const config = {
      reference: `biyora-${Date.now()}`,
      email: validation.email || email,
      amount: calculateTotalInKobo(cart),
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      metadata: {
        custom_fields: [
          { display_name: "Cart Items", variable_name: "cart_items", value: cart.length }
        ]
      }
    };

    try {
      const paystack = new (window as any).PaystackPop();
      paystack.newTransaction({
        ...config,
        onSuccess: (transaction: { reference: string; status: string }) => {
          setToast({ 
            message: `Payment successful! Reference: ${transaction.reference}`, 
            type: "success" 
          });
          clearCart();
          setEmail('');
        },
        onCancel: () => {
          setToast({ message: "Payment was cancelled", type: "info" });
        },
        onError: (error: Error) => {
          setToast({ message: "Payment error occurred", type: "error" });
          console.error(error);
        }
      });
    } catch (error) {
      setToast({ message: "Failed to initialize payment", type: "error" });
    } finally {
      setIsProcessing(false);
    }
  }, [cart, email, clearCart]);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Your existing header, product grid, modals, etc. */}

      {/* Checkout Section - Example */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800 max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>
          
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="flex justify-between mb-6 text-lg">
            <span>Total:</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>

          <button
            onClick={handlePaystackPayment}
            disabled={isProcessing}
            className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-black font-semibold py-4 rounded-lg transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Pay with Paystack'}
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div 
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3
            ${toast.type === 'success' ? 'bg-green-600' : 
              toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}
          role="alert"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}
