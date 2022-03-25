import React, { memo } from 'react';

import styles from './newBron.module.less'

const Newbron = (props) => {
    const { son } = props
    return (
        <div className={styles.box}>
            <img src={son.blurPicUrl} />
            <div className={styles.bgImg}></div>
            <div className={styles.text}>{son.name}</div>
            <div className={styles.text}>{son.artists[0].name}</div>
        </div>
    );
}

export default memo(Newbron);
