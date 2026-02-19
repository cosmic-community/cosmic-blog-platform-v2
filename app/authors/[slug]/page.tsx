// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/PostCard'
import { getAuthorBySlug, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { getAuthorAvatarUrl } from '@/types'
import { ArrowLeft } from 'lucide-react'

interface AuthorPageParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: AuthorPageParams): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  const avatarUrl = getAuthorAvatarUrl(author)
    ? `${getAuthorAvatarUrl(author)}?w=200&h=200&fit=crop&auto=format`
    : 'https://imgix.cosmicjs.com/36626d80-0d24-11f1-9d49-adcc5e0003e3-photo-1677442136019-21780ecad995-1771458460748.jpg?w=200&h=200&fit=crop&auto=format'

  return {
    title: `${author.title} - Cosmic Blog`,
    description: author.metadata?.bio || `Read articles by ${author.title}`,
    openGraph: {
      title: `${author.title} - Cosmic Blog`,
      description: author.metadata?.bio || `Read articles by ${author.title}`,
      images: [
        {
          url: avatarUrl,
          width: 200,
          height: 200,
          alt: author.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageParams) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(slug)
  const avatarUrl = getAuthorAvatarUrl(author)

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/authors"
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Authors
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {avatarUrl && (
              <img
                src={`${avatarUrl}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-32 h-32 rounded-full object-cover"
                width="200"
                height="200"
              />
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {author.title}
              </h1>
              {author.metadata?.bio && (
                <p className="text-blue-100 text-lg max-w-2xl">
                  {author.metadata.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground mb-8">
          Articles by {author.title}
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary dark:text-gray-400 text-lg">
              No posts published yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}