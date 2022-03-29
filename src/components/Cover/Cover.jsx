import React, { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatCount } from '@/utils/format'
import { playNewMusic } from '@/components/Audio/hooks/common'
import * as playlistService from '@/services/playlistService'
import * as playerService from '@/services/playerService'
import { Spin } from 'antd'
import styles from './cover.module.less'

const Cover = (props) => {
    const dispatch = useDispatch()
    const { audioRef } = useSelector(state => ({
        audioRef: state.audio.audioRef,
    }))
    const { item } = props

    const [maskFlag, setFlag] = useState(false)
    const getListAndPlay = useCallback((e) => {
        e.stopPropagation()
        setFlag(true)
        playlistService.getPlayListDetail(item.id).then(res => {
            const { playlist } = res.data
            // 每个歌单有很多歌  只取前十个
            const songList = playlist.trackIds.splice(0, 10)
            let detailList = []
            const promiseArr = songList.map(item => playerService.getSongDetail(item.id))
            Promise.all(promiseArr).then(res => {
                res.forEach(item => {
                    detailList.push(item.data.songs[0])
                })
                playNewMusic(dispatch, audioRef, null, detailList)()
                setFlag(false)
            })
        })
    }, [dispatch, audioRef, item])

    return (
        <div className={styles.coverContainer}>
            <div className={styles.coverImg}>
                <img src={item.picUrl + '?param=140y140'} />
                <div className={styles.imgFooter}>
                    <div className={styles.footerLeft}>
                        <div className={styles.listenIcon}></div>
                        <div className={styles.playCount}>{formatCount(item.playCount)}</div>
                    </div>
                    <div onClick={getListAndPlay} className={styles.footerRight}></div>
                </div>
                {/* 毛玻璃 */}
                <div className={styles.coverGlass}></div>
            </div>
            <div className={styles.text}>
                {item.name}
            </div>
            <div className={styles.by}>

            </div>
            {
                maskFlag && <Spin className={styles.loading} size='large' tip="Loading" />
            }
        </div>
    );
}

export default memo(Cover);
