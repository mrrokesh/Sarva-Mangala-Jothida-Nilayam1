export default function SectionHeading({ eyebrow, title, center = true, children }) {
  return (
    <div className={`${center ? 'text-center mx-auto max-w-3xl' : ''} mb-10`}>
      {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.28em] text-maroon">{eyebrow}</p>}
      <h2 className="font-display text-3xl text-navy md:text-4xl">{title}</h2>
      {children && <div className="mt-4 leading-relaxed text-navy/70">{children}</div>}
    </div>
  )
}
