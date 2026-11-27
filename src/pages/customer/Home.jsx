import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  ArrowRight,
  ChevronDown,
  Flame,
  Leaf,
  Star,
  Timer,
  Truck,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import PizzaImage from '../../components/ui/PizzaImage'
import { Reveal, SectionHeading } from '../../components/ui/Reveal'
import { heroImage, pizzas, testimonials, howItWorks } from '../../data/products'

const featured = pizzas.slice(0, 4)

const whyItems = [
  { icon: Flame, title: 'Stone-Oven Fired', text: 'Baked at 450°C in a stone oven for that charred, blistered crust you cannot fake.' },
  { icon: Leaf, title: 'Farm-Fresh Daily', text: 'Vegetables and herbs delivered every morning. Nothing frozen, nothing stale.' },
  { icon: Timer, title: '35-Minute Promise', text: 'From dough to doorstep in 35 minutes or your delivery fee is on us.' },
  { icon: Truck, title: 'Live Tracking', text: 'Watch your order move from our kitchen to your door, stage by stage.' },
]

export default function Home() {
  const reduce = useReducedMotion()
  const float = (d) =>
    reduce ? {} : { y: [0, -14, 0], rotate: [0, d, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] size-[600px] rounded-full bg-accent/20 blur-[140px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[-15%] size-[400px] rounded-full bg-accent-warm/10 blur-[120px]"
          aria-hidden
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-warm"
            >
              <Flame size={13} />
              Crafted fresh, every single order
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display text-5xl font-black leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
            >
              Not Just Pizza.
              <span className="block bg-gradient-to-r from-accent via-accent-warm to-accent bg-clip-text text-transparent">
                It's an Experience.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-muted"
            >
              Handcrafted flavours. Fresh ingredients. Unforgettable bites. Order a signature
              legend or compose your own masterpiece.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button to="/menu">
                Explore Menu <ArrowRight size={17} />
              </Button>
              <Button to="/pizza-builder" variant="secondary">
                Build Your Pizza
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <div>
                <p className="font-display text-2xl font-bold text-cream">50K+</p>
                <p className="text-xs uppercase tracking-widest text-muted">Pizzas served</p>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <p className="flex items-center gap-1.5 font-display text-2xl font-bold text-cream">
                  4.9 <Star size={17} className="fill-accent-warm text-accent-warm" />
                </p>
                <p className="text-xs uppercase tracking-widest text-muted">Average rating</p>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <p className="font-display text-2xl font-bold text-cream">32 min</p>
                <p className="text-xs uppercase tracking-widest text-muted">Avg. delivery</p>
              </div>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-[520px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-accent-warm/20 blur-2xl" aria-hidden />
              <motion.div
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-full border border-dashed border-accent-warm/25"
                aria-hidden
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#2c2620] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                <PizzaImage
                  src={heroImage}
                  alt="Signature Pizzora pizza"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* floating ingredients */}
              <motion.div animate={float(-4)} className="absolute -top-2 left-2 rounded-2xl border border-line bg-card/90 px-4 py-2.5 text-xs font-bold text-cream shadow-xl backdrop-blur">
                Fresh Basil
              </motion.div>
              <motion.div animate={float(5)} className="absolute top-1/4 -right-3 rounded-2xl border border-line bg-card/90 px-4 py-2.5 text-xs font-bold text-cream shadow-xl backdrop-blur">
                Vine Tomatoes
              </motion.div>
              <motion.div animate={float(-6)} className="absolute bottom-10 -left-4 rounded-2xl border border-line bg-card/90 px-4 py-2.5 text-xs font-bold text-cream shadow-xl backdrop-blur">
                Aged Mozzarella
              </motion.div>

              {/* offer card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-accent/40 bg-card/95 px-5 py-3.5 shadow-2xl backdrop-blur"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Flame size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold text-cream">Weekend Special</p>
                  <p className="text-xs text-muted">Flat 20% off on orders above ₹899</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted lg:block"
          aria-hidden
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Chef's Selection"
            title="Featured Pizzas"
            subtitle="The crowd favourites that keep our ovens glowing — hand-picked by our head chef."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link
                  to="/menu"
                  className="group block overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PizzaImage
                      src={p.image}
                      alt={p.name}
                      zoom
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {p.tags[0] && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-cream">
                        {p.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-cream">{p.name}</h3>
                      <span className="flex items-center gap-1 text-sm font-bold text-accent-warm">
                        <Star size={13} className="fill-accent-warm" /> {p.rating}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-cream">₹{p.price}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-transform group-hover:translate-x-0.5">
                        Order <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section className="border-y border-line bg-bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Pizzora"
            title="Obsessed With Every Detail"
            subtitle="Four reasons thousands of customers keep coming back for one more slice."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent/12 text-accent">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-cream">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BUILDER PROMO ============ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-[#2a1a14] via-card to-bg-secondary p-10 sm:p-14 lg:p-20">
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-[420px] rounded-full bg-accent/15 blur-[100px]"
                aria-hidden
              />
              <div className="relative z-10 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-warm">
                  Your Pizza, Your Rules
                </span>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">
                  Build Your Own Masterpiece
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Five bases. Five sauces. Four cheeses. Eight fresh toppings. Millions of
                  combinations — start from just ₹249.
                </p>
                <div className="mt-8">
                  <Button to="/pizza-builder">
                    Start Building <ArrowRight size={17} />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="border-y border-line bg-bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Simple As 1-2-3"
            title="How It Works"
            subtitle="From craving to first bite in three effortless steps."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl border border-line bg-card p-8">
                  <span className="font-display text-5xl font-black text-accent/25">{s.step}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-cream">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Word of Mouth"
            title="Loved by Pizza People"
            subtitle="Real words from regulars who order weekly."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl border border-line bg-card p-7">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={14}
                        className={s < t.rating ? 'fill-accent-warm text-accent-warm' : 'text-line'}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/85">
                    "{t.text}"
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <p className="text-sm font-bold text-cream">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <Newsletter />
    </main>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    setDone(true)
    toast.success('You are on the list! (demo)')
  }

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-bg-secondary p-10 text-center sm:p-16">
            <div
              className="pointer-events-none absolute left-1/2 top-0 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[100px]"
              aria-hidden
            />
            <div className="relative z-10 mx-auto max-w-xl">
              <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
                Get the Crust Letter
              </h2>
              <p className="mt-3 text-muted">
                New flavour drops, secret menu items and members-only offers. Once a month, no spam.
              </p>
              {done ? (
                <p className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-4 text-sm font-bold text-accent-warm">
                  Welcome aboard — check your inbox for a hello. (Demo: no email is actually sent.)
                </p>
              ) : (
                <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-13 flex-1 rounded-full border border-line bg-card px-6 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
                  />
                  <Button type="submit" className="h-13">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
