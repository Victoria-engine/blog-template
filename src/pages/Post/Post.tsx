import React, { useEffect, useState } from 'react'
import { BlogPost } from '../../components/Post/types'
import { PostProps as Props } from '../types'
import { useVictoria } from '../../components/VictoriaContext'
import classes from './styles.module.scss'
import { transformToLocalDate } from '../../utils/dateUtils'
import EditorBlock from './EditorBlock'


const Post: React.FC<Props> = ({ history }) => {
  const [post, setPost] = useState<BlogPost>()
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
      </div>

      <div className={classes.row}>
        <span>
          Posted by <b>{post.user.name}</b>,
         at {transformToLocalDate(post.created_at)}
        </span>
      </div>

      <div className={classes.tags}>
        <span>{post.tags?.map(tag => <span>{tag}</span>)}</span>
      </div>

      <article className={classes.content}>
        {JSON.parse(post.text)
          .blocks.map((block: any, idx: any) => EditorBlock(block, idx))
        }
      </article>

    </main>
  )
}

export default Post