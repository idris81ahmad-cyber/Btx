import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products, type Product } from '@/data/products';

export type CartItem = Product & { quantity: number };

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  // ADDED: New utility methods
  getCartItemCount: (id: number) => number;
  isInCart: (id: number) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      /**
       * Add a product to the cart
       * If product already exists, increment quantity
       */
      addToCart: (product) => {
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }
        });
      },

      /**
       * Remove a product from the cart entirely
       */
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      /**
       * Update quantity for a cart item
       * IMPROVED: Validates quantity is at least 1
       */
      updateQuantity: (id, quantity) => {
        // IMPROVED: Prevent invalid quantities
        if (quantity < 1) {
          console.warn(`Invalid quantity ${quantity} for product ${id}. Minimum is 1.`);
          return;
        }

        // IMPROVED: Prevent unreasonably large quantities
        if (quantity > 999) {
          console.warn(`Quantity ${quantity} exceeds maximum (999). Setting to 999.`);
          quantity = 999;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      /**
       * Clear all items from the cart
       */
      clearCart: () => set({ cart: [] }),

      /**
       * Calculate total price of all items in cart
       * Returns total in NGN
       */
      getTotalPrice: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      /**
       * Get total number of items in cart (sum of quantities)
       */
      getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      /**
       * ADDED: Get quantity of specific product in cart
       */
      getCartItemCount: (id) => {
        const item = get().cart.find((item) => item.id === id);
        return item?.quantity || 0;
      },

      /**
       * ADDED: Check if product is in cart
       */
      isInCart: (id) => {
        return get().cart.some((item) => item.id === id);
      },
    }),
    {
      name: 'biyora-cart', // localStorage key
      // IMPROVED: Add version for future migrations
      version: 1,
    }
  )
);
