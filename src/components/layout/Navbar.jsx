import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu as MenuIcon, Pizza, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { navLinks } from './navLinks'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${
        scrolled ? 'bg-bg/85 backdrop-blur-xl border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-accent shadow-[0_6px_24px_rgba(233,75,50,0.4)]">
            <Pizza size={22} className="text-cream" />
          </span>
          <span className="font-display text-xl font-bold tracking-[0.18em] text-cream">
            PIZZORA
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-muted hover:text-cream'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-11 place-items-center rounded-full border border-line text-cream transition-colors hover:border-accent/60 hover:bg-white/5"
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="absolute -top-1 -right-1 grid min-size-5 size-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-extrabold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link
            to={user ? '/order-tracking' : '/login'}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-cream transition-all hover:bg-[#f0563c] hover:shadow-[0_6px_24px_rgba(233,75,50,0.35)]"
          >
            <User size={16} />
            {user ? user.name.split(' ')[0] : 'Login'}
          </Link>

          <button
            className="grid size-11 place-items-center rounded-full border border-line text-cream md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-semibold ${
                      isActive ? 'bg-accent/10 text-accent' : 'text-cream hover:bg-white/5'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to={user ? '/order-tracking' : '/login'}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-base font-bold text-cream"
              >
                <User size={18} />
                {user ? user.name : 'Login / Register'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
