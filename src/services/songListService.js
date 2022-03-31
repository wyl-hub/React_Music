import { get } from './request'


export const getSongListByPage = offset => {
  return get('/top/playlist', {
    offset,
    limit: 35,
    order: 'hot'
  })
}