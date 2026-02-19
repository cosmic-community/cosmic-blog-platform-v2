import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Categories - Cosmic Blog',
  description: 'Browse posts by category on Cosmic Blog',
  openGraph: {
    title: 'Categories - Cosmic Blog',
    description: 'Browse posts by category on Cosmic Blog',
  },
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories</h1>
          <p className="text-blue-100 text-lg">
            Explore all the topics we cover
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg dark:shadow-black/30 transition-shadow duration-200 p-8"
              >
                <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
                  {category.metadata?.name || category.title}
                </h3>
                {category.metadata?.description && (
                  <p className="text-secondary dark:text-gray-400 line-clamp-3">
                    {category.metadata.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary dark:text-gray-400 text-lg">
              No categories found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}