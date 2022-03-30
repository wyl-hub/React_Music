import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import { login } from './services/login'
import Main from './components/Main/Main'

import './index.css'

export default function App() {
  useEffect(() => {
    console.log(1)
    login()
  }, [])
  
  return (
    <Provider store={store}>
      <HashRouter>
        <Main />
      </HashRouter>
    </Provider>
  )
}
