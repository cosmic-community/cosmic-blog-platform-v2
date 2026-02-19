import type { Metadata } from 'next'
import Link from 'next/link'
import { getAuthors } from '@/lib/cosmic'
import { getAuthorAvatarUrl } from '@/types'

export const metadata: Metadata = {
  title: 'Authors - Cosmic Blog',
  description: 'Meet the talented writers behind Cosmic Blog',
  openGraph: {
    title: 'Authors - Cosmic Blog',
    description: 'Meet the talented writers behind Cosmic Blog',
  },
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Authors</h1>
          <p className="text-blue-100 text-lg">
            Meet the talented writers behind Cosmic Blog
          </p>
        </div>
      </section>

      {/* Authors Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => {
              const avatarUrl = getAuthorAvatarUrl(author)

              return (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg dark:shadow-black/30 transition-shadow duration-200 cursor-pointer"
                >
                  <div className="p-8 text-center">
                    {avatarUrl && (
                      <img
                        src={`${avatarUrl}?w=150&h=150&fit=crop&auto=format,compress`}
                        alt={author.title}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        width="150"
                        height="150"
                      />
                    )}
                    <h3 className="text-xl font-bold text-foreground dark:text-dark-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {author.title}
                    </h3>
                    {author.metadata?.bio && (
                      <p className="text-sm text-secondary dark:text-gray-400 mt-3 line-clamp-3">
                        {author.metadata.bio}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary dark:text-gray-400 text-lg">
              No authors found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}