import styles from './AnaliticsPage.module.scss';

import React from 'react';

export const AnaliticsPage = () => {
    const [isAuditory, setIsAuditory] = React.useState(true);
    const [isPayment, setIsPayment] = React.useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.leftBar}>
                <ul>
                    <li
                        onClick={() => {
                            setIsAuditory((pred) => !pred);
                        }}
                    >
                        Аудитория
                    </li>
                    <li>Оплаты</li>
                    <li></li>
                </ul>
            </div>
            <div className={styles.rightBar}></div>
        </div>
    );
};
