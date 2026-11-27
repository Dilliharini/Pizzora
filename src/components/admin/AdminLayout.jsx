import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  Bell,
  ChefHat,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  Pizza,
  Settings,
  ShoppingBag,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import DemoBadge from '../../components/ui/DemoBadge'

const items = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/inventory', label: 'Inventory', icon: Package },
  { to: '/admin/alerts', label: 'Stock Alerts', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ title, subtitle, actions, children, active }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const doLogout = () => {
    logout()
    toast.success('Signed out of admin (demo)')
    navigate('/admin/login')
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link to="/admin/dashboard" className="flex items-center gap-2.5 px-6 py-6">
        <span className="grid size-10 place-items-center rounded-xl bg-accent">
          <Pizza size={22} className="text-cream" />
        </span>
        <span>
          <span className="block font-display text-base font-bold tracking-[0.15em] text-cream">
            PIZZORA
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent-warm">
            Admin Panel
          </span>
        </span>
      </Link>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-accent/15 text-accent shadow-[inset_2px_0_0_#e94b32]'
                  : 'text-muted hover:bg-white/5 hover:text-cream'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-line p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-white/5 hover:text-cream"
        >
          <ExternalLink size={17} /> View Storefront
        </Link>
        <button
          onClick={doLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-bg-secondary lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-line bg-bg-secondary">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-6 text-muted hover:text-cream"
            >
              <X size={20} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="grid size-10 place-items-center rounded-xl border border-line text-cream lg:hidden"
              >
                <ChefHat size={18} />
              </button>
              <div>
                <h1 className="font-display text-lg font-semibold text-cream sm:text-xl">{title}</h1>
                {subtitle && <p className="hidden text-xs text-muted sm:block">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <DemoBadge className="hidden sm:inline-flex" />
              <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                {(user?.name || 'Admin')[0].toUpperCase()}
              </span>
            </div>
          </div>
        </header>
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
