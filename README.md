# Cosmic Blog Platform

![Blog Preview](https://imgix.cosmicjs.com/36626d80-0d24-11f1-9d49-adcc5e0003e3-photo-1677442136019-21780ecad995-1771458460748.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fully-featured blog platform built with Next.js 14, Tailwind CSS, and Cosmic CMS. Features include dynamic content rendering, category filtering, author profiles, dark mode support, and complete SEO optimization.

## Features

- ✨ **Modern Next.js 14 Architecture** - App Router with server components and streaming
- 📝 **Dynamic Blog Posts** - Full markdown support with syntax highlighting
- 🎨 **Dark Mode Toggle** - Persistent theme switching with smooth transitions
- 🏷️ **Category Filtering** - Real-time filtering and category-specific pages
- 👤 **Author Profiles** - Dedicated pages showcasing author bio and published posts
- 🖼️ **Responsive Images** - Optimized images with imgix integration
- 🔍 **SEO Optimized** - Dynamic meta tags, Open Graph data, and structured metadata
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌙 **Theme Persistence** - User theme preference saved in localStorage
- ⚡ **Performance** - Static generation with ISR, optimized images, and fast page loads

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69964e05fc83ec3ef0722e32&clone_repository=69965680fc83ec3ef0723546)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Update the Posts object type to include summary (textarea), hero_image (image file), publish_date (date), and authors (multi-select reference to authors). Update Categories to include a cover_image file field. Then ensure Authors include social_links (text) and seed 3 authors and 5 posts with those fields populated, plus the missing Productivity category.

### Code Generation Prompt

> Build me an app: Modern Next.js 14 App Router blog with Tailwind using Cosmic data. Home hero+featured+latest grid+category filter, post pages hero/publish date/authors/categories/markdown, author pages, category pages, global layout header/footer/dark-light toggle, SEO meta, README, deploy to Vercel.. Generate the complete application code.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 3.4 with custom theme
- **Content Management**: Cosmic CMS with SDK integration
- **Language**: TypeScript 5
- **Markdown**: next-markdown-preview for rendering
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel (recommended)
- **Image Optimization**: imgix CDN integration
- **Database**: Cosmic CMS headless API

## Getting Started

### Prerequisites

- Node.js 18+ and Bun package manager
- A Cosmic CMS account with the blog bucket configured
- Environment variables ready

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cosmic-blog
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=ai-cosmic-blog-production
   COSMIC_READ_KEY=your-read-key-here
   COSMIC_WRITE_KEY=your-write-key-here
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see your blog in action.

## Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

async function getPosts() {
  try {
    const { objects: posts } = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return posts as Post[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching a Single Post by Slug

```typescript
async function getPostBySlug(slug: string) {
  try {
    const { object: post } = await cosmic.objects.findOne({
      type: 'posts',
      slug,
    })
    .depth(1)

    if (!post) {
      return null
    }

    return post as Post
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

### Fetching Posts by Category

```typescript
async function getPostsByCategory(categorySlug: string) {
  try {
    // First get the category to get its ID
    const { object: category } = await cosmic.objects.findOne({
      type: 'categories',
      slug: categorySlug,
    })

    if (!category) {
      return []
    }

    // Then find posts that reference this category
    const { objects: posts } = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category': category.id 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return posts as Post[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Author Profile

```typescript
async function getAuthorBySlug(slug: string) {
  try {
    const { object: author } = await cosmic.objects.findOne({
      type: 'authors',
      slug,
    })

    if (!author) {
      return null
    }

    return author as Author
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

## Cosmic CMS Integration

### Content Model Structure

**Posts Object Type**
- `title` (text, required) - Post title
- `content` (markdown) - Full post content
- `featured_image` (file) - Hero image for the post
- `author` (object) - Reference to Authors
- `category` (object) - Reference to Categories

**Authors Object Type**
- `name` (text, required) - Author full name
- `bio` (textarea) - Author biography
- `avatar` (file) - Author profile image

**Categories Object Type**
- `name` (text, required) - Category name
- `description` (textarea) - Category description

### Data Fetching Pattern

All data fetching is done server-side using:
- Server Components for initial page rendering
- The Cosmic SDK with depth parameter for object relationships
- Proper error handling with 404 status checking
- Type-safe responses with TypeScript interfaces

### Image Optimization

All images are optimized using imgix parameters:
```typescript
// Featured image with optimization
<img 
  src={`${post.metadata?.featured_image?.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
  alt={post.title}
  width="800"
  height="400"
/>

// Author avatar with smaller dimensions
<img 
  src={`${author.metadata?.avatar?.imgix_url}?w=150&h=150&fit=crop&auto=format,compress`}
  alt={author.title}
  width="75"
  height="75"
/>
```

## Deployment Options

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://www.vercel.com)
   - Click "New Project" and select your repository
   - Vercel will auto-detect Next.js configuration

3. **Set Environment Variables**
   - In Vercel project settings, add:
     - `COSMIC_BUCKET_SLUG`
     - `COSMIC_READ_KEY`
     - `COSMIC_WRITE_KEY`

4. **Deploy**
   - Vercel will automatically build and deploy your site
   - Your blog is now live!

### Deploy to Netlify

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Connect to Netlify**
   - Drag and drop the `.next` folder, or
   - Connect your GitHub repository for automatic deployments

3. **Set Environment Variables**
   - In Netlify Build & Deploy settings, add your Cosmic credentials

### Environment Variables for Production

Make sure these variables are set in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Never commit these values to version control. Use your hosting platform's environment variable management system.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and [Next.js](https://nextjs.org)

<!-- README_END -->