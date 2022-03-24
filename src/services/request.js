import axios from 'axios'
import urlObj from './config'

const baseUrl = urlObj.url


axios.interceptors.request.use(config => {
  // console.log('发送请求成功', config)
  // 发送请求之前的一些操作
  return config
}, err => {
  console.log('发送请求失败')
})

axios.interceptors.response.use(response => {
  // console.log('请求成功', response)
  // 请求成功之后的一些操作
  return response
}, err => {
  console.log('请求失败')
})

export const get = (url, data) => {
  url = baseUrl + url
  return axios.get(url, {
    params: data
  })
}

export const post  = (url, data) => {
  url = baseUrl + url
  return axios.post(url, data)
}