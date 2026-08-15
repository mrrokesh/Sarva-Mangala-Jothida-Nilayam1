import { site } from '../config/site'

export function gstAmount(base) {
  return Math.round(Number(base) * site.gstRate)
}

export function totalWithGst(base) {
  return Number(base) + gstAmount(base)
}

export function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function priceLabel(base) {
  const gst = gstAmount(base)
  const total = totalWithGst(base)
  return `₹${base}+${Math.round(site.gstRate * 100)}% GST = ${formatInr(total).replace('₹', '₹')}`
}

export function gstLine(base) {
  return `₹${base} + ${Math.round(site.gstRate * 100)}% GST (${formatInr(gstAmount(base))}) = ${formatInr(totalWithGst(base))}`
}
