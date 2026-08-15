import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Phone } from 'lucide-react'
import { site } from '../../config/site'
import { navItems } from '../../data/nav'
import { DesktopMega, MobileMenu } from './MegaMenu'
import Button from '../ui/Button'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hideTop, setHideTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setHideTop(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`overflow-hidden border-gold/15 bg-cream text-maroon transition-all duration-300 ${
          hideTop ? 'max-h-0 border-b-0 opacity-0' : 'max-h-12 border-b opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs">
          <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-1 hover:opacity-80">
            <Phone size={12} /> {site.phones.join(' / ')}
          </a>
          {site.email ? (
            <a href={`mailto:${site.email}`} className="hover:opacity-80">
              {site.email}
            </a>
          ) : (
            <span>{site.nameTamil}</span>
          )}
        </div>
      </div>
      <div className="border-b border-gold/20 bg-cream/95 text-navy backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button type="button" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={site.portrait}
              alt={site.founder}
              className="h-11 w-11 rounded-full border border-gold/40 object-cover object-[center_18%]"
            />
            <span className="min-w-0">
              <span className="block truncate font-display text-base leading-tight text-maroon sm:text-lg">{site.name}</span>
              <span className="hidden truncate text-[11px] text-navy/60 sm:block">{site.founder}</span>
            </span>
          </Link>
          <Button to="/enquiry" variant="outline" className="ml-auto shrink-0 !px-4 !py-2 text-xs sm:!px-6 sm:!py-2.5 sm:text-sm">
            Book a Consultation
          </Button>
        </div>
        <nav className="hidden border-t border-gold/15 lg:block">
          <ul className="mx-auto flex max-w-7xl items-stretch gap-0 px-2 text-[13px] font-medium">
            {navItems.map((item) => (
              <li key={item.label} className="group relative">
                {item.to && !item.children ? (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block whitespace-nowrap px-3 py-3 hover:text-gold ${isActive ? 'text-gold' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <>
                    {item.to ? (
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex cursor-pointer items-center whitespace-nowrap px-3 py-3 hover:text-gold ${isActive ? 'text-gold' : ''}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <span className="flex cursor-default items-center whitespace-nowrap px-3 py-3 hover:text-gold">
                        {item.label}
                      </span>
                    )}
                    {item.children && <DesktopMega items={item.children} />}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <MobileMenu items={navItems} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
