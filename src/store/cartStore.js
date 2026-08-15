import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { totalWithGst } from '../lib/pricing'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const id = `${item.slug}-${Date.now()}`
        set({ items: [...get().items, { ...item, cartId: id, qty: 1 }] })
      },
      removeItem: (cartId) => set({ items: get().items.filter((i) => i.cartId !== cartId) }),
      updateQty: (cartId, qty) =>
        set({
          items: get().items.map((i) => (i.cartId === cartId ? { ...i, qty: Math.max(1, qty) } : i)),
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((n, i) => n + totalWithGst(i.price) * i.qty, 0),
    }),
    { name: 'smjn-cart' },
  ),
)
