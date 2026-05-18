"use client";

import { useEffect, useState } from "react";
import { products, type Product } from "@/data/products";
import { cartStorage, type CartItem } from "@/lib/cartStorage";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import Image from "next/image";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [removeConfirm, setRemoveConfirm] = useState<number | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(cartStorage.getCart());
    setIsHydrated(true);
  }, []);

  const addToCart = (product: Product) => {
    const updatedCart = cartStorage.addItem(product);
    setCart(updatedCart);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartStorage.removeItem(id);
    setCart(updatedCart);
    setRemoveConfirm(null);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartStorage.updateQuantity(id, quantity);
    setCart(updatedCart);
  };

  const totalPrice = cartStorage.getTotalPrice(cart);
  const totalItems = cartStorage.getTotalItems(cart);

  if (!isHydrated) {
    return null; // Avoid hydration mismatch
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-40 border-b border-[#d4af37]/30">
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
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

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
                    <div key={item.id} className="border-b border-zinc-800 pb-6">
                      <div className="flex gap-4 mb-4">
                        <div className="relative w-20 h-20 bg-black rounded overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-[#d4af37]">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => setRemoveConfirm(item.id)}
                          className="text-red-400 hover:text-red-500 text-2xl h-fit"
                        >
                          ×
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-3 py-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-[#d4af37] hover:text-yellow-300 font-semibold w-6"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-[#d4af37] hover:text-yellow-300 font-semibold w-6"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Remove Confirmation */}
                      {removeConfirm === item.id && (
                        <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                          <p className="text-sm mb-3">Remove this item?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setRemoveConfirm(null)}
                              className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-2 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-6">
                    <div className="flex justify-between text-xl mb-8">
                      <span>Total</span>
                      <span className="font-semibold">
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <button className="w-full btn-gold py-4 rounded-2xl text-lg">
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
