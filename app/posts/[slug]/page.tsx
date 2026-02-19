// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { getAuthorName, getAuthorAvatarUrl, getCategoryName } from '@/types'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'

interface PostPageParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PostPageParams): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.metadata?.featured_image?.imgix_url
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format`
    : 'https://imgix.cosmicjs.com/36626d80-0d24-11f1-9d49-adcc5e0003e3-photo-1677442136019-21780ecad995-1771458460748.jpg?w=1200&h=630&fit=crop&auto=format'

  return {
    title: post.title,
    description: post.metadata?.content?.substring(0, 160) || post.title,
    openGraph: {
      title: post.title,
      description: post.metadata?.content?.substring(0, 160) || post.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: post.metadata?.author?.metadata?.name
        ? [post.metadata.author.metadata.name]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metadata?.content?.substring(0, 160) || post.title,
      images: [imageUrl],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageParams) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const authorName = getAuthorName(post.metadata?.author)
  const authorAvatarUrl = getAuthorAvatarUrl(post.metadata?.author)
  const categoryName = getCategoryName(post.metadata?.category)

  const postDate = new Date(
    post.published_at || post.created_at
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      {/* Hero Section */}
      {post.metadata?.featured_image && (
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
            width="1600"
            height="800"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Back Button */}
        <Link
          href="/posts"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Posts
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-dark-foreground mb-6">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pb-8 border-b border-border dark:border-dark-border mb-8">
          {/* Category */}
          {post.metadata?.category && (
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-blue-600 dark:text-blue-400" />
              <Link
                href={`/categories/${post.metadata.category.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
              >
                {categoryName}
              </Link>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 text-secondary dark:text-gray-400">
            <Calendar size={18} />
            <span>{postDate}</span>
          </div>

          {/* Author */}
          {post.metadata?.author && (
            <Link
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {authorAvatarUrl && (
                <img
                  src={`${authorAvatarUrl}?w=32&h=32&fit=crop&auto=format`}
                  alt={authorName}
                  className="w-8 h-8 rounded-full"
                  width="32"
                  height="32"
                />
              )}
              <div>
                <div className="flex items-center gap-1">
                  <User size={18} />
                  <span className="font-semibold text-foreground dark:text-dark-foreground">
                    {authorName}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Content */}
        {post.metadata?.content && (
          <div className="prose dark:prose-invert max-w-none">
            <MarkdownRenderer content={post.metadata.content} />
          </div>
        )}

        {/* Author Bio Section */}
        {post.metadata?.author && (
          <div className="mt-12 pt-8 border-t border-border dark:border-dark-border">
            <h3 className="text-lg font-semibold text-foreground dark:text-dark-foreground mb-4">
              About the Author
            </h3>
            <div className="flex gap-4">
              {authorAvatarUrl && (
                <img
                  src={`${authorAvatarUrl}?w=80&h=80&fit=crop&auto=format`}
                  alt={authorName}
                  className="w-20 h-20 rounded-full flex-shrink-0"
                  width="80"
                  height="80"
                />
              )}
              <div>
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="text-lg font-semibold text-foreground dark:text-dark-foreground hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {authorName}
                </Link>
                {post.metadata.author.metadata?.bio && (
                  <p className="text-secondary dark:text-gray-400 mt-2">
                    {post.metadata.author.metadata.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}