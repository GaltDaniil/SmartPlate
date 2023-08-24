import React from 'react';
import axios from '../../axios';
//@ts-ignore
import styles from './BotPage.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useTelegram } from '../../hooks/useTelegram';
import { BotData } from '../../types';

interface BotPageProps extends BotData {
    setIsBotPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
    days: number;
    userId: number;
}

export const BotPage: React.FC<BotPageProps> = ({
    name,
    img,
    title,
    options,
    userId,
    setIsBotPageOpen,
    days,
}) => {
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

                <button
                    onClick={() => {
                        setIsBotStarting(true);
                        sendBot();
                        setTimeout(() => {
                            tg.close();
                        }, 1000);
                        setIsBotStarting(false);
                    }}
                    disabled={days === 0 || isBotStarting ? true : false}
                >
                    Начать сессию с ботом
                </button>
                <p>{days === 0 ? '* оформите подписку' : ''}</p>
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
