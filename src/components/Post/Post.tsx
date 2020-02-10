import React from 'react'
import { PostProps as Props } from './types'
import classes from './styles.module.scss'
import { getRelativeDate } from '../../utils/dateUtils'

const Post: React.FC<Props> = ({ post, onOpenPost, ...rest }) => {
  return (
    <article onClick={onOpenPost} className={classes.postItem} {...rest}>
      <div className={classes.multiRow}>
        <h2>{post.title}</h2>
        <span>{getRelativeDate(post.createdAt as any)}</span>
      </div>

      <div className={classes.description}>
          <p>{post.excerpt}</p>
      </div>  

      <div className={classes.singleRow}>
        {post.tags && post.tags.map(tag => <span>{tag}</span>)}
      </div>

      <div className={classes.singleRow}>
        <p>{post.reading_time} mins to read</p>
      </div>
    </article>   
  )
}

export default Post