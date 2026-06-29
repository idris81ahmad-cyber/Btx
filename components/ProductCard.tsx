"use client";

import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onViewDetails 
}: ProductCardProps) {
  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
      <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs tracking-widest">
          {product.category}
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-3 line-clamp-2">{product.name}</h3>
        <p className="text-sm opacity-70 line-clamp-3 mb-6">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-medium">\u20a6{product.price.toLocaleString()}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-[#d4af37] hover:bg-amber-300 text-black font-medium px-8 py-3.5 rounded-2xl transition-all active:scale-95 text-sm tracking-wider"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
