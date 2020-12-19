import React from 'react'
import { NavbarProps as Props } from '../types'

const Footer: React.FC<Props> = ({ blog: blogData }) => {
  if (!blogData) return null

  return (
    <footer>
      <p>Proudly made with <a href='https://victoriaengine.com'>Victoria</a></p>
    </footer>
  )
}

export default Footer