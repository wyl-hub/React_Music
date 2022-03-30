import { get } from './request'


export const getAlbumDetail = (id) => {
    return get('/album/detail', {
        id
    })
}