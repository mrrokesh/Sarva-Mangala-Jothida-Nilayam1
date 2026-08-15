import { useParams } from 'react-router-dom'
import { products, shopCategories, getByCategory } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'

export default function Shop() {
  const { category } = useParams()
  const match = shopCategories.find((c) => c.slug === category)
  const list = match ? getByCategory(match.category) : products.filter((p) => p.category.startsWith('shop-'))
  const title = match ? match.label : 'Shop'

  return (
    <div className="bg-cream px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Store" title={title}>
          <p>Spiritual products to complement your consultation — karungali, pyramids, rudraksha, and gemstones.</p>
        </SectionHeading>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Button to="/shop" variant={category ? 'outline' : 'gold'} className="!text-navy border-maroon">
            All
          </Button>
          {shopCategories.map((c) => (
            <Button
              key={c.slug}
              to={`/shop/${c.slug}`}
              variant={category === c.slug ? 'gold' : 'outline'}
              className={category === c.slug ? '' : '!border-maroon !text-navy hover:!bg-maroon hover:!text-white'}
            >
              {c.label}
            </Button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
