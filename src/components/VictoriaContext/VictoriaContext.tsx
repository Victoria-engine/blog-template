import React, { useState, useEffect } from 'react'
import { BlogType } from '../../pages/types'
import Victoria from 'victoria-sdk'
import { UseVictoria } from '../types'

//@ts-ignore
const VictoriaContext = React.createContext()

const VictoriaProvider: React.FC = ({ children }) => {
  const [blog, setBlog] = useState<BlogType>()
  const key = process.env.REACT_APP_VICTORIA_KEY || ''
  const domain = process.env.REACT_APP_DOMAIN || 'http://localhost:3001'

  const client = new Victoria.VictoriaClient(key, domain)

  useEffect(() => {
    // Fetch blog data
    if (!blog) {
      //const client = new Victoria.VictoriaClient({ key, domain })
      client.createClient()
        .then((res: any) => {
          setBlog(res.data)
        })
    }
  }, [blog, client, domain, key])

  return (
    <VictoriaContext.Provider value={{ key, blog, client }}>
      {children}
    </VictoriaContext.Provider>)
}

/**
 * Provider consumer hook 
 */
const useVictoria = (): UseVictoria => {
  const context = React.useContext(VictoriaContext)
  if (!context) {
    throw new Error('useVictoria must be used within a VictoriaProvider')
  }

  return context as UseVictoria
}


export { useVictoria, VictoriaProvider }
