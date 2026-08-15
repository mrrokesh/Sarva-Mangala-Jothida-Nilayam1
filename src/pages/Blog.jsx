import { Link } from 'react-router-dom'
import { posts } from '../data/blog'
import SectionHeading from '../components/ui/SectionHeading'

export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <SectionHeading eyebrow="Journal" title="Blog" />
      <div className="space-y-8">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-2xl border border-gold/20 bg-cream p-6">
            <p className="text-xs uppercase tracking-wide text-maroon">
              {new Date(p.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </p>
            <h2 className="mt-2 font-display text-2xl">
              <Link to={`/blog/${p.slug}`} className="hover:text-maroon">
                {p.title}
              </Link>
            </h2>
            <p className="mt-3 text-navy/70">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`} className="mt-4 inline-block text-sm font-semibold text-maroon">
              Continue reading
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
