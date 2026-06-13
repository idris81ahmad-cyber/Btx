'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const reference = searchParams.get('reference');
  const amount = searchParams.get('amount');
  
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!reference) {
      // Redirect if accessed directly without payment data
      const timer = setTimeout(() => router.push('/'), 4000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [reference, router]);

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto bg-green-600/20 border-2 border-green-500 rounded-full flex items-center justify-center mb-8">
          <span className="text-6xl">🎉</span>
        </div>

        <h1 className="text-5xl font-serif mb-4">Order Confirmed!</h1>
        <p className="text-xl text-[#d4af37] mb-10">Thank you for shopping with BIYORA</p>

        {reference && (
          <div className="bg-gray-900 border border-[#d4af37]/30 rounded-3xl p-8 mb-10">
            <p className="uppercase tracking-widest text-xs text-[#d4af37] mb-2">Transaction Reference</p>
            <p className="font-mono text-lg break-all mb-6 text-white">{reference}</p>

            {amount && (
              <>
                <p className="uppercase tracking-widest text-xs text-[#d4af37] mb-2">Amount Paid</p>
                <p className="text-4xl font-semibold">₦{parseInt(amount).toLocaleString()}</p>
              </>
            )}
          </div>
        )}

        <div className="text-gray-400 space-y-4 mb-12">
          <p>Your order has been received and will be processed shortly from Kano.</p>
          <p className="text-sm">You will receive order details via email or WhatsApp shortly.</p>
        </div>

        <Link
          href="/"
          className="block w-full bg-[#d4af37] hover:bg-amber-300 text-black font-semibold py-5 rounded-2xl transition-all text-lg"
        >
          Continue Shopping
        </Link>

        {countdown > 0 && (
          <p className="text-xs text-gray-500 mt-6">
            Redirecting to home in {countdown} seconds...
          </p>
        )}
      </div>
    </main>
  );
}
