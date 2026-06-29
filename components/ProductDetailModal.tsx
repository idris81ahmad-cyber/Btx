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
    <div 
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="modal bg-zinc-900 max-w-5xl w-full rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-2xl animate-in zoom-in-95 fade-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="relative bg-black flex items-center justify-center p-8 md:p-12">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] w-full object-contain rounded-2xl"
            />
          </div>

          {/* Details Side */}
          <div className="p-8 md:p-10 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="uppercase tracking-[3px] text-xs text-[#d4af37] mb-1">{product.category}</div>
                <h2 className="text-4xl font-serif tracking-[-1px] leading-none pr-8">
                  {product.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-3xl text-gray-400 hover:text-white transition-colors mt-1"
              >
                ×
              </button>
            </div>

            <div className="text-5xl font-semibold tracking-tighter mb-8 text-[#d4af37]">
              \u20a6{product.price.toLocaleString()}
            </div>

            <div className="space-y-8 mb-10 flex-1">
              <div>
                <div className="uppercase tracking-[2px] text-xs text-[#d4af37] mb-2">Description</div>
                <p className="text-gray-300 leading-relaxed text-[15px]">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm">
                <div>
                  <div className="text-[#d4af37] text-xs tracking-widest mb-1">MATERIAL</div>
                  <div className="font-medium">{product.material}</div>
                </div>
                <div>
                  <div className="text-[#d4af37] text-xs tracking-widest mb-1">SIZE</div>
                  <div className="font-medium">{product.size}</div>
                </div>
                <div>
                  <div className="text-[#d4af37] text-xs tracking-widest mb-1">COLOR</div>
                  <div className="font-medium">{product.color}</div>
                </div>
                <div>
                  <div className="text-[#d4af37] text-xs tracking-widest mb-1">AVAILABILITY</div>
                  <div className={`font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-5">
                <div className="text-sm text-[#d4af37] tracking-widest">QUANTITY</div>
                <div className="flex items-center border border-[#d4af37]/30 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-white/5 active:bg-white/10 transition-colors text-xl leading-none"
                  >−</button>
                  <div className="px-6 font-mono text-lg border-x border-[#d4af37]/30">{quantity}</div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 hover:bg-white/5 active:bg-white/10 transition-colors text-xl leading-none"
                  >+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-[#d4af37] hover:bg-white disabled:bg-gray-700 disabled:text-gray-400 text-black font-semibold py-5 rounded-3xl text-lg transition-all active:scale-[0.985]"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <p className="text-center text-xs text-gray-500 mt-5 tracking-wider">
                Ships from Kano, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
