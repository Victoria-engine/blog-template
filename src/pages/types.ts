import { History } from 'history'
import { PostType } from '../components/Post/types'

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

export type BlogType = {
  posts: PostType[],
  _id: string,
  name: string,
  description: string,
  author: string,
}