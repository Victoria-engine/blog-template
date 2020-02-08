import React from 'react'
import { PostProps as Props } from './types'
import classes from './styles.module.scss'

const Post: React.FC<Props> = ({ post, onOpenPost, ...rest }) => {
  return (
    <article onClick={onOpenPost} className={classes.postItem} {...rest}>
      <div>
        <h2>{post.title}</h2>
      </div>
      <div>
          <span>{post.excerpt}</span>
      </div>  
      <div>
        {post.tags && post.tags.map(tag => <span>{tag}</span>)}
      </div>
      <div>
        <span>{post.reading_time}</span>
        <span>{post.createdAt}</span>
      </div>
    </article>   
  )
}

export default Post