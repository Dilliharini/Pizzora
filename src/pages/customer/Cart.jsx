import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { ArrowRight, Minus, Plus, Pizza, ShoppingBag, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import PizzaImage from '../../components/ui/PizzaImage'
import EmptyState from '../../components/ui/EmptyState'
import { useCart } from '../../context/CartContext'
import { cartTotals, formatINR } from '../../utils/format'

export default function Cart() {
  const { items, updateQty, removeItem, clear } = useCart()
  const totals = cartTotals(items)

  if (items.length === 0) {
    return (
      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
          <h1 className="font-display text-4xl font-bold text-cream">Your Cart</h1>
          <div className="mt-10">
            <EmptyState
              icon={Pizza}
              title="Your cart is empty"
              text="Looks like it could use a pizza or two. Browse the menu or build your own creation."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <Button to="/menu">Browse Menu</Button>
                  <Button to="/pizza-builder" variant="secondary">
                    Build Your Pizza
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold text-cream">
            Your Cart{' '}
            <span className="text-lg font-normal text-muted">
              ({items.length} item{items.length > 1 ? 's' : ''})
            </span>
          </h1>
          <button
            onClick={() => {
              clear()
              toast.success('Cart cleared')
            }}
            className="text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-accent"
          >
            Clear all
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-4 rounded-3xl border border-line bg-card p-4"
                >
                  <div className="size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28">
                    <PizzaImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-base font-semibold text-cream sm:text-lg">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          removeItem(item.id)
                          toast.success('Removed from cart')
                        }}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-line bg-bg px-1.5 py-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-cream"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-cream">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Increase quantity"
                          className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-cream"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="font-display text-lg font-bold text-cream">
                        {formatINR(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-line bg-bg-secondary p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-semibold text-cream">Order Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
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
            <Button to="/checkout" full className="mt-6">
              Proceed to Checkout <ArrowRight size={16} />
            </Button>
            <Button to="/menu" variant="secondary" full className="mt-3">
              Continue Shopping
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
              <ShoppingBag size={13} />
              Free delivery on orders above ₹899
            </p>
          </aside>
        </div>
      </div>
    </main>
  )
}
