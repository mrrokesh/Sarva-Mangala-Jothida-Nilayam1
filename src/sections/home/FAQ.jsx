import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../../components/ui/SectionHeading'
import { faqs } from '../../data/faqs'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="FAQs" />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-xl border border-navy/10 bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {f.q}
                <ChevronDown className={`shrink-0 transition ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <p className="px-5 pb-4 text-navy/70 leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
