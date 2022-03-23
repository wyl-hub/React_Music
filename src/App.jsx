import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import routes from './router/index'
import Header from './components/app-header/index'
import Footer from './components/app-footer/index'
import './index.css'

export default function App() {
  return (
    <HashRouter>
      <Header />
      {renderRoutes(routes)}
      <Footer />
    </HashRouter>
  )
}
