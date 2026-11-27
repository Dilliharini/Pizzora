import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Flame, Plus, Search, ShoppingCart, Star, Leaf, Drumstick } from 'lucide-react'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import PizzaImage from '../../components/ui/PizzaImage'
import { pizzas } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { formatINR } from '../../utils/format'

const CATEGORIES = ['All', 'Vegetarian', 'Non-Veg']
const SORTS = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export default function Menu() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [vegOnly, setVegOnly] = useState(false)
  const [sort, setSort] = useState('popular')
  const [quickView, setQuickView] = useState(null)
  const { addItem } = useCart()

  const filtered = useMemo(() => {
    let list = pizzas.filter((p) => {
      const matchQ =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      const matchC = category === 'All' || p.category === category
      const matchV = !vegOnly || p.veg
      return matchQ && matchC && matchV
    })
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      default: list.sort((a, b) => b.reviews - a.reviews)
    }
    return list
  }, [query, category, vegOnly, sort])

  const addToCart = (p) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image, description: p.description })
    toast.success(`${p.name} added to cart`)
  }

  return (
    <main className="pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-cream sm:text-5xl"
          >
            The Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted"
          >
            Eight signature pizzas, hand-stretched and fired to order. Prices include all taxes
            shown at checkout.
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="sticky top-18 z-40 mt-8 rounded-3xl border border-line bg-bg/90 p-4 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pizzas..."
                className="h-11 w-full rounded-full border border-line bg-card pl-11 pr-4 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    category === c
                      ? 'bg-accent text-cream'
                      : 'border border-line text-muted hover:text-cream'
                  }`}
                >
                  {c}
                </button>
              ))}
              <button
                onClick={() => setVegOnly((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  vegOnly
                    ? 'bg-emerald-600 text-cream'
                    : 'border border-line text-muted hover:text-cream'
                }`}
              >
                <Leaf size={13} /> Veg Only
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 cursor-pointer rounded-full border border-line bg-card px-4 text-xs font-bold text-muted outline-none focus:border-accent"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <Flame size={40} className="text-accent/40" />
            <h3 className="font-display text-xl font-semibold text-cream">No pizzas found</h3>
            <p className="text-sm text-muted">Try a different search or clear your filters.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('')
                setCategory('All')
                setVegOnly(false)
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.article
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                >
                  <div className="relative aspect-[4/3] cursor-pointer overflow-hidden" onClick={() => setQuickView(p)}>
                    <PizzaImage
                      src={p.image}
                      alt={p.name}
                      zoom
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cream"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`absolute right-3 top-3 grid size-6 place-items-center rounded-full border-2 ${
                        p.veg ? 'border-emerald-500' : 'border-red-500'
                      } bg-bg/80`}
                      title={p.veg ? 'Vegetarian' : 'Non-vegetarian'}
                    >
                      <span className={`size-2.5 rounded-full ${p.veg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent pb-3 pt-8 text-xs font-bold uppercase tracking-widest text-cream/90 opacity-0 transition-opacity group-hover:opacity-100">
                      Quick view
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold leading-snug text-cream">
                        {p.name}
                      </h3>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-xs font-bold text-accent-warm">
                        <Star size={12} className="fill-accent-warm" /> {p.rating}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-display text-xl font-bold text-cream">
                        {formatINR(p.price)}
                      </span>
                      <button
                        onClick={() => addToCart(p)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-cream transition-all hover:bg-[#f0563c] active:scale-95"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Quick view modal */}
      <Modal open={!!quickView} onClose={() => setQuickView(null)} title={quickView?.name} wide>
        {quickView && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <PizzaImage src={quickView.image} alt={quickView.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                {quickView.tags.map((t) => (
                  <span key={t} className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                    {t}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold text-accent-warm">
                  <Star size={12} className="fill-accent-warm" /> {quickView.rating} ({quickView.reviews} reviews)
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{quickView.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex items-center gap-2">
                  {quickView.veg ? <Leaf size={15} className="text-emerald-500" /> : <Drumstick size={15} className="text-red-500" />}
                  {quickView.veg ? 'Vegetarian' : 'Contains meat'} · {quickView.category}
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <p className="font-display text-2xl font-bold text-cream">
                  {formatINR(quickView.price)}
                </p>
                <Button
                  full
                  className="mt-4"
                  onClick={() => {
                    addToCart(quickView)
                    setQuickView(null)
                  }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
