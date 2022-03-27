
import { get } from './request'

export const login = async () => {
    const token = localStorage.getItem('token')
    if (token) return
    get('/login/cellphone', {
        phone: 15271686340,
        password: 'wyl99001213',
    }).then(res => {
        const { token } = res.data
        localStorage.setItem('token', token)
    })
}

// 歌词数据
// /lyric?id