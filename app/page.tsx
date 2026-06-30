'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const products = [
  { id: 1, name: "Premium Ankara Print Set", price: 18500, description: "Vibrant premium quality Ankara fabric with modern contemporary patterns.", category: "Ankara" },
  { id: 2, name: "Luxury Adire Batik", price: 24500, description: "Handcrafted Adire fabric featuring intricate traditional Yoruba patterns.", category: "Adire" },
  { id: 3, name: "Guinea Brocade Gold Embroidery", price: 32500, description: "Exquisite Guinea Brocade with rich gold embroidery. A symbol of prestige.", category: "Brocade" },
  { id: 4, name: "Silk Velvet Damask", price: 42800, description: "Premium Silk Velvet Damask with a soft luxurious feel and beautiful sheen.", category: "Silk" },
  { id: 5, name: "Royal Gold Brocade Special Collection", price: 28500, description: "Limited edition Royal Gold Brocade with intricate patterns.", category: "Brocade" },
  { id: 6, name: "Classic Lace Fabric", price: 16800, description: "High-quality lace material popular for both casual and formal attire.", category: "Lace" },
];

export default function Biyora() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ankara', 'Adire', 'Brocade', 'Silk', 'Lace'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handlePay = () => {
    if (!email) {
      setToast({ message: 'Please enter your email', type: 'error' });
      return;
    }
    setCart([]);
    router.push(`/success?reference=biyora-${Date.now()}&amount=${total}`);
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
              <span className="text-black font-serif font-bold text-[26px] tracking-[-1.5px]">B</span>
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
              className="bg-gray-900 border border-[#d4af37]/30 px-5 py-2.5 rounded-2xl flex items-center gap-3 hover:border-[#d4af37]/60 transition-all cursor-pointer active:scale-[0.985]"
            >
              <span className="text-[#d4af37] font-medium text-sm">Cart</span>
              <div className="bg-[#d4af37] text-black text-xs font-bold min-w-[22px] h-[22px] flex items-center justify-center rounded-full px-1.5">
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
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#d4af37]/30 text-xs tracking-[3px] text-[#d4af37]">
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
            className="group bg-[#d4af37] hover:bg-white text-black font-semibold px-14 py-5 rounded-3xl text-lg transition-all active:scale-[0.985] flex items-center gap-3 mx-auto"
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

        {/* Search + Filters */}
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
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-zinc-900 rounded-3xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 cursor-pointer" onClick={() => {}}>
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-[#d4af37]/40">
                    <span className="text-6xl">🧵</span>
                  </div>
                  <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs tracking-[2px] border border-[#d4af37]/30">
                    {product.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="mb-4">
                    <h3 className="text-[21px] font-semibold tracking-[-0.4px] leading-tight mb-2 group-hover:text-[#d4af37] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-between pt-4 border-t border-[#d4af37]/10">
                    <div>
                      <div className="text-xs text-[#d4af37]/70 tracking-widest mb-0.5">FROM</div>
                      <div className="text-3xl font-semibold tracking-tighter">
                        ₦{product.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="bg-[#d4af37] hover:bg-white active:bg-amber-300 text-black font-semibold px-7 py-3.5 rounded-2xl text-sm transition-all active:scale-[0.985]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
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
        <div className="fixed bottom-6 right-6 bg-zinc-900 border border-[#d4af37]/30 p-7 rounded-3xl shadow-2xl max-w-sm w-full z-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-2xl tracking-tight">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-[#d4af37]/70 hover:text-white text-xl leading-none">×</button>
          </h3>

          {cart.length > 0 ? (
            <>
              <div className="max-h-[220px] overflow-auto mb-6 pr-1 space-y-5 text-sm">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="font-medium leading-tight">{item.name}</div>
                      <div className="text-xs text-[#d4af37]/60 mt-0.5">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold whitespace-nowrap text-right">
                      ₦{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#d4af37]/20 pt-5 mb-6">
                <div className="flex justify-between items-baseline text-2xl font-semibold">
                  <span className="text-base font-normal text-[#d4af37]/80">Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email for receipt"
                className="w-full bg-zinc-950 border border-[#d4af37]/30 focus:border-[#d4af37] rounded-2xl px-5 py-4 mb-4 text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-200"
              />

              <button
                onClick={handlePay}
                className="w-full bg-[#d4af37] hover:bg-white text-black font-semibold py-4.5 rounded-3xl text-[15px] transition-all duration-200 active:scale-[0.985]"
              >
                Pay with Paystack (Demo)
              </button>
            </>
          ) : (
            <div className="py-8 text-center text-gray-400">Your cart is empty</div>
          )}
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl shadow-2xl z-[100] text-sm font-medium transition-all duration-300
          ${toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
