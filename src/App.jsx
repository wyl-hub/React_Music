import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './router/index'
import store from './store/index'

import Header from './components/app-header/index'
import Footer from './components/app-footer/index'
import Audio from './components/Audio/Audio'

import './index.css'

export default function App() {
  const test = () => {
    console.log(1)
  }
  return (
    <Provider store={store}>
      <HashRouter>
        <div className='MusicContainer'>
          <div onClick={test}>
            <Header />
            {renderRoutes(routes)}
          </div>
          <Footer />
          <Audio />
        </div>
      </HashRouter>
    </Provider>
  )
}
