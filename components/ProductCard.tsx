"use client";

import Image from "next/image";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  return (
    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all duration-300">
      <div className="relative h-80 overflow-hidden bg-black">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false}
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

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-medium">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 px-4 py-3 rounded-xl text-sm border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 btn-gold px-4 py-3 rounded-xl text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
