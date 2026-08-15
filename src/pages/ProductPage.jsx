import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, relatedProducts } from '../data/products'
import { gstLine, totalWithGst, formatInr } from '../lib/pricing'
import { useCart } from '../store/cartStore'
import Button from '../components/ui/Button'
import { ProductArt } from '../components/ui/BookCall'
import ProductCard from '../components/ui/ProductCard'
import CardTilt from '../components/three/CardTilt'

const emptyBirth = {
  name: '',
  fatherName: '',
  gender: 'Male',
  dob: '',
  tob: '',
  pob: '',
  language: 'English',
  email: '',
  mobile: '',
  terms: false,
  partnerName: '',
  partnerDob: '',
  partnerTob: '',
  partnerPob: '',
}

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const addItem = useCart((s) => s.addItem)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [birth, setBirth] = useState(emptyBirth)
  const [error, setError] = useState('')

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Service not found</h1>
        <Button to="/" className="mt-6">
          Back home
        </Button>
      </div>
    )
  }

  const needsMatch = /matching|compatibility|kundali|couple|partners/i.test(product.slug + product.title)

  function setField(k, v) {
    setBirth((b) => ({ ...b, [k]: v }))
  }

  function onAdd(e) {
    e.preventDefault()
    setError('')
    if (product.requiresBirthDetails) {
      if (!birth.name || !birth.dob || !birth.tob || !birth.pob || !birth.email || !birth.mobile) {
        setError('Please fill name, birth details, email, and mobile.')
        return
      }
      if (!birth.terms) {
        setError('Please accept the terms & conditions.')
        return
      }
    }
    addItem({
      slug: product.slug,
      title: product.title,
      price: product.price,
      requiresBirthDetails: product.requiresBirthDetails,
      birthDetails: product.requiresBirthDetails ? { ...birth } : null,
    })
    navigate('/cart')
  }

  const related = relatedProducts(product)

  return (
    <div className="bg-cream">
      <div className="bg-[#fff8f5] py-16 text-center text-navy">
        <p className="text-xs uppercase tracking-[0.3em] text-maroon">Service</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-navy/70">{product.excerpt}</p>
        <Button className="mt-6" onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}>
          Get this reading
        </Button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
        <CardTilt>
          <div className="overflow-hidden rounded-2xl border border-maroon/15 shadow-xl">
            <ProductArt category={product.category} title={product.title} />
          </div>
        </CardTilt>
        <div>
          <h2 className="font-display text-2xl text-navy">Your complete reading</h2>
          <p className="mt-4 leading-relaxed text-navy/75">{product.description}</p>
          <button type="button" className="mt-3 font-semibold text-maroon" onClick={() => setOpen((v) => !v)}>
            {open ? 'Read Less' : 'Read More'}
          </button>
          {open && (
            <p className="mt-4 text-navy/70 leading-relaxed">
              Please share accurate birth details. Reports are emailed. Voice clips, where included, are live recordings
              shared in 3 to 5 working days. Predictions are not computer generated.
            </p>
          )}
        </div>
      </div>

      <div id="order" className="bg-[#fff8f5] px-4 py-14 text-navy">
        <form onSubmit={onAdd} className="mx-auto max-w-3xl rounded-2xl border border-maroon/15 bg-white p-6 md:p-10">
          <h2 className="font-display text-3xl">
            {product.requiresBirthDetails ? 'Enter Your Birth Details' : 'Add to cart'}
          </h2>
          <p className="mt-2 font-semibold text-maroon">{gstLine(product.price)}</p>

          {product.requiresBirthDetails && (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Field label="Name*" value={birth.name} onChange={(v) => setField('name', v)} />
              <Field label="Father's Name" value={birth.fatherName} onChange={(v) => setField('fatherName', v)} />
              <label className="text-sm">
                Gender*
                <select
                  className="mt-1 w-full rounded-lg border border-maroon/20 bg-white px-3 py-2"
                  value={birth.gender}
                  onChange={(e) => setField('gender', e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>
              <Field label="Date of Birth*" type="date" value={birth.dob} onChange={(v) => setField('dob', v)} />
              <Field label="Time of Birth*" type="time" value={birth.tob} onChange={(v) => setField('tob', v)} />
              <Field label="Place of Birth*" value={birth.pob} onChange={(v) => setField('pob', v)} />
              <label className="text-sm">
                Language Preferred*
                <select
                  className="mt-1 w-full rounded-lg border border-maroon/20 bg-white px-3 py-2"
                  value={birth.language}
                  onChange={(e) => setField('language', e.target.value)}
                >
                  <option>Tamil</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                </select>
              </label>
              <Field label="Email*" type="email" value={birth.email} onChange={(v) => setField('email', v)} />
              <Field label="Mobile No.*" value={birth.mobile} onChange={(v) => setField('mobile', v)} />
              {needsMatch && (
                <>
                  <p className="mt-2 font-display text-lg text-maroon md:col-span-2">Partner details (for matching)</p>
                  <Field label="Partner Name" value={birth.partnerName} onChange={(v) => setField('partnerName', v)} />
                  <Field label="Partner Date of Birth" type="date" value={birth.partnerDob} onChange={(v) => setField('partnerDob', v)} />
                  <Field label="Partner Time of Birth" type="time" value={birth.partnerTob} onChange={(v) => setField('partnerTob', v)} />
                  <Field label="Partner Place of Birth" value={birth.partnerPob} onChange={(v) => setField('partnerPob', v)} />
                </>
              )}
              <label className="md:col-span-2 flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={birth.terms}
                  onChange={(e) => setField('terms', e.target.checked)}
                  className="mt-1"
                />
                Accept the{' '}
                <Link to="/terms" className="text-maroon underline">
                  terms & conditions
                </Link>
              </label>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-maroon">{error}</p>}
          <Button type="submit" className="mt-6">
            Add to cart — {formatInr(totalWithGst(product.price))}
          </Button>
        </form>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl">Process</h3>
          <p className="mt-3 text-navy/70 leading-relaxed">
            Evaluation takes a maximum of 3 hours to 3 days and includes a complete report on personal and professional
            themes with suitable remedies. The report is sent to the email you provide. Voice note clips are shared in 3 to
            5 working days. Answers are live recordings — not computer generated.
          </p>
        </div>
        <div className="rounded-2xl border border-maroon/15 bg-[#fff8f5] p-6 text-navy">
          <h3 className="font-display text-2xl text-maroon">After payment</h3>
          <p className="mt-3 leading-relaxed text-navy/70">
            Pay securely with Razorpay (UPI, cards, netbanking). Keep your order reference. Our coordinators will confirm
            on WhatsApp if any birth detail is unclear.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-white px-4 py-14">
          <h3 className="mb-8 text-center font-display text-3xl text-navy">You may also like</h3>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="text-sm">
      {label}
      <input
        type={type}
        required={label.includes('*')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-maroon/20 bg-white px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  )
}
