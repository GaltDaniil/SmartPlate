import styles from './AnaliticsPage.module.scss';

import React from 'react';
import { faN } from '@fortawesome/free-solid-svg-icons';
import { Accounts } from './Accounts';
import { Support } from './Support';

export const AnaliticsPage = () => {
    const [isOpen, setIsOpen] = React.useState({
        accounts: true,
        support: false,
    });

    return (
        <div className={styles.container}>
            <div className={styles.leftBar}>
                <ul>
                    <li
                        onClick={() => {
                            setIsOpen({
                                accounts: true,
                                support: false,
                            });
                        }}
                    >
                        Аудитория
                    </li>
                    <li>Оплаты</li>
                    <li
                        onClick={() => {
                            setIsOpen({
                                accounts: false,
                                support: true,
                            });
                        }}
                    >
                        Обратная связь
                    </li>
                </ul>
            </div>
            <div className={styles.rightBar}>
                {isOpen.accounts ? <Accounts /> : null}
                {isOpen.support ? <Support /> : null}
            </div>
        </div>
    );
};