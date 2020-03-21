import React, { useEffect, useState } from 'react'
import { PostType } from '../../components/Post/types'
import { PostProps as Props } from '../types'
import { useVictoria } from '../../components/VictoriaContext'
import classes from './styles.module.scss'
import { transformToLocalDate } from '../../utils/dateUtils'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

/**
 * Clean data parser to React JSX
 */
function CleanDataParser(block: PostType['html']['blocks'][0], index: number) {
  console.log(block)

  // Need to parse for <b> elems and stuff inside strings

  switch (block.type) {
    case 'header':
      switch (block.data.level) {
        case 1: return <h1 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
        case 2: return <h2 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
        case 3: return <h3 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
        case 4: return <h4 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
        case 5: return <h5 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
        case 6: return <h6 key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />

        default: return <p key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />
      }

    case 'paragraph':
      return <p key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />

    case 'delimiter':
      return <hr key={index} />

    case 'image':
      return <img key={index} alt={block.data.caption} className="img-fluid" src={block.data.file && block.data.file.url} title={block.data.caption} />

    case 'list':
      if (!Array.isArray(block.data.items)) {
        console.warn('Failed to parse `list` without `items`.\nBlock:', block)
        return
      }

      switch (block.data.style) {
        case 'ordered': {
          return (
            <ol key={index}>
              {block.data.items.map((li: string, idx: number) => {
                return <li key={`${li}-${idx}-item`} dangerouslySetInnerHTML={{ __html: li }} />
              })}
            </ol>)
        }
        default: {
          return (
            <ul key={index}>
              {block.data.items.map((li: string, idx: number) => {
                return <li key={`${li}-${idx}-item`} dangerouslySetInnerHTML={{ __html: li }} />
              })}
            </ul>)
        }
      }

    case 'code':
      return (<SyntaxHighlighter language="typescript" style={atomDark} key={index}>
        {block.data.code}
      </SyntaxHighlighter>)

    case 'quote': {
      return <blockquote key={index}><p dangerouslySetInnerHTML={{ __html: block.data.text }} /></blockquote>
    }

    case 'raw': {
      if (!block.data.html) {
        console.warn('Failed to parse `raw` without `html`.\nBlock:', block)
        return
      }

      return (<div key={index} dangerouslySetInnerHTML={{ __html: block.data.html }} />)
    }

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