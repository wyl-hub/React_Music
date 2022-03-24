import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './router/index'
import store from './store/index'

import Header from './components/app-header/index'
import Footer from './components/app-footer/index'

import './index.css'

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className='MusicContainer'>
          <div>
            <Header />
            {renderRoutes(routes)}
          </div>
          <Footer />
        </div>
      </HashRouter>
    </Provider>
  )
}
