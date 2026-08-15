import { site } from '../../config/site'
import SectionHeading from '../../components/ui/SectionHeading'

export default function Gallery() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Moments" title="Conferences & Felicitations">
          <p>From Annamalai and SASTRA ceremonies to World Tamil Astrologers gatherings.</p>
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.gallery.map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              className="h-56 w-full rounded-2xl object-cover shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
