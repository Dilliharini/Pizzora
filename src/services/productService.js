import { api, USE_MOCK_DATA } from './api'
import { pizzas, pizzaBuilderOptions, CUSTOM_BASE_PRICE } from '../data/products'

export const productService = {
  async getProducts() {
    if (USE_MOCK_DATA) return structuredClone(pizzas)
    return api.get('/products')
  },
  async getProduct(id) {
    if (USE_MOCK_DATA) {
      const p = pizzas.find((x) => x.id === id)
      if (!p) throw new Error('Pizza not found')
      return { ...p }
    }
    return api.get(`/products/${id}`)
  },
  async getBuilderOptions() {
    if (USE_MOCK_DATA) return structuredClone(pizzaBuilderOptions)
    return api.get('/products/builder-options')
  },
  calculateCustomPrice({ base, sauce, cheese, toppings }) {
    if (!base || !sauce || !cheese) return CUSTOM_BASE_PRICE
    const toppingSum = (toppings || []).reduce((s, t) => s + t.price, 0)
    return CUSTOM_BASE_PRICE + base.price + sauce.price + cheese.price + toppingSum
  },
}
