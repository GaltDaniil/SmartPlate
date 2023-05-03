import React from 'react';
import axios from '../../../axios';

import styles from './Accounts.module.scss';

export const Accounts = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const [accounts, setAccounts] = React.useState({});
    console.log(accounts);

    const todayUsers = () => {
        const today = new Date();

        const users = accounts.filter((el) => {
            const createdAt = new Date(el.createdAt);
            return createdAt.toDateString() === today.toDateString();
        });
        const payment = users.reduce((acc, el) => acc + el.paymentInfo.amout, 0);
        const requests = users.reduce((acc, el) => acc + el.requests, 0);
        return [users.length, payment, requests];
    };

    const monthUsers = () => {
        const currentDate = new Date();

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        const users = accounts.filter((el) => {
            const createdAt = new Date(el.createdAt);
            return createdAt >= thirtyDaysAgo && createdAt <= currentDate;
        });
        const payment = users.reduce((acc, el) => {
            return acc + el.paymentInfo.reduce((acc, el) => acc + el.amount, 0);
        }, 0);
        const requests = users.reduce((acc, el) => acc + el.requests, 0);
        return [users.length, payment, requests];
    };

    const allTime = () => {
        const payment = accounts.reduce((acc, el) => {
            return acc + el.paymentInfo.reduce((acc, el) => acc + el.amount, 0);
        }, 0);
        const requests = accounts.reduce((acc, el) => acc + el.requests, 0);
        return [accounts.length, payment, requests];
    };

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get('/users/');

            setAccounts(data);
            console.log(data);
            setIsLoaded(true);
        };
        fn();
    }, []);

    /* React.useEffect(() => {
        if (accounts) {
            accounts.reduce((acc, el) => {
                return acc + el.paymentInfo.amount ? el.paymentInfo.amount : 0;
            }, 0);
        }
    }, [accounts]); */

    return (
        <div className={styles.analiticsPage}>
            <div>
                <h3>Сегодня</h3>
                <div className={styles.line}>
                    <div className={styles.card}>
                        <h3>Пользователи</h3>
                        <span>{isLoaded ? todayUsers()[0] : '-'}</span>
                    </div>
                    <div className={styles.card}>
                        <h3>Оплаты</h3>
                        <span>{isLoaded ? todayUsers()[1] : '-'}</span>
                    </div>
                    <div className={styles.card}>
                        <h3>Запросы</h3>
                        <span>{isLoaded ? todayUsers()[2] : '-'}</span>
                    </div>
                </div>
            </div>
            <div>
                <h3>Месяц</h3>
                <div className={styles.line}>
                    <div className={styles.card}>
                        <h3>Пользователи</h3>
                        <span>{isLoaded ? monthUsers()[0] : '-'}</span>
                    </div>
                    <div className={styles.card}>
                        <h3>Оплаты</h3>
                        <span>{isLoaded ? monthUsers()[1] : '-'}</span>
                    </div>
                    <div className={styles.card}>
                        <h3>Запросы</h3>
                        <span>{isLoaded ? monthUsers()[2] : '-'}</span>
                    </div>
                </div>
            </div>
            <div>
                <h3>Все время</h3>
                <div className={styles.line}>
                    <div className={styles.card}>
                        <h3>Пользователи</h3>
                        <span>{isLoaded ? allTime()[0] : '-'}</span>
                    </div>
                    <div className={styles.card}>
                        <h3>Оплаты</h3>
                        <span>{isLoaded ? allTime()[1] : '-'}</span>
                    </div>
                    <div className={styles.card}>
                        <h3>Запросы</h3>
                        <span>{isLoaded ? allTime()[2] : '-'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};