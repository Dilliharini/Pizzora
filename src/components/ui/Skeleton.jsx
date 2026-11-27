import { motion } from 'framer-motion'

export default function Skeleton({ className = '' }) {
  return (
    <motion.div
      className={`rounded-2xl bg-white/5 ${className}`}
      animate={{ opacity: [0.4, 0.75, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function PizzaCardSkeleton() {
  return (
    <div className="rounded-3xl border border-line bg-card overflow-hidden">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
