import React from 'react';
//@ts-ignore
import styles from './BotButton.module.scss';
import { BotData } from '../../types';

interface BotButtonProps extends BotData {
    setIsBotPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setProps: React.Dispatch<React.SetStateAction<BotData>>;
}

export const BotButton: React.FC<BotButtonProps> = ({
    img,
    title,
    options,
    miniDescription,
    name,
    setIsBotPageOpen,
    setProps,
}) => {
    return (
        <div
            onClick={() => {
                setIsBotPageOpen((pred) => !pred);
                setProps((pred) => ({ img, title, options, name } as BotData));
            }}
            className={styles.container}
        >
            <div className={styles.botAvatar}>
                <img src={`/botAvatars/${img}`} alt="" />
                <div className={styles.online}></div>
            </div>
            <div className={styles.text}>
                <h3>{title}</h3>
                <span>{miniDescription}</span>
            </div>
        </div>
    );
};
