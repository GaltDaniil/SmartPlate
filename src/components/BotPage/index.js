import React from 'react';
import axios from '../../axios';
import styles from './BotPage.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useTelegram } from '../../hooks/useTelegram';

export const BotPage = ({ name, img, title, options, userId, setIsBotPageOpen, tokens }) => {
    const [tg] = useTelegram();
    const [isBotStarting, setIsBotStarting] = React.useState(false);

    React.useEffect(() => {}, []);

    const sendBot = async () => {
        await axios.post('/bots/startBot', { userId, bot: name });
    };
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <img src={`/botAvatars/${img}`} alt="" />
                <h3>Чат-бот:</h3>
                <h2>{title}</h2>
                <h4>Специализация:</h4>
                <span>{options.specialization}</span>
                <h4>Возможности:</h4>
                <span>{options.possibilities}</span>
                <h4>Советы:</h4>
                <span>{options.adviсe}</span>

                <button
                    onClick={() => {
                        setIsBotStarting(true);
                        sendBot();
                        setTimeout(() => {
                            tg.close();
                        }, 1000);
                        setIsBotStarting(false);
                    }}
                    disabled={tokens < 1 || isBotStarting ? true : false}
                >
                    Начать сессию с ботом
                </button>
                <FontAwesomeIcon
                    onClick={() => setIsBotPageOpen((pred) => !pred)}
                    className={styles.xmark}
                    icon={faXmarkCircle}
                    size="lg"
                />
            </div>
        </div>
    );
};
