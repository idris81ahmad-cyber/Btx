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
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ankara', 'Adire', 'Brocade', 'Silk', 'Lace'];

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
          { display_name: "Cart Items", variable_name: "cart_items", value: JSON.stringify(cart) }
        ]
      }
    };

    try {
      const paystack = new (window as any).PaystackPop();

      paystack.newTransaction({
        ...config,
        onSuccess: async (transaction: any) => {
          setIsVerifying(true);
          setToast({ message: "Verifying payment...", type: "info" });

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
              setToast({ message: "Payment verification failed", type: "error" });
            }
          } catch (error) {
            setToast({ message: "Verification error", type: "error" });
          } finally {
            setIsVerifying(false);
          }
        },
        onCancel: () => {
          setToast({ message: "Payment cancelled", type: "info" });
          setIsVerifying(false);
        },
        onError: () => {
          setToast({ message: "Payment failed", type: "error" });
          setIsVerifying(false);
        }
      });
    } catch (error) {
      setToast({ message: "Could not start payment", type: "error" });
      setIsVerifying(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-gray-950/95 border-b border-[#d4af37]/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4af37] rounded-2xl flex items-center justify-center shadow-md shadow-[#d4af37]/40 ring-1 ring-[#d4af37]/30">
              <span className="text-black font-serif font-bold text-[26px] tracking-[-1.5px] leading-none mt-[-1px]">B</span>
            </div>
            <div>
              <h1 className="text-[28px] font-serif tracking-[-1.2px] text-white leading-none">BIYORA</h1>
              <p className="text-[9px] text-[#d4af37]/70 -mt-0.5 tracking-[2.5px]">LUXURY TEXTILES</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:block text-sm text-[#d4af37]/70 tracking-widest">KANO, NIGERIA</div>

            <div
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-gray-900 border border-[#d4af37]/30 px-5 py-2.5 rounded-2xl flex items-center gap-3 hover:border-[#d4af37]/60 transition-all duration-200 cursor-pointer active:scale-[0.985]"
            >
              <span className="text-[#d4af37] font-medium text-sm">Cart</span>
              <div className="bg-[#d4af37] text-black text-xs font-bold min-w-[22px] h-[22px] flex items-center justify-center rounded-full px-1.5 transition-all">
                {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Luxurious Hero */}
      <div className="relative h-[78vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.7px,transparent_1.2px)] bg-[length:32px_32px] opacity-[0.07]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.4px,transparent_1px)] bg-[length:18px_18px] opacity-[0.035]"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#d4af37]/30 text-xs tracking-[3px] text-[#d4af37] transition-all">
            EST. 2026 • KANO
          </div>

          <h2 className="text-7xl md:text-[92px] leading-[0.9] font-serif tracking-[-4.5px] mb-6">
            Timeless African<br />Luxury
          </h2>

          <p className="text-2xl md:text-3xl text-[#d4af37]/90 mb-10 tracking-tight">
            Premium textiles from Kano to the world
          </p>

          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-[#d4af37] hover:bg-white text-black font-semibold px-14 py-5 rounded-3xl text-lg transition-all duration-200 active:scale-[0.985] flex items-center gap-3 mx-auto"
          >
            Shop the Collection
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#d4af37]/50 text-xs tracking-[3px] transition-opacity hover:opacity-100">
          SCROLL TO EXPLORE
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="uppercase tracking-[3px] text-sm text-[#d4af37]">Our Collection</div>
            <h3 className="text-6xl font-serif tracking-[-1.5px]">Signature Fabrics</h3>
          </div>
          <div className="text-sm text-[#d4af37]/70">Showing {filteredProducts.length} premium pieces</div>
        </div>

        {/* Search + Category Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabrics (Ankara, Adire, Brocade...)"
              className="w-full bg-gray-900 border border-[#d4af37]/30 focus:border-[#d4af37] rounded-3xl px-6 py-4 pl-14 text-white placeholder:text-gray-500 focus:outline-none transition-all text-sm"
            />
            <div className="absolute left-6 top-[17px] text-[#d4af37]/60 text-lg">🔍</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-3xl text-sm font-medium transition-all duration-200 border active:scale-[0.985] ${selectedCategory === category
                  ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                  : 'bg-gray-900 border-[#d4af37]/30 hover:border-[#d4af37]/60 text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={clearFilters}
                className="px-5 py-3 rounded-3xl text-sm font-medium border border-red-500/40 text-red-400 hover:bg-red-500/10 active:scale-[0.985] transition-all duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-3xl text-[#d4af37] mb-3">No fabrics found</p>
            <button onClick={clearFilters} className="mt-8 px-10 py-4 rounded-3xl border border-[#d4af37]/40 hover:bg-[#d4af37]/10 active:scale-[0.985] transition-all duration-200">
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Floating Cart */}
      {(cart.length > 0 || isCartOpen) && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 border border-[#d4af37]/30 p-7 rounded-3xl shadow-2xl max-w-sm w-full z-50 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-2xl tracking-tight">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-[#d4af37]/70 hover:text-white text-xl leading-none">×</button>
          </h3>

          {cart.length > 0 ? (
            <>
              <div className="max-h-[220px] overflow-auto mb-6 pr-1 space-y-5 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="font-medium leading-tight">{item.name}</div>
                      <div className="text-xs text-[#d4af37]/60 mt-0.5">Quantity: {item.quantity}</div>
                    </div>
                    <div className="font-semibold whitespace-nowrap text-right">
                      \u20a6{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#d4af37]/20 pt-5 mb-6">
                <div className="flex justify-between items-baseline text-2xl font-semibold">
                  <span className="text-base font-normal text-[#d4af37]/80">Total</span>
                  <span>\u20a6{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email for receipt"
                className="w-full bg-zinc-950 border border-[#d4af37]/30 focus:border-[#d4af37] rounded-2xl px-5 py-4 mb-4 text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-200"
              />

              <button
                onClick={handlePaystackPayment}
                disabled={isProcessing || isVerifying}
                className="w-full bg-[#d4af37] hover:bg-white disabled:bg-gray-700 text-black font-semibold py-4.5 rounded-3xl text-[15px] transition-all duration-200 active:scale-[0.985]"
              >
                {isVerifying ? 'Verifying Payment...' : isProcessing ? 'Processing...' : 'Pay Securely with Paystack'}
              </button>
            </>
          ) : (
            <div className="py-8 text-center text-gray-400">
              Your cart is empty
            </div>
          )}
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
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl shadow-2xl z-[100] text-sm font-medium transition-all duration-300
          ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
