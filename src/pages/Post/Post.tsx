import React, { useEffect, useState } from 'react'
import { PostType } from '../../components/Post/types'
//import Victoria from 'victoria-sdk'
import { PostProps as Props } from '../types'

const Post: React.FC<Props> = ({ history }) => {
  const [post, setPost] = useState<PostType>()
  
  useEffect(() => {
    const path = history.location.pathname.split('/')
    const id = path[path.length - 1]
  
    if (!post) {
      //TODO: Get post from Victoria.getPostByID(id)
      console.log('Fetch post with id: ', id)
    }
  })

  return (
    <main>
      Post page...   
    </main> 
  )
}

export default Post