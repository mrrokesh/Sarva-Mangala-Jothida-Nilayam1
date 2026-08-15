import { Link } from 'react-router-dom'
import CardTilt from '../three/CardTilt'
import Button from './Button'
import { ProductArt, NewTag } from './BookCall'
import { formatInr, totalWithGst } from '../../lib/pricing'

export default function ProductCard({ product }) {
  return (
    <CardTilt className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-maroon/15 bg-white shadow-lg shadow-maroon/5">
        <Link to={`/services/${product.slug}`} className="block">
          <ProductArt category={product.category} title={product.title} />
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg leading-snug text-navy">
            {product.title}
            {product.isNew && <NewTag />}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-navy/65">{product.excerpt}</p>
          <p className="mt-3 font-semibold text-maroon">{formatInr(totalWithGst(product.price))}</p>
          <div className="mt-auto pt-4">
            <Button to={`/services/${product.slug}`} className="w-full">
              Order Now
            </Button>
          </div>
        </div>
      </article>
    </CardTilt>
  )
}
