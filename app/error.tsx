'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-6xl mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-foreground dark:text-dark-foreground mb-4">
        Oops!
      </h1>
      <p className="text-2xl font-semibold text-foreground dark:text-dark-foreground mb-4">
        Something went wrong
      </p>
      <p className="text-secondary dark:text-gray-400 mb-8">
        We're sorry, but something unexpected happened. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}