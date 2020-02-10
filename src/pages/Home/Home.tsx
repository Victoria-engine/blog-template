import React from 'react'
import Post from '../../components/Post'
import { HomeProps as Props } from '../types'
import { useVictoria } from '../../components/VictoriaContext'
import classes from './styles.module.scss'

/**
 * Home page, with the list of posts
 */
const Home: React.FC<Props> = ({ history }) => {
  const { blog } = useVictoria()
  
  /** Navigates to the clicked post */
  const navigatePostHandler = (postID: string) => () => {
    history.push(`/post/${postID}`)
  }

  const hasBlogData = blog && blog.posts

  return (
    <div className={classes.blog}>
      <h2>Posts</h2>

      {hasBlogData && blog.posts.map(post =>
        <Post post={post} key={`${post._id}post`} onOpenPost={navigatePostHandler(post._id)} />)}
    </div>
  )
}

export default Home