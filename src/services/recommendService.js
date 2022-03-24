import { get } from './request'

export const getBanner = async () => {
  return get('/banner')
}