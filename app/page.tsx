import type { Metadata } from 'next'
import Link from 'next/link'
import { PostCard } from '@/components/PostCard'
import { getPosts, getCategories } from '@/lib/cosmic'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home - Cosmic Blog',
  description:
    'Discover amazing stories about travel, productivity, technology, and AI.',
  openGraph: {
    title: 'Home - Cosmic Blog',
    description:
      'Discover amazing stories about travel, productivity, technology, and AI.',
    url: 'https://cosmic-blog.example.com',
  },
}

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()

  const featuredPosts = posts.slice(0, 1)
  const latestPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Cosmic Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover inspiring stories about travel, productivity, technology,
            and AI. Powered by Cosmic CMS and built with Next.js 14.
          </p>
          <Link
            href="/posts"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Explore All Posts
          </Link>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-dark-foreground mb-2">
              Featured Article
            </h2>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 rounded"></div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6">
              Explore by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-border dark:border-dark-border hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-md transition-all text-center group"
                >
                  <p className="font-semibold text-foreground dark:text-dark-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.metadata?.name || category.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-dark-foreground mb-2">
                Latest Stories
              </h2>
              <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 rounded"></div>
            </div>
            <Link
              href="/posts"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              View All
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 py-32 text-center">
          <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-4">
            No Posts Yet
          </h2>
          <p className="text-secondary dark:text-gray-400 mb-8">
            Check back soon for amazing content!
          </p>
        </section>
      )}
    </div>
  )
}