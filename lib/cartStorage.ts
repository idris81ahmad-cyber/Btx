import { Product } from "@/data/products";

export type CartItem = Product & {
  quantity: number;
};

const CART_STORAGE_KEY = "biyora_cart";

export const cartStorage = {
  getCart: (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveCart: (cart: CartItem[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      console.error("Failed to save cart to localStorage");
    }
  },

  clearCart: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      console.error("Failed to clear cart from localStorage");
    }
  },

  addItem: (product: Product): CartItem[] => {
    const cart = cartStorage.getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    cartStorage.saveCart(cart);
    return cart;
  },

  removeItem: (productId: number): CartItem[] => {
    const cart = cartStorage.getCart();
    const filtered = cart.filter((item) => item.id !== productId);
    cartStorage.saveCart(filtered);
    return filtered;
  },

  updateQuantity: (productId: number, quantity: number): CartItem[] => {
    const cart = cartStorage.getCart();
    const item = cart.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return cartStorage.removeItem(productId);
      }
      item.quantity = quantity;
      cartStorage.saveCart(cart);
    }

    return cart;
  },

  getTotalPrice: (cart: CartItem[]): number => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: (cart: CartItem[]): number => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
};
