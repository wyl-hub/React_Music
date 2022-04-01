import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { get } from '@/services/request'
import styles from './playmv.module.less'

const Playmv = () => {
    // 获取路由传递过来的参数
    const location = useLocation()
    console.log(location)
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    // 请求歌曲详情
    useEffect(() => {
        let id = ''
        if (location.search) {
            id = location.search.split('?')[1].split('&')[0].split('=')[1]
            setName(decodeURIComponent(location.search.split('?')[1].split('=')[2]))
        }
        if (id) get('/mv/url', { id }).then(res => {
            setUrl(res.data.data.url)
        })
    }, [location])
    return (
        <div className={styles.container}>
            <h2>{name}</h2>
            <video
                className={styles.video}
                controls
                src={url}
            >
            </video>
        </div>
    );
}

export default memo(Playmv);
