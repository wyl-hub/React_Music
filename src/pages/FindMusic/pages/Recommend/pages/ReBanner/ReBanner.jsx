import React, { useEffect, useState, useRef, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBannerAction } from '../../store/actions'

import { Carousel } from 'antd';
import styles from './reBanner.module.less'
export default memo(function ReBanner() {

  // banner 数据初始化
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBannerAction())
  }, [dispatch])

  // 获取仓库数据
  const { banner = [] } = useSelector(state => ({
    banner: state.recommend.banner
  }))


  // container 模糊背景图
  const [bgImg, setBgImg] = useState('')

  // ref hooks
  const bannerRef = useRef()

  // 每次轮播图改变之后 更改container背景图
  const bannerChange = useCallback((from, to) => {
    setBgImg(banner[to] ? banner[to].imageUrl + '?imageView&blur=40x20' : '')
  }, [banner])

  // 因为第一次可能数据还没请求过来  所有需要依赖这个数据的改变做初始化   
  // 而且这个数据一般在组件加载只会请求一次
  useEffect(() => {
    if (banner.length > 0) {
      setBgImg(banner[0].imageUrl ? banner[0].imageUrl + '?imageView&blur=40x20' : '')
    }
  }, [banner])


  return (
    <div className={styles.bannerContainer} style={{ backgroundImage: `url(${bgImg})` }}>
      <div className={styles.bannerBox}>
        {/* 左侧轮播图 */}
        <div className={styles.bannerLeft}>
          <Carousel
            beforeChange={bannerChange}
            style={{ width: '730px' }}
            ref={bannerRef}
            className={styles.swiper}
            autoplay
            effect="fade"
          >
            {
              banner.map(item => (
                <div key={item.encodeId} className={styles.swiperItem}>
                  <img className={styles.swiperImg} src={item.imageUrl} />
                </div>
              ))
            }
          </Carousel>
        </div>
        {/* 右侧下载图片 */}
        <div className={styles.bannerRight}></div>
        {/* 按钮 */}
        <div onClick={() => bannerRef.current.prev()} className={`${styles.btnLeft} ${styles.btn}`}></div>
        <div onClick={() => bannerRef.current.next()} className={`${styles.btnRight} ${styles.btn}`}></div>
      </div>
    </div>
  )
})
