import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CircleCheck, Mail, Loader2 } from 'lucide-react'
import AuthShell, { SubmitButton, inputCls } from './AuthShell'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Enter a valid email address')
      return
    }
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch {
      toast.error('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title={sent ? 'Check Your Inbox' : 'Reset Password'}
      subtitle={
        sent
          ? 'If an account exists for that email, a reset link is on its way.'
          : 'Enter your email and we will send you a reset link.'
      }
      footer={
        <Link to="/login" className="font-bold text-accent hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
          <CircleCheck size={36} className="text-emerald-400" />
          <p className="text-sm leading-relaxed text-cream/85">
            Demo mode: no real email is sent. In production, Nodemailer will deliver this link
            from the backend.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-cream transition-all hover:bg-[#f0563c] disabled:opacity-50"
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : <Mail size={16} />}
            Send Reset Link
          </button>
        </form>
      )}
    </AuthShell>
  )
}
