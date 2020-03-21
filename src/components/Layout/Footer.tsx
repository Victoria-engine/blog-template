import React from 'react'
import { NavbarProps as Props } from '../types'

const Footer: React.FC<Props> = ({ blogData }) => {
  if (!blogData) return null

  return (
    <footer>
      <p>Proudly made with <a href='https://www.cms.victoria.com'>Victoria</a> by {blogData.author} - {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer