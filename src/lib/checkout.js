import { site } from '../config/site'
import { hasRazorpay, hasSupabase, razorpayKey, supabase } from './supabase'

export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function persistOrder({ items, billing, amount, payment }) {
  const record = {
    customer_name: billing.name,
    email: billing.email,
    mobile: billing.mobile,
    address: billing.address,
    city: billing.city,
    pincode: billing.pincode,
    amount,
    status: payment.status,
    payment_id: payment.id || null,
    razorpay_order_id: payment.orderId || null,
    items,
  }

  if (hasSupabase) {
    const { data, error } = await supabase.from('orders').insert(record).select('id').single()
    if (error) throw error
    const orderId = data.id
    await supabase.from('order_items').insert(
      items.map((i) => ({
        order_id: orderId,
        slug: i.slug,
        title: i.title,
        price: i.price,
        qty: i.qty,
        birth_details: i.birthDetails,
      })),
    )
    return orderId
  }

  const localId = `local-${Date.now()}`
  const existing = JSON.parse(localStorage.getItem('cp-orders') || '[]')
  existing.push({ id: localId, ...record, created_at: new Date().toISOString() })
  localStorage.setItem('cp-orders', JSON.stringify(existing))
  return localId
}

export async function startRazorpay({ amount, billing, onSuccess }) {
  if (!hasRazorpay) {
    await onSuccess({ id: `demo_${Date.now()}`, status: 'paid_demo' })
    return
  }

  const ok = await loadRazorpay()
  if (!ok) throw new Error('Razorpay failed to load')

  let orderId
  if (hasSupabase) {
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount, currency: 'INR', receipt: `cp_${Date.now()}` },
    })
    if (error) throw error
    orderId = data?.orderId
  }

  const rzp = new window.Razorpay({
    key: razorpayKey,
    amount: amount * 100,
    currency: 'INR',
    name: site.name,
    description: 'Astrology consultation order',
    order_id: orderId,
    prefill: { name: billing.name, email: billing.email, contact: billing.mobile },
    theme: { color: '#6B1D2A' },
    handler: (response) => {
      onSuccess({
        id: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        status: 'paid',
      })
    },
  })
  rzp.open()
}
