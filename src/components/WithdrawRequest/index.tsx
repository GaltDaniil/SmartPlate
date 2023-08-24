//@ts-ignore
import styles from './WithdrawRequest.module.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

interface WithdrawRequestProps {
    amount: number;
    cardNumber: number;
    cardName: string;
    comment: string;
    type: string;
    date: Date;
    status: 'Ожидается' | 'Выполнен' | 'Отмена';
}

export const WithdrawRequest: React.FC<WithdrawRequestProps> = ({ amount, status, date }) => {
    console.log(date);
    const requestDate = new Date(date);
    console.log(requestDate);

    const day = requestDate.getDate().toString().padStart(2, '0'); // Преобразуем день в строку и добавляем ведущий ноль, если число меньше 10
    const month = (requestDate.getMonth() + 1).toString().padStart(2, '0'); // Месяц начинается с 0, поэтому добавляем 1
    const year = requestDate.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return (
        <div className={styles.container}>
            <div className={styles.infoLine}>
                <h4>Статус</h4>
                <span>
                    <FontAwesomeIcon
                        className={styles.statusCircle}
                        style={{ marginRight: '5px' }}
                        color={
                            status === 'Ожидается'
                                ? 'orange'
                                : status === 'Выполнен'
                                ? 'green'
                                : 'red'
                        }
                        icon={faCircle}
                        size="sm"
                    />
                    {status}
                </span>
            </div>
            <div className={styles.infoLine}>
                <h4>Дата запроса</h4>
                <span>{formattedDate}</span>
            </div>
            <div className={styles.infoLine}>
                <h4>Сумма</h4>
                <span>{amount}</span>
            </div>
        </div>
    );
};
