/**
 * Validation utilities for BIYORA e-commerce
 * Simple, reusable validation functions
 */

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Get email validation error message
export const getEmailError = (email: string): string | null => {
  if (!email.trim()) {
    return "Email address is required";
  }
  if (email.length > 254) {
    return "Email address is too long";
  }
  if (!isValidEmail(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

// Validate quantity
export const isValidQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= 999;
};

// Get quantity error message
export const getQuantityError = (quantity: number): string | null => {
  if (!Number.isInteger(quantity)) {
    return "Quantity must be a whole number";
  }
  if (quantity < 1) {
    return "Quantity must be at least 1";
  }
  if (quantity > 999) {
    return "Quantity cannot exceed 999";
  }
  return null;
};

// Validate price
export const isValidPrice = (price: number): boolean => {
  return price > 0 && price <= 10000000;
};

// Format price to NGN
export const formatPrice = (amount: number): string => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

// Convert naira to kobo (for Paystack)
export const nairaToKobo = (naira: number): number => {
  return Math.round(naira * 100);
};

// Sanitize input (prevent XSS)
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "").trim().substring(0, 255);
};

// Check if cart is valid for checkout
export const validateCartForCheckout = (cart: any[], email: string): { valid: boolean; error: string | null } => {
  if (!cart || cart.length === 0) {
    return { valid: false, error: "Your cart is empty" };
  }

  const emailError = getEmailError(email);
  if (emailError) {
    return { valid: false, error: emailError };
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (totalPrice <= 0) {
    return { valid: false, error: "Invalid cart total" };
  }

  return { valid: true, error: null };
};

// Generate unique order reference
export const generateOrderReference = (): string => {
  return `biyora-${Date.now()}`;
};

// Get user-friendly Paystack error message
export const getPaystackErrorMessage = (error: any): string => {
  if (!error) return "An unexpected error occurred. Please try again.";

  if (typeof error === "string") return error;

  const message = error.message || "";

  if (message.includes("closed")) {
    return "Payment was cancelled. Your cart is still saved.";
  }
  if (message.includes("timeout")) {
    return "Payment request timed out. Please try again.";
  }
  if (message.includes("network")) {
    return "Network error. Please check your connection and try again.";
  }

  return error.message || "Payment failed. Please try again.";
};

// Validate Nigerian phone number
export const isValidNigerianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\s/g, "");
  const phoneRegex = /^(\+234|234|0)[789]\d{9}$/;
  return phoneRegex.test(cleaned);
};

// Check if amount is reasonable
export const isReasonableAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000000;
};
