import { lazy, Suspense } from 'react'
import SectionHeading from '../../components/ui/SectionHeading'
import BookCall from '../../components/ui/BookCall'
import { site } from '../../config/site'

const MandalaScene = lazy(() => import('../../components/three/MandalaScene'))

export default function AboutUs() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section className="bg-[#fff8f5] px-4 py-16 text-navy">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-maroon/15 shadow-xl shadow-maroon/10">
            <img
              src={site.portrait}
              alt={site.founder}
              className="aspect-[4/5] w-full object-cover object-[center_15%]"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden h-36 w-36 overflow-hidden rounded-2xl border border-maroon/20 lg:block">
            {reduced ? (
              <div className="h-full bg-[#fff8f5] star-grid" />
            ) : (
              <Suspense fallback={<div className="h-full bg-[#fff8f5]" />}>
                <MandalaScene />
              </Suspense>
            )}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow={site.honorific} title="About Us" center={false}>
            <p>
              {site.name} ({site.nameTamil}) is the Salem house of {site.founder}, also known as {site.honorific}. He
              holds {site.degrees} and prepares every reading from date, time, and place of birth — in Tamil and English.
            </p>
          </SectionHeading>
          <p className="mb-4 leading-relaxed text-navy/70">
            His work covers Rasi and Navamsa, dasa–bhukti, marriage matching (Jathagam Porutham), career timing, childbirth,
            and remedies. Titles include Jyotisha Vachaspati (2016), Jothida Samrat (2018), Jyothisha Vitthagar (2023), and
            Traditional Astrology Expert (2025). His M.A. in Astrology is from Annamalai University in collaboration with
            SASTRA, Madurai. His Ph.D. (Astrology) was conferred in 2018.
          </p>
          <p className="mb-6 leading-relaxed text-navy/70">
            Consultations are given from the centre opposite Salem Government Medical College, and online for families
            across India and abroad. Talks also appear on {site.channel} ({site.channelTamil}).
          </p>
          <BookCall />
        </div>
      </div>
    </section>
  )
}
