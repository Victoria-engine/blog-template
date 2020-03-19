import React, { useEffect, useState } from 'react'
import { PostType } from '../../components/Post/types'
import { PostProps as Props } from '../types'
import { useVictoria } from '../../components/VictoriaContext'
import classes from './styles.module.scss'
import { transformToLocalDate } from '../../utils/dateUtils'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function ParseSubElemes(str: string) {
  //TODO: Pain in the ass...
  return str
}

/**
 * Clean data parser to React JSX
 */
function CleanDataParser(block: PostType['html']['blocks'][0], index: number) {
  console.log(block)

  // Need to parse for <b> elems and stuff inside strings

  switch (block.type) {
    case 'header':
      // Add header level check 
      return <h1 key={index}>{ParseSubElemes(block.data.text)}</h1>
    case 'paragraph':
      return <p key={index}>{ParseSubElemes(block.data.text)}</p>
    case 'delimiter':
      return <hr key={index} />
    case 'image':
      return <img key={index} alt={block.data.caption} className="img-fluid" src={block.data.file && block.data.file.url} title={block.data.caption} />
    case 'list':
      return (
        <ul key={index}>
          {block.data.items && block.data.items.forEach((li: string, idx: number) => {
            return <li key={`${li}-${idx}-item`}>{ParseSubElemes(li)}</li>
          })})
        </ul>)
    case 'code':
      return (<SyntaxHighlighter language="typescript" style={atomDark} key={index}>
        {block.data.code}
      </SyntaxHighlighter>)
    default:
      console.log('Unknown block type', block.type)
      console.log(block)
  }
}

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
        {
          post.html.blocks.map((block, idx) => CleanDataParser(block, idx))
        }
      </article>

    </main>
  )
}

export default Post