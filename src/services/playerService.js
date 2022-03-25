
import { get } from './request'

export const getSongDetail = async (ids) => {
  return get('/song/detail', { ids })
}
