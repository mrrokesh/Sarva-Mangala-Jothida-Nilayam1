import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const secret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET')
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature') || ''

  if (secret) {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    )
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body))
    const expected = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    if (expected !== signature) {
      return new Response('invalid signature', { status: 400 })
    }
  }

  const event = JSON.parse(body)
  const paymentId = event?.payload?.payment?.entity?.id
  const orderId = event?.payload?.payment?.entity?.order_id
  const status = event?.payload?.payment?.entity?.status

  const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))

  if (paymentId) {
    await supabase
      .from('orders')
      .update({ status: status === 'captured' ? 'paid' : status, payment_id: paymentId })
      .eq('razorpay_order_id', orderId)
  }

  return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
})
