export enum PostVisibility {
  Public = 'public',
  Private = 'private',
  NotListed = 'not-listed'
}

export interface BlogPost {
  id: string,
  title: string,
  text: string,
  visibility: PostVisibility,
  description: string,
  reading_time: number,
  user: {
    id: string,
    name: string,
  },
  tags?: string[],
  created_at: string,
}

export interface PostProps {
  /** Post data */
  post: BlogPost,
  /** Redirects to the post page */
  onOpenPost: () => void,
}