import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { products } from '../../data/products'
import { ServiceLink } from '../ui/BookCall'

const footerGroups = [
  {
    title: 'Life Horoscope',
    slugs: [
      'life-horoscope-detailed',
      'life-horoscope-briefing-audio',
      'varshaphala-audio',
      'varshaphala-10-years',
      'varshaphala-ask-one-question',
      'life-horoscope-tamil-english',
      'life-horoscope-briefing-family',
      'life-horoscope-family-combo',
    ],
  },
  {
    title: 'Combo Services',
    slugs: [
      'life-horoscope-ask-2026',
      'life-horoscope-varshaphala',
      'life-horoscope-varshaphala-gemstone',
      'life-horoscope-wealth-voice',
      'life-horoscope-numerology',
      'life-horoscope-numerology-wealth',
      'life-horoscope-monthly',
      'life-horoscope-gemstone',
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {footerGroups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-4 font-display text-xl text-gold">{g.title}</h3>
            {g.slugs.map((slug) => {
              const p = products.find((x) => x.slug === slug)
              if (!p) return null
              return (
                <ServiceLink key={slug} to={`/services/${slug}`} className="text-cream/70 hover:text-gold">
                  {p.title}
                </ServiceLink>
              )
            })}
          </div>
        ))}
        <div>
          <h3 className="mb-4 font-display text-xl text-gold">Follow us</h3>
          <p className="text-sm text-cream/70">{site.channel}</p>
          <p className="text-xs text-cream/50">{site.channelTamil}</p>
          <h3 className="mb-4 mt-8 font-display text-xl text-gold">Contact Us</h3>
          <p className="mb-2 text-sm text-gold">{site.founder}</p>
          {site.address.map((line) => (
            <p key={line} className="text-sm text-cream/70">
              {line}
            </p>
          ))}
          <p className="mt-3 text-sm">{site.phones.join(' / ')}</p>
          {site.email && <p className="text-sm">{site.email}</p>}
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl text-gold">Important Links</h3>
          <ServiceLink to="/privacy" className="text-cream/70 hover:text-gold">Privacy Policy</ServiceLink>
          <ServiceLink to="/terms" className="text-cream/70 hover:text-gold">Terms & Conditions</ServiceLink>
          <ServiceLink to="/cancellations" className="text-cream/70 hover:text-gold">Cancellations Conditions</ServiceLink>
          <ServiceLink to="/shop" className="text-cream/70 hover:text-gold">Shop</ServiceLink>
          <ServiceLink to="/blog" className="text-cream/70 hover:text-gold">Blog</ServiceLink>
          <h3 className="mb-4 mt-8 font-display text-xl text-gold">Reach Us</h3>
          <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="font-semibold text-gold">
            Call us Now
          </a>
        </div>
      </div>
      <div className="border-t border-gold/15 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {site.name} · {site.founder}. All rights reserved.
        {' · '}
        Developed by{' '}
        <a href="https://mrrokesh.com" target="_blank" rel="noreferrer" className="text-gold hover:underline">
          MR_ROKESH
        </a>
      </div>
    </footer>
  )
}
