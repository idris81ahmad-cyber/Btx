"use client";

import { useState } from "react";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cart, addToCart, getTotalItems } = useCartStore();

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-widest text-[#d4af37]">BIYORA</div>
          
          <div className="flex items-center gap-8 text-sm uppercase tracking-widest">
            <a href="#shop" className="hover:text-[#d4af37] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Collections</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">About</a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              Cart <span className="text-[#d4af37]">({getTotalItems()})</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-6xl md:text-7xl font-serif tracking-tight mb-6">
            Timeless African Luxury
          </h1>
          <p className="text-xl text-[#d4af37]/90 max-w-2xl mx-auto">
            Premium handcrafted textiles that celebrate heritage and elegance.
          </p>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-serif">Our Collection</h2>
          <p className="text-[#d4af37]">{products.length} Exclusive Pieces</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={openProductModal}
            />
          ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar - You can keep your existing one or I'll give a new one next */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-zinc-950 w-full max-w-md h-full overflow-auto">
            {/* Your existing cart sidebar content or we can improve it later */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl">Your Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-4xl leading-none hover:text-[#d4af37]"
                >
                  ×
                </button>
              </div>
              <p className="opacity-60">Cart functionality is now powered by Zustand.</p>
              {/* Add full cart UI here or ask me for a complete CartSidebar component */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
