import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Author, Category } from '@/types'

// Initialize Cosmic bucket client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// 🚨 CRITICAL: Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

/**
 * Fetch all posts with author and category data
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'published_at'])
      .depth(1)

    return (objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at).getTime()
      const dateB = new Date(b.published_at || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'posts',
        slug,
      })
      .depth(1)

    if (!object) {
      return null
    }

    return object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error(`Error fetching post with slug ${slug}:`, error)
    throw new Error('Failed to fetch post')
  }
}

/**
 * Fetch posts by category
 */
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    // First get the category to get its ID
    const { object: category } = await cosmic.objects
      .findOne({
        type: 'categories',
        slug: categorySlug,
      })
      .depth(1)

    if (!category) {
      return []
    }

    // Then find posts that reference this category
    const { objects } = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': category.id,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'published_at'])
      .depth(1)

    return (objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at).getTime()
      const dateB = new Date(b.published_at || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error(`Error fetching posts for category ${categorySlug}:`, error)
    throw new Error('Failed to fetch posts')
  }
}

/**
 * Fetch posts by author
 */
export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  try {
    // First get the author to get their ID
    const { object: author } = await cosmic.objects
      .findOne({
        type: 'authors',
        slug: authorSlug,
      })
      .depth(1)

    if (!author) {
      return []
    }

    // Then find posts that reference this author
    const { objects } = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': author.id,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'published_at'])
      .depth(1)

    return (objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at).getTime()
      const dateB = new Date(b.published_at || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error(`Error fetching posts for author ${authorSlug}:`, error)
    throw new Error('Failed to fetch posts')
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return (objects as Category[]).sort((a, b) =>
      a.metadata?.name?.localeCompare(b.metadata?.name || '') || 0
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'categories',
        slug,
      })
      .depth(1)

    if (!object) {
      return null
    }

    return object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error(`Error fetching category with slug ${slug}:`, error)
    throw new Error('Failed to fetch category')
  }
}

/**
 * Fetch all authors
 */
export async function getAuthors(): Promise<Author[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return (objects as Author[]).sort((a, b) =>
      a.metadata?.name?.localeCompare(b.metadata?.name || '') || 0
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching authors:', error)
    throw new Error('Failed to fetch authors')
  }
}

/**
 * Fetch a single author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'authors',
        slug,
      })
      .depth(1)

    if (!object) {
      return null
    }

    return object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error(`Error fetching author with slug ${slug}:`, error)
    throw new Error('Failed to fetch author')
  }
}