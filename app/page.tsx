'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { validateCartForCheckout, calculateTotalInKobo } from '@/lib/validators';
import { useRouter } from 'next/navigation';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function BiyoraHome() {
  const { cart, addToCart, clearCart } = useCartStore();
  const router = useRouter();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaystackPayment = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setToast({ message: "Please enter a valid email address", type: "error" });
      return;
    }

    const validation = validateCartForCheckout(cart);
    if (!validation.isValid) {
      setToast({ message: validation.error || "Cart validation failed", type: "error" });
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      setToast({ message: "Payment configuration error", type: "error" });
      return;
    }

    if (!(window as any).PaystackPop) {
      setToast({ message: "Payment system is still loading. Please wait a moment.", type: "info" });
      return;
    }

    setIsProcessing(true);

    const config = {
      reference: `biyora-${Date.now()}`,
      email: email,
      amount: calculateTotalInKobo(cart),
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      metadata: {
        custom_fields: [
          { 
            display_name: "Cart Items", 
            variable_name: "cart_items", 
            value: JSON.stringify(cart) 
          }
        ]
      }
    };

    try {
      const paystack = new (window as any).PaystackPop();
      
      paystack.newTransaction({
        ...config,
        onSuccess: async (transaction: any) => {
          setIsVerifying(true);
          setToast({ message: "Verifying payment on server...", type: "info" });

          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ reference: transaction.reference }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              clearCart();
              setEmail('');
              router.push(`/success?reference=${transaction.reference}&amount=${totalAmount}`);
            } else {
              setToast({ message: "Payment received but verification failed. Contact support.", type: "error" });
            }
          } catch (error) {
            console.error(error);
            clearCart();
            setEmail('');
            router.push(`/success?reference=${transaction.reference}&amount=${totalAmount}`);
          } finally {
            setIsVerifying(false);
          }
        },
        onCancel: () => {
          setToast({ message: "Payment was cancelled", type: "info" });
          setIsVerifying(false);
        },
        onError: () => {
          setToast({ message: "Payment error occurred. Please try again.", type: "error" });
          setIsVerifying(false);
        }
      });
    } catch (error) {
      console.error("Paystack initialization error:", error);
      setToast({ message: "Failed to initialize payment. Please try again.", type: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 border-b border-[#d4af37]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-black font-bold text-xl">B</div>
            <div>
              <h1 className="text-3xl font-serif tracking-tight">BIYORA</h1>
              <p className="text-xs text-[#d4af37]/70 -mt-1">Luxury African Textiles • Kano</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-sm opacity-70">Kano, Nigeria</div>
            <div className="bg-gray-900 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-[#d4af37]/10">
              <span className="text-[#d4af37] font-medium">Cart</span>
              <span className="bg-[#d4af37] text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-serif mb-6 tracking-tighter">Timeless African Luxury</h2>
          <p className="text-2xl md:text-3xl text-[#d4af37]/90 mb-8">Premium Textiles from Kano to the World</p>
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#d4af37] hover:bg-amber-300 text-black font-semibold px-12 py-5 rounded-2xl text-lg transition-all active:scale-95"
          >
            Shop Collection
          </button>
        </div>
