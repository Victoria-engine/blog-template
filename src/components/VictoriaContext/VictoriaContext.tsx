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

  useEffect(() => {
    // Fetch blog data
    if (!blog) {
      Victoria.createClient({ key, domain })
        .then(({ data }: any) => {
          setBlog(data)
        })
        .catch((err: Error) => err)
    }
  }, [blog, domain, key])

  return (
    <VictoriaContext.Provider value={{ key, blog }}>
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
