import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

const pages = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      `${site.name} collects birth details, contact information, and payment references solely to prepare consultations and fulfil orders.`,
      'We do not sell personal data. Birth charts are treated as confidential. Payment card data is processed by Razorpay and never stored on our servers.',
      'You may request deletion of stored enquiry or order notes by emailing us. Hosting and analytics providers may process technical logs.',
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    body: [
      'Astrology reports are interpretive guidance based on the birth details you provide. They are not medical, legal, or financial advice.',
      'Accuracy of predictions depends on correct birth time and the astrologer’s reading. Outcomes are not guaranteed.',
      'Reports and voice clips are licensed to the purchaser for personal use. Redistribution is not permitted.',
      `By placing an order you agree to pay the listed price including GST and to the delivery windows stated on each service page.`,
    ],
  },
  cancellations: {
    title: 'Cancellations Conditions',
    body: [
      'Digital consultations begin once payment is confirmed and birth details are received. Cancellations after work has started are not refundable.',
      'If a duplicate payment is made in error, contact us within 48 hours with the payment reference.',
      'Physical products (malas, pyramids, gemstones) may be cancelled before dispatch. Shipping damage claims require photos within 48 hours of delivery.',
      'Refunds, where approved, are returned to the original payment method within 7–10 working days.',
    ],
  },
}

export default function Legal() {
  const path = useLocation().pathname.replace(/^\//, '')
  const data = pages[path] || pages.privacy
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl">{data.title}</h1>
      {data.body.map((p) => (
        <p key={p.slice(0, 40)} className="mt-5 leading-relaxed text-navy/75">
          {p}
        </p>
      ))}
    </div>
  )
}
