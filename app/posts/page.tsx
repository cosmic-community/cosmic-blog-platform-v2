'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { PostCard } from '@/components/PostCard'
import { Post, Category } from '@/types'
import { getPosts, getCategories } from '@/lib/cosmic'
import { Search } from 'lucide-react'

export default function PostsPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const posts = await getPosts()
        const cats = await getCategories()
        setAllPosts(posts)
        setCategories(cats)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter posts based on selected category and search query
  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      post.metadata?.category?.id === selectedCategory

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata?.content
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-foreground dark:text-dark-foreground">
            Loading posts...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Posts</h1>
          <p className="text-blue-100 text-lg">
            Explore our complete collection of stories and articles
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground dark:text-dark-foreground mb-4">
                Search
              </h3>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-secondary dark:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border dark:border-dark-border bg-white dark:bg-gray-800 text-foreground dark:text-dark-foreground placeholder-secondary dark:placeholder-gray-500 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="font-semibold text-foreground dark:text-dark-foreground mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground dark:text-dark-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-foreground dark:text-dark-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.metadata?.name || category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="lg:col-span-3">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-secondary dark:text-gray-400 text-lg">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'No posts found matching your criteria'
                    : 'No posts available'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}