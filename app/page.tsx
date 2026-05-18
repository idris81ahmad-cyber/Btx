"use client";

import { useEffect, useState } from "react";
import { products, type Product } from "@/data/products";
import { cartStorage, type CartItem } from "@/lib/cartStorage";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(cartStorage.getCart());
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      cartStorage.saveCart(cart);
    }
  }, [cart, isHydrated]);

  const addToCart = (product: Product) => {
    const updatedCart = cartStorage.addItem(product);
    setCart(updatedCart);
  };

  const removeFromCart = (id: number, showConfirmation = true) => {
    if (showConfirmation) {
      if (
        !confirm(
          "Are you sure you want to remove this item from your cart?"
        )
      ) {
        return;
      }
    }
    const updatedCart = cartStorage.removeItem(id);
    setCart(updatedCart);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, true);
      return;
    }
    const updatedCart = cartStorage.updateQuantity(id, quantity);
    setCart(updatedCart);
  };

  const totalPrice = cartStorage.getTotalPrice(cart);
  const totalItems = cartStorage.getTotalItems(cart);

  if (!isHydrated) {
    return null; // Prevent hydration mismatch
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider luxury-gold">
            BIYORA
          </div>

          <div className="flex items-center gap-8">
            <a href="#shop" className="hover:text-[#d4af37] transition-colors">
              Shop
            </a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">
              Collections
            </a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">
              About
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              Cart ({totalItems})
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-black via-[#1a1a2e] to-black">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-7xl md:text-8xl font-serif tracking-tight mb-6">
            Luxury Redefined
          </h1>
          <p className="text-2xl text-[#d4af37] mb-8">
            Premium African Textiles
          </p>
          <p className="max-w-md mx-auto text-lg opacity-80">
            Timeless elegance in every thread. Handpicked fabrics for the
            distinguished.
          </p>
          <a
            href="#shop"
            className="mt-10 inline-block btn-gold px-10 py-4 rounded-full text-lg"
          >
            Explore Collection
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-serif text-center mb-16">
          Our Collection
        </h2>

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
                <div className="text-sm uppercase tracking-widest text-[#d4af37] mb-1">
                  {product.category}
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm opacity-70 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-medium">
                    ₦{product.price.toLocaleString()}
                  </span>
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

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
          <div className="bg-zinc-950 w-full max-w-md h-full overflow-auto">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-2xl">Your Cart ({totalItems})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-3xl hover:text-[#d4af37] transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-center py-10 opacity-60">
                  Your cart is empty
                </p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-zinc-800 pb-6"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-[#d4af37] text-sm">
                          ₦{item.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-[#d4af37] hover:text-black rounded transition-colors text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-[#d4af37] hover:text-black rounded transition-colors text-sm font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <p className="text-xs text-gray-400 mt-2">
                          Subtotal: ₦
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, true)}
                        className="text-red-400 hover:text-red-500 self-start pt-1 transition-colors"
                        title="Remove item"
                      >
                        🗑
                      </button>
                    </div>
                  ))}

                  <div className="pt-6">
                    <div className="flex justify-between text-xl mb-8">
                      <span>Total</span>
                      <span className="font-semibold">
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <button className="w-full btn-gold py-4 rounded-2xl text-lg hover:bg-[#f0d070]">
                      Proceed to Checkout
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
