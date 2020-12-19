import React from 'react'
import { PostProps as Props } from './types'
import classes from './styles.module.scss'
import { getRelativeDate } from '../../utils/dateUtils'


const Post: React.FC<Props> = ({
  post,
  onOpenPost,
  ...rest }) => {
  return (
    <article onClick={onOpenPost} className={classes.postItem} {...rest}>
      <div className={classes.multiRow}>
        <h2>{post.title}</h2>
        <span>{getRelativeDate(post.created_at as any)}</span>
      </div>

      <div className={classes.description}>
        <p>{post.description}</p>
      </div>

      <div className={classes.singleRow}>
        {post.tags && post.tags.map(tag => <span>{tag}</span>)}
      </div>
    </article>
  )
}

export default Post