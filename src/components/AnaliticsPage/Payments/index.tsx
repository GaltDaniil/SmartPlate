import React from 'react';
//@ts-ignore
import { PaymentInfo, UserData } from '../../../types';

interface RowProps {
    userName: string;
    amount: number;
    date: string;
}

const Row: React.FC<RowProps> = (props) => {
    const { userName, amount, date } = props;

    const payDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = payDate.toLocaleDateString('ru-RU', options);
    return (
        <tr>
            <td>{formattedDate}</td>
            <td>{userName}</td>
            <td>{amount}</td>
        </tr>
    );
};

interface Tablerops {
    accounts: UserData[];
}

const Table: React.FC<Tablerops> = ({ accounts }) => {
    const onlyPayments = accounts
        .filter((el) => el.paymentInfo!.length > 0)
        .flatMap((el) =>
            el.paymentInfo!.map((payment: PaymentInfo) => ({ ...payment, userName: el.userName })),
        )
        .sort((a, b) => new Date(a.date).getTime() + new Date(b.date).getTime());
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

interface PaymentProps {
    accounts: UserData[];
    isLoaded: boolean;
}

export const Payments: React.FC<PaymentProps> = ({ accounts, isLoaded }) => {
    return (
        <div>
            <Table accounts={accounts} />
        </div>
    );
};
