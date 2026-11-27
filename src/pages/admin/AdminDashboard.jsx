import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { IndianRupee, ShoppingBag, PackageCheck, AlertTriangle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { weeklyTrend, revenueByDay, popularPizzas, mockOrders, mockInventory, stockStatus, ORDER_STATUSES } from '../../data/mockData'
import { formatINR } from '../../utils/format'

const tooltipStyle = {
  backgroundColor: '#24211e',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  fontSize: '13px',
  color: '#f8f1e8',
}

export default function AdminDashboard() {
  const lowStock = mockInventory.filter((i) => stockStatus(i) !== 'In Stock')

  const stats = useMemo(
    () => [
      { label: 'Total Orders', value: mockOrders.length.toString(), icon: ShoppingBag, accent: 'text-accent bg-accent/12' },
      { label: 'Revenue', value: formatINR(mockOrders.reduce((s, o) => s + o.amount, 0)), icon: IndianRupee, accent: 'text-emerald-400 bg-emerald-400/12' },
      { label: 'Active Orders', value: mockOrders.filter((o) => o.status !== 'Delivered').length.toString(), icon: PackageCheck, accent: 'text-accent-warm bg-accent-warm/12' },
      { label: 'Low Stock Items', value: lowStock.length.toString(), icon: AlertTriangle, accent: 'text-red-400 bg-red-400/12' },
    ],
    [lowStock.length]
  )

  return (
    <AdminLayout
      title="Overview"
      subtitle="Store performance at a glance — demo data"
      active="dashboard"
    >
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-3xl border border-line bg-bg-secondary p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-muted">{label}</p>
              <span className={`grid size-10 place-items-center rounded-xl ${accent}`}>
                <Icon size={18} />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-cream">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-line bg-bg-secondary p-6"
        >
          <h2 className="font-display text-lg font-semibold text-cream">Weekly Order Trends</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="day" stroke="#a69d92" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a69d92" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(233,75,50,0.3)' }} />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#e94b32"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#e94b32' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-line bg-bg-secondary p-6"
        >
          <h2 className="font-display text-lg font-semibold text-cream">Revenue Overview</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByDay}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#a69d92" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a69d92" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(233,75,50,0.08)' }} formatter={(v) => [formatINR(v), 'Revenue']} />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                  {revenueByDay.map((_, i) => (
                    <Cell key={i} fill={i >= 4 ? '#f4a340' : '#e94b32'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl border border-line bg-bg-secondary p-6 xl:col-span-2"
        >
          <h2 className="font-display text-lg font-semibold text-cream">Popular Pizzas</h2>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularPizzas} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" stroke="#a69d92" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#a69d92" fontSize={12} tickLine={false} axisLine={false} width={160} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(244,163,64,0.08)' }} />
                <Bar dataKey="orders" fill="#f4a340" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </div>

      {/* Recent orders */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 overflow-hidden rounded-3xl border border-line bg-bg-secondary"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="font-display text-lg font-semibold text-cream">Recent Orders</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-muted">Last 7 entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-y border-line text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-3 font-bold">Order ID</th>
                <th className="px-6 py-3 font-bold">Customer</th>
                <th className="px-6 py-3 font-bold">Date</th>
                <th className="px-6 py-3 font-bold">Amount</th>
                <th className="px-6 py-3 font-bold">Payment</th>
                <th className="px-6 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((o) => (
                <tr key={o.id} className="border-b border-line/50 transition-colors hover:bg-white/[0.03]">
                  <td className="px-6 py-4 font-bold text-cream">{o.id}</td>
                  <td className="px-6 py-4 text-cream/85">{o.customer}</td>
                  <td className="px-6 py-4 text-muted">{o.date}</td>
                  <td className="px-6 py-4 font-semibold text-cream">{formatINR(o.amount)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        o.paymentStatus === 'Paid'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : o.paymentStatus === 'Refunded'
                            ? 'bg-white/10 text-muted'
                            : 'bg-accent-warm/15 text-accent-warm'
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-accent/15 text-accent'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </AdminLayout>
  )
}
