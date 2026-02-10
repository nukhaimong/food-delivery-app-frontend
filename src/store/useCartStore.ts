import { CartMeal } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem extends CartMeal {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (meal: CartMeal) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (meal) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === meal.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === meal.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { ...meal, quantity: 1 }] });
        }
      },

      updateQuantity: (id, delta) => {
        set({
          items: get().items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        });
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: 'food-cart-storage',
    },
  ),
);
