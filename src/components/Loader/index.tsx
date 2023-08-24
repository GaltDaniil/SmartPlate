//@ts-ignore
import styles from './Loader.module.scss';

import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.preloader}>
                <div className={styles.ikigai}>
                    <div className={`${styles.circleLegft} ${styles.circleContainer}`}></div>
                    <div className={`${styles.circleTop} ${styles.circleContainer}`}></div>
                    <div className={`${styles.circleRight} ${styles.circleContainer}`}></div>
                    <div className={`${styles.circleBotomm} ${styles.circleContainer}`}></div>
                    <div className={styles.logo}>
                        IKIG.<span>AI</span>
                    </div>
                </div>
            </div>
            ;
        </div>
    );
};
