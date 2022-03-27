// /playlist/detail?id=24381616

import { get } from './request'

export function getPlayListDetail(id) {
    return get('/playlist/detail', {
        id
    })
}