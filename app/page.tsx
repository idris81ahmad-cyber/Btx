"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Zustand Store
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();

  const totalPrice = getTotalPrice();

  // Get all unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filtered & Searched Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

      {/* Shop Section with Filters */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <h2 className="text-5xl font-serif">Our Collection</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search fabrics, names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900 border border-[#d4af37]/30 focus:border-[#d4af37] rounded-2xl px-5 py-3 pl-11 w-full lg:w-80 outline-none transition-all"
              />
              <span className="absolute left-4 top-4 text-[#d4af37]">🔍</span>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-900 border border-[#d4af37]/30 focus:border-[#d4af37] rounded-2xl px-5 py-3 outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-[#d4af37] mb-8">
          {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"} found
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={() => alert("Product details modal coming next!")}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl opacity-60">No matching products found.</p>
            <button 
              onClick
