import React from 'react'
import { PostProps as Props } from './types'

const Post: React.FC<Props> = ({ post, onOpenPost, ...rest }) => {
  return (
    <article onClick={onOpenPost} {...rest}>
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