"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

export default function OrderSuccess() {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [orderRef, setOrderRef] = useState<string>("");

  useEffect(() => {
    // Get reference from URL query
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference") || `biyora-${Date.now()}`;
    setOrderRef(ref);

    // Clear cart on success page load
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8">
          <span className="text-6xl">✅</span>
        </div>

        <h1 className="text-5xl font-serif mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-[#d4af37] mb-10">
          Thank you for shopping with BIYORA
        </p>

        <div className="bg-zinc-900 border border-[#d4af37]/30 rounded-3xl p-8 mb-10 text-left">
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-60">Order Reference</p>
              <p className="font-mono text-[#d4af37] break-all">{orderRef}</p>
            </div>
            <div>
              <p className="text-sm opacity-60">Payment Status</p>
              <p className="text-green-400 font-medium">✅ Payment Confirmed</p>
            </div>
            <div>
              <p className="text-sm opacity-60">Delivery</p>
              <p className="font-medium">2–5 business days within Nigeria</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-[#d4af37] hover:bg-amber-300 text-black font-medium py-4 rounded-2xl transition-all"
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => router.push("#shop")}
            className="block w-full border border-[#d4af37]/50 hover:bg-white/5 py-4 rounded-2xl transition-all"
          >
            View Collection
          </button>
        </div>

        <p className="text-sm opacity-60 mt-10">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </main>
  );
}
