
import { get } from './request'

export const getSingerDetail = id => {
    get('/artist/mv', {
        id
    }).then(res => {
        console.log(res)
    })
    return get('/artists', {
        id
    })
}
