import { useState } from 'react'
import { site } from '../config/site'
import { supabase, hasSupabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'

export default function Enquiry() {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    pob: '',
    tob: '',
    email: '',
    whatsapp: '',
    message: '',
  })
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.fullName || !form.email || !form.whatsapp) {
      setError('Please fill name, email, and WhatsApp number.')
      return
    }
    const payload = { ...form }
    if (hasSupabase) {
      const { error: err } = await supabase.from('enquiries').insert(payload)
      if (err) {
        setError(err.message)
        return
      }
    } else {
      const list = JSON.parse(localStorage.getItem('cp-enquiries') || '[]')
      list.push({ ...payload, created_at: new Date().toISOString() })
      localStorage.setItem('cp-enquiries', JSON.stringify(list))
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Enquiry received</h1>
        <p className="mt-4 text-navy/70">Our coordinator will reach you on WhatsApp or email shortly.</p>
        <Button href={`https://wa.me/${site.whatsapp}`} className="mt-6">
          Message us now
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white text-navy">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-maroon">{site.nameTamil}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Consult {site.founder}</h1>
        <p className="mt-4 text-navy/70">
          {site.honorific} · {site.degrees}. Share your birth details for a personalised reading on love, career, and
          destiny.
        </p>
        <p className="mt-2 text-sm text-maroon">{site.address[2]}</p>
      </div>
      <div className="bg-[#fff8f5] px-4 py-14 text-navy">
        <div className="mx-auto max-w-xl">
          <SectionHeading title="What you’ll get" />
          <ul className="mb-8 list-disc space-y-2 pl-5 text-navy/75">
            <li>Planetary influences and key life insights</li>
            <li>Compatibility and relationship guidance</li>
            <li>Career and financial growth predictions</li>
            <li>Remedies to work with current dasa challenges</li>
          </ul>
          <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-navy/10 bg-white p-6">
            <Field label="Full Name" value={form.fullName} onChange={(v) => setField('fullName', v)} />
            <Field label="Date of Birth" type="date" value={form.dob} onChange={(v) => setField('dob', v)} />
            <label className="text-sm">
              Gender
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={form.gender}
                onChange={(e) => setField('gender', e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
            <Field label="Place of Birth" value={form.pob} onChange={(v) => setField('pob', v)} />
            <Field label="Time of Birth" type="time" value={form.tob} onChange={(v) => setField('tob', v)} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setField('email', v)} />
            <Field label="WhatsApp Number" value={form.whatsapp} onChange={(v) => setField('whatsapp', v)} />
            <label className="text-sm">
              Message
              <textarea
                className="mt-1 w-full rounded-lg border px-3 py-2"
                rows={4}
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
              />
            </label>
            {error && <p className="text-sm text-maroon">{error}</p>}
            <Button type="submit">Get your life horoscope now</Button>
          </form>
        </div>
      </div>
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
        className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  )
}
