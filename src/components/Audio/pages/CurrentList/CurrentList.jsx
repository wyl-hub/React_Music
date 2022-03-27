import React, { memo, useState, useCallback } from 'react';
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { playNewMusic, removeMusic } from '../../hooks/common'
import styles from './currentList.module.less'


const Currentlist = (props) => {
    const { playList, currentSong, audioRef } = props
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    // console.log(playList)
    // console.log(currentSong)

    // 鼠标指向某首歌
    const [curInd, setCurInd] = useState(false)
    const moveIn = useCallback((index) => {
        setCurInd(index)
    }, [])

    const moveOut = () => {
        setCurInd(false)
    }

    // 前往歌曲详情
    const linkDetail = (e, id) => {
        e.stopPropagation()
        if (location.pathname === '/findmusic/player') {
            history.replace(`/findmusic/player?id=${id}`)
        } else {
            history.push(`/findmusic/player?id=${id}`)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/* 左侧播放列表头部 */}
                <div className={styles.leftHeader}>
                    <div>播放列表</div>
                    <div className={styles.cleanBox}>
                        <div className={styles.cleanIcon}></div>
                        <div>清除</div>
                    </div>
                </div>
                {/* 当前播放歌曲名称 关闭该窗口 */}
                <div className={styles.rightHeader}>
                    <div>{currentSong.name}</div>
                    <div className={styles.closeIcon}></div>
                </div>
            </div>
            <div className={styles.content}>
                {/* 背景图 */}
                <div className={styles.mask}></div>
                {/* 歌曲列表 */}
                <div className={styles.songList}>
                    {
                        playList.map((item, index) => (
                            <div
                                onMouseEnter={() => moveIn(index)}
                                onMouseLeave={moveOut}
                                onClick={playNewMusic(dispatch, audioRef, item)}
                                key={item.id}
                                className={styles.songItem}
                            >
                                <div className={styles.itemLeft}>
                                    <div className={styles.itemIcon}></div>
                                    <div className={styles.songName}>{item.name}</div>
                                </div>
                                <div className={styles.itemRight}>
                                    {
                                        curInd === index &&
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                return removeMusic(dispatch, playList, item)
                                            }}
                                            className={styles.remove}
                                        ></div>
                                    }
                                    <div className={styles.singerName}>{item.ar[0].name}</div>
                                    <div>{dayjs(item.dt).format('mm:ss')}</div>
                                    <div onClick={(e) => linkDetail(e, item.id)} className={styles.linkIcon}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* 歌词 */}
            </div>
        </div>
    );
}

export default memo(Currentlist);
