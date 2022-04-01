import { get } from './request'

// 华语 男歌手或者女歌手
export const getSingerList = (offset, type) => {
  return get('/artist/list', {
    offset,
    type,
    area: 7
  })
}