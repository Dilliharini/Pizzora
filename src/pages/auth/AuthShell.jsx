import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Loader2, LogIn, Pizza } from 'lucide-react'
import DemoBadge from '../../components/ui/DemoBadge'

export const AUTH_DEMO_NOTE =
  'Demo authentication — any valid-looking email and password (min 6 chars) will work. Real JWT auth comes with the backend.'

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-28">
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-line bg-bg-secondary p-8 shadow-2xl sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent shadow-[0_8px_28px_rgba(233,75,50,0.4)]">
              <Pizza size={26} className="text-cream" />
            </span>
          </Link>
          <h1 className="mt-5 font-display text-3xl font-bold text-cream">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
          <DemoBadge className="mt-4" />
        </div>
        <div className="mt-8">{children}</div>
        <div className="mt-6 text-center text-sm text-muted">{footer}</div>
      </motion.div>
    </main>
  )
}

export function PasswordInput({ value, onChange, placeholder = 'Password', required = true, autoComplete = 'current-password' }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-xl border border-line bg-card px-4 pr-12 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-cream"
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  )
}

export function SubmitButton({ loading, children, icon: Icon = LogIn }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-cream transition-all hover:bg-[#f0563c] hover:shadow-[0_8px_28px_rgba(233,75,50,0.35)] disabled:opacity-50"
    >
      {loading ? <Loader2 size={17} className="animate-spin" /> : <Icon size={16} />}
      {children}
    </button>
  )
}

export const inputCls =
  'h-12 w-full rounded-xl border border-line bg-card px-4 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-accent'

export function useNavigateHome() {
  return useNavigate()
}
