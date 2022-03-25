import React, { memo } from 'react';
import styles from './theamHeader.module.less'

const Theamheader = (props) => {
    const { title, keywordList = [] } = props
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.icon}></div>
                {/* 标题 */}
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                {/* 关键字列表 */}
                {
                    keywordList.map((item, index) => (
                        <div key={index} className={styles.keyItem}>
                            {item}
                        </div>
                    ))
                }
            </div>
            <div className={styles.headerRight}>
                <div className={styles.more}>更多</div>
                <i className={styles.iconMore}></i>
            </div>
        </div>
    );
}

export default memo(Theamheader);
