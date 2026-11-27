import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ArrowLeft, ArrowRight, Check, Pizza, ShoppingCart } from 'lucide-react'
import Button from '../../components/ui/Button'
import PizzaImage from '../../components/ui/PizzaImage'
import { pizzaBuilderOptions, CUSTOM_BASE_PRICE, builderShowcase } from '../../data/products'
import { productService } from '../../services/productService'
import { useCart } from '../../context/CartContext'
import { formatINR } from '../../utils/format'

const STEPS = [
  { id: 1, label: 'Base', key: 'base' },
  { id: 2, label: 'Sauce', key: 'sauce' },
  { id: 3, label: 'Cheese', key: 'cheese' },
  { id: 4, label: 'Toppings', key: 'toppings' },
]

function OptionCard({ selected, onClick, name, price, group }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? 'border-accent bg-accent/10 shadow-[0_0_0_1px_rgba(233,75,50,0.5),0_10px_30px_rgba(233,75,50,0.15)]'
          : 'border-line bg-card hover:border-accent/40'
      }`}
    >
      <div>
        <p className={`text-sm font-bold ${selected ? 'text-cream' : 'text-cream/90'}`}>{name}</p>
        <p className="mt-0.5 text-xs text-muted">{price > 0 ? `+ ${formatINR(price)}` : 'Included'}</p>
      </div>
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full border transition-all ${
          selected ? 'border-accent bg-accent text-cream' : 'border-line text-transparent'
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </span>
    </motion.button>
  )
}

export default function PizzaBuilder() {
  const [step, setStep] = useState(1)
  const [base, setBase] = useState(null)
  const [sauce, setSauce] = useState(null)
  const [cheese, setCheese] = useState(null)
  const [toppings, setToppings] = useState([])
  const { addItem } = useCart()

  const price = useMemo(
    () => productService.calculateCustomPrice({ base, sauce, cheese, toppings }),
    [base, sauce, cheese, toppings]
  )

  const canProceed = step !== 4 || true
  const requiredPicked = base && sauce && cheese

  const toggleTopping = (t) => {
    setToppings((prev) =>
      prev.find((x) => x.id === t.id) ? prev.filter((x) => x.id !== t.id) : [...prev, t]
    )
  }

  const summaryText = () => {
    const parts = [base?.name, sauce?.name, cheese?.name].filter(Boolean)
    if (toppings.length) parts.push(`${toppings.length} topping${toppings.length > 1 ? 's' : ''}`)
    return parts.join(' · ') || 'Nothing selected yet'
  }

  const addToCart = () => {
    if (!requiredPicked) {
      toast.error('Please pick a base, sauce and cheese first')
      const firstMissing = !base ? 1 : !sauce ? 2 : 3
      setStep(firstMissing)
      return
    }
    if (step !== 4) {
      setStep(4)
      toast('Review your toppings, then add to cart', { icon: '🍕' })
      return
    }
    const name = `Custom Pizza (${base.name.split(' ')[0]} base)`
    addItem({
      id: `custom-${Date.now()}`,
      signature: `custom-${base.id}-${sauce.id}-${cheese.id}-${toppings.map((t) => t.id).sort().join('+')}`,
      name,
      description: summaryText(),
      price,
      image: builderShowcase,
      custom: { base: base.name, sauce: sauce.name, cheese: cheese.name, toppings: toppings.map((t) => t.name) },
    })
    toast.success('Custom pizza added to cart')
  }

  return (
    <main className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-cream sm:text-5xl"
          >
            Build Your Pizza
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted"
          >
            Four quick steps to a pizza that exists only in your imagination — until now.
          </motion.p>
        </div>

        {/* Progress */}
        <div className="mt-10 flex items-center gap-2 sm:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center gap-2 sm:gap-4">
              <button
                onClick={() => setStep(s.id)}
                className="flex items-center gap-2.5"
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border-2 text-xs font-extrabold transition-all duration-300 ${
                    step > s.id
                      ? 'border-accent bg-accent text-cream'
                      : step === s.id
                        ? 'border-accent text-accent'
                        : 'border-line text-muted'
                  }`}
                >
                  {step > s.id ? <Check size={14} strokeWidth={3} /> : s.id}
                </span>
                <span
                  className={`hidden text-xs font-bold uppercase tracking-wider sm:block ${
                    step >= s.id ? 'text-cream' : 'text-muted'
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="h-0.5 flex-1 overflow-hidden rounded bg-line">
                  <motion.div
                    className="h-full bg-accent"
                    initial={false}
                    animate={{ width: step > s.id ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Steps panel */}
          <div className="rounded-3xl border border-line bg-bg-secondary p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {step === 1 && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-cream">Choose your base</h2>
                    <p className="mt-1 text-sm text-muted">The foundation of greatness. Required.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {pizzaBuilderOptions.bases.map((b) => (
                        <OptionCard
                          key={b.id}
                          name={b.name}
                          price={b.price}
                          group="base"
                          selected={base?.id === b.id}
                          onClick={() => setBase(b)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-cream">Choose your sauce</h2>
                    <p className="mt-1 text-sm text-muted">Required — sets the whole mood.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {pizzaBuilderOptions.sauces.map((s) => (
                        <OptionCard
                          key={s.id}
                          name={s.name}
                          price={s.price}
                          selected={sauce?.id === s.id}
                          onClick={() => setSauce(s)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-cream">Choose your cheese</h2>
                    <p className="mt-1 text-sm text-muted">Required — the molten heart of it all.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {pizzaBuilderOptions.cheeses.map((c) => (
                        <OptionCard
                          key={c.id}
                          name={c.name}
                          price={c.price}
                          selected={cheese?.id === c.id}
                          onClick={() => setCheese(c)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="font-display text-2xl font-semibold text-cream">
                      Pick your toppings
                    </h2>
                    <p className="mt-1 text-sm text-muted">Optional — but why hold back?</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {pizzaBuilderOptions.toppings.map((t) => {
                        const on = toppings.find((x) => x.id === t.id)
                        return (
                          <OptionCard
                            key={t.id}
                            name={t.name}
                            price={t.price}
                            selected={!!on}
                            onClick={() => toggleTopping(t)}
                          />
                        )
                      })}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
              <Button
                variant="ghost"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
              >
                <ArrowLeft size={16} /> Back
              </Button>
              {step < 4 ? (
                <Button onClick={() => setStep((s) => Math.min(4, s + 1))} disabled={!canProceed && false}>
                  Next <ArrowRight size={16} />
                </Button>
              ) : (
                <Button onClick={addToCart} disabled={!requiredPicked}>
                  <ShoppingCart size={16} /> Add to Cart · {formatINR(price)}
                </Button>
              )}
            </div>
          </div>

          {/* Live preview */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-line bg-bg-secondary">
              <div className="relative aspect-[4/3] overflow-hidden">
                <PizzaImage src={builderShowcase} alt="Your custom pizza" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-display text-2xl font-bold text-cream">{formatINR(price)}</p>
                  <p className="text-xs uppercase tracking-widest text-muted">Live price</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-accent">
                  <Pizza size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-widest">Your Creation</h3>
                </div>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    ['Base', base?.name],
                    ['Sauce', sauce?.name],
                    ['Cheese', cheese?.name],
                    ['Toppings', toppings.length ? toppings.map((t) => t.name).join(', ') : null],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-start justify-between gap-4">
                      <dt className="shrink-0 text-muted">{label}</dt>
                      <dd className={`text-right font-semibold ${val ? 'text-cream' : 'text-muted/50'}`}>
                        {val || 'Not selected'}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                  Base price {formatINR(CUSTOM_BASE_PRICE)} + selected extras. A ₹49 delivery fee
                  and 5% tax apply at checkout.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
