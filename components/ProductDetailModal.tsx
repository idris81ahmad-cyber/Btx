'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart 
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
      <div className="modal bg-gray-900 max-w-4xl w-full rounded-3xl overflow-hidden border border-[#d4af37]/20">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Side */}
          <div className="p-8 md:p-12 flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="uppercase tracking-[3px] text-sm text-[#d4af37] mb-2">{product.category}</div>
            
            <h2 className="text-4xl font-serif leading-tight mb-6">{product.name}</h2>

            <div className="text-4xl font-semibold mb-8">\u20a6{product.price.toLocaleString()}</div>

            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-[#d4af37] text-sm mb-2">DESCRIPTION</h4>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-[#d4af37]">Material:</span><br />
                  {product.material}
                </div>
                <div>
                  <span className="text-[#d4af37]">Size:</span><br />
                  {product.size}
                </div>
                <div>
                  <span className="text-[#d4af37]">Color:</span><br />
                  {product.color}
                </div>
                <div>
                  <span className="text-[#d4af37]">Stock:</span><br />
                  {product.inStock ? 'Available' : 'Out of Stock'}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#d4af37] font-medium">Quantity:</span>
              <div className="flex items-center border border-[#d4af37]/30 rounded-2xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 hover:bg-white/5 rounded-l-2xl transition-all"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-8 font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 hover:bg-white/5 rounded-r-2xl transition-all"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[#d4af37] hover:bg-amber-300 disabled:bg-gray-700 text-black font-semibold py-5 rounded-2xl text-lg transition-all active:scale-[0.98]"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <p className="text-center text-xs text-gray-500 mt-6">
              Secure payment powered by Paystack • Ships from Kano
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
