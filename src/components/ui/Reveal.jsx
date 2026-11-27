import { motion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'
  return (
    <Reveal className={`flex flex-col gap-3 max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <span className="text-accent-warm text-xs font-bold uppercase tracking-[0.3em]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-cream leading-[1.15]">
        {title}
      </h2>
      {subtitle && <p className="text-muted text-base leading-relaxed">{subtitle}</p>}
    </Reveal>
  )
}
