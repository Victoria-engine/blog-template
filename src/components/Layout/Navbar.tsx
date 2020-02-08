import React from 'react'
import { NavbarProps as Props } from '../types'
import classes from './styles.module.scss'

const Navbar: React.FC<Props> = ({ blogData }) => {
  if (!blogData) return null
  
  return (
    <nav className={classes.navbar}>
      <h1>{blogData.name}</h1>
    </nav> 
  )
}

export default Navbar