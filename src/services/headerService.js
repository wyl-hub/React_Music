
import { get } from './request'

export const searchByKeyword = keywords => {
    return get('/search', {
        keywords,
        type: 1
    })
}

export const searchSingerByKeyword = keywords => {
    return get('/search', {
        keywords,
        type: 100
    })
}