import { get } from './request'

export const getBanner = async () => {
  return get('/banner')
}

export const getHot = async () => {
  return get('/personalized', { limit: 8 })
}

export const getNewBorn = async () => {
  return get('/top/album', { limit: 10 })
}

export const getRankList = async (idx) => {
  return get('/top/list', {
    idx
  })
}