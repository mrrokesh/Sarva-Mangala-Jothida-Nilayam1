import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import SectionHeading from '../../components/ui/SectionHeading'
import BookCall from '../../components/ui/BookCall'
import { reviews } from '../../data/reviews'

export default function Reviews() {
  const [i, setI] = useState(0)
  const r = reviews[i]
  return (
    <section className="bg-navy-soft px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Testimonials" title="Hear From Our Clients">
          <p>{reviews.length} verified-style client notes from consultations and reports.</p>
        </SectionHeading>
        <div className="rounded-2xl border border-gold/20 bg-cream p-8 text-center">
          <div className="mb-3 flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, n) => (
              <Star key={n} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="font-display text-xl text-navy">{r.name}</p>
          <p className="mt-4 leading-relaxed text-navy/70">“{r.text}”</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full border border-gold/40 p-2 text-gold"
              onClick={() => setI((v) => (v - 1 + reviews.length) % reviews.length)}
              aria-label="Previous review"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="rounded-full border border-gold/40 p-2 text-gold"
              onClick={() => setI((v) => (v + 1) % reviews.length)}
              aria-label="Next review"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <BookCall />
        </div>
      </div>
    </section>
  )
}
