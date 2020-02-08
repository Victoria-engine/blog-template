import React from 'react'
import { NavbarProps as Props } from '../types'

const Navbar: React.FC<Props> = ({ blogData }) => {
  if (!blogData) return null
  
  return (
    <nav>
      <h1>{blogData.name}</h1>
    </nav> 
  )
}

export default Navbar