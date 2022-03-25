import React, { memo } from 'react';
import { formatCount } from '@/utils/format'
import styles from './cover.module.less'

const Cover = (props) => {
    const { item } = props
    return (
        <div className={styles.coverContainer}>
            <div className={styles.coverImg}>
                <img src={item.picUrl} />
                <div className={styles.imgFooter}>
                    <div className={styles.footerLeft}>
                        <div className={styles.listenIcon}></div>
                        <div className={styles.playCount}>{formatCount(item.playCount)}</div>
                    </div>
                    <div className={styles.footerRight}></div>
                </div>
                {/* 毛玻璃 */}
                <div className={styles.coverGlass}></div>
            </div>
            <div className={styles.text}>
                {item.name}
            </div>
            <div className={styles.by}>
                by sadhi
            </div>
        </div>
    );
}

export default memo(Cover);