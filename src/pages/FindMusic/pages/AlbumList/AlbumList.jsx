import React, { memo, useEffect, useCallback } from 'react'
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumByPageAction } from './store/actions'
import TheamHeader from '@/components/TheamHeader/TheamHeader'
import Newbron from '@/components/NewBron/NewBron'
import styles from './albumlist.module.less'
export default memo(function AlbumList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAlbumByPageAction(0))
  }, [dispatch])
  // 获取当前页数据

  const { currentInfo } = useSelector(state => ({
    currentInfo: state.albumlist.currentInfo
  }))

  const { albums = [], total = 0 } = currentInfo

  const pageChange = useCallback((e) => {
    dispatch(getAlbumByPageAction((e - 1) * 35))
  })
  return (
    <div className={styles.container}>
      <TheamHeader title={'最热'} />
      <div className={styles.songlistBox}>
        {
          albums.map(item => (
            <div key={item.id}>
              <Newbron son={item} />
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
