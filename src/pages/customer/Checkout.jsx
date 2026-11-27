import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Banknote, CreditCard, Loader2, Lock, MapPin, Phone, ShoppingBag, User } from 'lucide-react'
import Button from '../../components/ui/Button'
import DemoBadge from '../../components/ui/DemoBadge'
import EmptyState from '../../components/ui/EmptyState'
import PizzaImage from '../../components/ui/PizzaImage'
import { useCart } from '../../context/CartContext'
import { useOrders } from '../../context/OrderContext'
import { paymentService } from '../../services/paymentService'
import { cartTotals, formatINR } from '../../utils/format'

const PAYMENT_METHODS = [
  { id: 'razorpay', label: 'Razorpay', desc: 'Cards, UPI, netbanking & wallets', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your pizza arrives', icon: Banknote },
]

export default function Checkout() {
  const { items, clear } = useCart()
  const totals = cartTotals(items)
  const { createOrder } = useOrders()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' })
  const [method, setMethod] = useState('razorpay')
  const [paying, setPaying] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const valid =
    form.name.trim().length > 1 &&
    /^\d{10}$/.test(form.phone.replace(/\s/g, '')) &&
    form.address.trim().length > 5 &&
    form.city.trim().length > 1 &&
    /^\d{6}$/.test(form.pincode)

  if (items.length === 0) {
    return (
      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
          <h1 className="font-display text-4xl font-bold text-cream">Checkout</h1>
          <div className="mt-10">
            <EmptyState
              icon={ShoppingBag}
              title="Nothing to check out"
              text="Your cart is empty. Add a pizza first, then come back."
              action={<Button to="/menu">Browse Menu</Button>}
            />
          </div>
        </div>
      </main>
    )
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!valid) {
      toast.error('Please fill all delivery details correctly')
      return
    }
    setPaying(true)
    try {
      const payment = await paymentService.createPaymentOrder({ amount: totals.total, method })
      const order = {
        id: `PZR-${Math.floor(2000 + Math.random() * 7999)}`,
        customer: form.name,
        phone: form.phone,
        address: `${form.address}, ${form.city} - ${form.pincode}`,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: totals.total,
        paymentStatus: method === 'cod' ? 'Pending' : 'Paid',
        paymentMethod: method === 'cod' ? 'Cash on Delivery' : 'Razorpay (Demo)',
        status: 'Order Received',
        items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      }
      createOrder(order)
      await paymentService.verifyPayment({ paymentId: payment.id })
      clear()
      toast.success('Order placed successfully!')
      navigate(`/order-tracking?id=${order.id}`)
    } catch {
      toast.error('Payment failed. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  const inputCls =
    'h-12 w-full rounded-xl border border-line bg-card px-4 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-accent'

  return (
    <main className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display text-4xl font-bold text-cream">Checkout</h1>
          <DemoBadge />
        </div>
        <p className="mt-3 max-w-xl text-sm text-muted">
          This is a <strong className="text-cream">demo payment flow</strong> — no real money moves.
          Razorpay will be wired to a live backend API later.
        </p>

        <form onSubmit={placeOrder} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {/* Delivery address */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-line bg-bg-secondary p-6 sm:p-8"
            >
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
                <MapPin size={19} className="text-accent" /> Delivery Address
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                    Full name
                  </label>
                  <input required value={form.name} onChange={set('name')} placeholder="Aarav Mehta" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                    Street address
                  </label>
                  <input required value={form.address} onChange={set('address')} placeholder="Flat 4B, Sunrise Apartments, Hill Road" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                    City
                  </label>
                  <input required value={form.city} onChange={set('city')} placeholder="Mumbai" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                    Pincode
                  </label>
                  <input
                    required
                    value={form.pincode}
                    onChange={set('pincode')}
                    placeholder="400050"
                    inputMode="numeric"
                    maxLength={6}
                    className={inputCls}
                  />
                </div>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="rounded-3xl border border-line bg-bg-secondary p-6 sm:p-8"
            >
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
                <Phone size={19} className="text-accent" /> Contact Details
              </h2>
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                  Phone number (10 digits)
                </label>
                <input
                  required
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="98200 11223"
                  inputMode="tel"
                  className={inputCls}
                />
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <User size={12} /> The delivery partner may call this number.
                </p>
              </div>
            </motion.section>

            {/* Payment */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="rounded-3xl border border-line bg-bg-secondary p-6 sm:p-8"
            >
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-cream">
                <CreditCard size={19} className="text-accent" /> Payment Method
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map(({ id, label, desc, icon: Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setMethod(id)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      method === id
                        ? 'border-accent bg-accent/10'
                        : 'border-line bg-card hover:border-accent/40'
                    }`}
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${method === id ? 'bg-accent text-cream' : 'bg-white/5 text-muted'}`}>
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-cream">{label}</span>
                      <span className="mt-0.5 block text-xs text-muted">{desc}</span>
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                <Lock size={12} /> Simulated securely — no card data is collected or stored.
              </p>
            </motion.section>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-line bg-bg-secondary p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-semibold text-cream">Order Summary</h2>
            <ul className="mt-5 space-y-4">
              {items.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <div className="size-12 shrink-0 overflow-hidden rounded-xl">
                    <PizzaImage src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-cream">{i.name}</p>
                    <p className="text-xs text-muted">Qty {i.qty}</p>
                  </div>
                  <span className="text-sm font-semibold text-cream">{formatINR(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-cream">{formatINR(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery fee</dt>
                <dd className="font-semibold text-cream">{formatINR(totals.delivery)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tax (5%)</dt>
                <dd className="font-semibold text-cream">{formatINR(totals.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-4">
                <dt className="font-display text-lg font-semibold text-cream">Total</dt>
                <dd className="font-display text-xl font-bold text-accent-warm">
                  {formatINR(totals.total)}
                </dd>
              </div>
            </dl>
            <Button type="submit" full disabled={paying} className="mt-6">
              {paying ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Processing payment...
                </>
              ) : (
                <>
                  <Lock size={15} /> Pay {formatINR(totals.total)}
                </>
              )}
            </Button>
            <Link to="/cart" className="mt-3 block text-center text-xs font-bold text-muted transition-colors hover:text-cream">
              Back to cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  )
}
