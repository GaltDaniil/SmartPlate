import styles from './AnaliticsPage.module.scss';
import axios from '../../axios';

import React from 'react';
import { Accounts } from './Accounts';
import { Support } from './Support';

export const AnaliticsPage = () => {
    const [isOpen, setIsOpen] = React.useState({
        accounts: true,
        support: false,
    });

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [accounts, setAccounts] = React.useState({});

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get('/users/');

            setAccounts(data);
            console.log(data);
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
                {isOpen.accounts ? <Accounts accounts={accounts} isLoaded={isLoaded} /> : null}
                {isOpen.support ? <Support accounts={accounts} /> : null}
            </div>
        </div>
    );
};
