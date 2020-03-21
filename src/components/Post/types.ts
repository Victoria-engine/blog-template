export type PostVisibility = 'public' | 'private' | 'not-listed'

export type PostType = {
  _id: string,
  slug: string, // learning-javascript
  title: string, // Learning Javascript
  html: {
    blocks: {
      type: string,
      data: {
        text: string,
        level?: number,
        items?: any[],
        code?: string,
        file?: {
          url: string,
        },
        caption?: string,
        style?: 'ordered',
        html?: string,
      }
    }[],
  },
  hero_image?: string,
  visibility: PostVisibility,
  excerpt: string, // Welcome to this...
  reading_time: number,
  author: string, // blog name author,
  tags?: string[],
  url: string, // blog.url/p/learning-javascript
  createdAt: string,
}

export interface PostProps {
  /** Post data */
  post: PostType,
  /** Redirects to the post page */
  onOpenPost: () => void,
}