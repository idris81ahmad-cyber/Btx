"use client";

import Image from "next/image";
import { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Close Button */}
        <div className="sticky top-0 flex justify-end p-4 border-b border-zinc-800 bg-zinc-950">
          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-[#d4af37] transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="relative h-96 bg-black rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-sm uppercase tracking-widest text-[#d4af37] mb-2">
                  {product.category}
                </div>
                <h2 className="text-4xl font-serif mb-4">{product.name}</h2>

                <p className="text-2xl font-semibold text-[#d4af37] mb-6">
                  ₦{product.price.toLocaleString()}
                </p>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Product Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <span className="text-gray-400">Material</span>
                    <span className="font-semibold text-[#d4af37]">
                      {product.material || "Premium Textile"}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <span className="text-gray-400">Size</span>
                    <span className="font-semibold text-[#d4af37]">
                      {product.size || "Standard"}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <span className="text-gray-400">Color</span>
                    <span className="font-semibold text-[#d4af37]">
                      {product.color || "Assorted"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 btn-gold px-6 py-3 rounded-xl font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
