import SectionHeading from '../../components/ui/SectionHeading'
import { site } from '../../config/site'

export default function ServicesInDetail() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Our Services In Detail">
          <p>
            {site.name} ({site.nameTamil}) provides Vedic astrology services under {site.founder}: horoscope reports,
            voice-clip briefings, marriage matching, career timing, and in-person consultation at the Salem centre — all
            from date, time, and place of birth, in Tamil and English.
          </p>
        </SectionHeading>
      </div>
    </section>
  )
}
