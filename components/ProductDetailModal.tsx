"use client";

import Image from "next/image";
import { type Product } from "@/data/products";
import { useCartStore } from "@/lib/cartStore";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart 
}: ProductDetailModalProps) {
  
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className="bg-zinc-900 max-w-4xl w-full rounded-3xl overflow-hidden border border-[#d4af37]/30">
        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="relative md:w-1/2 h-96 md:h-auto">
            <Image
              src={product.image}
              alt={`${product.name} - Premium ${product.category} textile`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-colors z-10"
              aria-label="Close product details"
            >
              ×
            </button>
          </div>

          {/* Details Side */}
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="uppercase tracking-widest text-sm text-[#d4af37] mb-2">
              {product.category}
            </div>
            
            <h2 
              id={`product-title-${product.id}`}
              className="text-4xl font-serif leading-tight mb-4"
            >
              {product.name}
            </h2>
            
            <div className="text-4xl font-medium mb-6">
              ₦{product.price.toLocaleString()}
            </div>

            <p className="text-[#d4af37]/90 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-10">
              <div>
                <div className="opacity-60 text-xs uppercase tracking-wide">Material</div>
                <div className="font-medium">{product.material || "Premium Blend"}</div>
              </div>
              <div>
                <div className="opacity-60 text-xs uppercase tracking-wide">Size</div>
                <div className="font-medium">{product.size || "Standard"}</div>
              </div>
              <div>
                <div className="opacity-60 text-xs uppercase tracking-wide">Color</div>
                <div className="font-medium">{product.color || "Luxury Finish"}</div>
              </div>
              <div>
                <div className="opacity-60 text-xs uppercase tracking-wide">Delivery</div>
                <div className="font-medium">2-5 business days</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-zinc-800/50 rounded-2xl p-4 mb-8 text-sm opacity-80">
              <p>✓ Handcrafted in Nigeria | ✓ Premium Quality | ✓ Secure Checkout</p>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#d4af37] hover:bg-amber-300 active:scale-[0.98] text-black font-medium py-4 rounded-2xl transition-all text-lg"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-4 border border-[#d4af37]/30 hover:bg-white/5 rounded-2xl transition-colors"
                aria-label="Close product details"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
