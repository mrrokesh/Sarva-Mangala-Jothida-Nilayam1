import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import Button from './Button'

export default function BookCall({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button href={`tel:${site.phones[0].replace(/\s/g, '')}`} variant="gold">
        Book a Call
      </Button>
      <Button to="/enquiry" variant="outline">
        Send Enquiry
      </Button>
    </div>
  )
}

export function NewTag() {
  return (
    <span className="ml-2 inline-flex rounded bg-maroon px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
      New
    </span>
  )
}

const categoryImages = {
  'life-horoscope': '/images/services/svc-horoscope.png',
  'life-horoscope-combo': '/images/services/svc-horoscope.png',
  numerology: '/images/services/svc-numerology.png',
  consultation: '/images/services/svc-consultation.png',
  vastu: '/images/services/svc-vastu.png',
  palmistry: '/images/services/svc-palmistry.png',
  'predictions-2026': '/images/services/svc-predictions.png',
  transits: '/images/services/svc-transits.png',
  career: '/images/services/svc-career.png',
  marriage: '/images/services/svc-marriage.png',
  combo: '/images/services/svc-consultation.png',
  'ask-question': '/images/services/svc-voice.png',
  'shop-karungali': '/images/services/svc-karungali.png',
  'shop-pyramids': '/images/services/svc-pyramid.png',
  'shop-rudraksha': '/images/services/svc-rudraksha.png',
  'shop-gemstones': '/images/services/svc-gemstones.png',
}

export function ProductArt({ category, title, src }) {
  const image = src || categoryImages[category] || '/images/services/svc-horoscope.png'
  return (
    <div className="relative aspect-square overflow-hidden bg-cream-dark">
      <img src={image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 px-4 pb-4 font-display text-lg leading-snug text-white drop-shadow">
        {title}
      </p>
    </div>
  )
}

export function ServiceLink({ to, children }) {
  return (
    <Link to={to} className="block py-1 text-sm text-navy/70 transition hover:text-maroon">
      {children}
    </Link>
  )
}
