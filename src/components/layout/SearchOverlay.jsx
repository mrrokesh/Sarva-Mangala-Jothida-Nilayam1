import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchProducts } from '../../data/products'
import { formatInr, totalWithGst } from '../../lib/pricing'

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const results = useMemo(() => searchProducts(q), [q])

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/40 p-4 pt-24">
      <div className="w-full max-w-2xl rounded-2xl border border-maroon/15 bg-white p-4 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
          <Search size={18} className="text-maroon" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for services and products…"
            className="flex-1 bg-transparent outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>
        <div className="mt-3 max-h-80 overflow-y-auto">
          {!q && <p className="p-3 text-sm text-navy/60">Type a service name, for example “marriage matching”.</p>}
          {q && results.length === 0 && <p className="p-3 text-sm">No matches.</p>}
          {results.map((p) => (
            <Link
              key={p.slug}
              to={`/services/${p.slug}`}
              onClick={onClose}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-cream-dark"
            >
              <span className="text-sm">{p.title}</span>
              <span className="text-sm text-maroon">{formatInr(totalWithGst(p.price))}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
