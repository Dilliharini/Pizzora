import { api, USE_MOCK_DATA } from './api'
import { DEMO_CREDENTIALS } from '../data/products'

const DEMO_KEY = 'pizzora_demo_user'

// Demo auth adapter — clearly NOT secure. Passwords are not stored anywhere;
// any email/password pair is accepted for preview purposes. Real authentication
// (JWT + httpOnly cookies) will be enforced by the Express backend later.

function delay(ms = 600) {
  return new Promise((r) => setTimeout(r, ms))
}

function makeUser({ name, email }) {
  return { id: `demo-${Date.now()}`, name: name || email.split('@')[0].replace(/[._]/g, ' '), email, role: 'customer' }
}

export const authService = {
  async register({ name, email }) {
    await delay()
    if (USE_MOCK_DATA) {
      const user = makeUser({ name, email })
      sessionStorage.setItem(DEMO_KEY, JSON.stringify(user))
      return { user, demo: true }
    }
    return api.post('/auth/register', { name, email, password })
  },
  async login({ email, remember }) {
    await delay()
    if (USE_MOCK_DATA) {
      const user = makeUser({ email })
      const store = remember ? localStorage : sessionStorage
      store.setItem(DEMO_KEY, JSON.stringify(user))
      return { user, demo: true }
    }
    return api.post('/auth/login', { email, password })
  },
  async adminLogin({ email }) {
    await delay()
    if (USE_MOCK_DATA) {
      const user = { ...makeUser({ email }), role: 'admin' }
      sessionStorage.setItem(DEMO_KEY, JSON.stringify(user))
      return { user, demo: true }
    }
    return api.post('/auth/admin/login', { email, password })
  },
  async forgotPassword(email) {
    await delay()
    if (USE_MOCK_DATA) return { sent: true, demo: true }
    return api.post('/auth/forgot-password', { email })
  },
  getStoredUser() {
    try {
      const raw = sessionStorage.getItem(DEMO_KEY) || localStorage.getItem(DEMO_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
  logout() {
    sessionStorage.removeItem(DEMO_KEY)
    localStorage.removeItem(DEMO_KEY)
  },
}
