import { site } from '../../config/site'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
      <path d="M17.47 14.38c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3s.99 2.67 1.12 2.85c.14.18 1.95 2.98 4.73 4.18 1.76.76 2.45.83 3.33.7.51-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z" />
      <path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.89-4.43 9.89-9.89C21.94 6.43 17.5 2 12.04 2zm0 18.07h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.24-8.17 8.24z" />
    </svg>
  )
}

export default function WhatsAppFloat() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello, I would like to enquire about a horoscope service.')}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-navy/30 hover:scale-105 transition"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  )
}
