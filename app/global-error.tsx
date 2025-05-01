'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">خطا</h1>
                <p className="text-xl text-gray-600 mb-8">متأسفانه خطایی رخ داده است</p>
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    تلاش مجدد
                </button>
            </div>
        </main>
      </body>
    </html>
  )
} 