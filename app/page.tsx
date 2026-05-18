"use client";

import { useState, useEffect } from "react";
import { products, type Product } from "@/data/products";

type CartItem = Product & { quantity: number };

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("biyora-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("biyora-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
    
    alert(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (confirm("Clear entire cart?")) {
      setCart([]);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6]">
      {/* Navigation - Updated count */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider luxury-gold">BIYORA</div>
          
          <div className="flex items-center gap-8">
            <a href="#shop" className="hover:text-[#d4af37] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Collections</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">About</a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              Cart ({totalItems})
            </button>
          </div>
        </div>
      </nav>

      {/* Hero & Products Section (same as before, only addToCart changed) */}
      {/* ... Hero section remains unchanged ... */}

      <section id="shop" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-serif text-center mb-16">Our Collection</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="text-sm uppercase tracking-widest text-[#d4af37] mb-1">{product.category}</div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm opacity-70 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-medium">₦{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="btn-gold px-6 py-3 rounded-xl text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Improved Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
          <div className="bg-zinc-950 w-full max-w-md h-full overflow-auto">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-2xl">Your Cart ({totalItems})</h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-3xl hover:text-[#d4af37]"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-center py-10 opacity-60">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-zinc-800 pb-6">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-[#d4af37]">₦{(item.price * item.quantity).toLocaleString()}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-500 self-start"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="pt-6">
                    <div className="flex justify-between text-xl mb-8">
                      <span>Total</span>
                      <span className="font-semibold">₦{totalPrice.toLocaleString()}</span>
                    </div>
                    
                    <button 
                      onClick={() => alert("Checkout flow coming soon! 💰")}
                      className="w-full btn-gold py-4 rounded-2xl text-lg mb-3"
                    >
                      Proceed to Checkout
                    </button>
                    
                    <button 
                      onClick={clearCart}
                      className="w-full py-3 text-red-400 hover:text-red-500 text-sm"
                    >
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
