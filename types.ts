/**
 * Type definitions for Cosmic CMS objects and API responses
 */

// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status: string
  published_at?: string
  thumbnail?: string
}

// Post object type with metadata
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    title?: string
    content?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: Author
    category?: Category
  }
}

// Author object type with metadata
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    avatar?: {
      url: string
      imgix_url: string
    }
  }
}

// Category object type with metadata
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
  }
}

// API response wrapper
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}

// API single object response
export interface CosmicSingleResponse<T> {
  object: T | null
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts'
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

// Utility function to safely get author name
export function getAuthorName(author: Author | undefined): string {
  return author?.metadata?.name || author?.title || 'Unknown Author'
}

// Utility function to safely get category name
export function getCategoryName(category: Category | undefined): string {
  return category?.metadata?.name || category?.title || 'Uncategorized'
}

// Utility function to safely get author avatar URL
export function getAuthorAvatarUrl(author: Author | undefined): string | null {
  return author?.metadata?.avatar?.imgix_url || author?.thumbnail || null
}

// Utility function to safely get featured image URL
export function getFeaturedImageUrl(post: Post | undefined): string | null {
  return post?.metadata?.featured_image?.imgix_url || null
}