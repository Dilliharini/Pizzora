import { api, USE_MOCK_DATA } from './api'
import { DELIVERY_FEE, TAX_RATE } from '../utils/format'

export const orderService = {
  async createOrder(payload) {
    // payload: { items, totals, customer, paymentMethod }
    if (USE_MOCK_DATA) {
      const id = `PZR-${Math.floor(2000 + Math.random() * 7999)}`
      await new Promise((r) => setTimeout(r, 700))
      return { id, status: 'Order Received', etaMinutes: 35, createdAt: new Date().toISOString(), demo: true }
    }
    return api.post('/orders', payload)
  },
  async getOrder(id) {
    if (USE_MOCK_DATA) return api // mock orders live in OrderContext state
    return api.get(`/orders/${id}`)
  },
  estimateTotals(subtotal) {
    const delivery = subtotal > 0 ? DELIVERY_FEE : 0
    const tax = Math.round(subtotal * TAX_RATE)
    return { subtotal, delivery, tax, total: subtotal + delivery + tax }
  },
}
