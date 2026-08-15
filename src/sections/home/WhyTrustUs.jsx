import { useState } from 'react'
import SectionHeading from '../../components/ui/SectionHeading'
import { site } from '../../config/site'

export default function WhyTrustUs() {
  const [open, setOpen] = useState(false)
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Trust" title="Why Trust Us">
          <p>
            {site.name} is the practice of {site.founder}, {site.honorific} — {site.degrees}. Families in Salem and across
            Tamil Nadu come here for detailed horoscope readings, birth-chart analysis, and personalised Vedic consultation
            from date, time, and place of birth.
          </p>
        </SectionHeading>
        <div className="text-center">
          <button type="button" onClick={() => setOpen((v) => !v)} className="text-maroon font-semibold underline">
            {open ? 'Read Less' : 'Read More'}
          </button>
        </div>
        {open && (
          <p className="mt-6 leading-relaxed text-navy/75">
            Services include Rasi, Navamsa, Dasamsa, Shadbala, Ashtakavarga, nakshatra prediction, and Dasa–Bhukti.
            Consultations cover health, career, marriage matching, childbirth, business, and finances. Reports are prepared
            by {site.founder} — not auto-generated — in Tamil and English. His honours include Jyotisha Vachaspati, Jothida
            Samrat, Jyothisha Vitthagar, and Traditional Astrology Expert, with an M.A. (Astrology) from Annamalai
            University and a Ph.D. (Astrology).
          </p>
        )}
      </div>
    </section>
  )
}
