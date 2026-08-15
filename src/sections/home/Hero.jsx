import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import { site } from '../../config/site'

const HeroScene = lazy(() => import('../../components/three/HeroScene'))

const slides = [
  {
    title: 'Sarva Mangala Jothida Nilayam',
    subtitle: 'Traditional Vedic consultation by Dr. Elangho Thirunavukkarasu — Mithuna Rishi, Ph.D. (Astro), Salem.',
  },
  {
    title: 'சர்வ மங்கள ஜோதிட நிலையம்',
    subtitle: 'முனைவர். இளங்கோ திருநாவுக்கரசு — ஜாதகம், பொருத்தம், தொழில், திருமணம். தமிழிலும் ஆங்கிலத்திலும்.',
  },
  {
    title: 'Marriage & Career Compatibility',
    subtitle: 'Jathagam porutham and career timing, explained from your birth chart — not a generic rasi note.',
  },
  {
    title: 'Jothida Samrat · Jyotisha Vachaspati',
    subtitle: 'Awarded astrologer with M.A. (Astrology), Annamalai University, and Ph.D. (Astrology).',
  },
]

export default function Hero() {
  const [i, setI] = useState(0)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduced) return undefined
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), 5500)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#fff8f5] text-navy">
      {!reduced && (
        <Suspense fallback={<div className="absolute inset-0 bg-[#fff8f5]" />}>
          <HeroScene />
        </Suspense>
      )}
      {reduced && <div className="absolute inset-0 star-grid bg-[#fff8f5]" />}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/55 to-white" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-maroon">{site.tagline}</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="mt-4 font-display text-4xl md:text-6xl gold-text">{slides[i].title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-navy/70">{slides[i].subtitle}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/services/life-horoscope-detailed">Get Your Life Horoscope</Button>
          <Button to="/enquiry" variant="outline">
            Book a Consultation
          </Button>
        </div>
        <div className="mt-10 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 w-8 rounded-full ${idx === i ? 'bg-maroon' : 'bg-maroon/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
