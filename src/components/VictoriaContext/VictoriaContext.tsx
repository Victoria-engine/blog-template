import React, { useState, useEffect } from 'react'
import { Blog } from '../../pages/types'
import Victoria from 'victoria-sdk'
import { UseVictoria } from '../types'
import { API_URL } from '../../constants'


//@ts-ignore
const VictoriaContext = React.createContext()

const VictoriaProvider: React.FC = ({ children }) => {
  const [blog, setBlog] = useState<Blog>()
  const consumerKey = process.env.REACT_APP_VICTORIA_CONSUMER_KEY || ''

  const client = new Victoria.VictoriaClient(consumerKey, API_URL.PROD)

  useEffect(() => {
    if (!blog) {
      client.createClient()
        .then((res: any) => {
          setBlog(res.data)
        })
    }
  }, [blog, client])


  return (
    <VictoriaContext.Provider value={{ consumerKey, ...blog, client }}>
      {children}
    </VictoriaContext.Provider>)
}


const useVictoria = (): UseVictoria => {
  const context = React.useContext(VictoriaContext)
  if (!context) {
    throw new Error('useVictoria must be used within a VictoriaProvider')
  }

  return context as UseVictoria
}


export { useVictoria, VictoriaProvider }
