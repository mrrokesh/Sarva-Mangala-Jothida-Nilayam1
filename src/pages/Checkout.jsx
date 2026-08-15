import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartStore'
import { formatInr, totalWithGst } from '../lib/pricing'
import { hasRazorpay } from '../lib/supabase'
import { persistOrder, startRazorpay } from '../lib/checkout'
import Button from '../components/ui/Button'

export default function Checkout() {
  const items = useCart((s) => s.items)
  const subtotal = items.reduce((n, i) => n + totalWithGst(i.price) * i.qty, 0)
  const clear = useCart((s) => s.clear)
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [billing, setBilling] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    pincode: '',
  })

  function setField(k, v) {
    setBilling((b) => ({ ...b, [k]: v }))
  }

  async function onPay(e) {
    e.preventDefault()
    setError('')
    if (!items.length) return
    if (!billing.name || !billing.email || !billing.mobile) {
      setError('Please fill name, email, and mobile.')
      return
    }
    setBusy(true)
    try {
      await startRazorpay({
        amount: subtotal,
        billing,
        onSuccess: async (payment) => {
          const id = await persistOrder({ items, billing, amount: subtotal, payment })
          clear()
          navigate('/order-success', { state: { id, demo: payment.status === 'paid_demo', amount: subtotal } })
        },
      })
    } catch (err) {
      setError(err.message || 'Payment could not start.')
    } finally {
      setBusy(false)
    }
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <Button to="/cart" className="mt-6">
          Back to cart
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 lg:grid-cols-2">
      <form onSubmit={onPay} className="rounded-2xl border border-gold/20 bg-cream p-6">
        <h1 className="font-display text-3xl">Checkout</h1>
        {!hasRazorpay && (
          <p className="mt-4 rounded-lg bg-maroon/10 px-3 py-2 text-sm">
            Razorpay keys are not set. Checkout will complete in demo mode. Add <code>VITE_RAZORPAY_KEY_ID</code> to enable
            live UPI / cards.
          </p>
        )}
        <div className="mt-6 grid gap-4">
          <Field label="Full name*" value={billing.name} onChange={(v) => setField('name', v)} />
          <Field label="Email*" type="email" value={billing.email} onChange={(v) => setField('email', v)} />
          <Field label="Mobile*" value={billing.mobile} onChange={(v) => setField('mobile', v)} />
          <Field label="Address" value={billing.address} onChange={(v) => setField('address', v)} />
          <Field label="City" value={billing.city} onChange={(v) => setField('city', v)} />
          <Field label="PIN code" value={billing.pincode} onChange={(v) => setField('pincode', v)} />
        </div>
        {error && <p className="mt-4 text-sm text-maroon">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={busy}>
          {busy ? 'Please wait…' : `Pay ${formatInr(subtotal)}`}
        </Button>
      </form>
      <aside className="rounded-2xl border border-maroon/15 bg-navy-soft p-6 text-navy">
        <h2 className="font-display text-2xl text-maroon">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.cartId} className="flex justify-between gap-4">
              <span>
                {i.title} × {i.qty}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg">
          Total incl. GST: <strong>{formatInr(subtotal)}</strong>
        </p>
      </aside>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="text-sm">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  )
}
