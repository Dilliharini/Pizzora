import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import { Pizza } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'

export default function AdminLogin() {
  const { adminLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      toast.error('Enter a valid email and password (min 6 characters)')
      return
    }
    setLoading(true)
    try {
      await adminLogin({ email, password })
      toast.success('Signed in to admin panel (demo)')
      navigate('/admin/dashboard')
    } catch {
      toast.error('Admin sign-in failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'h-12 w-full rounded-xl border border-line bg-card px-4 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-accent'

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0b0a] px-5 py-20">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-line bg-bg-secondary p-8 shadow-2xl sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <span className="grid size-14 place-items-center rounded-2xl border border-accent/40 bg-accent/10">
            <Pizza size={28} className="text-accent" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-[0.2em] text-cream">
            PIZZORA ADMIN
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent-warm">
            <ShieldCheck size={13} /> Operations Control
          </p>
          <span className="mt-4 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-warm">
            Demo Mode — no real credentials
          </span>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Admin email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pizzora.com"
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream"
              >
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-cream transition-all hover:bg-[#f0563c] disabled:opacity-50"
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : <ShieldCheck size={16} />}
            Access Admin Panel
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted/70">
          Placeholder authentication adapter. Real role-based authorization will be enforced by
          the backend — this screen only demonstrates the flow.
        </p>
        <Link to="/" className="mt-4 block text-center text-xs font-bold text-muted hover:text-cream">
          ← Back to storefront
        </Link>
      </motion.div>
    </main>
  )
}
