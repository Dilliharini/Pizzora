import { api, USE_MOCK_DATA } from './api'

// Mock payment flow — NO real payment processing happens. Razorpay will be
// integrated server-side later: the frontend will call
// POST /api/payments/create-order and POST /api/payments/verify.

export const paymentService = {
  async createPaymentOrder({ amount, method }) {
    await new Promise((r) => setTimeout(r, 900))
    if (USE_MOCK_DATA) {
      return {
        id: `pay_demo_${Math.random().toString(36).slice(2, 10)}`,
        amount,
        method,
        demo: true,
      }
    }
    return api.post('/payments/create-order', { amount, method })
  },
  async verifyPayment(payload) {
    if (USE_MOCK_DATA) return { verified: true, demo: true }
    return api.post('/payments/verify', payload)
  },
}
