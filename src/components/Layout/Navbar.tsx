import React from 'react'
import { NavbarProps as Props } from '../types'
import classes from './styles.module.scss'
import { Link } from 'react-router-dom'

const Navbar: React.FC<Props> = ({ blogData }) => {
  if (!blogData) return null

  return (
    <nav className={classes.navbar}>
      <Link to='/'> <h1>{blogData.name}</h1> </Link>
    </nav>
  )
}

export default Navbar