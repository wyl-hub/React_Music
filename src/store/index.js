import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 解决 redux devtool 失效问题
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// dispatch 只能接受一个对象 不能接受一个异步函数  用这个处理
// applyMiddleware(thunk)
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

export default store