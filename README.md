# Sarva Mangala Jothida Nilayam

**சர்வ மங்கள ஜோதிட நிலையம்**

Traditional Vedic astrology storefront for **Dr. Elangho Thirunavukkarasu** (Mithuna Rishi) in Salem. Tamil and English consultations, life horoscopes, combo reports, online bookings, and GST-inclusive checkout.

**Astrologer:** Dr. Elangho Thirunavukkarasu — B.Sc., M.A., M.Ed., M.A., M.Phil., M.A., Ph.D. (Astro)  
**Channel:** Mithuna Rishi Astro Channel  
**Repository:** [github.com/mrrokesh/Sarva-Mangala-Jothida-Nilayam1](https://github.com/mrrokesh/Sarva-Mangala-Jothida-Nilayam1)

## Contact

| | |
| --- | --- |
| Phone | +91 99766 48444 / +91 73 73 273 273 |
| WhatsApp | [+91 99766 48444](https://wa.me/919976648444) |
| Address | 3/131-A, Dharshini Nagar, Ratna Garden 1st Street, Opposite Salem Government Medical College, Steel Plant Road, S. Kollapatti (PO), Salem 636 030, Tamil Nadu, India |

## What the site includes

- Home page with 3D hero, about, experts, awards, gallery, reviews, videos, and FAQ
- About 90 services across horoscope, consultation, marriage, career, vastu, palmistry, and shop categories
- Mega menu, birth-detail forms, cart, and 18% GST pricing
- Razorpay checkout with optional Supabase orders (demo mode works without keys)
- Enquiry form, blog, and legal pages (privacy, terms, cancellations)
- WhatsApp and call buttons throughout

Brand copy, phones, address, awards, and videos are configured in [`src/config/site.js`](src/config/site.js). The catalog lives in [`src/data/products.js`](src/data/products.js).

## Stack

React 19, Vite, Tailwind CSS v4, React Router, Zustand, Framer Motion, React Three Fiber, Razorpay, and optional Supabase.

## Local setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
npm run preview  # preview the build
```

## Environment

Copy `.env.example` to `.env`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

Without keys, cart and checkout still work in **demo mode** (orders are saved to `localStorage`).

## Payments (optional)

1. Run [`supabase/migrations/001_schema.sql`](supabase/migrations/001_schema.sql) in the Supabase SQL editor.
2. Deploy Edge Functions `create-razorpay-order` and `razorpay-webhook`.
3. Set secrets: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.
4. Point the Razorpay webhook at the `razorpay-webhook` function URL.

## Brand edits

Change name, phones, address, awards, and videos in `src/config/site.js`. Replace `public/logo.jpg` for the header mark.

## Credit

Developed by [MR_ROKESH](https://mrrokesh.com).
