import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChefHat, CircleCheck, Package, Bike, MapPin, ReceiptText, Clock, Sparkles } from 'lucide-react'
import Button from '../../components/ui/Button'
import DemoBadge from '../../components/ui/DemoBadge'
import { useOrders } from '../../context/OrderContext'
import { formatINR } from '../../utils/format'

const STAGE_META = [
  { label: 'Order Received', icon: CircleCheck, blurb: 'We got your order and confirmed it.' },
  { label: 'In Kitchen', icon: ChefHat, blurb: 'Hand-stretched, sauced and into the oven.' },
  { label: 'Sent to Delivery', icon: Bike, blurb: 'Boxed hot and handed to your rider.' },
  { label: 'Delivered', icon: Package, blurb: 'Enjoy! It has been a pleasure.' },
]

const DEMO_ORDER = {
  id: 'PZR-2088',
  status: 'In Kitchen',
  etaMinutes: 35,
  items: [{ name: 'Margherita Classic', qty: 1, price: 349 }, { name: 'Fiery Peri Peri', qty: 1, price: 599 }],
  amount: 1021,
  address: '12 Artisan Lane, Lower Parel, Mumbai',
  demo: true,
}

export default function OrderTracking() {
  const [params] = useSearchParams()
  const { orders } = useOrders()
  const id = params.get('id')
  const order = useMemo(
    () => orders.find((o) => o.id === id) || (id ? null : DEMO_ORDER),
    [orders, id]
  )
  const [stage, setStage] = useState(0)

  // Simulated kitchen progression. Later: subscribe to Socket.IO events instead.
  useEffect(() => {
    if (!order) return
    const start = STAGE_META.findIndex((s) => s.label === order.status)
    setStage(start < 0 ? 0 : start)
    const timer = setInterval(() => {
      setStage((s) => (s < STAGE_META.length - 1 ? s + 1 : s))
    }, 8000)
    return () => clearInterval(timer)
  }, [order])

  if (!order) {
    return (
      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-2xl px-5 pb-24 text-center sm:px-8">
          <ReceiptText size={44} className="mx-auto text-accent/50" />
          <h1 className="mt-4 font-display text-3xl font-bold text-cream">Order not found</h1>
          <p className="mt-2 text-muted">
            We could not find order {id}. Place an order first, then track it here.
          </p>
          <Button to="/menu" className="mt-6">
            Browse Menu
          </Button>
        </div>
      </main>
    )
  }

  const eta = Math.max(5, order.etaMinutes - stage * 10)

  return (
    <main className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display text-4xl font-bold text-cream">Track Order</h1>
          <DemoBadge />
        </div>
        <p className="mt-3 text-sm text-muted">
          Live stage simulation — a real connection will stream updates via Socket.IO later.
        </p>

        {/* Status card */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-3xl border border-line bg-gradient-to-br from-bg-secondary to-card p-8 sm:p-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted">Order ID</p>
              <p className="mt-1 font-display text-3xl font-bold text-cream">{order.id}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2">
              <Clock size={15} className="text-accent-warm" />
              <span className="text-sm font-bold text-accent-warm">ETA ~{eta} min</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative mt-12">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-line sm:left-0 sm:top-6 sm:h-0.5 sm:w-full" />
            <motion.div
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-accent to-accent-warm sm:left-0 sm:top-6 sm:h-0.5 sm:w-full sm:bg-gradient-to-r"
              initial={false}
              animate={{ height: `calc(${(stage / (STAGE_META.length - 1)) * 100}%)` }}
              style={{ width: undefined }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="hidden sm:block" />
            </motion.div>
            <div className="grid gap-10 sm:grid-cols-4 sm:gap-4">
              {STAGE_META.map((s, i) => {
                const done = i < stage
                const active = i === stage
                const Icon = s.icon
                return (
                  <div key={s.label} className="relative flex gap-4 sm:flex-col sm:items-start">
                    <span
                      className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 transition-all duration-500 ${
                        done
                          ? 'border-accent bg-accent text-cream'
                          : active
                            ? 'border-accent bg-bg text-accent'
                            : 'border-line bg-bg-secondary text-muted'
                      }`}
                    >
                      {done ? <Check size={18} strokeWidth={3} /> : <Icon size={19} />}
                      {active && (
                        <motion.span
                          className="absolute inset-0 rounded-full border-2 border-accent"
                          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                      )}
                    </span>
                    <div className="sm:mt-3">
                      <p className={`text-sm font-bold ${i <= stage ? 'text-cream' : 'text-muted'}`}>
                        {s.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{s.blurb}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-10 flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-3.5 text-sm font-semibold text-accent-warm"
            >
              <Sparkles size={16} />
              {STAGE_META[stage].label} — {STAGE_META[stage].blurb}
            </motion.p>
          </AnimatePresence>
        </motion.section>

        {/* Details */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-line bg-bg-secondary p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
              <ReceiptText size={18} className="text-accent" /> Order Details
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {order.items.map((i, idx) => (
                <li key={idx} className="flex justify-between gap-4">
                  <span className="text-cream/85">
                    {i.name} <span className="text-muted">× {i.qty}</span>
                  </span>
                  <span className="font-semibold text-cream">{formatINR(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between border-t border-line pt-4">
              <span className="font-display text-lg font-semibold text-cream">Total paid</span>
              <span className="font-display text-xl font-bold text-accent-warm">
                {formatINR(order.amount)}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted">
              Payment: {order.paymentMethod || 'Razorpay (Demo)'} · {order.paymentStatus || 'Paid'}
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-bg-secondary p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
              <MapPin size={18} className="text-accent" /> Delivering To
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cream/85">{order.address}</p>
            <p className="mt-2 text-xs text-muted">
              Placed on {order.date} at {order.time || '—'}
            </p>
            <div className="mt-6">
              <Button to="/menu" variant="secondary">
                Order Something Else
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
