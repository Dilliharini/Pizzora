export const formatINR = (n) =>
  `₹${Number(n || 0).toLocaleString('en-IN')}`

export const DELIVERY_FEE = 49
export const TAX_RATE = 0.05

export const cartTotals = (items = []) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0
  const tax = Math.round(subtotal * TAX_RATE)
  return { subtotal, delivery, tax, total: subtotal + delivery + tax }
}
