import React from 'react'
import { useVictoria } from '../VictoriaContext'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Layout wrapper
 */
const Layout: React.FC = ({ children }) => {
  const { blog } = useVictoria()

  return (
    <div>
      <Navbar blogData={blog} />

      {children}

      <Footer blogData={blog}/>
    </div> 
  )
}

export default Layout