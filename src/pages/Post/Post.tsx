import React, { useEffect, useState } from 'react'
import { PostType } from '../../components/Post/types'
import { PostProps as Props } from '../types'
import { useVictoria } from '../../components/VictoriaContext'
import classes from './styles.module.scss'
import { transformToLocalDate } from '../../utils/dateUtils'

const Post: React.FC<Props> = ({ history }) => {
  const [post, setPost] = useState<PostType>()
  const { client } = useVictoria()

  useEffect(() => {
    const path = history.location.pathname.split('/')
    const id = path[path.length - 1]

    if (!post) {
      client.getPostByID(id)
        .then((data: any) => {
          setPost(data.data)
        })
        .catch((err: Error) => console.error(err))
    }
  })

  if (!post) return <div>Loading...</div>

  return (
    <main className={classes.page}>
      <div className={classes.header}>
        <h1>{post.title}</h1>

        <span>{transformToLocalDate(post.createdAt)}</span>
      </div>

      <div className={classes.row}>
        <span>Posted by {post.author}</span>
      </div>

      <div className={classes.tags}>
        <span>{post.tags && post.tags.map(tag => <span>{tag}</span>)}</span>
      </div>

      <article className={classes.content}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

    </main>
  )
}

export default Post