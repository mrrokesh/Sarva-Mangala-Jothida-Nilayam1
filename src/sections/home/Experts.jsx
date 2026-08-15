import SectionHeading from '../../components/ui/SectionHeading'
import BookCall from '../../components/ui/BookCall'
import { site } from '../../config/site'

export default function Experts() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="The astrologer" title={`${site.founder} — ${site.honorific}`}>
          <p className="font-medium text-navy/80">{site.degrees}</p>
          <p className="mt-3">
            {site.founderTamil} heads {site.name}. Readings are chart-specific — not generic rasi notes — covering marriage
            compatibility, career, health, childbirth, and remedies. Reports and voice briefings are available in Tamil and
            English.
          </p>
        </SectionHeading>
        <div className="mb-8 overflow-hidden rounded-2xl border border-maroon/15 shadow-xl">
          <img
            src={site.banner}
            alt={`${site.name} — ${site.founder}`}
            className="w-full object-cover object-center"
          />
        </div>
        <h3 className="mb-4 text-center font-display text-2xl text-navy">Best Astrologer in Salem — Traditional Jyotish</h3>
        <p className="mb-8 text-center leading-relaxed text-navy/70">
          If you want a traditional Tamil jyotisha reading with academic training behind it, book a consultation with{' '}
          {site.founder} at {site.name}. The same care is given to in-person visits in Salem and to online orders.
        </p>
        <div className="flex justify-center">
          <BookCall />
        </div>
      </div>
    </section>
  )
}
