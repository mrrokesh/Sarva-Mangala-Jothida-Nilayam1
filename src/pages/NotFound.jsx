import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-5xl">404</h1>
      <p className="mt-3 text-navy/70">This page is not in the chart.</p>
      <Button to="/" className="mt-6">
        Return home
      </Button>
    </div>
  )
}
