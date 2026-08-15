import { site } from '../../config/site'
import SectionHeading from '../../components/ui/SectionHeading'

export default function Videos() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={site.channel} title="Watch His Guidance">
          <p>Talks by {site.founder} on astrology, marriage, the child chart, and life direction.</p>
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {site.videos.map((v) => (
            <figure key={v.src} className="overflow-hidden rounded-2xl border border-gold/20 bg-cream">
              <video controls preload="metadata" className="aspect-video w-full bg-black" src={v.src}>
                <track kind="captions" />
              </video>
              <figcaption className="px-4 py-3 font-display text-navy">{v.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
