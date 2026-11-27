import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ChevronDown, Eye, Search } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import Modal from '../../components/ui/Modal'
import { mockOrders, ORDER_STATUSES } from '../../data/mockData'
import { useOrders } from '../../context/OrderContext'
import { formatINR } from '../../utils/format'

const PAYMENT_COLORS = {
  Paid: 'bg-emerald-500/15 text-emerald-400',
  Pending: 'bg-accent-warm/15 text-accent-warm',
  Refunded: 'bg-white/10 text-muted',
}

export default function AdminOrders() {
  const { orders, updateStatus } = useOrders()
  // Seed local state from mock data once; admin edits reflect live in customer tracking.
  const [list, setList] = useState(mockOrders)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [viewing, setViewing] = useState(null)

  const changeStatus = (id, status) => {
    setList((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    updateStatus(id, status)
    toast.success(`${id} marked "${status}"`)
  }

  const filtered = useMemo(
    () =>
      list.filter(
        (o) =>
          (statusFilter === 'All' || o.status === statusFilter) &&
          (!query ||
            o.id.toLowerCase().includes(query.toLowerCase()) ||
            o.customer.toLowerCase().includes(query.toLowerCase()))
      ),
    [list, query, statusFilter]
  )

  return (
    <AdminLayout title="Order Management" subtitle="All customer orders — demo data">
      {/* Controls */}
      <div className="flex flex-col gap-3 rounded-3xl border border-line bg-bg-secondary p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="h-11 w-full rounded-full border border-line bg-card pl-11 pr-4 text-sm text-cream placeholder:text-muted/60 outline-none focus:border-accent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', ...ORDER_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3.5 py-2 text-xs font-bold transition-all ${
                statusFilter === s ? 'bg-accent text-cream' : 'border border-line text-muted hover:text-cream'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 overflow-hidden rounded-3xl border border-line bg-bg-secondary"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Payment</th>
                <th className="px-6 py-4 font-bold">Update Status</th>
                <th className="px-6 py-4 font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-line/50 transition-colors hover:bg-white/[0.03]">
                  <td className="px-6 py-4 font-bold text-cream">{o.id}</td>
                  <td className="px-6 py-4 text-cream/85">{o.customer}</td>
                  <td className="px-6 py-4 text-muted">{o.date}</td>
                  <td className="px-6 py-4 font-semibold text-cream">{formatINR(o.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${PAYMENT_COLORS[o.paymentStatus]}`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        value={o.status}
                        onChange={(e) => changeStatus(o.id, e.target.value)}
                        className="cursor-pointer appearance-none rounded-full border border-line bg-card py-2 pl-4 pr-9 text-xs font-bold text-cream outline-none focus:border-accent"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setViewing(o)}
                      aria-label={`View ${o.id}`}
                      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-muted">No orders match your search.</p>
        )}
      </motion.div>

      {/* Detail modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title={`Order ${viewing?.id}`}>
        {viewing && (
          <div className="space-y-5 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Customer', viewing.customer],
                ['Phone', viewing.phone],
                ['Date', `${viewing.date} · ${viewing.time}`],
                ['Payment', `${viewing.paymentMethod} — ${viewing.paymentStatus}`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-wider text-muted">{k}</p>
                  <p className="mt-1 font-semibold text-cream">{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-wider text-muted">Delivery address</p>
              <p className="mt-1 font-semibold text-cream">{viewing.address}</p>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-muted">Items</p>
              <ul className="space-y-2">
                {viewing.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                    <span className="text-cream/85">
                      {i.name} <span className="text-muted">× {i.qty}</span>
                    </span>
                    <span className="font-semibold text-cream">{formatINR(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between border-t border-line pt-4">
              <span className="font-display text-lg font-semibold text-cream">Total</span>
              <span className="font-display text-xl font-bold text-accent-warm">
                {formatINR(viewing.amount)}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}
