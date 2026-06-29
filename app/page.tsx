'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';

export default function Biyora() {
  const { cart, addToCart, clearCart } = useCartStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = () => {
    if (!email) {
      setToast({ message: 'Please enter your email', type: 'error' });
      return;
    }
    clearCart();
    router.push(`/success?reference=test&amount=${total}`);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 bg-gray-950/95 border-b border-[#d4af37]/20 backdrop-blur px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#d4af37] rounded-2xl flex items-center justify-center">
            <span className="text-black font-bold text-2xl">B</span>
          </div>
          <span className="text-2xl font-serif tracking-tight">BIYORA</span>
        </div>

        <div 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="flex items-center gap-2 bg-gray-900 border border-[#d4af37]/30 px-4 py-2 rounded-2xl cursor-pointer"
        >
          <span className="text-[#d4af37] text-sm">Cart</span>
          <span className="bg-[#d4af37] text-black text-xs px-2 py-0.5 rounded-full">{cart.length}</span>
        </div>
      </header>

      <div className="h-[70vh] flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-7xl font-serif tracking-[-3px] mb-4">Timeless African Luxury</h1>
          <p className="text-xl text-[#d4af37]/80 mb-8">Premium textiles from Kano</p>
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#d4af37] text-black px-10 py-4 rounded-3xl font-semibold"
          >
            Shop Now
          </button>
        </div>
      </div>

      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-5xl font-serif tracking-[-1.5px] mb-10">Signature Fabrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              onViewDetails={() => {}}
            />
          ))}
        </div>
      </section>

      {(cart.length > 0 || isCartOpen) && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 border border-[#d4af37]/30 p-6 rounded-3xl w-80 z-50">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-xl">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-xl">×</button>
          </h3>
          
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#d4af37]/20 pt-4 mb-4 text-xl font-semibold flex justify-between">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full bg-zinc-950 border border-[#d4af37]/30 rounded-2xl px-4 py-3 mb-4 text-sm"
          />

          <button 
            onClick={handlePay}
            className="w-full bg-[#d4af37] text-black font-semibold py-3.5 rounded-3xl font-semibold"
          >
            Pay with Paystack
          </button>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 px-6 py-3 rounded-2xl text-sm">
          {toast.message}
        </div>
      )}
    </main>
  );
}
