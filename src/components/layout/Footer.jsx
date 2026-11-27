import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, Phone, Pizza, Twitter, Youtube } from 'lucide-react'

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

const explore = [
  { to: '/menu', label: 'Menu' },
  { to: '/pizza-builder', label: 'Customize' },
  { to: '/about', label: 'About' },
  { to: '/order-tracking', label: 'Track Order' },
]

const account = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/cart', label: 'Cart' },
  { to: '/admin/login', label: 'Admin Portal' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-accent">
              <Pizza size={22} className="text-cream" />
            </span>
            <span className="font-display text-xl font-bold tracking-[0.18em] text-cream">
              PIZZORA
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted max-w-xs">
            Premium artisan pizza, hand-stretched and fired to order. Not just pizza — an experience.
          </p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all hover:border-accent hover:text-accent"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-accent-warm">
            Explore
          </h4>
          <ul className="space-y-3">
            {explore.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-accent-warm">
            Account
          </h4>
          <ul className="space-y-3">
            {account.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-accent-warm">
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-muted">
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
              12 Artisan Lane, Lower Parel, Mumbai 400013
            </li>
            <li className="flex items-center gap-3">
              <Phone size={17} className="shrink-0 text-accent" />
              +91 22 4000 8282
            </li>
            <li className="flex items-center gap-3">
              <Mail size={17} className="shrink-0 text-accent" />
              hello@pizzora.in
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Pizzora Foods Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-accent-warm" />
            Demo frontend — payments and tracking are simulated
          </p>
        </div>
      </div>
    </footer>
  )
}
