import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'pizzora_cart_v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const key = item.signature || item.id
      const existing = prev.find((i) => (i.signature || i.id) === key)
      if (existing) {
        return prev.map((i) =>
          (i.signature || i.id) === key ? { ...i, qty: i.qty + (item.qty || 1) } : i
        )
      }
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }, [])

  const updateQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])

  const value = useMemo(
    () => ({ items, addItem, updateQty, removeItem, clear, count, subtotal }),
    [items, addItem, updateQty, removeItem, clear, count, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
