import { History } from 'history'
import { BlogPost } from '../components/Post/types'

export interface AppProps {
  victoria_key?: string,
}

export interface HomeProps {
  victoria_key: string,
  history: History,
}

export interface PostProps {
  history: History,
}

export interface Blog {
  posts: BlogPost[],
  id: string,
  title: string,
  description: string,
  author: string,
}

export interface EditorBlockData {
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
}