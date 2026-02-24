import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product, Order } from '../types'

interface CartContextValue {
  items: CartItem[]
  subtotal: number
  itemCount: number
  lastOrder?: Order
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setLastOrder: (order: Order | undefined) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [lastOrder, setLastOrderState] = useState<Order | undefined>(undefined)

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i,
      ),
    )
  }

  const clearCart = () => setItems([])

  const setLastOrder = (order: Order | undefined) => {
    setLastOrderState(order)
  }

  const { subtotal, itemCount } = useMemo(() => {
    const subtotalValue = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )
    const itemCountValue = items.reduce((sum, item) => sum + item.quantity, 0)
    return { subtotal: subtotalValue, itemCount: itemCountValue }
  }, [items])

  const value: CartContextValue = {
    items,
    subtotal,
    itemCount,
    lastOrder,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLastOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}

