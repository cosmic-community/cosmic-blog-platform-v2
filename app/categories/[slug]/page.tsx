// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/PostCard'
import { getCategoryBySlug, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { ArrowLeft } from 'lucide-react'

interface CategoryPageParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata?.name || category.title} - Cosmic Blog`,
    description:
      category.metadata?.description ||
      `Posts in ${category.metadata?.name || category.title}`,
    openGraph: {
      title: `${category.metadata?.name || category.title} - Cosmic Blog`,
      description:
        category.metadata?.description ||
        `Posts in ${category.metadata?.name || category.title}`,
    },
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: CategoryPageParams) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(slug)

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/categories"
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Categories
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-blue-100 text-lg max-w-2xl">
              {category.metadata.description}
            </p>
          )}
        </div>
      </section>

      {/* Posts Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary dark:text-gray-400 text-lg">
              No posts in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}