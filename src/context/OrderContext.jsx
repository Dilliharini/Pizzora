import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const OrderContext = createContext(null)

const STAGES = ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered']

// Mock order store shared between admin order management and customer tracking.
// Later: replace with Socket.IO subscriptions + REST polling.

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [liveOrders, setLiveOrders] = useState([])

  const createOrder = useCallback((order) => {
    setOrders((prev) => [{ ...order, demo: true }, ...prev])
    return order
  }, [])

  const updateStatus = useCallback((id, status) => {
    const apply = (list) =>
      list.map((o) => (o.id === id ? { ...o, status } : o))
    setOrders(apply)
    setLiveOrders(apply)
  }, [])

  // Local simulation of kitchen progression for the tracking demo
  const advanceStage = useCallback((id) => {
    const apply = (list) =>
      list.map((o) => {
        if (o.id !== id) return o
        const idx = STAGES.indexOf(o.status)
        return idx < STAGES.length - 1 ? { ...o, status: STAGES[idx + 1] } : o
      })
    setOrders(apply)
    setLiveOrders(apply)
  }, [])

  const value = useMemo(
    () => ({
      orders,
      liveOrders,
      stages: STAGES,
      createOrder,
      updateStatus,
      advanceStage,
    }),
    [orders, liveOrders, createOrder, updateStatus, advanceStage]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
