import React, { memo, useEffect, useCallback } from 'react'
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getSongListByPageAction } from './store/actions'
import TheamHeader from '@/components/TheamHeader/TheamHeader'
import Cover from '@/components/Cover/Cover'
import styles from './songList.module.less'

export default memo(function SongList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSongListByPageAction(0))
  }, [dispatch])
  // 获取当前页数据

  const { currentInfo } = useSelector(state => ({
    currentInfo: state.songlist.currentInfo
  }))
  const { playlists = [], total } = currentInfo

  const pageChange = useCallback((e) => {
    dispatch(getSongListByPageAction((e - 1) * 35))
  })

  return (
    <div className={styles.container}>
      <TheamHeader title={'最热'} />
      <div className={styles.songlistBox}>
        {
          playlists.map(item => (
            <div key={item.id}>
              <Cover item={item} />
            </div>
          ))
        }
      </div>
      <Pagination
        showSizeChanger={false}
        className={styles.pagination}
        defaultCurrent={1}
        total={total}
        onChange={pageChange}
      />
    </div>
  )
})
