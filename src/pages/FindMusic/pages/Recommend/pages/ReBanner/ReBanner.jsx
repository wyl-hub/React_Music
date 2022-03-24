import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBannerAction } from '../../store/actions'

import { Carousel } from 'antd';
import styles from './reBanner.module.less'
export default function ReBanner() {

  // 获取仓库数据
  const { banner } = useSelector(state => ({
    banner: state.recommend.banner
  }))

  // banner 数据初始化
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBannerAction())
  }, [dispatch])


  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerLeft}>
        <Carousel style={{ width: '730px' }} className={styles.swiper} autoplay effect="fade">
          {
            banner.map(item => (
              <div className={styles.swiperItem}>
                <img className={styles.swiperImg} src={item.imageUrl} />
              </div>
            ))
          }
        </Carousel>
      </div>
      <div className={styles.bannerRight}></div>
    </div>
  )
}
