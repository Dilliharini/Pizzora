import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pizza } from 'lucide-react'

const FALLBACK_GRADIENTS = [
  'from-[#3a231c] via-[#2a1a15] to-[#1b120e]',
  'from-[#332a1c] via-[#241e14] to-[#161209]',
  'from-[#38221a] via-[#251712] to-[#151010]',
]

export default function PizzaImage({ src, alt = '', className = '', zoom = false }) {
  const [failed, setFailed] = useState(false)
  const gradient = FALLBACK_GRADIENTS[(alt || 'x').length % FALLBACK_GRADIENTS.length]

  if (failed || !src) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <Pizza className="text-accent/40" size={56} strokeWidth={1.25} />
      </div>
    )
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      whileHover={zoom ? { scale: 1.06 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  )
}
