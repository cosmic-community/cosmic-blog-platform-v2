import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border dark:border-dark-border bg-gray-50 dark:bg-gray-900 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-dark-foreground">
              Cosmic Blog
            </h3>
            <p className="text-secondary dark:text-gray-400 text-sm">
              A modern blog platform powered by Cosmic CMS and built with Next.js
              14.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground dark:text-dark-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground dark:text-dark-foreground">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.cosmicjs.com/docs"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cosmic Docs
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground dark:text-dark-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cosmic Website
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/cosmicjs"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/cosmicjs"
                  className="text-secondary dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border dark:border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-secondary dark:text-gray-400">
            &copy; {currentYear} Cosmic Blog. All rights reserved.
          </p>
          <p className="text-sm text-secondary dark:text-gray-400 flex items-center gap-1 mt-4 md:mt-0">
            Built with <Heart size={14} className="text-red-500" /> using Cosmic
            and Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}