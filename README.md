# Sarva Mangala Jothida Nilayam

Vedic astrology storefront for **Dr. Elangho Thirunavukkarasu** (Mithuna Rishi), Salem. Mega menu, ~90 services, birth-detail forms, GST pricing, cart, Razorpay checkout, blog, enquiry, awards, and shop categories.

Built with **React + Vite + Tailwind CSS**, with 3D hero and mandala scenes. Brand, phones, address, awards, and videos live in [`src/config/site.js`](src/config/site.js).

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Brand swap

Edit `src/config/site.js` and replace `public/logo.svg`.

## Environment

Copy `.env.example` to `.env`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RAZORPAY_KEY_ID=
```

Without keys, cart and checkout still work in **demo mode** (orders saved to `localStorage`).

## Supabase + Razorpay

1. Run [`supabase/migrations/001_schema.sql`](supabase/migrations/001_schema.sql) in the SQL editor.
2. Deploy Edge Functions `create-razorpay-order` and `razorpay-webhook`.
3. Set secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
4. Point the Razorpay webhook at the `razorpay-webhook` function URL.

The catalog ships from [`src/data/products.js`](src/data/products.js) so the UI works before the database is connected.
