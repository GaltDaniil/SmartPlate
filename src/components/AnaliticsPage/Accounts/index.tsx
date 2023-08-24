import React from 'react';
//@ts-ignore
import styles from './Accounts.module.scss';
import { PaymentInfo, UserData } from '../../../types';

interface AccountsProps {
    accounts: UserData[];
    isLoaded: boolean;
}

export const Accounts: React.FC<AccountsProps> = ({ accounts, isLoaded }) => {
    const todayUsers = () => {
        const today = new Date();

        const users = accounts.filter((el) => {
            const createdAt = new Date(el.createdAt);
            return createdAt.toDateString() === today.toDateString();
        });
        const payment = users.reduce((acc, el) => {
            return (
                acc + el.paymentInfo!.reduce((acc: number, el: PaymentInfo) => acc + el.amount, 0)
            );
        }, 0);

        return [users.length, payment];
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
            return (
                acc + el.paymentInfo!.reduce((acc: number, el: PaymentInfo) => acc + el.amount, 0)
            );
        }, 0);

        return [users.length, payment];
    };

    const allTime = () => {
        const payment = accounts.reduce((acc, el) => {
            return (
                acc +
                el.paymentInfo!.reduce((acc: number, el: PaymentInfo) => acc + Number(el.amount), 0)
            );
        }, 0);
        return [accounts.length, payment];
    };

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
                </div>
            </div>
        </div>
    );
};
