import React from 'react'
import { NavbarProps as Props } from '../types'
import classes from './styles.module.scss'
import { Link } from 'react-router-dom'

const Navbar: React.FC<Props> = ({ blog }) => {
  if (!blog) return null

  return (
    <nav className={classes.navbar}>

      <div className={classes.titleDivider}>
        <Link to='/'> <h1>{blog.title}</h1> </Link>
        <p className={classes.description}>{blog.description}</p>
      </div>
    </nav>
  )
}

export default Navbar