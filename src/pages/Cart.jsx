import { Link } from 'react-router-dom'
import { useCart } from '../store/cartStore'
import { formatInr, totalWithGst } from '../lib/pricing'
import Button from '../components/ui/Button'

export default function Cart() {
  const items = useCart((s) => s.items)
  const removeItem = useCart((s) => s.removeItem)
  const updateQty = useCart((s) => s.updateQty)
  const subtotal = items.reduce((n, i) => n + totalWithGst(i.price) * i.qty, 0)

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">No products in the cart</h1>
        <p className="mt-3 text-navy/70">Browse services and add a reading to continue.</p>
        <Button to="/" className="mt-6">
          Continue shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-display text-4xl">Cart</h1>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-gold/20 bg-cream">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-gold">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Birth details</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.cartId} className="border-t border-navy/10 align-top">
                <td className="px-4 py-4">
                  <Link to={`/services/${item.slug}`} className="font-semibold hover:text-gold">
                    {item.title}
                  </Link>
                  <p className="text-navy/60">{formatInr(totalWithGst(item.price))} incl. GST</p>
                </td>
                <td className="px-4 py-4 text-navy/70">
                  {item.birthDetails ? (
                    <>
                      {item.birthDetails.name}
                      <br />
                      {item.birthDetails.dob} {item.birthDetails.tob}
                      <br />
                      {item.birthDetails.pob}
                    </>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) => updateQty(item.cartId, Number(e.target.value))}
                    className="w-16 rounded border px-2 py-1"
                  />
                </td>
                <td className="px-4 py-4 font-semibold">{formatInr(totalWithGst(item.price) * item.qty)}</td>
                <td className="px-4 py-4">
                  <button type="button" className="text-gold" onClick={() => removeItem(item.cartId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex flex-col items-end gap-3">
        <p className="text-lg">
          Subtotal (incl. GST): <strong>{formatInr(subtotal)}</strong>
        </p>
        <Button to="/checkout">Proceed to checkout</Button>
      </div>
    </div>
  )
}
