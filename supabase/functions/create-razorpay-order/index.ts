import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const keyId = Deno.env.get('RAZORPAY_KEY_ID')
  const secret = Deno.env.get('RAZORPAY_KEY_SECRET')
  if (!keyId || !secret) {
    return new Response(JSON.stringify({ error: 'Razorpay is not configured' }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  const { amount, currency = 'INR', receipt } = await req.json()
  const paise = Math.round(Number(amount) * 100)
  const auth = btoa(`${keyId}:${secret}`)

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: paise, currency, receipt: receipt || `cp_${Date.now()}` }),
  })

  const data = await res.json()
  if (!res.ok) {
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ orderId: data.id, amount: data.amount, currency: data.currency }), {
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
})
