import { CartItem } from '@/lib/cartStore';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  email?: string; // for cases where email might come from elsewhere
}

export function validateCartForCheckout(cart: CartItem[]): ValidationResult {
  if (!cart || cart.length === 0) {
    return {
      isValid: false,
      error: "Your cart is empty. Add some products to continue."
    };
  }

  // Basic quantity validation
  const invalidItem = cart.find(item => !item.quantity || item.quantity < 1);
  if (invalidItem) {
    return {
      isValid: false,
      error: `Invalid quantity for ${invalidItem.name}`
    };
  }

  // You can add more validations here (stock check, total limit, etc.)

  return {
    isValid: true,
    error: undefined
  };
}

export function calculateTotalInKobo(cart: CartItem[]): number {
  return Math.round(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
  );
}
