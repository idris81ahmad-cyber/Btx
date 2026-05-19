"use client";

import { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useCartStore } from "@/lib/cartStore";

interface PaystackButtonProps {
  email: string;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

export default function PaystackButton({ email, onSuccess, onClose }: PaystackButtonProps) {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = getTotalPrice();

  const initializePayment = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setIsProcessing(true);

    const popup = new PaystackPop();

    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_key_here", // Replace with your key
      email,
      amount: totalAmount * 100, // Paystack expects amount in kobo (₦1 = 100)
      currency: "NGN",
      reference: `biyora-${Date.now()}`,
      metadata: {
        cart_items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        custom_fields: [
          {
            display_name: "Customer Source",
            variable_name: "source",
            value: "Biyora Website"
          }
        ]
      },
      onSuccess: (transaction: any) => {
        setIsProcessing(false);
        alert(`Payment successful! Reference: ${transaction.reference}`);
        
        // Clear cart after successful payment
        clearCart();
        
        if (onSuccess) onSuccess(transaction.reference);
      },
      onCancel: () => {
        setIsProcessing(false);
        alert("Payment cancelled");
        if (onClose) onClose();
      }
    });
  };

  return (
    <button
      onClick={initializePayment}
      disabled={isProcessing || totalAmount === 0}
      className="w-full bg-[#d4af37] hover:bg-amber-300 disabled:bg-gray-600 text-black font-medium py-4 rounded-2xl text-lg transition-all disabled:cursor-not-allowed"
    >
      {isProcessing ? "Processing..." : `Pay ₦${totalAmount.toLocaleString()}`}
    </button>
  );
}
