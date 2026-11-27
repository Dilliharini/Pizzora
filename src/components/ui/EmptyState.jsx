export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-line bg-card/50 px-8 py-16 text-center">
      {Icon && (
        <div className="rounded-full bg-accent/10 p-5 text-accent">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-cream">{title}</h3>
      {text && <p className="max-w-sm text-sm text-muted leading-relaxed">{text}</p>}
      {action}
    </div>
  )
}
