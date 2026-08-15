import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/blog'
import Button from '../components/ui/Button'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Article not found</h1>
        <Button to="/blog" className="mt-6">
          Back to blog
        </Button>
      </div>
    )
  }
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Link to="/blog" className="text-sm text-maroon">
        ← Blog
      </Link>
      <p className="mt-4 text-xs uppercase tracking-wide text-maroon">
        {new Date(post.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
      </p>
      <h1 className="mt-2 font-display text-4xl">{post.title}</h1>
      {post.content.split('\n\n').map((para) => (
        <p key={para.slice(0, 24)} className="mt-5 leading-relaxed text-navy/80">
          {para}
        </p>
      ))}
    </article>
  )
}
