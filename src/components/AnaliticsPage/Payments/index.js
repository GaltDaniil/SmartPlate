import React from 'react';
import styles from './Payments.module.scss';

const Row = (props) => {
    const { userName, amount, date } = props;

    const payDate = new Date(date);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = payDate.toLocaleDateString('ru-RU', options);
    return (
        <tr>
            <td>{formattedDate}</td>
            <td>{userName}</td>
            <td>{amount}</td>
        </tr>
    );
};

const Table = (props) => {
    const { data } = props;
    const onlyPayments = data
        .filter((el) => el.paymentInfo.length > 0)
        .flatMap((el) => el.paymentInfo.map((payment) => ({ ...payment, userName: el.userName })))
        .sort((a, b) => new Date(a.date) + new Date(b.date));
    return (
        <table>
            <tbody>
                {onlyPayments.map((el) => (
                    <Row userName={el.userName} amount={el.amount} date={el.date} />
                ))}
            </tbody>
        </table>
    );
};

export const Payments = ({ accounts, isLoaded }) => {
    return (
        <div>
            <Table data={accounts} />
        </div>
    );
};
