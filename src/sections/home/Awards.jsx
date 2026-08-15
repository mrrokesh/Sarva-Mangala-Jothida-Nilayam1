import { site } from '../../config/site'
import SectionHeading from '../../components/ui/SectionHeading'
import CardTilt from '../../components/three/CardTilt'

export default function Awards() {
  return (
    <section className="bg-navy-soft px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Honours" title="Awards & Qualifications">
          <p>
            Titles and degrees conferred on {site.founder} — Jyotisha Vachaspati, Jothida Samrat, Jyothisha Vitthagar, and
            Ph.D. (Astrology).
          </p>
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.awards.map((a) => (
            <CardTilt key={a.src}>
              <article className="h-full overflow-hidden rounded-2xl border border-gold/20 bg-cream">
                <img src={a.src} alt={a.title} className="h-52 w-full object-cover object-top" />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-gold">{a.year}</p>
                  <h3 className="mt-1 font-display text-lg text-navy">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/65">{a.detail}</p>
                </div>
              </article>
            </CardTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
