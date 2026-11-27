import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-accent text-cream hover:bg-[#f0563c] shadow-[0_8px_30px_rgba(233,75,50,0.35)]',
  secondary:
    'bg-transparent text-cream border border-line hover:border-accent-warm/60 hover:bg-white/5',
  ghost: 'bg-white/5 text-cream hover:bg-white/10',
}

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  full = false,
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${full ? 'w-full' : ''} ${className}`

  if (to && !disabled) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={full ? 'w-full' : ''}>
        <Link to={to} className={cls}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={cls}
    >
      {children}
    </motion.button>
  )
}
