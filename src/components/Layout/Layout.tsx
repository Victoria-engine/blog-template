import React from 'react'
import { useVictoria } from '../VictoriaContext'
import Navbar from './Navbar'
import Footer from './Footer'
import classes from './styles.module.scss'

/**
 * Layout wrapper
 */
const Layout: React.FC = ({ children }) => {
  const { blog } = useVictoria()

  return (
    <div className={classes.layout}>
      <Navbar blogData={blog} />

      <main className={classes.content}>
        {children}
      </main>

      <Footer blogData={blog}/>
    </div> 
  )
}

export default Layout