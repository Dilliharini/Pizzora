export default function DemoBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-warm ${className}`}
    >
      Demo Mode
    </span>
  )
}
