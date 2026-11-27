import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserPlus } from 'lucide-react'
import AuthShell, { PasswordInput, SubmitButton, inputCls } from './AuthShell'
import { useAuth } from '../../context/AuthContext'
import { AUTH_DEMO_NOTE } from './AuthShell'

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const errors = {
    name: form.name && form.name.trim().length < 2 ? 'Please enter your full name' : null,
    email: form.email && !/^\S+@\S+\.\S+$/.test(form.email) ? 'Enter a valid email' : null,
    password: form.password && form.password.length < 6 ? 'At least 6 characters' : null,
    confirm: form.confirm && form.confirm !== form.password ? 'Passwords do not match' : null,
  }
  const valid = form.name && form.email && form.password && !errors.name && !errors.email && !errors.password && !errors.confirm

  const submit = async (e) => {
    e.preventDefault()
    if (!valid) {
      toast.error('Please fix the highlighted fields')
      return
    }
    setLoading(true)
    try {
      await register(form)
      toast.success('Account created! (demo session)')
    } catch {
      toast.error('Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Create Account"
      subtitle="Join Pizzora for faster checkout and live order tracking."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        {[
          { key: 'name', label: 'Full name', type: 'text', placeholder: 'Aarav Mehta', autoComplete: 'name' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
        ].map((f) => (
          <div key={f.key}>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
              {f.label}
            </label>
            <input type={f.type} value={form[f.key]} onChange={set(f.key)} placeholder={f.placeholder} autoComplete={f.autoComplete} className={inputCls} />
            {errors[f.key] && <p className="mt-1 text-xs text-accent">{errors[f.key]}</p>}
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
            Password
          </label>
          <PasswordInput value={form.password} onChange={set('password')} autoComplete="new-password" />
          {errors.password && <p className="mt-1 text-xs text-accent">{errors.password}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
            Confirm password
          </label>
          <PasswordInput value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" autoComplete="new-password" />
          {errors.confirm && <p className="mt-1 text-xs text-accent">{errors.confirm}</p>}
        </div>
        <SubmitButton loading={loading} icon={UserPlus}>
          Create Account
        </SubmitButton>
        <p className="text-center text-xs leading-relaxed text-muted/70">{AUTH_DEMO_NOTE}</p>
      </form>
    </AuthShell>
  )
}
