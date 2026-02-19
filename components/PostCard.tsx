import Link from 'next/link'
import { Post, getFeaturedImageUrl, getCategoryName, getAuthorName } from '@/types'
import { Calendar, User } from 'lucide-react'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const imageUrl = getFeaturedImageUrl(post)
  const categoryName = getCategoryName(post.metadata?.category)
  const authorName = getAuthorName(post.metadata?.author)

  const postDate = new Date(
    post.published_at || post.created_at
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`}>
        <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg dark:shadow-black/30 transition-shadow duration-200 cursor-pointer group">
          {imageUrl && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={`${imageUrl}?w=800&h=400&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                width="800"
                height="400"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {post.metadata?.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
                  {categoryName}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground dark:text-dark-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <div className="flex flex-col gap-3 text-sm text-secondary dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{postDate}</span>
                </div>
                {post.metadata?.author && (
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{authorName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg dark:shadow-black/30 transition-shadow duration-200 cursor-pointer group">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${imageUrl}?w=600&h=300&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              width="600"
              height="300"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {post.metadata?.category && (
              <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded">
                {categoryName}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold mb-2 text-foreground dark:text-dark-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex flex-col gap-2 text-xs text-secondary dark:text-gray-400">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{postDate}</span>
              </div>
              {post.metadata?.author && (
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{authorName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}