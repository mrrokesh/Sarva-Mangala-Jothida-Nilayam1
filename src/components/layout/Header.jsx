import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, Phone } from 'lucide-react'
import { site } from '../../config/site'
import { navItems } from '../../data/nav'
import { useCart } from '../../store/cartStore'
import { DesktopMega, MobileMenu } from './MegaMenu'
import SearchOverlay from './SearchOverlay'

export default function Header() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-gold/15 bg-cream text-maroon">
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
          <div className="ml-auto flex items-center gap-3">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className="hover:text-gold">
              <Search size={20} />
            </button>
            <Link to="/cart" className="relative hover:text-gold" aria-label="Cart">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-navy">
                  {count}
                </span>
              )}
            </Link>
          </div>
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
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
