import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CosmicBadge } from '@/components/CosmicBadge'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cosmic Blog - Powered by Cosmic CMS',
  description:
    'A modern blog platform showcasing the power of Cosmic CMS with Next.js 14',
  keywords: [
    'blog',
    'cosmic',
    'next.js',
    'tailwind',
    'headless cms',
    'content management',
  ],
  authors: [
    {
      name: 'Cosmic',
      url: 'https://www.cosmicjs.com',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cosmic-blog.example.com',
    siteName: 'Cosmic Blog',
    title: 'Cosmic Blog - Powered by Cosmic CMS',
    description:
      'A modern blog platform showcasing the power of Cosmic CMS with Next.js 14',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/36626d80-0d24-11f1-9d49-adcc5e0003e3-photo-1677442136019-21780ecad995-1771458460748.jpg?w=1200&h=630&fit=crop&auto=format',
        width: 1200,
        height: 630,
        alt: 'Cosmic Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmic Blog',
    description: 'A modern blog platform powered by Cosmic CMS',
    creator: '@cosmicjs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script
          src="/dashboard-console-capture.js"
          defer
        />
      </head>
      <body className="bg-white text-foreground dark:bg-dark-background dark:text-dark-foreground transition-colors">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CosmicBadge bucketSlug={process.env.COSMIC_BUCKET_SLUG || ''} />
        </ThemeProvider>
      </body>
    </html>
  )
}