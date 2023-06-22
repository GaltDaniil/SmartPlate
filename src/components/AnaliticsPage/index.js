import styles from './AnaliticsPage.module.scss';
import axios from '../../axios';

import React from 'react';
import { Accounts } from './Accounts';
import { Support } from './Support';
import { Payments } from './Payments';

export const AnaliticsPage = () => {
    const [isOpen, setIsOpen] = React.useState({
        accounts: true,
        payments: false,
        support: false,
    });

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [accounts, setAccounts] = React.useState({});

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get('/users/');

            setAccounts(data);
            setIsLoaded(true);
        };
        fn();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.leftBar}>
                <ul>
                    <li
                        onClick={() => {
                            setIsOpen({
                                accounts: true,
                                payments: false,
                                support: false,
                            });
                        }}
                    >
                        Аудитория
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen({
                                accounts: false,
                                payments: true,
                                support: false,
                            });
                        }}
                    >
                        Оплаты
                    </li>
                    <li
                        onClick={() => {
                            setIsOpen({
                                accounts: false,
                                payments: false,
                                support: true,
                            });
                        }}
                    >
                        Обратная связь
                    </li>
                </ul>
            </div>
            <div className={styles.rightBar}>
                {isOpen.accounts ? <Accounts accounts={accounts} isLoaded={isLoaded} /> : null}
                {isOpen.payments ? <Payments accounts={accounts} isLoaded={isLoaded} /> : null}
                {isOpen.support ? <Support accounts={accounts} /> : null}
            </div>
        </div>
    );
};
