import * as React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { EditorBlockData } from '../types'


/**
 * Clean data parser to React JSX
 */
const EditorBlock = (block: EditorBlockData['blocks'][0], index: number) => {
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
        return null
      }
      switch (block.data.style) {
        case 'ordered': {
          return (
            <ol key={index} >
              {
                block.data.items.map((li: string, idx: number) => {
                  return <li key={`${li}-${idx}-item`} dangerouslySetInnerHTML={{ __html: li }
                  } />
                })
              }
            </ol>)
        }
        default: {
          return (
            <ul key={index} >
              {
                block.data.items.map((li: string, idx: number) => {
                  return <li key={`${li}-${idx}-item`} dangerouslySetInnerHTML={{ __html: li }
                  } />
                })
              }
            </ul>)
        }
      }

    case 'code':
      return (
        <SyntaxHighlighter language='typescript' key={index}>
          {block.data.code}
        </SyntaxHighlighter>)
    case 'quote': {
      return <blockquote key={index}> <p dangerouslySetInnerHTML={{ __html: block.data.text }} /></blockquote >
    }
    case 'raw': {
      if (!block.data.html) {
        console.warn('Failed to parse `raw` without `html`.\nBlock:', block)
        return null
      }

      return (<div key={index} dangerouslySetInnerHTML={{ __html: block.data.html }
      } />)
    }

    default:
      console.log('Unknown block type', block.type)
      return null
  }
}

export default EditorBlock