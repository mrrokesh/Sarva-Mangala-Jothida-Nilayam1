import SectionHeading from '../../components/ui/SectionHeading'
import ProductCard from '../../components/ui/ProductCard'
import { featuredServices } from '../../data/products'

export default function OurServices() {
  return (
    <section className="star-grid bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Offerings" title="Our Services">
          <p>
            {`Leading online consultation for general horoscope predictions, Rasi, Navamsa, Dasamsa, Shadbala, Ashtakavarga,
            star prediction, Dasa–Bhukti, character, planetary yogas, and remedies.`}
          </p>
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices().map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
