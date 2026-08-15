import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { NewTag } from '../ui/BookCall'

function ItemLink({ item, onNavigate }) {
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="flex items-center justify-between gap-2 px-4 py-2 text-sm text-navy/80 hover:bg-maroon/8 hover:text-maroon"
    >
      <span>
        {item.label}
        {item.isNew && <NewTag />}
      </span>
    </Link>
  )
}

function DesktopSub({ items, onNavigate }) {
  return (
    <div className="absolute left-full top-0 z-50 max-h-[70vh] min-w-72 overflow-y-auto rounded-md border border-maroon/15 bg-white py-2 shadow-2xl">
      {items.map((item) =>
        item.children ? (
          <div key={item.label} className="group/sub relative">
            <p className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-maroon">
              {item.label}
              <ChevronRight size={14} />
            </p>
            <div className="invisible absolute left-full top-0 opacity-0 group-hover/sub:visible group-hover/sub:opacity-100">
              <DesktopSub items={item.children} onNavigate={onNavigate} />
            </div>
          </div>
        ) : (
          <ItemLink key={item.label + item.to} item={item} onNavigate={onNavigate} />
        ),
      )}
    </div>
  )
}

export function DesktopMega({ items, onNavigate }) {
  return (
    <div className="invisible absolute left-0 top-full z-50 max-h-[75vh] min-w-80 overflow-y-auto rounded-md border border-maroon/15 bg-white py-2 opacity-0 shadow-2xl group-hover:visible group-hover:opacity-100">
      {items.map((item) =>
        item.children ? (
          <div key={item.label} className="group/mid relative">
            <p className="flex items-center justify-between px-4 py-2 text-sm font-semibold uppercase tracking-wide text-maroon">
              {item.label}
              <ChevronRight size={14} />
            </p>
            <div className="invisible absolute left-full top-0 opacity-0 group-hover/mid:visible group-hover/mid:opacity-100">
              <DesktopSub items={item.children} onNavigate={onNavigate} />
            </div>
          </div>
        ) : (
          <ItemLink key={item.label + item.to} item={item} onNavigate={onNavigate} />
        ),
      )}
    </div>
  )
}

export function MobileMenu({ items, open, onClose }) {
  const [stack, setStack] = useState([{ title: 'Menu', items }])
  const current = stack[stack.length - 1]

  useEffect(() => {
    if (open) setStack([{ title: 'Menu', items }])
  }, [open, items])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button className="absolute inset-0 bg-navy/40" onClick={onClose} aria-label="Close menu" />
      <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white text-navy shadow-2xl">
        <div className="flex items-center gap-2 border-b border-maroon/10 px-4 py-4">
          {stack.length > 1 && (
            <button
              type="button"
              onClick={() => setStack((s) => s.slice(0, -1))}
              className="flex items-center gap-1 text-maroon"
            >
              <ChevronLeft size={18} /> Back
            </button>
          )}
          <p className="flex-1 font-display text-lg">{current.title}</p>
          <button type="button" onClick={onClose} className="text-navy/60">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {current.items.map((item) =>
            item.children ? (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-maroon/5"
                onClick={() => setStack((s) => [...s, { title: item.label, items: item.children }])}
              >
                {item.label}
                <ChevronRight size={16} className="text-maroon" />
              </button>
            ) : (
              <Link
                key={item.label + item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 hover:bg-maroon/5"
              >
                <span>
                  {item.label}
                  {item.isNew && <NewTag />}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export function useClickOutside(handler) {
  const ref = useRef(null)
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [handler])
  return ref
}
