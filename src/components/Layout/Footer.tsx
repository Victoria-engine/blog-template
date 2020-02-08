import React from 'react'
import { NavbarProps as Props } from '../types'

const Footer: React.FC<Props> = ({ blogData }) => {
  if (!blogData) return null

  return (
    <footer>
      <p>Proudly made with <span role="img" aria-label="hearth emoji"> ❤️ </span> 
      by {blogData.author} - {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer