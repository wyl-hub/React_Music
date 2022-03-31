import React, { memo, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'antd';
import { getAlbum } from '../../store/actions'
import Theamheader from '@/components/TheamHeader/TheamHeader'
import Newbron from '@/components/NewBron/NewBron'
import styles from './album.module.less'

const Album = () => {
    // 请求数据
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    const { albumList } = useSelector(state => ({
        albumList: state.recommend.albumList
    }))
    // 处理数据
    const [showList, setShowList] = useState([])
    useEffect(() => {
        const showList = []
        if (albumList.length > 5) {
            showList[0] = albumList.slice(0, 5)
            showList[1] = albumList.slice(5)
        } else if (albumList.length > 0) {
            showList[0] = albumList
        }
        setShowList(showList)
    }, [albumList])
    // ref hooks
    const swiperRef = useRef()
    return (
        <div>
            <Theamheader title='新碟上架' titlePath={'/findmusic/AlbumList'} />
            <div className={styles.main}>
                <Carousel ref={swiperRef} dots={false} className={styles.swiperContainer}>
                    {
                        showList.map((item, index) => (
                            <div key={index} className={styles.swiperBox}>
                                {
                                    item.map(son => (
                                        <Newbron key={son.id} son={son} />
                                    ))
                                }
                            </div>
                        ))
                    }
                </Carousel>
                <div onClick={() => swiperRef.current.prev()} className={`${styles.btn} ${styles.btnLeft}`}></div>
                <div onClick={() => swiperRef.current.next()} className={`${styles.btn} ${styles.btnRight}`}></div>
            </div>
        </div>
    );
}

export default memo(Album);
