import React, { memo, useState, useEffect, useRef } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { Input } from 'antd'
const { Search } = Input
import * as headerService from '@/services/headerService'
import styles from './index.module.less'

export default memo(function Header() {
    // 获取当前路由  动态展示底部红色小箭头
    const { pathname } = useLocation()

    // 实时搜索
    // 搜索到的 歌曲 歌手
    const [songList, setSong] = useState([])
    const [singgerList, setSingger] = useState([])
    // 是否打开结果框
    const [searchFlag, setFlag] = useState([false])
    useEffect(() => {
        setFlag(false)
    }, []);
    let timr = null
    const toSearch = e => {
        clearTimeout(timr)
        timr = setTimeout(() => {
            const keyword = e.target.value
            if (keyword) {
                headerService.searchByKeyword(keyword).then(res => {
                    const { songs = [] } = res.data.result
                    setSong(songs.slice(0, 5))
                })
                headerService.searchSingerByKeyword(keyword).then(res => {
                    const { artists = [] } = res.data.result
                    setSingger(artists.slice(0, 5))
                })
                setFlag(true)
            } else {
                setFlag(false)
            }
        }, 200);
    }
    // 前往歌曲详情或者歌手详情
    const searchDom = useRef()
    const history = useHistory()
    const toSongDetail = item => {
        if (location.pathname === '/findmusic/player') {
            history.replace(`/findmusic/player?id=${item.id}`)
        } else {
            history.push(`/findmusic/player?id=${item.id}`)
        }
        setFlag(false)
    }
    const toSingerDetail = item => {
        if (location.pathname === '/findmusic/Singer') {
            history.replace(`/findmusic/Singer?id=${item.id}`)
        } else {
            history.push(`/findmusic/Singer?id=${item.id}`)
        }
        setFlag(false)
    }

    return (
        <div className={styles.hederContainer}>
            <NavLink to="/" className={styles.logo}>

            </NavLink>
            <NavLink className={styles.navLink} to="/findmusic">
                <span>发现音乐</span>
                {
                    pathname.split('/')[1] === 'findmusic' && <div className={styles.arrow}></div>
                }
            </NavLink>
            <NavLink className={styles.navLink} to="/mymusic">
                <span>我的音乐</span>
                {
                    pathname.split('/')[1] === 'mymusic' && <div className={styles.arrow}></div>
                }
            </NavLink>
            <NavLink className={styles.navLink} to="/attention">
                <span>关注</span>
                {
                    pathname.split('/')[1] === 'attention' && <div className={styles.arrow}></div>
                }
            </NavLink>
            <div className={styles.search}>
                <Search ref={searchDom} onChange={toSearch} placeholder="歌曲/歌手" style={{ width: 200 }} />
                {/* 搜索结果 */}
                {
                    searchFlag &&
                    (
                        <div className={styles.searchResult}>
                            {/* 单曲栏 */}
                            <div className={styles.resultBox}>
                                <div className={styles.resultTitle}>单曲</div>
                                <div className={styles.result}>
                                    {
                                        songList.map(item =>
                                            <div onClick={() => toSongDetail(item)} key={item.id} className={styles.overflow}>
                                                {item.name}-{item.artists[0].name}
                                            </div>)
                                    }
                                </div>
                            </div>
                            <div className={styles.border}></div>
                            {/* 歌手栏 */}
                            <div className={styles.resultBox}>
                                <div className={styles.resultTitle}>歌手</div>
                                <div className={styles.result}>
                                    {
                                        singgerList.map(item => <div onClick={() => toSingerDetail(item)} key={item.id} className={styles.overflow}>{item.name}</div>)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
})