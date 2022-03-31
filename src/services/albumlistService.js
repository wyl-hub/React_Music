import { get } from './request'

export const getAlbumByPage = offset => {
  return get('/top/album', {
    offset,
    limit: 35
  })
}