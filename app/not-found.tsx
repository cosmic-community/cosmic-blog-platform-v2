import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-foreground dark:text-dark-foreground mb-4">
        404
      </h1>
      <p className="text-2xl font-semibold text-foreground dark:text-dark-foreground mb-4">
        Page Not Found
      </p>
      <p className="text-secondary dark:text-gray-400 mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}