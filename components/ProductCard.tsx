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
    <div 
      onClick={() => onViewDetails(product)}
      className="group bg-zinc-900 rounded-3xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.08]"
        />
        
        {/* Category Badge */}
        <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs tracking-[2px] border border-[#d4af37]/30">
          {product.category}
        </div>

        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
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
              \u20a6{product.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-[#d4af37] hover:bg-white active:bg-amber-300 text-black font-semibold px-7 py-3.5 rounded-2xl text-sm transition-all active:scale-[0.985]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
