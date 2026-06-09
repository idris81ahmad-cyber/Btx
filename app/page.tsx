'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { validateCartForCheckout, calculateTotalInKobo } from '@/lib/validators';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function BiyoraHome() {
  const { cart, addToCart, clearCart, removeFromCart, updateQuantity } = useCartStore();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaystackPayment = () => {
    const validation = validateCartForCheckout(cart);

    if (!validation.isValid) {
      setToast({ 
        message: validation.error || "Cart validation failed", 
        type: "error" 
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      setToast({ 
        message: "Payment key is missing. Check your .env.local file", 
        type: "error" 
      });
      return;
    }

    setIsProcessing(true);

    const config = {
      reference: `biyora-${Date.now()}`,
      email: email || "customer@biyora.com",
      amount: calculateTotalInKobo(cart),
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      metadata: {
        custom_fields: [
          { 
            display_name: "Cart Items", 
            variable_name: "cart_items", 
            value: JSON.stringify(cart.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))) 
          }
        ]
      }
    };

    try {
      const paystack = new (window as any).PaystackPop();
      paystack.newTransaction({
        ...config,
        onSuccess: (transaction: any) => {
          setToast({ 
            message: `🎉 Payment successful! Reference: ${transaction.reference}`, 
            type: "success" 
          });
          clearCart();
          setEmail('');
        },
        onCancel: () => setToast({ message: "Payment was cancelled", type: "info" }),
        onError: () => setToast({ message: "An error occurred during payment", type: "error" })
      });
    } catch (error) {
      console.error("Paystack error:", error);
      setToast({ message: "Failed to initialize Paystack payment", type: "error" });
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
              <p className="text-xs text-[#d4af37]/70 -mt-1">Luxury African Textiles</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-sm opacity-70">Kano, Nigeria</div>
            <div className="relative">
              <div className="bg-gray-900 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-[#d4af37]/10">
                <span className="text-[#d4af37] font-medium">Cart</span>
                <span className="bg-[#d4af37] text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              </div>
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
      </div>

      {/* Products Grid */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="uppercase tracking-[3px] text-sm text-[#d4af37]">Our Collection</div>
            <h3 className="text-5xl font-serif">Signature Fabrics</h3>
          </div>
          <div className="text-sm opacity-60">Showing {products.length} premium pieces</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* Floating Cart & Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-gray-900 border border-[#d4af37]/30 p-6 rounded-3xl shadow-2xl max-w-xs w-full z-50">
          <h3 className="font-semibold text-xl mb-4">Your Cart</h3>
          
          <div className="max-h-52 overflow-auto mb-4 space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>{item.name} ×{item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-4 mb-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email for receipt"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[#d4af37]"
          />

          <button
            onClick={handlePaystackPayment}
            disabled={isProcessing}
            className="w-full bg-[#d4af37] hover:bg-amber-300 disabled:bg-gray-600 text-black font-semibold py-4 rounded-2xl transition-all active:scale-[0.98]"
          >
            {isProcessing ? 'Processing Payment...' : 'Pay Securely with Paystack'}
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-2xl z-[100] text-sm font-medium
          ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
