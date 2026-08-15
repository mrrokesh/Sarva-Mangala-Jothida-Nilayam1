import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { formatInr } from '../lib/pricing'
import Button from '../components/ui/Button'

export default function OrderSuccess() {
  const { state } = useLocation()
  const id = state?.id
  const demo = state?.demo
  const amount = state?.amount
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello, I completed order ${id || ''} for ${amount ? formatInr(amount) : 'a consultation'}.`)}`

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-maroon">Thank you</p>
      <h1 className="mt-3 font-display text-4xl">Order received</h1>
      {id && <p className="mt-3 text-navy/70">Reference: {id}</p>}
      {demo && <p className="mt-2 text-sm text-maroon">Demo checkout — no live payment was captured.</p>}
      {amount && <p className="mt-2 font-semibold">{formatInr(amount)} incl. GST</p>}
      <p className="mt-6 text-navy/70">
        Our team will prepare your report from the birth details you submitted. Typical delivery is 3 hours to 3 working
        days by email. Voice clips follow in 3–5 working days.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={wa}>Confirm on WhatsApp</Button>
        <Button to="/" variant="maroon">
          Back home
        </Button>
      </div>
      <p className="mt-6 text-sm">
        Need help? <Link to="/enquiry" className="text-maroon underline">Send an enquiry</Link>
      </p>
    </div>
  )
}
