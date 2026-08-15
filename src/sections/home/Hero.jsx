import Button from '../../components/ui/Button'
import { site } from '../../config/site'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-soft">
      <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-12">
        <img
          src={site.banner}
          alt={`${site.name} — ${site.founder}`}
          className="w-full rounded-2xl border border-gold/30 object-cover shadow-2xl"
        />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold/20 bg-cream px-6 py-5 md:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">{site.tagline}</p>
            <p className="mt-1 font-display text-xl text-navy md:text-2xl">{site.founder}</p>
            <p className="text-sm text-navy/70">{site.degrees}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/services/life-horoscope-detailed">Get Your Life Horoscope</Button>
            <Button to="/enquiry" variant="outline">
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
