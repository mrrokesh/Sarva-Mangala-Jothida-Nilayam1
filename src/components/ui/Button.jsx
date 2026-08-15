import { Link } from 'react-router-dom'

const variants = {
  gold: 'bg-maroon text-white hover:bg-maroon-deep',
  maroon: 'bg-maroon text-white hover:bg-maroon-deep',
  outline: 'border border-maroon text-maroon hover:bg-maroon hover:text-white',
  cream: 'bg-cream-dark text-navy hover:bg-cream-dark',
}

export default function Button({
  to,
  href,
  children,
  variant = 'gold',
  className = '',
  type = 'button',
  onClick,
  disabled,
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition ${variants[variant]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
