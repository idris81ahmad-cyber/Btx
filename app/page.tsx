'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { useRouter } from 'next/navigation';

export default function BiyoraHome() {
  const { cart, addToCart, clearCart } = useCartStore();
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!email) {
      setToast({ message: "Please enter your email", type: "error" });
      return;
    }
    // For now, just simulate success
    clearCart();
    router.push(`/success?reference=test-${Date.now()}&amount=${totalAmount}`);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/95 border-b border-[#d4af37]/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4af37] rounded-2xl flex items-center justify-center">
              <span className="text-black font-serif font-bold text-[26px]">B</span>
            </div>
            <div>
              <h1 className="text-[28px] font-serif tracking-[-1.2px] text-white">BIYORA</h1>
            </div>
          </div>

          <div
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="bg-gray-900 border border-[#d4af37]/30 px-5 py-2.5 rounded-2xl flex items-center gap-3 cursor-pointer"
          >
            <span className="text-[#d4af37] font-medium text-sm">Cart</span>
            <div className="bg-[#d4af37] text-black text-xs font-bold min-w-[22px] h-[22px] flex items-center justify-center rounded-full px-1.5">
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-[70vh] flex items-center justify-center bg-black">
        <div className="relative z-10 text-center px-6">
          <h2 className="text-7xl md:text-[90px] font-serif tracking-[-4px] mb-6">
            Timeless African<br />Luxury
          </h2>
          <p className="text-2xl text-[#d4af37]/90 mb-8">Premium textiles from Kano to the world</p>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#d4af37] text-black font-semibold px-12 py-4 rounded-3xl text-lg"
          >
            Shop Collection
          </button>
        </div>
      </div>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-5xl font-serif tracking-[-1.5px] mb-10">Signature Fabrics</h3>

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

      {/* Floating Cart */}
      {(cart.length > 0 || isCartOpen) && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 border border-[#d4af37]/30 p-7 rounded-3xl shadow-2xl max-w-sm w-full z-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-2xl">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-2xl text-[#d4af37]/70">×</button>
          </h3>

          <div className="max-h-[180px] overflow-auto mb-6 space-y-4 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>{item.name} × {item.quantity}</div>
                <div className="font-semibold">\u20a6{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#d4af37]/20 pt-5 mb-6 text-2xl font-semibold flex justify-between">
            <span>Total</span>
            <span>\u20a6{totalAmount.toLocaleString()}</span>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full bg-zinc-950 border border-[#d4af37]/30 rounded-2xl px-5 py-3 mb-4"
          />

          <button
            onClick={handlePayment}
            className="w-full bg-[#d4af37] text-black font-semibold py-4 rounded-3xl text-lg"
          >
            Pay with Paystack
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl z-[100] text-sm font-medium
          ${toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
