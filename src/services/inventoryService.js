import { api, USE_MOCK_DATA } from './api'
import { mockInventory, mockOrders, stockStatus } from '../data/mockData'

export const inventoryService = {
  async getInventory() {
    if (USE_MOCK_DATA) return structuredClone(mockInventory)
    return api.get('/admin/inventory')
  },
  async updateItem(id, patch) {
    if (USE_MOCK_DATA) return { id, ...patch, demo: true }
    return api.patch(`/admin/inventory/${id}`, patch)
  },
  async addItem(item) {
    if (USE_MOCK_DATA) return { id: `inv-${Date.now()}`, ...item, demo: true }
    return api.post('/admin/inventory', item)
  },
  async getOrders() {
    if (USE_MOCK_DATA) return structuredClone(mockOrders)
    return api.get('/admin/orders')
  },
  async updateOrderStatus(id, status) {
    if (USE_MOCK_DATA) return { id, status, demo: true }
    return api.patch(`/admin/orders/${id}/status`, { status })
  },
  stockStatus,
}
