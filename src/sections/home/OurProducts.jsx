import SectionHeading from '../../components/ui/SectionHeading'
import ProductCard from '../../components/ui/ProductCard'
import { featuredProducts } from '../../data/products'

export default function OurProducts() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Shop" title="Our Products">
          <p>Karungali, pyramids, rudraksha, and gemstones selected to complement your consultation.</p>
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts().map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
