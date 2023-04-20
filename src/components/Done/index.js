import React from 'react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';

import styles from './Done.module.scss';

export const Done = (props) => {
    const tg = useTelegram();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img
                    src={props.page === 'support' ? './supportDone.png' : './reciptDone.png'}
                    alt=""
                />
                <h3>{props.page === 'support' ? 'Сообщение отправлено...' : 'Запрос получен'}</h3>
                <span>
                    {props.page === 'support'
                        ? ''
                        : 'Идет процесс подготовки. Ответ придет сообщением в телеграм бота.'}
                </span>
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
