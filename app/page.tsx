"use client";

import { useState, useMemo } from "react";
import { products, type Product } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import PaystackPop from "@paystack/inline-js";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerEmail, setCustomerEmail] = useState("idris81ahmad@gmail.com");

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

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handlePaystackPayment = () => {
    if (!customerEmail || !customerEmail.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    const popup = new PaystackPop();

    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: customerEmail,
      amount: totalPrice * 100,
      currency: "NGN",
      reference: `biyora-${Date.now()}`,
      metadata: {
        cart_items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      },
      onSuccess: (transaction: any) => {
        window.location.href = `/success?reference=${transaction.reference}`;
      },
      onCancel: () => {
        alert("Payment was cancelled");
      }
    });
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
      <section id="shop" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
          <h2 className="text-5xl font-serif">Our Collection</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
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
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl opacity-60">No matching products found.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="mt-6 text-[#d4af37] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-zinc-950 w-full max-w-md h-full overflow-auto">
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-950">
              <h2 className="text-3xl">Your Cart ({getTotalItems()})</h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-4xl leading-none hover:text-[#d4af37]"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-60">Your cart is empty ✨</div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-zinc-800 pb-8">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium leading-tight">{item.name}</h4>
                        <p className="text-[#d4af37] mt-1">₦{(item.price * item.quantity).toLocaleString()}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">−</button>
                          <span className="w-6 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 self-start mt-1">Remove</button>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-zinc-800">
                    <div className="flex justify-between text-2xl mb-6">
                      <span>Total</span>
                      <span className="font-semibold">₦{totalPrice.toLocaleString()}</span>
                    </div>

                    <input
                      type="email"
                      placeholder="Email address"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-[#d4af37]/30 rounded-2xl px-5 py-3 mb-4 outline-none focus:border-[#d4af37]"
                    />

                    <button
                      onClick={handlePaystackPayment}
                      disabled={totalPrice === 0}
                      className="w-full bg-[#d4af37] hover:bg-amber-300 disabled:bg-gray-600 text-black font-medium py-4 rounded-2xl text-lg transition-all"
                    >
                      Pay ₦{totalPrice.toLocaleString()} with Paystack
                    </button>

                    <button onClick={clearCart} className="w-full mt-4 py-3 text-red-400 hover:text-red-500 text-sm">
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
