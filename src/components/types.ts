import { BlogType } from "../pages/types";

export interface NavbarProps {
  blogData: BlogType,
}

export interface FooterProps {
  blogData: BlogType,
}

export interface UseVictoria {
  blog: BlogType,
  posts: BlogType['posts'],
  /**api key  */
  key: string,
  /** client object */
  client: any,
}