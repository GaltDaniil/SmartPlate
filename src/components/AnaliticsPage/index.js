import styles from './AnaliticsPage.module.scss';
import axios from '../../axios';

import React from 'react';
import { faN } from '@fortawesome/free-solid-svg-icons';

export const AnaliticsPage = () => {
    const [isAuditory, setIsAuditory] = React.useState(true);
    const [isPayment, setIsPayment] = React.useState(false);

    const [accounts, setAccounts] = React.useState({});
    const [payments, setPayments] = React.useState({});
    const [requests, setRequests] = React.useState({});

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get('/users/');

            setAccounts(data);
        };
        fn();
    }, []);
    console.log(accounts);

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
            <div className={styles.rightBar}>
                <div className={styles.analiticsPage}>
                    <div className={styles.today}>
                        <div className={styles.accounts}>
                            <h3>Пользователи</h3>
                            <span>количество</span>
                        </div>
                        <div className={styles.payments}>
                            <h3>Оплаты</h3>
                            <span>количество</span>
                        </div>
                        <div className={styles.requests}>
                            <h3>Запросы</h3>
                            <span>количество</span>
                        </div>
                    </div>
                    <div className={styles.month}>
                        <div className={styles.accounts}>
                            <h3>Пользователи</h3>
                            <span>количество</span>
                        </div>
                        <div className={styles.payments}>
                            <h3>Оплаты</h3>
                            <span>количество</span>
                        </div>
                        <div className={styles.requests}>
                            <h3>Запросы</h3>
                            <span>количество</span>
                        </div>
                    </div>
                    <div className={styles.allTime}>
                        <div className={styles.accounts}>
                            <h3>Пользователи</h3>
                            <span>количество</span>
                        </div>
                        <div className={styles.payments}>
                            <h3>Оплаты</h3>
                            <span>количество</span>
                        </div>
                        <div className={styles.requests}>
                            <h3>Запросы</h3>
                            <span>количество</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
