import React, { memo } from 'react'
import ReBanner from './pages/ReBanner/ReBanner'
import Hotrecommend from './pages/HotRecommend/HotRecommend'
import Album from './pages/Album/Album'
import Rerank from './pages/ReRank/ReRank'
import styles from './recommend.module.less'

export default memo(function Recommend() {

  return (
    <div>
      {/* 轮播图 */}
      <ReBanner />
      <div className={styles.content}>
        <div className={styles.recoLeft}>
          {/* 热门推荐 */}
          <Hotrecommend />
          {/* 新碟上架 */}
          <Album />
          {/* 榜单 */}
          <Rerank />
        </div>
        <div className={styles.recoRight}></div>
      </div>
    </div>
  )
})
