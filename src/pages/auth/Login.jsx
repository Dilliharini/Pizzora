import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { LogIn } from 'lucide-react'
import AuthShell, { PasswordInput, SubmitButton, inputCls } from './AuthShell'
import { useAuth } from '../../context/AuthContext'
import { AUTH_DEMO_NOTE } from './AuthShell'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Enter a valid email address')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const res = await login({ email, password, remember })
      toast.success(`Welcome back, ${res.user.name.split(' ')[0]}! (demo session)`)
    } catch {
      toast.error('Could not sign you in. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to reorder favourites and track live orders."
      footer={
        <>
          New to Pizzora?{' '}
          <Link to="/register" className="font-bold text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
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
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">Password</label>
            <Link to="/forgot-password" className="text-xs font-bold text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 accent-[#e94b32]"
          />
          Remember me
        </label>
        <SubmitButton loading={loading} icon={LogIn}>
          Sign In
        </SubmitButton>
        <p className="text-center text-xs leading-relaxed text-muted/70">{AUTH_DEMO_NOTE}</p>
      </form>
    </AuthShell>
  )
}
