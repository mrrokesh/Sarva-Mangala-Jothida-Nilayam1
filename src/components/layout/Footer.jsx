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
    <footer className="border-t border-maroon/10 bg-white text-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {footerGroups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-4 font-display text-xl text-maroon">{g.title}</h3>
            {g.slugs.map((slug) => {
              const p = products.find((x) => x.slug === slug)
              if (!p) return null
              return (
                <ServiceLink key={slug} to={`/services/${slug}`}>
                  {p.title}
                </ServiceLink>
              )
            })}
          </div>
        ))}
        <div>
          <h3 className="mb-4 font-display text-xl text-maroon">Follow us</h3>
          <p className="text-sm text-navy/70">{site.channel}</p>
          <p className="text-xs text-navy/50">{site.channelTamil}</p>
          <h3 className="mb-4 mt-8 font-display text-xl text-maroon">Contact Us</h3>
          <p className="mb-2 text-sm text-maroon">{site.founder}</p>
          {site.address.map((line) => (
            <p key={line} className="text-sm text-navy/70">
              {line}
            </p>
          ))}
          <p className="mt-3 text-sm">{site.phones.join(' / ')}</p>
          {site.email && <p className="text-sm">{site.email}</p>}
        </div>
        <div>
          <h3 className="mb-4 font-display text-xl text-maroon">Important Links</h3>
          <ServiceLink to="/privacy">Privacy Policy</ServiceLink>
          <ServiceLink to="/terms">Terms & Conditions</ServiceLink>
          <ServiceLink to="/cancellations">Cancellations Conditions</ServiceLink>
          <ServiceLink to="/shop">Shop</ServiceLink>
          <ServiceLink to="/blog">Blog</ServiceLink>
          <h3 className="mb-4 mt-8 font-display text-xl text-maroon">Reach Us</h3>
          <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="font-semibold text-maroon">
            Call us Now
          </a>
        </div>
      </div>
      <div className="border-t border-maroon/10 py-4 text-center text-xs text-navy/50">
        © {new Date().getFullYear()} {site.name} · {site.founder}. All rights reserved.
        {' · '}
        Developed by{' '}
        <a href="https://mrrokesh.com" target="_blank" rel="noreferrer" className="text-maroon hover:underline">
          MR_ROKESH
        </a>
      </div>
    </footer>
  )
}
