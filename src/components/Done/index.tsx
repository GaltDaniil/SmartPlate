import React from 'react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
//@ts-ignore
import styles from './Done.module.scss';

export const Done: React.FC = () => {
    const [tg] = useTelegram();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src={'./supportDone.png'} alt="" />
                <h3>{'Сообщение отправлено...'}</h3>
                <Link className={styles.buttons} to={'/'}>
                    Назад
                </Link>
                <button
                    className={styles.buttons}
                    onClick={() => {
                        tg.close();
                    }}
                >
                    Закрыть бота
                </button>
            </div>
        </div>
    );
};
