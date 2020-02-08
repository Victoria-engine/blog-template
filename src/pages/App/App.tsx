import React from 'react'
import './App.css'
import routes from '../../routes/routes'

const App: React.FC = () => {
  return (
    <>
      {routes()}
    </>
  )
}

export default App
